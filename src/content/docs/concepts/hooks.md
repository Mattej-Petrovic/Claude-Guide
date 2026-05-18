---
title: Hooks
lede: Scripts that run at lifecycle events to enforce behavior Claude can't bypass. The deterministic control layer.
section: concepts
---

A hook is a script that runs automatically at a specific point in Claude Code's lifecycle. Configured in `.claude/settings.json`, fired at events you choose, with full power to block, modify, or log what is happening.

The fundamental shift in mental model: **hooks guarantee behavior, prompts only suggest it.** Writing "never run rm -rf" in CLAUDE.md is hope. A PreToolUse hook that exits with code 2 when it sees `rm -rf` is enforcement at the execution layer. The agent cannot bypass it, forget it, or reason its way around it.

This makes hooks the most powerful primitive after MCP for shipping Claude Code in environments where you actually need predictable behavior.

## How it works

A hook has three parts:

- **The event** it fires on (PreToolUse, PostToolUse, SessionStart, Stop, and others)
- **A matcher** that filters which tool calls trigger it (Bash, Write, Edit, or combinations)
- **A handler** that runs and decides what happens (a shell command, an HTTP endpoint, a prompt, or an agent)

Events fire at specific points in the agent loop. There are roughly 21 events as of March 2026, but six carry most of the weight.

<svg viewBox="0 0 800 640" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Claude Code hook lifecycle showing where each hook event fires during a session, turn, and tool call">
  <defs>
    <style>
      .frame-outer { fill: none; stroke: #d97706; stroke-width: 1.5; opacity: 0.7; }
      .frame { fill: none; stroke: currentColor; stroke-width: 1; opacity: 0.35; }
      .frame-label { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; opacity: 0.5; }
      .frame-label-accent { fill: #d97706; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; }
      .hook-name { fill: currentColor; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 15px; opacity: 0.95; font-weight: 600; }
      .hook-desc { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 14px; opacity: 0.65; }
      .action { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 14px; opacity: 0.5; }
    </style>
  </defs>
  <rect x="20" y="20" width="760" height="600" rx="10" class="frame-outer"/>
  <text x="40" y="48" class="frame-label-accent">SESSION  ·  PER-SESSION EVENTS FIRE ONCE</text>
  <text x="60" y="92" class="hook-name">▶ SessionStart</text>
  <text x="210" y="92" class="hook-desc">Inject context: git branch, recent TODOs, env state, any setup</text>
  <rect x="50" y="115" width="700" height="420" rx="8" class="frame"/>
  <text x="70" y="140" class="frame-label">TURN  ·  FIRES PER USER MESSAGE</text>
  <text x="90" y="176" class="hook-name">▶ UserPromptSubmit</text>
  <text x="258" y="176" class="hook-desc">Validate or enrich the prompt before Claude reads it</text>
  <rect x="80" y="198" width="640" height="255" rx="6" class="frame"/>
  <text x="100" y="224" class="frame-label">TOOL CALL  ·  LOOPS, ONCE PER TOOL</text>
  <text x="120" y="260" class="hook-name">▶ PreToolUse</text>
  <text x="248" y="260" class="hook-desc">Allow, deny, or modify tool input. Block dangerous commands here.</text>
  <text x="120" y="304" class="action">↓ Tool executes  ·  Bash, Write, Edit, Read, WebFetch, MCP tools</text>
  <text x="120" y="348" class="hook-name">▶ PostToolUse</text>
  <text x="248" y="348" class="hook-desc">Format, lint, log, or inject feedback back to Claude as context</text>
  <text x="120" y="402" class="action">↻ Loops until Claude is done with the task</text>
  <text x="90" y="480" class="hook-name">▶ Stop</text>
  <text x="168" y="480" class="hook-desc">Block to force continuation (this is what /loop uses), or run cleanup</text>
  <text x="60" y="568" class="hook-name">▶ SessionEnd</text>
  <text x="200" y="568" class="hook-desc">Cleanup, persist state, append to audit logs</text>
</svg>

The handler receives JSON about the event on stdin. It can return its own JSON to control what happens next, or just exit with a code. Exit code 2 is special: from a PreToolUse hook it blocks the action, from a Stop hook it forces Claude to keep working.

## The four handler types

**Command.** Runs a shell script. Reads JSON on stdin, optionally writes JSON to stdout, exits with a code. Fast, deterministic, the default. Use these for the vast majority of hooks: linting, blocking, logging, formatting.

**HTTP.** Sends the event JSON as a POST request to a URL, reads the response. Useful for team-wide policies enforced from a central server, or for forwarding hook events to a monitoring pipeline. Released February 2026.

**Prompt.** Sends the event context to a Claude model for single-turn evaluation. The model returns a decision. Use this when the call needs semantic judgment ("is this a destructive migration or a routine one?") rather than pattern matching.

**Agent.** Spawns a subagent with full tool access for deep analysis. Use sparingly. Most hooks should be milliseconds; agent hooks are seconds to minutes and burn tokens.

## Decision control

Hooks talk back through exit codes and JSON output. Three patterns matter most.

**Exit code 2 from PreToolUse** blocks the tool call. Whatever you printed to stderr gets injected back into Claude's context so it knows why and can adapt.

**Exit code 2 from Stop** forces Claude to keep working. This is the mechanism behind `/loop` and behind completion gates that prevent Claude from finishing before tests pass.

**JSON output with `additionalContext`** is the underrated power tool. Any hook can echo JSON containing `additionalContext`, and that text gets fed into Claude's working context. This is how feedback loops work: linter finds an error, hook injects "tests failing in `foo.ts`" as context, Claude fixes it on the next turn without you saying a word.

PreToolUse can also return JSON with `permissionDecision` set to `allow`, `deny`, or `ask`. The `updatedInput` field lets you modify tool input before it runs (since v2.0.10), which means hooks can transparently rewrite commands: add `--dry-run` flags, redact secrets, fix paths, anything.

## High-leverage patterns

These are what experienced practitioners actually run.

**Safety gate.** PreToolUse on Bash that blocks destructive commands. The minimum viable security setup:

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "echo \"$CLAUDE_TOOL_INPUT\" | grep -qE 'rm -rf|DROP TABLE|curl.*\\| *sh' && exit 2 || exit 0"
      }]
    }]
  }
}
```

**Auto-format on write.** PostToolUse on Write|Edit, runs prettier and eslint automatically. Removes a class of nagging entirely:

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write|Edit|MultiEdit",
      "hooks": [
        { "type": "command", "command": "npx prettier --write \"$CLAUDE_TOOL_INPUT_FILE_PATH\"" },
        { "type": "command", "command": "npx eslint --fix \"$CLAUDE_TOOL_INPUT_FILE_PATH\"" }
      ]
    }]
  }
}
```

Multiple hooks on the same event run in parallel.

**Quality feedback loop.** PostToolUse runs your linter or type-checker. If it finds errors, the hook injects them back into Claude's context as `additionalContext`. Claude reads the errors next turn and fixes them autonomously, no human round-trip. This is the pattern that turns hooks from passive gates into active participants in the agent loop.

**Audit trail.** PreToolUse on Bash that appends every command Claude runs to a log file. Forensic record of what the agent did, when, and why. Useful for debugging, compliance, and the inevitable conversation about what happened.

**Context injection at start.** SessionStart hook that runs once and dumps the current git branch, recent commits, open TODOs, or any other live state into Claude's context. Claude shows up oriented without you typing the brief every time.

**Completion gate.** Stop hook that runs your test suite. If tests fail, exit code 2 forces Claude to keep working until they pass. Same mechanism `/loop` uses for autonomous repeat workflows.

**Permission auto-approval.** PermissionRequest hook that auto-approves known-safe commands (`npm run lint`, `git status`, anything matching your allowlist) and routes the rest to you. Less interruption, same safety.

**Notification routing.** Notification hook fires when Claude is waiting for permission or has been idle. Pipe it to desktop pop-ups, Slack, or your phone. This is how people approve permission requests from outside the terminal during long-running sessions.

**Compaction protection.** PreCompact hook snapshots critical context, plus a SessionStart hook with the `compact` source re-injects it after compaction. Stops important rules from getting silently lost when context gets trimmed.

## Common mistakes

**Putting in CLAUDE.md what should be a hook.** "Always run prettier after editing" is a wish. A PostToolUse prettier hook is a guarantee. If you find yourself adding rules to CLAUDE.md that get ignored, ask whether a hook would enforce them instead.

**Slow hooks.** Every PreToolUse hook adds latency to every tool call. A 500ms hook on Bash makes every shell command in your session half a second slower. Use timeouts, run hooks in parallel, mark non-blocking hooks `async: true`.

**Putting secrets in hook commands.** Hooks live in `.claude/settings.json` which is committed to git. Tokens go in env vars and get referenced as `$VAR` in the hook. Never inline.

**Forgetting hooks fail silently.** A broken hook does not crash your session. It just stops working. Toggle Claude Code's verbose mode (`Ctrl+O`) to see hook stdout/stderr when debugging.

**Over-blocking.** A PreToolUse hook that is too strict blocks legitimate work and trains you to ignore the alerts. Block what is actually dangerous, not what is merely unusual.

**Reimplementing what a linter handles.** If ESLint catches it, ESLint should be the one catching it. Do not reimplement deterministic checks as bespoke hooks; just run the existing tool from the hook.

**Treating hooks as a substitute for trust.** Hooks are guardrails, not parents. Do not write 50 hooks to micro-manage Claude. Write the few that matter and trust the rest.

## Examples

**The minimum viable `.claude/settings.json`** that catches most issues:

```json
{
  "permissions": {
    "deny": ["Bash(rm -rf:*)", "Read(.env)"]
  },
  "hooks": {
    "PreToolUse": [{
      "matcher": "Write|Edit",
      "hooks": [{ "type": "command", "command": "scripts/secret-scan.sh" }]
    }],
    "PostToolUse": [{
      "matcher": "Write|Edit",
      "hooks": [{ "type": "command", "command": "npx prettier --write \"$CLAUDE_TOOL_INPUT_FILE_PATH\"" }]
    }],
    "SessionStart": [{
      "hooks": [{
        "type": "command",
        "command": "echo '{\"additionalContext\": \"Branch: '$(git branch --show-current)'\"}'"
      }]
    }]
  }
}
```

A handful of hooks, four lines of behavior change: dangerous commands blocked, secrets caught before write, code auto-formatted, current branch always in context.

**The completion gate** for self-healing test runs:

```json
{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "type": "command",
        "command": "INPUT=$(cat); [ \"$(echo $INPUT | jq -r '.stop_hook_active')\" = 'true' ] && exit 0; npm test || exit 2"
      }]
    }]
  }
}
```

When Claude tries to finish, this runs the test suite. If tests fail, it blocks the stop and Claude keeps working. The `stop_hook_active` check prevents infinite loops if the hook itself is what is triggering the continuation.

**The advanced production setup** that teams running Claude Code in real environments tend to converge on: PreToolUse runs `gitleaks` on every Write to catch secrets before they hit disk. PostToolUse type-checks the changed file. PreToolUse on Bash logs every command to an audit file. Notification fires Slack when Claude requests permission for anything sensitive. SessionStart loads the threat model doc plus the current branch into context. Five hooks, multiple layers of defense. None of it written into CLAUDE.md, all of it enforced.

This is what people mean when they say Claude Code is the most powerful coding tool that has ever shipped, and it runs Bash, and it reads your filesystem, and it calls external tools with your credentials. The hooks layer is what makes that statement comfortable instead of terrifying.

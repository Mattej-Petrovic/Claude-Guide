---
title: Claude Code
lede: The agentic CLI for software engineering — how it works and when to use it.
section: products
---

A coding agent that runs in your terminal or as a VS Code extension. You point it at a project, talk to it the way you'd brief a colleague, and it reads the codebase, edits files, runs commands, runs tests, hits external services, and keeps going until the task is done. It's the surface most people reach for when they want Claude to actually *do* something to a real codebase rather than just talk about one.

Claude Code is not just a chat with files attached. It's a programmable system: standing instructions in a file every session loads, custom commands you trigger with a slash, specialized subagents you spawn for narrow work, hooks that fire on lifecycle events, and external tools wired in over MCP. Most of this page exists to explain what each of those is at a high level and point you at the page that goes deep on it.

## What it is

The product surface is small. You install it once, run `claude` inside a project directory, and you're talking to an agent that has access to your filesystem and shell. Two ways to run it:

**Terminal.** The original surface. Pure CLI, fast, lightweight, no IDE in the way. Power users tend to live here. Plays well with tmux, splits, and multiple parallel sessions.

**VS Code extension.** Same agent, graphical chat panel inside the IDE. Inline diffs, click-to-accept on edits, plan mode you can edit before approving, easy file mentions with `@`. Lower friction for getting started. Works in VS Code forks like Cursor and Windsurf as well. The extension also bundles the CLI, so you can switch to terminal mode any time.

Both share the same account, models, and config. Pick whichever matches how you already work. Many people use the extension to view diffs and run the agent, with a separate terminal for git and tests.

<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram showing Claude Code sitting between you and your codebase, with access to filesystem, shell, and external tools via MCP">
  <defs>
    <style>
      .label { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 13px; fill: var(--color-text, #e8e8e8); }
      .label-strong { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 14px; font-weight: 600; fill: var(--color-text, #e8e8e8); }
      .label-muted { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 11px; fill: var(--color-text-muted, #9a9a9a); }
      .box { fill: var(--color-surface, #1a1a1a); stroke: var(--color-border, #2e2e2e); stroke-width: 1; }
      .box-accent { fill: var(--color-surface-accent, #1f1f1f); stroke: var(--color-accent, #c97b48); stroke-width: 1.25; }
      .arrow { stroke: var(--color-border-strong, #555); stroke-width: 1.25; fill: none; marker-end: url(#arrowhead); }
      .arrow-bidi { stroke: var(--color-border-strong, #555); stroke-width: 1.25; fill: none; marker-end: url(#arrowhead); marker-start: url(#arrowhead); }
    </style>
    <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 z" fill="var(--color-border-strong, #555)" />
    </marker>
  </defs>
  <rect class="box" x="20" y="150" width="120" height="60" rx="6" />
  <text class="label-strong" x="80" y="175" text-anchor="middle">You</text>
  <text class="label-muted" x="80" y="193" text-anchor="middle">terminal / VS Code</text>
  <line class="arrow-bidi" x1="145" y1="180" x2="245" y2="180" />
  <rect class="box-accent" x="250" y="140" width="180" height="80" rx="6" />
  <text class="label-strong" x="340" y="170" text-anchor="middle">Claude Code</text>
  <text class="label-muted" x="340" y="190" text-anchor="middle">reads · plans · edits · runs</text>
  <text class="label-muted" x="340" y="206" text-anchor="middle">verifies · iterates</text>
  <line class="arrow" x1="435" y1="170" x2="535" y2="60" />
  <line class="arrow" x1="435" y1="180" x2="535" y2="180" />
  <line class="arrow" x1="435" y1="195" x2="535" y2="300" />
  <rect class="box" x="540" y="30" width="140" height="60" rx="6" />
  <text class="label-strong" x="610" y="55" text-anchor="middle">Filesystem</text>
  <text class="label-muted" x="610" y="73" text-anchor="middle">read · write · diff</text>
  <rect class="box" x="540" y="150" width="140" height="60" rx="6" />
  <text class="label-strong" x="610" y="175" text-anchor="middle">Shell</text>
  <text class="label-muted" x="610" y="193" text-anchor="middle">tests · git · scripts</text>
  <rect class="box" x="540" y="270" width="140" height="60" rx="6" />
  <text class="label-strong" x="610" y="295" text-anchor="middle">External tools</text>
  <text class="label-muted" x="610" y="313" text-anchor="middle">MCP servers · APIs</text>
  <text class="label-muted" x="80" y="240" text-anchor="middle">brief the task</text>
  <text class="label-muted" x="80" y="258" text-anchor="middle">approve plans</text>
  <text class="label-muted" x="80" y="276" text-anchor="middle">review diffs</text>
  <rect class="box" x="20" y="40" width="180" height="60" rx="6" />
  <text class="label-strong" x="110" y="65" text-anchor="middle">CLAUDE.md + .claude/</text>
  <text class="label-muted" x="110" y="83" text-anchor="middle">standing brief, skills, hooks, agents</text>
  <line class="arrow" x1="200" y1="80" x2="290" y2="140" />
  <text class="label-muted" x="225" y="120">loads</text>
</svg>

## How it's different from Claude.ai

[Claude.ai](/products/claude-ai) is a chat product. You type, it responds, you copy useful parts back to wherever you're actually working. Claude Code closes that loop: it has the codebase, it has the shell, it has the tests, and it can verify its own work. The difference shows up most clearly in two places.

**Context.** Claude.ai works with whatever you paste or upload. Claude Code reads the project itself, follows imports, greps for usages, opens config files. You don't have to pre-explain the codebase, you just say what you want and it goes find what it needs.

**Action.** Claude.ai talks. Claude Code does. It runs commands, edits files, runs tests, fixes the failures, runs the tests again. That's the loop, and it's the whole product.

The honest tradeoff: Claude Code burns more tokens than Claude.ai for equivalent work because the loop costs more, and "does" has more ways to go wrong than "talks" does. The next sections are mostly about how to ride that tradeoff.

## How it's used

The default workflow:

1. Open the project, run `claude` (or open the VS Code extension panel)
2. Brief the task in plain language, the way you'd brief a colleague
3. Let it explore, plan, and propose
4. Approve or push back on the plan
5. Let it execute, with tests verifying the work
6. Review the diff before it lands

Most people find one specific division of labor works well: **plan in Claude.ai, execute in Claude Code.** The chat surface is faster for thinking through what you actually want, what to change, what to avoid. Once the plan is solid, hand it to Claude Code as a brief and let the agent do the work. Claude Code has its own plan mode (read-only research before editing) and a brainstorming flow, both of which are good. But for a lot of people the back-and-forth in Claude.ai produces a clearer brief, and a clearer brief produces better execution. Worth trying both directions.

Beyond default coding work, Claude Code is genuinely a general-purpose computer-automation tool. Anything you'd do by typing into a terminal is something it can be pointed at: red-team and CTF work, automation scripts, data pipelines, devops tasks, scraping, deployment glue. Naming it "Claude Code" undersells what it actually is.

## How to use it well

The thing that separates people getting a lot from Claude Code from people getting a little is whether they treat it as a chatbot or as a configurable development environment. The chatbot version is fine. The configured version is something else.

### Set up the project so the agent can navigate it

Claude Code reads your codebase the same way a new engineer would: by looking at filenames, opening obvious files, running tests. If your repo is hostile to a new engineer, it's hostile to Claude Code. The fixes are the same fixes you'd make for a human: a real README with build and test commands, a feature-based folder structure with descriptive filenames (`CreateItemEndpoint.cs` over `Endpoint.cs`), tests that actually run, no junk in version control.

The Claude Code specific layer on top of that is `CLAUDE.md`, a file in the project root that gets loaded into context every session. Think of it as the onboarding doc you'd write for a new engineer joining the project: stack, conventions, build commands, things to avoid, anything Claude would otherwise have to discover the slow way. Run `/init` and the agent will draft a starter `CLAUDE.md` from your repo, then edit it from there.

There's a whole world of structure beneath this — `.claude/` with subfolders for commands, skills, agents, hooks — and the deep treatment lives on the [project files page](/concepts/project-files). For now: set up `CLAUDE.md`, add a project README that actually tells you how to run the thing, and you're past the point most people stop at.

### Pick the right model for the job

Claude Code lets you switch models with `/model`. The choice matters more here than in Claude.ai because Code burns more tokens per task.

A workable default: **Sonnet for execution, Opus for the hard parts.** Sonnet handles most coding work, fixes most bugs, writes most tests. When Sonnet hits a wall on something genuinely hard (a bug it can't isolate, a refactor across many files, an architecture decision), switch to Opus. For complex projects from the start, default to Opus. Haiku is rarely the right choice for primary work but is useful inside subagents doing exploration where you want speed and cheap tokens.

Plan in Claude.ai with Opus, code in Claude Code with Sonnet, escalate to Opus when needed. That's a workflow that holds up.

Model is only half the dial. The other half is **effort** — how hard the model works before it answers — and on Opus 4.8 it's worth setting on purpose. For serious coding, start at `xhigh` (the default is `high`); it's the level tuned for long, multi-file, tool-heavy runs. For big, broad work — a migration across hundreds of files, a codebase-wide audit — `/effort ultracode` goes further: it keeps `xhigh` reasoning and lets Claude spin up [dynamic workflows](/concepts/dynamic-workflows), background scripts that orchestrate dozens of subagents at once. Reach for it when a task is too big for one conversation to coordinate, and drop back to `high` for routine work. Full effort guidance is on the [Models](/foundations/models) page.

### Use plan mode before anything destructive

Plan mode (`/plan`, or Shift+Tab to cycle modes) puts the agent in read-only mode. It explores, reads, thinks, and produces a plan you can review and edit before it touches a single file. For anything non-trivial, this is worth the extra round trip. The cost of letting Claude Code execute a wrong plan against your codebase is much higher than the cost of one extra planning loop.

### Configure permissions and hooks before you trust it with anything important

Claude Code has access to your shell. That's the whole point, and it's also the whole risk. The default permission setup will ask you before destructive commands, but a few minutes spent in `.claude/settings.json` is time well spent: deny the things you don't want it doing without thought (`rm -rf`, raw curl into bash, reads on `.env`), and add hooks that run automatically (gitleaks before writes, lint after edits, test runs before commits).

Full treatment of permissions and hooks lives on their own pages: [permissions](/concepts/permissions), [hooks](/concepts/hooks). At product level, what you need to know is that this layer exists and that ignoring it is a real risk for real codebases.

### Build muscle on the ecosystem in order

The full ecosystem (skills, subagents, hooks, MCP servers, plugins, custom commands, agent teams, channels, dispatch, scheduled tasks) can feel like a lot. A reasonable order:

1. **Get fluent with the basics.** Plan mode, slash commands, model switching, `CLAUDE.md`. Most users never go past this and still get real value.
2. **Add custom commands and skills.** Workflows you repeat (PR review, deploy checklist, security scan) become slash commands or skills. One file each. Pays for itself the first week.
3. **Add MCP servers.** Connect Claude Code to the tools you actually use — GitHub, your database, Slack, whatever. The library page has curated options.
4. **Add subagents.** Specialized workers with their own context and tool permissions. Use them when work would pollute your main context (heavy exploration, parallel reviews) or when a task has a narrow, repeatable shape.
5. **Add hooks.** Lifecycle automation. Less glamorous than the rest but the place real reliability comes from.

The deep pages on each of these (under `/concepts` and `/extending`) cover what they are and how to actually use them. The point of this page is just to flag the order: most people overreach into subagents and MCP before their `CLAUDE.md` even has a build command in it. Build the foundation first.

## Common mistakes

**Treating it like a chatbot.** People install Claude Code, run a few prompts, get decent results, and stop. It works at that level. It's not what the tool is for. The leverage is in configuration: skills, commands, hooks, agents. Skip that and you've got a fancy autocomplete.

**No `CLAUDE.md`, no tests, no README.** The agent starts every session with zero context about your project. It guesses. The guesses are wrong. You correct. Tokens burn. All of this is fixed by 30 minutes of setup at the start.

**Defaulting to Opus on everything.** Burns through usage limits in hours instead of days. Most coding work is Sonnet work. Switch up only when the problem warrants it.

**Running with default permissions on a real codebase.** The agent has shell access. The default config is reasonable for tinkering, not for serious projects with secrets or production credentials. Lock it down before it bites you.

**Letting context bloat.** Long sessions get expensive and dumb at the same time. Performance starts degrading materially past 40% context use. Use `/compact` to trim the conversation when it gets long, `/clear` to start fresh, or spawn a subagent so heavy exploration stays out of your main session. Don't wait for auto-compact, it fires when the model is already in the dumb zone.

**Building skills and subagents before you need them.** It's tempting to build a library of agents and skills the day you install Claude Code. Don't. Use the basics for a week or two, notice what you actually repeat, then build a skill for that. The agents and skills people regret are the ones built speculatively.

## When to reach for something else

If the task is purely thinking, planning, drafting, or research, [Claude.ai](/products/claude-ai) is the right surface. Claude Code is overkill for it.

If you want Claude to operate apps the way a human would (move data between Excel and a CRM, run a desktop tool, handle email), [Cowork](/products/cowork) is built for that.

If you want it watching the page you're already on in the browser, [Chrome](/products/chrome).

For everything that involves a codebase, a shell, or sustained agentic work on real systems: this is the right place.

---
title: Subagents
lede: Specialized Claude instances spawned by the main session. Context isolation, parallelism, custom agents, and the limits.
section: concepts
---

A subagent is a separate Claude instance that the main session spawns to handle a specific task. It runs in its own context window with its own system prompt, its own tool access, and its own permissions. It does the work and returns a single summary back to the parent.

Two reasons subagents exist:

**Context isolation.** Reading 30 files into your main session pollutes the conversation with content you do not want to keep around. A subagent does that reading in its own context and returns only what matters. Your main session stays clean.

**Parallelism.** When the work splits naturally, multiple subagents can run at the same time. Five sequential research tasks become five parallel ones. You wait once instead of five times.

You will see them most prominently in Claude Code, where you can define reusable ones in `.claude/agents/`. Cowork uses them too, automatically spawning parallel workers on complex tasks. The mental model is the same in both: separate context, scoped task, summary back.

<svg viewBox="0 0 800 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A main session spawns three subagents in parallel, each in its own isolated context window">
  <defs>
    <style>
      .main-box { fill: none; stroke: #d97706; stroke-width: 1.5; opacity: 0.7; }
      .agent-box { fill: none; stroke: currentColor; stroke-width: 1; opacity: 0.4; }
      .label-lg { fill: #d97706; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 2px; }
      .label-md { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 15px; opacity: 0.85; }
      .label-sm { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 12px; opacity: 0.5; letter-spacing: 1.2px; font-weight: 600; }
      .muted { fill: currentColor; opacity: 0.55; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 14px; }
      .footer-note { fill: currentColor; opacity: 0.5; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 13px; }
      .arrow { stroke: currentColor; stroke-width: 1; fill: none; opacity: 0.4; }
    </style>
    <marker id="sg-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" opacity="0.45"/>
    </marker>
  </defs>
  <!-- Main session box: y=20, height=110 -->
  <rect x="20" y="20" width="760" height="110" rx="8" class="main-box"/>
  <text x="40" y="55" class="label-lg">MAIN SESSION</text>
  <text x="40" y="84" class="label-md">Your conversation, planning, integration.</text>
  <text x="40" y="108" class="muted">Spawns subagents. Receives summaries. Decides next step.</text>
  <!-- Arrows: from y=135 to y=175 -->
  <line x1="140" y1="135" x2="140" y2="175" class="arrow" marker-end="url(#sg-ah)"/>
  <line x1="400" y1="135" x2="400" y2="175" class="arrow" marker-end="url(#sg-ah)"/>
  <line x1="660" y1="135" x2="660" y2="175" class="arrow" marker-end="url(#sg-ah)"/>
  <!-- Subagent boxes: y=180, height=200 -->
  <rect x="20" y="180" width="240" height="200" rx="6" class="agent-box"/>
  <text x="40" y="212" class="label-sm">SUBAGENT</text>
  <text x="40" y="242" class="label-md">explore</text>
  <text x="40" y="278" class="muted">Own context window.</text>
  <text x="40" y="300" class="muted">Own system prompt.</text>
  <text x="40" y="322" class="muted">Read-only tools.</text>
  <text x="40" y="344" class="muted">Returns summary.</text>
  <rect x="280" y="180" width="240" height="200" rx="6" class="agent-box"/>
  <text x="300" y="212" class="label-sm">SUBAGENT</text>
  <text x="300" y="242" class="label-md">code-reviewer</text>
  <text x="300" y="278" class="muted">Own context window.</text>
  <text x="300" y="300" class="muted">Own system prompt.</text>
  <text x="300" y="322" class="muted">Read plus diff tools.</text>
  <text x="300" y="344" class="muted">Returns summary.</text>
  <rect x="540" y="180" width="240" height="200" rx="6" class="agent-box"/>
  <text x="560" y="212" class="label-sm">SUBAGENT</text>
  <text x="560" y="242" class="label-md">security-auditor</text>
  <text x="560" y="278" class="muted">Own context window.</text>
  <text x="560" y="300" class="muted">Own system prompt.</text>
  <text x="560" y="322" class="muted">Scoped scan tools.</text>
  <text x="560" y="344" class="muted">Returns summary.</text>
  <text x="400" y="408" text-anchor="middle" class="footer-note">Each subagent runs in parallel, in isolation, and cannot spawn further subagents.</text>
</svg>

## How it works

When you ask Claude Code to do something that benefits from delegation, it picks a subagent (built-in or custom) and spawns it with a task description. The subagent runs in isolation, uses only the tools it has been given, completes the work, and returns one final message. The parent session reads that message and continues.

A few mechanics worth knowing.

**Built-in subagents** ship with Claude Code. The main ones are Explore (read-only file discovery, runs on Haiku for speed and cost), Plan (codebase research before plan mode presents a strategy), and General-purpose (complex tasks needing both exploration and modification). You do not configure these. They activate automatically.

**Custom subagents** are markdown files with YAML frontmatter at the top. They live in `~/.claude/agents/<name>.md` (available everywhere) or `.claude/agents/<name>.md` (per project). The frontmatter defines the name, description, allowed tools, and optionally which model to run on. The body is the system prompt for that agent. The `/agents` command opens an interactive editor that builds the file for you.

**Subagents cannot spawn other subagents.** No infinite nesting. If a subagent needs help, it does the work itself or reports that it could not complete the task. This keeps coordination predictable.

**Auto-delegation is unreliable.** Claude reads the description field on each custom subagent and is supposed to delegate when a task matches. In practice, it often handles the task in the main session even when an obviously relevant subagent is defined. The reliable trigger is explicit invocation: "Have the code-reviewer subagent analyze the latest commits" or "use parallel subagents to research these five items."

**Cowork sub-agents work more automatically.** When you give Cowork a complex task, it decides on its own whether to break work into parallel sub-agents. You can steer mid-run, jumping in to redirect if it goes off course. Less configuration, less explicit control, more "just runs."

## How to use them well

**Start with explicit invocation.** "Use parallel subagents to do X, Y, and Z" is the most reliable pattern. Do not rely on auto-delegation until you have watched it work for your specific setup.

**Define custom subagents when the same task keeps coming up.** Code review, security audit, test runner, documentation generator, dependency check. If you find yourself typing the same kind of instructions to spin up the same kind of agent, write it down as a file once and stop retyping.

**Scope the tools tightly.** A code reviewer does not need write access. A security scanner does not need to commit. Strip the tool list down to what the task actually requires. Smaller surface, more predictable behavior, fewer accidents.

**Use cheaper models for exploration agents.** Haiku is fine for "find all files matching X" or "summarize what is in this directory." Save Sonnet and Opus for agents that actually have to reason hard.

**Be specific in subagent descriptions.** The description controls when (and whether) Claude auto-delegates. "Code reviewer" is too vague. "Reviews the most recent diff for bugs, security issues, and style problems, returning a prioritized list with severity and file/line references" gives Claude a real signal to match against.

**Match the pattern to the task.** Independent tasks that do not share state, run them in parallel. Tasks with dependencies, where B needs A's output, run them sequentially. Tasks that are simple and quick, just do them in the main session.

## Common mistakes

**Spawning subagents for sequential work.** If step B depends on step A's output, parallel agents waste tokens and create coordination problems. Use them for independent work.

**Over-spawning.** Five parallel subagents to fix a one-line bug is theatrical, not productive. Each subagent burns tokens for its own context. Match the number of agents to the work, not to how impressive it looks.

**Vague invocations.** "Implement the feature" handed to a subagent that has no context produces vague output. Subagents need scope, success criteria, file references, and expected output format the same way the main session does. Probably more so, since they have less context than you do.

**Trusting auto-delegation blindly.** When a custom subagent matters, invoke it explicitly. Do not assume Claude saw the description and routed correctly. Claude Opus in particular has a documented tendency to over-delegate (spawning agents when direct work would be faster), and Claude in general often under-delegates to custom agents (handling the task in the main session even when a defined agent fits perfectly). The unreliability cuts both ways.

**Defining one mega-agent that does everything.** If your subagent's system prompt covers code review, security, docs, and refactoring, you have just recreated the original problem inside a smaller box. Specialize. Multiple narrow agents beat one broad agent on every axis except setup time.

**Confusing subagents with agent teams.** They are different things. Subagents are spawned by a main session, work in isolation, and return a summary. The main session orchestrates. Agent teams (a separate, experimental Claude Code feature) are peers that share a task list and coordinate among themselves without a central orchestrator. Subagents are the default and the main thing to learn first. Agent teams are for a specific kind of large, parallel project work.

## Examples

**Parallel research.** "Use parallel subagents to research these five companies and return their tech stack, recent funding, and main product. Combine the results into a single table." One subagent per company, results aggregated by the main session.

**Codebase exploration without polluting context.** "Have an Explore subagent find all the auth-related files in the repo and summarize their purpose." The reading happens in isolation. You get a summary instead of 30 files in your main context window.

**Code reviewer that always runs the same way.** A custom subagent in `.claude/agents/code-reviewer.md` with read-only tools, a description that says when to invoke, and a system prompt that defines what counts as a real issue. Once written, every "review the latest diff" goes through the same lens.

**Security audit before commit.** A custom subagent with read access plus the ability to run `gitleaks` or similar tools. Invoked manually before pushing or wired into a hook to run automatically on `Write` events.

**Cowork parallel work on a deliverable.** Hand Cowork a task like "produce a competitive analysis of these tools, including pricing, features, and integrations, formatted as a comparison table." Cowork breaks the work apart and spawns sub-agents to gather each chunk in parallel, then assembles the final deliverable.

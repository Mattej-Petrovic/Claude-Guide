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

---

## Advanced

Once the patterns above feel routine, three more layers open up: orchestrating across surfaces so Claude Code drives the technical work while Cowork handles the human-facing output, reaching for agent teams when the work needs peer coordination instead of parent–child delegation, and designing a pool of named subagents tuned to specific model tiers. Each is a different answer to a different question about how the work is shaped.

### Cross-surface orchestration with Cowork

The default pairing pattern for these two products points one way: Cowork plans, Claude Code implements. That works when the bottleneck is technical execution. The inverse pattern is worth understanding too, because for a lot of real projects the bottleneck is not the code, it is the deliverable around the code: the report someone reads, the deck someone presents, the formatted handover document, the email summary that goes out to a non-technical stakeholder.

When that is the bottleneck, the orchestration flips. Claude Code drives the technical work as usual — running tests, querying the database, generating the analysis, producing the raw output — and writes the result into a shared project folder as a structured artifact (JSON, CSV, markdown). Cowork picks up the artifact and turns it into the human-facing thing: a polished docx report, a presentation, a spreadsheet, a Slack-ready summary. Both sides read the same `CLAUDE.md` so they share project context, brand voice, naming conventions, and constraints.

A practical example: a weekly engineering review. Claude Code runs the queries, computes the metrics, and writes `out/metrics.json` and `out/notable-incidents.md`. Cowork is asked to read those files and produce `reports/weekly-review.docx` and `reports/weekly-review.pptx`, formatted to the team's template. Same project folder, same context file, two products doing what each is good at.

The reason this is worth setting up rather than doing both halves in one tool is that each surface has a different strength. Claude Code lives in the terminal and the filesystem; it talks to your dev tools, your CI, your database. Cowork runs in a desktop VM and is built for the document-and-deliverable layer; it knows pptx and xlsx and docx as first-class output formats. Forcing either side to do the other's job costs quality. Splitting the work and passing artifacts between them through the shared folder costs almost nothing.

Three things to know before relying on this in practice. The handoff is asynchronous — Cowork does not poll for new artifacts, so you trigger the second half manually or with a scheduled task. Cowork sessions are tied to the desktop app staying open, so this is not a server-side workflow. And when the technical and deliverable layers are tightly intertwined (a single ad-hoc analysis where the format of the output keeps changing), the overhead of two surfaces is not worth it; one session is cleaner.

### Agent teams: peer coordination instead of parent–child

A subagent is spawned by a parent, does its work in isolation, and reports a summary back. Communication is one-way. The parent orchestrates everything.

An agent team is structurally different. Each teammate is a separate Claude Code process with its own context window. Teammates do not just report back to a leader — they message each other directly through a mailbox, claim work from a shared task list, and coordinate among themselves. The lead session creates the team and assigns initial work, but once running, the teammates can hold a conversation, challenge each other's findings, and converge on an answer without going through a single point of orchestration.

This is what people mean when they say agent teams are peer coordination rather than parent–child. The difference is not cosmetic. Subagents are good when you know up front how to decompose the task. Teams are good when the decomposition itself is part of the work — debugging with competing hypotheses, exploring an architectural decision from multiple angles, reviewing a change through different lenses that need to push back on each other.

Agent teams are experimental and require an explicit opt-in. Enable them with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in your environment or settings file. Without that flag, the feature is not available even on a recent version. The minimum required version is Claude Code 2.1.32.

The cost is real. Each teammate is a full Claude Code instance, so token usage scales linearly with team size. Three to five teammates is the recommended range for most workflows; beyond that, coordination overhead grows faster than the parallelism helps. Subagent definitions in `.claude/agents/` can be reused as teammate templates, so a `security-reviewer` you've already written for delegated work can be spawned as a teammate without rewriting anything.

Reach for an agent team when three conditions hold: the work has multiple genuinely independent threads, the threads need to talk to each other (not just report up), and the cost of running multiple full sessions is justified by the quality of what comes out. If any of those is missing, a subagent or a single session does the job for less.

A few constraints worth knowing before designing around teams. There is no nesting — teammates cannot spawn their own teams. The lead is fixed for the lifetime of the team; you cannot promote a teammate later. Session resumption does not currently restore in-process teammates, so a long-running team that you intend to come back to tomorrow may not survive `/resume`. None of these are dealbreakers, but they shape what a team is good for: bounded, parallel investigations rather than persistent multi-agent systems.

### Designing an agent pool

The pattern most people land on with subagents starts the same way: one big custom agent that tries to do everything for a project. It works. It also becomes the same problem the main session was trying to escape from — one overloaded prompt holding too many responsibilities, with no way to specialize behavior.

The next move is to design a pool: a small set of named subagents committed to `.claude/agents/`, each with one job, each tuned to the model tier its work actually needs. The frontmatter is where this lives.

```yaml
---
name: explore-fast
description: Read-only file discovery and codebase search. Use for "find all..." or "where is..." questions.
tools: Read, Grep, Glob
model: haiku
---
```

```yaml
---
name: implementer
description: Implements features and bug fixes from a written plan. Use after a plan has been approved.
tools: Read, Edit, Write, Bash, Grep, Glob
model: sonnet
---
```

```yaml
---
name: architect-review
description: Reviews architectural decisions and trade-offs. Use proactively before significant changes.
tools: Read, Grep, Glob
model: opus
memory: project
---
```

Three agents, three model tiers, three different jobs. The split maps to the actual cognitive load of each task. Exploration is mostly mechanical — read, filter, summarise — and Haiku does it in a fraction of the time and cost. Implementation is the daily-driver work where Sonnet's balance of speed and capability fits. Architectural judgment is where the extra capability of Opus is genuinely worth paying for, and where the higher latency is fine because the agent runs occasionally, not constantly.

Tool scoping reinforces this. `explore-fast` cannot edit files, which prevents the case where a fast cheap agent accidentally writes something you did not want it to. `architect-review` has no write tools either, because architectural review should not turn into a stealth refactor. `implementer` gets the full kit because that is its job. Each agent's allowed actions match its purpose.

The `memory: project` field on `architect-review` is the part that compounds over time. With persistent memory enabled, the agent gets a directory (`.claude/agent-memory/architect-review/`) where it accumulates notes across conversations — patterns it has noticed in the codebase, decisions that have been made before, conventions that are easy to forget. The first review costs the full Opus tokens for context-building. The tenth review costs less, because the agent already knows the codebase's shape. Knowledge that would otherwise live in someone's head, or get re-discovered every session, gets written down once and reused.

A few principles that hold up across projects. Each agent's description should tell Claude exactly when to delegate to it, in concrete terms. "Reviews code" is too vague to route on. "Reviews the most recent diff for security issues, returning a prioritised list with file/line references" is something Claude can match against. Names should be predictable enough that you can `@`-mention them without thinking. Tool lists should be the minimum that lets the agent do its job, never more. And the whole pool should be committed to the repo, so the team's institutional knowledge about how Claude is used here lives alongside the code.

### What this layer is actually about

Cross-surface orchestration, agent teams, and a designed agent pool are three different answers to the same underlying question: how much of the structure of the work can you build into the system, instead of carrying it in your head?

A pool of named agents writes down the team's specialisations in version control. An agent team writes down how parallel investigations should coordinate. Cross-surface orchestration writes down which tool owns which layer of the deliverable. None of this is exotic. It is the same idea the rest of this page has been pointing at — that subagents work because their scope, tools, and context are spelled out — applied at a larger scale. The agent is not the unit of design. The system around the agent is.

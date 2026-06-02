---
title: Dynamic workflows
lede: When one conversation can't coordinate enough agents, Claude writes a script that does. How workflows work, where they fit, and when to reach for one.
section: concepts
---

A dynamic workflow is a JavaScript script that Claude writes to orchestrate [subagents](/concepts/subagents) at scale. You describe the task; Claude writes the script; a runtime executes it in the background while your session stays responsive. When it finishes, a single result lands back in your conversation.

This is a different shape from everything else on the orchestration shelf. A subagent, a skill, an agent team — in all of them Claude is the orchestrator, deciding turn by turn what to spawn next, and every result flows back through a context window. A workflow moves the plan out of the conversation and into code. The script holds the loop, the branching, and the intermediate results, so your context never sees the dozens of agents underneath it. It sees the answer they converged on.

That one move — plan in code, not in context — is the whole idea. Everything else follows from it.

<svg viewBox="0 0 820 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two ways to run many subagents. On the left, with plain subagents or skills, the plan and every intermediate result live in Claude's context window, which fills up as the work grows. On the right, a dynamic workflow moves the plan and the intermediate results into a script the runtime executes in the background, so only the final answer returns to Claude's context.">
  <defs>
    <style>
      .wf-main { fill: none; stroke: #d97706; stroke-width: 1.5; opacity: 0.75; }
      .wf-box { fill: none; stroke: currentColor; stroke-width: 1; opacity: 0.4; }
      .wf-script { fill: none; stroke: currentColor; stroke-width: 1.2; stroke-dasharray: 5 4; opacity: 0.55; }
      .wf-chip { fill: currentColor; opacity: 0.13; }
      .wf-lg { fill: #d97706; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; }
      .wf-sm { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 11px; opacity: 0.5; letter-spacing: 1px; font-weight: 600; }
      .wf-muted { fill: currentColor; opacity: 0.55; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 12px; }
      .wf-foot { fill: currentColor; opacity: 0.5; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 12px; }
      .wf-arrow { stroke: currentColor; stroke-width: 1; fill: none; opacity: 0.45; }
    </style>
    <marker id="wf-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" opacity="0.5"/>
    </marker>
  </defs>
  <line x1="410" y1="30" x2="410" y2="430" class="wf-box"/>
  <!-- LEFT: subagents -->
  <text x="30" y="35" class="wf-sm">SUBAGENTS / SKILLS</text>
  <rect x="30" y="55" width="350" height="175" rx="6" class="wf-main"/>
  <text x="46" y="80" class="wf-lg">CLAUDE'S CONTEXT</text>
  <rect x="46" y="92" width="250" height="20" rx="3" class="wf-chip"/>
  <text x="56" y="106" class="wf-muted">plan + step 1 result</text>
  <rect x="46" y="119" width="300" height="20" rx="3" class="wf-chip"/>
  <text x="56" y="133" class="wf-muted">step 2 result</text>
  <rect x="46" y="146" width="268" height="20" rx="3" class="wf-chip"/>
  <text x="56" y="160" class="wf-muted">step 3 result</text>
  <rect x="46" y="173" width="312" height="20" rx="3" class="wf-chip"/>
  <text x="56" y="187" class="wf-muted">step 4 result ...</text>
  <text x="46" y="216" class="wf-muted" font-style="italic">fills as the work grows</text>
  <line x1="110" y1="318" x2="110" y2="234" class="wf-arrow" marker-end="url(#wf-ah)"/>
  <line x1="205" y1="318" x2="205" y2="234" class="wf-arrow" marker-end="url(#wf-ah)"/>
  <line x1="300" y1="318" x2="300" y2="234" class="wf-arrow" marker-end="url(#wf-ah)"/>
  <rect x="70" y="318" width="80" height="68" rx="5" class="wf-box"/>
  <text x="110" y="356" text-anchor="middle" class="wf-sm">AGENT</text>
  <rect x="165" y="318" width="80" height="68" rx="5" class="wf-box"/>
  <text x="205" y="356" text-anchor="middle" class="wf-sm">AGENT</text>
  <rect x="260" y="318" width="80" height="68" rx="5" class="wf-box"/>
  <text x="300" y="356" text-anchor="middle" class="wf-sm">AGENT</text>
  <text x="30" y="418" class="wf-foot">Claude orchestrates turn by turn. Every result lands in context.</text>
  <!-- RIGHT: workflow -->
  <text x="440" y="35" class="wf-sm">DYNAMIC WORKFLOW</text>
  <rect x="440" y="55" width="350" height="68" rx="6" class="wf-main"/>
  <text x="456" y="80" class="wf-lg">CLAUDE'S CONTEXT</text>
  <rect x="456" y="92" width="180" height="22" rx="3" class="wf-chip"/>
  <text x="466" y="107" class="wf-muted">final answer only</text>
  <line x1="610" y1="198" x2="610" y2="127" class="wf-arrow" marker-end="url(#wf-ah)"/>
  <text x="620" y="167" class="wf-muted">returns once</text>
  <rect x="440" y="200" width="350" height="190" rx="6" class="wf-script"/>
  <text x="456" y="224" class="wf-sm">WORKFLOW SCRIPT — RUNS IN BACKGROUND</text>
  <text x="456" y="249" class="wf-muted">holds the loop, the branching, and</text>
  <text x="456" y="267" class="wf-muted">every intermediate result (in script variables)</text>
  <rect x="456" y="288" width="92" height="56" rx="5" class="wf-box"/>
  <text x="502" y="320" text-anchor="middle" class="wf-sm">AGENT</text>
  <rect x="571" y="288" width="92" height="56" rx="5" class="wf-box"/>
  <text x="617" y="320" text-anchor="middle" class="wf-sm">AGENT</text>
  <rect x="686" y="288" width="92" height="56" rx="5" class="wf-box"/>
  <text x="732" y="320" text-anchor="middle" class="wf-sm">AGENT</text>
  <text x="456" y="372" class="wf-muted">up to 16 run at once · 1,000 per run</text>
  <text x="440" y="418" class="wf-foot">The script orchestrates. Context stays clean.</text>
</svg>

## How it works

You ask for a workflow — in your own words ("use a workflow to..."), or by putting the keyword `ultracode` in your prompt. Claude writes a JavaScript script for the task instead of working through it turn by turn, shows you the planned phases for approval, and hands the script to a runtime. From there:

**The runtime runs the script in the background.** It executes in an isolated environment, separate from your conversation, so your session stays free while agents work. You keep typing; the run reports progress on the side.

**Intermediate results stay in script variables.** This is the part that makes scale possible. A 200-agent run would bury a normal conversation in tool output. Here the script collects each agent's result into a variable, does its filtering and merging in code, and only the final value comes back to Claude. Your context holds the answer, not the work that produced it.

**The script can encode a quality pattern, not just fan-out.** Because the orchestration is code, it can do things a turn-by-turn loop can't: have several agents attack a question from independent angles, then have other agents try to *refute* each finding before it's reported, and keep iterating until the answers converge. The bundled `/deep-research` workflow works exactly this way — it fans web searches across angles, cross-checks sources against each other, votes on each claim, and returns a cited report with the claims that didn't survive already filtered out.

**Runs are resumable within the session.** The runtime tracks each agent's result as it goes, so if you pause or a run is interrupted, completed agents return their cached results and only the rest run live. (This holds within one Claude Code session — quit Code while a workflow is running and the next session starts it fresh.)

Under the hood, this leans on a primitive that shipped with Opus 4.8: **mid-conversation system messages**, the ability to inject fresh `system`-role instructions into a running conversation after it has already started, without restating the whole system prompt. It's the mechanism that lets an out-of-band runtime feed updates and results back into a live session cleanly — the plumbing the background model relies on. You never touch it directly; it's worth knowing the orchestration rests on a real API capability, not a trick.

## When to reach for one

Workflows sit alongside subagents, skills, and [agent teams](/concepts/subagents#agent-teams-peer-coordination-instead-of-parentchild). They overlap, and the honest way to choose between them is to ask *who holds the plan*:

| | Where the plan lives | Where results live | Scale |
|---|---|---|---|
| **Subagents** | Claude, turn by turn | Claude's context | A few delegated tasks per turn |
| **Skills** | Claude, following the prompt | Claude's context | Same as subagents |
| **Agent teams** | A lead agent, turn by turn | A shared task list | A handful of long-running peers |
| **Workflows** | The script | Script variables | Dozens to hundreds of agents per run |

Reach for a workflow when a task needs **more agents than one conversation can coordinate**, or when you want the orchestration **written down as a script you can read and rerun**. The canonical cases:

- A codebase-wide bug sweep or security audit across hundreds of files.
- A large migration — a few hundred files transformed the same way, each verified.
- A research question where sources need to be cross-checked against each other, not just collected.
- A hard plan worth drafting from several independent angles before you commit to one.

If the task is a handful of independent reads, plain subagents are simpler and the result is right there in your context. If it's a repeatable process you follow by hand, a skill is lighter. If the work is a few long-running threads that need to *talk to each other*, that's an agent team. Workflows earn their cost when the agent count is high enough that holding it all in a conversation would collapse under its own weight.

## How to run one

There are three ways to start a workflow, plus the ones that already exist:

- **Single task, this once.** Put `ultracode` in your prompt: `ultracode: audit every endpoint under src/routes/ for missing auth checks`. Claude writes a one-off workflow for that task and your effort level is unchanged afterward. (Asking in plain language — "run this as a workflow" — does the same thing.)
- **The whole session.** Set `/effort ultracode`. From then on Claude decides, per request, whether a task warrants a workflow, and plans one when it does. A single request can become several workflows in a row — one to understand, one to change, one to verify. This is session-only and costs meaningfully more; drop back with `/effort high` for routine work. See [Models](/foundations/models) for where `ultracode` sits in the effort lineup.
- **Bundled or saved commands.** `/deep-research <question>` ships with Claude Code. And once a run does what you wanted, press `s` in the `/workflows` view to save its script as your own `/<name>` command — to your project (`.claude/workflows/`) or your home directory (`~/.claude/workflows/`).

Watch any run with `/workflows`: it lists running and finished workflows, and each one's progress view shows every phase with its agent count, token total, and elapsed time. You can drill into a single agent to read what it found, pause the run, or stop it.

**Availability.** Dynamic workflows are a research preview. They need Claude Code v2.1.154 or later and are available on all paid plans, plus the Claude API and the major cloud providers. On Pro you turn them on from the Dynamic workflows row in `/config`. See [Settings walkthrough](/settings/walkthrough) for the toggle and the org-level controls.

## The limits worth knowing

These are guardrails the runtime enforces, and they shape what a workflow is good for:

- **Up to 16 agents run at once** (fewer on machines with limited CPU cores), and **1,000 agents total per run.** The concurrency cap bounds local resource use; the total cap is a backstop against a runaway script. You can still hand a run hundreds of items — they queue and complete as slots free up.
- **No mid-run input.** Once a run starts you can't answer a question halfway through. If a job needs a human sign-off between stages, run each stage as its own workflow.
- **The script itself can't touch your filesystem or shell.** The *agents* read, write, and run commands; the script only coordinates them. This keeps the orchestration layer from doing anything surprising on its own.
- **Cost scales with agent count.** A single run can use far more tokens than doing the same task in conversation, and it counts against your usage limits like any other work. Gauge a big job by running it on a small slice first — one directory instead of the whole repo — and check the per-agent token usage in the `/workflows` view before committing.

## Common mistakes

**Using a workflow for what a subagent would do.** Three parallel reads do not need a script and a runtime. If the result fits comfortably in your context and you don't need to rerun the orchestration, plain subagents are simpler and faster to set up. The script is overhead you pay for scale and repeatability you don't always need.

**Turning on `ultracode` and walking away from cost.** Session-wide ultracode means *every* substantive request may spin up one or more workflows. That's the point for a day of heavy migration work; it's a waste for answering questions and small edits. Match it to the work, and step back to `/effort high` when the work changes.

**Expecting to steer a run.** Workflows are fire-and-forget by design — there's no mid-run input. People used to nudging Claude turn by turn find this jarring. If your task genuinely needs checkpoints, the right shape is several smaller workflows with you in the loop between them, not one big one you try to interrupt.

**Treating the script as a black box.** Claude writes the workflow to a file and tells you the path. Read it. Diff it against a previous run. Edit it and ask Claude to relaunch from your version. The whole value of moving the plan into code is that you can inspect and own it — a workflow you can't read is just a slower subagent.

**Confusing it with agent teams.** Both run many agents, but a team is peers coordinating through a shared task list with a lead agent deciding turn by turn, while a workflow is a script the runtime executes with no live orchestrator. Teams are for a few threads that need to argue with each other; workflows are for many agents running a plan that's already decided. See [Subagents](/concepts/subagents#agent-teams-peer-coordination-instead-of-parentchild) for the team model.

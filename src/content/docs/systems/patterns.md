---
title: Patterns
lede: Four shapes you will see again and again once you know what to look for. The "insane AI system" people are posting about is almost always one of these, or a stack of them.
section: systems
---

The last two pages set up the reframe and the rules. This page is what real delegated systems look like.

Almost every production system you will see falls into one of four patterns. The screenshots and threads about "AI businesses" and "one-person companies" are almost always one of these on its own, or two or three of them composed together. Once you can name them, you can read the anatomy of any new system you encounter — see the trigger, see what the agent touches, see where the human stays in the loop, see what is going to break first.

What follows is the anatomy of each, in the same order: what it is, what triggers it, what Claude touches, where the human comes back in, and what breaks first when nobody is watching. Named tools where the example needs them; abstracted where the principle matters more than the tool.

## Pattern 1: Input-driven roles

A role that wakes up when something arrives.

The trigger is external and unpredictable in timing but predictable in shape: an email lands, a form gets submitted, a Slack message comes in, a support ticket opens, a webhook fires. Claude reads the input, classifies it, and decides what to do — sometimes handle it end-to-end, sometimes route it, sometimes draft a response for a human to send, sometimes escalate. The role is persistent. It is not a script that runs once; it is a responsibility that holds whenever something arrives.

The AI SDR is the most-cited example. A lead submits a form. The system pulls firmographic data, classifies the lead against the ICP, decides whether to disqualify it politely, route it to a human SDR for high-intent cases, or hand it to a nurture sequence for mid-intent. The same role shape covers inbound triage in support (read ticket, classify, attempt a self-serve resolution, escalate complex cases with full context), customer success on existing accounts (read usage signals, draft a check-in, flag at-risk accounts for a human), and inbound recruiting (read application, score against the role, schedule a screen for promising ones).

The trigger lives outside Claude — a webhook from a form provider, an IMAP listener on a shared inbox, a Zapier or n8n flow watching a CRM. Claude's job starts the moment the trigger fires and ends when the work is either resolved or handed off. State usually lives in the CRM or ticketing system; Claude reads it at the start of each invocation and writes back at the end.

<svg class="svg-wide" viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An input-driven role pattern. An event source fires a trigger. Claude reads the input, classifies it, and branches into three actions: auto-resolve with a CRM update, draft a reply for a human to send, or escalate to a human with full context.">
  <!-- event source -->
  <rect x="30" y="140" width="140" height="80" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="100" y="125" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="1">EVENT SOURCE</text>
  <text x="100" y="170" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">form, email, ticket,</text>
  <text x="100" y="186" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">Slack message</text>
  <text x="100" y="206" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">unpredictable timing</text>
  <!-- trigger arrow -->
  <line x1="170" y1="180" x2="226" y2="180" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="220,175 232,180 220,185" fill="#d97706" fill-opacity="0.7"/>
  <text x="200" y="170" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">trigger</text>
  <!-- Claude classifier -->
  <rect x="232" y="140" width="160" height="80" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <text x="312" y="125" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="1">CLAUDE</text>
  <text x="312" y="168" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">read · classify · decide</text>
  <text x="312" y="188" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">reads CRM context</text>
  <text x="312" y="203" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">writes back at the end</text>
  <!-- branch line to top -->
  <line x1="392" y1="165" x2="466" y2="70" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="459,68 471,66 466,78" fill="#d97706" fill-opacity="0.7"/>
  <!-- branch line to middle -->
  <line x1="392" y1="180" x2="466" y2="180" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="460,175 472,180 460,185" fill="#d97706" fill-opacity="0.7"/>
  <!-- branch line to bottom -->
  <line x1="392" y1="195" x2="466" y2="290" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="461,284 471,294 477,282" fill="#d97706" fill-opacity="0.7"/>
  <!-- branch A: auto-resolve -->
  <rect x="472" y="40" width="280" height="60" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="487" y="62" fill="currentColor" font-family="ui-monospace, monospace" font-size="11" font-weight="600" opacity="0.9">auto-resolve</text>
  <text x="487" y="80" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">disqualify politely, update CRM,</text>
  <text x="487" y="94" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">send routine reply, close ticket</text>
  <!-- branch B: draft for human -->
  <rect x="472" y="150" width="280" height="60" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="487" y="172" fill="currentColor" font-family="ui-monospace, monospace" font-size="11" font-weight="600" opacity="0.9">draft for a human to send</text>
  <text x="487" y="190" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">mid-intent leads, ambiguous cases —</text>
  <text x="487" y="204" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">human reviews, sends</text>
  <text x="742" y="172" text-anchor="end" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="0.5">* HUMAN</text>
  <!-- branch C: escalate -->
  <rect x="472" y="260" width="280" height="60" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="487" y="282" fill="currentColor" font-family="ui-monospace, monospace" font-size="11" font-weight="600" opacity="0.9">escalate with context</text>
  <text x="487" y="300" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">high-intent, complex, anomalous —</text>
  <text x="487" y="314" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">handoff with full conversation history</text>
  <text x="742" y="282" text-anchor="end" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="0.5">* HUMAN</text>
</svg>

**Where the human stays in the loop.** Almost always at two places: the draft-for-review branch, and the escalation branch. The interesting question is what fraction of inputs land in each. A well-designed input-driven role auto-resolves the bulk of routine inputs, drafts for the middle band, and escalates the long tail. A badly-designed one either escalates too much (the human is doing the same work as before, plus reviewing the agent's classifications) or escalates too little (the agent is auto-resolving things it should not, and the human only finds out when a customer complains).

**What breaks first.** Scope drift and classification rot. Scope drift: the agent starts handling inputs it was not designed for — a sales lead reply that looks like a support ticket, an off-topic question that fits no category, an edge case the prompt did not anticipate. Without bounded scope, the agent will try to be helpful and quality collapses. Classification rot: the agent was tuned against last quarter's input distribution, and now the inputs have shifted. New objection types, new lead sources, new product features the agent does not know about. The system keeps running. The classifications get quietly worse. Nobody notices until conversion rates drift and someone investigates.

The 11x.ai story sits in the cautionary file here. AI SDR company, well-funded, lost most of its customers within months — not because the agent could not draft emails, but because the system around it had no real grip on quality, scope, or the moment when an enthusiastic inbound from a real prospect needed a human in the room.

## Pattern 2: Maintenance loops

A loop that runs on a schedule against a body of work that needs ongoing care.

The trigger is time. The body of work is durable — a codebase, a content library, a database, a knowledge vault, a set of tickets. The loop wakes up on schedule, scans the body of work for things matching a defined pattern, executes changes against the matches, and produces output (a PR, a draft, a flagged item) for a human to glance at or merge.

The cleanest version in the wild right now is Claude Code running as a scheduled agent against a repository. A nightly routine scans for failing tests, missing test coverage, lint errors, outdated dependencies, TODO comments older than thirty days — whatever pattern was specified — and either fixes them directly or opens a PR for review. Claude Code Routines run on cloud infrastructure, so the agent fires whether or not the developer's laptop is open; GitHub Actions integrations do the same thing from the repo side. The same shape applies outside code: a weekly routine that scans a content library for outdated facts, a daily routine that runs hygiene checks against a CRM and flags stale records, a maintenance loop against a documentation site that updates examples when the underlying API changes.

The defining feature of the pattern is that the work *accumulates*. A single run does a small amount of work; the value compounds over many runs against a body of work that does not disappear. This is what makes the design cost worth paying. A maintenance loop run once is a script. Run on schedule for six months, it is the reason your test coverage stopped degrading.

<svg class="svg-wide" viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A maintenance loop pattern. A schedule trigger fires periodically. Claude scans the body of work, identifies candidates matching a defined pattern, executes changes, verifies them, and produces a PR or flagged item. A human reviews and merges. The loop returns to the schedule and repeats.">
  <!-- center: body of work -->
  <ellipse cx="400" cy="180" rx="80" ry="55" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="400" y="170" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="1">BODY OF WORK</text>
  <text x="400" y="190" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">codebase · library</text>
  <text x="400" y="206" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">data · docs</text>
  <!-- top: schedule -->
  <rect x="330" y="30" width="140" height="50" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <text x="400" y="50" text-anchor="middle" fill="currentColor" font-family="ui-monospace, monospace" font-size="11" font-weight="600" opacity="0.9">schedule fires</text>
  <text x="400" y="68" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">cron · nightly · weekly</text>
  <!-- right: scan + identify -->
  <rect x="540" y="100" width="170" height="60" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="625" y="120" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">scan · identify</text>
  <text x="625" y="138" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">match against pattern</text>
  <text x="625" y="152" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">flag candidates</text>
  <!-- right bottom: execute + verify -->
  <rect x="540" y="200" width="170" height="60" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <text x="625" y="220" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">execute · verify</text>
  <text x="625" y="238" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">run changes</text>
  <text x="625" y="252" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">tests · linter · schema</text>
  <!-- bottom: PR / output -->
  <rect x="330" y="280" width="140" height="50" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="400" y="300" text-anchor="middle" fill="currentColor" font-family="ui-monospace, monospace" font-size="11" font-weight="600" opacity="0.9">PR · flagged item</text>
  <text x="400" y="318" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="0.5">* HUMAN reviews</text>
  <!-- left: back to schedule -->
  <rect x="90" y="100" width="170" height="60" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="175" y="120" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">merged · committed</text>
  <text x="175" y="138" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">work accumulates</text>
  <text x="175" y="152" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">next run sees the diff</text>
  <!-- arrow: schedule down to body of work -->
  <line x1="400" y1="80" x2="400" y2="122" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="395,116 400,128 405,116" fill="#d97706" fill-opacity="0.7"/>
  <!-- arrow: body of work right to scan -->
  <line x1="470" y1="155" x2="537" y2="130" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="530,124 542,126 535,137" fill="#d97706" fill-opacity="0.7"/>
  <!-- arrow: scan down to execute -->
  <line x1="625" y1="160" x2="625" y2="197" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="620,191 625,203 630,191" fill="#d97706" fill-opacity="0.7"/>
  <!-- arrow: execute left back to body of work -->
  <line x1="540" y1="235" x2="473" y2="215" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="480,209 468,213 475,224" fill="#d97706" fill-opacity="0.7"/>
  <!-- arrow: body of work down to PR -->
  <line x1="400" y1="235" x2="400" y2="277" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="395,271 400,283 405,271" fill="#d97706" fill-opacity="0.7"/>
  <!-- arrow: PR left to merged -->
  <line x1="330" y1="305" x2="263" y2="165" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="258,172 261,160 271,167" fill="#d97706" fill-opacity="0.7"/>
  <!-- arrow: merged right back to body of work -->
  <line x1="260" y1="130" x2="322" y2="145" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="316,139 328,143 320,153" fill="#d97706" fill-opacity="0.7"/>
</svg>

**Where the human stays in the loop.** At the PR or merge stage, almost always. This is where the pattern earns its safety: the agent does the slow part (scanning, identifying, executing, verifying), and the human does the fast part (glancing at a clean diff and clicking merge). When that ratio holds — agent spends thirty minutes producing a five-minute review — the system is paying for itself.

**What breaks first.** Two failure modes dominate. The first is the agent producing PRs that pass tests but should not be merged — refactors that change behavior in ways the tests do not catch, dependency bumps that introduce subtle incompatibilities, code that runs but is the wrong abstraction. This is the verification-cost problem from the previous page in disguise: the tests are not the success criteria, they are *a* success criterion, and the agent will quickly learn what passes them. The second is runaway iteration — a loop that retries on failure without converging, burning tokens through the night because the failure mode is something it cannot fix. This happens often enough that practitioners running continuous Claude loops cap iteration counts explicitly and treat each run as idempotent: if it gets killed, the next run picks up where it stopped.

## Pattern 3: Pipelines

A chain of stages where each stage's output feeds the next.

The trigger fires once. The work then flows through multiple stages in order, each taking the previous stage's output as input. Claude usually touches multiple stages, sometimes all of them. A canonical example: a lead — research — outreach — CRM pipeline. The lead arrives. One stage enriches it with firmographic and intent data. Another researches the company and the specific person. A third drafts personalized outreach. A fourth pushes the result into the CRM and schedules follow-ups. Each stage produces a clearly-shaped output that the next stage consumes.

The complexity in pipelines is not any single stage. It is the handoffs, the state management, and the recovery when a later stage fails after an earlier stage already wrote to the database. If stage four fails, you don't want to re-run stages one through three — they have already committed work. You want to resume from stage four with the state stage three produced. That requires the pipeline to actually have state, persisted somewhere durable between stages: a queue, a database row, a state machine, a tool like LangGraph that does checkpointing natively.

The work that lives well in this shape is structured business process work — document workflows (filings, contracts), data enrichment chains, content production pipelines (research — outline — draft — edit — publish), customer onboarding flows. The pipeline pattern fits naturally when the work has clear stage boundaries that already existed in the manual version of the process.

<svg class="svg-wide" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A pipeline pattern. A trigger fires once. The work flows through four stages in order: enrich, research, draft, push to CRM. Persistent state is stored between each stage. A recovery arrow shows that if stage three fails, the pipeline can resume from stage two state without re-running earlier stages.">
  <!-- trigger -->
  <rect x="20" y="100" width="80" height="60" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <text x="60" y="125" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">trigger</text>
  <text x="60" y="145" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">fires once</text>
  <!-- stage 1 -->
  <rect x="140" y="100" width="120" height="60" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <text x="200" y="120" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="1">STAGE 1</text>
  <text x="200" y="140" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">enrich</text>
  <text x="200" y="155" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">firmographic data</text>
  <!-- stage 2 -->
  <rect x="300" y="100" width="120" height="60" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <text x="360" y="120" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="1">STAGE 2</text>
  <text x="360" y="140" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">research</text>
  <text x="360" y="155" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">company + person</text>
  <!-- stage 3 -->
  <rect x="460" y="100" width="120" height="60" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <text x="520" y="120" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="1">STAGE 3</text>
  <text x="520" y="140" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">draft</text>
  <text x="520" y="155" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">personalized</text>
  <!-- stage 4 -->
  <rect x="620" y="100" width="120" height="60" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <text x="680" y="120" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="1">STAGE 4</text>
  <text x="680" y="140" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">push + schedule</text>
  <text x="680" y="155" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">CRM · follow-ups</text>
  <!-- arrows between stages -->
  <line x1="100" y1="130" x2="136" y2="130" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="130,125 142,130 130,135" fill="#d97706" fill-opacity="0.7"/>
  <line x1="260" y1="130" x2="296" y2="130" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="290,125 302,130 290,135" fill="#d97706" fill-opacity="0.7"/>
  <line x1="420" y1="130" x2="456" y2="130" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="450,125 462,130 450,135" fill="#d97706" fill-opacity="0.7"/>
  <line x1="580" y1="130" x2="616" y2="130" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="610,125 622,130 610,135" fill="#d97706" fill-opacity="0.7"/>
  <!-- persistent state row label -->
  <line x1="140" y1="195" x2="740" y2="195" stroke="currentColor" stroke-width="1" stroke-opacity="0.35" stroke-dasharray="3 3"/>
  <text x="20" y="218" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7" font-style="italic">persistent state</text>
  <text x="20" y="232" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">queue · DB · state machine</text>
  <!-- state boxes -->
  <rect x="165" y="212" width="70" height="32" rx="3" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="200" y="233" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700">{lead}</text>
  <rect x="325" y="212" width="70" height="32" rx="3" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="360" y="233" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700">{enriched}</text>
  <rect x="480" y="212" width="80" height="32" rx="3" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="520" y="233" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700">{researched}</text>
  <rect x="645" y="212" width="70" height="32" rx="3" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="680" y="233" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700">{drafted}</text>
  <!-- write-down arrows from stages to state -->
  <line x1="200" y1="160" x2="200" y2="209" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <polygon points="196,203 200,215 204,203" fill="currentColor" fill-opacity="0.3"/>
  <line x1="360" y1="160" x2="360" y2="209" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <polygon points="356,203 360,215 364,203" fill="currentColor" fill-opacity="0.3"/>
  <line x1="520" y1="160" x2="520" y2="209" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <polygon points="516,203 520,215 524,203" fill="currentColor" fill-opacity="0.3"/>
  <line x1="680" y1="160" x2="680" y2="209" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <polygon points="676,203 680,215 684,203" fill="currentColor" fill-opacity="0.3"/>
  <!-- recovery arrow: if stage 3 fails, resume from stage 2 state -->
  <!-- goes right from stage 2 state box, down, across to under stage 3, up into stage 3 bottom -->
  <path d="M 360 244 L 360 270 L 520 270 L 520 163" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7" stroke-dasharray="5 3" fill="none"/>
  <polygon points="515,169 520,157 525,169" fill="#d97706" fill-opacity="0.7"/>
  <text x="375" y="265" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">if stage 3 fails — resume from stage 2 state</text>
</svg>

**Where the human stays in the loop.** Sometimes between stages, sometimes only at the end, sometimes nowhere. The interesting design choice is *which* stage. Inserting a human checkpoint before the irreversible stage — the one that writes to a database, sends an email, charges a card — is usually the right call. Inserting one earlier costs you speed; inserting one later means the irreversible action has already happened by the time you check.

**What breaks first.** Partial writes and silent stage failure. The partial-writes problem: stage three crashes after stage two has already written to the CRM. Without proper state, re-running the pipeline either skips the work that did succeed (incomplete) or repeats it (duplicates). Without recovery, the lead sits half-processed in your CRM forever. The silent-failure problem: a stage returns a malformed output that the next stage parses anyway, with garbage propagating downstream. A revenue field that should be in billions arriving in millions. A confidence score that defaults to zero when extraction fails. The pipeline keeps running. The output is wrong in ways nobody catches until much later. The mitigation is schema validation between stages — every handoff is shaped, every malformed output fails fast — but that requires deliberately designing the contracts, not just letting Claude pass strings between stages.

## Pattern 4: Stacked-delegation businesses

This is the one the Twitter threads are actually about. The "one-person AI business," the "company of one with twenty agents," the founder running operations that look like they should require a team.

The reframe that makes it legible: it is not one magical system running the business. It is a small stack of well-designed individual delegations — patterns one through three, composed — with the human sitting in the middle as the designer and the exception handler.

Jason Lemkin's setup is the public version of this: 20 agents covering the GTM function, sending 70,000 personalized emails versus the 7,000 his human team had sent, with roughly 1.2 humans managing the whole thing. Strip the headline number off and the architecture is the unsexy part: an SDR pattern handling outbound, an inbound triage pattern handling the replies, a CRM hygiene maintenance loop running nightly, a content pipeline producing collateral. Four systems, each one a familiar pattern. The composition is what makes the numbers possible.

The person is not replaced. Their role compresses. They are no longer the one drafting emails, qualifying leads, updating records, writing follow-ups. They are the one who designed each of those systems, decided where each one would escalate, and now spends the day handling the escalations and watching the dashboards. The work is different. The work is mostly: monitoring outputs, intervening on the edge cases the systems flagged, and improving the systems based on what they got wrong yesterday.

<svg class="svg-wide" viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A stacked delegation business. Four independent systems run in parallel: an inbound SDR system, a content pipeline, a CRM hygiene loop, and a support triage system. The human sits in the middle as designer and exception handler, receiving escalations from each system via dotted lines.">
  <!-- center: human -->
  <rect x="320" y="200" width="160" height="80" rx="6" fill="none" stroke="#d97706" stroke-width="2"/>
  <text x="400" y="225" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="1">* HUMAN</text>
  <text x="400" y="248" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">designer +</text>
  <text x="400" y="265" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">exception handler</text>
  <!-- top left: inbound SDR -->
  <rect x="40" y="40" width="240" height="120" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <text x="60" y="62" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="1">INBOUND SDR</text>
  <text x="270" y="62" text-anchor="end" fill="currentColor" font-family="ui-monospace, monospace" font-size="10" opacity="0.6" font-style="italic">input-driven role</text>
  <text x="60" y="90" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">trigger:</text>
  <text x="122" y="90" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">form submission</text>
  <text x="60" y="110" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">does:</text>
  <text x="110" y="110" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">classify, draft, route</text>
  <text x="60" y="130" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">output:</text>
  <text x="117" y="130" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">meetings booked,</text>
  <text x="60" y="146" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">leads disqualified, escalations</text>
  <!-- top right: content pipeline -->
  <rect x="520" y="40" width="240" height="120" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <text x="540" y="62" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="1">CONTENT PIPELINE</text>
  <text x="750" y="62" text-anchor="end" fill="currentColor" font-family="ui-monospace, monospace" font-size="10" opacity="0.6" font-style="italic">pipeline</text>
  <text x="540" y="90" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">trigger:</text>
  <text x="602" y="90" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">weekly cadence</text>
  <text x="540" y="110" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">does:</text>
  <text x="590" y="110" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">research to draft to edit</text>
  <text x="540" y="130" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">output:</text>
  <text x="597" y="130" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">posts, newsletters,</text>
  <text x="540" y="146" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">collateral for review</text>
  <!-- bottom left: CRM hygiene -->
  <rect x="40" y="320" width="240" height="120" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <text x="60" y="342" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="1">CRM HYGIENE</text>
  <text x="270" y="342" text-anchor="end" fill="currentColor" font-family="ui-monospace, monospace" font-size="10" opacity="0.6" font-style="italic">maintenance loop</text>
  <text x="60" y="370" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">trigger:</text>
  <text x="122" y="370" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">nightly schedule</text>
  <text x="60" y="390" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">does:</text>
  <text x="110" y="390" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">scan, flag, dedupe, enrich</text>
  <text x="60" y="410" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">output:</text>
  <text x="117" y="410" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">cleaner records,</text>
  <text x="60" y="426" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">flags for human review</text>
  <!-- bottom right: support triage -->
  <rect x="520" y="320" width="240" height="120" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <text x="540" y="342" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="1">SUPPORT TRIAGE</text>
  <text x="750" y="342" text-anchor="end" fill="currentColor" font-family="ui-monospace, monospace" font-size="10" opacity="0.6" font-style="italic">input-driven role</text>
  <text x="540" y="370" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">trigger:</text>
  <text x="602" y="370" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">incoming ticket</text>
  <text x="540" y="390" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">does:</text>
  <text x="590" y="390" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">classify, self-serve, escalate</text>
  <text x="540" y="410" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">output:</text>
  <text x="597" y="410" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">resolved tickets,</text>
  <text x="540" y="426" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">complex cases with context</text>
  <!-- escalation lines from each system to human -->
  <line x1="280" y1="130" x2="320" y2="220" stroke="#d97706" stroke-width="1" stroke-opacity="0.5" stroke-dasharray="4 3"/>
  <polygon points="316,213 322,225 327,213" fill="#d97706" fill-opacity="0.4"/>
  <line x1="520" y1="130" x2="480" y2="220" stroke="#d97706" stroke-width="1" stroke-opacity="0.5" stroke-dasharray="4 3"/>
  <polygon points="477,213 478,225 487,215" fill="#d97706" fill-opacity="0.4"/>
  <line x1="280" y1="360" x2="320" y2="270" stroke="#d97706" stroke-width="1" stroke-opacity="0.5" stroke-dasharray="4 3"/>
  <polygon points="316,277 322,265 327,277" fill="#d97706" fill-opacity="0.4"/>
  <line x1="520" y1="360" x2="480" y2="270" stroke="#d97706" stroke-width="1" stroke-opacity="0.5" stroke-dasharray="4 3"/>
  <polygon points="477,277 478,265 487,275" fill="#d97706" fill-opacity="0.4"/>
  <!-- caption -->
  <text x="400" y="305" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">each system runs independently -- the human receives escalations and improves the systems</text>
</svg>

**Where the human stays in the loop.** Everywhere, structurally — and nowhere, operationally. The human is connected to every system through escalation channels and dashboards, but is not in any of the loops. They are not the next step for any work; they are the next step for the small fraction of work the systems flagged. The fraction is what determines whether the stack is sustainable. If the systems escalate ten percent of cases, one human can run a stack of four. If they escalate fifty percent, the human is doing half the work and just calling it AI.

**What breaks first.** Two things. The first is integration between systems — each one was designed in isolation, but they touch the same CRM, the same inbox, the same accounts. The SDR system replies to a prospect that the support system is currently fighting with. The maintenance loop deletes a record the content pipeline depended on. Composition fails at the seams. The second is the human becoming the bottleneck of their own design — the escalations accumulate faster than they can be handled, and the systems start backing up. This is where the "AI business" stories quietly stop being told. The composition works for six months, then the founder is drowning in escalations from systems they no longer have time to fix.

What makes this pattern legible, finally, is that there is no "AI business" architecture you need to learn. You need to be able to design and run any one of patterns 1–3. The "business" is what happens when you have three or four of them, and the design problem at that point is mostly about composition and escalation routing, not about new ideas.

## What this section has shown

Four patterns. Almost everything you will see in production fits inside one of them or composes a few of them. The next page is about the question this section has been gesturing at all along: where the human actually has to stay in the loop, and how to design checkpoints that catch problems without becoming the bottleneck the whole system was trying to remove.

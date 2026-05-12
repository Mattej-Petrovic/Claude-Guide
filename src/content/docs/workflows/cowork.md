---
title: Cowork workflows
lede: Practical workflow patterns for getting real work done with Claude Cowork. The lifecycle, the patterns that earn their keep, common mistakes, and recipes for common scenarios.
section: workflows
---

Cowork runs on the same agentic engine as Claude Code, but in a desktop GUI instead of a terminal. The workflow shape is different. Code is for engineering work, where the verify loop is tests passing and types compiling. Cowork is for knowledge work, where the verify loop is "did you produce the file I actually wanted." That changes how you drive it.

This page is about *how to drive Cowork*. For what Cowork is, see [/products/cowork](/products/cowork). For plugins, skills, and connectors, see the [extending](/extending/overview) pages.

## The lifecycle

<svg viewBox="0 0 700 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Cowork lifecycle: a project provides setup-once context (folder, rules, connectors, memory) which feeds into the per-task flow of Describe, Plan, Run, Output. Automation via scheduled tasks or Dispatch triggers the same flow without manual prompting.">
  <text x="350" y="22" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="600" letter-spacing="1.2">THE COWORK LIFECYCLE</text>
  <rect x="240" y="45" width="220" height="60" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="350" y="66" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.5">PROJECT</text>
  <text x="350" y="81" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">setup once</text>
  <text x="350" y="97" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">folder · rules · connectors · memory</text>
  <line x1="350" y1="107" x2="350" y2="148" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3,3"/>
  <polygon points="350,153 346,145 354,145" fill="currentColor"/>
  <text x="378" y="132" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">context</text>
  <rect x="20" y="155" width="120" height="62" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="80" y="178" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.5">DESCRIBE</text>
  <text x="80" y="195" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6">outcome,</text>
  <text x="80" y="207" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6">not steps</text>
  <line x1="143" y1="186" x2="161" y2="186" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="166,186 158,182 158,190" fill="currentColor"/>
  <rect x="170" y="155" width="120" height="62" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="230" y="178" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.5">PLAN</text>
  <text x="230" y="195" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6">Claude proposes,</text>
  <text x="230" y="207" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6">you approve</text>
  <line x1="293" y1="186" x2="311" y2="186" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="316,186 308,182 308,190" fill="currentColor"/>
  <rect x="320" y="155" width="120" height="62" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="380" y="178" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.5">RUN</text>
  <text x="380" y="195" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6">connectors,</text>
  <text x="380" y="207" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6">subagents, VM</text>
  <line x1="443" y1="186" x2="461" y2="186" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="466,186 458,182 458,190" fill="currentColor"/>
  <rect x="470" y="155" width="120" height="62" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="530" y="178" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.5">OUTPUT</text>
  <text x="530" y="195" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6">files saved</text>
  <text x="530" y="207" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6">to your folder</text>
  <rect x="20" y="245" width="120" height="50" rx="3" fill="none" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="80" y="265" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.5">AUTOMATE</text>
  <text x="80" y="282" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6">/schedule, Dispatch</text>
  <line x1="80" y1="244" x2="80" y2="222" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4,3"/>
  <polygon points="80,219 76,227 84,227" fill="#d97706"/>
</svg>

The Cowork lifecycle has two layers: the project (setup once, persists), and the task flow (Describe, Plan, Run, Output, repeats per task). Almost every workflow that works is built on this shape. Almost every "Cowork is overhyped" complaint comes from people running tasks without a project.

**Project.** A scoped workspace with a folder, instructions, connectors, and memory. The folder is where Cowork reads context from and writes output to. The instructions are how you want Cowork to behave inside this project (tone, formatting, rules of thumb). Connectors give it Gmail, Drive, Notion, Slack, and the rest. Memory is project-scoped, not global, so what Cowork learns about your weekly reports doesn't leak into your invoice processing. Without a project, every session starts from zero. With one, Cowork accumulates context the same way a new colleague does.

**Describe.** Tell Cowork what you want, in outcome terms. *"Pull this week's customer feedback from Notion, group it by theme, save a summary as a Word doc in /reports"* beats *"open Notion, then..."* The planning is the value. Don't pre-plan for it.

**Plan.** Cowork breaks the work into steps and shows you the plan. This is the steering moment. Read it before approving. Most of the time it's right. When it's not, the fix at plan time is one message. The fix after execution is undoing whatever it did.

**Run.** Cowork executes. It uses the most precise tool available: connectors first (Gmail, Drive, Slack, and so on), then MCP servers when configured, and screen interaction (computer use) only when there's no other way. You can watch it work, intervene mid-run, or walk away. The desktop app has to stay open while it runs.

**Output.** Files land in your folder. Real files, ready to open and edit. Word docs, slide decks, spreadsheets, PDFs, whatever the task produced.

**Automate.** Once a task works manually, `/schedule` makes it run on a cadence (hourly, daily, weekly, weekdays). Dispatch lets you trigger tasks from your phone while your desktop executes them. The first time you set up a scheduled task, the prompt you write is rough. After the first run, Cowork rewrites it based on what worked, so the next run is sharper.

## The four patterns that earn their keep

**Projects over standalone tasks.** Three or four files inside a project (an `about-me.md`, a `voice-and-style.md`, a `working-rules.md`) save you from re-explaining yourself every session. This is the single highest-leverage thing you can do in Cowork. The "I tried Cowork once and it was generic" feedback always traces back to running it without a project.

**Outcome-first prompting.** Cowork plans the steps. Your job is to be specific about *what done looks like*. *"Save the report as a Word doc named YYYY-MM-DD-status.docx in /reports, sections in this order, max 800 words"* gives Cowork enough specificity to verify itself. *"Make a status report"* gives it room to invent a format you didn't ask for.

**Steering vs hands-off.** Two modes with different defaults. *Steering mode* (ask before acting): you stay at the desk, watch the plan, intervene mid-task. Use this for new workflows. *Hands-off mode* (act without asking, plus scheduled tasks and Dispatch): you start a task and walk away. Use this only for workflows you've watched work three or four times and trust to behave on their own. The temptation is to flip everything to hands-off after one successful run. Resist it. The cost of one bad run on autopilot is more than the cost of three more supervised runs.

**Connectors before computer use.** Pulling Slack messages through the Slack connector takes seconds. Navigating Slack by clicking around your screen takes minutes and breaks more often. If you find Cowork using computer use for something a connector could handle, install the connector. Computer use is a fallback for cases without other options, not a default.

## How to use it well

**Set up the project once, run a thousand tasks against it.** The setup is fifteen minutes. The payoff compounds across every task you run inside it. Most people skip the setup, run one task, decide Cowork isn't for them, and never come back. Don't be that person.

**Don't connect everything.** Cowork can read folders you point it at and call connected services. That's the feature, but it's also the risk surface. Don't connect folders with credentials in plaintext. Don't connect financial or health data unless you really need it. Pick the smallest folder that has the work, add more only if you actually need to.

**Different projects for different work.** Memory is project-scoped, so what Cowork learns inside "Weekly reports" doesn't leak into "Customer onboarding." That's a feature. Use one project per real workflow, not one mega-project for everything. Five focused projects beat one project that tries to cover your whole job.

**Plugins for roles, skills for tasks.** Plugins bundle skills, connectors, and commands for a role (Productivity, Marketing, Legal, Finance, and others). They give you a starting point that's more specific than an empty session. Install one that matches your work, see what commands it adds, then customise. Skills are smaller: one workflow, one trigger. Use plugins to bootstrap, build skills as your real workflows surface.

**Schedule what repeats. Don't schedule what shouldn't.** Morning briefings, weekly reports, file cleanups, log scans, expense organisation -- all good candidates. Anything that sends messages to other people, makes purchases, publishes content, or changes production systems should not be on autopilot. The cost of a misfire is too high to save the manual click.

**Watch what your desktop is doing.** Cowork only runs while the app is open and the machine is awake. Scheduled tasks scheduled for 3am while your laptop is asleep just don't run. Plan around your machine's actual schedule, not the calendar.

## Common mistakes

**Running without a project.** Generic output, no memory between sessions, you re-explain everything every time. This is mistake number one by a wide margin. Spend the fifteen minutes on setup.

**Telling Cowork the steps instead of the outcome.** *"First open the folder, then read each file..."* You're doing the planning Cowork was supposed to do, and your steps probably aren't optimal. Describe what done looks like and let Cowork figure out how to get there.

**Flipping to "act without asking" after one good run.** Cowork has good days and bad days. A workflow that worked once might fail differently next time. Watch a few runs before walking away.

**Treating Cowork like Claude Code.** They share an engine but the workflows differ. Code wants tests, a `CLAUDE.md`, and a verify loop. Cowork wants a project and clear outcomes. Driving Cowork the way you'd drive Code (CLI flags, manual steering for every step) misses the point of having a GUI.

**Computer use as the default tool.** If Cowork is clicking around your screen for something a connector could handle, install the connector. Screen interaction is slower, more error-prone, and harder to debug. It's the fallback, not the floor.

**Connecting your whole desktop.** Cowork wants a working folder, not your entire home directory. Scope it narrow, expand only when you actually need to.

## Recipes

**Weekly status report.** Project: "Weekly status." Folder where your notes and outputs live. Connectors: calendar for what happened this week, email or Slack for context. Instructions: tone, format, length, headings to include. Schedule every Friday at 4pm: *"pull the last seven days from these sources, group by project, draft a summary in the existing template, save as YYYY-MM-DD-status.docx."* First few runs you watch and correct. Once it's hitting the bar, walk away on Friday and read the draft Monday.

**Inbox triage.** Project: "Email triage." Connector: Gmail or whichever provider. Instructions: which senders matter, which threads deserve a reply today, what's safe to archive. Run on demand or schedule for morning. Cowork drafts replies into a Drafts folder for you to review. Don't put auto-send on autopilot. Drafting is fine, sending is not.

**Research synthesis.** Project per topic. Folder where source material lives (PDFs, articles, notes). Task: *"Synthesise these into a brief that answers [specific question]. Cite sources."* The "specific question" matters. A vague brief produces a vague output.

**Receipts to expense report.** Project: "Expenses." Folder where receipts get dropped throughout the month. Schedule for end of month: *"read all receipts in this folder, extract date, vendor, amount, category, build the expense report in our template, flag anything with missing required fields."* This kind of structured-input to structured-output task is where Cowork shines.

**Dispatch from phone.** Once a task works on the desktop, it works from Dispatch. Send a one-line prompt from the mobile app, the desktop runs it, you come back to finished output. The phone trigger is text-only, so this works best for tasks that pull from connected sources rather than ones that need files attached.

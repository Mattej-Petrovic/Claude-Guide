---
title: Cowork
lede: Real-time collaborative workspaces with Claude as a participant.
section: products
---

A desktop agent that does work on your computer. You point it at a folder, describe an outcome in plain language, and it plans the steps, opens files, edits them, talks to connected apps, and brings back a finished deliverable. Same agentic engine as Claude Code, different audience: built for people who don't live in a terminal.

The mental model: Claude.ai *talks*, Claude Code *codes*, Cowork *gets things done* on your actual desktop, in the actual files and apps you already use.

## What it is

Cowork lives inside the Claude Desktop app on macOS and Windows, alongside Chat. You switch tabs into Cowork mode, point it at a folder you want to give it access to, and describe the task. From there, Claude figures out the steps and works through them, looping you in for approval before anything significant.

Three things make it different from Chat:

**Real file access.** You grant access to specific folders. Inside that scope, Claude can read, edit, create, and delete files. Outside that scope, it can't touch anything.

**Connectors and tools.** Cowork plugs into Slack, Drive, Gmail, Notion, your CRM, and a growing catalog of other tools. When a task needs information from one of them, it goes and gets it directly instead of asking you to paste it in.

**Computer use.** When there's no connector for an app, Cowork can fall back to controlling the screen the way you would: opening the app, clicking, typing, navigating menus. Slower than a connector, but reaches places nothing else can.

A few additions worth knowing about at product level:

- **Scheduled tasks.** Define a task once, set a cadence, let it run on a schedule. Daily briefing of email and calendar, Friday weekly report, end-of-day Slack digest. Computer needs to be awake and the Claude Desktop app open.
- **Dispatch.** Send tasks to your Cowork session from your phone. The work runs on your desktop, you get the result on your phone or back at your computer.
- **Plugins.** Bundles of skills, connectors, and subagents preconfigured for a role or workflow (sales, legal, finance, etc.). One install, Claude shows up specialized.

The deep treatment of connectors, plugins, scheduled tasks, and computer use lives on dedicated pages. This page stays at product altitude.

## How it's different from Claude.ai and Claude Code

Three products, same engine, different shapes.

**[Claude.ai](/products/claude-ai)** is conversation. You think out loud, you draft, you research. It can't reach into your files or your apps.

**[Claude Code](/products/claude-code)** is execution against a codebase. Terminal or IDE, full shell access, made for engineering work. Powerful, but the entry cost (terminals, configs, mental model) is real.

**Cowork** is execution against everyday work. Spreadsheets, documents, meeting notes, expense receipts, email triage, file org, recurring reports. No terminal, no code, just a folder and a task description.

In practice, the line between Cowork and Claude Code blurs more than the official framing suggests. Many developers use Cowork for non-coding work because it's more convenient than spinning up Claude Code for it. And tech-savvy non-developers occasionally borrow Claude Code for jobs Cowork would handle, mostly because Claude Code has been around longer and has more recipes circulating. The official answer: Cowork for knowledge work, Claude Code for engineering. The honest answer: pick whichever fits how you already work, they're closer in capability than the marketing makes them sound.

## How it's used

The default workflow:

1. Open Claude Desktop, switch to the Cowork tab
2. Click "Work in a folder" and pick the folder you want to give it access to
3. Connect the apps you want it to reach (Slack, Drive, Gmail, etc.) once — persists for future sessions
4. Describe the outcome you want, in normal language
5. Cowork proposes a plan, you approve or redirect
6. It executes, looping you back in before anything significant
7. You get a finished deliverable in the folder

The shape of the tasks it handles best is high-effort and repeatable: file org and renaming, expense reports from receipt screenshots, weekly reports assembled from multiple sources, contract review, drafting decks from source material, anything that has a clear desired outcome and an obvious path to get there once you describe it.

Cowork is a research preview. The simple stuff (sort a folder, draft a report from these files, summarize my unread Slack) works well today. The complex stuff (multi-app workflows that string five tools together) is more uneven. Worth knowing before you bet a deadline on it.

## How to use it well

### Start with sandboxed, low-stakes folders

The first time you use Cowork, point it at a folder you wouldn't mind being wrong about. Downloads. A test project directory. Not your active work. Watch what it does, see how it plans, get a feel for its rhythm. Move it to higher-stakes folders only after you trust the pattern.

### Approve plans, don't blanket-trust them

Cowork shows you the plan before it executes. Read it. The plan is where most mistakes get caught: a wrong assumption, a step that's overkill, a folder it shouldn't touch. Once a plan is solid, the execution usually follows. The minute you start clicking approve without reading, you're back to debugging things after the fact.

### Use scheduled tasks for the things you actually repeat

The leverage in Cowork isn't running one impressive task. It's running an unimpressive task every Friday morning while you do something else. Daily briefings, weekly reports, end-of-day summaries, recurring data pulls, anything you'd do manually on a schedule is a candidate. Run the task manually first to confirm the output, then schedule it.

A practical pattern: include a date placeholder in the output filename so each run produces a uniquely named file. Cowork supports `{date}` and `{week}` substitutions in the task definition.

### Plan in chat, execute in Cowork

Same idea as the Claude.ai → Claude Code workflow. Use Chat to think through what you want. What's the outcome? What folders are in scope? What should it not do? When the brief is clear, hand it to Cowork. Vague briefs produce vague plans, and Cowork executes the plan it gets.

### Treat computer use as a fallback, not a default

Computer use is impressive (Claude clicks, types, navigates apps the way a human would), and it has real failure modes. It's slower than a connector, less reliable than a connector, and more visually intrusive (your cursor and keyboard get hijacked while it works). Use a connector if one exists. Fall back to computer use only when the app you need has no other way in. macOS only at the time of writing.

### Watch your usage

Cowork is more token-hungry than Chat because each task fans out into multiple steps, tool calls, and sometimes subagents. A single complex Cowork task can consume what a long chat session would. If you're on Pro, expect to bump into limits faster than you would in regular Chat. Max ($100/$200) is built for sustained Cowork use.

## Common mistakes

**Giving it the whole drive.** Don't. Scope the folder to exactly what the task needs. The blast radius of a wrong move scales with how much it can reach.

**Using it for things Chat handles better.** Quick questions, drafting one email, brainstorming, learning. Cowork is overkill for this. Open Chat. Save Cowork for tasks that involve actual files or actions across actual apps.

**Forgetting your computer has to be on.** Scheduled tasks only run while the desktop app is open and the machine is awake. If you set a daily 8am briefing and your laptop is closed, it runs the next time you open the app. There is no cloud-based execution.

**Trusting complex multi-app workflows on day one.** A task that crosses five apps and seven steps is exactly where current reliability is weakest. Build trust on simple workflows first, scale up after you've seen what fails and how.

**Ignoring the plan.** Cowork shows you the plan because that's where you have leverage. Skip reading it and you give up your best correction point.

## When to reach for something else

If the task is purely thinking, planning, or drafting in chat, [Claude.ai](/products/claude-ai). If it touches a codebase, a shell, or sustained engineering work, [Claude Code](/products/claude-code). If it lives in the browser and you want Claude watching the page you're on, [Chrome](/products/chrome).

For everything that lives on your desktop, in your files, and in the apps you use every day: this is the right place.

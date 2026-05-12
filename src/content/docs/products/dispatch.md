---
title: Dispatch
lede: Claude for email and communication workflows.
section: products
---

A feature inside [Cowork](/products/cowork) that turns your phone into a remote for the Cowork session running on your desktop. You scan a QR code once, and from then on, anything you can ask Cowork at your desk you can ask from your phone. The work happens on your computer using your local files, connectors, plugins, and skills; your phone is just the interface.

It is currently a research preview, available on the paid Claude plans, and works with the Claude desktop app on both Mac and Windows.

The mental model worth getting right: Dispatch is a remote control, not cloud computing. Your computer has to stay on with the Claude Desktop app running. Close the lid or quit the app and Dispatch goes dark until you wake it back up. That is what makes it useful (your local files, your installed apps, your connectors, no uploads required) and also what limits it.

## Setup

About two minutes, no API keys, no OAuth.

1. Install the Claude desktop app and the Claude mobile app, signed into the same account.
2. On desktop, open Cowork and click Dispatch. A QR code appears.
3. In the mobile app, go to Dispatch in the sidebar and scan the QR.
4. Done. The same conversation now appears on both devices.

From there, anything you send from your phone shows up on your computer, and Claude's replies appear on both devices.

<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dispatch architecture: phone is the interface, desktop runs the work against local resources">
  <defs>
    <style>
      .dp-label { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 12px; fill: var(--color-text, #e8e8e8); }
      .dp-label-strong { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 13px; font-weight: 600; fill: var(--color-text, #e8e8e8); }
      .dp-label-muted { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 10px; fill: var(--color-text-muted, #9a9a9a); }
      .dp-label-tag { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.05em; fill: var(--color-accent, #c97b48); }
      .dp-box { fill: var(--color-surface, #1a1a1a); stroke: var(--color-border, #2e2e2e); stroke-width: 1; }
      .dp-box-accent { fill: var(--color-surface-accent, #1f1f1f); stroke: var(--color-accent, #c97b48); stroke-width: 1.5; }
      .dp-arrow-bidi { stroke: var(--color-border-strong, #555); stroke-width: 1.25; fill: none; marker-end: url(#dp-arrowhead); marker-start: url(#dp-arrowhead-rev); }
      .dp-arrow { stroke: var(--color-border-strong, #555); stroke-width: 1.25; fill: none; marker-end: url(#dp-arrowhead); }
    </style>
    <marker id="dp-arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 z" fill="var(--color-border-strong, #555)" />
    </marker>
    <marker id="dp-arrowhead-rev" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto">
      <path d="M8,0 L0,4 L8,8 z" fill="var(--color-border-strong, #555)" />
    </marker>
  </defs>
  <!-- Phone box -->
  <rect class="dp-box" x="20" y="60" width="140" height="72" rx="6" />
  <text class="dp-label-strong" x="90" y="86" text-anchor="middle">Phone</text>
  <text class="dp-label-muted" x="90" y="102" text-anchor="middle">Claude mobile app</text>
  <text class="dp-label-muted" x="90" y="116" text-anchor="middle">Dispatch tab</text>
  <text class="dp-label-tag" x="90" y="148" text-anchor="middle">INTERFACE ONLY</text>
  <!-- Bidirectional arrow between phone and desktop -->
  <line class="dp-arrow-bidi" x1="162" y1="96" x2="258" y2="96" />
  <text class="dp-label-muted" x="210" y="88" text-anchor="middle">network</text>
  <text class="dp-label-muted" x="210" y="112" text-anchor="middle">pairing</text>
  <!-- Desktop box (accent, work happens here) -->
  <rect class="dp-box-accent" x="264" y="52" width="160" height="88" rx="6" />
  <text class="dp-label-strong" x="344" y="78" text-anchor="middle">Desktop</text>
  <text class="dp-label-muted" x="344" y="94" text-anchor="middle">Claude Desktop app</text>
  <text class="dp-label-muted" x="344" y="108" text-anchor="middle">Cowork session</text>
  <text class="dp-label-tag" x="344" y="128" text-anchor="middle">ALL WORK RUNS HERE</text>
  <!-- Arrow: Desktop → Local resources -->
  <line class="dp-arrow" x1="425" y1="96" x2="473" y2="96" />
  <!-- Local resources box -->
  <rect class="dp-box" x="479" y="38" width="200" height="116" rx="6" />
  <text class="dp-label-strong" x="579" y="62" text-anchor="middle">Local resources</text>
  <text class="dp-label-muted" x="579" y="80" text-anchor="middle">your files on disk</text>
  <text class="dp-label-muted" x="579" y="96" text-anchor="middle">connectors (Gmail, Slack...)</text>
  <text class="dp-label-muted" x="579" y="112" text-anchor="middle">plugins and skills</text>
  <text class="dp-label-muted" x="579" y="128" text-anchor="middle">installed desktop apps</text>
  <!-- Bottom annotation -->
  <text class="dp-label-muted" x="350" y="176" text-anchor="middle">remote control, not cloud computing — your computer must stay on and the app must stay open</text>
</svg>

## How you actually use it

The basic loop: you are not at your desk, you have a task that needs your computer, you open Claude mobile, tap Dispatch, type the request. Your desktop runs it.

**With local files.** "There is a file called Northgate Strategy on my Desktop. Pull the Q3 numbers and reply with the highlights." Claude reads the file directly from disk, summarises, replies.

**With connectors.** Anything Cowork is connected to (Gmail, Slack, Notion, Drive, Calendar, and so on) is available from your phone the same as from your desk. "Find the latest email from this client, summarise the deal status, draft a reply for me to review."

**Triggering skills.** If you have skills set up in Cowork (the SKILL.md files that run reusable workflows), you can invoke them by name from Dispatch. "Run the export-paid-newsletters skill and send me the CSV." Practitioner note: use short, simple skill names. The whole point of Dispatch is that you are away from a keyboard, so optimise for that.

**With Computer Use.** Computer Use is opt-in and stays off unless you enable it for a task. With it on, Claude can drive your desktop with mouse and keyboard the way you would: exporting a file from a legacy tool, clicking through a billing dashboard, filling a form in a desktop app. Without it, Dispatch can still do plenty through file access and connectors, but it cannot reach into apps that need cursor and keyboard control.

**With scheduled tasks.** This is where Dispatch gets interesting for ongoing work. Cowork supports scheduled tasks (recurring prompts that run on autopilot on your desktop). Once your phone is paired, scheduled task output can land in your Dispatch conversation. So "every morning at 8 am, summarise yesterday's emails and today's calendar" runs on your computer, and you read the result on your phone with coffee. The task runs whether or not you are looking at it; Dispatch is just the inbox for it.

## How to use it well

**Be specific about file locations.** "There is a file" is vague; "there is a PowerPoint at ~/Desktop/Northgate Strategy.pptx" is actionable. The desktop is doing the work, but it cannot read your mind about where things are.

**Use it for tasks that genuinely need your machine.** If a request would have worked the same in regular mobile chat (asking a question, getting an explanation), use regular chat. Save Dispatch for things that need your files, your installed apps, or your connector setup. Otherwise you are paying the latency cost of going through your desktop for no reason.

**Tell Claude to show files in the phone view.** If a task generates output, the desktop side has it but the phone may not surface it automatically. "Show me the CSV in this chat" or "send me the file here" makes the result visible on mobile.

**Name your skills for thumb typing.** A skill called `news-brief` is faster to invoke from a phone than `daily_morning_news_brief_v2`. Save the verbose names for the desktop, where you have a real keyboard.

**Pair Computer Use with confined tasks, not open exploration.** Computer Use can do impressive things, but it is also the riskiest mode (it can do anything you can do, including buying things or sending messages). Use it for tasks with a clear, narrow goal: "export this report from the dashboard," not "handle my workday." You are less likely to catch a mistake from your phone than from your desk, so keep the leash short.

## What people get wrong

**Closing the laptop and expecting it to keep working.** It will not. The desktop app needs to be running and the machine awake. Some people set their Mac to never sleep on power for this reason; if you use Dispatch heavily, that is a reasonable setting to flip.

**Using it for things mobile chat already handles.** If you do not need your local files, apps, or connectors, you do not need Dispatch. Use the regular mobile chat instead.

**Confusing Dispatch with Claude Code Channels.** Different feature. Dispatch is the Cowork mobile remote, paired by QR, talking to your desktop session. Channels lets you talk to a Claude Code CLI session through Telegram, Discord, or iMessage using bot tokens and webhooks. Both technically let you "use Claude from your phone," but they target different layers (Cowork desktop versus Code CLI) and have different setup. If messaging-app integration is what you want, see [the phone page](/products/phone).

**Forgetting Computer Use is off by default.** If a task needs Claude to click around in apps, enable Computer Use first. Without it, Dispatch can read files and use connectors, but it cannot drive a UI.

## Examples

**File retrieval while in transit.** "There is a PDF on my Desktop called Q4 Brief. Pull out the three highest-priority items and reply with them." Useful when you remembered something on the train.

**Email triage on the move.** "Open Gmail, find any unread email from a client domain, summarise the urgency of each, and tell me which ones I should reply to today." Connector-driven; no Computer Use needed.

**Run a recorded skill on demand.** "Run my weekly-metrics skill and send me the summary." If the skill writes a file, ask Claude to show it in the chat so you can see it on mobile.

**Daily briefing through a scheduled task.** Set up a Cowork scheduled task that runs at 7:30 am, summarises overnight emails plus the day's calendar plus any open tasks, and posts the result. Read it in Dispatch on your phone before you sit down at the desk.

**Quick fix to a desktop app via Computer Use.** "Open the workbook called Sales Tracker, sort the Pipeline tab by Date Modified, save." Targeted and finite, the kind of task Computer Use handles well.

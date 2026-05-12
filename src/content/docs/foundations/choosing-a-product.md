---
title: Choosing a product
lede: A decision framework for picking the right Claude surface for your task.
section: foundations
---

Most readers should default to **Claude.ai** for most work. It's the chat interface, it does most things, and the other products exist to solve specific shapes that chat doesn't fit. Reach for them when the shape applies. Otherwise stay in Claude.ai.

This page picks the product. For picking the model inside that product, see [Models](/foundations/models).

## By job

**Writing, thinking, research, one-off coding, learning** — [Claude.ai](/products/claude-ai). The default. If you're not sure, the answer is this.

**Coding inside an actual codebase** — [Claude Code](/products/claude-code). Lives in your terminal, reads and edits your files, runs your commands. Different mental model: you're delegating, not chatting. Use it when the work is "make these changes across these files" rather than "help me understand this snippet."

**Letting Claude operate your own machine — files, apps, connectors** — [Cowork](/products/cowork). The desktop app. Think of it as Claude Code for non-developers, or Claude with hands on your computer. Read your folders, sort downloads, pull data from connected apps (Gmail, Drive, Slack, etc.), drive other software via computer use. Currently macOS-leaning, in active development.

**Tasking your computer from your phone** — [Dispatch](/products/dispatch) (a feature inside Cowork). You leave your desktop on, pair your phone via QR code, and message tasks from anywhere. Daily briefing while you're commuting, "find that file" while you're away from your desk. Research preview, slow, ~50/50 reliability today; promising shape, rough execution.

**Mobile work in general** — the Claude mobile app. For chat-shaped work on your phone, this is fine and has gotten better. It now talks to a few connected tools (Figma, Canva, Amplitude) directly from the app. Different from Dispatch: the mobile app is Claude in your pocket; Dispatch is Claude on your laptop, summoned by your pocket.

**Web tasks — booking, browsing, multi-tab research, form-filling** — [Claude in Chrome](/products/chrome). The browser extension. Claude operating a tab on your behalf. Genuinely useful for the narrow band of tasks that are clearly browser-shaped. Less useful as a general assistant.

**Spreadsheet work where the data lives in the sheet** — Claude in Excel. An agent inside a sheet. If the work is "look at this CSV and tell me about it," Claude.ai is fine. If the work is "live inside a spreadsheet and do sheet-shaped things," this is the tool.

**Designs, prototypes, decks, landing pages, one-pagers** — [Claude Design](/products/design). Conversational design tool. Output is real interactive HTML/CSS, not vector mockups, and it can hand off directly to Claude Code for implementation. Research preview as of April 2026, available to paid Claude subscribers. Good when you need *visual output* fast and don't have a designer; not a Figma replacement for production design systems.

**Building something on top of Claude** — the API. Skip the products entirely. Most third-party Claude tools are built directly on the API.

## The genuinely tricky overlaps

A few decisions are actually decisions, not lookups.

**Claude.ai vs Claude Code for coding.** If the task is "explain this," "write a script," "debug this snippet," or "draft this function": Claude.ai. If the task is "make these changes across the codebase," "implement this feature end-to-end," or "let it work on this for an hour and check back": Code. The line is whether the work needs file system access and command execution. Code's mental model takes a session or two to click; once it does, going back to copy-pasting code into chat feels broken.

**Claude.ai vs Cowork for "do stuff on my computer."** Claude.ai can read files you upload and use connectors to pull from Drive, Gmail, etc. Cowork can do the same *plus* drive your local machine: open apps, sort folders, screenshot, click. If the task starts with "use this file I'm uploading," Claude.ai is faster. If it starts with "go find," "go organize," or "do this on my desktop," Cowork.

**Cowork vs Claude Code for non-coding desktop automation.** Real overlap. Code is more capable in agentic terms but assumes you're comfortable in a terminal. Cowork is the same idea wrapped for people who don't want to be. If you can write a shell command without thinking, Code may be the better tool even for non-coding work. If "terminal" is a word you'd rather not deal with, Cowork.

**Claude.ai vs Chrome for web research.** Claude.ai with web search handles 90% of "look this up" needs and is faster. Chrome is for tasks where Claude needs to *act* on the web (fill a form, click through a flow, navigate a site), not just read it.

**Claude.ai vs Design for visual work.** Claude.ai already produces HTML artifacts and decks; this works fine for one-offs. Design is a separate environment with design-system context, sliders, inline edits, code/Figma/Canva handoff: built for iterating on visual output, not just generating it once. If you're going to revise more than twice, Design.

## What's gated, what's not

Most of these products are paid-plan or research-preview gated. Specifics change frequently and are best checked at the source. The shape today (May 2026):

- Claude.ai and the mobile app: free tier exists; paid tiers (Pro / Max / Team / Enterprise) unlock more.
- Claude Code: included with Pro/Max plans, also available via API billing.
- Cowork: paid plans, desktop app, primarily macOS-mature.
- Dispatch: research preview inside Cowork, Pro and Max.
- Chrome, Excel, Design: research previews, paid plans.
- API: pay-as-you-go, no consumer plan needed.

For exact current access details, see Anthropic's plan page and the individual product pages in [/products](/products).

## A short version

If you only remember one thing per product:

- Claude.ai — chat, the default
- Claude Code — agent in your terminal
- Cowork — agent on your desktop
- Dispatch — phone as remote for Cowork
- Mobile app — Claude in your pocket
- Chrome — agent in a browser tab
- Excel — agent in a spreadsheet
- Design — visual work, prototypes, decks
- API — for builders

Pick by what the task *shape* is, not by what's newest.

---
title: Chrome
lede: Claude in the browser — the Chrome extension and what it adds to your workflow.
section: products
---

A browser extension that turns Claude into an agent inside your Chrome session. It opens in a side panel, reads what you read, clicks what you tell it to click, and fills forms. It is currently in beta and available to all paid plans (Pro, Max, Team, Enterprise).

The reason it matters separately from chat or [Cowork](/products/cowork): it operates inside your authenticated browser. Your logged-in sessions, your cookies, your access. Tasks that an API would hit a wall on, anything sitting behind login, anything spread across SaaS dashboards, anything that needs to act like a human at a keyboard. Chrome handles those cleanly because that is literally what it is doing.

Officially, the extension is supported on Google Chrome only. Other Chromium browsers and mobile devices are not supported.

## What you can do with it

The basic loop is: open the side panel, describe a task, watch Claude work the page. It can navigate single pages or coordinate across multiple tabs. Drag tabs into Claude's tab group and it sees all of them at once.

Past the basics, three features carry most of the leverage:

**Recording.** Hit the record icon, do the task once with your hands, then stop. Claude turns it into a saved shortcut with a name, a prompt, and a starting URL. From then on, type `/` to trigger it. Recording is far more reliable than describing the workflow in text. You are showing Claude exactly what you clicked instead of trying to put it in words.

**Shortcuts.** Saved prompts you reuse with `/`. Anything you have found yourself typing twice belongs here. You can also turn an existing successful chat into a shortcut with "Convert to task" in the conversation header.

**Scheduling.** The clock icon in the top right schedules any shortcut to run daily, weekly, monthly, or yearly. This is what turns a one-off automation into an ongoing one.

There is also a permission mode called "Ask before acting." Claude builds a plan, you approve it, then it runs the whole thing autonomously inside that plan. It only stops for high-risk actions or when something falls outside the plan.

Model availability depends on plan. Pro is locked to Haiku 4.5. Max, Team, and Enterprise can pick Haiku, Sonnet, or Opus 4.7 per task.

<svg viewBox="0 0 700 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Automation progression in Claude in Chrome: from manual prompting every time, to record once, to save as a shortcut, to schedule the shortcut. Each stage reduces human effort.">
  <defs>
    <style>
      .cr-label { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 12px; fill: var(--color-text, #e8e8e8); }
      .cr-label-strong { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 13px; font-weight: 600; fill: var(--color-text, #e8e8e8); }
      .cr-label-muted { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 10px; fill: var(--color-text-muted, #9a9a9a); }
      .cr-label-effort { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.04em; fill: var(--color-text-muted, #9a9a9a); }
      .cr-label-accent { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.04em; fill: var(--color-accent, #c97b48); }
      .cr-box { fill: var(--color-surface, #1a1a1a); stroke: var(--color-border, #2e2e2e); stroke-width: 1; }
      .cr-box-accent { fill: var(--color-surface-accent, #1f1f1f); stroke: var(--color-accent, #c97b48); stroke-width: 1.5; }
      .cr-bar { fill: var(--color-border, #2e2e2e); }
      .cr-arrow { stroke: var(--color-border-strong, #555); stroke-width: 1.25; fill: none; marker-end: url(#cr-arrowhead); }
    </style>
    <marker id="cr-arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 z" fill="var(--color-border-strong, #555)" />
    </marker>
  </defs>
  <!-- Effort label top-left -->
  <text class="cr-label-effort" x="10" y="22" text-anchor="start">HUMAN EFFORT</text>
  <!-- Effort bars (descending heights: 64, 44, 28, 12) aligned to baseline y=76 -->
  <rect class="cr-bar" x="32" y="28" width="100" height="48" rx="2" />
  <rect class="cr-bar" x="208" y="44" width="100" height="32" rx="2" />
  <rect class="cr-bar" x="384" y="58" width="100" height="18" rx="2" />
  <rect class="cr-bar" x="560" y="68" width="100" height="8" rx="2" />
  <!-- Stage boxes (all start at y=90) -->
  <rect class="cr-box" x="10" y="90" width="144" height="72" rx="5" />
  <text class="cr-label-strong" x="82" y="112" text-anchor="middle">Manual prompting</text>
  <text class="cr-label-muted" x="82" y="128" text-anchor="middle">describe the workflow</text>
  <text class="cr-label-muted" x="82" y="142" text-anchor="middle">every single time</text>
  <line class="cr-arrow" x1="155" y1="126" x2="183" y2="126" />
  <rect class="cr-box" x="188" y="90" width="144" height="72" rx="5" />
  <text class="cr-label-strong" x="260" y="112" text-anchor="middle">Record once</text>
  <text class="cr-label-muted" x="260" y="128" text-anchor="middle">do it with your hands</text>
  <text class="cr-label-muted" x="260" y="142" text-anchor="middle">Claude captures the steps</text>
  <line class="cr-arrow" x1="333" y1="126" x2="361" y2="126" />
  <rect class="cr-box" x="366" y="90" width="144" height="72" rx="5" />
  <text class="cr-label-strong" x="438" y="112" text-anchor="middle">Save as shortcut</text>
  <text class="cr-label-muted" x="438" y="128" text-anchor="middle">trigger with / from the</text>
  <text class="cr-label-muted" x="438" y="142" text-anchor="middle">side panel, any time</text>
  <line class="cr-arrow" x1="511" y1="126" x2="539" y2="126" />
  <rect class="cr-box-accent" x="544" y="90" width="144" height="72" rx="5" />
  <text class="cr-label-strong" x="616" y="112" text-anchor="middle">Schedule it</text>
  <text class="cr-label-muted" x="616" y="128" text-anchor="middle">runs daily, weekly,</text>
  <text class="cr-label-muted" x="616" y="142" text-anchor="middle">monthly without you</text>
  <!-- Bottom labels -->
  <text class="cr-label-effort" x="82" y="180" text-anchor="middle">HIGH EFFORT</text>
  <text class="cr-label-accent" x="616" y="180" text-anchor="middle">RUNS WITHOUT YOU</text>
</svg>

## How to use it well

**Pick tasks where being logged in is the point.** This is where Chrome shines and where other tools fail. Authenticated CRM lookups, inbox triage, pulling metrics out of SaaS dashboards behind SSO, filling forms on internal tools. If a public API or scraper would do the job, you probably do not need this; use the cleaner option.

**Record, do not prompt, for anything you will do twice.** Two reasons. First, words are lossy: "find the export button" describes intent, recording captures the actual click target on the actual UI. Second, your description re-derives the steps every run; a recording follows a demonstrated pattern. Both are more reliable when sites shift slightly.

**Schedule what is recurring.** This is the difference between Claude being a faster manual worker and Claude being something that runs without you. The Monday metrics pull, the weekly competitor check, the monthly expense reconciliation. Record once, schedule once, then it just happens.

**Treat the browser as the input layer in a chain.** Chrome gathers, [Cowork](/products/cowork) formats, [Claude Code](/products/claude-code) builds. When the deliverable is an Excel model or a deck, pipe Chrome's output into Cowork instead of trying to make Chrome produce the file. When you are shipping code that talks to a website, pair Chrome with Claude Code so the loop becomes: build in the terminal, verify in the browser. Claude can read console errors, network requests, and DOM state directly, which closes the loop most agentic coding setups leave open.

**Start with "Ask before acting" until you trust the pattern, then graduate.** First runs of a new workflow should be supervised. Once you have watched it work three times without surprise, let it run.

## What people get wrong

**Treating it like chat.** Chrome is not for asking questions. It is for delegating actions. If your message would work the same in a regular Claude chat, you are using the wrong tool.

**Underestimating the usage cost.** Browser automation burns through usage limits faster than text chat. Every page Claude reads becomes part of the prompt. If you also rely on chat for daily work, heavy Chrome use can push you toward the limit mid-week. Pro users feel this most because they are already model-locked.

**Trying to write a workflow that should be recorded.** Anyone who has tried to describe a UI in prose knows how hard it is. Do not.

**Skipping tab groups.** Most people use the side panel and never realise they can hand Claude multiple tabs at once. Drag the tabs into Claude's group, then ask one question across all of them. This is one of the actual advantages over chat.

**Running it on sensitive accounts during beta.** The product is genuinely useful and genuinely beta. In May 2026, researchers at LayerX disclosed a vulnerability called ClaudeBleed where any Chrome extension could issue commands to Claude in Chrome through a flaw in its messaging interface. Anthropic shipped a partial fix, but the same researchers demonstrated bypasses against the patched version. Until that class of issue is fully resolved: do not point it at your primary banking, password manager, or production admin panels. Use it on lower-stakes sites first. The same logic applies to any new browser extension you install while Claude in Chrome is active; a malicious extension can borrow Claude's permissions.

## Examples

**Authenticated contact lookup.** Give Claude a list of company names plus the role you want at each. Claude navigates LinkedIn or the company site in your logged-in session, finds the matches, and pulls them into a structured list ready for your CRM. Works because it is running as you, doing what you would do manually. (At small scale this is normal sales research behaviour; at industrial scale it is what gets accounts banned. Know which side you are on.)

**Weekly metrics report from multiple dashboards.** Record yourself logging into each tool, opening the right report, copying the numbers, pasting into a sheet. Save as a shortcut. Schedule it for Monday morning. The report writes itself while you are getting coffee.

**Inbox follow-up scan.** "Review my sent emails from the past month. Find ones that should have gotten a reply but did not. Draft contextual follow-ups for my review." Claude works through the sent folder and surfaces threads you let drop. Particularly good for catching dropped client conversations.

**Build-test-verify for web work.** Paired with [Claude Code](/products/claude-code): build the change in the terminal, then have Chrome load the page, exercise the affected flow, read the console, and report what is broken. Closes the dev loop without leaving the workflow.

---
title: Usage and limits
lede: "How Claude's usage limits actually work. The two clocks, the shared pool across surfaces, how to read the dashboard, what burns usage faster, and what to do when you hit the wall."
section: settings
---

How much you can use Claude depends on your plan, what you're doing, and which clocks you're inside. This page explains how the system actually works and how to read the dashboard at [Settings > Usage](https://claude.ai/settings/usage).

Anthropic hasn't published fixed token quotas for consumer plans. The numbers vary with conversation length, attachments, tools enabled, model choice, and current demand. The right mental model isn't "how many messages do I get per day." It's "how full are my buckets right now, and which clock am I bumping into."

## The two clocks

Every paid plan has two limits running at once.

**The session limit** is a five-hour rolling window. It starts the moment you send your first message and resets exactly five hours later. While the window is open, every message and tool call from any Claude surface counts against the same bucket. When the five hours are up, the session resets and you're back to full. You can have several windows overlapping if you start work at staggered times.

**The weekly limit** is a seven-day rolling window. It exists to prevent a small number of heavy users from saturating capacity, and it usually only matters if you're a daily power user. Free, Pro, and Max plans all have a weekly limit. Max plans have two: one across all models and a second specifically for Sonnet or Opus. The split exists because Anthropic allocates the heavier-model budget separately from total usage. Individual products can carve out their own weekly limits too. Claude Design, for example, has its own weekly cap on the dashboard separate from "All models."

Hit the session limit and you wait up to five hours. Hit the weekly limit and you wait days. The session limit is the one you bump into casually. The weekly limit is the one that surprises people who didn't know it existed.

## One pool, many surfaces

<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Claude usage model: four surfaces (claude.ai chat, Cowork, Claude Code, and the desktop app) all drain into a single shared usage pool, which is measured by two clocks: a five-hour rolling session window and a seven-day rolling weekly window.">
  <text x="350" y="22" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="600" letter-spacing="1.2">ONE POOL, TWO CLOCKS</text>
  <text x="350" y="40" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.55" font-style="italic">all surfaces drain the same usage bucket</text>
  <rect x="80" y="60" width="120" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="140" y="85" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12">claude.ai chat</text>
  <rect x="220" y="60" width="120" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="280" y="85" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12">Cowork</text>
  <rect x="360" y="60" width="120" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="420" y="85" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12">Claude Code</text>
  <rect x="500" y="60" width="120" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="560" y="85" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12">Desktop app</text>
  <line x1="140" y1="100" x2="140" y2="125" stroke="currentColor" stroke-width="1.5"/>
  <line x1="280" y1="100" x2="280" y2="125" stroke="currentColor" stroke-width="1.5"/>
  <line x1="420" y1="100" x2="420" y2="125" stroke="currentColor" stroke-width="1.5"/>
  <line x1="560" y1="100" x2="560" y2="125" stroke="currentColor" stroke-width="1.5"/>
  <line x1="140" y1="125" x2="560" y2="125" stroke="currentColor" stroke-width="1.5"/>
  <line x1="350" y1="125" x2="350" y2="158" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="350,163 346,155 354,155" fill="currentColor"/>
  <rect x="160" y="165" width="380" height="80" rx="3" fill="#d97706" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>
  <text x="350" y="192" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.5">YOUR USAGE POOL</text>
  <text x="350" y="211" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.7">one bucket, shared across all surfaces</text>
  <text x="350" y="231" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">measured by two clocks</text>
  <line x1="260" y1="245" x2="260" y2="265" stroke="currentColor" stroke-width="1.5"/>
  <line x1="440" y1="245" x2="440" y2="265" stroke="currentColor" stroke-width="1.5"/>
  <rect x="180" y="265" width="160" height="55" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="260" y="288" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700" letter-spacing="0.5">SESSION</text>
  <text x="260" y="306" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.65">5-hour rolling window</text>
  <rect x="360" y="265" width="160" height="55" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="440" y="288" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700" letter-spacing="0.5">WEEKLY</text>
  <text x="440" y="306" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.65">7-day rolling window</text>
</svg>

Every Claude surface drains the same bucket. Chat in claude.ai, then Cowork, then Code, all in the same five-hour window: it's one usage pool. The most common "I hit my limit faster than expected" story is from someone using multiple surfaces and not realising they were drawing from the same pool the whole time.

The Free plan adds feature-specific ceilings on top of the general session limit. Heavy use of web search, deep research, or file uploads can hit a per-feature ceiling before ordinary chat would have hit the general one.

## How to read the dashboard

At [claude.ai/settings/usage](https://claude.ai/settings/usage) on a paid plan, the page is divided into four sections.

**Plan usage limits.** Your current session progress bar with a reset countdown. The bar fills as you use Claude. It turns red at 100%, with the time until your session window rolls forward shown next to it. Below the session bar are the weekly limits: typically "All models" plus per-product bars where they exist. Bars turn yellow as they approach the limit, red at 100%. A "Last updated" timestamp tells you how fresh the numbers are; the refresh icon next to it forces an immediate update.

**Additional features.** Some features have their own daily quotas separate from the main pool. The most common is "Daily included routine runs," the number of scheduled tasks you can trigger per day (five per day on Pro). When you haven't used a feature yet, the bar shows zero and says so explicitly.

**Extra usage.** A toggle for whether to keep using Claude after hitting the included limit. When enabled, additional usage is billed at standard API rates instead of being blocked. Below the toggle you'll see: the amount spent this month, a monthly spend limit you can adjust, your current pay-as-you-go balance, and auto-reload settings. The dashboard separates included usage from extra usage clearly, so you can see what your plan covered versus what you actually paid for.

**Usage history.** A view of past consumption patterns. Worth checking weekly if you're trying to budget, or figure out which workflow is burning the most.

On Free, the page is sparser. The session indicator works the same way; there's no extra usage option.

## What burns usage faster

Not every message costs the same. The factors that move the needle most:

**Long conversations cost more than fresh chats.** Every turn re-reads the entire conversation. By message thirty, every reply is paying for messages one through twenty-nine. Starting fresh chats for unrelated work saves real budget. See [/workflows/token-optimization](/workflows/token-optimization).

**Tools and connectors are token-intensive.** Every enabled connector adds context to every conversation when "Tools already loaded" is on. If you have many connectors and you're hitting limits, switching to "Load tools when needed" in Capabilities (or disabling connectors you aren't using) is one of the quickest wins.

**File creation costs more than chat.** Cowork generating a Word doc, spreadsheet, or PDF consumes more of your limit than equivalent chat does because code execution is part of the work. A heavy Cowork day shows up differently in the dashboard than a heavy chat day.

**Extended thinking is billed as output tokens.** Toggling it off for simple tasks (or using `/effort low` in Claude Code) cuts real cost. Don't turn it off for hard tasks where it earns its keep.

**Model choice matters.** Opus is meaningfully more expensive than Sonnet, and Sonnet is meaningfully more expensive than Haiku. Default to Sonnet. Reach for Opus only when you actually need it. Setting Haiku as the subagent model in Claude Code keeps exploration cheap.

**Project files are cached.** Documents stored in Projects use retrieval rather than re-tokenisation, which makes them cheaper than re-pasting the same files into every chat. If you reference the same materials across many conversations, put them in a Project once instead of uploading them every time.

**Re-uploading the same file is paying twice.** Same logic. Upload to a Project, or keep one chat open and reference there.

## When you hit the limit

The system tells you. You'll see a notification that you've hit the session or weekly limit, with options based on your plan.

**Wait for the reset.** The cheapest option. The session resets in up to five hours. The weekly resets in up to seven days. The dashboard shows the exact countdown.

**Enable extra usage.** Available on Pro, Max 5x, and Max 20x. When you hit your included limit, usage continues at standard API rates instead of being blocked. Set a monthly cap, alerts, and auto-reload thresholds in the same Extra usage section. Turn it on when you want continuity at any cost. Turn it off if you'd rather hit a wall than spend more. The dashboard splits included usage from extra usage so you can see what's been billed.

**Upgrade the plan.** Pro to Max 5x to Max 20x. Each step buys real headroom. Worth doing if you consistently hit limits and the extra-usage charges start to outweigh the price difference between tiers.

**Switch to the API.** If you're doing intensive work with long-context inputs or sustained throughput, the API at standard rates can be cheaper than a Max subscription plus heavy extra usage. The trade-off is no chat UI; you're building or using your own client.

If your subscription was bought through a mobile app store, extra usage can only be enabled and purchased on the web. The mobile apps don't let you turn it on directly.

## Choosing a plan based on usage

A rough heuristic. The plan-vs-plan details live in [/foundations/choosing-a-product](/foundations/choosing-a-product); here we're just talking about usage capacity.

**Free** works for trying Claude out, occasional questions, and light personal use. You'll hit the session limit if you go deep on one task.

**Pro** is the default for daily use. About five times the session capacity of Free, plus a weekly cap that mostly bites if you push hard every day.

**Max 5x** for people who use Claude as a main work tool and frequently bump into Pro limits. Especially worth it if you use Claude Code regularly, since Code burns through Pro limits fast on real projects.

**Max 20x** for people running Claude Code as a serious workflow tool, or who use Cowork heavily, or both. Hard to hit the 20x ceiling typing as a human. Easy to hit it running multiple Code sessions in parallel.

**Team and Enterprise** are about shared billing and admin controls more than per-seat capacity. If you're choosing for an organisation, the math is different.

## A note on recency

Limits change. As of May 2026, Anthropic doubled Claude Code's five-hour limits for Pro, Max, Team, and Enterprise plans and removed peak-hour reductions from Pro and Max. The numbers in your dashboard are the truth; the numbers in any blog post (including this one) are a snapshot.

The durable facts are structural: two clocks (session and weekly), one shared pool across all surfaces, extra usage as overflow when enabled. The specific quantities in each bucket are a moving target. Check the dashboard.

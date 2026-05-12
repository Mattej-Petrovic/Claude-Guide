---
title: Research
lede: Claude's agentic research mode. When to use it, how to prompt it, and when web search is enough.
section: concepts
---

The Research button on the chat input puts Claude into agentic research mode. Instead of one or two searches, Claude plans an approach, runs many searches in sequence, reads multiple sources, cross-references findings, and returns a structured report with inline citations. Available on paid plans (Pro, Max, Team, Enterprise) with web search enabled.

A normal Claude turn answers from training data. Web search adds a handful of lookups when current info is needed. Research goes further: it operates over minutes, runs 5 to 20 or more tool calls, and synthesizes across many sources into something that reads more like a research brief than a chat response.

## How it works

Toggle Research on (the button turns blue) and ask your question. Claude does roughly this:

1. Plans the research approach. Extended thinking auto-activates for this step.
2. Runs initial searches across the web and any connected integrations (Gmail, Calendar, Google Docs, Drive, Slack, Notion, depending on what you have connected).
3. Reads full pages, not just snippets.
4. Identifies gaps and contradictions, runs follow-up searches.
5. Synthesizes findings into a structured markdown report with citations linking back to sources.

Most runs land in 1 to 3 minutes. Heavier ones go longer. The output is sectioned markdown with headers, bullets, sometimes tables, and citations inline so you can verify the claims that matter to you.

<svg viewBox="0 0 800 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comparison of three Claude modes: web search, extended thinking, and research" style="max-width: 100%; height: auto; margin: 2rem 0;">
  <defs>
    <style>
      .card { fill: none; stroke: currentColor; stroke-width: 1; opacity: 0.4; }
      .card-accent { fill: none; stroke: #d97706; stroke-width: 1.5; opacity: 0.7; }
      .mode-name { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; opacity: 0.6; }
      .mode-name-accent { fill: #d97706; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; }
      .stat-label { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 10px; opacity: 0.45; letter-spacing: 1px; }
      .stat-val { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 13px; opacity: 0.85; }
      .desc { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 12px; opacity: 0.7; }
    </style>
  </defs>
  <rect x="20" y="20" width="240" height="280" rx="6" class="card"/>
  <text x="40" y="50" class="mode-name">WEB SEARCH</text>
  <text x="40" y="90" class="stat-label">TIME</text>
  <text x="40" y="110" class="stat-val">Seconds</text>
  <text x="40" y="140" class="stat-label">SOURCES</text>
  <text x="40" y="160" class="stat-val">1 to 5 lookups</text>
  <text x="40" y="178" class="stat-val">across the web</text>
  <text x="40" y="210" class="stat-label">BEST FOR</text>
  <text x="40" y="232" class="desc">Quick facts and</text>
  <text x="40" y="249" class="desc">current data when</text>
  <text x="40" y="266" class="desc">one or two sources</text>
  <text x="40" y="283" class="desc">can answer it.</text>
  <rect x="280" y="20" width="240" height="280" rx="6" class="card"/>
  <text x="300" y="50" class="mode-name">EXTENDED THINKING</text>
  <text x="300" y="90" class="stat-label">TIME</text>
  <text x="300" y="110" class="stat-val">Seconds</text>
  <text x="300" y="140" class="stat-label">SOURCES</text>
  <text x="300" y="160" class="stat-val">None</text>
  <text x="300" y="178" class="stat-val">(no external search)</text>
  <text x="300" y="210" class="stat-label">BEST FOR</text>
  <text x="300" y="232" class="desc">Harder reasoning on</text>
  <text x="300" y="249" class="desc">things Claude already</text>
  <text x="300" y="266" class="desc">knows.</text>
  <rect x="540" y="20" width="240" height="280" rx="6" class="card-accent"/>
  <text x="560" y="50" class="mode-name-accent">RESEARCH</text>
  <text x="560" y="90" class="stat-label">TIME</text>
  <text x="560" y="110" class="stat-val">1 to 3 minutes+</text>
  <text x="560" y="140" class="stat-label">SOURCES</text>
  <text x="560" y="160" class="stat-val">10+ across web</text>
  <text x="560" y="178" class="stat-val">and integrations</text>
  <text x="560" y="210" class="stat-label">BEST FOR</text>
  <text x="560" y="232" class="desc">Multi-source</text>
  <text x="560" y="249" class="desc">synthesis returned</text>
  <text x="560" y="266" class="desc">as a cited,</text>
  <text x="560" y="283" class="desc">structured report.</text>
</svg>

## When to use it (and when not to)

Research earns its time when:
- The answer needs many sources, not one
- The task involves comparison, synthesis, or due diligence
- You are building a list or table from a set of criteria
- You are updating something with current info from across the web
- You want sources cited so you can verify claims

It is overkill when:
- A single web search would answer (today's exchange rate, current weather)
- You just want Claude to think harder about something it already knows. Extended thinking on its own is the cleaner tool.
- The task is creative output, not information gathering

## How to use it well

**Write research-shaped prompts.** Short questions get short answers. Research is most useful when you give it something to chew on. "Research the trade-offs between Postgres and MongoDB for a real-time analytics use case with high write volume and low query complexity" beats "what is better, Postgres or MongoDB."

**Define what success looks like.** Tell it what you want at the end. A comparison table. A ranked shortlist. A one-page brief. A set of recommendations with reasoning. Without this you get a generic information dump.

**Specify scope and constraints.** Geography, time window, budget, criteria, what to exclude. The more specific the brief, the more useful the report.

**Reference internal context when relevant.** Words like "our," "my," and specific document or email names signal Claude to pull from connected integrations alongside the web. "Compare these vendors with what we have already evaluated in Drive" reaches both sides at once.

**Use it where it compresses real hours.** The kind of task that would take you a day of tabs and notes is exactly where Research pays off. A 30-second Google query is not.

**Spot-check the citations.** Research reduces hallucination but does not eliminate it. For anything you will act on, click through 2 or 3 sources and confirm what is claimed actually appears there. The citation existing is not the same as the claim being correct.

## Common mistakes

**Using it for quick lookups.** A one-fact question does not need 15 searches. Web search alone is faster and the answer is the same.

**Vague prompts.** "Research AI" gives you a Wikipedia summary in fancier formatting. Specific scope, specific output format, specific decision the report is supporting.

**Treating the report as final.** It is a starting point. The citations link to real sources for a reason. Verify the claims that matter before you act on them.

**Forgetting integrations exist.** If your Gmail and Drive are connected, Research can pull from them in the same run as the web. Most people only think about web sources and miss half the value.

**Reaching for Research when extended thinking would handle it.** If the task is "reason carefully about something I already gave you," not "find information out there," extended thinking on its own does the job in less time.

## Examples

**Sourcing targets for outreach or list-building.** Companies, products, services, or people that match specific criteria in a specific area. The kind of task where you would otherwise tab through search results, open LinkedIn, and copy into a sheet for hours. Research compresses it into a structured list with sources you can verify.

**Vendor or tool comparisons.** Side-by-side analysis of options against your specific constraints. Pricing, features, integrations, gotchas. The report becomes the doc you bring into the decision conversation.

**Due diligence before a call or meeting.** Background on a person, company, market, or topic you want to walk in informed about. Recent news, competitive landscape, public statements, key context.

**Updating a stale document.** Point Research at a Drive doc or paste content in, ask it to refresh anything outdated against current sources, and you get a list of what changed plus links to the new info.

**Multi-angle exploration of an unfamiliar topic.** When you do not yet know what you do not know. Research surfaces angles you would not have searched for, because it identifies gaps and chases them automatically.

**Synthesizing inbox plus external context.** With Gmail connected, Research can pull what you owe across threads and bring web context for any unfamiliar references in those emails into one report.

---
title: Notion
lede: "Running Notion and Claude as two halves of one system. Notion as the structured source of truth, Claude as the thinking and building engine, connected live so it can read your workspace and write back into it."
section: systems
---

Notion is where a lot of people already keep the real version of their work: databases, SOPs, project trackers, meeting notes, the shared context a team runs on. Once you start using Claude seriously, the instinct is to treat that as something to migrate away from. It is not. Notion and Claude are better understood as two halves of one system, each doing the half the other is bad at.

Notion is a structured, shared, durable source of truth. It is relational, filterable, visible to a team, and it persists. Claude is a thinking and building engine: it reasons across a lot of context at once, drafts and restructures, and generates new structured content. Notion is where work lives. Claude is what does the work to it. The connector is the bridge that lets Claude read your workspace and write back into it without you copying anything between the two.

This page is about working that pairing, not installing it. It sits alongside the [Obsidian and Graphify](/workflows/obsidian-graphify) page as the other concrete home for the knowledge layer described on the [second brain](/systems/second-brain) page, and the difference between them is the tradeoff. Obsidian is local markdown: private, single-player, yours on disk. Notion is hosted and structured, built for sharing and for relational data. Same idea, opposite ends of the same dial. Pick by which end your work actually lives at.

One clarification first, because it is a common mix-up. Notion has its own built-in AI. Notion AI is good at inline work: a quick rewrite, an autofill, a summary inside a page. Claude through the connector is for the heavier half: reasoning over the whole workspace and producing entire structured artifacts. Use Notion AI for micro-edits in place, Claude for macro-thinking and building. They are not competitors. They sit at different altitudes.

## How Claude reaches Notion

The bridge is the Notion connector, which speaks the same [MCP](/extending/mcp) standard as the rest of Claude's integrations. Once connected, the link is live and two-way.

- **Read.** Claude can search across your pages and databases and pull the right content back. *"Find every project page that mentions ready for dev."* No export, no copy-paste.
- **Write.** Claude can create pages with structured content, update properties such as a task status, add entries to a database, leave comments, and reorganise. *"Create a meeting notes page for today's standup with the action items."*

It works across every surface Claude runs on: claude.ai, the [Cowork](/products/cowork) desktop app, [Claude Code](/products/claude-code), mobile, and the API, on the paid plans. There is also an offline path worth knowing. You can export Notion pages and load them into Cowork when you want Claude to reason over a large static snapshot of a whole system at once, or restructure it in bulk before pushing changes back. The live connector is the default; exports are for big one-time surgery.

Worth correcting an out-of-date belief you will still see repeated: that Claude can only read Notion, or needs exports to see anything at all. That was true in the connector's early days. It now reads and writes live. The practical consequence is that the write side deserves the same care you would give any tool that can change your source of truth, which is what the security section below is about.

<svg class="svg-wide" viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Notion and Claude as two halves of one system. On the left, Notion is the structured source of truth: databases and relations, SOPs and knowledge base, dashboards and reporting, tasks and CRM. On the right, Claude is the thinking and building engine: reason and plan, draft and rewrite, restructure in bulk, generate structured pages. A live connector between them carries read and search from Notion to Claude, and create, update, and comment from Claude back to Notion. Both rest on a shared architecture: PARA folders, identity and About-Me files, and a context map that says where things live.">
  <text x="400" y="28" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="600" letter-spacing="1.4">TWO HALVES, ONE SYSTEM</text>
  <text x="400" y="46" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.55" font-style="italic">Notion holds the source of truth, Claude does the thinking, the connector ties them live</text>

  <!-- Notion -->
  <rect x="40" y="80" width="240" height="180" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="60" y="108" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.6">NOTION</text>
  <text x="60" y="126" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.55" font-style="italic">structured source of truth</text>
  <text x="60" y="158" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11.5" opacity="0.8">· databases + relations</text>
  <text x="60" y="182" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11.5" opacity="0.8">· SOPs + knowledge base</text>
  <text x="60" y="206" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11.5" opacity="0.8">· dashboards + reporting</text>
  <text x="60" y="230" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11.5" opacity="0.8">· tasks · CRM · calendars</text>

  <!-- Claude -->
  <rect x="520" y="80" width="240" height="180" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.75"/>
  <text x="540" y="108" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.6">CLAUDE</text>
  <text x="540" y="126" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.55" font-style="italic">thinking + building engine</text>
  <text x="540" y="158" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11.5" opacity="0.8">· reason + plan</text>
  <text x="540" y="182" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11.5" opacity="0.8">· draft + rewrite</text>
  <text x="540" y="206" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11.5" opacity="0.8">· restructure in bulk</text>
  <text x="540" y="230" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11.5" opacity="0.8">· generate structured pages</text>

  <!-- connector: read -->
  <line x1="284" y1="150" x2="513" y2="150" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="513,145 521,150 513,155" fill="#d97706" fill-opacity="0.7"/>
  <text x="400" y="142" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.7">read · search</text>
  <!-- connector: write -->
  <line x1="516" y1="200" x2="287" y2="200" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="287,195 279,200 287,205" fill="#d97706" fill-opacity="0.7"/>
  <text x="400" y="216" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.7">create · update · comment</text>
  <text x="400" y="178" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.5" font-style="italic">live connector · MCP</text>

  <!-- ties down to spine -->
  <line x1="160" y1="260" x2="160" y2="286" stroke="currentColor" stroke-width="1" stroke-opacity="0.2"/>
  <line x1="640" y1="260" x2="640" y2="286" stroke="currentColor" stroke-width="1" stroke-opacity="0.2"/>

  <!-- shared spine -->
  <rect x="40" y="288" width="720" height="56" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="60" y="312" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="0.8">SHARED ARCHITECTURE</text>
  <text x="60" y="332" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11.5" opacity="0.8">PARA folders · identity / About-Me files · a context map that says where things live</text>

  <text x="400" y="366" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6" font-style="italic">Mirror the structure on both sides and the two stop feeling like separate tools.</text>
</svg>

## When to use which

Most of the value is simply knowing which half does what, and not asking either to do the other's job. The rule of thumb: Notion for structured, shared, ongoing work, and Claude for thinking, building, and one-off generation. A good division has Claude generate the twelve-week plan and Notion run the execution, or Claude draft the SOP and Notion store and share it.

| Reach for Notion when | Reach for Claude when |
| --- | --- |
| The work is structured and belongs in a database | The work is reasoning, drafting, or restructuring |
| It is shared and the team needs visibility | It is personal, or a working draft |
| It is ongoing: tracking, status, reminders | It is a one-off build: a plan, an SOP, a layout |
| You need dashboards, filters, and relations | You need multi-file or multi-format output |
| The job is execution and persistence | The job is thinking and generation |

## Make the two mirror each other

The connector is plumbing. What turns two tools into one system is structure that matches on both sides, so Claude never has to guess how your world is shaped.

**Same skeleton.** Organise both around the same vocabulary. [PARA](/systems/second-brain) (Projects, Areas, Resources, Archives) is the common choice. When your Notion databases and your Claude-side folders use the same names for the same things, Claude knows where a new thing belongs without being told each time.

**A context map.** This is the single highest-return file in the whole setup. A short note that tells Claude where things live in your Notion: which database holds clients, where SOPs go, what the content pipeline is called, which views matter. It is the [CLAUDE.md router](/systems/second-brain) idea applied across the boundary between the two tools. Without it, Claude searches blindly and sometimes writes into the wrong place. With it, it goes straight to the right database.

**Identity files.** Keep your [voice profile](/concepts/voice), a short who-you-are and what-you-are-building note, and your standing preferences where Claude reads them before it writes anything. This is the same About-Me layer covered on the [Memory](/concepts/memory) and [project files](/concepts/project-files) pages. With it in place, the pages Claude creates in Notion come out in your voice and on your terms instead of generic.

The payoff is that a request like *"draft this quarter's content plan and add it to the content database"* just works. Claude knows the structure because it matches PARA, knows where it goes because of the context map, and writes it the way you would because of the identity files.

## Working patterns

A handful of shapes cover most of what this pairing is good for.

**Read and synthesise.** Ask a question across the workspace and let Claude search, read, and reason: *"Pull every open item from the decisions database and tell me which ones are blocking the launch."* This is the lowest-risk way to start, because nothing gets written.

**Draft, preview, push.** Build the artifact in a Claude [Artifact](/concepts/artifacts) first, an SOP, a structured plan, a page layout, review it there, then have Claude create it as a Notion page. The Artifact is the drafting room; Notion is where the finished thing lands.

**Restructure in bulk.** For a large reorganisation, export the relevant pages into [Cowork](/products/cowork), let Claude analyse and rewrite the whole system as local files, then push the result back. This is the multi-file job the live connector is not built for.

**Generate, then hand off execution.** Claude produces the plan, the checklist, the project skeleton; Notion tracks and runs it. Claude is better at making the tasks. Notion is better at managing them over time.

**Run it on a schedule.** A weekly briefer that reads the right databases and drafts a summary is the maintenance-loop [pattern](/systems/patterns) pointed at Notion: a [scheduled](/concepts/loops) run fires, Claude reads the workspace, and it produces something for you to glance at. Only promote it to a schedule after you have run it by hand and trust what it does.

A first project, end to end, scoped small enough to trust:

1. Connect Notion and grant the connection access to **one area only**, not your whole workspace.
2. Write a one-page context map for that area: where each kind of thing lives.
3. Run a **read** task. Ask Claude to find and summarise something across the area, and confirm it surfaces the right pages.
4. Run a **write** task. Have it draft a page and create it in Notion, then check exactly what it wrote.
5. Add your identity files so the next draft already sounds like you.

That is a working Notion-and-Claude loop. Everything else is widening the scope as your trust grows.

## Security and honest limits

The connector is useful precisely because it reaches into your real workspace, which is also why it needs care. This is the lethal trifecta from the [second brain](/systems/second-brain) page in a specific form: Claude has access to private Notion data, it ingests content other people wrote (pages, comments, pasted material), and it can write and act. Some honest constraints to hold onto:

- **It acts with your Notion permissions.** The connection can reach everything you can reach. You scope it by sharing only the pages and databases it needs, and the safe move is to start single-player before pointing it at shared team spaces.
- **Review every write.** Claude creating one page is cheap to check. Claude updating properties or reorganising at scale is not. Gate bulk or irreversible changes behind your own eyes. That is the [where the human lives](/systems/where-the-human-lives) rule applied to your workspace.
- **It can misread database relations.** Linked databases, rollups, and relations are exactly where Claude is most likely to get the structure subtly wrong. Verify anything that depends on a relation being correct.
- **It does not see what you have not shared.** Claude is not browsing your whole workspace. It sees what you connected and what your account can access. When it misses something, the access scope is the first place to look, not the model.
- **The integration is still maturing.** Capabilities and rough edges move from release to release. Treat it as a strong and improving tool, not a finished one.

## Common mistakes

**Treating Claude as a replacement for Notion AI, or the reverse.** They are different layers. Notion AI for inline micro-edits, Claude for macro reasoning and whole artifacts. Reaching for the wrong one is just friction.

**Skipping the context map.** Without a note telling Claude where things live, it searches blindly and writes into the wrong place. The map is the cheapest, highest-return thing on this page, and the first thing to build.

**Letting Claude write broadly and unscoped.** Connecting the entire workspace and granting wide write access on day one. Scope down, review the writes, widen slowly as trust builds.

**Letting the two drift.** Copying your Notion source of truth into Claude as a parallel store and then editing both. Keep Notion canonical. Claude reads and writes it; it does not fork it.

**Automating before trust.** A scheduled agent built on a workflow you have never watched run is unattended risk, the same cadence mistake as everywhere else in this section.

**Believing Claude sees everything.** It sees what you shared. Generic or incomplete answers are usually a scope problem, not a model problem.

## When this is for you

If you already live in Notion, or you work with a team that needs shared structure and visibility, this pairing is the natural shape: Notion keeps the source of truth, Claude does the thinking and building against it. If you are solo and happy in plain files, the local [Obsidian](/workflows/obsidian-graphify) route is simpler and more private, and the [second brain](/systems/second-brain) page is the framework both of them sit under. Most people land on some of both in the end: the structured, shared things in Notion, the messy personal and build-heavy things in local files, and Claude moving between them as the one engine that works across the whole thing.

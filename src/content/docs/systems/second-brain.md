---
title: Second brain
lede: "Turning Claude from something you query into a system that holds your context, knows your work, and can act on it. The retrieval levels, the build order, and the security model for setting one up without it becoming noise."
section: systems
---

The phrase "second brain" is older than the current wave of AI. In Tiago Forte's book of that name, a second brain is a personal knowledge system: capture what matters, organise it so you can find it later, and reuse it instead of relearning it. The idea is sound and the method works, but it is passive. The notes sit where you filed them until you go looking. A vault of markdown, however lovingly tagged, is a filing cabinet. It is not a brain.

What changed is that something can now read the filing cabinet for you. A second brain built around Claude is the active version of the same idea. It still holds your context, but it also retrieves across all of it at once, connects things you would never have thought to connect, drafts from it in your own voice, and at the far end does work against it before you ask. The storage barely changes. The thing that changes is that something reads it, and that difference is the whole subject.

This page is not about one tool you install. It is about an architecture, and it is mostly tool agnostic, though everything here grounds in real Claude mechanisms covered elsewhere in this guide. There are three questions to get right: how to store context so it can actually be found, how to connect Claude to your real data and actions, and how far to let the system run ahead of you. Most people get the first one wrong by overbuilding it, so that is where we start.

## What a second brain has to do

Strip away the aesthetics and the job is three verbs. **Capture**: get information in. **Retrieve**: find the right piece again when it matters. **Act**: do something useful with what was found. Capture is the part everyone enjoys and the part that matters least; dropping files into a folder is not hard. Acting is what Claude is already good at once it has the right context in front of it. The hard part, the part that decides whether the whole thing works, is retrieval.

There is one test for retrieval, and it is worth holding onto: can both you and the agent find it again? Not "is it stored" but "when a question comes up six weeks from now, does the relevant note actually surface?" A second brain that captures everything and surfaces nothing is a hard drive with extra steps.

That test has a consequence most people skip. You cannot design the storage first and work out retrieval later. You have to work backwards from the questions you expect to ask and let those questions dictate how the data is structured. A folder you organised because it looked tidy will fail the moment the question does not match the tidiness. Structure for retrieval, not for aesthetics. The rest of this section is the menu of ways to retrieve, from the cheapest to the most elaborate.

## The retrieval ladder

<svg class="svg-wide" viewBox="0 0 800 510" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The retrieval ladder. Five levels of memory retrieval stacked from the foundation upward. Level 1 exact-match routing: CLAUDE.md as router and intentional folders, good when you can name what you want. Level 2 indexed wiki: LLM-written markdown pages, an index, and wikilinks, good for following a topic across notes. Level 3 semantic search: embeddings and chunking retrieved by meaning, good for lookup by similarity at scale. Level 4 relationship graph: explicit entities and relations traversed in hops, good for tracing a chain of connections. Level 5 always-on: scheduled agents that gather context and act first, good when the system should reach you. An arrow up the side shows that climbing the ladder adds power, cost, and upkeep.">
  <text x="400" y="28" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="600" letter-spacing="1.4">THE RETRIEVAL LADDER</text>
  <text x="400" y="46" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.55" font-style="italic">choose the lowest level that answers your question</text>

  <!-- up arrow -->
  <line x1="80" y1="446" x2="80" y2="84" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="74,90 80,76 86,90" fill="#d97706" fill-opacity="0.7"/>
  <text transform="rotate(-90 54 265)" x="54" y="265" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.6" font-style="italic">more power · more cost · more upkeep</text>

  <!-- L5 -->
  <rect x="130" y="70" width="580" height="62" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="150" y="107" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="17" font-weight="700">L5</text>
  <text x="192" y="95" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12.5" font-weight="700" letter-spacing="0.6">ALWAYS-ON</text>
  <text x="192" y="115" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.8">scheduled agents gather context and act first</text>
  <text x="698" y="106" text-anchor="end" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.55" font-style="italic">the system reaches you</text>

  <!-- L4 -->
  <rect x="130" y="148" width="580" height="62" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="150" y="185" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="17" font-weight="700">L4</text>
  <text x="192" y="173" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12.5" font-weight="700" letter-spacing="0.6">RELATIONSHIP GRAPH</text>
  <text x="192" y="193" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.8">explicit entities + relations, traversed in hops</text>
  <text x="698" y="184" text-anchor="end" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.55" font-style="italic">trace a chain of connections</text>

  <!-- L3 -->
  <rect x="130" y="226" width="580" height="62" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="150" y="263" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="17" font-weight="700">L3</text>
  <text x="192" y="251" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12.5" font-weight="700" letter-spacing="0.6">SEMANTIC SEARCH</text>
  <text x="192" y="271" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.8">embeddings + chunking, retrieved by meaning (RAG)</text>
  <text x="698" y="262" text-anchor="end" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.55" font-style="italic">lookup by similarity at scale</text>

  <!-- L2 -->
  <rect x="130" y="304" width="580" height="62" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="150" y="341" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="17" font-weight="700">L2</text>
  <text x="192" y="329" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12.5" font-weight="700" letter-spacing="0.6">INDEXED WIKI</text>
  <text x="192" y="349" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.8">LLM-written markdown pages · an index · wikilinks</text>
  <text x="698" y="340" text-anchor="end" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.55" font-style="italic">follow a topic across notes</text>

  <!-- L1 (foundation, highlighted) -->
  <rect x="130" y="382" width="580" height="62" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.75"/>
  <text x="150" y="419" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="17" font-weight="700">L1</text>
  <text x="192" y="407" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12.5" font-weight="700" letter-spacing="0.6">EXACT-MATCH ROUTING</text>
  <text x="192" y="427" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.8">CLAUDE.md as router · intentional folders</text>
  <text x="698" y="418" text-anchor="end" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.55" font-style="italic">you can name what you want</text>

  <text x="400" y="480" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6" font-style="italic">Reverse-engineer from the questions you will ask. Most folders never need to leave the bottom rungs.</text>
</svg>

Different questions need different retrieval. The mistake almost everyone makes is reaching for the most powerful mechanism by default, because the powerful one sounds like the serious one. There is a ladder, and the good news is that you will rarely need to climb past the second rung.

**Level 1, exact-match routing.** A `CLAUDE.md` at the root acts as a router that points to a small set of intentional folders, and Claude finds things by reading the right file. This is the whole of it, and it goes much further than people expect. If you can name what you are looking for ("the Q3 planning notes," "my writing style guide," "the decision log for this project"), routing finds it instantly and at almost no token cost. A minimal version is just this:

```
brain/
├── CLAUDE.md          # router: what lives where, how to write new notes
├── context/           # who you are, goals, how you work
├── projects/          # one folder per active project
├── decisions/         # a running decision log
└── log/               # daily session notes
```

The `CLAUDE.md` does the orienting work. It is the same standing-instructions pattern documented on the [project files](/concepts/project-files) page: tell Claude what the vault is, where each kind of thing lives, and how to file something new. Keep it short. A router that has grown to four hundred lines is no longer a router. Almost every personal second brain should start and stay here, and many never need anything else.

**Level 2, the indexed wiki.** When you want to follow a topic *across* notes rather than open one by name, routing starts to strain and an index earns its place. The cleanest articulation of this level is Andrej Karpathy's "LLM-wiki," which he described publicly in early 2026: you keep immutable sources in a `raw/` folder, and Claude maintains a `wiki/` folder of generated markdown pages, an `index.md` that catalogues them, and a `log.md` of what it did. Three operations run the system. *Ingest* reads a source, writes a summary page, updates the entity pages it touches, and links them together. *Query* searches the wiki and answers with citations. *Lint* periodically hunts for contradictions, stale claims, and orphan pages. The wiki becomes, in his phrase, a persistent compounding artifact: you curate the sources and ask the questions, and the agent does the summarising, cross-referencing, and bookkeeping that makes a knowledge base actually useful over time. Obsidian is the popular front end for the same pattern. The [Obsidian and Graphify](/workflows/obsidian-graphify) page is the hands-on build for this level.

**Level 3, semantic search.** Now the question is by *meaning* rather than by name or link, across more documents than fit in any index. This is retrieval-augmented generation: documents are chunked, embedded as vectors, and the closest chunks to your query are pulled in. It is genuinely good at "find me the thing that is *like* this" across thousands of files, which the levels below cannot do. The catch is structural and worth knowing before you reach for it: chunking severs context. A vector store returns the passage that matched, not the whole document it came from, so it can answer a narrow lookup well and a "summarise everything I know about X" question poorly. Reach for it when you have real scale and similarity-shaped questions, not because vectors sound advanced.

**Level 4, the relationship graph.** Some questions are not about finding a document at all. They are about tracing a chain: what depends on what, who is connected to whom, which decision led to which outcome. That is a graph problem, and it wants explicit entities and the relations between them, traversed hop by hop. For codebases this is concrete and available: [Graphify](/workflows/obsidian-graphify) builds a queryable graph of functions, classes, and their relationships so Claude navigates by structure instead of grepping. Graphs are powerful and noticeably more costly to build and keep current, so they pay off only when the connection-tracing is the actual question you keep asking.

**Level 5, always-on.** At the top the system stops waiting to be queried. Scheduled agents gather context and surface or draft work before you ask: a morning brief, a flagged email, a draft reply waiting for review. This is the most powerful and the least forgiving level, because an always-on system that is not curated does not go quiet, it accumulates noise. The mechanics live in [Loops](/concepts/loops) and the maintenance-loop [pattern](/systems/patterns); the judgement is in deciding what is worth being interrupted for.

The design principle ties the ladder together: do not pick a level for the whole system, pick one per folder, by reverse-engineering from the question that folder has to answer. A real setup is usually a hybrid. Active projects live as Level 1 markdown because you find them by name. A research archive becomes a Level 2 wiki because you read it by topic. A pile of meeting transcripts goes to Level 3 vectors because you search them by similarity. The codebase gets a Level 4 graph. One system, four levels, each chosen because it matches how that data gets retrieved, not because it is higher up the ladder.

## The build order

<svg class="svg-wide" viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The build order, as a four-layer stack built from the bottom up. Layer 1 Context, the foundation: what Claude knows, built from CLAUDE.md, folders, and memory files. Layer 2 Connections: what it can see, built from MCP, connectors, and scoped keys. Layer 3 Capabilities: what it can do, built from skills and subagents. Layer 4 Cadence, at the top: when it runs, built from scheduled agents, hooks, and loops. An arrow up the side shows each layer rests on the one below, and the caption warns to automate last.">
  <text x="400" y="28" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="600" letter-spacing="1.4">THE BUILD ORDER</text>
  <text x="400" y="46" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.55" font-style="italic">build upward · automate last</text>

  <!-- up arrow -->
  <line x1="180" y1="394" x2="180" y2="84" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="174,90 180,76 186,90" fill="#d97706" fill-opacity="0.7"/>
  <text transform="rotate(-90 156 240)" x="156" y="240" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.6" font-style="italic">each layer rests on the one below</text>

  <!-- 4 Cadence (top) -->
  <rect x="230" y="70" width="340" height="66" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="250" y="111" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" font-weight="700">4</text>
  <text x="288" y="98" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.6">CADENCE</text>
  <text x="288" y="118" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.8">scheduled agents · hooks · loops</text>
  <text x="592" y="107" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.55" font-style="italic">when it runs</text>

  <!-- 3 Capabilities -->
  <rect x="230" y="156" width="340" height="66" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="250" y="197" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" font-weight="700">3</text>
  <text x="288" y="184" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.6">CAPABILITIES</text>
  <text x="288" y="204" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.8">skills · subagents</text>
  <text x="592" y="193" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.55" font-style="italic">what it can do</text>

  <!-- 2 Connections -->
  <rect x="230" y="242" width="340" height="66" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="250" y="283" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" font-weight="700">2</text>
  <text x="288" y="270" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.6">CONNECTIONS</text>
  <text x="288" y="290" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.8">MCP · connectors · scoped keys</text>
  <text x="592" y="279" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.55" font-style="italic">what it can see</text>

  <!-- 1 Context (foundation, highlighted) -->
  <rect x="230" y="328" width="340" height="66" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.75"/>
  <text x="250" y="369" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" font-weight="700">1</text>
  <text x="288" y="356" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.6">CONTEXT</text>
  <text x="288" y="376" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.8">CLAUDE.md · folders · memory files</text>
  <text x="592" y="365" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.55" font-style="italic">what it knows</text>

  <text x="400" y="424" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6" font-style="italic">Automating a system you have not yet run by hand is the most common way these go wrong.</text>
</svg>

A retrieval level tells you how context is stored and found. It does not tell you how to assemble a working system around it. For that there is an order, and the order matters more than any single piece. Build it from the bottom up. Context, then Connections, then Capabilities, then Cadence. Jumping ahead is the most reliable way to end up with something that looks impressive and that you do not trust.

**Context: what it knows.** This is the foundation, and it is the retrieval ladder from the previous section made concrete. The router and folders, plus a small set of durable files that personalise everything above them. A common convention is to keep a file for who you are, one for your goals and how you work, a decision log, and a running daily log that the agent appends to at the end of a session and reads at the start of the next. The rules from the [Memory](/concepts/memory) page apply exactly: this layer is signal over volume, and an empty version of it is worse than none, because the agent will fill the gap with plausible invention. See [project files](/concepts/project-files) for how the standing-instructions layer actually loads.

**Connections: what it can see.** A second brain that only knows what you typed into it is a diary. One wired to your live sources is a brain. This is where [MCP](/extending/mcp) servers and [connectors](/extending/connectors) come in: calendar, mail, repositories, task tracker, drive. The discipline here is not technical, it is about scope. Connect read-only first, grant the narrowest access that does the job, and add write access deliberately and late. The [permissions](/concepts/permissions) page is the reference; the principle is that every new connection is also a new way for something to go wrong, so you add them one at a time and watch what each one does.

**Capabilities: what it can do.** Once the context and connections are solid, the repeated work becomes worth packaging. A workflow you would otherwise re-explain every session, "process today's notes," "draft the weekly update," "research this into the archive," becomes a [skill](/extending/skills). Prefer several small, specialised skills over one that tries to do everything, and let heavier jobs fan out to [subagents](/concepts/subagents) so the exploration cost stays out of your main thread. Because each skill reads the context layer, its output comes back shaped like you: your format, your history, your preferences, not a generic answer.

**Cadence: when it runs.** Only now, with a system you have actually used by hand and come to trust, does proactivity make sense. Cadence is the trigger: manual when you invoke it, event-driven when something arrives, scheduled when it should run on a clock. Scheduled agents (Routines) run on cloud infrastructure so they fire whether or not your laptop is open; [hooks](/concepts/hooks) and [loops](/concepts/loops) handle the in-session and conditional versions. A morning brief that reads your calendar and inbox and drafts what needs a reply is the canonical example, and it is exactly the maintenance-loop [pattern](/systems/patterns): a schedule fires, the agent scans a body of work, and it produces something for you to glance at. The rule that keeps this safe is simple. Automate only what you have already run manually and watched succeed. Cadence built on an untested capability does not save you time, it generates work you now have to audit. When a scheduled job grows into something with branching logic, the [dynamic workflows](/concepts/dynamic-workflows) runtime is the durable way to express it.

## Build your first one

Enough architecture. Here is a complete Level 1 second brain you can stand up in an afternoon, using nothing but folders, a `CLAUDE.md`, and one skill. It is not a toy version. For most people this *is* the second brain, and the higher levels are things you add to it later, only if a real question forces the issue.

**1. Make the folders.** Create a directory and the skeleton from earlier, then open it in Claude Code so the agent runs inside it:

```
brain/
├── CLAUDE.md
├── context/
├── projects/
├── decisions/
└── log/
```

**2. Write the router.** This is the file that turns a folder of notes into something Claude can navigate. It is short on purpose, it describes where things live and how to file new ones, and it is the single highest-leverage thing on this page:

```markdown
# Second brain: router

This is my personal knowledge base. When I ask a question, look here before
anything else, and read only the files the question actually needs.

## Where things live
- context/    Who I am, my goals, how I work. Read this to personalise answers.
- projects/   One folder per active project: notes, status, open questions.
- decisions/  Decision log. One file per decision: what, why, what I rejected.
- log/        Dated session notes, newest last. The running memory.

## Filing new notes
- Summaries and project notes go in the matching folder as markdown.
- Every decision gets its own file in decisions/ with the reasoning, not just
  the outcome.
- At the end of a session, append a dated entry to log/ with what changed and
  what is still open.

## Style
- Write for my future self and for you: short, concrete, no filler.
```

**3. Seed the context layer.** Put a couple of durable files in `context/` so answers come back shaped like you rather than generic. A `context/about-me.md` with your role, domain, and how you want to be talked to does most of the work. The discipline from the [Memory](/concepts/memory) page applies here: signal over volume, and honest rather than aspirational. Three good lines beat a page of resume.

**4. Capture.** Now feed it. Capture is just putting things where the router says they go, and you can let Claude do the filing. Paste in a transcript or a long thread and say:

> Summarise the decisions from this call into `decisions/`, the action items into `projects/website-relaunch/`, and append a line to `log/` for today.

The agent writes the files, and your brain now knows something it did not know an hour ago.

**5. Retrieve.** This is the move the whole thing exists for, and it is worth seeing work once:

> Read my brain. What did we decide about pricing, and what reasoning did we reject?

Claude reads `CLAUDE.md`, the router sends it to `decisions/` and the relevant project, and it answers with citations to the files it used. Notice *why* it works: the question matches the structure, because you built the structure backwards from questions like it. That is the retrieval test from the top of the page, passing.

**6. Package the repeated move into a skill.** The first time you run a weekly review by hand, it is a prompt. The second time, make it a [skill](/extending/skills) so you never re-explain it. Create `.claude/skills/weekly-review/SKILL.md`:

```markdown
---
name: weekly-review
description: Run my weekly review of this second brain. Use when I say "weekly
  review", "what happened this week", or ask for a summary of recent progress
  and open threads across my projects and logs.
---

# Weekly review

1. Read the last seven dated entries in log/.
2. For each folder in projects/, read its status and open questions.
3. Produce: what moved this week, what stalled, and the three things most worth
   doing next. Cite the files you drew from.
4. Append the review as a dated entry in log/ so next week builds on it.
```

That is the Capabilities layer in miniature, and the description is the part that matters most, because it is the only thing Claude reads when deciding whether to fire the skill.

**7. Stop here until something forces you higher.** You now have a working second brain: context, capture, retrieval, and one capability that compounds. That is further than most setups people post about ever actually get. Add a [connection](/extending/mcp) when you are tired of pasting in data by hand, climb to a Level 2 wiki when routing stops finding things by name, and add [cadence](/concepts/loops) when a job you have run many times is worth waking up on its own. Not before.

## The security model

The moment a second brain becomes genuinely useful, it also becomes dangerous, for a specific and nameable reason. Security researcher Simon Willison calls it the *lethal trifecta*: an agent is exposed when it combines three capabilities at once. Access to private data. Exposure to untrusted content. And the ability to communicate externally. Any one of the three on its own is fine. The problem is that a useful second brain naturally has all three: it reads your private files, it ingests web pages and emails and transcripts you did not write, and it can send messages or call APIs. In that configuration a single poisoned input, a malicious instruction hidden in a web page or an email, can turn your own agent into the thing that quietly exfiltrates your data.

You usually cannot remove a pillar without removing the usefulness, so the work is to shrink each one. Limit private-data access to what a task needs, through scoped and read-only [permissions](/concepts/permissions), so a compromise reaches less. Treat everything ingested as untrusted, and keep the prompts that configure your system in files separate from the data the agent reads, so that content cannot quietly rewrite your instructions. Gate the outbound side hardest of all: anything irreversible, sending, deleting, paying, posting, sits behind a human checkpoint rather than running unattended. That is the [where the human lives](/systems/where-the-human-lives) argument applied to your own data. And keep one thing straight that the demos always blur: a prompt is not a permission. "Please do not touch production" is a wish. A key issued without write access is a control. Build the boundaries out of keys and scopes, not out of polite instructions.

## Common mistakes

**Building the cathedral before the congregation.** An elaborate vault with no notes in it answers no questions, and the agent will paper over the emptiness with confident guesses. The system gets more useful the more you feed it, and not before. Start small and let it earn each new layer.

**Climbing the ladder too early.** A vector database for forty notes, a knowledge graph for a single project, an always-on agent before you have run anything by hand. The higher levels cost more to build and far more to keep current. Use the lowest rung that answers your question, and climb only when it visibly fails.

**Cargo-culting the inventory.** The "31 commands, 48 skills, 7 MCP servers" posts are an aesthetic, not a method. The right number of skills is the number of workflows you actually run. Two you use weekly beat thirty you forgot you built.

**Believing the hype numbers.** The token-savings and hours-saved figures are real for the specific person, in the specific context, with the specific use case. They are not a promise to you. Your results depend on your data, your questions, and your willingness to maintain the thing.

**Automating before trusting.** Cadence built on a capability you have never watched run is not leverage, it is unattended risk. Run every proactive job by hand first. Promote it to a schedule only once you have seen it succeed and you know what it does when it fails.

**Mistaking prompts for permissions.** The single most expensive misunderstanding in this whole subject. Instructions shape behaviour; they do not enforce boundaries. The enforcement lives in scoped keys, read-only access, and human checkpoints on irreversible actions.

## When to keep it simple

Most people do not need most of this page, and saying so is part of using it well. If you want the value of a second brain without the build, the lighter stack already does a great deal. [Memory](/concepts/memory) and [Projects](/concepts/projects) on claude.ai give you durable context that follows you across conversations, and [Cowork](/products/cowork) is closer to a turnkey version of the proactive end. For a personal knowledge base, Level 1 routing plus a couple of skills covers the overwhelming majority of real use, and it will keep covering it for far longer than the inventory posts suggest.

The reason to go further is not that the architecture is impressive. It is that you have a specific question the level below cannot answer, or a specific repeated job worth automating, and you have the appetite to maintain what you build. When that is true, the [Obsidian and Graphify](/workflows/obsidian-graphify) page is the concrete build for a local markdown layer, the [Notion](/systems/notion) page is the same for a hosted, structured, shareable one, and the rest of the [Systems](/systems/the-shift) section is the design language for letting any of it run without you in the room. A second brain is just that argument turned inward: the same patterns you would use to delegate work, pointed at your own context.

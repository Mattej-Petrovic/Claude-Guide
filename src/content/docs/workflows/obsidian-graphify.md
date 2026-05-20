---
title: Obsidian and Graphify
lede: "External structured memory for Claude Code. Obsidian as a knowledge vault, Graphify as a code knowledge graph, and the underlying pattern they share: precompute the structure once instead of regenerating it every session."
section: systems
---

The default Claude Code session starts from nothing. You open a terminal, Claude reads `CLAUDE.md`, you re-explain the rest of the context, and the conversation history starts accumulating. Across many sessions and many projects, this gets old. The patterns on this page are about precomputing structured external memory so Claude doesn't have to rebuild context from scratch every time.

Two concrete tools come at this from different angles. Obsidian gives you a knowledge vault: markdown notes, intentional folder structure, wikilinks between concepts. Graphify gives you a queryable map of a codebase: functions, classes, the relationships between them. Both work because they shift orientation cost from per-session to once, and they keep the result in a format Claude can read efficiently.

A caveat up front. Both are practitioner workflows, not officially supported integrations. Graphify is an open-source single-developer project at v0.4.10. The Obsidian patterns are conventions a handful of creators have written up, not Anthropic guidance. Read this page as an advanced pattern you can adopt selectively, not a stack you have to install end-to-end.

## Why external memory matters

<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="External structured memory: Claude Code reads two precomputed layers — an Obsidian knowledge vault and a Graphify code knowledge graph — instead of regenerating context every session. CLAUDE.md ties the two together.">
  <text x="350" y="22" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="600" letter-spacing="1.2">EXTERNAL STRUCTURED MEMORY</text>
  <text x="350" y="38" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.55" font-style="italic">precompute the structure, query it instead of regenerating</text>
  <rect x="260" y="55" width="180" height="62" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="350" y="80" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.5">CLAUDE CODE</text>
  <text x="350" y="98" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6">reads + queries</text>
  <text x="350" y="110" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6">CLAUDE.md is the glue</text>
  <line x1="350" y1="118" x2="350" y2="145" stroke="currentColor" stroke-width="1.5"/>
  <line x1="170" y1="145" x2="530" y2="145" stroke="currentColor" stroke-width="1.5"/>
  <line x1="170" y1="145" x2="170" y2="174" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="170,180 166,172 174,172" fill="currentColor"/>
  <line x1="530" y1="145" x2="530" y2="174" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="530,180 526,172 534,172" fill="currentColor"/>
  <rect x="50" y="180" width="240" height="120" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="170" y="203" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700" letter-spacing="0.5">KNOWLEDGE LAYER</text>
  <text x="170" y="218" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">Obsidian vault</text>
  <text x="68" y="240" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.75">· markdown notes</text>
  <text x="68" y="256" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.75">· folder structure (PARA, Zettel)</text>
  <text x="68" y="272" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.75">· wikilinks between concepts</text>
  <text x="68" y="288" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.75">· session logs as memory</text>
  <rect x="410" y="180" width="240" height="120" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="530" y="203" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700" letter-spacing="0.5">CODEBASE LAYER</text>
  <text x="530" y="218" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">Graphify knowledge graph</text>
  <text x="428" y="240" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.75">· graph.json (queryable)</text>
  <text x="428" y="256" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.75">· GRAPH_REPORT.md (summary)</text>
  <text x="428" y="272" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.75">· PreToolUse hook → graph first</text>
  <text x="428" y="288" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.75">· god nodes + communities</text>
</svg>

Claude Code re-reads things every session. `CLAUDE.md` gets loaded fresh. Files get grepped. Tool outputs accumulate. For a small project on a short task, that's fine. For a large codebase or a multi-year knowledge base, it's a tax that compounds.

There are a few ways to address it. The bigger context window helps. Skills load on demand instead of upfront. Subagents keep exploration cost out of the main thread (see [/workflows/token-optimization](/workflows/token-optimization)). But the most fundamental move is to precompute structure once and let Claude query the structure instead of regenerating it. That's what both patterns on this page are doing. Different structures, same idea.

## Pattern 1: Obsidian as the knowledge layer

A vault is just a folder of markdown files. Obsidian sits on top of it as a structured editor with wikilinks, a graph view, and a plugin ecosystem. Claude Code, run inside the vault directory, reads every file the same way it reads a codebase.

The minimum viable setup is three things:

**A folder structure that matches how you actually work.** PARA (Projects, Areas, Resources, Archives) is the common starting point. Zettelkasten (atomic notes, dense interlinking) is the other. Either works. What matters is that the structure is intentional and stable. Claude has to be able to predict where things live.

**A `CLAUDE.md` at the vault root.** Same standing-instructions pattern as in code projects. Tells Claude what the vault is, where to look for what, how to format new notes, where session logs go. Keep it under 200 lines for the reasons in [/workflows/token-optimization](/workflows/token-optimization).

**A few skills for recurring workflows.** *"Process today's notes." "Weekly review." "Research this topic into the resources folder."* Skills are markdown files in `.claude/skills/`. Each one is a workflow you'd otherwise re-explain every session. Three or four covers most of what people use a second brain for.

What this actually buys you, when it's working:

- Claude can find connections across your notes that you can't hold in your head. *"What have I been writing about onboarding friction across these four projects?"* The answer is in your vault, but you'd never read it that way. Claude can.
- Continuity across sessions through session logs, not the model's memory. End each session by writing a log to the vault. Start the next session by reading recent logs. The vault is the memory layer.
- A knowledge base that improves with use. Every research run, every weekly review, every meeting note ends up as a file Claude can reference next time.

The honest version of the trade-off: the system needs feeding. An empty vault is a useless vault. You have to invest in capturing notes and processing them, or the agent ends up making up context that isn't there. The "set up once and forget" version doesn't exist. The "becomes more useful the more you use it" version does.

## Pattern 2: Graphify as the code layer

Graphify is a Python tool (`pip install graphifyy && graphify install`) that builds a knowledge graph of your codebase before Claude touches it. Tree-sitter parses the AST. The tool identifies functions, classes, and their relationships, and clusters them into communities. The output is three files in a `graphify-out/` folder:

- `graph.html`: an interactive visualisation you can click through in a browser
- `GRAPH_REPORT.md`: a summary of god nodes (highest-connection concepts), surprising connections, and suggested questions
- `graph.json`: the persistent, queryable graph

The Claude Code integration is the part that earns its keep. Running `graphify claude install` writes a `CLAUDE.md` section and installs a `PreToolUse` hook in `settings.json`. The hook fires before every Glob and Grep call: if a graph exists, Claude consults `GRAPH_REPORT.md` first and navigates by structure rather than grepping raw files. You can also query the graph explicitly with `/graphify query`, `/graphify path`, or `/graphify explain` for hop-by-hop traversals.

The savings claim is up to 71x token reduction on large repos. That's self-reported, from a single-domain test, so don't take it as a benchmark you'll hit. The mechanism is sound: precomputing the codebase map is genuinely cheaper than re-grepping every session. The real number depends on your repo size, your query type, and how often you'd otherwise be reading the same files. Practitioner reports on 500-file-plus projects describe meaningful, not magical, savings.

Where Graphify pays off:

- Projects with 500+ files where Claude burns time orienting itself.
- Codebases with complex call graphs (deep inheritance, callback-heavy architectures) where grep results miss structural relationships.
- Ongoing work on the same codebase where the graph gets rebuilt incrementally rather than from scratch.

Where it doesn't:

- Small projects. The graph context can exceed raw file content for single-file or single-module changes.
- Pure prose documentation. Flat retrieval outperforms graph traversal for open-ended semantic questions over text.
- One-off queries. The precomputation cost only pays off across many sessions.

Treat the `INFERRED` and `AMBIGUOUS` edge labels seriously. They're Graphify telling you what it inferred versus what it actually found. Decisions that depend on those edges being correct should be verified, not trusted.

## Combining the two

There's a third pattern that combines both: the Obsidian vault holds the knowledge layer (decisions, project notes, journals), Graphify generates the code layer, and a single `CLAUDE.md` tells Claude Code to consult both. At least one open-source setup (`lucasrosati/claude-code-memory-setup`) packages this approach with a vault structure, Graphify integration, and a chat import pipeline.

The honest assessment: this is a lot of moving parts. Most people are better served picking one pattern and running it well than installing both and running neither well. Start with whichever matches your actual problem. Spending your days in a large codebase? Graphify first. Drowning in notes and decisions across projects? Obsidian first. Treat the combination as something to grow into, not start with.

## Common mistakes

**Treating it as set-up-once-and-forget.** A vault with no feeding is a vault with no answers. A graph that doesn't get rebuilt is a graph that lies to Claude. Both patterns need maintenance habits. Without them, the system gradually decays into noise.

**Cargo-culting the inventory.** The "31 commands, 48 skills, 7 MCPs" posts are an aesthetic, not a method. The right number of skills is the number that match workflows you actually run. Two skills you use weekly beat thirty you forgot you built.

**Believing the hype numbers.** "71x token reduction" and "$2K per month from this workflow" sound great. They're real for the specific person, in the specific context, with the specific use case. They're not a promise. Your savings depend on your project size, your usage patterns, and your willingness to maintain the system.

**Skipping `CLAUDE.md`.** Both patterns rely on a `CLAUDE.md` that tells Claude what the structure is. Without it, the structure exists but Claude doesn't know how to use it. The graph is generated. The vault is organised. None of it matters if the standing instructions don't point Claude at it.

**Premature optimisation on small projects.** If your codebase fits in 50K tokens, you don't need Graphify. If your notes are three folders deep, you don't need an Obsidian skill architecture. Reach for these tools when the problem they solve is the problem you actually have.

## When this isn't for you

The patterns on this page are advanced. They earn their keep on large codebases or knowledge bases that get worked on continuously. If you're:

- Working on small, short-lived projects: the default Claude Code setup is fine.
- Not already invested in Obsidian or note-taking: the vault pattern is a big lift for unclear payoff. Use chat memory and projects instead.
- Looking for a turnkey "AI second brain" experience: Cowork with projects is closer to what you want. The Obsidian pattern is local-first and DIY by design.

For people who already live in Obsidian and want their notes to come alive, or who work in large codebases and pay real token costs, both patterns are worth the setup time. For everyone else, the simpler stack (chat with projects, Cowork, Claude Code with `CLAUDE.md` alone) does most of what this combination does, with less ceremony.

---
title: Projects
lede: Persistent workspaces in claude.ai. Instructions, knowledge, and how to actually use them.
section: concepts
---

A Project in claude.ai is a workspace that wraps a set of chats with shared context. Every chat you start inside a project automatically loads two things: the project's instructions, and the project's knowledge files.

Think of a regular chat as a single conversation. A project is a folder of conversations that all start with the same briefing.

Free accounts get up to 5 projects. Paid plans (Pro, Max, Team, Enterprise) get unlimited projects, plus RAG mode that expands the knowledge base capacity for larger document sets.

## How it works

A project has three parts.

**Instructions** load into the system prompt of every chat in the project. They are persistent rules. Role, constraints, output preferences, domain conventions. Short and directive.

**Knowledge** is files and text snippets you upload once. PDFs, docs, code, plain text, pasted content. Up to 30MB per file, multiple file formats supported. Knowledge is cached, which means it does not count against your per-message usage when reused. This is the part most people miss when they keep pasting the same document into every new chat.

**Conversations** are individual chats inside the project. Each one starts fresh with its own 200K context window, but inherits Instructions and Knowledge from the project automatically.

When the total knowledge fits in context, Claude loads everything directly into each chat. When the knowledge base gets large, Claude switches to RAG mode and retrieves only relevant chunks per message instead of loading everything. You do not configure this. Claude decides based on size.

One quirk worth knowing. The RAG cutover sometimes triggers earlier than the docs suggest. There are reproducible reports of it kicking in around 13 files even when total tokens are well under the context limit, with the UI showing "look up specific information as needed" at 2% of capacity. Splitting one cohesive document into many small files can hurt accuracy by forcing RAG mode prematurely. Fewer, larger files tend to behave better than many small ones.

<svg viewBox="0 0 800 580" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram showing how a Claude Project contains Instructions and Knowledge that load into every chat in the project">
  <defs>
    <style>
      .container-box { fill: none; stroke: #d97706; stroke-width: 1.5; opacity: 0.7; }
      .inner-box { fill: none; stroke: currentColor; stroke-width: 1; opacity: 0.35; }
      .chat-box { fill: none; stroke: currentColor; stroke-width: 1; opacity: 0.5; }
      .label-xs { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 13px; opacity: 0.55; letter-spacing: 1.2px; font-weight: 600; }
      .label-sm { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 16px; }
      .label-lg { fill: #d97706; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 2px; }
      .muted { fill: currentColor; opacity: 0.5; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 14px; }
      .arrow { stroke: currentColor; stroke-width: 1; fill: none; opacity: 0.35; stroke-dasharray: 3 3; }
    </style>
    <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" opacity="0.45"/>
    </marker>
  </defs>
  <!-- PROJECT outer box: y=30, height=290 -->
  <rect x="40" y="30" width="720" height="290" rx="10" class="container-box"/>
  <text x="60" y="62" class="label-lg">PROJECT</text>
  <!-- INSTRUCTIONS inner box: y=80, height=220 -->
  <rect x="70" y="80" width="310" height="220" rx="6" class="inner-box"/>
  <text x="90" y="112" class="label-xs">INSTRUCTIONS</text>
  <text x="90" y="148" class="label-sm">Role, constraints,</text>
  <text x="90" y="170" class="label-sm">output rules</text>
  <text x="90" y="242" class="muted">Loaded into every chat's</text>
  <text x="90" y="262" class="muted">system prompt.</text>
  <!-- KNOWLEDGE inner box: x=420, y=80, height=220 -->
  <rect x="420" y="80" width="310" height="220" rx="6" class="inner-box"/>
  <text x="440" y="112" class="label-xs">KNOWLEDGE</text>
  <text x="440" y="148" class="label-sm">style-guide.pdf</text>
  <text x="440" y="170" class="label-sm">architecture.md</text>
  <text x="440" y="192" class="label-sm">reference.txt</text>
  <text x="440" y="262" class="muted">Cached. Reused without burning tokens.</text>
  <!-- Arrows: from bottom of PROJECT box (y=320) down to chat boxes (y=390) -->
  <line x1="180" y1="330" x2="180" y2="390" class="arrow" marker-end="url(#ah)"/>
  <line x1="400" y1="330" x2="400" y2="390" class="arrow" marker-end="url(#ah)"/>
  <line x1="620" y1="330" x2="620" y2="390" class="arrow" marker-end="url(#ah)"/>
  <!-- Chat boxes: y=400, height=150 -->
  <rect x="55" y="400" width="220" height="150" rx="6" class="chat-box"/>
  <text x="78" y="432" class="label-xs">CHAT 1</text>
  <text x="78" y="468" class="muted">Fresh 200K window.</text>
  <text x="78" y="490" class="muted">Inherits project</text>
  <text x="78" y="512" class="muted">context.</text>
  <rect x="290" y="400" width="220" height="150" rx="6" class="chat-box"/>
  <text x="313" y="432" class="label-xs">CHAT 2</text>
  <text x="313" y="468" class="muted">Fresh 200K window.</text>
  <text x="313" y="490" class="muted">Inherits project</text>
  <text x="313" y="512" class="muted">context.</text>
  <rect x="525" y="400" width="220" height="150" rx="6" class="chat-box"/>
  <text x="548" y="432" class="label-xs">CHAT 3</text>
  <text x="548" y="468" class="muted">Fresh 200K window.</text>
  <text x="548" y="490" class="muted">Inherits project</text>
  <text x="548" y="512" class="muted">context.</text>
</svg>

## How to use it well

**Treat instructions like a system prompt, not a paragraph of context.** Short directives outperform essays. "Use TypeScript strict mode. Prefer functional components. Cite sources for any factual claim." beats three paragraphs explaining your stack and preferences. Every word in instructions costs tokens in every chat in that project, forever.

**Separate stable from volatile.** Knowledge is for things that do not change often. Style guides, codebases, API docs, research papers, reference material. If something changes weekly, either keep it out of knowledge or be prepared to refresh it. Stale knowledge that you forgot to update is worse than no knowledge.

**One project per recurring task type, not per topic.** A project earns its keep when you will have many similar conversations inside it. "Client X work" is a good project. "Random AI thoughts" is not. If you only ever start one chat in a project, you should have just used a normal chat.

**Strip your instructions ruthlessly.** Read each line and ask "would removing this change Claude's behavior?" If no, cut it. Polite framing, rationale, transition sentences, all dead weight that you pay for in every conversation.

**Use knowledge as ground truth, not as a research dump.** When you put real source material in knowledge, Claude grounds its responses in actual content instead of generalizing from training data. This is the difference between getting tailored answers and getting a generic framework that applies to roughly anyone.

**Start chats inside the project.** If you start a regular chat to ask about something the project covers, you have thrown away the entire point. Make this a habit.

## Common mistakes

**Treating a project like a folder.** Projects are not for organizing chat history. The value is the shared context that loads automatically. If you are not putting anything substantial in instructions or knowledge, the project is doing nothing for you.

**One mega-project for everything.** Knowledge from unrelated work pollutes the context. Instructions cannot be specific. You lose the consistency that makes projects useful in the first place.

**Long, narrative instructions.** "Hi Claude, I am working on a project where we need to consider..." is wasted tokens. Cut to the directives. If a sentence does not change behavior, it does not belong.

**Dumping every related document into knowledge.** More files is not more context. Past a threshold the project switches to RAG mode and you lose direct context loading. Curate ruthlessly. Keep what Claude actually needs to ground its work, drop the rest.

**Putting changing info in knowledge.** Pricing, schedules, status reports. These belong in chat messages, not in a place you will forget to update. Stale knowledge is silent. You will not know it is wrong until Claude confidently uses outdated info.

**Re-uploading the same files into every chat.** This is the original problem projects exist to solve. If you are still doing this, you are paying token cost for the same content over and over and missing the cache entirely.

## Examples

**Writing project.** Instructions cover voice, tone, structure preferences, and what to avoid. Knowledge holds your style guide, samples of past work that landed well, and an "anti-AI-writing" file listing words and phrases never to use. Every draft chat starts already knowing how you sound.

**Codebase project.** Instructions cover stack, conventions, and what to test. Knowledge holds your README, architecture doc, and key reference files. Open a chat to ask about a specific function, and Claude already knows what framework you use and what your tests look like. Note: for active development, Claude Code with a CLAUDE.md file is usually the better tool. Projects are best when you want to talk about a codebase, not when you want to edit it directly.

**Research project.** Instructions cover output format and citation requirements. Knowledge holds the source material you have gathered yourself. You ask the questions. Claude reasons over the actual sources, not its training. Bring the context, let Claude do the thinking.

**Client work project.** One project per client. Instructions cover their voice, brand rules, and any relationship context. Knowledge holds their style guide, past deliverables, and brief documents. Switch clients by switching projects. No re-explaining who they are or how they sound.

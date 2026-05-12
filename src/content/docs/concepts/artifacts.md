---
title: Artifacts
lede: Interactive content that renders in a side panel. Types, sandbox limits, persistent storage, and AI-powered artifacts.
section: concepts
---

A Claude Artifact is interactive content rendered in a side panel next to your chat. Code that runs, components you click, charts you hover, documents that look like documents. Anything substantial enough that reading it inline would be awkward gets its own space.

Claude creates an artifact automatically when content is over roughly 15 lines, self-contained, and likely to be edited or reused. You can also force one with "make this an artifact." Available on every plan including free, with higher limits and full features on paid tiers. The same concept exists in Claude Cowork; the mental model below applies there too.

## How it works

Six types render live in the panel.

<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Six artifact types: Markdown, HTML, React, SVG, Mermaid, and PDF" style="max-width: 100%; height: auto; margin: 2rem 0;">
  <defs>
    <style>
      .card { fill: none; stroke: currentColor; stroke-width: 1; opacity: 0.4; }
      .type-name { fill: #d97706; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; }
      .type-ext { fill: currentColor; font-family: ui-monospace, SFMono-Regular, monospace; font-size: 11px; opacity: 0.55; }
      .desc { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 12px; opacity: 0.75; }
      .note { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 11px; opacity: 0.5; }
    </style>
  </defs>
  <rect x="20" y="20" width="240" height="110" rx="6" class="card"/>
  <text x="40" y="48" class="type-name">MARKDOWN</text>
  <text x="40" y="65" class="type-ext">.md</text>
  <text x="40" y="95" class="desc">Documents, reports,</text>
  <text x="40" y="112" class="desc">formatted notes.</text>
  <rect x="280" y="20" width="240" height="110" rx="6" class="card"/>
  <text x="300" y="48" class="type-name">HTML</text>
  <text x="300" y="65" class="type-ext">.html</text>
  <text x="300" y="95" class="desc">Self-contained pages.</text>
  <text x="300" y="112" class="desc">CSS and JS in one file.</text>
  <rect x="540" y="20" width="240" height="110" rx="6" class="card"/>
  <text x="560" y="48" class="type-name">REACT</text>
  <text x="560" y="65" class="type-ext">.jsx</text>
  <text x="560" y="95" class="desc">Interactive components.</text>
  <text x="560" y="112" class="desc">Hooks, recharts, lucide.</text>
  <rect x="20" y="150" width="240" height="110" rx="6" class="card"/>
  <text x="40" y="178" class="type-name">SVG</text>
  <text x="40" y="195" class="type-ext">.svg</text>
  <text x="40" y="225" class="desc">Vector graphics,</text>
  <text x="40" y="242" class="desc">diagrams, icons.</text>
  <rect x="280" y="150" width="240" height="110" rx="6" class="card"/>
  <text x="300" y="178" class="type-name">MERMAID</text>
  <text x="300" y="195" class="type-ext">.mermaid</text>
  <text x="300" y="225" class="desc">Flowcharts, sequence,</text>
  <text x="300" y="242" class="desc">gantt, ER diagrams.</text>
  <rect x="540" y="150" width="240" height="110" rx="6" class="card"/>
  <text x="560" y="178" class="type-name">PDF</text>
  <text x="560" y="195" class="type-ext">.pdf</text>
  <text x="560" y="225" class="desc">Generated documents</text>
  <text x="560" y="242" class="desc">and rendered files.</text>
  <text x="400" y="300" text-anchor="middle" class="note">Each artifact is a single self-contained file. No backend, no localStorage,</text>
  <text x="400" y="318" text-anchor="middle" class="note">no external imports beyond the libraries shipped in the sandbox.</text>
</svg>

You can also generate downloadable docx, pptx, xlsx, and PDF files. Those are downloads, not interactive renders.

The panel has two views: the rendered preview and the underlying code. You iterate three ways. Highlight a section in the artifact and ask Claude to change it, and only that part gets modified. Tell Claude what to change in chat, and the artifact updates in place. Or click the edit icon and make small changes manually for typos and minor tweaks.

Each artifact is one file. Everything inline. No external imports beyond the libraries that ship with the sandbox: React, Tailwind core utilities, Recharts, Lucide, lodash, d3, mathjs, three (r128), papaparse, SheetJS, plus a few others. No localStorage, no sessionStorage, no fetching from arbitrary external APIs in HTML or React artifacts.

Two recent additions matter more than the basics.

**Persistent storage.** Paid plans can build artifacts that remember state across sessions through a built-in `window.storage` key-value API, up to 20MB per artifact. Personal storage is private to each user; shared storage means everyone using the artifact sees the same data (good for leaderboards, bad for journals). Storage only works on published artifacts, so your draft will not persist anything during testing. This is what turns artifacts from prototypes into actual stateful tools.

**AI-powered artifacts.** An artifact can call the Anthropic API directly through a built-in endpoint, no API key, no per-call charges. This means you can build small tools with actual intelligence inside them: a summarizer, a content generator, an adaptive quiz, a coaching tool. Combined with MCP servers, an AI-powered artifact can read your Gmail, query your Calendar, or pull from Drive.

## How to use it well

**Know what fits the box.** Single-file frontend things work. Calculators, charts, dashboards, prototypes, simple games, mini tools, components you want to copy elsewhere. Things that need a backend, multi-page routing, real authentication, or storage during testing do not fit. Asking for what will not work wastes a turn.

**Iterate by selection, not from scratch.** When you want to change one thing, highlight it in the panel and describe the change. Asking for a redo when you only need a tweak is slow and sometimes breaks what was already working.

**Use direct edit for typos and tiny tweaks.** If describing the change would take longer than making it, click the edit button.

**Be specific about what to change.** "Make it cleaner" gives you what Claude thinks cleaner means. "Increase spacing between cards, drop the gradient on the header, swap the bar chart for an area chart" gets you what you want.

**Pair with Projects when context matters.** Artifacts created inside a project inherit instructions and knowledge. Building a dashboard for a specific business? Put the brand guide and data structure in project knowledge first, then ask for the artifact. The output will already speak your context.

**Publish if you want it to persist.** Persistent storage does not activate during testing. If you are building something stateful, you have to publish before the storage API does anything real. Test the structure first, then publish, then verify storage works.

**Reach for AI-powered artifacts when intelligence inside the tool actually helps.** A summarizer, an adaptive tool, a content generator. Do not add API calls because you can. Add them when the tool needs to reason about input you cannot predict.

## Common mistakes

**Asking for a backend.** Artifacts are frontend only. No databases, no servers, no real auth. If your idea needs any of that, build it elsewhere and use the artifact for the UI prototype.

**Trying localStorage or sessionStorage.** Both are blocked. Use `window.storage` for persistence (and remember it needs publication). Use React state for anything in-session.

**Multi-page sites with routing.** Each artifact is one file. You can fake routing inside a single-page app with state, but you cannot have multiple linked HTML pages routed traditionally inside one artifact.

**Treating it as production-ready.** Artifacts are prototyping and personal-tool territory. The 70% you get is impressive. The 30% to make something production typically lives somewhere else.

**Asking for full redos when you needed a tweak.** Costs tokens, costs time, sometimes loses good work that was already there. Iterate on the part, not the whole.

**Forgetting persistent storage requires publication.** Builders make a journal artifact, test it, see entries disappear on reload, and assume it is broken. It is not. It just has not been published yet.

## Examples

**Calculators and converters.** Tip calculator, mortgage estimator, unit converter, language flashcard tool. HTML or React, no state beyond the session, ships in one turn.

**Mermaid for documentation.** System diagrams, flowcharts, sequence diagrams, ER diagrams, gantt charts. Faster than dragging boxes in a diagram tool when you can describe the structure in text.

**Recharts dashboards.** Drop in data, get an interactive chart with tooltips and responsive sizing. Good for pitch decks, internal reports, quick "how does this look" prototypes.

**Personal trackers with persistent storage (published).** Habit tracker, journal, expense log, reading list. Build it once, publish it, use it indefinitely. Data persists per user.

**AI-powered tools.** A daily reflection prompt that adapts to previous entries. A study tool that quizzes you on uploaded notes. A coaching artifact that asks targeted questions. Anything where you want intelligence inside the tool, not just structure.

**SVG illustrations.** Logos, icons, infographics, diagrams that should be vector. Editable in the panel, exportable, scales cleanly at any size.

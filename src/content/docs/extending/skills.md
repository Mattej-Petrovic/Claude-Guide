---
title: Skills
lede: Reusable instruction sets that change how Claude approaches a class of tasks.
section: extending
---

A Skill is a folder Claude reads on demand. At minimum it contains a `SKILL.md` file with frontmatter (name and description) and a body of instructions. It can also bundle executable scripts, reference documents, templates, and assets. Claude decides when to load a skill based on its description, then follows the instructions inside, optionally running the bundled code.

This is Anthropic's answer to a problem that grew with model capability: as Claude got better at agentic tasks, people started cramming everything into system prompts and CLAUDE.md files. Every session paid the context tax for instructions that only mattered some of the time. Skills invert that. Instructions sit on disk until Claude needs them.

## How they actually work

The mechanism is called progressive disclosure, and it has three levels.

**Level one** is permanent. Every skill's name and description load into Claude's context at session start. Nothing else. A description is a few sentences. Ten skills cost roughly a paragraph of context.

**Level two** triggers when Claude reads a description and decides the skill applies to the current task. The full `SKILL.md` body loads. This is the actual instruction set: how to do the thing.

**Level three** is anything `SKILL.md` references. Bundled Python scripts, reference markdown, templates, sample data. These load only when the body of the skill tells Claude to read or run them.

The whole point of this design is that you can install dozens of skills, even hundreds, and your context budget barely moves until something fires.

<svg viewBox="0 0 800 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Progressive disclosure diagram showing the three levels of skill loading" style="width:100%;height:auto;color:currentColor;font-family:ui-sans-serif,system-ui,sans-serif">
  <style>
    .panel { fill: none; stroke: currentColor; stroke-opacity: 0.25; stroke-width: 1; }
    .panel-active { fill: none; stroke: #d97706; stroke-width: 1.5; }
    .label { fill: currentColor; font-size: 13px; font-weight: 600; }
    .sub { fill: currentColor; fill-opacity: 0.7; font-size: 12px; }
    .accent { fill: #d97706; font-size: 12px; font-weight: 600; }
    .file { fill: currentColor; fill-opacity: 0.85; font-size: 12px; font-family: ui-monospace, monospace; }
    .dim { fill: currentColor; fill-opacity: 0.45; font-size: 12px; font-family: ui-monospace, monospace; }
    .arrow { stroke: currentColor; stroke-opacity: 0.45; stroke-width: 1; fill: none; }
    .arrow-active { stroke: #d97706; stroke-width: 1.5; fill: none; }
    .level-num { fill: #d97706; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; }
  </style>
  <!-- Level 1 -->
  <rect class="panel-active" x="20" y="40" width="240" height="380" rx="6"/>
  <text class="level-num" x="36" y="64">LEVEL 1 — ALWAYS LOADED</text>
  <text class="label" x="36" y="86">Name + description</text>
  <text class="sub" x="36" y="104">Sits in context every session.</text>
  <text class="sub" x="36" y="120">A few sentences per skill.</text>
  <rect x="36" y="148" width="208" height="48" rx="4" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.2"/>
  <text class="file" x="48" y="170">cv-resume</text>
  <text class="dim" x="48" y="187">"Build ATS-optimized CVs..."</text>
  <rect x="36" y="208" width="208" height="48" rx="4" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.2"/>
  <text class="file" x="48" y="230">pdf</text>
  <text class="dim" x="48" y="247">"Reading, merging, filling..."</text>
  <rect x="36" y="268" width="208" height="48" rx="4" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.2"/>
  <text class="file" x="48" y="290">frontend-design</text>
  <text class="dim" x="48" y="307">"Distinctive web UIs..."</text>
  <text class="dim" x="36" y="346">+ every other installed skill</text>
  <text class="accent" x="36" y="386">~1 paragraph total</text>
  <text class="sub" x="36" y="402">regardless of count</text>
  <!-- Arrow 1->2 -->
  <path class="arrow-active" d="M 260 230 L 300 230" marker-end="url(#arr)"/>
  <text class="accent" x="263" y="222">trigger</text>
  <!-- Level 2 -->
  <rect class="panel" x="300" y="40" width="240" height="380" rx="6"/>
  <text class="level-num" x="316" y="64">LEVEL 2 — ON TRIGGER</text>
  <text class="label" x="316" y="86">SKILL.md body</text>
  <text class="sub" x="316" y="104">Loads when Claude decides</text>
  <text class="sub" x="316" y="120">the description applies.</text>
  <rect x="316" y="148" width="208" height="240" rx="4" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.2"/>
  <text class="file" x="328" y="170">SKILL.md</text>
  <text class="dim" x="328" y="194">---</text>
  <text class="dim" x="328" y="210">name: cv-resume</text>
  <text class="dim" x="328" y="226">description: ...</text>
  <text class="dim" x="328" y="242">---</text>
  <text class="dim" x="328" y="262"># Procedure</text>
  <text class="dim" x="328" y="280">1. Read uploaded CV</text>
  <text class="dim" x="328" y="296">2. Read reference/</text>
  <text class="dim" x="328" y="312">   ats-rules.md</text>
  <text class="dim" x="328" y="328">3. Draft structure</text>
  <text class="dim" x="328" y="344">4. Render via</text>
  <text class="dim" x="328" y="360">   scripts/...</text>
  <!-- Arrow 2->3 -->
  <path class="arrow-active" d="M 540 230 L 580 230" marker-end="url(#arr)"/>
  <text class="accent" x="543" y="222">on demand</text>
  <!-- Level 3 -->
  <rect class="panel" x="580" y="40" width="200" height="380" rx="6"/>
  <text class="level-num" x="596" y="64">LEVEL 3 — REFERENCED</text>
  <text class="label" x="596" y="86">Bundled assets</text>
  <text class="sub" x="596" y="104">Only when SKILL.md</text>
  <text class="sub" x="596" y="120">tells Claude to load.</text>
  <rect x="596" y="148" width="170" height="36" rx="4" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.2"/>
  <text class="file" x="608" y="171">reference/ats-rules.md</text>
  <rect x="596" y="194" width="170" height="36" rx="4" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.2"/>
  <text class="file" x="608" y="217">reference/examples.md</text>
  <rect x="596" y="240" width="170" height="36" rx="4" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.2"/>
  <text class="file" x="608" y="263">templates/base.html</text>
  <rect x="596" y="286" width="170" height="36" rx="4" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.2"/>
  <text class="file" x="608" y="309">scripts/render_pdf.py</text>
  <text class="accent" x="596" y="362">Executed or read</text>
  <text class="sub" x="596" y="378">only as needed.</text>
  <text class="sub" x="596" y="394">Zero context cost</text>
  <text class="sub" x="596" y="410">until referenced.</text>
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97706"/>
    </marker>
  </defs>
</svg>

## What goes inside a skill

A minimal skill is one file:

```
my-skill/
└── SKILL.md
```

A real skill usually has more:

```
cv-resume/
├── SKILL.md              # the instructions Claude follows
├── reference/
│   ├── ats-rules.md      # only loaded if SKILL.md tells Claude to read it
│   └── examples.md
├── templates/
│   └── base.html
└── scripts/
    └── render_pdf.py     # executed in the sandbox when SKILL.md invokes it
```

The frontmatter at the top of `SKILL.md` is the part Claude sees at session start:

```markdown
---
name: cv-resume
description: Build ATS-optimized CVs and resumes as designed HTML with PDF export. Use when the user asks to create, redesign, or update a CV or resume in any language or industry, or uploads an existing CV for feedback. Covers analysis, structure recommendations, building the HTML, generating the PDF, and iterating until done.
---

# CV / Resume Skill

Procedure when invoked:

1. If the user uploaded an existing CV, read it first and identify what to keep, cut, or rework.
2. Read reference/ats-rules.md before drafting.
3. ...
```

Everything below the frontmatter is Level 2. Anything in `reference/`, `templates/`, or `scripts/` is Level 3.

## The description is the whole trigger surface

This is the single most important thing to get right and the place most skills fail.

Claude only ever sees the description in deciding whether to load a skill. If the description is vague, the skill never fires when it should. If it's overclaimed, it fires on tasks it can't handle.

A bad description:

> A skill for working with PDFs.

A description that triggers reliably:

> Use this skill whenever the user wants to do anything with PDF files. This includes reading or extracting text from PDFs, combining or merging multiple PDFs, splitting them apart, rotating pages, adding watermarks, creating new PDFs, filling forms, encrypting or decrypting, and OCR on scanned PDFs. Use whenever the user mentions a .pdf file or asks to produce one.

The pattern: name the concrete user scenarios that should fire it, and the ones that shouldn't. The description is not marketing copy. It is a router.

## Skills are not just saved prompts

The most common mental model is that a Skill is a saved prompt you can recall by name. Half right. The half people miss:

A skill can run code. The bundled `scripts/` directory is executable in the same sandbox Claude uses for code execution and file creation. Anthropic's official `pdf`, `xlsx`, and `pptx` skills lean on this. The markdown describes the workflow, but the actual heavy lifting (parsing a workbook, generating a deck from a template) happens in Python the skill ships with. Deterministic where determinism matters, model judgment where judgment matters.

Once you see this, the design space opens up. A scraping skill bundles the scraper. A deploy skill bundles the deploy script. A research skill bundles the citation formatter. The markdown becomes an orchestrator. Most community skills published right now skip this entirely and stay at the prompt-as-skill level, which leaves most of the leverage on the table.

## Where skills run

- **Claude.ai** — Settings → Capabilities → enable Code Execution and File Creation. Skills load from your account. Anthropic ships several by default (pdf, docx, pptx, xlsx among them).
- **Claude Code** — drop skills into `~/.claude/skills/` for global, or `.claude/skills/` inside a project for project-scoped. Manage with `/skills` and discover others' work with `/find-skills` and `/plugin`.
- **The API** — skills are passed in via the Skills API (anthropic/skills repo has the integration patterns). This is how Cowork and any custom agent built on the API uses them.
- **Cowork** — same skills as Claude.ai, surfaced through the desktop file-system flow.

A skill written once works across all of these. The folder structure is the contract.

## How to use them well

**Build it by iterating, not by drafting.** Write a first version. Use it. When Claude does something wrong or skips a step, don't re-prompt around it. Open `SKILL.md`, fix the instructions, save, run again. The skill itself is the artifact you're improving. After five or six rounds of this, a good skill produces consistent output with no extra prompting.

**Move logic into scripts when determinism matters.** If a step has one correct way to do it (rendering, validation, computation, formatting), a Python file in `scripts/` is more reliable than a paragraph of instructions. Keep prose for judgment calls. Keep scripts for procedure.

**Split big skills into reference files.** If `SKILL.md` runs past three or four hundred lines, push the rarely-needed parts into `reference/` and have the body say "for X, read reference/x.md." That preserves the progressive disclosure benefit. A skill where everything is in one giant `SKILL.md` reloads the whole thing every trigger, which defeats the design.

**Compose skills instead of building monoliths.** If a CV builder needs polished HTML, let the existing `frontend-design` skill handle styling and have your CV skill describe content rules only. Skills stack. Two firing together is normal.

**Treat the description as the product.** Spend more time on the description than on the body. The body only matters if the description fires. Test by asking Claude in a clean session to handle a task the skill should fire on, and see if it does. If not, the description is wrong, not the prompt.

## Common mistakes

**Stuffing skill-shaped instructions into `CLAUDE.md`.** This works but you pay the token cost every session, including sessions where the instructions are irrelevant. The instinct to put "everything Claude needs to know" in CLAUDE.md is the thing Skills exist to replace. Use CLAUDE.md for things that apply to every session in a project. Use Skills for things that apply when a specific task comes up.

**Confusing Skills with MCP servers.** Skills are instructions Claude executes. MCP servers are external tools Claude can call. A skill might *use* an MCP server inside its workflow ("call the github MCP to fetch the issue"), but they sit at different layers. Skills extend Claude's behavior. MCP extends Claude's reach.

**Confusing Skills with Subagents.** Subagents spawn a separate Claude instance with its own context window to handle a subtask in parallel. Skills are loaded into the current Claude's context. A subagent can use skills. A skill is not a subagent.

**Vague descriptions that never trigger.** Already covered above, but worth repeating because it kills more skills than any other failure mode.

**Skipping the iteration loop.** A first-draft skill never works as well as the same skill after five rounds of "use it, find what broke, fix the markdown, repeat." Treat the skill like code. Maintain it.

## A concrete example: building a CV skill

The process that actually works:

1. Research what a good CV looks like in your target context (ATS rules, photo conventions for your country, length, ordering). Have Claude do the research, but verify the claims yourself before committing them to the skill.
2. Write a first `SKILL.md` capturing those rules as a procedure.
3. Build a CV with the skill. Note everywhere Claude went off-procedure, made a judgment you disagreed with, or produced something inconsistent.
4. Open `SKILL.md`. Fix those things directly in the instructions, not by re-prompting.
5. Repeat. After five or six iterations, the skill produces a CV you'd ship without manual editing.
6. Move deterministic parts (PDF rendering, ATS keyword matching) into `scripts/`. Keep judgment-heavy parts (tone, what to cut) in prose.

This loop generalises. It is the workflow for any skill worth building.

<a href="/library/skills" class="crosslink">
  <svg class="crosslink__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" stroke-linecap="round" stroke-linejoin="round" /></svg>
  <div class="crosslink__body">
    <p class="crosslink__label">See also</p>
    <p class="crosslink__title">Library: Skills</p>
    <p class="crosslink__desc">Browse the curated list of available skills.</p>
  </div>
  <svg class="crosslink__arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" width="16" height="16"><path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" /></svg>
</a>

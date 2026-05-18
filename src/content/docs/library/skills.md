---
title: Skills
lede: A curated list of skills available for Claude Code and other surfaces.
section: library
---

<a href="/extending/skills" class="crosslink">
  <svg class="crosslink__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" stroke-linecap="round" stroke-linejoin="round" /></svg>
  <div class="crosslink__body">
    <p class="crosslink__label">See also</p>
    <p class="crosslink__title">Extending: Skills</p>
    <p class="crosslink__desc">How skills work and how to write your own.</p>
  </div>
  <svg class="crosslink__arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" width="16" height="16"><path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" /></svg>
</a>

Skills are markdown files that extend what Claude Code can do. Drop a `SKILL.md` in `.claude/skills/<name>/` (personal, all projects) or `<project>/.claude/skills/<name>/` (project-only), and Claude adds it to its toolkit -- invoking it with `/name` or automatically when the context matches.

The skills below are organized into two groups: bundled skills that ship with Claude Code and are always available, and community skills worth installing.

---

## Bundled Skills

These ship with every Claude Code install. Invoke with `/skill-name` or let Claude trigger them automatically.

| Skill | Command | What it does |
|---|---|---|
| **debug** | `/debug [description]` | Enables debug logging for the current session and reads the session log to troubleshoot issues. Optionally describe the issue to focus the analysis. Logging is off by default unless you started with `claude --debug`. |
| **simplify** | `/simplify [focus]` | Reviews recently changed files for code reuse, quality, and efficiency issues. Spawns three review agents in parallel, aggregates their findings, and applies fixes. Pass text to focus: `/simplify focus on memory efficiency`. |
| **batch** | `/batch <instruction>` | Orchestrates large-scale codebase changes in parallel. Decomposes the work into 5--30 independent units, spawns one background agent per unit in an isolated git worktree, each implementing its unit and opening a PR. Requires git. |
| **loop** | `/loop [interval] [prompt]` | Runs a prompt repeatedly while the session stays open. Omit interval and Claude self-paces. Omit prompt and Claude runs an autonomous maintenance check, or reads `.claude/loop.md` if present. Example: `/loop 5m check if the deploy finished`. Alias: `/proactive`. |
| **claude-api** | `/claude-api` | Loads Claude API reference material for your project's language (Python, TypeScript, Java, Go, Ruby, C#, PHP, or cURL). Covers tool use, streaming, batches, and structured outputs. Also activates automatically when your code imports `anthropic` or `@anthropic-ai/sdk`. |
| **pdf** | Auto-invoked | Read, extract text from, fill, merge, split, and create PDF files. |
| **docx** | Auto-invoked | Create and edit Word documents with formatting, tables of contents, and headings. |
| **pptx** | Auto-invoked | Build PowerPoint slide decks from templates or from scratch. |
| **xlsx** | Auto-invoked | Create and work with Excel spreadsheets, financial models, and tabular data. |

---

## Community Skills

### Token & Context Management

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">Caveman</span>
    <span class="skill-card__tag">Output token compression</span>
  </div>
  <p class="skill-card__desc">Cuts Claude's output tokens by ~65% by forcing minimal, fragment-style responses with six intensity levels — from <code>lite</code> (removes hedging only) to <code>ultra</code> (maximum terse) — while preserving technical accuracy, code blocks, and security warnings.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Install (Claude Code — recommended, includes hooks and auto-activation)</span>
    <pre><code>claude plugin marketplace add JuliusBrussee/caveman
claude plugin install caveman@caveman</code></pre>
  </div>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Or skill only (any agent via npx)</span>
    <pre><code>npx skills add juliusbrussee/caveman --skill caveman</code></pre>
  </div>
  <a class="skill-card__link" href="https://github.com/JuliusBrussee/caveman" target="_blank" rel="noopener">github.com/JuliusBrussee/caveman →</a>
</div>

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">code-review-graph</span>
    <span class="skill-card__tag">Codebase knowledge graph for token-efficient reviews</span>
  </div>
  <p class="skill-card__desc">Builds a persistent structural map of your codebase using Tree-sitter and SQLite, then queries only the files actually relevant to a change — benchmarked at 6.8x fewer tokens on code reviews across 23+ languages. Technically an MCP server that also installs skills (<code>/review-delta</code>, <code>/review-pr</code>, <code>/build-graph</code>) and hooks.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Install (requires Python 3.10+)</span>
    <pre><code>pip install code-review-graph
code-review-graph install
code-review-graph build</code></pre>
  </div>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Or Claude Code only</span>
    <pre><code>code-review-graph install --platform claude-code</code></pre>
  </div>
  <a class="skill-card__link" href="https://github.com/tirth8205/code-review-graph" target="_blank" rel="noopener">github.com/tirth8205/code-review-graph →</a>
</div>

### Behavior Shaping

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">andrej-karpathy-skills</span>
    <span class="skill-card__tag">Anti-assumption CLAUDE.md guidelines</span>
  </div>
  <p class="skill-card__desc">A <code>CLAUDE.md</code> file encoding four behavioral principles derived from Karpathy's January 2026 observations: state assumptions explicitly, present multiple interpretations rather than picking silently, write the simplest code that works, and only change what the task requires. Biases toward caution over speed.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Install (current project)</span>
    <pre><code>curl -o CLAUDE.md https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md</code></pre>
  </div>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Or append to existing CLAUDE.md</span>
    <pre><code>echo "" >> CLAUDE.md && curl https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md >> CLAUDE.md</code></pre>
  </div>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Or install globally (all projects via plugin)</span>
    <pre><code>/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills</code></pre>
  </div>
  <a class="skill-card__link" href="https://github.com/forrestchang/andrej-karpathy-skills" target="_blank" rel="noopener">github.com/forrestchang/andrej-karpathy-skills →</a>
</div>

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">everything-claude-code (ECC)</span>
    <span class="skill-card__tag">Full agent harness</span>
  </div>
  <p class="skill-card__desc">150+ skills by language and domain, production-ready hooks, an instinct system that learns your patterns and promotes them into skills automatically, and AgentShield for prompt injection scanning — built over 10+ months of daily use. Rules (language-specific coding standards) must be installed separately after the plugin.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Install (plugin)</span>
    <pre><code>/plugin marketplace add affaan-m/everything-claude-code
/plugin install ecc@ecc</code></pre>
  </div>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Then install rules for your stack manually</span>
    <pre><code>git clone https://github.com/affaan-m/everything-claude-code.git
cp -r everything-claude-code/rules/common ~/.claude/rules/ecc/
cp -r everything-claude-code/rules/typescript ~/.claude/rules/ecc/</code></pre>
  </div>
  <a class="skill-card__link" href="https://github.com/affaan-m/everything-claude-code" target="_blank" rel="noopener">github.com/affaan-m/everything-claude-code →</a>
</div>

### Dev Workflow

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">security-review</span>
    <span class="skill-card__tag">Security-focused code review &mdash; Anthropic official</span>
  </div>
  <p class="skill-card__desc">Reviews pending changes on the current branch for injection vectors, authentication bypass risks, secrets in code, and data exposure. Built-in — no install required; listed here because it functions as a skill.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Usage</span>
    <pre><code>/security-review</code></pre>
  </div>
  <a class="skill-card__link" href="/library/commands">See /library/commands →</a>
</div>

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">code-review</span>
    <span class="skill-card__tag">Structured code review &mdash; Anthropic official plugin</span>
  </div>
  <p class="skill-card__desc">Structured review of changed files covering logic errors, edge cases, security vulnerabilities, and style violations. Replaced the deprecated <code>/review</code> built-in.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Install</span>
    <pre><code>claude plugin install code-review@claude-plugins-official</code></pre>
  </div>
</div>

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">compact-trigger</span>
    <span class="skill-card__tag">Strategic context compaction</span>
  </div>
  <p class="skill-card__desc">A pattern skill you write yourself in ~5 minutes: watches context usage and triggers <code>/compact</code> with focused preservation instructions before Claude hits the limit mid-task. Template below — drop it at <code>~/.claude/skills/compact-trigger/SKILL.md</code>.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Template</span>
    <pre><code>---
description: Compact context when usage is high. Use when context is above 70%, before starting a large task, or when the user asks to save context.
---

Check current context usage with /context. If above 70%, run /compact with these instructions: preserve the current task goal, key decisions made, and any code we have not yet committed. Summarize what has been done and what still needs to happen.</code></pre>
  </div>
</div>

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">explain-codebase</span>
    <span class="skill-card__tag">Codebase architecture walkthrough</span>
  </div>
  <p class="skill-card__desc">A pattern skill you write once per project: gives Claude a structured walkthrough of entry points, key modules, data flow, and conventions — useful at session start on unfamiliar projects or when onboarding contributors. Drop the template at <code>.claude/skills/explain-codebase/SKILL.md</code>.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Template</span>
    <pre><code>---
description: Explain the architecture and structure of this codebase. Use when a new session starts, when asked "how does this work", or when onboarding a new contributor.
---

Walk through the codebase architecture:
1. Entry points -- where does execution start?
2. Key modules -- what does each major directory/file do?
3. Data flow -- how does data move through the system?
4. Conventions -- naming, testing patterns, config management
5. Known complexity -- anything non-obvious worth flagging

Read the README first. Then explore the top-level structure before going deeper.</code></pre>
  </div>
</div>

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">incident-response</span>
    <span class="skill-card__tag">Ops incident workflow</span>
  </div>
  <p class="skill-card__desc">A pattern skill for production teams: triggers a structured investigation when something breaks — pull logs, identify the failure point, suggest the fastest fix to restore service and the proper fix for root cause, list rollback options. Drop the template at <code>.claude/skills/incident-response/SKILL.md</code>.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Template</span>
    <pre><code>---
description: Help investigate and resolve a production incident. Use when something is broken in production, when asked to debug an outage, or when logs show errors.
---

When an incident is reported:
1. Ask: what is broken, since when, and what changed recently?
2. Read recent error logs from the locations relevant to this project
3. Identify the most likely failure point based on the logs
4. Suggest the fastest fix that restores service
5. Suggest the proper fix that addresses root cause
6. List rollback options if the fix makes things worse

Be direct. In an incident, speed matters more than completeness.</code></pre>
  </div>
</div>

---

## Find More

- [Anthropic official plugins](https://github.com/anthropics/claude-plugins-official) -- maintained by Anthropic
- [awesome-claude-code](https://github.com/anthropics/awesome-claude-code) -- community-curated index of skills, hooks, and plugins
- [wshobson/commands](https://github.com/wshobson/commands) -- 57 production-ready slash commands covering dev workflows, security, API scaffolding, and more
- `/skills` inside any Claude Code session -- lists all skills currently available to you

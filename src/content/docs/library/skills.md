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

---

**Caveman** -- Output token compression

Cuts Claude's output tokens by ~65% by forcing minimal, fragment-style responses while preserving full technical accuracy. Drops articles, filler words, and pleasantries. Keeps exact technical terms, code blocks, and caveats intact. Has six intensity levels: `lite` (removes hedging only), `full` (fragment style, the practical default), `ultra` (maximum terse), and three `wenyan` modes using classical Chinese compression patterns. Automatically backs off to normal language for security warnings and destructive operations where clarity matters more than brevity. Includes a companion `caveman-compress` sub-skill that rewrites your CLAUDE.md and other memory files into compressed format to reduce input tokens, not just output ones.

Note: caveman only affects output tokens. In a typical long session, prose responses are a small fraction of total token usage -- the real win is faster responses and less noise, not dramatic cost reduction.

**Install (Claude Code -- recommended, includes hooks and auto-activation):**
```
claude plugin marketplace add JuliusBrussee/caveman
claude plugin install caveman@caveman
```

**Or skill only (any agent via npx):**
```
npx skills add juliusbrussee/caveman --skill caveman
```

Restart Claude Code after installing. Trigger with `/caveman`, `/caveman lite`, `/caveman ultra`, or natural language: "caveman mode", "less tokens".

→ [github.com/JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)

---

**code-review-graph** -- Codebase knowledge graph for token-efficient reviews

Builds a persistent structural map of your codebase using Tree-sitter, stores it as a graph of functions, classes, and imports in SQLite, and exposes it to Claude via MCP. When you run a review, instead of Claude reading entire files, it queries the graph for the minimal set of files actually relevant to what changed -- their callers, dependents, and test coverage. Initial build takes ~10 seconds for a 500-file project; the graph updates automatically on every file edit and git commit via hooks. Supports 23+ languages including TypeScript, Python, Go, Rust, Java, Kotlin, Swift, Vue, Solidity, and Jupyter notebooks.

Benchmarked at 6.8x fewer tokens on code reviews and up to 49x on daily coding tasks across real open-source repositories.

Note: this is technically an MCP server that also installs skills and hooks. The MCP server does the graph querying; the skills (`/review-delta`, `/review-pr`, `/build-graph`) give Claude structured instructions for using it.

**Install (requires Python 3.10+):**
```
pip install code-review-graph
code-review-graph install           # auto-detects Claude Code and other platforms
code-review-graph build             # parse your codebase (run once in your repo)
```

Or Claude Code only:
```
code-review-graph install --platform claude-code
```

→ [github.com/tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph)

---

### Behavior Shaping

---

**andrej-karpathy-skills** -- Anti-assumption CLAUDE.md guidelines

A single `CLAUDE.md` file derived from Andrej Karpathy's January 2026 observations on LLM coding failure modes, built by Forrest Chang. Addresses three specific patterns Karpathy named: models making wrong assumptions silently without surfacing them, overcomplicated code and bloated abstractions, and unwanted side-effect changes to code the model doesn't fully understand. The file encodes four behavioral principles: state assumptions explicitly before coding, present multiple interpretations rather than picking silently, write the simplest code that works, and only change what the task requires.

These are behavioral guidelines, not enforceable rules -- there is no mechanism to verify a principle fired on any given request. The file biases toward caution over speed. For high-volume simple tasks like batch typo fixes, the clarification behavior it generates may add friction rather than value.

Note: Karpathy did not write this file and has not publicly endorsed it. Chang authored it, inspired by Karpathy's post.

**Install for current project only:**
```
curl -o CLAUDE.md https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md
```

Or append to an existing CLAUDE.md:
```
echo "" >> CLAUDE.md && curl https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md >> CLAUDE.md
```

**Install globally (all projects via plugin):**
```
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills
```

→ [github.com/forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills)

---

**everything-claude-code (ECC)** -- Full agent harness

A complete performance optimization system for Claude Code: skills, behavioral rules, hooks, memory optimization, security scanning, and agent configurations -- built over 10+ months of daily use building real products. Includes 150+ skills organized by language (TypeScript, Python, Go, PHP, Swift, web) and domain (TDD workflow, security review, search-first development), production-ready hooks for PreToolUse/PostToolUse/SessionStart events, an instinct system that learns your patterns and promotes them into skills automatically, and AgentShield for scanning against prompt injection and supply-chain attacks. Requires Claude Code CLI v2.1.0+.

The plugin install loads skills, commands, and hooks. Rules (language-specific coding standards) must be installed separately -- the plugin system cannot distribute them automatically.

**Install (plugin -- recommended):**
```
/plugin marketplace add affaan-m/everything-claude-code
/plugin install ecc@ecc
```

Then install rules for your stack manually:
```
git clone https://github.com/affaan-m/everything-claude-code.git
cp -r everything-claude-code/rules/common ~/.claude/rules/ecc/
cp -r everything-claude-code/rules/typescript ~/.claude/rules/ecc/   # or python, golang, php, etc.
```

Do not run the full manual installer (`./install.sh`) after a plugin install -- it will duplicate skills and hooks.

→ [github.com/affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)

---

### Dev Workflow

---

**security-review (Anthropic official)** -- Security-focused code review

Reviews pending changes on the current branch for security vulnerabilities. Analyzes the git diff and flags injection vectors, authentication bypass risks, secrets in code, and data exposure issues. More thorough than a general code review because it focuses exclusively on security concerns rather than style or coverage.

This is a built-in command (`/security-review`) -- no install required. It's listed here because it functions as a skill: it hands a detailed analysis prompt to Claude rather than executing fixed logic.

**Usage:**
```
/security-review
```

→ See [/library/commands](/library/commands)

---

**code-review (Anthropic official plugin)** -- Structured code review

Replaced the deprecated `/review` built-in command. Provides structured code review of changed files: logic errors, edge cases, security vulnerabilities, and style violations. Available as an installable plugin.

**Install:**
```
claude plugin install code-review@claude-plugins-official
```

If you don't have the official marketplace added:
```
claude plugin marketplace add https://github.com/anthropics/claude-plugins-official
claude plugin install code-review@claude-plugins-official
```

---

**compact-trigger** -- Strategic context compaction

A pattern skill, not a package -- you write it yourself and it takes about 5 minutes. Creates a skill that watches context usage and recommends or automatically triggers `/compact` with focused instructions before Claude hits the limit mid-task. Prevents the jarring experience of running out of context during a long refactor.

Minimal starting template to drop at `~/.claude/skills/compact-trigger/SKILL.md`:

```markdown
---
description: Compact context when usage is high. Use when context is above 70%, before starting a large task, or when the user asks to save context.
---

Check current context usage with /context. If above 70%, run /compact with these instructions: preserve the current task goal, key decisions made, and any code we have not yet committed. Summarize what has been done and what still needs to happen.
```

Invoke manually with `/compact-trigger` or let Claude trigger it when you say "we're getting low on context" or "save context before we continue."

---

**explain-codebase** -- Codebase architecture walkthrough

A pattern skill you write once per project and reuse. Gives Claude (and new team members) a structured walkthrough of how the codebase is organized: entry points, key modules, data flow, and conventions. Useful at the start of any session on an unfamiliar project, or when onboarding contributors.

Template to drop at `.claude/skills/explain-codebase/SKILL.md` (project-level):

```markdown
---
description: Explain the architecture and structure of this codebase. Use when a new session starts, when asked "how does this work", or when onboarding a new contributor.
---

Walk through the codebase architecture:
1. Entry points -- where does execution start?
2. Key modules -- what does each major directory/file do?
3. Data flow -- how does data move through the system?
4. Conventions -- naming, testing patterns, config management
5. Known complexity -- anything non-obvious worth flagging

Read the README first. Then explore the top-level structure before going deeper.
```

---

**incident-response** -- Ops incident workflow

A pattern skill for teams running production systems. When something breaks, triggers a structured investigation: pull recent logs, check monitoring dashboards if accessible, identify the likely failure point, and suggest fixes with rollback options. Reduces the frantic "where do I start" phase of an incident.

Template to drop at `.claude/skills/incident-response/SKILL.md`:

```markdown
---
description: Help investigate and resolve a production incident. Use when something is broken in production, when asked to debug an outage, or when logs show errors.
---

When an incident is reported:
1. Ask: what is broken, since when, and what changed recently?
2. Read recent error logs from the locations relevant to this project
3. Identify the most likely failure point based on the logs
4. Suggest the fastest fix that restores service
5. Suggest the proper fix that addresses root cause
6. List rollback options if the fix makes things worse

Be direct. In an incident, speed matters more than completeness.
```

---

## Find More

- [Anthropic official plugins](https://github.com/anthropics/claude-plugins-official) -- maintained by Anthropic
- [awesome-claude-code](https://github.com/anthropics/awesome-claude-code) -- community-curated index of skills, hooks, and plugins
- [wshobson/commands](https://github.com/wshobson/commands) -- 57 production-ready slash commands covering dev workflows, security, API scaffolding, and more
- `/skills` inside any Claude Code session -- lists all skills currently available to you

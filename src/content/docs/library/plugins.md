---
title: Plugins
lede: A reference list of available plugins for Claude interfaces.
section: library
---

<a href="/extending/plugins" class="crosslink">
  <svg class="crosslink__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" stroke-linecap="round" stroke-linejoin="round" /></svg>
  <div class="crosslink__body">
    <p class="crosslink__label">See also</p>
    <p class="crosslink__title">Extending: Plugins</p>
    <p class="crosslink__desc">How plugins work and when to use them.</p>
  </div>
  <svg class="crosslink__arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" width="16" height="16"><path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" /></svg>
</a>

Plugins bundle skills, agents, hooks, MCP servers, and commands into a single installable package. Install from the official marketplace:

```
claude plugin install <plugin-name>@claude-plugins-official
```

Most plugins install globally and are available in every project. Add `--scope project` to limit to the current repo. After installing, run `/reload-plugins` to activate without restarting.

**Security note:** Plugins can load MCP servers, hooks, and external software. Only install from sources you trust.

---

## Official Plugins

*By Anthropic &middot; installed from `claude-plugins-official`. No `marketplace add` step needed.*

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">code-review</span>
    <span class="skill-card__tag">Automated PR code review</span>
  </div>
  <p class="skill-card__desc">Four parallel agents independently assess logic errors, security issues, style violations, and CLAUDE.md compliance — each finding scored 0–100, only issues above 80 confidence reported. Output includes direct GitHub links with full SHA hashes and line numbers. Can post as a PR comment or print to terminal.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Install</span>
    <pre><code>claude plugin install code-review@claude-plugins-official</code></pre>
  </div>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Use</span>
    <pre><code>/code-review           # review and print to terminal
/code-review --comment # post as GitHub PR comment</code></pre>
  </div>
  <a class="skill-card__link" href="https://github.com/anthropics/claude-code/tree/main/plugins/code-review" target="_blank" rel="noopener">github.com/anthropics/claude-code/tree/main/plugins/code-review →</a>
</div>

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">feature-dev</span>
    <span class="skill-card__tag">Full feature development workflow</span>
  </div>
  <p class="skill-card__desc">Three specialized agents in sequence: explorer maps every relevant file, architect designs the implementation (data models, API contracts, component structure), reviewer audits the plan for edge cases and risks before a line is written. Works best with a well-maintained CLAUDE.md.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Install</span>
    <pre><code>claude plugin install feature-dev@claude-plugins-official</code></pre>
  </div>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Use</span>
    <pre><code>/feature-dev</code></pre>
  </div>
  <a class="skill-card__link" href="https://github.com/anthropics/claude-plugins-official" target="_blank" rel="noopener">github.com/anthropics/claude-plugins-official →</a>
</div>

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">security-guidance</span>
    <span class="skill-card__tag">Silent PreToolUse security hook</span>
  </div>
  <p class="skill-card__desc">Runs on every file write and edit, checking for nine patterns: command injection, XSS, eval usage, dangerous HTML, pickle deserialization, os.system calls, unsafe regex, hardcoded secrets, and SQL string concatenation. Warns before the tool executes — not after. No slash command, no manual trigger.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Install</span>
    <pre><code>claude plugin install security-guidance@claude-plugins-official</code></pre>
  </div>
  <a class="skill-card__link" href="https://github.com/anthropics/claude-plugins-official" target="_blank" rel="noopener">github.com/anthropics/claude-plugins-official →</a>
</div>

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">context7</span>
    <span class="skill-card__tag">Live library documentation &mdash; by Upstash, Anthropic-verified</span>
  </div>
  <p class="skill-card__desc">Pulls current version-specific documentation from source repositories (React, Postgres, Stripe, etc.) instead of relying on training-data docs that may be months out of date. Activates automatically when Claude identifies a library reference. Queries route to Upstash's hosted service — no API key needed for basic use.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Install</span>
    <pre><code>claude plugin install context7@claude-plugins-official</code></pre>
  </div>
  <a class="skill-card__link" href="https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/context7" target="_blank" rel="noopener">github.com/anthropics/claude-plugins-official/tree/main/external_plugins/context7 →</a>
</div>

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">playwright</span>
    <span class="skill-card__tag">Browser automation MCP &mdash; by Microsoft, Anthropic-verified</span>
  </div>
  <p class="skill-card__desc">Playwright MCP bundled as a one-command plugin install — navigate, click, fill forms, screenshot, run end-to-end tests via accessibility snapshots — without manually configuring the MCP entry. See <a href="/library/mcp-servers">MCP Servers → Playwright</a> for full capabilities.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Install</span>
    <pre><code>claude plugin install playwright@claude-plugins-official</code></pre>
  </div>
  <a class="skill-card__link" href="https://github.com/anthropics/claude-plugins-official" target="_blank" rel="noopener">github.com/anthropics/claude-plugins-official →</a>
</div>

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">ralph-loop</span>
    <span class="skill-card__tag">Autonomous iteration loop</span>
  </div>
  <p class="skill-card__desc">Claude runs repeatedly — writing code, testing, fixing failures, iterating — until the task is done or you stop it. Best for tasks with a clear, testable done condition ("make all tests pass", "implement this spec"). Works poorly for open-ended tasks with no success criteria.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Install</span>
    <pre><code>claude plugin install ralph-loop@claude-plugins-official</code></pre>
  </div>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Use</span>
    <pre><code>/ralph-loop   # start
/cancel-ralph # break out</code></pre>
  </div>
  <a class="skill-card__link" href="https://github.com/anthropics/claude-code/tree/main/plugins" target="_blank" rel="noopener">github.com/anthropics/claude-code/tree/main/plugins →</a>
</div>

---

## Community Plugins

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">Caveman</span>
    <span class="skill-card__tag">Output token compression</span>
  </div>
  <p class="skill-card__author">By JuliusBrussee</p>
  <p class="skill-card__desc">Cuts output tokens by ~65% with six intensity levels from <code>lite</code> (removes hedging) to <code>ultra</code> (maximum compression), preserving code blocks, technical terms, and security warnings. Includes <code>caveman-compress</code> for rewriting CLAUDE.md and memory files in compressed format to reduce input tokens too.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Install</span>
    <pre><code>claude plugin marketplace add JuliusBrussee/caveman
claude plugin install caveman@caveman</code></pre>
  </div>
  <a class="skill-card__link" href="https://github.com/JuliusBrussee/caveman" target="_blank" rel="noopener">github.com/JuliusBrussee/caveman →</a>
</div>

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">everything-claude-code (ECC)</span>
    <span class="skill-card__tag">Full agent harness</span>
  </div>
  <p class="skill-card__author">By affaan-m</p>
  <p class="skill-card__desc">185 skills by language and domain, 48 production-ready agents, hooks for PreToolUse/PostToolUse/SessionStart, an instinct system that promotes your patterns into skills automatically, and AgentShield for prompt injection scanning. Language-specific rules must be installed separately after the plugin.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Install</span>
    <pre><code>claude plugin marketplace add affaan-m/everything-claude-code
claude plugin install ecc@ecc</code></pre>
  </div>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Then install rules for your stack</span>
    <pre><code>git clone https://github.com/affaan-m/everything-claude-code.git
cp -r everything-claude-code/rules/common ~/.claude/rules/ecc/
cp -r everything-claude-code/rules/typescript ~/.claude/rules/ecc/</code></pre>
  </div>
  <a class="skill-card__link" href="https://github.com/affaan-m/everything-claude-code" target="_blank" rel="noopener">github.com/affaan-m/everything-claude-code →</a>
</div>

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">Composio</span>
    <span class="skill-card__tag">1,000+ external app connections</span>
  </div>
  <p class="skill-card__author">By ComposioHQ</p>
  <p class="skill-card__desc">Connects Claude Code to Slack, GitHub, Gmail, Notion, Linear, Google Calendar, Salesforce, and 1,000+ more with managed authentication — one connection instead of one MCP server per service. Two plugins: <code>composio-mcp</code> (the server connection) and <code>composio-cli</code> (CLI tools for managing connections). Requires a Composio account; tool calls route through their servers.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Install</span>
    <pre><code>claude plugin marketplace add ComposioHQ/composio-plugin-cc
claude plugin install composio-mcp@composio
claude plugin install composio-cli@composio</code></pre>
  </div>
  <a class="skill-card__link" href="https://github.com/ComposioHQ/composio-plugin-cc" target="_blank" rel="noopener">github.com/ComposioHQ/composio-plugin-cc →</a>
</div>

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">Repomix</span>
    <span class="skill-card__tag">Full-codebase context packing</span>
  </div>
  <p class="skill-card__author">By yamadashy</p>
  <p class="skill-card__desc">Packs an entire codebase into a single AI-optimized file. Three plugins: <code>repomix-mcp</code> exposes packing as an MCP server Claude can request on demand (practical minimum), <code>repomix-commands</code> adds slash commands, <code>repomix-explorer</code> adds AI-powered analysis agents.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Install</span>
    <pre><code>claude plugin marketplace add yamadashy/repomix
claude plugin install repomix-mcp@repomix
claude plugin install repomix-commands@repomix  # optional
claude plugin install repomix-explorer@repomix  # optional</code></pre>
  </div>
  <a class="skill-card__link" href="https://repomix.com/guide/claude-code-plugins" target="_blank" rel="noopener">repomix.com/guide/claude-code-plugins →</a>
</div>

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">Compound Engineering</span>
    <span class="skill-card__tag">Knowledge-accumulating dev workflow</span>
  </div>
  <p class="skill-card__author">By EveryInc</p>
  <p class="skill-card__desc">Skills and agents for planning (<code>/ce-plan</code>), implementation (<code>/ce-work</code>), and review (<code>/ce-code-review</code>), plus a compound loop (<code>/ce-compound</code>) that saves solutions to <code>docs/solutions/</code> — building a project-specific knowledge base Claude draws from in future sessions. Run <code>/ce-setup</code> after install.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Install</span>
    <pre><code>claude plugin marketplace add EveryInc/compound-engineering-plugin
claude plugin install compound-engineering@compound-engineering-plugin</code></pre>
  </div>
  <a class="skill-card__link" href="https://github.com/EveryInc/compound-engineering-plugin" target="_blank" rel="noopener">github.com/EveryInc/compound-engineering-plugin →</a>
</div>

---

## Find More

- [claude.com/plugins](https://claude.com/plugins) -- Anthropic's official plugin directory
- [claude-plugins.dev](https://claude-plugins.dev) -- community registry with CLI installer
- [github.com/anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) -- source for all official plugins
- `/plugin` inside any Claude Code session -- browse and manage installed plugins

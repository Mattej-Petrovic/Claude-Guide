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

Plugins bundle skills, agents, hooks, MCP servers, and commands into a single installable package. Where a skill is one markdown file that teaches Claude one workflow, a plugin is the whole system -- everything configured and namespaced, ready to use.

Install from the official marketplace:
```
claude plugin install <plugin-name>@claude-plugins-official
```

Most plugins install globally (user scope) and are available in every project. Add `--scope project` to limit to the current repo.

After installing, run `/reload-plugins` to activate without restarting. Manage installed plugins with `/plugin`.

**Security note:** Plugins can load MCP servers, hooks, and external software. Only install plugins from sources you trust. The official marketplace (`claude-plugins-official`) is Anthropic-managed. Community marketplaces vary.

---

## Official Plugins
*By Anthropic · installed from `claude-plugins-official`*

The official marketplace comes pre-configured. No `marketplace add` step needed for these.

---

### code-review
Automated PR code review using four parallel agents with confidence-based scoring. Agents independently assess logic errors, security issues, style violations, and CLAUDE.md compliance. Each finding is scored 0--100 and only issues above 80 confidence are reported -- filtering the noise that makes automated review annoying. Output includes direct GitHub links with full SHA hashes and line numbers. Can post the review as a PR comment or print to terminal.

**Install:**
```
claude plugin install code-review@claude-plugins-official
```

**Use:**
```
/code-review              # review and print to terminal
/code-review --comment    # post as GitHub PR comment
```

Run on a PR branch. Skips closed, draft, automated, and already-reviewed PRs automatically. Adjust the confidence threshold by editing the command file if 80 doesn't suit your team.

→ [github.com/anthropics/claude-code/tree/main/plugins/code-review](https://github.com/anthropics/claude-code/tree/main/plugins/code-review)

---

### feature-dev
Full feature development workflow orchestrated by three specialized agents. The explorer agent maps the codebase and identifies every file relevant to the feature. The architect agent designs the implementation -- data models, API contracts, component structure. The reviewer agent audits the plan for edge cases and risks before a line is written. Claude asks clarifying questions throughout rather than making silent assumptions.

**Install:**
```
claude plugin install feature-dev@claude-plugins-official
```

**Use:**
```
/feature-dev
```

Then describe the feature in natural language. Works best with a well-maintained CLAUDE.md -- the agents use it to understand your conventions before planning.

→ [github.com/anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)

---

### security-guidance
A PreToolUse hook that runs silently on every file write and edit, checking for nine security patterns: command injection, XSS, eval usage, dangerous HTML, pickle deserialization, os.system calls, unsafe regex, hardcoded secrets, and SQL string concatenation. When it fires, it warns before the tool executes -- not after. No slash command, no manual trigger. Just installs and runs in the background for every session.

**Install:**
```
claude plugin install security-guidance@claude-plugins-official
```

No interaction required after install. The hook fires automatically whenever Claude writes or edits a file. Does not block -- it warns.

→ [github.com/anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)

---

### context7
**By Upstash · External plugin, Anthropic-verified**

Connects to Upstash's Context7 service, which indexes live documentation from source repositories. When Claude needs to reference a library (React, Postgres, Stripe, etc.), instead of relying on training-data docs that may be months out of date, it pulls the current version-specific documentation from the actual source repo. Eliminates the class of bugs caused by Claude confidently using an API that changed in the last release.

**Install:**
```
claude plugin install context7@claude-plugins-official
```

No API key needed for basic use. Claude activates Context7 automatically when it identifies a library reference in context. The plugin connects to Upstash's hosted service -- your queries go to their servers.

→ [github.com/anthropics/claude-plugins-official/tree/main/external_plugins/context7](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/context7)

---

### playwright
**By Microsoft · External plugin, Anthropic-verified**

Playwright MCP bundled as a one-command plugin install. Same capabilities as the standalone MCP server (navigate, click, fill forms, screenshot, run end-to-end tests via accessibility snapshots) but packaged so you don't need to manually configure the MCP entry. Useful if you want Playwright alongside other plugins without editing config files.

**Install:**
```
claude plugin install playwright@claude-plugins-official
```

For more on what Playwright MCP can do, see [MCP Servers → Playwright](/library/mcp-servers).

→ [github.com/anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)

---

### ralph-loop
An autonomous iteration loop. Start it on a task and Claude runs repeatedly -- writing code, testing, fixing failures, iterating -- until the task is done or you stop it. A Stop hook intercepts Claude's natural exit points and redirects back into the loop. `/cancel-ralph` breaks out cleanly.

Best used for tasks with a clear, testable done condition: "make all tests pass," "make the linter clean," "implement this spec." Works poorly for open-ended tasks with no success criteria.

**Install:**
```
claude plugin install ralph-loop@claude-plugins-official
```

**Use:**
```
/ralph-loop     # start the loop on the current task
/cancel-ralph   # break out
```

→ [github.com/anthropics/claude-code/tree/main/plugins](https://github.com/anthropics/claude-code/tree/main/plugins)

---

## Community Plugins

---

### Caveman
**By JuliusBrussee**

Cuts Claude's output tokens by ~65% by forcing minimal, fragment-style responses while preserving full technical accuracy. Drops articles, filler words, and pleasantries. Keeps code blocks, technical terms, and caveats intact. Six intensity levels from `lite` (removes hedging only) to `ultra` (maximum compression). Automatically backs off to normal language for security warnings and destructive operations where clarity matters.

Includes a companion `caveman-compress` sub-skill that rewrites your CLAUDE.md and memory files in compressed format -- reducing input tokens, not just output.

**Install:**
```
claude plugin marketplace add JuliusBrussee/caveman
claude plugin install caveman@caveman
```

Trigger with `/caveman`, `/caveman lite`, `/caveman ultra`, or natural language: "caveman mode", "less tokens".

→ [github.com/JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)

---

### Everything Claude Code (ECC)
**By affaan-m**

A complete agent harness built over 10+ months of daily use: 185 skills organized by language (TypeScript, Python, Go, PHP, Swift, web) and domain, 48 production-ready agents, hooks for PreToolUse/PostToolUse/SessionStart events, an instinct system that learns your patterns and promotes them into skills automatically, and AgentShield for scanning against prompt injection and supply-chain attacks.

The plugin installs skills, agents, and hooks. Language-specific rules (coding standards and conventions) must be installed separately -- the plugin system cannot distribute them automatically.

**Install:**
```
claude plugin marketplace add affaan-m/everything-claude-code
claude plugin install ecc@ecc
```

Then install rules for your stack:
```
git clone https://github.com/affaan-m/everything-claude-code.git
cp -r everything-claude-code/rules/common ~/.claude/rules/ecc/
cp -r everything-claude-code/rules/typescript ~/.claude/rules/ecc/   # or python, golang, php, etc.
```

Do not run the full manual installer after a plugin install -- it duplicates skills and hooks.

→ [github.com/affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)

---

### Composio
**By ComposioHQ**

Connects Claude Code to 1,000+ external apps -- Slack, GitHub, Gmail, Notion, Linear, Google Calendar, Salesforce, and more -- with managed authentication. Instead of configuring one MCP server per service, Composio handles auth for all of them through a single connection and routes Claude's tool calls intelligently. Includes programmatic tool calling for building agents that take real actions across services.

Two plugins: `composio-mcp` (the MCP server connection) and `composio-cli` (CLI tools for managing connections).

**Install:**
```
claude plugin marketplace add ComposioHQ/composio-plugin-cc
claude plugin install composio-mcp@composio
claude plugin install composio-cli@composio
```

Requires a Composio account (free tier available). Your API key is stored locally. Tool calls route through Composio's servers -- review their privacy policy if working with sensitive data.

→ [github.com/ComposioHQ/composio-plugin-cc](https://github.com/ComposioHQ/composio-plugin-cc)

---

### Repomix
**By yamadashy**

Packs an entire codebase into a single AI-optimized file for full-project context. Three separate plugins covering different use cases: `repomix-mcp` exposes the packing capability as an MCP server so Claude can request it on demand; `repomix-commands` adds slash commands for quick operations; `repomix-explorer` adds AI-powered codebase analysis agents. All three together give the most complete experience; `repomix-mcp` alone is the practical minimum.

**Install:**
```
claude plugin marketplace add yamadashy/repomix
claude plugin install repomix-mcp@repomix
claude plugin install repomix-commands@repomix     # optional
claude plugin install repomix-explorer@repomix     # optional
```

Or use the interactive installer:
```
/plugin
```

→ [repomix.com/guide/claude-code-plugins](https://repomix.com/guide/claude-code-plugins)

---

### Compound Engineering
**By EveryInc**

An engineering workflow system built around the idea that each unit of work should leave behind a lesson that makes the next one easier. Skills and agents for planning (`/ce-plan`), implementation (`/ce-work`), code review (`/ce-code-review`), and a compound loop (`/ce-compound`) that captures solutions in a `docs/solutions/` directory -- building a project-specific knowledge base Claude draws from in future sessions. Includes specialized review agents for Swift/iOS, TypeScript, and backend architecture. Run `/ce-setup` after install to check your environment and configure recommended tools.

**Install:**
```
claude plugin marketplace add EveryInc/compound-engineering-plugin
claude plugin install compound-engineering@compound-engineering-plugin
```

Then run `/ce-setup` to verify the install and configure your environment.

→ [github.com/EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)

---

## Find More

- [claude.com/plugins](https://claude.com/plugins) -- Anthropic's official plugin directory
- [claude-plugins.dev](https://claude-plugins.dev) -- community registry with CLI installer
- [github.com/anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) -- source for all official plugins
- `/plugin` inside any Claude Code session -- browse and manage installed plugins

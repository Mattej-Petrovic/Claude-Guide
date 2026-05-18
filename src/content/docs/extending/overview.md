---
title: Overview
lede: The five ways to extend Claude. Skills, MCP, connectors, plugins, commands. What each is and when to reach for which.
section: extending
---

Claude is useful out of the box. It becomes powerful when you extend it. The ecosystem provides five distinct mechanisms for adding capabilities, each solving a different problem.

This page is the map. Every section below has a dedicated page going deeper.

## The five extension types

**Skills.** Markdown files with YAML frontmatter that describe a workflow Claude should follow. When the description matches the task, Claude loads the skill into context and uses it. Lightweight by design (around 30 to 50 tokens just to be aware they exist), they teach Claude how to do a thing. Live in `.claude/skills/` for project-scoped skills, `~/.claude/skills/` for user-scoped ones.

**MCP (Model Context Protocol).** An open standard for connecting Claude to external tools and data sources. An MCP server exposes tools (like "search GitHub issues" or "query the database") that Claude can call when relevant. Configured in `.mcp.json`. Hundreds of community and official servers cover GitHub, Slack, Notion, databases, browser automation, library docs, and more. The protocol is open source and donated to the Linux Foundation.

**Connectors.** Pre-built MCP servers from Anthropic and partners, surfaced as one-click integrations in claude.ai. Gmail, Google Calendar, Drive, Slack, Notion, GitHub, Canva, and 200-plus others. No configuration beyond clicking Connect and authorizing through OAuth. Connectors are MCP under the hood, just packaged for consumer use.

**Plugins.** Distributable bundles that combine skills, slash commands, subagents, hooks, and MCP server configurations into one installable package. Available in Claude Code through marketplaces (Anthropic's official one plus community ones). Use them when you want to ship "the full setup" rather than make people configure each piece individually.

**Slash commands.** Stored prompts triggered by typing `/command-name`. Markdown files in `.claude/commands/` with optional `$ARGUMENTS` substitution. Less powerful than skills (no procedural depth, just a stored prompt) but useful when you want a quick shortcut for something you type often.

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comparison of five Claude extension types: skills, MCP, connectors, plugins, slash commands">
  <defs>
    <style>
      .header-text { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 12px; opacity: 0.5; letter-spacing: 1.5px; font-weight: 700; }
      .name-text { fill: #d97706; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 1px; }
      .body-text { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 14px; opacity: 0.75; }
      .body-mono { fill: currentColor; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 13px; opacity: 0.7; }
      .separator { stroke: currentColor; stroke-width: 1; opacity: 0.25; }
    </style>
  </defs>
  <text x="20" y="32" class="header-text">EXTENSION</text>
  <text x="160" y="32" class="header-text">WHAT IT IS</text>
  <text x="440" y="32" class="header-text">WHERE IT LIVES</text>
  <text x="600" y="32" class="header-text">BEST FOR</text>
  <line x1="20" y1="48" x2="780" y2="48" class="separator"/>
  <text x="20" y="96" class="name-text">SKILLS</text>
  <text x="160" y="96" class="body-text">Markdown workflow files</text>
  <text x="440" y="96" class="body-mono">.claude/skills/</text>
  <text x="600" y="96" class="body-text">Repeatable workflows</text>
  <line x1="20" y1="116" x2="780" y2="116" class="separator"/>
  <text x="20" y="164" class="name-text">MCP</text>
  <text x="160" y="164" class="body-text">Tool and data protocol</text>
  <text x="440" y="164" class="body-mono">.mcp.json</text>
  <text x="600" y="164" class="body-text">Apps, data, custom tools</text>
  <line x1="20" y1="184" x2="780" y2="184" class="separator"/>
  <text x="20" y="232" class="name-text">CONNECTORS</text>
  <text x="160" y="232" class="body-text">Pre-built MCP for claude.ai</text>
  <text x="440" y="232" class="body-text">claude.ai settings</text>
  <text x="600" y="232" class="body-text">Consumer integrations</text>
  <line x1="20" y1="252" x2="780" y2="252" class="separator"/>
  <text x="20" y="300" class="name-text">PLUGINS</text>
  <text x="160" y="300" class="body-text">Bundles of multiple extensions</text>
  <text x="440" y="300" class="body-text">Plugin marketplace</text>
  <text x="600" y="300" class="body-text">Sharing complete setups</text>
  <line x1="20" y1="320" x2="780" y2="320" class="separator"/>
  <text x="20" y="368" class="name-text">COMMANDS</text>
  <text x="160" y="368" class="body-text">Stored slash-command prompts</text>
  <text x="440" y="368" class="body-mono">.claude/commands/</text>
  <text x="600" y="368" class="body-text">Frequent prompt shortcuts</text>
</svg>

## How they compose

These extensions are not exclusive. They compose, and that is where the leverage lives.

A plugin can contain skills, commands, hooks, agents, and MCP server configurations all at once. A skill can call MCP tools. A connector is itself an MCP server. A slash command can invoke a skill. Most useful production setups end up using several of these together: a plugin packaged for the team, with custom skills inside for repeatable workflows, plus three or four MCP servers for the data and tools they need to access.

If you find yourself building all of these together for one purpose, that purpose probably deserves a plugin.

## Which one do I use?

A useful decision sequence:

- **Want to connect Claude to an app or service you already use?** Look at connectors first (claude.ai) or MCP servers (Claude Code). If a pre-built one exists, use it. Build your own MCP server only when nothing fits.
- **Want Claude to follow a specific workflow or process?** Write a skill. Skills are the lightweight way to teach Claude how to do something repeatable.
- **Have a prompt you type often?** A slash command is faster than a skill. Skills are workflows; commands are shortcuts.
- **Want to share a complete setup with your team or the world?** A plugin packages everything together. Skills and commands alone work for personal setups; plugins are the distribution format.

Skills, commands, and plugins are Claude Code primarily. MCP works across Claude Code, Claude Desktop, and (with caveats) claude.ai. Connectors are claude.ai's consumer-friendly version of MCP. The lines are blurring as Anthropic ships skills support to claude.ai too, but the rough split still holds.

## Common confusions

**Skills vs commands.** Slash commands are stored prompts. Skills are stored workflows with structured guidance Claude follows. If your "command" is more than a paragraph and includes steps, conditions, or expected outputs, it should be a skill.

**MCP vs connectors.** They are the same protocol. Connectors are pre-built, OAuth-friendly MCP servers running on Anthropic's or partners' infrastructure, surfaced through claude.ai's UI. "MCP servers" in casual usage usually means the broader category, including ones you configure yourself in `.mcp.json`.

**Plugins vs skills.** Plugins are containers. Skills are content. A plugin can contain many skills plus other things. A skill standalone is also valid, just not packaged for distribution. Some sources confusingly use "plugins" to refer to skills; Anthropic's official taxonomy keeps them distinct.

**Token cost.** Skills cost almost nothing to have available (around 30 to 50 tokens). MCP servers cost more just by being connected because Claude reads tool descriptions on every turn. Big servers can use 50,000-plus tokens. Connecting too many MCP servers degrades accuracy more than it helps. Internal Anthropic testing showed accuracy dropping from 74% to 49% on Opus 4 when working with large tool libraries. Three or four well-chosen servers beats fifteen sprawling ones.

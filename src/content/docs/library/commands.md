---
title: Commands
lede: A reference list of built-in Claude Code slash commands.
section: library
---

<a href="/extending/commands" class="crosslink">
  <svg class="crosslink__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" stroke-linecap="round" stroke-linejoin="round" /></svg>
  <div class="crosslink__body">
    <p class="crosslink__label">See also</p>
    <p class="crosslink__title">Extending: Commands</p>
    <p class="crosslink__desc">How to write and use custom slash commands.</p>
  </div>
  <svg class="crosslink__arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" width="16" height="16"><path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" /></svg>
</a>

Commands are typed with `/` inside an active Claude Code session. Type `/` alone to see everything available to you — what shows up depends on your plan, platform, and which plugins or MCP servers you have connected.

Entries marked **[Skill]** are bundled skills — they hand a prompt to Claude rather than executing a fixed action, and Claude can also invoke them automatically when relevant.

Some commands are only available in certain contexts. `/desktop` shows on macOS and Windows only. `/upgrade` shows on Pro and Max plans. `/sandbox` requires supported platforms.

<div class="cmd-quickref">
  <p class="cmd-quickref__label">Most used</p>
  <div class="cmd-quickref__grid">
    <a href="#project-management" class="cmd-chip"><code>/compact</code><span>free context</span></a>
    <a href="#project-management" class="cmd-chip"><code>/clear</code><span>reset session</span></a>
    <a href="#project-management" class="cmd-chip"><code>/init</code><span>generate CLAUDE.md</span></a>
    <a href="#mode--model-control" class="cmd-chip"><code>/model</code><span>switch model</span></a>
    <a href="#mode--model-control" class="cmd-chip"><code>/plan</code><span>plan mode</span></a>
    <a href="#information--status" class="cmd-chip"><code>/context</code><span>usage grid</span></a>
    <a href="#information--status" class="cmd-chip"><code>/cost</code><span>token stats</span></a>
    <a href="#bundle-commands-skills" class="cmd-chip"><code>/batch</code><span>parallel changes</span></a>
    <a href="#bundle-commands-skills" class="cmd-chip"><code>/loop</code><span>repeat prompt</span></a>
    <a href="#integrations--extensions" class="cmd-chip"><code>/mcp</code><span>manage servers</span></a>
  </div>
</div>

---

## Project Management

| Command | What it does |
|---|---|
| `/init` | Generates a `CLAUDE.md` file for your project. Set `CLAUDE_CODE_NEW_INIT=1` for an interactive flow that also walks through skills, hooks, and memory files. Run this first in any new repo. |
| `/memory` | Edit `CLAUDE.md` memory files, toggle auto-memory, and review auto-memory entries. |
| `/context` | Visualizes current context usage as a colored grid. Shows optimization suggestions for memory bloat and capacity warnings. |
| `/compact [instructions]` | Compresses conversation history to free up context. Pass optional instructions to guide what gets preserved -- e.g. `/compact keep the auth flow discussion`. |
| `/clear` | Clears all conversation history. Aliases: `/reset`, `/new`. |
| `/resume [session]` | Resume a previous session by ID or name, or open a session picker. Alias: `/continue`. |
| `/branch [name]` | Branches the current conversation at this point, preserving the original. Return to it with `/resume`. Alias: `/fork`. |
| `/rename [name]` | Rename the current session. Without a name, auto-generates one from conversation history. |
| `/add-dir <path>` | Add an extra working directory for file access during this session. |
| `/diff` | Open an interactive diff viewer showing uncommitted changes and per-turn diffs. Arrow keys to navigate between git diff and individual turns. |
| `/export [filename]` | Export the current conversation as plain text. Without a filename, opens a dialog to copy or save. |
| `/rewind` | Rewind conversation and/or code to a previous checkpoint. Alias: `/checkpoint`. |

---

## Information & Status

| Command | What it does |
|---|---|
| `/help` | Lists all available commands, including custom ones from `.claude/commands/` and connected MCP servers. |
| `/cost` | Shows token usage statistics for the current session. |
| `/usage` | Shows your plan limits and current rate limit status. |
| `/stats` | Visualizes daily usage, session history, streaks, and model preferences. |
| `/tasks` | Lists and manages background tasks running in the session. Also available as `/bashes`. |
| `/doctor` | Diagnoses your Claude Code installation and settings. Press `f` to have Claude fix any flagged issues. |
| `/debug [description]` | **[Skill]** Enables debug logging and reads the session log to troubleshoot issues. Optionally describe the issue to focus the analysis. Debug logging is off by default unless you started with `claude --debug`. |
| `/insights` | Generates a report analyzing your Claude Code sessions -- project areas, interaction patterns, friction points. |
| `/status` | Opens the Status tab in Settings showing version, model, account, and connectivity. Works while Claude is mid-response. |
| `/release-notes` | View the changelog in an interactive version picker. |

---

## Mode & Model Control

| Command | What it does |
|---|---|
| `/model [model]` | Switch the active model. Use arrow keys to adjust effort level for models that support it. Takes effect immediately. |
| `/fast` | Toggle fast mode: up to 2.5x faster Opus output at the same quality, for a higher per-token cost. Opus-only (4.8 / 4.7 / 4.6); enabling it switches you to Opus. On subscription plans it bills from usage credits. |
| `/plan [description]` | Enter plan mode. Pass an optional description to start immediately: `/plan fix the auth bug`. |
| `/effort [low\|medium\|high\|xhigh\|max\|ultracode\|auto]` | Set the model's effort level. `low/medium/high/xhigh` persist across sessions; `xhigh` is Opus-only (4.8 / 4.7). `max` is the deepest level and applies to the current session only. `ultracode` is session-only and Opus-only: it sets `xhigh` and has Claude orchestrate dynamic workflows for substantive tasks. `auto` resets to the model default (`high` on Opus 4.8). |
| `/output-style` | Change output style (configured via `/config`). |
| `/voice` | Toggle push-to-talk voice dictation. Requires a Claude.ai account. |

---

## Feature Management

| Command | What it does |
|---|---|
| `/hooks` | View hook configurations for tool events. |
| `/agents` | Manage agent configurations. |
| `/permissions` | Manage allow, ask, and deny rules for tool permissions. Review auto-mode denials. Alias: `/allowed-tools`. |
| `/sandbox` | Toggle sandbox mode. Available on supported platforms only. |
| `/config` | Opens the Settings interface to adjust theme, model, output style, and other preferences. Alias: `/settings`. |
| `/skills` | List available skills. |
| `/btw <question>` | Ask a side question without adding it to the main conversation context. |
| `/copy [N]` | Copy the last assistant response to clipboard. Pass a number to copy an earlier response. Press `w` to write to file instead -- useful over SSH. |
| `/color [color\|default]` | Set the prompt bar color for the current session. Options: `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, `cyan`. |

---

## Environment & Terminal

| Command | What it does |
|---|---|
| `/terminal-setup` | Configure terminal keybindings (Shift+Enter etc.). Only shown in terminals that need it -- VS Code, Alacritty, Warp. |
| `/keybindings` | Open or create your keybindings config file. |
| `/statusline` | Configure Claude Code's status line. Describe what you want, or run without arguments to auto-configure. |
| `/theme` | Change color theme. Includes dark/light, colorblind-accessible (daltonized), and ANSI themes that use your terminal's palette. |
| `/desktop` | Continue the current session in the Claude Code Desktop app. macOS and Windows only. Alias: `/app`. |

---

## Integrations & Extensions

| Command | What it does |
|---|---|
| `/install-github-app` | Set up Claude GitHub Actions for a repository. Walks through repo selection and configuration. |
| `/install-slack-app` | Install the Claude Slack app. Opens a browser to complete OAuth. |
| `/mcp` | Manage MCP server connections and OAuth authentication. |
| `/plugin` | Manage Claude Code plugins. |
| `/reload-plugins` | Reload all active plugins to apply pending changes without restarting. |
| `/chrome` | Configure Claude in Chrome settings. |
| `/ide` | Manage IDE integrations and show status. |
| `/remote-control` | Make this session available for remote control from claude.ai. Alias: `/rc`. |
| `/autofix-pr [prompt]` | Spawns a Claude Code web session that watches the current branch's PR and pushes fixes when CI fails or reviewers leave comments. Requires `gh` CLI. |
| `/web-setup` | Connect your GitHub account to Claude Code on the web using local `gh` CLI credentials. |
| `/teleport` | Pull a Claude Code web session into this terminal. Opens a picker, fetches the branch and conversation. Alias: `/tp`. Requires claude.ai subscription. |
| `/remote-env` | Configure the default remote environment for web sessions started with `--remote`. |
| `/ultraplan <prompt>` | Draft a plan in an ultraplan session, review it in your browser, then execute remotely or send back to terminal. |

---

## Bundle Commands (Skills)

| Command | What it does |
|---|---|
| `/simplify [focus]` | **[Skill]** Reviews recently changed files for code reuse, quality, and efficiency issues. Spawns three review agents in parallel, aggregates findings, and applies fixes. Pass text to focus: `/simplify focus on memory efficiency`. |
| `/batch <instruction>` | **[Skill]** Orchestrates large-scale codebase changes in parallel. Decomposes work into 5--30 independent units, spawns one background agent per unit in an isolated git worktree, each implementing its unit and opening a PR. Requires git. |
| `/loop [interval] [prompt]` | **[Skill]** Runs a prompt repeatedly while the session stays open. Omit interval and Claude self-paces. Omit prompt and Claude runs an autonomous maintenance check, or uses `.claude/loop.md` if present. Example: `/loop 5m check if the deploy finished`. Alias: `/proactive`. |
| `/debug [description]` | **[Skill]** See "Information & Status" above. |
| `/claude-api` | **[Skill]** Loads Claude API reference material for your project's language (Python, TypeScript, Java, Go, Ruby, C#, PHP, or cURL). Covers tool use, streaming, batches, structured outputs. Also activates automatically when your code imports `anthropic` or `@anthropic-ai/sdk`. |
| `/security-review` | Analyzes pending changes on the current branch for security vulnerabilities. Reviews the git diff for injection risks, auth issues, and data exposure. |

---

## Scheduling & Routines

| Command | What it does |
|---|---|
| `/schedule [description]` | Create, update, list, or run routines. Claude walks through setup conversationally. |
| `/loop` | See Bundle Commands above. |

---

## Account & Plans

| Command | What it does |
|---|---|
| `/login` | Sign in to your Anthropic account. |
| `/logout` | Sign out. |
| `/upgrade` | Open the upgrade page. Only shown on Pro and Max plans. |
| `/extra-usage` | Configure extra usage to keep working when rate limits are hit. |
| `/privacy-settings` | View and update privacy settings. Pro and Max only. |
| `/feedback` | Submit feedback about Claude Code. Alias: `/bug`. |
| `/passes` | Share a free week of Claude Code with friends. Only visible if your account is eligible. |
| `/stickers` | Order Claude Code stickers. |
| `/powerup` | Discover Claude Code features through quick interactive lessons with animated demos. |

---

## Removed Commands

These appeared in older versions but have been removed:

| Command | Status |
|---|---|
| `/review` | Removed. Install the `code-review` plugin instead: `claude plugin install code-review@claude-plugins-official` |
| `/vim` | Removed in v2.1.92. Use `/config` → Editor mode to toggle Vim mode. |
| `/pr-comments` | Removed in v2.1.91. Ask Claude directly to view PR comments instead. |

---

## MCP Prompts

MCP servers can expose prompts that appear as slash commands. They use the format `/mcp__<server>__<prompt>` and are dynamically discovered from connected servers.

---

## Custom Commands

You can create your own commands by placing `.md` files in:
- `.claude/commands/` -- project-level, only available in that repo
- `~/.claude/commands/` -- personal, available across all projects

The filename becomes the `/command-name`. The file content is the prompt Claude receives. For the current recommended format, see [Skills](/extending/skills).

---
title: Project files
lede: CLAUDE.md, AGENTS.md, settings.json, and the rest of the files that configure a Claude Code project.
section: concepts
---

These are the files at the root of your project that configure Claude Code. They turn a stateless agent into one that already knows your stack, your conventions, your commands, and which tools it has access to.

The problem they solve: every Claude Code session starts blank. Without configuration, you spend the first messages of every session re-explaining your project. With it, the agent shows up oriented and you start the work, not the briefing.

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Project file structure showing CLAUDE.md, AGENTS.md, settings.json, mcp.json and the .claude folder layout" style="max-width: 100%; height: auto; margin: 2rem 0;">
  <defs>
    <style>
      .tree-text { fill: currentColor; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 13px; opacity: 0.85; }
      .tree-folder { fill: #d97706; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 13px; font-weight: 600; }
      .annotation { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 12px; opacity: 0.65; }
    </style>
  </defs>
  <text x="20" y="40" class="tree-folder">my-project/</text>
  <text x="20" y="68" class="tree-text">├── CLAUDE.md</text>
  <text x="350" y="68" class="annotation">Project memory. Loaded every session.</text>
  <text x="20" y="96" class="tree-text">├── AGENTS.md</text>
  <text x="350" y="96" class="annotation">Cross-tool standard. Use if mixing AI tools.</text>
  <text x="20" y="124" class="tree-text">├── CLAUDE.local.md</text>
  <text x="350" y="124" class="annotation">Personal additions. Gitignored.</text>
  <text x="20" y="152" class="tree-text">├── README.md</text>
  <text x="350" y="152" class="annotation">Build, run, test for humans. Claude reads it too.</text>
  <text x="20" y="180" class="tree-text">├── .mcp.json</text>
  <text x="350" y="180" class="annotation">MCP server config. Shared via git.</text>
  <text x="20" y="208" class="tree-text">├── .claude/</text>
  <text x="20" y="236" class="tree-text">│   ├── settings.json</text>
  <text x="350" y="236" class="annotation">Hooks, permissions, env vars.</text>
  <text x="20" y="264" class="tree-text">│   ├── settings.local.json</text>
  <text x="350" y="264" class="annotation">Personal settings. Gitignored.</text>
  <text x="20" y="292" class="tree-text">│   ├── agents/</text>
  <text x="350" y="292" class="annotation">Custom subagents.</text>
  <text x="20" y="320" class="tree-text">│   ├── commands/</text>
  <text x="350" y="320" class="annotation">Slash commands.</text>
  <text x="20" y="348" class="tree-text">│   └── skills/</text>
  <text x="350" y="348" class="annotation">Reusable workflows.</text>
  <text x="20" y="376" class="tree-text">└── src/</text>
  <text x="350" y="376" class="annotation">Your code.</text>
</svg>

## CLAUDE.md

The standing brief. Plain markdown loaded at every session start. This is where you tell Claude what your project is, what stack it uses, what the build and test commands are, what conventions to follow, and what to avoid.

Three locations get merged when Claude Code starts:

- `~/.claude/CLAUDE.md` for personal preferences across every project on your machine
- `./CLAUDE.md` at the project root for shared, version-controlled team rules
- A `CLAUDE.md` in a subdirectory for scoped rules that only apply when working in that part of the tree

The closest file wins on conflicts. The file you can edit is the one you should be working with.

Keep it lean. A February 2026 ETH Zurich study found that human-written context files improve task success by about 4%, while LLM-generated ones (the kind `/init` produces) actually reduce success by about 3% and inflate cost by 20%. The default `/init` output is usually bloated. Delete most of what it generates and keep only what you would correct Claude on if it was not in the file.

Target under 300 lines. If your file is over 500 lines, most of it is being ignored. Claude Code injects a system reminder with your CLAUDE.md saying "this context may or may not be relevant to your tasks," which is exactly how it treats long, scattered files.

## AGENTS.md

A cross-tool standard. Same purpose as CLAUDE.md, different audience. Originally pushed by OpenAI for Codex, donated to the Linux Foundation in December 2025, and now read by Codex, Cursor, GitHub Copilot CLI, Gemini CLI, Windsurf, Aider, Zed, Warp, and others. Past 60,000 open-source projects use it.

Claude Code reads CLAUDE.md as primary but also reads AGENTS.md as a fallback when no CLAUDE.md exists. This means for mixed-tool teams, you can write one AGENTS.md and have it work for everyone.

When to choose which:

- **Claude Code only.** CLAUDE.md is fine.
- **Multiple AI tools across the team.** AGENTS.md as the source of truth, with a tiny CLAUDE.md that says "Read AGENTS.md for project context" plus any Claude-specific instructions.
- **Simplest possible setup.** Just AGENTS.md.

Some teams symlink CLAUDE.md to AGENTS.md (`ln -s AGENTS.md CLAUDE.md`) to keep one source of truth. It is a workaround, but it works and prevents the two files from drifting apart.

## .claude/settings.json

Permissions, environment variables, and hook configuration. Lives in `.claude/` at the project root, shared via git so the whole team gets the same guardrails.

Common contents:

- `permissions.allow` and `permissions.deny` to whitelist specific commands or block dangerous ones (`Bash(rm -rf:*)`, `Bash(curl:*|sh)`, `Read(.env)`)
- `hooks.PreToolUse` and `hooks.PostToolUse` to run shell scripts before or after Claude Code actions, for things like secret scanning or auto-formatting
- `env` variables that should be set for the session

A locked-down example: deny destructive bash, run a secret scanner before any write to disk, log every tool call. None of that is overhead. It is how you ship Claude Code at work without losing sleep.

`.claude/settings.local.json` is the same shape but personal and gitignored. Put your own overrides there.

## .mcp.json

MCP server configuration at the project root. This is where you wire Claude Code to GitHub, JIRA, Slack, your database, or any other MCP server the team uses.

Tokens go in environment variables, never inline. Use `${VAR_NAME}` references in `.mcp.json` and document the required env vars in your README. This is how you get version-controlled tool config without leaking credentials.

## CLAUDE.local.md

Personal additions to CLAUDE.md. Gitignored. Use this when your individual workflow needs something the team file should not have. Personal aliases, machine-specific paths, debugging preferences, "always check git status before suggesting commits."

If everyone on the team uses Claude Code, team-wide preferences go in CLAUDE.md and personal stuff goes in CLAUDE.local.md without polluting either.

## README.md

Not technically a Claude file, but Claude reads it. The build, run, and test instructions for humans become the same instructions for the agent. If a human cannot follow your README to start the project, Claude will not be able to either.

This is also one of the highest-leverage single changes you can make. A clear README beats a sprawling CLAUDE.md.

## How to use them well

**Write rules in response to failure, not preemptively.** Every entry in CLAUDE.md should exist because Claude got something wrong and you are stopping it from happening again. Speculative rules add token cost and reduce success rates. The right time to add a rule is the second time you correct the same mistake.

**Skip /init or delete most of what it generates.** Auto-generated context is generic. The agent already knows what TypeScript looks like; it does not need a paragraph confirming your project uses it. Write the file by hand. Every line should earn its place.

**Do not restate what the code says.** Claude reads your code. A "Project Structure" section that lists your folders is redundant unless your structure violates conventions of your framework. Same for "Code Style" sections that duplicate what Prettier or ESLint already enforce.

**Treat config as code.** These files affect output the same way source code affects behavior. Review them in PRs. Update them when stack changes. Delete sections that no longer apply.

**Use scoped CLAUDE.md files for monorepos.** Instead of one giant root file with sections per package, drop a focused CLAUDE.md inside each package. Claude only loads the closest one, which keeps context relevant and small.

**Keep secrets out.** `.env` files, `.claude/settings.local.json`, and anything with tokens never gets committed. Add them to `.gitignore` before you write the first line.

## Common mistakes

**The bloated CLAUDE.md.** A thousand lines of "best practices," code snippets, and architecture diagrams. The agent ignores most of it. Worse, the noise reduces its ability to follow the rules that actually matter.

**Auto-generated files committed without review.** Run `/init`, push, done. The file ends up full of obvious facts and missing the real instructions. A mediocre context file is worse than no context file at all.

**Linter rules in CLAUDE.md.** Indentation, quote style, semicolons. Your linter handles this deterministically. Putting it in CLAUDE.md outsources a fast deterministic job to a slow probabilistic one and adds noise to every session.

**Stale references.** "The auth logic lives in `src/lib/auth.ts`" when it actually moved to `src/features/auth/` six months ago. Stale CLAUDE.md actively misleads. Update or delete.

**Treating CLAUDE.md as documentation.** It is not for humans. It is a system prompt for a specific agent. Architectural decisions belong in `docs/`. Onboarding goes in README.md. CLAUDE.md is rules and standing instructions.

**Forgetting CLAUDE.local.md exists.** Personal preferences end up in CLAUDE.md, polluting the team's setup. Or they end up nowhere and you re-set them every session. The .local file is the answer to both.

**Committing `.claude/settings.local.json` or `.env`.** Same problem as committing any secrets file. Gitignore them on day one.

## Examples

**A minimal good CLAUDE.md** for a TypeScript Next.js project:

```markdown
# Project

E-commerce app, Next.js 14 App Router, TypeScript, Drizzle ORM, Postgres.

## Commands

- `pnpm dev`        Start dev server
- `pnpm test`       Run Vitest
- `pnpm db:migrate` Apply migrations
- `pnpm lint:fix`   Run ESLint with autofix

## Conventions

- Functional components with named exports. No default exports.
- Server components by default. Add 'use client' only when client interactivity is required.
- Collocate tests next to source files.
- Use Drizzle queries, not raw SQL, unless the query genuinely needs it.

## Avoid

- Adding `any` types. If a type is unclear, ask.
- Modifying `migrations/` directly. Generate via `pnpm db:generate`.
```

**A locked-down `.claude/settings.json`:**

```json
{
  "permissions": {
    "allow": ["Read", "Write(src/**)", "Bash(git status:*)", "Bash(pnpm:*)"],
    "deny": ["Bash(rm -rf:*)", "Bash(curl:*|sh)", "Read(.env)"]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [{ "type": "command", "command": "scripts/secret-scan.sh" }]
      }
    ]
  }
}
```

**A multi-tool team setup:** AGENTS.md as the source of truth at project root with all the project context. CLAUDE.md is one line: `Read AGENTS.md for project context.` plus any Claude-specific instructions. Everyone's tool reads from the same well, no drift.

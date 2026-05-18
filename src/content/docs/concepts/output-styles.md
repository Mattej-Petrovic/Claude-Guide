---
title: Output styles
lede: Customize how Claude communicates without changing what it can do. Both the claude.ai and Claude Code versions.
section: concepts
---

Output styles let you change how Claude communicates without changing what it can do. The tools, the file access, the project memory, all stay. Only the personality and the way responses are shaped changes.

The feature exists in two forms.

In **claude.ai**, styles are quick presets (Normal, Concise, Formal, Explanatory) plus custom styles you build by uploading writing samples or providing instructions. Switch through the "Use style" menu in the chat input.

In **Claude Code**, output styles go further. They replace the entire main system prompt, including the parts that bias Claude toward software engineering. This is what people mean when they say "Claude Code can be Claude Anything." A research assistant. A content writer. A domain-specific agent. The file system access, the MCP integrations, and the tool capabilities stay; only the engineering bias is gone. Switch with the `/output-style` command.

## How it works

In claude.ai, picking a style applies preset instructions to your responses going forward. Concise strips elaborations. Formal polishes language. Explanatory teaches as it answers. You can also create custom styles by uploading a few writing samples; Claude infers the voice patterns and applies them to subsequent responses.

In Claude Code, output styles are stored markdown files. They live in:

- `~/.claude/output-styles/` for user-level styles available across every project
- `.claude/output-styles/` for project-level styles checked into git

Each file has YAML frontmatter (`name`, `description`) and a body that becomes the new system prompt. When you select the style, that prompt fully replaces Claude Code's default engineering-focused system prompt.

This is the part most people miss. Output styles are not "additions" the way CLAUDE.md is. They are *replacements*. The default system prompt that biases Claude toward writing tests, verifying with execution, and being terse about coding is gone. Whatever instructions you write are what Claude operates from.

Three styles ship built-in.

<svg viewBox="0 0 800 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three built-in Claude Code output styles: Default, Explanatory, Learning">
  <defs>
    <style>
      .card { fill: none; stroke: currentColor; stroke-width: 1; opacity: 0.4; }
      .card-accent { fill: none; stroke: #d97706; stroke-width: 1.5; opacity: 0.7; }
      .style-name { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 1.5px; opacity: 0.6; }
      .style-name-accent { fill: #d97706; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 1.5px; }
      .stat-label { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 12px; opacity: 0.45; letter-spacing: 1px; }
      .desc { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 14px; opacity: 0.7; }
    </style>
  </defs>
  <rect x="20" y="20" width="240" height="290" rx="6" class="card-accent"/>
  <text x="40" y="54" class="style-name-accent">DEFAULT</text>
  <text x="40" y="98" class="stat-label">CHARACTER</text>
  <text x="40" y="122" class="desc">Engineering-focused.</text>
  <text x="40" y="142" class="desc">Concise. Verifies</text>
  <text x="40" y="162" class="desc">work with tests.</text>
  <text x="40" y="204" class="stat-label">BEST FOR</text>
  <text x="40" y="228" class="desc">Most coding work.</text>
  <text x="40" y="248" class="desc">The starting</text>
  <text x="40" y="268" class="desc">point.</text>
  <rect x="280" y="20" width="240" height="290" rx="6" class="card"/>
  <text x="300" y="54" class="style-name">EXPLANATORY</text>
  <text x="300" y="98" class="stat-label">CHARACTER</text>
  <text x="300" y="122" class="desc">Engineering plus</text>
  <text x="300" y="142" class="desc">narrated reasoning</text>
  <text x="300" y="162" class="desc">and design choices.</text>
  <text x="300" y="204" class="stat-label">BEST FOR</text>
  <text x="300" y="228" class="desc">Onboarding to a</text>
  <text x="300" y="248" class="desc">new codebase or</text>
  <text x="300" y="268" class="desc">learning patterns.</text>
  <rect x="540" y="20" width="240" height="290" rx="6" class="card"/>
  <text x="560" y="54" class="style-name">LEARNING</text>
  <text x="560" y="98" class="stat-label">CHARACTER</text>
  <text x="560" y="122" class="desc">Explanatory plus</text>
  <text x="560" y="142" class="desc">TODO(human) markers</text>
  <text x="560" y="162" class="desc">for you to fill in.</text>
  <text x="560" y="204" class="stat-label">BEST FOR</text>
  <text x="560" y="228" class="desc">Pair-programming.</text>
  <text x="560" y="248" class="desc">Learn-by-doing</text>
  <text x="560" y="268" class="desc">on a project.</text>
</svg>

Create your own with `/output-style:new` and a description (Claude scaffolds the file for you), or write the markdown file directly.

## How to use them well

**Use claude.ai styles for tone, not capability.** Custom styles work best for matching a voice (your own writing samples are the killer feature) or for switching to a specific register like formal vs casual. They do not change what Claude can do, just how it talks.

**Use Claude Code output styles when you want a different agent, not a different voice.** If all you want is "be more concise," that goes in CLAUDE.md or `--append-system-prompt`. If you want Claude Code to be a research assistant that does not try to write tests for everything, that is an output style.

**Write the system prompt the way you would brief a contractor.** Clear role, clear priorities, explicit about what to do and what not to do. A vague "be helpful with research" produces vague responses. "You are a research assistant. For every claim, cite the source. Use markdown for output. Never invent facts. Ask before searching paid databases." produces useful ones.

**Project-level for team consistency, user-level for personal preference.** A custom style your whole team should use goes in `.claude/output-styles/` and gets committed. Your personal "drop the niceties, be direct" style lives in `~/.claude/output-styles/` and travels with you across projects.

**Switch styles with intent, not habit.** If you find yourself using the same custom style for everything, the default is wrong. Make that style the default. Constant switching is friction.

## Common mistakes

**Confusing output styles with CLAUDE.md.** They affect different things. CLAUDE.md adds project-specific instructions on top of Claude Code's engineering system prompt. Output styles replace the engineering system prompt entirely. If your style instructions contradict the engineering defaults, only an output style can actually override them.

**Building a custom style when an `--append-system-prompt` would do.** If you just want to add a line of instruction ("always include TypeScript types in examples"), append it to the system prompt. Do not replace the whole thing.

**Forgetting non-default styles strip engineering instructions.** The Explanatory and Learning built-ins keep coding focus. Custom styles built from scratch lose it by default. If you want a custom style that still verifies with tests and writes good code, set `keep-coding-instructions: true` in the frontmatter.

**Treating styles as personalities, not roles.** "Pirate Claude that talks in pirate-speak" is a fun demo for thirty seconds. A useful style defines a *role* (research assistant, technical writer, code reviewer) with output expectations. The role is the value; the voice is decoration.

**Using styles where a subagent fits better.** If the change in behavior is task-specific and short-lived, a subagent is the better tool. If it should apply for the whole session or longer, an output style is. Subagents handle delegated tasks; output styles change the main agent.

## Examples

**A direct, no-fluff style for claude.ai.** Custom instructions: "Be direct. Skip transitions, summaries, and acknowledgements. State the answer first, then reasoning if asked. No emojis. No 'great question' or 'happy to help.'"

**A research-assistant style for Claude Code.** Replaces the engineering prompt with: "You are a research assistant. For every claim, cite the source URL inline. Use markdown sections. Never invent facts. If a search returns weak sources, say so and stop instead of synthesizing. Save findings to `research-notes.md` as you go." Combined with web access tools, Claude Code becomes a research agent rather than a coding agent.

**A code reviewer style for the team.** Project-level output style at `.claude/output-styles/reviewer.md`. System prompt: "You are a senior reviewer. Read diffs. Comment on bugs, security risks, and architectural concerns. Do not suggest formatting fixes (the linter handles those). Format output as a markdown checklist with severity tags." Switch into it before reviews, switch out after.

---
title: Commands
lede: Slash commands — built-in and custom — and how to write your own.
section: extending
---

A slash command is a shortcut. You type `/something` and Claude Code expands it into a longer prompt or workflow. The built-in ones (`/clear`, `/compact`, `/init`, `/plan`) ship with Claude Code and handle session-level operations. The interesting ones are the custom commands you write yourself: a single markdown file becomes a reusable workflow you can invoke by name forever.

Custom commands are the lightest-weight extension primitive in Claude Code. Smaller than a skill (no sandbox, no scripts, no progressive disclosure). Much smaller than a plugin (no manifest, no bundling). Just a markdown file Claude executes when you call it.

## How they work

Drop a markdown file into `.claude/commands/` (project scope) or `~/.claude/commands/` (global scope). The filename becomes the command name. The contents become the prompt Claude runs when you invoke it.

The simplest possible command:

```markdown
<!-- .claude/commands/standup.md -->
Summarize what I did yesterday based on git log and open PRs. Format it as three bullets I can paste into Slack.
```

Type `/standup` and Claude runs that prompt against the current project context. Done.

That's the floor. The ceiling is much higher.

## What you can put in a command file

A real command file usually has three things:

**Frontmatter** for metadata Claude uses (description shown in `/`-completion, optional namespace, optional argument hints).

**The prompt body** in plain markdown, which is what Claude actually executes.

**Argument placeholders** using `$ARGUMENTS`, which inject whatever the user types after the command name into the prompt.

A more realistic example:

```markdown
---
description: Review a pull request end-to-end
---

# Review PR $ARGUMENTS

You are doing a code review for PR #$ARGUMENTS. Steps:

1. Fetch the PR diff and description from GitHub.
2. Read the changed files in their full context, not just the diff.
3. Identify: bugs, missed edge cases, style inconsistencies, missing tests, security risks.
4. Cross-check against the project's conventions in CLAUDE.md.
5. Output a review comment ordered by severity (blockers first, nits last).

Be direct. No hedging. If a change is fine, say it's fine and move on.
```

Invoked as `/review-pr 1234`. The `1234` substitutes into `$ARGUMENTS`. The whole prompt body becomes Claude's instructions for this turn.

## The structural pattern

The file structure that experienced users converge on:

```
.claude/
└── commands/
    ├── deploy.md           # /deploy
    ├── review.md           # /review
    ├── fix-issue.md        # /fix-issue
    ├── handoff.md          # /handoff
    └── git/
        ├── commit.md       # /git:commit
        └── rebase.md       # /git:rebase
```

Subdirectories become namespaces with `:` separators. `.claude/commands/git/commit.md` is invoked as `/git:commit`. Useful when you have many commands and want to group related ones, but optional. Most projects don't bother until they have a dozen commands.

## Why this matters

The friction custom commands eliminate is the most underrated kind: the friction of typing the same instructions repeatedly. The mental friction of remembering "did I include all the steps this time?" The team-onboarding friction of "we have a process, but it lives in Slack pinned messages."

Compare three ways to do a code review with Claude Code:

1. **Ad hoc.** Type a fresh prompt every time. Maybe forget steps. Quality varies with how much energy you have right now.
2. **Skill.** Write a SKILL.md that fires on review-shaped requests. Good for long-running, judgment-heavy workflows. Overkill for "I want this exact prompt right now."
3. **Custom command.** Write `/review` once. Type two characters whenever you want it. Same prompt every time. Composes with arguments.

For workflows that are well-defined, repeatable, and short enough to fit in a prompt, custom commands are the right tool. For workflows that need to load reference docs, run scripts, or compose multiple steps with branching logic, reach for skills. The two coexist; pick by shape.

## How to write good ones

**Start by typing the prompt manually.** When you find yourself typing the same paragraph of instructions twice in a row, that's the signal to make it a command. Build commands around your real friction, not around what sounds useful.

**Be specific in the body.** Vague commands produce vague output. The difference between `/review` running "review this PR" and `/review` running the full step-by-step you saw above is the difference between the command being useful and being noise.

**Use arguments for the parts that vary.** PR numbers, issue IDs, file paths, branch names. Hard-code the steps; parameterize the targets.

**Include the failure cases.** "If the PR has more than 500 lines changed, stop and ask the user to break it up." "If you can't find tests for the changed code, flag it before reviewing logic." Commands that describe what to do when something is off produce more reliable output than commands that only describe the happy path.

**Keep the body the size it needs to be.** A four-line command is fine if four lines does the job. A forty-line command is fine if the workflow is genuinely that involved. Don't pad. Don't over-compress.

**Document arguments in frontmatter.** A command with cryptic arguments is useless to anyone but the author six months later. The `description` field shows up in `/`-completion and is your one chance to remind future-you what this command does.

**Project commands for project workflows, global commands for personal workflows.** A `/deploy` that's specific to one project lives in that project's `.claude/commands/`. A `/standup` you use across all your work lives in `~/.claude/commands/`. Don't mix them; the scoping exists for a reason.

## Common mistakes

**Treating commands as a documentation format.** A command file is executed, not read. Writing it like documentation ("first, you might want to consider...") produces hedge-filled output. Writing it like instructions ("do X. then do Y. if Z, stop and ask.") produces decisive output.

**Forgetting commands compose with everything else.** A custom command can use skills, call MCP servers, invoke subagents. Treating commands as isolated prompts misses that they're often the cleanest way to *trigger* an entire workflow that touches all the other primitives. `/deploy` might fire a skill, which uses an MCP server, which calls a hook on completion. The command is the front door.

**Building commands for one-shot use.** If you'll only run this prompt once, just type it. Commands earn their keep through reuse. The setup cost is small but real (writing the file, naming it, namespacing it); pay it for things you'll use weekly, not once.

**Hiding business logic in command files.** A command saying "deploy with the standard process" that doesn't define what the standard process is, just exports the responsibility to whoever (or whatever) reads the command later. Either describe the process in the command, or have the command call a skill or script that does. Don't leave the actual logic implicit.

**Forgetting custom commands can shadow built-ins.** If you write `.claude/commands/clear.md`, you've overridden the built-in `/clear` for that project. Sometimes intentional, often surprising. Pick names that don't collide unless you mean to.

## A concrete example: the `/handoff` command

A workflow worth packaging as a command, because it's repeatable, well-defined, and benefits from being invoked the same way every time:

```markdown
---
description: Write a session handoff document for picking up later
---

# Session Handoff

Generate a handoff document for the current Claude Code session so I can resume cleanly later or another teammate can take over.

Include:

1. **What I was working on.** One sentence summary of the goal.
2. **What got done.** Bullet list of completed work.
3. **Where I am right now.** The file, function, or step I stopped at.
4. **What's next.** The single next action to take when resuming.
5. **Open questions.** Anything I was uncertain about.
6. **Context to preserve.** Relevant decisions, constraints, or paths that won't be obvious from the code alone.

Save the document to `docs/handoffs/$ARGUMENTS.md`. If `$ARGUMENTS` is empty, use today's date in YYYY-MM-DD format as the filename.

After saving, print the file path and a one-line summary to the conversation.
```

Invoked as `/handoff feature-x` or just `/handoff`. Output is consistent across sessions, across machines, across teammates. Onboarding someone to your handoff format is "use the command." That's the real value.

## Built-in commands

Anthropic ships dozens of built-in commands. The ones most worth knowing day-to-day:

- `/init` — generates a CLAUDE.md from your codebase, run once per project
- `/clear` — resets the conversation history, useful between unrelated tasks
- `/compact` — summarizes the conversation so far to free up context, the move when you're deep in a session and approaching the context limit
- `/context` — shows what's currently consuming context, helps diagnose why things are slowing down
- `/plan` — toggles plan mode (read-only research before building)
- `/model` — switches model mid-session
- `/find-skills` — browses installed skills
- `/plugin` — manages plugins, including the marketplace

The full reference (every built-in command, every flag, every CLI invocation) lives in the library section of this guide. The point of mentioning them here is the contrast: built-ins handle session mechanics, custom commands handle your work.

<svg viewBox="0 0 760 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram showing the anatomy of a custom slash command file and how it expands when invoked" style="height:auto;color:currentColor;font-family:ui-sans-serif,system-ui,sans-serif">
  <style>
    .panel { fill: none; stroke: currentColor; stroke-opacity: 0.25; stroke-width: 1; }
    .panel-accent { fill: none; stroke: #d97706; stroke-width: 1.5; }
    .label { fill: currentColor; font-size: 13px; font-weight: 600; }
    .sub { fill: currentColor; fill-opacity: 0.7; font-size: 12px; }
    .accent { fill: #d97706; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; }
    .file { fill: currentColor; fill-opacity: 0.85; font-size: 12px; font-family: ui-monospace, monospace; }
    .dim { fill: currentColor; fill-opacity: 0.5; font-size: 11px; font-family: ui-monospace, monospace; }
    .arrow-accent { stroke: #d97706; stroke-width: 1.5; fill: none; }
    .step-num { fill: #d97706; font-size: 11px; font-weight: 700; }
    .highlight { fill: #d97706; fill-opacity: 0.15; }
  </style>
  <!-- Left: command file -->
  <text class="accent" x="40" y="36">COMMAND FILE</text>
  <rect class="panel-accent" x="40" y="52" width="320" height="380" rx="6"/>
  <text class="label" x="56" y="78">.claude/commands/review-pr.md</text>
  <rect x="56" y="96" width="288" height="68" rx="3" class="highlight"/>
  <text class="dim" x="64" y="116">---</text>
  <text class="file" x="64" y="134">description: Review a PR end-to-end</text>
  <text class="dim" x="64" y="152">---</text>
  <text class="file" x="64" y="186"># Review PR $ARGUMENTS</text>
  <text class="file" x="64" y="216">You are doing a code review for</text>
  <text class="file" x="64" y="232">PR #$ARGUMENTS. Steps:</text>
  <text class="file" x="64" y="262">1. Fetch the PR diff + description.</text>
  <text class="file" x="64" y="278">2. Read changed files in context.</text>
  <text class="file" x="64" y="294">3. Identify bugs, edge cases,</text>
  <text class="file" x="64" y="310">   missed tests, security risks.</text>
  <text class="file" x="64" y="326">4. Cross-check vs CLAUDE.md.</text>
  <text class="file" x="64" y="342">5. Output review ordered by</text>
  <text class="file" x="64" y="358">   severity. Be direct.</text>
  <text class="sub" x="56" y="402">Filename → command name</text>
  <text class="sub" x="56" y="418">$ARGUMENTS → user input</text>
  <!-- Arrow -->
  <path class="arrow-accent" d="M 360 240 L 438 240" marker-end="url(#arrAccent)"/>
  <text x="400" y="228" text-anchor="middle" font-family="ui-monospace,monospace" font-size="9" font-weight="700" fill="#d97706">/review-pr 1234</text>
  <!-- Right: expansion -->
  <text class="accent" x="440" y="36">WHAT CLAUDE EXECUTES</text>
  <rect class="panel" x="440" y="52" width="320" height="380" rx="6"/>
  <text class="label" x="456" y="78">Expanded prompt</text>
  <text class="file" x="456" y="106"># Review PR 1234</text>
  <text class="file" x="456" y="136">You are doing a code review for</text>
  <text class="file" x="456" y="152">PR #1234. Steps:</text>
  <text class="file" x="456" y="182">1. Fetch the PR diff + description.</text>
  <text class="file" x="456" y="198">2. Read changed files in context.</text>
  <text class="file" x="456" y="214">3. Identify bugs, edge cases,</text>
  <text class="file" x="456" y="230">   missed tests, security risks.</text>
  <text class="file" x="456" y="246">4. Cross-check vs CLAUDE.md.</text>
  <text class="file" x="456" y="262">5. Output review ordered by</text>
  <text class="file" x="456" y="278">   severity. Be direct.</text>
  <rect x="456" y="306" width="288" height="100" rx="4" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.2"/>
  <text class="sub" x="468" y="328">Same prompt, every time.</text>
  <text class="sub" x="468" y="346">Two characters to invoke.</text>
  <text class="sub" x="468" y="364">Composes with skills,</text>
  <text class="sub" x="468" y="382">MCP servers, subagents,</text>
  <text class="sub" x="468" y="398">hooks running underneath.</text>
  <defs>
    <marker id="arrAccent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97706"/>
    </marker>
  </defs>
</svg>

<a href="/library/commands" class="crosslink">
  <svg class="crosslink__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" stroke-linecap="round" stroke-linejoin="round" /></svg>
  <div class="crosslink__body">
    <p class="crosslink__label">See also</p>
    <p class="crosslink__title">Library: Commands</p>
    <p class="crosslink__desc">The full reference list of built-in slash commands.</p>
  </div>
  <svg class="crosslink__arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" width="16" height="16"><path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" /></svg>
</a>

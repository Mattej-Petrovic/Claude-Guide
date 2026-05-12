---
title: Claude Code workflows
lede: Practical workflow patterns for getting real work done with Claude Code. The core loop, the patterns that earn their keep, common mistakes, and recipes for common scenarios.
section: workflows
---

Claude Code is most useful when you treat it as a system, not a chat box. The system has a shape: a loop with five stages, each with its own mode and its own tools. The patterns below are variations on that loop.

This page is about *how to drive it*. For what Claude Code is, see [/products/claude-code](/products/claude-code). For project file setup, see [/concepts/project-files](/concepts/project-files). For specific commands, see [/library/commands](/library/commands).

## The core loop

<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The core Claude Code loop: plan, frame, execute, verify, ship, with a feedback arrow from verify back to plan when verification fails.">
  <text x="350" y="22" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="600" letter-spacing="1.2">THE CORE LOOP</text>
  <rect x="20" y="65" width="120" height="75" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="80" y="92" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="14" font-weight="700" letter-spacing="0.5">PLAN</text>
  <text x="80" y="114" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">Plan mode</text>
  <text x="80" y="129" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">read-only</text>
  <line x1="143" y1="102" x2="161" y2="102" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="166,102 158,98 158,106" fill="currentColor"/>
  <rect x="170" y="65" width="120" height="75" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="230" y="92" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="14" font-weight="700" letter-spacing="0.5">FRAME</text>
  <text x="230" y="114" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">CLAUDE.md</text>
  <text x="230" y="129" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">.claude/</text>
  <line x1="293" y1="102" x2="311" y2="102" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="316,102 308,98 308,106" fill="currentColor"/>
  <rect x="320" y="65" width="120" height="75" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="380" y="92" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="14" font-weight="700" letter-spacing="0.5">EXECUTE</text>
  <text x="380" y="114" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">auto-accept</text>
  <text x="380" y="129" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">files change</text>
  <line x1="443" y1="102" x2="461" y2="102" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="466,102 458,98 458,106" fill="currentColor"/>
  <rect x="470" y="65" width="120" height="75" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="530" y="92" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="14" font-weight="700" letter-spacing="0.5">VERIFY</text>
  <text x="530" y="114" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">tests, types,</text>
  <text x="530" y="129" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">browser, logs</text>
  <line x1="593" y1="102" x2="611" y2="102" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="616,102 608,98 608,106" fill="currentColor"/>
  <rect x="620" y="65" width="68" height="75" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="654" y="92" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="14" font-weight="700" letter-spacing="0.5">SHIP</text>
  <text x="654" y="114" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">commit,</text>
  <text x="654" y="129" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">PR, deploy</text>
  <path d="M 530 145 L 530 195 L 80 195 L 80 148" stroke="#d97706" stroke-width="1.5" fill="none" stroke-dasharray="5,4" stroke-linejoin="round"/>
  <polygon points="80,140 75,150 85,150" fill="#d97706"/>
  <text x="305" y="220" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-style="italic">when verification fails, loop back. don't start over.</text>
  <text x="350" y="255" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.55">each stage has its own mode and its own tools. skipping stages is where most pain comes from.</text>
</svg>

Plan, frame, execute, verify, ship. Most workflows that work are variants of this. Most workflows that don't are skipping a stage.

**Plan** is read-only. Plan mode (Shift+Tab to cycle, or `/plan`) makes Claude read files, ask questions, and propose a written plan before any file gets touched. Skipping it is fine for one-line edits. For anything spanning multiple files, schemas, or production code, plan first, build second. Boris Cherny, who built Claude Code, runs most of his sessions this way: plan mode, iterate the plan, switch to auto-accept, execute.

**Frame** is the standing context Claude reads at the start of every session: `CLAUDE.md`, the rules in `.claude/rules/`, your skills, the structure of the repo. This isn't workflow, it's preconditions. Without a frame, Claude rebuilds context every session and you pay tokens for it. With a frame, planning gets sharper because Claude already knows what the project is.

**Execute** is where files change. Mode is the dial: safe-default (asks before each tool use), auto-accept (greenlights everything within scope), bypass (full autonomy). The pattern most experienced users land on: plan in plan mode, then auto-accept while Claude executes the approved plan, then back to safe-default if you go off script.

**Verify** is the highest-leverage stage. Tests run, types check, the browser renders, the deploy logs arrive. If Claude can see the result of its own work, it self-corrects. If it can't, it guesses. Anthropic's own engineering teams describe verification automation as the way to let Claude work longer autonomously and catch its own mistakes before you have to. Verification isn't a phase you tack on. It's the thing that makes the rest of the loop work.

**Ship** is commit, PR, deploy. Claude can do all of it. Whether you let it depends on how much you trust the verify stage.

When verify fails, you loop. You don't start over. The plan you approved still describes the work, the executed code still has the parts that worked, and only the failing piece needs another pass. Most of the wasted time in Claude Code sessions comes from people throwing out a session that was 80% there because something at the end broke.

## The four patterns that earn their keep

**Plan first, execute after.** Cycling Shift+Tab to plan mode at the start of any non-trivial task is the cheapest insurance there is. The cost is thirty seconds of reading a plan. The benefit is catching "why is it touching that file?" before the file gets touched. Practitioners running this pattern report meaningful drops in token cost on complex tasks, not from any clever trick but from avoiding wasted execution attempts.

**Verification loops.** Tell Claude to run the tests until they pass, not just to write them. Wire up a Stop hook that blocks completion until lints pass. Use the Chrome extension or a browser MCP so Claude can see what it actually rendered. The pattern is always the same: define success criteria, give Claude the tools to check against them, let it iterate. Without verification, you review every diff yourself. With verification, you review the ones that converged.

**Multi-surface orchestration.** Use claude.ai (or the Claude desktop chat) as the prompt architect: describe the task loosely, iterate on the spec, sharpen the prompt until it's specific enough to execute on cleanly. Then paste the sharpened prompt into Claude Code, where the filesystem, shell, and verification tools live. Different surfaces, one workflow. The chat is for thinking. Code is for doing. Mixing them up is where people get stuck explaining context they could have written into the prompt.

**Parallelism when the work is parallel.** Two patterns work. Worktrees give each Claude session its own working directory checked out to its own branch, so two sessions can edit the codebase without colliding. Use them when you have genuinely independent tasks: feature on one branch, bugfix on another. Subagents (parallel Claude instances run from your main session) work for orthogonal review passes: one for bugs, one for security, one for style, one for performance. Each gets its own clean context, each writes its own report, you read the four reports and decide. Don't parallelise sequential work. You'll just ship the wrong thing four times faster.

## How to use it well

**Modes are dials, not settings.** Plan, safe-default, auto-accept, bypass. You turn the dial through a task's lifecycle, not at the start of a session. Plan to design the change. Auto-accept to let Claude execute the plan. Bypass when you trust the verify stage to catch problems. Safe-default when you go off the approved path. Cycle Shift+Tab without thinking about it.

**Sessions are disposable. Context isn't.** Fork a session (`/branch` from inside, or `claude --resume id --fork-session` from the CLI) to explore an idea without losing your spot. `/clear` or open a new session when a thread is done. Long sessions don't just cost tokens, they pollute reasoning: Claude keeps trying to reconcile the new task with whatever the conversation built up before it. Start fresh more often than you think you should.

**Repetition belongs in `/loop` or `/schedule`.** If you'd run the same prompt manually more than three times, automate it. `/loop 5m check if the deployment finished` puts a cron-style watcher inside your session. `/schedule` creates persistent recurring tasks. Things worth automating tend to grow over time: PR review, dependency scans, test reruns, doc sync, log watching.

**`/btw` for side questions.** Ask without polluting the main thread. The side question doesn't go into the conversation history, so it doesn't drag down later turns. Use it for "wait, what does this function do?" while the main task continues.

**Capture corrections in `CLAUDE.md`, not just in the moment.** When Claude misunderstands something and you correct it, write the correction into `CLAUDE.md` so the next session, and the next agent, doesn't make the same mistake. In the default loop these corrections get buried in code that already shipped. In plan mode they're visible, and that's when they're cheapest to capture.

## Common mistakes

**Treating Claude Code like autocomplete.** The "prompt, output, repeat" pattern works until it doesn't. Real work needs framing (`CLAUDE.md`), planning (plan mode), and verification (tests). Skipping those and then complaining when results are inconsistent is the most common failure mode by a wide margin.

**Skipping plan mode for "small" tasks that grow.** A task that started as "rename this variable" and ended as "rewrite the auth flow" should have started in plan mode. If you find yourself surprised by what Claude is touching, you skipped a stage.

**No way to verify.** No tests, no types, no browser feedback, no logs. Claude Code can't see the result of its own work, so every diff needs human review. This is the version that feels like fancy autocomplete, because that's exactly what it is when you don't give it eyes.

**Mega-sessions.** Running for hours in one session, ignoring `/compact` and `/clear`, hoping the context will hold. It won't. Token cost compounds and reasoning quality drops. Start fresh.

**Cargo-culting the inventory.** Posts about "48 skills, 7 MCP servers, 11 hooks" miss the point. The number isn't the leverage. The leverage is having the right skill for a real workflow you actually run. Two skills that match your actual work beat forty that don't.

## Recipes

**Starting a new project.** Use claude.ai chat as the architect: describe what you want, what's in scope, what's not, what success looks like. Iterate the spec until it reads like something a contractor could execute on. Move to Claude Code, run `/init` to generate a starter `CLAUDE.md`, then edit it down to what's actually true about the project. Open in plan mode, paste your spec, let Claude propose a plan. Approve, switch to auto-accept, execute. First commit should be the project skeleton with tests, not the feature.

**Debugging something nasty.** Plan mode first. Paste the full error, full stack trace, and full reproduction steps. Tell Claude to identify the cause before proposing a fix, and not to propose a fix until it can explain why the bug happens. If it loops on the same wrong answer, stop and ask it to step back: "don't try another fix yet, explain what the wrong answer assumes that the right answer wouldn't." That breaks the loop more often than another guess will.

**Refactor at scale.** Use `/batch` (or worktrees with subagents) for genuinely parallel changes across many files. For sequential refactors that touch a hot path, plan mode is non-negotiable: get the file list, the operation order, the rollback plan, and the verification before any file is touched. The compounding-error problem is real here. A 95% accurate decision across 20 decision points is roughly 0.36 odds of total correctness. Plan mode collapses those decisions into a single review.

**Pre-deploy or security pass.** Run a parallel review with subagents, one for each lens: security, performance, breaking changes, missing tests. Each subagent gets its own context and reports back. Review the reports together. The point isn't that subagents catch what one Claude misses (they often do, but not always). The point is that a focused agent on one dimension does that dimension thoroughly, while one overloaded agent does all four shallowly.

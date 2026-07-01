---
title: Loops
lede: The Reason, Act, Observe, Repeat cycle. Why verification is the part that matters, when a loop earns its cost, and how to build one that converges instead of wandering.
section: concepts
---

There is a cycle you already run by hand every time you work with Claude. You ask for something, you look at what came back, you point out what is wrong, Claude fixes it, you look again. Give feedback, fix, check, repeat. You are the loop. You are the part that decides whether the last attempt was good enough and what to say next.

A loop, in the sense this page means it, is what you get when you hand that cycle to the system. Instead of you judging each attempt and prompting the next one, the agent produces something, checks it against a condition you defined once, and decides for itself whether to stop or go again. The prompting does not disappear. It moves inside. This is what people mean when they say manual prompting is becoming the slow path: not that prompts stopped mattering, but that the most valuable thing you can prompt is a system that re-prompts itself until the work is actually done.

That reframe is the whole subject. Everything below is about when handing the cycle over is worth it, and how to design one that improves with each pass instead of wandering in circles.

## Why "just prompt it" stops scaling

The manual cycle works, which is why most people never leave it. You prompt, you read, you correct, you prompt again, and for a single well-scoped task that is genuinely the right tool. The trouble is that you are the bottleneck in it. Every pass waits on you to notice what is wrong and say the next thing. Ten passes is ten round-trips of your attention. The cost is not the prompting; it is that the loop runs at the speed of a human watching it.

The shift the better practitioners have made is to stop being the thing in the middle. Instead of *running* the cycle, you *specify* it once — what done means, how to check it — and let the system run the passes. This is the sense in which "prompting is outdated" is true and the sense in which it is overstated. It is overstated because the spec you write is itself a prompt, and a more demanding one: you now have to articulate the success condition precisely enough that a machine can grade it, which is harder than eyeballing a result and saying "no, more like this." It is true because once you have written that spec, your involvement drops from once-per-pass to once-per-loop. You stop typing "fix the failing test" twelve times and write "keep going until every test passes" once.

So the skill does not disappear; it moves up a level. The valuable thing is no longer the perfectly-worded request. It is the precisely-defined finish line. Everything else on this page is mechanics in service of that one move — getting "done" specified sharply enough that you can walk away from the cycle and trust it to converge.

## What a loop actually is

A loop is four moves repeated until a stop condition holds: **reason, act, observe, repeat.**

<svg viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The loop cycle. Reason leads to Act, Act leads to Observe, Observe checks against a stop condition. If the condition is met the loop stops with done. If not, it loops back to Reason with the observation as feedback for the next pass.">
  <defs>
    <style>
      .lp-main { fill: none; stroke: #d97706; stroke-width: 1.5; opacity: 0.75; }
      .lp-box { fill: none; stroke: currentColor; stroke-width: 1; opacity: 0.4; }
      .lp-lg { fill: #d97706; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 1px; }
      .lp-sm { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 11px; opacity: 0.55; }
      .lp-muted { fill: currentColor; opacity: 0.55; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 12px; font-style: italic; }
      .lp-arrow { stroke: #d97706; stroke-width: 1.5; fill: none; opacity: 0.7; }
    </style>
    <marker id="lp-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97706" opacity="0.7"/>
    </marker>
  </defs>
  <text x="380" y="32" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="600" letter-spacing="1.2" opacity="0.85">THE LOOP</text>
  <!-- REASON -->
  <rect x="40" y="150" width="140" height="80" rx="4" class="lp-main"/>
  <text x="110" y="135" text-anchor="middle" class="lp-lg">REASON</text>
  <text x="110" y="185" text-anchor="middle" class="lp-sm">plan the next step</text>
  <text x="110" y="202" text-anchor="middle" class="lp-sm">from what you know</text>
  <!-- ACT -->
  <rect x="250" y="150" width="140" height="80" rx="4" class="lp-main"/>
  <text x="320" y="135" text-anchor="middle" class="lp-lg">ACT</text>
  <text x="320" y="185" text-anchor="middle" class="lp-sm">produce or change</text>
  <text x="320" y="202" text-anchor="middle" class="lp-sm">something</text>
  <!-- OBSERVE -->
  <rect x="460" y="150" width="140" height="80" rx="4" class="lp-main"/>
  <text x="530" y="135" text-anchor="middle" class="lp-lg">OBSERVE</text>
  <text x="530" y="185" text-anchor="middle" class="lp-sm">measure the result</text>
  <text x="530" y="202" text-anchor="middle" class="lp-sm">against the condition</text>
  <!-- arrows reason -> act -> observe -->
  <line x1="180" y1="190" x2="244" y2="190" class="lp-arrow" marker-end="url(#lp-ah)"/>
  <line x1="390" y1="190" x2="454" y2="190" class="lp-arrow" marker-end="url(#lp-ah)"/>
  <!-- decision diamond -->
  <path d="M 660 150 L 700 190 L 660 230 L 620 190 Z" class="lp-box"/>
  <text x="660" y="186" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.75">stop</text>
  <text x="660" y="200" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.75">condition?</text>
  <line x1="600" y1="190" x2="616" y2="190" class="lp-arrow" marker-end="url(#lp-ah)"/>
  <!-- done -->
  <text x="660" y="280" text-anchor="middle" class="lp-lg">DONE</text>
  <line x1="660" y1="232" x2="660" y2="262" class="lp-arrow" marker-end="url(#lp-ah)"/>
  <text x="700" y="252" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.55">met</text>
  <!-- repeat: back to reason -->
  <path d="M 660 148 L 660 70 L 110 70 L 110 146" class="lp-arrow" stroke-dasharray="5 4" marker-end="url(#lp-ah)"/>
  <text x="385" y="60" text-anchor="middle" class="lp-muted">not met — loop back, carrying the observation as feedback for the next pass</text>
  <text x="385" y="330" text-anchor="middle" class="lp-muted">the human defines two things once: what "done" means, and how the agent checks it. the loop does the rest.</text>
</svg>

Two of these moves are easy and one is the whole game. Reasoning and acting are what Claude already does on every turn. The move that turns a sequence of turns into a *loop* is **observe** — the agent measuring its own output against a fixed target and feeding that measurement back into the next pass. Remove it and you do not have a loop, you have an agent producing variations at random and hoping.

So the work of building a loop is almost entirely the work of defining the two things the human still owns:

- **An objective stop condition.** Not "until it looks good" or "until you are satisfied" — those are judgments the agent cannot reliably grade and will declare met the moment it tires of trying. A usable condition is something the run can prove from the outside: tests pass, the linter exits clean, the rendered page matches a reference, a score crosses a threshold you set. "Score at least 9 out of 10 against this rubric" is a loop. "Make it nice" is a wish.
- **A verification method.** How the agent gets the observation. Running the test suite, opening the result in a browser and reading it back, screenshotting output and comparing it to a target, scoring against a written rubric. The verification is the sensor. Its quality is the ceiling on the loop's quality.

Get those two right and the loop runs itself. Get them vague and no amount of iteration count saves you.

## Verification is the engine

If you take one thing from this page, take this: a loop is only as good as its ability to measure progress. The iteration is not the valuable part — iteration is cheap and a model will happily do it forever. The valuable part is the agent being able to tell, on each pass, whether it is closer or further from done. That signal is what converts repetition into improvement.

This is why the strongest loops are built around things that are mechanically checkable. Code is the cleanest case: tests either pass or they do not, types check or they do not, the build compiles or it errors, and every one of those is a signal Claude can produce and read without you in the room. Tell Claude to run the tests *until they pass* rather than to write them once, and you have turned "write some code" into a loop with a real sensor. The [Claude Code workflows](/workflows/claude-code) page calls verification the highest-leverage stage for exactly this reason — it is the thing that lets the rest of the loop work.

Tasks where the target is harder to measure make weaker loops, and it is worth being honest about why. A loop that scores thumbnail designs against a rubric still improves the output, but the scoring is subjective, so the loop can plateau or talk itself into a mediocre answer. A loop that recreates a webpage from a reference image, screenshots each attempt, and compares the two will get closer with each pass but is bounded by how good the comparison is — and on a genuinely hard target, "closer each pass" can still end somewhere disappointing. None of this means the loop is useless. It means the verification is the bottleneck, and if the output is not improving, the verification is almost always where to look first, before iteration count or model choice.

A practical consequence: when you can only verify with judgment rather than a clean pass/fail, write the rubric down, make it specific, and make it something the agent can apply consistently. A vague rubric verified by the same agent that produced the work is the loop equivalent of grading your own exam — which is the problem the next section is about.

## When a loop earns its cost

Loops are not free and they are not always the right tool. Each pass is a full turn of model work; a loop that runs twenty passes costs roughly twenty times a single attempt, and a loop with a bad stop condition can run far longer than that while converging on nothing. The honest framing is the one the loop-hype usually skips: most tasks do not need one.

Reach for a loop when **iteration genuinely improves the output and you can measure the improvement.** That is the whole test. Writing code against a test suite, getting a layout to match a reference, tuning something against a score — these get better with passes, and the betterness is checkable, so a loop compounds. A single well-formed answer to a question, a one-shot edit, a task where the first attempt is either right or wrong with nothing to iterate toward — these gain nothing from a loop and just pay for the extra passes.

The anti-pattern worth naming directly, because it is everywhere right now, is the belief that more agents and longer runs are inherently better. A swarm of agents running for twelve hours is not a sign of a sophisticated system; very often it is a sign of a loop with no real stop condition burning tokens through the night. The impressive demos are real, but the ones that hold up are usually a single agent iterating on its own output against a tight verification, not a fleet. Build the smallest loop that has a real sensor. Add agents only when the work actually splits.

Three quick checks before you build one:

- **Is "done" something the run can prove without me?** If not, you do not have a stop condition yet — you have a request for a human to keep reviewing.
- **Does each pass have something to push against?** If the first attempt cannot be measured and improved, iteration adds cost, not quality.
- **Would a single attempt, or a couple of [subagents](/concepts/subagents) running once, get me there?** If yes, that is simpler, cheaper, and the result is already in your context.

## The multi-agent shape

Single-agent loops cover most of what you will build. But there is a second shape, and it is the one the more advanced loop-engineering material is usually pointing at: separating the agent that *does* the work from the agent that *checks* it.

The reason is a real failure mode. An agent verifying its own output is grading its own exam. It produced the work because it judged the work correct; asking the same context to now find what is wrong with it pulls against the grain. Splitting the roles fixes this. An **orchestrator** holds the goal and the stop condition. It spins up an **executor** to produce an attempt. It hands that attempt to a **validator** — a fresh agent, its own context, prompted specifically to find what is wrong — and only the validator's verdict decides whether the loop stops or runs again, with the validator's feedback carried into the next attempt.

<svg viewBox="0 0 780 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The multi-agent loop shape. An orchestrator holds the goal and stop condition. It dispatches an executor to produce an attempt, then passes the attempt to a separate validator agent with its own fresh context, prompted to find faults. The validator returns a verdict and feedback. If the verdict passes, the orchestrator stops with done. If not, it dispatches a new executor attempt carrying the validator's feedback.">
  <defs>
    <style>
      .ml-main { fill: none; stroke: #d97706; stroke-width: 1.5; opacity: 0.75; }
      .ml-box { fill: none; stroke: currentColor; stroke-width: 1; opacity: 0.4; }
      .ml-lg { fill: #d97706; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 1px; }
      .ml-sm { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 11px; opacity: 0.55; }
      .ml-muted { fill: currentColor; opacity: 0.55; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 12px; font-style: italic; }
      .ml-arrow { stroke: #d97706; stroke-width: 1.5; fill: none; opacity: 0.7; }
      .ml-arrow-d { stroke: currentColor; stroke-width: 1; fill: none; opacity: 0.4; }
    </style>
    <marker id="ml-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97706" opacity="0.7"/>
    </marker>
  </defs>
  <!-- orchestrator -->
  <rect x="300" y="40" width="180" height="70" rx="5" class="ml-main"/>
  <text x="390" y="68" text-anchor="middle" class="ml-lg">ORCHESTRATOR</text>
  <text x="390" y="88" text-anchor="middle" class="ml-sm">holds goal + stop condition</text>
  <text x="390" y="102" text-anchor="middle" class="ml-sm">decides stop or go again</text>
  <!-- executor -->
  <rect x="90" y="210" width="180" height="80" rx="5" class="ml-box"/>
  <text x="135" y="195" text-anchor="middle" class="ml-lg">EXECUTOR</text>
  <text x="180" y="245" text-anchor="middle" class="ml-sm">own context · own tools</text>
  <text x="180" y="262" text-anchor="middle" class="ml-sm">produces an attempt</text>
  <!-- validator -->
  <rect x="510" y="210" width="180" height="80" rx="5" class="ml-box"/>
  <text x="645" y="195" text-anchor="middle" class="ml-lg">VALIDATOR</text>
  <text x="600" y="245" text-anchor="middle" class="ml-sm">fresh context</text>
  <text x="600" y="262" text-anchor="middle" class="ml-sm">prompted to find faults</text>
  <!-- orchestrator -> executor (dispatch): leaves orchestrator bottom-left, enters executor top-right corner -->
  <path d="M 315 110 L 250 206" class="ml-arrow" marker-end="url(#ml-ah)"/>
  <text x="232" y="150" text-anchor="middle" class="ml-sm">dispatch attempt</text>
  <!-- executor -> validator (hand off work) -->
  <path d="M 270 255 L 506 255" class="ml-arrow" marker-end="url(#ml-ah)"/>
  <text x="388" y="245" text-anchor="middle" class="ml-sm">hand off the work</text>
  <!-- validator -> orchestrator (verdict): leaves validator top-left corner, enters orchestrator bottom-right -->
  <path d="M 530 206 L 465 114" class="ml-arrow" marker-end="url(#ml-ah)"/>
  <text x="540" y="150" text-anchor="middle" class="ml-sm">verdict + feedback</text>
  <!-- done: orchestrator exits upward, out of the triangle, when the verdict passes -->
  <path d="M 390 40 L 390 20 L 640 20 L 640 50" class="ml-arrow-d" marker-end="url(#ml-ah)" stroke-dasharray="4 4"/>
  <text x="660" y="54" class="ml-lg">DONE</text>
  <text x="515" y="14" text-anchor="middle" class="ml-sm">verdict passes — loop stops</text>
  <text x="390" y="345" text-anchor="middle" class="ml-muted">the agent that checks the work is never the agent that produced it</text>
</svg>

You do not always need three distinct agents — a single-agent loop with a genuinely external sensor (a test suite, a compiler) gets most of the benefit, because the test does not care who wrote the code. The split earns its keep when verification itself requires judgment rather than a clean pass/fail: reviewing prose, assessing a design, deciding whether an answer is actually correct rather than merely plausible. There, a separate validator with a fresh context catches what the producer is structurally blind to. The [dynamic workflows](/concepts/dynamic-workflows) runtime is built around exactly this idea at scale — its review patterns have independent agents try to *refute* each finding before it is reported, which is the orchestrator-executor-validator shape running many times over in code rather than in conversation.

This is also where loops meet the rest of the orchestration shelf. The executor and validator are [subagents](/concepts/subagents). A loop that needs to run unattended is a [dynamic workflow](/concepts/dynamic-workflows) away from being a script you can read and rerun. The loop is the control pattern; subagents and workflows are how you give it more hands.

## Designing a loop, step by step

Before any tool or command, a loop is a design. The mechanics are easy once the design is right, and almost every loop that fails was a design that skipped one of these. Work through them in order; each one constrains the next.

**1. State the goal as something provable.** Not "improve the test coverage" but "every file in `src/auth/` has a test file and `npm test` exits 0." The test of a good goal is simple: could a script or a fresh observer confirm it without asking you? If the answer is no, you do not have a goal yet — you have a direction, and a loop pointed at a direction never stops.

**2. Choose the sensor.** This is the verification method, and it follows from the goal. A goal phrased as "tests pass" has an obvious sensor: run the tests, read the exit code. A goal phrased as "the landing page matches this reference" needs a sensor you have to build: screenshot the page, compare to the reference, score the difference. If you cannot name the sensor, go back to step 1 — the goal is still too vague to measure.

**3. Decide who checks.** If the sensor is mechanical (a test, a compiler, a schema), the producer can run it on itself, because the test does not care who wrote the code. If the sensor needs judgment, the checker should be a separate agent with its own context, for the grading-your-own-exam reason from the last section. Most loops start single-agent and only split when judgment enters.

**4. Wire the feedback.** When the sensor fails, its output has to reach the next pass as input, or the loop learns nothing. "Tests failed" is useless; "test `auth.spec.ts:42` expected 200, got 401" is a next step. The whole value of looping over single-shotting is that each pass starts from what the last one learned, and that only happens if the feedback is specific and actually delivered.

**5. Cap the iterations.** Every loop needs a ceiling, because a loop that cannot reach its goal will spend until you stop it. Pick a maximum pass count, and make each pass idempotent so a killed run resumes cleanly instead of redoing or duplicating work. A stop condition that can never be met is the most expensive bug in this whole subject.

Five steps, and notice that four of them are about the goal and the sensor. The iteration itself — the part that looks like the loop — is the part you barely design. That is the recurring lesson: **the engineering is in defining "done" and measuring it, not in the repeating.**

## Building one in Claude Code

Claude Code ships the primitives, so you rarely assemble a loop from raw parts. The design work is choosing the primitive whose shape matches the "done" you landed on in the steps above.

### `/goal` — a loop with a judged stop condition

`/goal` is the most direct way to hand over the cycle. You write a completion condition in natural language; after each turn a fast evaluator model (Haiku) reads what Claude has surfaced and judges whether the condition holds. If it does, the goal clears and the session returns to normal. If it does not, Claude takes another turn with the evaluator's reason as guidance.

```
/goal Every test in test/auth/ passes when I run npm test, npm run typecheck
exits 0, and no file outside src/auth/ has been modified. Stop after 15 turns
if not met.
```

That single condition runs the reason–act–observe cycle for you. Three things in it are deliberate and worth copying:

- **It is provable from the transcript.** The evaluator does not run commands or read files on its own — it only judges what Claude has already shown. So the condition is phrased around things Claude's own output demonstrates: test results printed back, an exit code reported, a file list. "The auth flow is correct" would never converge, because nothing in the transcript proves it.
- **It is specific about scope.** "No file outside `src/auth/` has been modified" is a guardrail that keeps a long run from wandering into the rest of the codebase. Goals without scope bounds are how unattended runs cause damage.
- **It has a ceiling.** "Stop after 15 turns if not met" is step 5 made concrete. Without it, a goal the model cannot reach runs until you notice.

Two real constraints: `/goal` needs the workspace's trust dialog accepted (the evaluator is part of the hooks system), and it is unavailable when hooks are disabled in any settings scope. Both fail loudly rather than silently doing nothing. The [Claude Code workflows](/workflows/claude-code) page covers how `/goal` pairs with unattended overnight runs.

### A Stop hook — a loop with a mechanical stop condition

When "done" is pass/fail rather than a judgment, a [Stop hook](/concepts/hooks) is the code-evaluated version of the same loop. A Stop hook fires when Claude tries to finish a turn. Exit 0 lets it stop; exit 2 forces it to keep working, with whatever the hook printed to stderr becoming the feedback Claude reads on the next pass. That single mechanism is the entire reason–act–observe cycle: the hook is the sensor, exit 2 is "go again," exit 0 is "done."

```bash
#!/bin/bash
# .claude/hooks/tests-pass.sh — block stopping until the test suite is green
INPUT=$(cat)

# Reentrancy guard. Without this the loop can never end.
if [ "$(echo "$INPUT" | jq -r '.stop_hook_active')" = "true" ]; then
  exit 0
fi

if ! npm test --silent; then
  echo "Tests are still failing. Read the output above, fix the cause, and try again." >&2
  exit 2   # forces another pass
fi

exit 0     # tests pass — allow the loop to stop
```

Wired in `.claude/settings.json`:

```json
{
  "hooks": {
    "Stop": [
      { "hooks": [{ "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/tests-pass.sh" }] }
    ]
  }
}
```

The `stop_hook_active` guard is not optional — it is the iteration cap from step 5. Claude Code will also override a Stop hook that blocks many times in a row without progress, as a backstop, but you should not rely on that; design the exit yourself. The [hooks page](/concepts/hooks) has a more durable variant that grades a written evidence file instead of rerunning the suite live, plus the honest failure modes of running this overnight (it can mix badly with background work, and it can block turns that were never trying to finish). Reach for a Stop hook when the verification is mechanical; reach for `/goal` when it benefits from judgment.

### `/loop` — repetition on an interval, which is a different shape

Worth flagging precisely because the name invites the confusion. [`/loop`](/workflows/claude-code) re-runs a prompt on a cadence — `/loop 5m check whether the deploy finished` — which is right for polling or babysitting a PR. It does **not** drive toward a stop condition. It fires on schedule whether or not the last run accomplished anything. `/goal` and Stop hooks are the converging loops this page is about; `/loop` is periodic re-evaluation. Different primitives, different jobs. (`/loop` with no interval lets Claude pace itself and *may* choose to stop when it judges the work done, but that is the model's call, not a verified condition.)

## Stop conditions and rubrics

Everything on this page reduces to the stop condition, so it is worth dwelling on the hardest case: when "done" genuinely needs judgment and there is no clean pass/fail. The instinct is to write "until it's good" and let the agent decide. That fails for a structural reason — the agent that produced the work is optimistic about it and will clear a vague bar early.

The fix is a **rubric**: the judgment written down as specific, checkable criteria, so that grading becomes closer to mechanical. Compare:

```
Bad stop condition:   "Iterate on the thumbnail until it looks good."

Good stop condition:   "Score each attempt 1–10 on four criteria, stop at >= 8 on all four:
                        - Focal subject readable at 120px wide (thumbnail size)
                        - Fewer than five words of text
                        - Foreground contrasts with background (no muddy mid-tones)
                        - One clear focal point, not three competing ones"
```

The second is still a judgment, but it is a *consistent* one. A separate validator agent can apply it the same way every pass, and "stop at >= 8 on all four" is a real threshold instead of a feeling. The rubric is also where you encode taste you would otherwise have to inject by hand every iteration — which is, again, the prompting moving inside the loop.

Two rules for rubrics that hold up: make each criterion something a fresh observer could grade without you in the room, and have an agent other than the producer do the grading. A rubric the producer grades against its own work is a vaguer bar wearing a checklist.

## What the loop remembers

A loop that does not carry forward what it already tried will repeat its own dead ends. If pass three discovers that approach X fails, and pass four does not know that, the loop can cycle between two wrong answers indefinitely. So a real loop needs a memory of what has been attempted. There is no magic built-in "loop journal" in Claude Code — you choose the mechanism, and the choice depends on how long the loop runs and how much it needs to remember.

- **The transcript itself.** Within a single session, Claude reads the whole conversation each turn, so "I already tried X, it failed because Y" is simply *in context*. This is automatic and enough for short loops. Its limit is the limit of context: over a long run the history grows, and compaction can summarise away exactly the failed-attempt detail you needed to keep.
- **An evidence file on disk.** For loops that run long or need to survive compaction, have each pass write what it tried and what happened to a structured file (`.evidence/attempts.json` or similar), and have the next pass — or the Stop hook — read it. This is the durable version: the memory lives outside the context window, so it cannot be summarised away, and a killed run can pick up from it. It is also what makes step 5's idempotence real.
- **An external tracker.** For loops that span sessions or coordinate work across people, the memory layer is something outside Claude entirely — a set of issues, a database, a task list — that each pass reads at the start and writes to at the end. State lives in the system of record; Claude reads it in and writes it back, the same way the production [maintenance-loop pattern](/systems/patterns) treats a codebase or a CRM as the durable body of work.

The deeper you go, the more this matters: a single-agent loop leans on the transcript, an overnight loop wants an evidence file, and a loop composed into a [dynamic workflow](/concepts/dynamic-workflows) holds its intermediate results in script variables that survive a pause and resume. Same need — remember what was tried — answered at the scale the loop runs at.

## Common mistakes

**No real sensor.** The single most common failure. A loop without objective verification is not iterating toward anything; it is producing variations and the model's own optimism decides when to stop. If a loop is not improving its output, suspect the verification before anything else.

**A subjective stop condition.** "Until it is good," "until you are happy" — the agent grades these against its own taste and clears them early. Anything you cannot prove from outside the run is not a stop condition. Turn it into a written rubric the agent applies consistently, or a check that genuinely passes or fails.

**Letting the producer be the judge.** An agent reviewing its own work pulls against the grain of having produced it. When verification needs judgment rather than a clean pass/fail, give it to a separate agent with a fresh context, prompted to find faults rather than to confirm.

**Runaway iteration.** A loop that retries on failure without converging will burn tokens indefinitely on a problem it cannot actually solve. Cap the iteration count, and design each pass to be idempotent so that a killed run can resume cleanly rather than redo or duplicate work. A stop condition that can never be met is worse than no loop at all, because it costs the most.

**Building a loop for a one-shot task.** If iteration does not improve the output, the loop is pure overhead. Most tasks are one-shot. Use a loop where passes compound, not because a longer run looks more serious.

**Reaching for a fleet first.** The instinct to throw many agents at a problem usually precedes understanding the problem. Start with the smallest loop that has a real sensor — almost always a single agent. Add executors and validators only when verification needs an independent eye or the work genuinely splits.

---

The thread running through all of this is the reframe at the top: the leverage is not in prompting harder, it is in defining "done" precisely enough that a system can prompt itself toward it. A loop is what that definition becomes once you hand it over. The next move up — loops that run on a schedule against a body of work that needs ongoing care, composed into systems that operate without an open session — is the subject of [Systems](/systems/the-shift), where the same cycle gets applied to work that runs without you in the room.

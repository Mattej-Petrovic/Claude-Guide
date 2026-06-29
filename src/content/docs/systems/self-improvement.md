---
title: Self-improving systems
lede: "The rest of this section is about systems that run. This one is about systems that get better while they run, and the hard limit underneath the idea: a loop can only improve what it can measure."
section: systems
---

Every other page in this section treats a system as something you design once and then operate. This page is about the tempting next step: a system that designs a little of itself, that gets sharper every night without you in the room.

The idea is real, and some of it works well. But it arrives wrapped in more hype than almost anything else in this space, so it is worth being precise about three things: what is actually improving, what part of it can be automated, and exactly where the wall is.

## What is actually improving

Start with the thing most people get wrong. When someone says a Claude system "learns" or "improves itself," they almost never mean the model. The weights are frozen. Nothing in a normal workflow changes them.

What improves is the context: the material Claude reads at the start of every run. Anthropic's own framing for building agents is that the real job is context engineering, treating the limited window as a budget and searching for "the smallest set of high-signal tokens that maximize the likelihood of your desired outcome." Self-improvement is that search, automated. The system gets better because its context gets better, run after run.

There are three levers, and the whole topic is about editing them automatically.

- **Skills.** The SKILL.md files that encode a repeatable process. [Skills](/extending/skills) already improve by iteration; the question here is whether that iteration can run on its own.
- **Instructions.** The CLAUDE.md and [project files](/concepts/project-files) that load every session. Corrections live here.
- **Knowledge.** The durable notes and references the system can draw on, the layer that compounds over time.

<svg class="svg-wide" viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="What self-improvement actually edits. Raw inputs such as sources, sessions, and corrections flow into the context, which has three editable parts: skills, CLAUDE.md and project files, and a knowledge wiki. The agent reads that context on its next run. The model weights sit below, drawn as frozen and never edited.">
  <!-- title tag -->
  <text x="400" y="24" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="1" opacity="0.7">WHAT SELF-IMPROVEMENT ACTUALLY EDITS</text>
  <!-- inputs -->
  <rect x="30" y="120" width="160" height="90" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="110" y="150" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="1">INPUTS</text>
  <text x="110" y="174" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">sources · sessions</text>
  <text x="110" y="190" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">corrections</text>
  <!-- context container -->
  <rect x="290" y="62" width="240" height="222" rx="6" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <text x="410" y="52" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="1">THE CONTEXT, WHAT YOU EDIT</text>
  <!-- lever 1 -->
  <rect x="310" y="80" width="200" height="56" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.45"/>
  <text x="410" y="104" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">Skills</text>
  <text x="410" y="121" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">SKILL.md, a repeatable process</text>
  <!-- lever 2 -->
  <rect x="310" y="150" width="200" height="56" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.45"/>
  <text x="410" y="174" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">Instructions</text>
  <text x="410" y="191" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">CLAUDE.md, project files</text>
  <!-- lever 3 -->
  <rect x="310" y="220" width="200" height="56" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.45"/>
  <text x="410" y="244" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">Knowledge</text>
  <text x="410" y="261" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">a wiki the model maintains</text>
  <!-- agent -->
  <rect x="620" y="128" width="160" height="90" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <text x="700" y="158" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="1">THE AGENT</text>
  <text x="700" y="182" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">next run</text>
  <text x="700" y="198" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">reads the context</text>
  <!-- arrows -->
  <line x1="190" y1="165" x2="286" y2="173" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="280,168 292,174 280,178" fill="#d97706" fill-opacity="0.7"/>
  <line x1="530" y1="173" x2="616" y2="173" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="610,168 622,173 610,178" fill="#d97706" fill-opacity="0.7"/>
  <!-- frozen weights -->
  <rect x="290" y="300" width="240" height="34" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.2" stroke-dasharray="4 4"/>
  <text x="410" y="321" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.4" font-style="italic">model weights, frozen and never edited</text>
</svg>

Once you see it this way, the mechanism stops being mysterious. A self-improving system is a [maintenance loop](/systems/patterns) pointed at the system's own context instead of at a codebase. It is the same shape as the second pattern on the [patterns](/systems/patterns) page: a trigger, a body of work, a scan, a change, a check. Here the body of work is the agent's own instructions and skills. And like every maintenance loop, it lives or dies on one question. Can it tell, on its own, whether the change it just made was actually an improvement.

## The measurable core: evals

The only honest way to let a loop keep or discard its own changes is to give it a score it can trust without you. That is what an eval is: a test case paired with a check that returns pass or fail.

Anthropic ships this directly. The skill-creator skill, the standard way to build a skill, now runs evals on them. You write an `evals.json`: realistic prompts, each carrying one or more binary assertions, plain checks like "the final line is not a question" or "the review uses severity levels." The skill runs each prompt twice, once with the skill and once without, and a grader marks every assertion pass or fail with the evidence for its call. You get a pass rate, and a side-by-side of skill against baseline that answers the prior question of whether the skill is earning its place at all.

A concrete run makes it tangible. Point the loop at a copywriting skill with twenty-five assertions spread across a set of prompts. The first pass scores well and fails exactly one: some posts end on a question. The fix is a single line added to SKILL.md. The next pass is perfect.

That is the story in every demo, and it is where the demos stop. The discipline says keep going, because a perfect score is not a trophy, it is a warning. People who run evals for a living are blunt about this. "If you're passing 100% of your evals, you're likely not challenging your system enough," as Hamel Husain and Shreya Shankar put it in their reference guide to the practice; a 70% pass rate often signals a more meaningful test. A loop that hits 100% has usually run out of things its evals can see, not things worth fixing.

Two more rules carry over from that discipline. Keep checks binary rather than scored one to five, because the gap between a three and a four is not stable even across two people, let alone across a hundred nightly runs. And start with the cheapest check that works: a regex, a structural validation, an execution test. Reserve a slower model-as-judge for the subjective qualities a simple rule cannot catch, and reserve a human for the ones a judge cannot catch either. Anthropic's own skill-creator says the quiet part plainly: subjective skills like writing style or design quality "are better evaluated qualitatively. Don't force assertions onto things that need human judgment."

## The loop, drawn

<svg class="svg-wide" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The self-improvement loop. Claude edits its own context, a skill file or CLAUDE.md. It runs evals comparing the change with-skill against a baseline. It scores the pass rate, keeps the change if the score rose and reverts if it fell, then repeats unattended. A note marks that the loop only turns on objective binary scores. A separate branch sends subjective quality such as taste and tone out to a human reviewer.">
  <!-- return path on top: C up, left, down into A -->
  <path d="M 675 78 L 675 44 L 125 44 L 125 78" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7" fill="none"/>
  <polygon points="120,72 130,72 125,84" fill="#d97706" fill-opacity="0.7"/>
  <text x="400" y="36" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6" font-style="italic">rose, keep the change · fell, revert · repeat, unattended</text>
  <!-- A: edit context -->
  <rect x="30" y="78" width="190" height="78" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <text x="125" y="100" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="1">EDIT THE CONTEXT</text>
  <text x="125" y="123" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">skill.md · CLAUDE.md</text>
  <text x="125" y="141" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">one change at a time</text>
  <!-- arrow A->B -->
  <line x1="220" y1="117" x2="296" y2="117" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="290,112 302,117 290,122" fill="#d97706" fill-opacity="0.7"/>
  <!-- B: run evals -->
  <rect x="300" y="78" width="200" height="78" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <text x="400" y="100" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="1">RUN EVALS</text>
  <text x="400" y="123" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">with-skill vs baseline</text>
  <text x="400" y="141" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">binary assertions, pass or fail</text>
  <!-- arrow B->C -->
  <line x1="500" y1="117" x2="576" y2="117" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="570,112 582,117 570,122" fill="#d97706" fill-opacity="0.7"/>
  <!-- C: score -->
  <rect x="580" y="78" width="190" height="78" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <text x="675" y="100" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="1">SCORE</text>
  <text x="675" y="123" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" opacity="0.85">did the pass rate rise?</text>
  <text x="675" y="141" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">the gate the loop turns on</text>
  <!-- subjective branch from B down to human -->
  <line x1="400" y1="156" x2="400" y2="214" stroke="currentColor" stroke-width="1" stroke-opacity="0.35" stroke-dasharray="4 3"/>
  <polygon points="395,208 405,208 400,218" fill="currentColor" fill-opacity="0.3"/>
  <text x="412" y="188" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6" font-style="italic">subjective quality</text>
  <!-- human box -->
  <rect x="280" y="218" width="240" height="60" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="400" y="244" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700">human judgement</text>
  <text x="400" y="262" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">taste · tone · correctness in the world</text>
  <!-- gate note -->
  <text x="675" y="200" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.5" font-style="italic">objective, binary</text>
  <text x="675" y="214" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.5" font-style="italic">checks only</text>
</svg>

## What a loop cannot score

This is the wall, and it is worth standing at it honestly, because most of the value people actually want from a system lives on the far side of it.

A binary loop is excellent at structure and useless at merit. It can guarantee a post is under three hundred words, contains no banned phrase, ends on a statement, and cites a source. It cannot tell you the post is any good. Taste, tone, whether an argument lands, whether a judgment call was the right one given everything that was not written down: none of it reduces to an assertion, and pretending it does produces a system that is measurably compliant and quietly mediocre.

Two failure shapes make the wall concrete.

The first is Goodhart's law: when a measure becomes a target, it stops being a good measure. A loop optimizing a pass rate is, by construction, optimizing the measure and not the goal. Give it enough iterations and it will find the cheapest way to make the assertions pass, which is rarely the way you meant. This is not hypothetical. Autonomous optimization loops have been documented driving an internal metric to record highs while the real-world target it was a proxy for never moved at all. The score went up. The thing the score was for did not.

The second is subtler, because it is about your own standard moving. The moment you read a batch of outputs, you notice things you never thought to check for, and your sense of what counts as good sharpens. Done properly, evaluation is "an iterative, human-driven sensemaking process, not a static target that can be set once and handed off to an optimizer." A loop cannot do that noticing. It can only optimize the criteria it was handed, which is exactly why the criteria cannot be frozen and left running by themselves forever.

## Reflection: learning from corrections

Evals improve a skill against a fixed target. Reflection improves the system against you. It is the other half of the topic, and it is mostly a community pattern rather than a shipped feature, so it pays to be clear about what is real underneath it.

The real part is two official primitives. [Hooks](/concepts/hooks) let a script run at a lifecycle event, including a Stop hook that fires when a session ends. Slash commands let you define a reusable instruction. The community pattern, usually called reflection or a reflex, wires them together: at the end of a session, or on a manual `/reflect`, Claude reads back over the conversation, finds the moments you corrected it ("no, use X, not Y"), and proposes writing those corrections into its own instructions.

The better implementations tier the proposals by confidence: high for an explicit "always" or "never," medium for a pattern that worked repeatedly, low for a one-off observation worth a glance. You approve, it writes the lesson into CLAUDE.md or a skill file, and it commits to Git so any change can be read as a diff and undone with one command. The promise on the tin is "correct once, remember forever."

Conceptually this is Anthropic's "agentic note-taking," the technique of an agent writing notes to itself outside the context window, turned into a loop. And the discipline that keeps it useful is the one from the [memory](/concepts/memory) page: curate, do not accumulate. The whole context-engineering argument is that the target is the smallest high-signal set of tokens, not the largest pile. A reflex system that writes down every passing thought does not get smarter. It gets bloated, and a bloated CLAUDE.md quietly degrades every run that loads it. The win is correcting a real, recurring mistake once. The trap is treating the instruction file as a diary.

## The knowledge layer

Skills and instructions are how the system acts. Knowledge is what it acts on, and it is the layer with the most genuine compounding in it.

The reference point is Andrej Karpathy's "LLM wiki," an idea he published in April 2026 that spread fast because it named something a lot of people were reaching for. The metaphor is compilation: your raw sources are the source code, the wiki is the binary. Instead of a system that re-reads your documents from scratch on every question, the way ordinary retrieval does, you keep a structured, interlinked set of markdown pages that the model owns and maintains.

It has three layers and three operations, and the operations are where self-improvement actually happens.

- **Ingest.** When a source arrives, the model reads it, writes a summary, updates the existing pages it touches, flags contradictions with what is already there, and strengthens the cross-links. A single source can touch ten or fifteen pages.
- **Query.** You ask the wiki questions, and good answers become new pages, so asking is itself a way the base grows.
- **Lint.** On a schedule, the model health-checks the whole thing for contradictions, stale claims, orphaned pages, and missing links.

Karpathy's observation about why this works is the load-bearing one: the tedious part of maintaining a knowledge base is not the reading, it is the bookkeeping. Bookkeeping is exactly what a model will do happily forever and a person will not, which is why human-maintained wikis rot and this kind does not have to. The lint pass is the clearest case in the whole topic of a system improving its own context with no new input at all, just a periodic cleanup that keeps the knowledge coherent.

This is the same instinct as the guide's [Obsidian and Graphify](/workflows/obsidian-graphify) workflow, and it rhymes with how [subagents](/concepts/subagents) build up their own memory: the first run is expensive because it assembles context, the tenth is cheap because the context is already there. Notice the honest scope, though. The schema file at the top of Karpathy's design, the one holding the conventions for how the wiki is organized, is a CLAUDE.md. Even the knowledge layer is, in the end, context engineering.

## Keeping the human in the loop

By now the answer to "how autonomous should this be" should feel familiar, because it is the gradient from [where the human lives](/systems/where-the-human-lives), applied to the system's improvements rather than its actions.

A workable way to run it is to sort every proposed change into three buckets. Auto-approve the low-risk, reversible, measurable ones: a lint pass that drops a dead link, a reflex that removes a stale instruction, a skill edit that raised a pass rate on a test set you actually trust. Hold for sign-off the high-stakes ones: a brand-new skill, a change to how the system makes a judgment call, anything that touches the parts evals cannot see. And route the genuinely ambiguous ones to a person with the context attached, instead of letting the loop guess.

The reason this is not just caution is everything above. Goodhart's law means a fully autonomous optimizer drifts toward gaming its own measure. Criteria drift means the standard itself needs a human to keep moving it. So the auto-approve bucket should hold only changes whose score you genuinely believe, and the moment a system gets burned, by a gamed metric or a bad reflex, the right move is the one the gradient page already prescribes: tighten the checkpoint, watch for a while, loosen again once the evidence supports it. Self-improvement is not the removal of the human. It is the human moving from making each change to deciding which changes the system is allowed to make on its own.

## What breaks first

**The loop games its own test.** The most common failure, and the one Goodhart guarantees at scale. An agent told to make tests pass can edit the tests, or satisfy the letter of an assertion while missing its intent. [What breaks in production](/systems/what-breaks) made the narrow version of this point: a test suite is a success criterion, not the success criterion, and an agent optimizing against it learns what passes. A self-improvement loop is that dynamic running unattended, all night. Cap the iterations, keep a held-out set of cases the loop never trains against, and read what it actually changed.

**The grader shares the author's blind spots.** When the skill being improved and the grader scoring it are the same model family, the check is not independent, it is a mirror. This is the [monoculture trap](/systems/composition) from the composition page, arriving inside a single loop: the grader confidently approves exactly the mistakes it would have made itself, because they do not look like mistakes to it. Real independence has to come from somewhere the model is not, a code-based assertion, an execution test, a person, before you trust a self-graded win.

**The context rots, or it bloats.** Two opposite drifts with the same cause: nobody is curating. A knowledge base accumulates contradictions until a query returns confident nonsense. An instruction file accumulates one-off lessons until it is long enough to degrade every run that loads it. The lint pass and the curate-don't-accumulate rule exist precisely for this. A self-improving system needs a self-pruning habit, or it improves itself into incoherence.

**The improvement is never checked in the world.** A higher pass rate is a claim about a test set, not about reality. The classic ending of the autonomous-loop story is a metric at an all-time high next to a real outcome that has not moved. The fix is not more iterations. It is a periodic check against something the loop cannot see: real usage, a real result, a human reading real output.

## What this leaves you with

Self-improvement is real, narrow, and worth building, as long as you hold the boundary clearly. Automate the part you can score honestly: structure, format, regressions, the dead links and stale instructions a loop catches better than you do. Keep a person on the part you cannot: taste, judgment, the standard itself, the question of whether the number still means anything.

And remember through all of it that what you are improving is the context, never the model. That means the real skill is the same one this whole section has been teaching. You are not training an intelligence. You are designing the conditions it reads, and now designing the loop that edits them. Where the line falls between what that loop may decide alone and what it has to bring back to you is not a detail of the system. It is the system.

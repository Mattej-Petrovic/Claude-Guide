---
title: Where the human lives
lede: The checkpoint question is not "is this safe to leave running." It is "where does a human need to glance, and how often." That is a gradient, not a switch.
section: systems
---

Most conversations about AI oversight treat the question as binary. Is this system safe to leave running, or not. Should a human be in the loop, or not.

That framing produces bad systems. The binary makes every choice look extreme. Either you supervise everything, which means the agent saves you nothing, or you supervise nothing, which means the first quiet failure costs you the trust that justified the system in the first place. Real production systems do not sit at either pole. They live somewhere on a gradient, and getting the position right is most of the design.

The right question is not whether the human is in the loop. The right question is *where the human stays in the loop, and how often they have to be there*. The "where" determines what kinds of mistakes the system can catch. The "how often" determines whether the system is actually saving anyone time. Get the second wrong and you have built a rubber stamp wearing a checkpoint's clothes.

## The gradient

There are roughly four positions a human can occupy in a delegated system. They are not a ranking. They are a gradient, and any non-trivial system will use different positions for different actions.

<svg class="svg-wide" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A horizontal gradient with four checkpoint levels. From left to right: per-action approval, human-in-the-loop on key actions, periodic review, and fully autonomous. Each level has examples and notes about what changes as you move along the gradient.">
  <!-- gradient bar (amber left, fading right) -->
  <rect x="40" y="60" width="720" height="20" fill="#d97706" fill-opacity="0.15"/>
  <rect x="40" y="60" width="540" height="20" fill="#d97706" fill-opacity="0.08"/>
  <rect x="40" y="60" width="360" height="20" fill="#d97706" fill-opacity="0.08"/>
  <rect x="40" y="60" width="180" height="20" fill="#d97706" fill-opacity="0.08"/>
  <!-- axis endpoints -->
  <text x="40" y="50" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.5" font-style="italic">more human involvement</text>
  <text x="760" y="50" text-anchor="end" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.5" font-style="italic">less human involvement</text>
  <!-- tick lines -->
  <line x1="100" y1="60" x2="100" y2="100" stroke="currentColor" stroke-width="1" stroke-opacity="0.5"/>
  <line x1="290" y1="60" x2="290" y2="100" stroke="currentColor" stroke-width="1" stroke-opacity="0.5"/>
  <line x1="500" y1="60" x2="500" y2="100" stroke="currentColor" stroke-width="1" stroke-opacity="0.5"/>
  <line x1="700" y1="60" x2="700" y2="100" stroke="currentColor" stroke-width="1" stroke-opacity="0.5"/>
  <!-- level titles -->
  <text x="100" y="120" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="0.5">PER-ACTION</text>
  <text x="100" y="134" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="0.5">APPROVAL</text>
  <text x="290" y="120" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="0.5">HITL ON</text>
  <text x="290" y="134" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="0.5">KEY ACTIONS</text>
  <text x="500" y="120" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="0.5">PERIODIC</text>
  <text x="500" y="134" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="0.5">REVIEW</text>
  <text x="700" y="120" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="0.5">FULLY</text>
  <text x="700" y="134" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="0.5">AUTONOMOUS</text>
  <!-- level 1 box — taller to contain all text -->
  <rect x="30" y="150" width="140" height="160" rx="3" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="100" y="172" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700">human approves</text>
  <text x="100" y="186" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700">every action</text>
  <text x="100" y="208" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55">synchronous, blocking</text>
  <text x="100" y="222" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55">slow but maximal control</text>
  <text x="100" y="244" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6" font-style="italic">e.g. payment authorization,</text>
  <text x="100" y="258" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6" font-style="italic">production database writes,</text>
  <text x="100" y="272" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6" font-style="italic">irreversible deletes</text>
  <!-- level 2 box (accent border) -->
  <rect x="220" y="150" width="140" height="160" rx="3" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <text x="290" y="172" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700">gate on the few</text>
  <text x="290" y="186" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700">irreversible actions</text>
  <text x="290" y="208" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55">async-friendly,</text>
  <text x="290" y="222" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55">rest runs autonomously</text>
  <text x="290" y="244" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6" font-style="italic">e.g. outbound emails,</text>
  <text x="290" y="258" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6" font-style="italic">PR merges, customer</text>
  <text x="290" y="272" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6" font-style="italic">refunds above a threshold</text>
  <!-- level 3 box -->
  <rect x="430" y="150" width="140" height="160" rx="3" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="500" y="172" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700">async review of</text>
  <text x="500" y="186" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700">batches or samples</text>
  <text x="500" y="208" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55">after the fact,</text>
  <text x="500" y="222" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55">on a cadence</text>
  <text x="500" y="244" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6" font-style="italic">e.g. classified leads,</text>
  <text x="500" y="258" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6" font-style="italic">resolved support tickets,</text>
  <text x="500" y="272" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6" font-style="italic">CRM hygiene runs</text>
  <!-- level 4 box -->
  <rect x="630" y="150" width="140" height="160" rx="3" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="700" y="172" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700">no review,</text>
  <text x="700" y="186" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700">audit trail only</text>
  <text x="700" y="208" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55">examined only when</text>
  <text x="700" y="222" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55">something goes wrong</text>
  <text x="700" y="244" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6" font-style="italic">e.g. log analysis,</text>
  <text x="700" y="258" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6" font-style="italic">dependency bumps that</text>
  <text x="700" y="272" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.6" font-style="italic">pass tests, deduping</text>
  <!-- bottom annotation -->
  <text x="400" y="336" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="1" opacity="0.7">WHAT CHANGES AS YOU MOVE ALONG THE GRADIENT</text>
  <text x="400" y="356" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55">stakes go down · reversibility goes up · volume goes up · novelty of inputs goes down</text>
  <text x="400" y="372" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55">the system earns its way along this axis; nothing starts on the right</text>
</svg>

**Per-action approval.** The agent proposes; the human approves every action before it happens. Synchronous, blocking. The agent never touches anything live without an explicit yes. This is the right place for actions that are irreversible, expensive, or have a wide blast radius — payment authorization, production database writes, contract signatures, things that cannot be undone with a `git revert`. The cost is speed: every action goes through human latency. The benefit is that no individual action surprises you.

**Human-in-the-loop on key actions.** The agent runs autonomously most of the time and pauses only at specific, predefined gates. A support agent resolves the routine tickets; a human approves the refunds above $500. An SDR agent drafts and sends outreach; a human reviews any email that would be the first message to an enterprise account. A code agent opens PRs autonomously; a human approves the merge. The principle is: most of the work is reversible and low-stakes, a small fraction is neither, and that fraction gets a gate.

This is the position most production systems should target. It captures most of the speed of full autonomy and most of the safety of per-action approval, because the irreversible actions are usually a small fraction of the total. The work is in identifying which actions are in that fraction and making the gate enforceable, not advisory.

**Periodic review.** The agent runs and acts. The human reviews the outputs later — a sample of resolved tickets at the end of the week, a daily digest of classifications, a glance at the dashboard of what the maintenance loop did overnight. The human is no longer in the path of any individual action. They are in the path of *patterns*.

This is the right place for high-volume work where individual mistakes are tolerable but systemic drift is not. You cannot review every classification an SDR system makes if it makes ten thousand a week. You can review a sample. The sample is not for catching individual errors; it is for noticing that the error rate has shifted, that a new category of input is being misclassified, that the system is starting to handle something it should not be.

**Fully autonomous.** No review at all. The system runs, logs what it did, and the human reads the log only when something else surfaces a problem — a downstream metric drops, a customer complains, a test fails. This is rarer than the AI-business posts suggest, and it is usually appropriate only for actions whose verification is built into the system itself: a code agent whose work is verified by the test suite, a hygiene loop whose work is verified by schema validation, a log analyzer whose output is reviewed by alarms rather than humans.

## What pushes a system up or down

The gradient is not a preference. It is a function of four properties of the task, and you cannot wish your system to a different position than these put it in.

**Stakes.** How bad is the worst plausible outcome of one wrong action. A misclassified support ticket is one customer's bad day; a wrongly authorized refund is money. The higher the stakes per action, the further left on the gradient.

**Reversibility.** How easy is it to undo a mistake once made. A misformatted draft is a click to fix; a sent email is gone. A code commit is `git revert`; a database `DROP TABLE` is a restore-from-backup. Reversible actions tolerate being on the right; irreversible ones belong on the left regardless of how rare the mistake is.

**Novelty of inputs.** How different is the average input from the inputs the system was designed for. A system handling familiar, well-shaped inputs can sit further right. A system encountering new edge cases every week needs to sit further left until those edge cases either get absorbed or recur often enough to be designed for.

**Cost of being wrong.** Stakes plus the externality. If the cost of a mistake is borne entirely by you, you can take more of it. If the cost is borne by a customer or a third party, you cannot take much of it at all without their consent. A code refactor that breaks your own build is your problem; an outreach email with a hallucinated company fact is the prospect's. Externalised costs push systems far left.

None of these is a number you can set. They are properties of the actions the system takes, and they push the gradient position whether you like it or not. Pretending a system can sit further right than these allow is how production failures happen.

## The bottleneck problem

The temptation, when designing checkpoints, is to be conservative. Add a checkpoint here. Add another there. Make sure a human sees everything before it goes out.

The temptation is wrong, and it is wrong in a specific way. *Synchronous approval scales linearly with action count.* If your system needs a human approval for every action, and the action volume grows, you have not built a system — you have built a queue feeding the same human who used to do the work. The agent is faster than the human. The bottleneck just moved.

This is the rubber-stamp failure mode. The system technically has a human in the loop. In practice the human is approving things faster than they can read them, because that is the only way to keep up with the queue. The checkpoint is theatre; the agent is effectively running unsupervised, with a layer of false confidence on top.

The fix is to use asynchronous review as the default and reserve synchronous approval for the small set of actions that genuinely need it. Async review beats synchronous approval for most things. A daily digest of yesterday's twenty SDR conversations beats real-time approval of each one. A weekly sample of resolved tickets beats blocking on every resolution. The system runs at machine speed; the human reviews at human speed; the two cadences do not have to match.

The other fix is harder: design the system so the agent escalates *less*. An agent that escalates twenty percent of inputs needs a human for one in five actions. An agent that escalates two percent needs one in fifty. The difference is not in the model. It is in how clearly you defined the boundary between "handle this" and "ask for help." A vague boundary produces a flood of escalations, and the human becomes the bottleneck of their own design.

## The audit trail principle

Even fully autonomous systems should log decisions in a form a human can review after the fact. Not because anyone will read the logs day to day. Because when something breaks, you need to find out *why*.

The audit trail is not a checkpoint; it is forensic. The point is not real-time oversight. The point is that when a customer complains about a wrong reply, or a metric dips, or you notice something feels off, you can answer the question "what did the system decide last Tuesday, and what did it base the decision on." A system that ran for three months without logging is a system whose first failure is impossible to debug.

Good audit trails capture three things: the input the agent received, the decision it made, and the reasoning or context that informed the decision. The reasoning matters most. A log that says "classified as low-intent" is half a log. A log that says "classified as low-intent because of phrases X, Y, Z and missing company size data" tells you why, which means it tells you whether the classification rule needs to change or whether the input itself was misleading.

## When to deliberately increase involvement

The gradient position is not fixed once chosen. There are moments when it is correct to move a system left — to put a human back in the loop where one had been removed.

Three of them are worth naming. *Early in a system's life,* when you do not yet have enough evidence about its behaviour to trust it unattended. Run with heavier checkpoints for the first few weeks, then loosen them as the data gives you a base rate of failure to argue against. *After a failure,* when something went wrong and you are not yet sure whether the cause is fixed. The instinct is to patch the prompt and resume; the right move is often to add a checkpoint while you watch the new behaviour. *When inputs shift,* when something about the world the system is operating in has changed — a new product launch, a new customer segment, a new regulatory environment. The system was designed against last quarter's distribution. The checkpoint comes back until the new distribution is understood.

The gradient is not a one-way ratchet. Systems should move along it as the evidence supports, in either direction.

## What this leaves you with

The right question is not whether to keep a human in the loop. The right question is which actions need a human, on what cadence, and where the system earns its way along the gradient over time.

The next page is about the failure modes themselves — the specific things that go wrong when the gradient was set too far to the right, or when nobody was watching what the audit trail was recording.

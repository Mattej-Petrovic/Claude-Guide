---
title: Composition
lede: The rest of this section is about building one system. This page is about what happens when you have several, and they start touching the same data, the same inbox, the same accounts. This is where experienced builders actually spend their time.
section: systems
---

Every other page in this section assumes you are building one system. This one assumes you have already built two or three, they each work, and they have started to touch each other.

That is a different problem, and it is worth being honest that the rest of the section does not prepare you for it. [Patterns](/systems/patterns) ended by saying that a one-person AI business is just a few patterns composed — an SDR system, a content pipeline, a support triage, a maintenance loop, stacked. That sentence is true and it hides the hard part. Each of those systems was designed in isolation, tested in isolation, and works in isolation. The failures that show up once they run together do not live inside any one of them. They live in the gaps.

This page is about the gaps.

## Why composition is its own problem

A system can be individually correct and still be part of a composition that is broken. That sentence is the whole reason this page exists. If you have built delegated systems, you have an instinct that says a failure means some component did something wrong — and for a single system, that instinct is usually right. For a composition, it is usually wrong. The components each did exactly what they were designed to do. The design that was missing was the one governing how they share.

Research on multi-agent systems in production keeps landing on the same finding: the large majority of breakdowns trace to coordination and specification, not to model capability. The agents are not the problem. The protocol between them is — and in most stacked-delegation setups there is no protocol, because each system was built by someone who was, reasonably, only thinking about that system.

The practical consequence is the one experienced builders learn the hard way. When a composition fails, the instinct is to improve an agent — tighten a prompt, swap in a stronger model, add a tool. None of that touches the failure, because the failure was never inside an agent. You did not stop designing systems. You started designing the space they share, and you may not have noticed the job changed.

## Shared state

The most common composition failure: two systems read and write the same underlying state — the same CRM, the same shared inbox, the same database row — and each was designed assuming it was the only writer.

Trace a concrete one. A payment system confirms a charge and updates an order's status to paid. An inventory system, running on its own schedule, reads that same order to decide whether to allocate stock. The inventory system happens to read a moment before the payment system writes. It sees an unpaid order, correctly follows its rule, and declines to allocate. The charge went through. The stock was never reserved. The order is now wedged in a state no single system produced, and no error fired anywhere — both systems did exactly the right thing with the information each of them had.

This is the silent failure from [What breaks in production](/systems/what-breaks), but it has moved. There it was a missing check inside one system. Here it is structural: there is no check that could live inside either system, because neither system did anything wrong. The fault is in the seam.

<svg class="svg-wide" viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A timing diagram showing a shared-state failure. Two lanes: Payment system and Inventory system. Both read from and write to a shared order record. The inventory system reads the record as unpaid just before the payment system writes paid, causing it to decline allocation even though payment succeeded.">
  <!-- time axis -->
  <line x1="80" y1="220" x2="680" y2="220" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <polygon points="674,216 684,220 674,224" fill="currentColor" fill-opacity="0.35"/>
  <text x="680" y="235" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.45" font-style="italic">time</text>
  <!-- lane labels -->
  <text x="72" y="72" text-anchor="end" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" opacity="0.85">Payment</text>
  <text x="72" y="84" text-anchor="end" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" opacity="0.85">system</text>
  <text x="72" y="152" text-anchor="end" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" opacity="0.85">Inventory</text>
  <text x="72" y="164" text-anchor="end" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" opacity="0.85">system</text>
  <!-- lane tracks -->
  <line x1="80" y1="78" x2="680" y2="78" stroke="currentColor" stroke-width="1" stroke-opacity="0.15" stroke-dasharray="4 4"/>
  <line x1="80" y1="158" x2="680" y2="158" stroke="currentColor" stroke-width="1" stroke-opacity="0.15" stroke-dasharray="4 4"/>
  <!-- shared record label -->
  <text x="340" y="122" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.5" font-style="italic">shared order record</text>
  <!-- stale window shading: from after inventory read (x=240) to payment write (x=440) -->
  <rect x="240" y="60" width="200" height="170" fill="#d97706" fill-opacity="0.07"/>
  <text x="340" y="56" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="9" opacity="0.7" font-style="italic">stale window — inventory acted on state about to change</text>
  <!-- payment write event at x=440 -->
  <line x1="440" y1="60" x2="440" y2="218" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.6"/>
  <circle cx="440" cy="78" r="5" fill="#d97706" fill-opacity="0.8"/>
  <text x="446" y="68" fill="#d97706" font-family="ui-monospace, monospace" font-size="10" font-weight="600">writes status: paid</text>
  <!-- inventory read event at x=180, clearly left of stale window -->
  <circle cx="180" cy="158" r="5" fill="currentColor" fill-opacity="0.5"/>
  <text x="180" y="138" text-anchor="middle" fill="currentColor" font-family="ui-monospace, monospace" font-size="10" opacity="0.8">reads status: unpaid</text>
  <!-- inventory downstream action at x=580 -->
  <circle cx="580" cy="158" r="5" fill="currentColor" fill-opacity="0.5"/>
  <line x1="180" y1="158" x2="576" y2="158" stroke="currentColor" stroke-width="1" stroke-opacity="0.3"/>
  <text x="580" y="138" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.75">declines to allocate stock</text>
  <text x="580" y="150" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.5" font-style="italic">(correct given what it read)</text>
  <!-- "both correct" annotation -->
  <text x="376" y="210" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.45" font-style="italic">neither system did anything wrong — the fault is in the seam</text>
</svg>

Shared-state failures come in three recognizable shapes.

**Stale reads.** One system acts on state another system has already changed. The reader was not wrong; it was just late, and nothing told it so.

**Conflicting writes.** Two systems write the same field. The store keeps the last write and silently discards the other. The losing system's intent simply vanishes, and it has no way to know it lost.

**Destructive interference.** One system's entirely legitimate action breaks another system's assumption. A CRM hygiene loop merges two duplicate records — exactly its job — while a pipeline is midway through a sequence of stages keyed to one of the IDs that just stopped existing.

The way to think about the fix is not a tool. It is a question of where the rules live. The failure mode in all three shapes is that the systems were coordinating *by convention* — each one designed as if the others would politely not interfere — and convention is not enforced by anything, so it drifts the first time a system is changed by someone who did not know the convention existed. The durable principle: the thing the systems share has to enforce the rules, because the systems will not. That means one of two moves. Either partition ownership, so every field and every record has exactly one system permitted to write it and the rest are readers — the pattern where a retrieval agent owns the subscription tier and the others may read it but never touch it. Or make the shared store itself responsible for ordering and conflict resolution, so coordination is a property of the infrastructure rather than a hope about agent behaviour. Which one fits depends on the systems. That the rules must live somewhere enforceable does not.

## The monoculture trap

The safety story everyone tells about multi-agent systems is that the agents check each other. One drafts, another reviews. One plans, another verifies. More agents, more independent eyes, a more robust whole.

There is a hole in that story, and in a composition it is a large one.

If the planner and the verifier are the same model, the verifier has the planner's blind spots. It will confidently approve exactly the mistakes it would have made itself, because they do not look like mistakes to it — they look like reasonable outputs, which is precisely why the planner produced them. You think you have two independent checks. You have one check, run twice. [What breaks in production](/systems/what-breaks) made a version of this point about using a second model call to verify the first — that the second call is expensive and its errors correlate with the first. This page is the larger and more uncomfortable version.

In a stacked-delegation setup, every system in the stack is probably built on the same model. The SDR system, the triage system, the pipeline, and whatever loop is supposed to sanity-check their output — same model underneath all of them. That means a single input shaped in a way that model handles badly does not fool one system. It can fool the whole stack at once, in the same direction, silently. The correlated failure is not a bug in one system. It is an exposure across the entire composition, and it is invisible precisely because every system agrees — and agreement reads, to a human glancing at a dashboard, like confirmation.

The principle that survives: real verification has to be independent of the thing it verifies, and independence is a real property, not a label. A test suite is independent of the agent that wrote the code — it fails on broken behaviour regardless of how confident the agent was. A schema is independent of the agent that produced the data. Another instance of the same model is not independent of anything; it is a mirror. When a system's check is another agent, ask what the two of them have in common, and if the honest answer is "everything," you have not built a check. You have built a second opinion from the same mind.

## Escalation routing

[Where the human lives](/systems/where-the-human-lives) treated escalation as straightforward: the system hits something it should not handle, and it routes that to a human. For one system, that is the whole story. For a stack, escalation is its own design problem, and skipping the design does not remove the problem — it just hands it to the human in the worst possible form.

Three things go wrong. Systems escalate at different rates and different urgencies, and they all escalate into the same human. A real-time support escalation that needs an answer in minutes lands in the same queue as a batch lead review that could wait a day, with nothing marking which is which. Systems escalate *to each other*, not just to humans — the SDR system hands a qualified lead to a pipeline, the pipeline is down, and the handoff drops into a gap that no system was assigned to own. And the human, who was supposed to be the designer sitting above the stack, quietly becomes the integration layer of last resort: the router, the dead-letter queue, and the conflict resolver for everything no single system was built to own.

That last one is the bottleneck from [Where the human lives](/systems/where-the-human-lives) returning in a worse form. There, the risk was a human rubber-stamping a queue too fast to read. Here, the human is doing real triage work — deciding what is urgent, chasing dropped handoffs, reconciling conflicts between systems — none of which was designed, all of which is now their day.

Escalation across a stack is a routing problem, and routing problems have a known shape. They need a priority order, so urgent escalations are not buried behind batch ones. They need a queue discipline that is deliberate rather than accidental — one queue, or a small set of queues with clear rules, not four systems each improvising. And every handoff between two systems needs a named owner, so that when a pipeline is down, the dropped lead is somebody's defined responsibility rather than nobody's. The stacked-delegation diagram in [Patterns](/systems/patterns) put the human in the center of the composition. This is the honest version of that center: it is a routing problem, and if you do not design it, it designs itself, badly, out of whatever each system happened to do by default.

A related point worth one sentence, because it is what makes any of this debuggable: composition failures are hard to attribute — when an order is wedged, which system's assumption was wrong is not obvious from the outcome — which is the concrete reason the per-system audit trails from [Where the human lives](/systems/where-the-human-lives) stop being optional once you have a stack.

## What this page is for

The other six pages in this section teach you to design a system. This one is the part that begins after you have done that more than once.

The hard problems move to the seams. A composition fails where its systems share state, where its checks are not as independent as they look, and where its escalations were never given a route. None of those failures is fixed by a better agent, because none of them is in an agent. They are in the space between agents — the space that no single system's design ever covers, and that only exists once you have more than one.

If you are running a stack and something is wrong that no individual system seems responsible for, that is not a mystery. That is the expected failure mode of composition, and it is telling you where the design is missing.

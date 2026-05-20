---
title: Where the line is now
lede: What still needs a human in 2026, and why. The line is real, but it moves — the point is to recognize where it is right now and what would move it.
section: systems
---

The last five pages have argued that more work survives delegation than most people think, that the patterns are legible, that the failure modes are knowable, and that the bottleneck is design rather than model capability. This page is the counterweight.

There is work that still needs you. Not because the model is not smart enough — that framing has been wrong every time for the past three years — but because of structural properties of the work itself that no model improvement directly addresses. The four categories below are the honest line in 2026. Some of them will move. The point is to recognize what makes work fall on the wrong side of the line so you can notice when it stops being there.

## High-stakes, irreversible judgment

Decisions where the cost of being wrong is large and the action cannot be undone. Hiring decisions. Firing decisions. Large financial commitments — a contract, an acquisition, a loan. Legal positions taken on the record. Promises made to customers that change the company's obligations.

The argument is not that an agent cannot draft a hiring rubric or score candidates against it. Agents do both, well, all the time. The argument is about *who decides*. A hiring decision is a commitment the company makes; if it is wrong, the cost is borne by the candidate, the team, and the company over time, and reversing it requires another commitment of similar magnitude.

This is the verification-cost principle from [What survives delegation](/systems/what-survives-delegation) in its hardest form. With high-stakes irreversible decisions, the verification *is the next year of consequences*. There is no cheap downstream check. The only way to stay in control of the outcome is to stay in control of the decision.

The right shape for delegation here is not autonomy. It is leverage. An agent that researches every candidate thoroughly, surfaces non-obvious signals, drafts the offer letter, prepares the rejection note — does the slow work of preparing the decision but does not make it. The human still pulls the trigger. The system has compressed the work by ninety percent and left the one percent that has to be human untouched.

## Fast-shifting input distributions

Work where the world changes faster than the system can adapt.

A delegated system is, in effect, a snapshot of judgment frozen at the moment you designed it. The prompts encode what counts as relevant. The tool selection encodes what actions are appropriate. The escalation rules encode where the edges of the role are. Run that snapshot against next month's inputs and it usually still works. Run it against next year's inputs and it usually does not. Run it against a domain where the inputs are moving genuinely fast — regulatory environments under active change, security operations adapting to new attack patterns, fast-moving markets where the relevant signals shift quarterly — and the snapshot starts decaying immediately.

The failure mode is the one from the last page: world-changed-and-nobody-noticed. But there is a structural version of it that no audit cadence catches, where the rate of change in the underlying domain is just genuinely faster than your loop for updating the system. In those domains, you do not have a delegation problem. You have a *staffing* problem. Someone has to be actively reading the new inputs, updating the model of what is happening, and pushing those updates into the system continuously. That someone has to understand the domain. That someone is a person.

These domains will not stay on the wrong side of the line forever. Better tools for distribution drift, better evaluation infrastructure, better online learning will close the gap eventually. They have not closed it yet in 2026.

## Costs borne by someone else, without recourse

Work where the cost of a mistake falls on a third party — a customer, a vendor, a counterparty — who cannot easily be compensated and did not consent to the risk.

This is partly a values argument and partly a structural one. If a delegated system gets something wrong and the cost falls on you, you can absorb it. If it falls on a customer, you can usually compensate them. If it falls on someone who has no relationship with you at all — a person mentioned in an outbound email, a candidate the system rejected, a vendor whose name appears in something the system generated — the cost is real and the path to making it right is unclear or absent.

The cleanest version of this principle: the people who bear the downside of your system should either have given consent or be able to recover when it goes wrong. When neither holds, the system needs a human at the point of action.

The category covers more than it looks like at first. An agent that drafts cold outreach to executives whose names it found online is generating action that affects people who did not opt into the relationship. An agent that scores resumes against criteria the model inferred is making decisions whose costs the candidate bears without visibility. An agent that categorizes user-generated content as a policy violation is making a call the user has no way to appeal. None of these are obviously delegable just because the agent can produce a plausible output. The plausibility is not the question. The accountability is.

## Tasks where verification is the work

Work where you cannot tell whether the output is good without doing the work yourself.

A novel. A strategic document. An original argument. A piece of writing meant to convince a specific person of a specific thing. The output is not evaluable on its surface. You can tell whether it has the right shape — chapters, headings, length, citations — but those tell you nothing about whether it is good. The only way to know whether the novel is any good is to read it. The only way to know whether the argument lands is to follow it through. The verification cost is not just high; it is the same activity as production. The work *is* the verification.

The trap is that the agent can produce something competent-looking that is not actually good, and you cannot tell from a glance. Ship it without reading and you have shipped something bad; read it carefully enough to evaluate and you have done the work. No amount of model improvement removes this — better outputs make it *worse*, because they make the surface harder to distinguish from genuine quality.

The right delegation pattern here is the same as for high-stakes decisions: leverage, not replacement. The agent does the research, the structure, the first pass, the rewrites. The human does the part that has to be human, which in this category is most of the part that matters.

## The line moves

The point of naming these four categories is not to draw a permanent fence. It is to give you the *shape* of what makes work fall on the wrong side of the line so you can recognize when it stops doing so.

Work that was on the wrong side two years ago has moved. Drafting cold outreach was an externalized-cost problem in 2023; thoughtful systems with clear opt-outs, segmented lists, and quality controls have brought significant volumes of it across the line. Codebase refactoring was a verification-is-the-work problem; test suites and incremental PRs turned much of it into something delegable. Customer support triage was a stakes-plus-novelty problem; bounded scope and clear escalation rules made the routine cases delegable while keeping the long tail in human hands.

Work that is on the wrong side now will move similarly, but not all at once and not because the model got smarter. It moves when one of the properties shifts. Verification becomes cheaper. Failure becomes recoverable. The input distribution stabilizes. The externalised cost gets internalised through process or contract. When you see a category move, look at which property changed; you can usually predict the next category by asking where else that property is starting to shift.

The corollary is uncomfortable: work that was on the right side can move back. A pattern that worked for two years can drift into externalised-cost territory if regulation changes. A system that was reliable in a stable market becomes unreliable when the market starts moving. Categories are not promotions. They are positions on a frontier that moves in both directions, and the systems you trusted yesterday are not guaranteed to be trustworthy tomorrow.

## What this section has been for

Six pages, one argument: delegation is a different problem from prompting, the problems are legible, the patterns are knowable, the failure modes are real, the line is honest, and the work that earns a human's attention is the work of designing systems that hold up — not the work the systems were designed to do.

The reader who finishes this section should not have a list of recipes to copy. They should have a frame for reading any "AI business" or "autonomous agent" story they encounter: the discipline to ask which of the four delegable properties are present before they build, the vocabulary to name the four patterns and the four checkpoint positions, and the realism to expect the failure modes from [What breaks in production](/systems/what-breaks) rather than be surprised by them.

If the line moves — and it will — that frame is what tells you where it moved to and what to do about it.

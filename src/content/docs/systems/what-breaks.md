---
title: What breaks in production
lede: Five failure modes, one root cause. The system trusted the agent's report instead of checking the work — and the report said everything was fine.
section: systems
---

A demo system fails loudly — an exception, a bad output, an obvious mistake. A production system fails quietly. The dashboard stays green, the API keeps returning 200, the agent reports success, and somewhere downstream the work has been wrong for three weeks.

There is a single reason this keeps happening, and it is worth stating before the failure modes themselves, because all five are the same mistake wearing different clothes. **A delegated system fails in production when it trusts the agent's report of its own work instead of checking the work independently.** The agent says the task is done. The agent says the lead was low-intent. The agent says the record was updated. The system believes it, because believing it is the path of least resistance, and the belief is wrong often enough to matter.

This is not a model problem. A more capable model still produces a report, and the report is still the agent's account of its own behaviour, and an account is not a verification. The fix is never "a better agent." The fix is always an independent check — something other than the agent that confirms the work was actually done, actually correct, actually in scope. The five failure modes below are five places that check is missing.

## Silent failures

The system runs but stops doing what it was supposed to. Nothing fires. Nothing alerts. The agent keeps responding, the cron keeps firing, the dashboard keeps showing green. The output has quietly gone wrong, and you find out from a downstream consequence — a customer complaint, a dipping metric, a manual spot-check that catches something off.

This is the root cause in its purest form. Traditional software fails on errors; an agent fails on *quality*, and quality is invisible to the monitoring stack. A 200 OK is not evidence of correct work. A clean exit is not evidence anything useful happened. An agent reporting "task complete" is reporting its own belief, and the monitoring layer — built to watch for exceptions, error codes, timeouts — sees a system that looks healthy because none of the signals it knows how to read are firing.

The compounding makes it worse. A delegated system often chains steps. If each step is 95% accurate, a ten-step workflow succeeds about 60% of the time. At 85% per step, about 20%. The math is brutal and entirely invisible, because nobody is grading individual steps — the only thing being graded is the final report, and the final report says fine.

*The missing check.* Verification has to be built into the system and it has to produce evidence that is not the agent's word. Validate the *shape* of every output at every handoff — schema, type, value ranges. Set assertions that fire when an output looks structurally wrong even though the agent thinks it succeeded. Treat any tool error, even a recovered one, as a signal worth logging. Silence is not evidence of success; the system has to actively produce evidence of success, and that evidence has to come from somewhere other than the agent.

## Hallucinated tool calls

The agent calls a real tool with plausible but wrong arguments. It reads a CRM record correctly and writes back to a different one. It calls an API with a field name that sounds right and does not exist. It fabricates an ID, queries a database with it, gets zero rows, and reports "no results found" as the answer.

The root cause again: the tool call *succeeds*, so the system trusts it. The API returns 200. The query runs without error. A schema-validation layer, if one exists, confirms the input was well-formed — not that it was correct. The agent confidently reports the result of an operation that did the wrong thing, and every layer between the agent and the dashboard nods it through, because the only thing any of them checked was that the call did not crash.

Self-generated identifiers are where this turns dangerous. An agent told to update "the customer who emailed yesterday," holding fuzzy lookup tools, will produce something that *looks* like a customer ID. Sometimes it points at a real but wrong customer. Sometimes at nothing. The agent cannot tell a correct lookup from a confident guess, because both return a value and neither raises an error.

*The missing check.* Two layers. Constrain what the agent can touch — narrow tools with explicit input schemas beat broad tools with permissive arguments; an agent that can only update records by an ID returned from a real lookup cannot invent one. Then verify side effects against the original input: if the agent claims it updated customer X, something other than the agent should confirm the record it actually wrote to *is* X. Checking the final action against the original input — not against the agent's intermediate outputs — catches a class of these that nothing else does.

## Cost runaway

The system was meant to make a few calls per invocation. It made ten thousand. A retry loop never resolved. A context window grew unbounded across a long session. An agent built to handle one ticket started chewing through the whole queue. You find out from the invoice, not the logs.

The root cause has a particular shape here: the system trusted the agent's judgment about *when to stop*. The agent decided the work needed another iteration, another sub-task, another page of results — and nothing independent was holding a limit. None of these involve the agent doing anything overtly wrong. The agent is doing what it was asked, longer than anyone expected, because the only thing deciding how long was the agent.

This is the failure mode behind the "I left an agent running overnight and spent a fortune" stories. A loop that should converge but cannot, because the failure it keeps hitting is not one it can fix. A planner that recursively decomposes a task until the budget is gone. A tool returning paginated results the agent reads all of.

*The missing check.* Hard budgets at every level — tokens per run, dollars per day, iterations per loop, wall-clock per invocation — enforced by something other than the agent. Treat a budget breach as an alert that pages a human, not a silent cap that quietly stops the work. The principle is structural: the best error handling is the error made impossible. An agent with a hard token ceiling cannot burn a fortune in a retry loop, because the loop dies first. The cap is the check.

## Scope drift

The system slowly starts handling things it was not designed for. A support triage agent begins answering sales leads that landed in the same inbox. An SDR agent starts fielding product questions it has no context for. A code agent told to fix lint errors starts refactoring whole modules.

The root cause: nothing independent was checking that the work stayed *in scope*, so the only thing defining scope was the agent's judgment of what was worth doing — and the agent's judgment is permissive. "Help the user" is a wish. Claude will generalise it into helping with whatever shows up, because being useful in adjacent directions is the model behaving consistently, not the model malfunctioning. The system simply left the boundary to the agent and the agent did what agents do.

The damage shows up as quality degradation, not visible error. The agent is now doing two jobs and is worse at the one you designed for. Escalation patterns tuned for the original scope start looking strange. Customer-facing replies feel slightly off. The metrics drift, slowly, and a month later the system is doing something subtly different from what anyone designed.

*The missing check.* The boundary has to live somewhere other than the agent's discretion. Define what the agent must *not* handle, in the prompt and — more reliably — in the tools: a support agent with no access to sales tools cannot work a sales lead even when it wants to. Then watch the distribution of what the system actually does over time. If the shape of the work is changing and you did not change the design, the scope is drifting and nothing told you.

## World-changed-and-nobody-noticed

The system was designed against last quarter's inputs. The world moved on. New product features the agent has never heard of. New customer segments with new shapes of question. A renamed CRM field. A pricing model whose old version the prompts still describe.

The root cause is the same one seen from a different angle. The system trusted that the world it was built for is the world it is still running in — and nothing independent was checking that assumption. The agent is doing exactly what it was designed to do. The design was right when it was made and is wrong now. This failure mode is barely the agent's fault at all; it is the system having no check on its own staleness.

The dashboard does not catch it because the dashboard tracks metrics, not assumptions. Misclassifications creep in because the categories the agent chooses between were drawn for inputs that no longer dominate. Replies go subtly wrong because the facts the agent cites are no longer current. Lead scoring drifts because the ICP moved and the prompt did not.

*The missing check.* Schedule the audit that nobody will run unprompted — quarterly is a reasonable start. Pull a sample of recent outputs, compare against current ground truth, ask whether the system's model of the world still matches the world. Watch for distribution shift directly: cluster recent inputs and notice when new clusters appear that the system was never designed for. Treat schema changes in external systems — a renamed field, an altered API contract, a vendor's new response format — as a first-class risk, because the most expensive incidents in this category come from exactly that and arrive with no warning at all.

## Reference

<svg class="svg-wide" viewBox="0 0 720 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Reference table: five failure modes with their early warning signs and mitigation directions.">
  <!-- header row -->
  <rect x="0" y="0" width="720" height="36" fill="#d97706" fill-opacity="0.12"/>
  <text x="12" y="23" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="0.5">FAILURE MODE</text>
  <text x="220" y="23" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="0.5">EARLY WARNING SIGN</text>
  <text x="460" y="23" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="0.5">THE MISSING CHECK</text>
  <!-- column dividers -->
  <line x1="215" y1="0" x2="215" y2="310" stroke="currentColor" stroke-width="1" stroke-opacity="0.2"/>
  <line x1="455" y1="0" x2="455" y2="310" stroke="currentColor" stroke-width="1" stroke-opacity="0.2"/>
  <!-- row 1 -->
  <rect x="0" y="36" width="720" height="52" fill="currentColor" fill-opacity="0.03"/>
  <text x="12" y="55" fill="currentColor" font-family="ui-monospace, monospace" font-size="10" font-weight="600" opacity="0.9">Silent failures</text>
  <text x="220" y="52" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">Output volume normal but</text>
  <text x="220" y="65" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">downstream metric drifts;</text>
  <text x="220" y="78" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">no errors logged</text>
  <text x="460" y="52" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">Output-shape assertions; evidence</text>
  <text x="460" y="65" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">of success from something other</text>
  <text x="460" y="78" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">than the agent's report</text>
  <!-- row 2 -->
  <rect x="0" y="88" width="720" height="52" fill="currentColor" fill-opacity="0"/>
  <text x="12" y="107" fill="currentColor" font-family="ui-monospace, monospace" font-size="10" font-weight="600" opacity="0.9">Hallucinated tool calls</text>
  <text x="220" y="104" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">Tool calls succeed but side effects</text>
  <text x="220" y="117" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">don't match input; "no results"</text>
  <text x="220" y="130" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">answers that feel suspicious</text>
  <text x="460" y="104" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">Narrow tools with explicit schemas;</text>
  <text x="460" y="117" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">verify side effects against</text>
  <text x="460" y="130" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">the original input</text>
  <!-- row 3 -->
  <rect x="0" y="140" width="720" height="52" fill="currentColor" fill-opacity="0.03"/>
  <text x="12" y="159" fill="currentColor" font-family="ui-monospace, monospace" font-size="10" font-weight="600" opacity="0.9">Cost runaway</text>
  <text x="220" y="156" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">Token usage growing per run;</text>
  <text x="220" y="169" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">retry counts climbing;</text>
  <text x="220" y="182" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">invoice surprises</text>
  <text x="460" y="156" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">Hard budgets on tokens, dollars,</text>
  <text x="460" y="169" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">iterations, time — enforced</text>
  <text x="460" y="182" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">outside the agent</text>
  <!-- row 4 -->
  <rect x="0" y="192" width="720" height="52" fill="currentColor" fill-opacity="0"/>
  <text x="12" y="211" fill="currentColor" font-family="ui-monospace, monospace" font-size="10" font-weight="600" opacity="0.9">Scope drift</text>
  <text x="220" y="208" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">System handling inputs outside</text>
  <text x="220" y="221" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">original design; quality drops</text>
  <text x="220" y="234" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">on core scope</text>
  <text x="460" y="208" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">Boundaries in prompts and tools;</text>
  <text x="460" y="221" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">watch the distribution of work</text>
  <text x="460" y="234" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">over time</text>
  <!-- row 5 -->
  <rect x="0" y="244" width="720" height="66" fill="currentColor" fill-opacity="0.03"/>
  <text x="12" y="263" fill="currentColor" font-family="ui-monospace, monospace" font-size="10" font-weight="600" opacity="0.9">World-changed-and-</text>
  <text x="12" y="276" fill="currentColor" font-family="ui-monospace, monospace" font-size="10" font-weight="600" opacity="0.9">nobody-noticed</text>
  <text x="220" y="260" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">Misclassifications creep up over</text>
  <text x="220" y="273" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">weeks; replies cite facts that</text>
  <text x="220" y="286" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">are no longer true</text>
  <text x="460" y="260" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">Scheduled audits against current</text>
  <text x="460" y="273" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">ground truth; treat external</text>
  <text x="460" y="286" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">schema changes as a risk</text>
  <!-- outer border -->
  <rect x="0" y="0" width="720" height="310" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.2"/>
  <!-- row dividers -->
  <line x1="0" y1="36" x2="720" y2="36" stroke="currentColor" stroke-width="1" stroke-opacity="0.2"/>
  <line x1="0" y1="88" x2="720" y2="88" stroke="currentColor" stroke-width="1" stroke-opacity="0.2"/>
  <line x1="0" y1="140" x2="720" y2="140" stroke="currentColor" stroke-width="1" stroke-opacity="0.2"/>
  <line x1="0" y1="192" x2="720" y2="192" stroke="currentColor" stroke-width="1" stroke-opacity="0.2"/>
  <line x1="0" y1="244" x2="720" y2="244" stroke="currentColor" stroke-width="1" stroke-opacity="0.2"/>
</svg>

## The one check

Five failure modes, one root cause, one fix repeated five times: put something other than the agent in charge of confirming the work.

That is the whole page. The agent's report is not a verification — not because the agent is dishonest, but because a report of one's own work is structurally not a check on it. Every failure mode here is a place where the system accepted the report. Every fix is an independent check installed where the report used to be trusted. When you design a system, the question to ask of every step is not "will the agent do this correctly" — it is "if the agent does this wrong, what catches it." If the answer is nothing, you have found the next thing that will break.

The next page is about the work that no check makes safe to delegate — where the line still is in 2026, and why.

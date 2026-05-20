---
title: What breaks in production
lede: The honest list of failure modes. Most of them don't trip alarms, which is why they make it to production.
section: systems
---

A demo system fails loudly — an exception, a bad output, an obvious mistake. A production system fails quietly. The dashboard stays green, the API keeps returning 200, the agent reports success, and somewhere downstream the work has been wrong for three weeks. The hardest failures in delegated systems are not the ones that crash. They are the ones that keep running.

This page is the honest list of what goes wrong, with brief mitigation directions for each. Not full solutions — those depend on the system. The goal here is pattern recognition. If you have seen one of these in your own work, you have seen the others coming.

## Silent failures

The system runs but stops doing what it was supposed to. Nothing fires. Nothing alerts. The agent keeps responding, the cron keeps firing, the dashboard keeps showing green. The output has quietly gone wrong, and you find out from a downstream consequence — a customer complaint, a dipping metric, a manual spot-check that catches something off.

The reason this happens so often is structural. Traditional software fails on errors; AI agents fail on *quality*. A 200 OK response is not evidence of correct work. An agent that reports task completion is not evidence the task was completed. A run that exits cleanly is not evidence anything useful happened. The standard monitoring stack watches for the signals software typically emits when it breaks — exceptions, error codes, timeouts — and an agent failing silently emits none of them.

The compounding makes it worse. A delegated system often chains steps. If each step is 95% accurate, a ten-step workflow succeeds only 60% of the time. At 85% per-step accuracy, it succeeds 20% of the time. The math is brutal and largely invisible, because nobody is grading individual steps.

*Mitigation direction.* Build verification into the system itself, not on top of it. Validate the *shape* of outputs at every handoff — schema, type, value ranges — not just whether the call returned. Set quality assertions that fire when an output looks structurally wrong, even if the agent thinks the work succeeded. Treat any tool error, even one the agent recovered from, as a signal worth logging. The principle is that silence is not evidence of success; the system has to actively produce evidence of success, and the evidence has to be something other than the agent's own report.

## Hallucinated tool calls

The agent calls a real tool with plausible-looking but wrong arguments. It reads a CRM record correctly and writes back to a different one. It calls an API with a field name that sounds right but does not exist in your schema. It fabricates an ID, queries a database with it, gets zero rows back, and reports "no results found" as the answer.

This is one of the most common production failures and one of the hardest to catch, because the tool call itself succeeds. The API returns 200. The database query runs without errors. The schema-validation layer, if there even is one, only checks that the input was well-formed, not that it was correct. The agent confidently reports the result of an operation that did the wrong thing.

The pattern is worse with self-generated identifiers. An agent that needs to update "the customer who emailed yesterday" and is given fuzzy lookup tools will invent an ID that *looks* like a customer ID. Sometimes it points to a real but wrong customer. Sometimes it points to nothing. Either way, the agent has no way to tell the difference between a correct lookup and a confident guess.

*Mitigation direction.* Two layers. First, constrain what the agent can touch — narrower tools with explicit input schemas beat broad tools with permissive arguments. An agent that can only update records by their actual ID, fetched from a real lookup, cannot make up IDs. Second, verify side effects against the original input. If the agent claims it updated customer X, the system should be able to confirm that the customer it actually wrote to matches X. Source-grounded re-verification at terminal stages — checking the final action against the original input rather than against intermediate agent outputs — catches a class of these failures that nothing else does.

## Cost runaway

The system was supposed to make a small number of calls per invocation. It made ten thousand instead. A retry loop never resolved. A context window grew unbounded over a long session. An agent designed to handle one ticket at a time started chewing through every ticket in the queue. You find out from the invoice, not the logs.

This is the failure mode that produces the "I left an agent running overnight and spent $40,000" stories. The triggers are predictable: a loop that should converge but does not because the failure mode is not one the agent can fix. A tool that returns paginated results the agent tries to read all of. A planning agent that decides the work is more complex than expected and recursively decomposes it into sub-tasks until token budget runs out. None of these involve the agent doing anything overtly wrong; they involve the agent doing what it was asked to do, longer than anyone expected.

*Mitigation direction.* Set hard budgets at every level: tokens per run, dollars per day, iterations per loop, time-to-completion per invocation. Treat budget breaches as alerts that page someone, not as silent caps that just stop the work. The principle is structural: the best error handling is the error that is structurally impossible. An agent with a hard token ceiling cannot spend $180 in a retry loop, because the loop dies at $5. An agent with a maximum iteration count cannot recurse forever. The cap is the fix.

## Scope drift

The system slowly starts handling things it was not designed for. A support triage agent begins replying to sales leads it happens to find in the same inbox. An SDR agent starts answering product questions it was never given the context for. A code agent that was supposed to fix lint errors starts refactoring whole modules.

Scope drift is one of the most common ways a working system stops working, and it is almost always caused by permissive prompts. "Help the user" is a wish; the agent will generalize that into helping with whatever shows up. The agent's eagerness to be useful in adjacent directions is not a bug in the model. It is the model behaving consistently. The system has just given it too much room.

The damage shows up as quality degradation, not as visible errors. The agent is now doing two jobs and is worse at the one you actually designed for. The escalation patterns you tuned for the original scope start looking weird. The customer-facing replies feel slightly off. The metrics drift, slowly, and a month later the system is doing something subtly different from what you designed.

*Mitigation direction.* Define the boundary explicitly in the prompt and in the tools. Tell the agent what it should *not* handle, not just what it should. Wire refusal paths into the tool layer: a support agent without access to sales tools cannot handle a sales lead even if it wants to. Watch the distribution of what the system is doing over time — if the shape of the work is changing without you changing the design, the scope is drifting.

## World-changed-and-nobody-noticed

The system was designed against last quarter's input distribution. The world has moved on. New product features the agent does not know about. New customer segments with new shapes of questions. A new regulatory environment. A new pricing model the agent's prompts still reference the old version of.

The system is not broken. It is operating against a model of the world that no longer matches the world. Misclassifications creep in because the categories the agent is choosing between were designed for inputs that no longer dominate. Replies get subtly wrong because the agent is citing facts that are no longer current. Lead scoring drifts because the ICP shifted and the prompt did not.

This failure mode is unusual in that it is not really the agent's fault. The agent is doing exactly what it was designed to do. The design was correct when it was made and is no longer correct now. The dashboard does not catch this because the dashboard tracks metrics, not assumptions.

*Mitigation direction.* Schedule the audit. Quarterly is a reasonable starting cadence — pull a sample of recent outputs, compare against current ground truth, ask whether the system's worldview still matches. Watch for distribution shift directly: cluster recent inputs and notice when new clusters appear that the system was not designed for. Treat schema drift in external systems (a CRM field renamed, an API contract changed, a vendor's response format updated) as a first-class risk. Real production incidents — credentials silently rotating, automated cert renewal failing for three months, vendor schema changes breaking tool calls overnight — almost always come from this category.

## Reference

<svg class="svg-wide" viewBox="0 0 720 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Reference table: five failure modes with their early warning signs and mitigation directions.">
  <!-- header row -->
  <rect x="0" y="0" width="720" height="36" fill="#d97706" fill-opacity="0.12"/>
  <text x="12" y="23" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="0.5">FAILURE MODE</text>
  <text x="220" y="23" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="0.5">EARLY WARNING SIGN</text>
  <text x="460" y="23" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="0.5">MITIGATION DIRECTION</text>
  <!-- column dividers -->
  <line x1="215" y1="0" x2="215" y2="310" stroke="currentColor" stroke-width="1" stroke-opacity="0.2"/>
  <line x1="455" y1="0" x2="455" y2="310" stroke="currentColor" stroke-width="1" stroke-opacity="0.2"/>
  <!-- row 1 -->
  <rect x="0" y="36" width="720" height="52" fill="currentColor" fill-opacity="0.03"/>
  <text x="12" y="55" fill="currentColor" font-family="ui-monospace, monospace" font-size="10" font-weight="600" opacity="0.9">Silent failures</text>
  <text x="220" y="52" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">Output volume normal but</text>
  <text x="220" y="65" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">downstream metric drifts;</text>
  <text x="220" y="78" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">no errors logged</text>
  <text x="460" y="52" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">Output-shape assertions, not just</text>
  <text x="460" y="65" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">error catches; verification must</text>
  <text x="460" y="78" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">produce evidence beyond agent's report</text>
  <!-- row 2 -->
  <rect x="0" y="88" width="720" height="52" fill="currentColor" fill-opacity="0"/>
  <text x="12" y="107" fill="currentColor" font-family="ui-monospace, monospace" font-size="10" font-weight="600" opacity="0.9">Hallucinated tool calls</text>
  <text x="220" y="104" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">Tool calls succeed but side effects</text>
  <text x="220" y="117" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">don't match input; "no results"</text>
  <text x="220" y="130" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">answers that feel suspicious</text>
  <text x="460" y="104" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">Narrower tools with explicit schemas;</text>
  <text x="460" y="117" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">verify side effects against</text>
  <text x="460" y="130" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">original input, not agent output</text>
  <!-- row 3 -->
  <rect x="0" y="140" width="720" height="52" fill="currentColor" fill-opacity="0.03"/>
  <text x="12" y="159" fill="currentColor" font-family="ui-monospace, monospace" font-size="10" font-weight="600" opacity="0.9">Cost runaway</text>
  <text x="220" y="156" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">Token usage growing per run;</text>
  <text x="220" y="169" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">retry counts climbing;</text>
  <text x="220" y="182" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">invoice surprises</text>
  <text x="460" y="156" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">Hard budgets at every level --</text>
  <text x="460" y="169" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">tokens, dollars, iterations, time;</text>
  <text x="460" y="182" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">structural caps, not soft limits</text>
  <!-- row 4 -->
  <rect x="0" y="192" width="720" height="52" fill="currentColor" fill-opacity="0"/>
  <text x="12" y="211" fill="currentColor" font-family="ui-monospace, monospace" font-size="10" font-weight="600" opacity="0.9">Scope drift</text>
  <text x="220" y="208" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">System handling inputs outside</text>
  <text x="220" y="221" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">original design; quality drops</text>
  <text x="220" y="234" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">on core scope</text>
  <text x="460" y="208" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">Explicit boundaries in prompts AND</text>
  <text x="460" y="221" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">tools; refusal paths wired into</text>
  <text x="460" y="234" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">the tool layer</text>
  <!-- row 5 -->
  <rect x="0" y="244" width="720" height="66" fill="currentColor" fill-opacity="0.03"/>
  <text x="12" y="263" fill="currentColor" font-family="ui-monospace, monospace" font-size="10" font-weight="600" opacity="0.9">World-changed-and-</text>
  <text x="12" y="276" fill="currentColor" font-family="ui-monospace, monospace" font-size="10" font-weight="600" opacity="0.9">nobody-noticed</text>
  <text x="220" y="260" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">Misclassifications creep up over</text>
  <text x="220" y="273" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">weeks; replies cite outdated facts;</text>
  <text x="220" y="286" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">external schema drift breaks calls</text>
  <text x="460" y="260" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">Scheduled audits; cluster recent</text>
  <text x="460" y="273" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">inputs to surface new categories;</text>
  <text x="460" y="286" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">treat external schema changes as</text>
  <text x="460" y="299" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.7">first-class risk</text>
  <!-- outer border -->
  <rect x="0" y="0" width="720" height="310" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.2"/>
  <!-- row dividers -->
  <line x1="0" y1="36" x2="720" y2="36" stroke="currentColor" stroke-width="1" stroke-opacity="0.2"/>
  <line x1="0" y1="88" x2="720" y2="88" stroke="currentColor" stroke-width="1" stroke-opacity="0.2"/>
  <line x1="0" y1="140" x2="720" y2="140" stroke="currentColor" stroke-width="1" stroke-opacity="0.2"/>
  <line x1="0" y1="192" x2="720" y2="192" stroke="currentColor" stroke-width="1" stroke-opacity="0.2"/>
  <line x1="0" y1="244" x2="720" y2="244" stroke="currentColor" stroke-width="1" stroke-opacity="0.2"/>
</svg>

## The unifying principle

Read these five together and the pattern is clear. The system has to produce evidence of correctness that is not the agent's own claim, the dashboard has to track quality and not just liveness, and the budgets have to be structural rather than advisory. The agent is not the problem. The system around the agent is the problem, and the failure modes show up wherever the system was relying on the agent's self-report instead of an independent check.

The next page is about the work that still requires you regardless of how good your system is — the line that has not moved yet, and why.

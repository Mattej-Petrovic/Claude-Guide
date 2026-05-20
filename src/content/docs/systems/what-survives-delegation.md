---
title: What survives delegation
lede: The four properties that decide whether a task can actually be handed off, and the principle that catches the rest.
section: systems
---

The last page argued that delegation is a different problem from prompting. This page is about which tasks actually survive being handed off. Not in theory. In practice — left to run unattended, on real inputs you have not seen, with the human pulled out of the loop.

Most tasks do not survive. That is the honest answer, and it is what stops this section from being hype. The set of work you can hand to Claude and walk away from is smaller than the set of work Claude can help you with in a session, and the gap between the two is where most failed automation projects live. People look at what Claude can do in a chat, assume the same task will run unattended, and ship something that quietly breaks the moment they stop watching it.

What follows is the test. Four properties, a verification cost principle that catches the tasks the four properties miss, and the inversion: what the same rules tell you about the tasks you cannot delegate yet.

## The four properties

A task is a real candidate for delegation when all four of these hold. Miss one and the system will work in demos and fail in production. Miss two and it will not even work in demos.

**Repetition.** The task happens often enough to be worth designing for. Designing a delegated system is not free — you are encoding judgment, building context, defining triggers, choosing checkpoints. For a task you do once a quarter, it is cheaper to just do it. For a task that fires twenty times a day, the design cost amortizes immediately. The threshold is not a number; it is the point where the time spent designing the system is less than the time you would have spent doing the task by hand. Below that line, you are building infrastructure for the sake of building infrastructure.

The shape of repetition also matters, not just the count. A task that runs twenty times a day but takes different shapes each time is not repetition — it is twenty different tasks pretending to be one. Real repetition has a stable structure underneath the surface variation. The inputs differ; the work does not.

**Clear success criteria.** You can tell whether it worked without re-doing it yourself. This is the property most often missing in tasks that sound delegable. "Write me a good draft" has no success criteria. "Write a draft that mentions these three points in this order, in under 400 words" does. The criteria do not have to be machine-checkable, but they have to exist outside your head. If the only test for whether the output is good is you reading it and reacting, you are still in the loop — you have just moved your work from doing the task to reviewing the task.

The strongest version of this property is when something downstream catches failures for you. A test suite that runs after Claude writes code. A schema that rejects malformed CRM updates. A human recipient who will reply if the email is off. When the verification is something the system already does, the success criteria are doing the work without you.

**Tolerable failure modes.** When this task fails, the damage is bounded. The agent gets it wrong sometimes; that is not a hypothetical. The question is what happens when it does. Drafting an internal Slack summary that nobody acts on without reading is tolerable. Auto-replying to a customer with the wrong information is harder. Triggering a $40,000 wire transfer on a misread invoice is not tolerable at all.

Tolerable does not mean "rare." It means "recoverable." A failure mode is tolerable if you can catch it before damage compounds, or compensate for it cheaply once you notice. An autonomous code refactor that breaks the build is tolerable because the build fails loudly and you revert the commit. An autonomous code refactor that introduces a subtle logic bug that ships to production three weeks later is not, even though the model made the same kind of mistake in both cases. The model's behavior is the same; the system's tolerance for failure is what changed.

**Bounded scope.** The task has edges. It does not drift into adjacent decisions. An agent that handles inbound support tickets should handle inbound support tickets — not start replying to sales leads it happens to find in the same inbox, not start updating customer records it was not asked to touch, not start escalating things to engineering it has no authority over. Scope drift is one of the most common ways a working system stops working: the prompt was permissive, the agent generalized, and a month later it is doing things you never designed it for, badly.

Bounded scope is the property that protects you from the agent's own helpfulness. Claude wants to be useful. If you give it room to be useful in adjacent directions, it will, and the quality of work in those directions will be worse than the quality of work in the one you actually designed for. The edge of the task is not a limitation. It is a feature.

## The verification cost principle

Even when the four properties hold, there is a separate trap that catches a lot of attempted delegations: **if checking Claude's work takes as long as doing it yourself, you have not delegated. You have added a step.**

This sounds obvious. It is not. The trap is subtle because the work feels like delegation. Claude produces an output. You review it. You catch the issues. You ship it. From a distance, the human has been moved out of execution. From close up, the human has been moved into review, which is the same cost in different clothes — sometimes more expensive, because reviewing someone else's work is often harder than producing your own.

The cleanest test: if you removed Claude from the workflow and did the task yourself, would the total time go up or down? If down, you have not delegated. You have inserted an agent into a process that was faster without it. The agent is making you feel productive while costing you time.

The version of this trap that catches engineers especially hard is using a second LLM call to check the first one. It sounds clever — let the model verify itself. In practice the second call is often slower and more expensive than the first, frequently wrong in correlated ways with the first, and adds a layer of opacity that makes debugging harder. The verifier needs to be cheaper than the work, or the math does not work. A test suite is cheaper. A schema is cheaper. A linter is cheaper. Another agent is not.

This is why downstream verification beats explicit review for most delegable work. The system already had to check the output for some other reason; the verification is free. When the system does not already check, you have to build the check — and the check has to be cheap enough that it does not collapse the gains from the delegation.

## The matrix

The two dimensions that decide most cases are how often the task repeats and how expensive verification is. Plotted together they map out where delegation belongs and where it does not.

<svg class="svg-wide" viewBox="0 0 720 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 2x2 matrix with repetition on the horizontal axis (low to high) and verification cost on the vertical axis (low to high). Top-right: delegate with a checkpoint. Bottom-right: delegate fully. Top-left: don't bother. Bottom-left: do it yourself.">
  <!-- axes -->
  <line x1="100" y1="420" x2="655" y2="420" stroke="currentColor" stroke-width="1.5" stroke-opacity="0.5"/>
  <polygon points="648,415 660,420 648,425" fill="currentColor" fill-opacity="0.5"/>
  <line x1="100" y1="420" x2="100" y2="65" stroke="currentColor" stroke-width="1.5" stroke-opacity="0.5"/>
  <polygon points="95,72 100,60 105,72" fill="currentColor" fill-opacity="0.5"/>
  <!-- axis labels -->
  <text x="380" y="455" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700" letter-spacing="1" opacity="0.7">REPETITION</text>
  <text x="115" y="435" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.5" font-style="italic">low</text>
  <text x="645" y="435" text-anchor="end" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.5" font-style="italic">high</text>
  <text x="40" y="240" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700" letter-spacing="1" opacity="0.7" transform="rotate(-90, 40, 240)">VERIFICATION COST</text>
  <text x="85" y="415" text-anchor="end" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.5" font-style="italic">low</text>
  <text x="85" y="75" text-anchor="end" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.5" font-style="italic">high</text>
  <!-- quadrant dividers -->
  <line x1="380" y1="420" x2="380" y2="60" stroke="currentColor" stroke-width="1" stroke-opacity="0.25" stroke-dasharray="3 3"/>
  <line x1="100" y1="240" x2="660" y2="240" stroke="currentColor" stroke-width="1" stroke-opacity="0.25" stroke-dasharray="3 3"/>
  <!-- top left: low repetition, high verification cost -->
  <text x="120" y="90" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.5">DON'T BOTHER</text>
  <text x="120" y="110" fill="currentColor" font-family="ui-monospace, monospace" font-size="11" opacity="0.85" font-weight="600">delegation does not fit</text>
  <text x="120" y="140" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">Rare and hard to check.</text>
  <text x="120" y="156" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">You're either doing it yourself</text>
  <text x="120" y="172" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">or you're shipping things you</text>
  <text x="120" y="188" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">can't verify.</text>
  <text x="120" y="216" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">e.g. one-off legal review,</text>
  <text x="120" y="230" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">a contract you'll sign once</text>
  <!-- top right: high repetition, high verification cost -->
  <text x="400" y="90" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.5">DELEGATE WITH A CHECKPOINT</text>
  <text x="400" y="110" fill="currentColor" font-family="ui-monospace, monospace" font-size="11" opacity="0.85" font-weight="600">human stays in the loop, less often</text>
  <text x="400" y="140" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">Repeats enough to be worth</text>
  <text x="400" y="156" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">designing for, but you cannot</text>
  <text x="400" y="172" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">leave verification to the system.</text>
  <text x="400" y="188" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">Async review, not per-action.</text>
  <text x="400" y="216" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">e.g. content drafts, outbound</text>
  <text x="400" y="230" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">emails, customer-facing replies</text>
  <!-- bottom left: low repetition, low verification cost -->
  <text x="120" y="278" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.5">DO IT YOURSELF</text>
  <text x="120" y="298" fill="currentColor" font-family="ui-monospace, monospace" font-size="11" opacity="0.85" font-weight="600">design cost outweighs the gain</text>
  <text x="120" y="328" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">Easy to check, but happens</text>
  <text x="120" y="344" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">so rarely the system isn't</text>
  <text x="120" y="360" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">worth building.</text>
  <text x="120" y="388" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">e.g. annual report formatting,</text>
  <text x="120" y="402" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">a single migration script</text>
  <!-- bottom right: high repetition, low verification cost -->
  <text x="400" y="278" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.5">DELEGATE FULLY</text>
  <text x="400" y="298" fill="currentColor" font-family="ui-monospace, monospace" font-size="11" opacity="0.85" font-weight="600">the actual sweet spot</text>
  <text x="400" y="328" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">Happens often, output is</text>
  <text x="400" y="344" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">checked by something other</text>
  <text x="400" y="360" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6">than you. The system can run.</text>
  <text x="400" y="388" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">e.g. lint fixes against a test</text>
  <text x="400" y="402" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">suite, ticket triage, log analysis</text>
</svg>

The bottom-right quadrant is the sweet spot, and most of what works in production lives there. The top-right quadrant — high repetition, high verification cost — is where most real systems end up needing a human checkpoint. That is not a failure of the design. That is the design. The next page on patterns is mostly about how to structure systems for these two quadrants in particular.

The two quadrants on the left are the warning. Low repetition is where automation enthusiasts waste the most time, building infrastructure for tasks that did not earn it. The top-left is where the most expensive mistakes happen — rare, high-stakes work handed to an agent because it looked similar to work the agent did well elsewhere.

## The inversion: what the rules tell you about what cannot be delegated

Read the four properties backwards and you get a portrait of what does not survive.

Tasks that happen once or twice cannot justify the design cost — you would spend more time encoding the judgment than just exercising it. Tasks without clear success criteria cannot be checked by anything but you, which means you never actually leave the loop. Tasks with intolerable failure modes — irreversible decisions, large financial commitments, anything that compounds quickly when it goes wrong — should not be left to run unattended even if the model would usually get them right, because "usually" is what shows up in production. And tasks without bounded scope blur into the work next to them, which means the agent's behavior is always partly defined by what it happens to encounter, not what you designed it for.

Most "high-stakes judgment" objections to delegation are really one of these four in disguise. A hiring decision fails the repetition test (you are not making the same call enough to amortize the design) and the failure mode test (the wrong hire is expensive and slow to undo). A novel strategic call fails the success criteria test (you do not know what "right" looks like until much later). A creative project with no obvious end state fails bounded scope (the work keeps generating its own next steps).

The point is not that these tasks will never be delegable. It is that the rules will tell you when they become delegable, and they do not become delegable because the model got smarter. They become delegable when one of the four properties shifts — when the task starts repeating, when the success criteria sharpen, when the failure mode becomes recoverable, when the scope tightens. That is what to watch for. Not a better model. A clearer property.

## How to use this

Before designing a system, run the task against the four properties. If any is missing, do not start. Either change the scope of the task until the property holds, or leave it as work you do yourself.

If all four hold, run the verification cost principle. If checking the output takes as long as producing it, you have not actually found a delegable task — you have found a task where Claude can help in a session.

If both pass, you have something worth designing. The rest of the section is about how to design it: the shapes these systems take, where the human stays in the loop, what breaks once they are running, and what still genuinely needs you no matter how clean the four properties look.

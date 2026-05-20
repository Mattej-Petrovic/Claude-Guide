---
title: The shift
lede: From using Claude to delegating to it. Why session and system are different problems.
section: systems
---

The rest of this guide is about using Claude. This section is about delegating to it. The two sound like points on the same spectrum and they are not. They are different problems, with different failure modes, and being good at the first does not automatically make you good at the second.

The fundamental shift in mental model: **in a session, you are doing the work and Claude is making you faster at it. In a system, Claude is doing the work and you are not in the room.** You designed the conditions that make it run. Something else triggered it. Something else will receive the output. Your judgment is no longer in the loop, except where you deliberately put it back.

That is not a difference in degree. It is a difference in role. As a tool user, you supply judgment turn by turn. As a system designer, you encode it once and trust the encoding to hold.

## Tool versus labor

The most useful way to feel the difference is to ask, of any given Claude interaction, who is doing the work.

In a chat session, you are. You hold the goal. You read each output and decide whether it is good enough. You correct the bad ones, accept the good ones, and prompt the next turn. Claude is sharp, fast, sometimes wrong, always under your hand. If it makes a mistake, you catch it in the same minute, because you are the next step in the loop. The work being done is yours; Claude is the tool you are doing it with.

In a system, the work being done is Claude's. Something arrives — a webhook, a schedule firing, a new row in a database — and Claude reads it, decides what to do, and acts. You are not the next step. The next step is whatever the system was designed to hand off to: a CRM update, an email sent, a PR opened. If Claude makes a mistake, nobody catches it in the same minute. Maybe nobody catches it for a week.

This is the tool-versus-labor distinction, and it is doing more work than it looks like it is. When Claude is a tool, the relevant question is "how do I get the best output from this turn." When Claude is labor, the relevant question is "what role am I putting in place, and what do I need to be true for it to do that role reliably without me." The first question is about prompting. The second is about design.

## Why "automation" is the wrong word

Most automation content treats the move from session to system as a question of *what tasks can be scripted*. That framing produces toy systems. The reason is that automation and delegation are different things, and the distinction is doing the work.

Automation is scripted steps. When X happens, do Y. A Zapier zap that forwards every email from a specific sender to a specific channel is automation. The path is the same every time. There is no decision point inside it. The only judgment in the system is the judgment you put in when you built it.

Delegation is outcomes with judgment. When something arrives, decide what it is and handle it. An agent that reads incoming email, classifies it, drafts a reply for routine cases, and escalates anything genuinely complex is delegation. The path is different every time, because the agent is making decisions inside the loop. The judgment is being applied in real time, by Claude, on inputs you have not seen.

This matters because the design questions are different. For automation, you need to know the path. For delegation, you need to know what the agent should consider, what it has access to, what counts as a routine case versus an escalation, what authority it has, what happens when it gets confused. You are not writing a script. You are putting a role in place — and roles fail like roles fail. A confused junior employee escalates badly. A confused agent does the same thing, except faster, and at three in the morning, and to a thousand emails.

Asking "what can I script" gets you a pile of zaps. Asking "what role can Claude hold" gets you a system that holds together because you designed it to.

## What changes about your job

If you take the reframe seriously, the work in front of you changes. You stop optimizing prompts and start designing conditions. The conditions are a small handful of things, and the rest of this section is about how to think through each of them.

- **What triggers the work.** A session is triggered by you typing. A system has to be triggered by something — an event, a schedule, a message in a queue. The choice of trigger shapes everything downstream.
- **What Claude can see and touch.** A session inherits whatever context you paste in and whatever tools you allow. A system has to be given context deliberately, because nobody is going to paste anything in. Access is a design choice, not a default.
- **What counts as done.** In a session, *you* decide whether the output is good enough. In a system, something else has to. Either a human checkpoint, or a verification step, or a downstream consumer that will fail loudly if Claude got it wrong. "Done" stops being a feeling and starts being a check.
- **What happens when it fails.** Sessions fail in the open. Systems fail in the dark. The hardest production failures are not the loud ones; they are the silent ones where the system kept running but stopped doing what it was supposed to.
- **Where the human stays in the loop.** Some work has to stay supervised. Some can run unattended. Most lives somewhere on a gradient between the two, and getting the gradient right is most of the job.

Each of these is a real design problem. The next pages take them in order. [What survives delegation](/systems/what-survives-delegation) is about which tasks can actually be handed off and which only look like they can. [Patterns](/systems/patterns) walks through the shapes these systems take in production — the four you will see again and again once you know what to look for. [Where the human lives](/systems/where-the-human-lives) is the checkpoint question, framed correctly. [What breaks in production](/systems/what-breaks) is the honest list of failure modes nobody puts in the demo. [Where the line is now](/systems/where-the-line-is) is what still genuinely needs you and why. [Composition](/systems/composition) is the part that begins once you have more than one system running — where the hard problems move to the seams. [Obsidian and Graphify](/workflows/obsidian-graphify) is the memory layer that lets any of this hold together across time.

## Session and system, side by side

The diagram is worth more than the prose around it.

<svg class="svg-wide" viewBox="0 0 820 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two loops side by side. On the left a session loop where the human touches every node. On the right a system loop where the human is outside except at an optional checkpoint.">
  <rect x="16" y="16" width="382" height="428" rx="10" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.6"/>
  <text x="207" y="50" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="1.5">SESSION</text>
  <text x="207" y="68" text-anchor="middle" fill="currentColor" opacity="0.6" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-style="italic">human inside every turn</text>
  <rect x="44" y="108" width="148" height="56" rx="5" fill="none" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.2"/>
  <rect x="44" y="108" width="148" height="4" rx="2" fill="#d97706" fill-opacity="0.45"/>
  <text x="118" y="134" text-anchor="middle" fill="currentColor" font-family="ui-monospace, monospace" font-size="12">human prompts</text>
  <text x="118" y="152" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700">* HUMAN</text>
  <rect x="210" y="108" width="148" height="56" rx="5" fill="none" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.2"/>
  <text x="284" y="141" text-anchor="middle" fill="currentColor" font-family="ui-monospace, monospace" font-size="12">Claude responds</text>
  <rect x="210" y="268" width="148" height="56" rx="5" fill="none" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.2"/>
  <rect x="210" y="268" width="148" height="4" rx="2" fill="#d97706" fill-opacity="0.45"/>
  <text x="284" y="294" text-anchor="middle" fill="currentColor" font-family="ui-monospace, monospace" font-size="12">human evaluates</text>
  <text x="284" y="312" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700">* HUMAN</text>
  <rect x="44" y="268" width="148" height="56" rx="5" fill="none" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.2"/>
  <rect x="44" y="268" width="148" height="4" rx="2" fill="#d97706" fill-opacity="0.45"/>
  <text x="118" y="294" text-anchor="middle" fill="currentColor" font-family="ui-monospace, monospace" font-size="12">prompts again</text>
  <text x="118" y="312" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-weight="700">* HUMAN</text>
  <line x1="192" y1="136" x2="212" y2="136" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.3"/>
  <polygon points="212,132 220,136 212,140" fill="currentColor" fill-opacity="0.6"/>
  <line x1="284" y1="164" x2="284" y2="268" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.3"/>
  <polygon points="280,260 284,268 288,260" fill="currentColor" fill-opacity="0.6"/>
  <line x1="210" y1="296" x2="192" y2="296" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.3"/>
  <polygon points="200,292 192,296 200,300" fill="currentColor" fill-opacity="0.6"/>
  <line x1="118" y1="268" x2="118" y2="164" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.3"/>
  <polygon points="114,172 118,164 122,172" fill="currentColor" fill-opacity="0.6"/>
  <text x="207" y="415" text-anchor="middle" fill="currentColor" opacity="0.7" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11">every node touched by the human</text>
  <rect x="422" y="16" width="382" height="428" rx="10" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.6"/>
  <text x="613" y="50" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="1.5">SYSTEM</text>
  <text x="613" y="68" text-anchor="middle" fill="currentColor" opacity="0.6" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-style="italic">human outside the loop</text>
  <rect x="450" y="100" width="148" height="48" rx="5" fill="none" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.2"/>
  <text x="524" y="129" text-anchor="middle" fill="currentColor" font-family="ui-monospace, monospace" font-size="12">trigger fires</text>
  <rect x="622" y="100" width="148" height="48" rx="5" fill="none" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.2"/>
  <text x="696" y="129" text-anchor="middle" fill="currentColor" font-family="ui-monospace, monospace" font-size="12">Claude executes</text>
  <rect x="622" y="218" width="148" height="48" rx="5" fill="none" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.2"/>
  <text x="696" y="247" text-anchor="middle" fill="currentColor" font-family="ui-monospace, monospace" font-size="12">verification</text>
  <rect x="450" y="218" width="148" height="48" rx="5" fill="none" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.2" stroke-dasharray="5 3"/>
  <text x="524" y="239" text-anchor="middle" fill="currentColor" font-family="ui-monospace, monospace" font-size="11">human checkpoint</text>
  <text x="524" y="256" text-anchor="middle" fill="currentColor" opacity="0.5" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-style="italic">optional</text>
  <rect x="536" y="335" width="148" height="48" rx="5" fill="none" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.2"/>
  <text x="610" y="364" text-anchor="middle" fill="currentColor" font-family="ui-monospace, monospace" font-size="12">loop continues</text>
  <line x1="598" y1="124" x2="619" y2="124" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.3"/>
  <polygon points="611,120 622,124 611,128" fill="currentColor" fill-opacity="0.6"/>
  <line x1="696" y1="148" x2="696" y2="215" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.3"/>
  <polygon points="692,207 696,218 700,207" fill="currentColor" fill-opacity="0.6"/>
  <line x1="619" y1="242" x2="601" y2="242" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.3" stroke-dasharray="4 3"/>
  <polygon points="609,238 598,242 609,246" fill="currentColor" fill-opacity="0.6"/>
  <line x1="696" y1="266" x2="696" y2="332" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.3"/>
  <polygon points="692,324 696,335 700,324" fill="currentColor" fill-opacity="0.6"/>
  <line x1="524" y1="266" x2="524" y2="332" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.3"/>
  <polygon points="520,324 524,335 528,324" fill="currentColor" fill-opacity="0.6"/>
  <path d="M 536 359 L 432 359 L 432 124 L 447 124" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.3" fill="none"/>
  <polygon points="439,120 450,124 439,128" fill="currentColor" fill-opacity="0.6"/>
  <text x="613" y="415" text-anchor="middle" fill="currentColor" opacity="0.7" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11">human returns only at the checkpoint, if at all</text>
</svg>

Same model. Same tools. Different role for the person. In the session, the human is in the loop. In the system, the human designed the loop and walked away — except for the deliberate places where they walk back in.

That is the whole shift. Everything else in this section is detail.

## What the rest of this section is for

If you read the rest of the guide and treated Claude as a tool, this section is about treating Claude as labor. Not because labor is the more sophisticated framing. Because the design problems are different, and the failure modes are different, and the patterns that hold up in production are different. A great prompt fails by giving you a bad answer in the moment, which you can correct. A great delegation fails three days later, in a thousand small ways, because something shifted and nobody was watching.

The point of the rest of this section is to make you good at the second problem. Not by giving you systems to copy — those age in months — but by giving you the structure underneath them, so you can recognize what is going on when you see one and design your own when you need to.

When you build a system, Claude is not doing more for you. Claude is doing the work. Your work is the system.

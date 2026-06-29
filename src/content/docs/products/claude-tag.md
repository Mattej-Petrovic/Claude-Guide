---
title: Claude Tag
lede: Claude as an always-on teammate that lives in a Slack channel, shared by everyone in it.
section: products
---

Claude Tag puts Claude inside a Slack channel as a persistent member of the team. You write `@Claude` the same way you would tag a colleague, hand it a task, and carry on with your own work while it goes away and does it. The work happens in the channel, in the open, where everyone can see it.

The mental model worth getting right early: this is not a chatbot you DM in private. It is one shared teammate that the whole channel talks to. There is a single Claude per channel, it remembers what has happened there, and anyone can pick up a thread that someone else started. Anthropic frames it as the beginning of an evolution of Claude Code, the same agentic engine made more proactive and built to work with a full team rather than one person at a keyboard.

Claude Tag launched on 23 June 2026, in beta for Claude Enterprise and Team customers, and it replaces the older "Claude in Slack" app.

## What it is

Three properties separate Claude Tag from every earlier way of using Claude in a chat app.

**It is multiplayer.** Within a given channel there is one Claude, and it interacts with everyone. When you tag it, your colleagues see the request, watch the steps it takes, and can jump in to redirect or continue the conversation. Work stops being a private exchange between you and a model and becomes something the team does together, with Claude as a participant rather than a tool each person operates alone.

**It learns the channel over time.** As Claude follows along with the conversation, it accumulates context about the work: the project, the people, the recurring tasks, the vocabulary your team uses. The practical payoff is that you stop re-explaining yourself. A channel that has run for a month knows things a fresh chat never would, and that context is shared by everyone who works there.

**It can work autonomously.** You can set it a task and leave. Claude breaks a request into stages and executes them in sequence using whatever tools it has access to, then reports back in the thread. It can also schedule work for itself and pursue a project over hours or days, not just answer the message in front of it.

<svg viewBox="0 0 780 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Contrast between the old Claude in Slack app, where each person had a separate private stateless chat, and Claude Tag, where one shared Claude lives in the channel with persistent memory for everyone">
  <defs>
    <style>
      .ct-label { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 12px; fill: var(--color-text, #e8e8e8); }
      .ct-label-strong { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 13px; font-weight: 600; fill: var(--color-text, #e8e8e8); }
      .ct-label-muted { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 11px; fill: var(--color-text-muted, #9a9a9a); }
      .ct-label-tag { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.05em; fill: var(--color-text-muted, #9a9a9a); }
      .ct-label-accent { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.05em; fill: var(--color-accent, #c97b48); }
      .ct-box { fill: var(--color-surface, #1a1a1a); stroke: var(--color-border, #2e2e2e); stroke-width: 1; }
      .ct-box-accent { fill: var(--color-surface-accent, #1f1f1f); stroke: var(--color-accent, #c97b48); stroke-width: 1.5; }
      .ct-arrow { stroke: var(--color-border-strong, #555); stroke-width: 1.25; fill: none; marker-end: url(#ct-arrowhead); }
    </style>
    <marker id="ct-arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 z" fill="var(--color-border-strong, #555)" />
    </marker>
  </defs>
  <!-- Panel headers -->
  <text class="ct-label-tag" x="190" y="28" text-anchor="middle">BEFORE: CLAUDE IN SLACK APP</text>
  <text class="ct-label-accent" x="590" y="28" text-anchor="middle">NOW: CLAUDE TAG</text>
  <!-- Divider -->
  <line stroke="var(--color-border, #2e2e2e)" stroke-width="1" x1="390" y1="20" x2="390" y2="320" />
  <!-- LEFT: three people, three separate Claudes -->
  <rect class="ct-box" x="30" y="70" width="90" height="40" rx="4" />
  <text class="ct-label" x="75" y="94" text-anchor="middle">Person A</text>
  <rect class="ct-box" x="30" y="140" width="90" height="40" rx="4" />
  <text class="ct-label" x="75" y="164" text-anchor="middle">Person B</text>
  <rect class="ct-box" x="30" y="210" width="90" height="40" rx="4" />
  <text class="ct-label" x="75" y="234" text-anchor="middle">Person C</text>
  <line class="ct-arrow" x1="120" y1="90"  x2="240" y2="90" />
  <line class="ct-arrow" x1="120" y1="160" x2="240" y2="160" />
  <line class="ct-arrow" x1="120" y1="230" x2="240" y2="230" />
  <rect class="ct-box" x="244" y="70" width="100" height="40" rx="4" />
  <text class="ct-label-muted" x="294" y="94" text-anchor="middle">Claude (DM)</text>
  <rect class="ct-box" x="244" y="140" width="100" height="40" rx="4" />
  <text class="ct-label-muted" x="294" y="164" text-anchor="middle">Claude (DM)</text>
  <rect class="ct-box" x="244" y="210" width="100" height="40" rx="4" />
  <text class="ct-label-muted" x="294" y="234" text-anchor="middle">Claude (DM)</text>
  <text class="ct-label-muted" x="190" y="300" text-anchor="middle">separate private chats, no shared memory</text>
  <!-- RIGHT: three people, one shared Claude -->
  <rect class="ct-box" x="430" y="70" width="90" height="40" rx="4" />
  <text class="ct-label" x="475" y="94" text-anchor="middle">Person A</text>
  <rect class="ct-box" x="430" y="140" width="90" height="40" rx="4" />
  <text class="ct-label" x="475" y="164" text-anchor="middle">Person B</text>
  <rect class="ct-box" x="430" y="210" width="90" height="40" rx="4" />
  <text class="ct-label" x="475" y="234" text-anchor="middle">Person C</text>
  <line class="ct-arrow" x1="520" y1="90"  x2="628" y2="150" />
  <line class="ct-arrow" x1="520" y1="160" x2="628" y2="160" />
  <line class="ct-arrow" x1="520" y1="230" x2="628" y2="170" />
  <rect class="ct-box-accent" x="632" y="120" width="118" height="80" rx="6" />
  <text class="ct-label-strong" x="691" y="150" text-anchor="middle">@Claude</text>
  <text class="ct-label-muted" x="691" y="168" text-anchor="middle">one per channel</text>
  <text class="ct-label-accent" x="691" y="186" text-anchor="middle">SHARED MEMORY</text>
  <text class="ct-label-muted" x="590" y="300" text-anchor="middle">one teammate, shared context, everyone can pick up the thread</text>
</svg>

## How it differs from the old Slack app

If you used the previous "Claude in Slack" integration, the difference is structural, not cosmetic. The old app was Claude in a private DM: stateless, scoped to you, useful for one-off questions. Claude Tag is Claude in the channel: persistent, shared, and capable of acting on its own. Administrators have a thirty day window to migrate from the old app to the new one.

The line back to [Claude Code](/products/claude-code) is worth holding in your head, because Claude Tag is built on it. Claude Code is one engineer driving the agent from a terminal. Claude Tag is that same agent given a seat in a shared room, made proactive, and pointed at the place where teams already coordinate. Anthropic reports that 65% of its own product team's code is now written by an internal version of this, and that the pattern has spread past engineering to chasing down product metrics, working support tickets, and finding the root cause of bugs.

## How you actually use it

Setup is an administrator task and takes four steps.

1. Pair Claude Tag with your Slack workspace.
2. Grant Claude access to the tools and data it should have.
3. Set a monthly spend limit for the organisation.
4. Test it in a private channel before letting it loose.

Eligible Enterprise and Team organisations receive launch credits to start with.

Day to day, the loop is the one your team already knows from working with people. You tag `@Claude` in a channel, describe what you want in plain language, and it goes to work in a thread.

**Delegating a task.** "@Claude pull last week's signups by plan and post the breakdown here." Claude plans the steps, queries whatever data source it has been given, and replies in the thread with the result. Because it is in the channel, a colleague who sees the answer can immediately ask a follow up without you in the loop.

**Handing off mid-stream.** Someone starts a piece of analysis with Claude before they log off. A teammate in a different timezone opens the same thread, sees the full context, and continues from there. The conversation is a shared artifact, not a private session that ends when one person closes their laptop.

**Letting it run.** "@Claude every weekday at 9am, summarise overnight customer tickets and flag anything that looks urgent." Claude schedules the task for itself and posts the result on its own. This is the autonomous mode: work that proceeds without anyone re-triggering it.

## Ambient mode

The most genuinely new behaviour is ambient mode, which is opt-in. With it on, Claude does not wait to be tagged. It follows the channel and proactively jumps in when it thinks there is something you need to know: an update worth surfacing, a fact from elsewhere in the organisation that is relevant here, a thread or task that everyone forgot to close out.

This is the feature that makes Claude feel less like a command line and more like a colleague who is paying attention. It is also the one to introduce deliberately. A teammate who speaks only when asked is easy to reason about. A teammate who decides on its own when to interrupt is more useful and more intrusive at the same time, and the right amount of proactivity is a judgement call your team will need to tune per channel.

## How admins keep it scoped

The whole design assumes Claude is touching real company data, so the controls are the point, not an afterthought. Four mechanisms matter most.

**Separate identities.** You can create distinct Claude identities for different uses, and everything about them, including their memory, stays scoped to the channels an administrator defines. A Claude configured for the sales team will not share its memory with the engineering version, and will not have access to sales data outside its channels. Scope is the primary safety boundary.

**Tool and data permissions.** Administrators specify exactly which tools and which information Claude can reach, channel by channel. Claude only ever sees what it has been explicitly granted in the room it is working in.

**Spend limits.** You can cap token spend both for the whole organisation and for individual channels, which keeps an autonomous, always-on agent from quietly running up a bill.

**Audit logging.** Administrators can view a log of everything Claude has done, together with who requested each task. When the agent acts on its own, the record of who asked for what is what keeps it accountable.

## How to use it well

**Start in one channel, not the whole workspace.** Pick a single team and a real but low-stakes channel. Let people see how Claude behaves, where it helps, and where it gets in the way, before you give it a seat everywhere. The blast radius of a misconfigured agent scales with how many channels and tools it can reach.

**Scope tightly, then widen.** Give each Claude identity only the tools and data its channel genuinely needs. It is easier to grant more access later than to discover an agent could read something it never should have. Treat the sales and engineering separation as the model: one identity, one domain, one set of memories.

**Turn ambient mode on gradually.** Run Claude in tag-only mode first so the team learns its rhythm when it speaks on request. Switch on ambient mode once people trust it, and be ready to dial the proactivity down if it starts talking more than it helps.

**Use the audit log as a habit, not a forensics tool.** Glance at what Claude has been doing and who asked for it, especially in the early weeks. It is the fastest way to catch a task that is running too often, costing too much, or doing something subtly wrong.

**Lean on shared memory instead of re-briefing.** The value of a channel that has run for weeks is the context it has built. Write important decisions and conventions into the channel rather than into a private note, so Claude and the next teammate both inherit them.

## What people get wrong

**Treating it like the old DM bot.** The old app was private and stateless. Claude Tag is public to the channel and remembers. Anything you tag it with is visible to everyone in the room, which is a feature for collaboration and a trap if you forget it and paste something sensitive into a shared channel.

**Underestimating ambient mode.** Always-on analysis of conversations, documents, and workflows is exactly what makes it useful, and it is also continuous exposure of whatever the agent can see. Decide what data each channel's Claude should reach before you turn proactivity on, not after.

**Skipping spend limits.** An agent that schedules its own work and acts without prompting can consume tokens steadily in the background. Set organisation and per-channel caps at setup, while you are thinking about it, rather than after the first surprising invoice.

**Confusing it with phone access to Claude Code.** Claude Tag is a shared agent living in a Slack channel for a team. The [phone](/products/phone) approach connects a single Claude Code CLI session to a messaging app for one person. Both let you reach Claude from a chat app, but one is a team teammate and the other is a personal remote control. They are different tools for different jobs.

**Forgetting the human stays accountable.** The audit log records who requested each task for a reason. An autonomous agent acting in a shared channel does not remove responsibility from the people directing it. Treat its output the way you would a capable but new colleague's: useful by default, checked where it matters.

## When to reach for something else

If the work is solo engineering against a codebase in a terminal, that is still [Claude Code](/products/claude-code). If it is knowledge work on your own desktop files and apps, that is [Cowork](/products/cowork). If it is private thinking, drafting, or research with no team in the loop, that is [Claude.ai](/products/claude-ai).

Reach for Claude Tag when the work is shared: when it lives in a channel, more than one person touches it, and you want an agent that stays present, remembers the context, and can keep working while everyone else does too.

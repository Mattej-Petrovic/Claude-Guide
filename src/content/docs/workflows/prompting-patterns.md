---
title: Prompting patterns
lede: Reusable prompt templates that work for specific situations. The structured prompt, examples, role framing, plan-then-execute, critique-then-revise, the interrogator, anti-sycophancy, the reset, and the smaller moves that earn their place.
section: workflows
---

The mental model is in [/concepts/prompting](/concepts/prompting): Claude reads everything in the context window and produces a continuation, so the job is to make a good answer the most likely thing for it to produce. This page is the next layer. Patterns you can copy and adapt for specific situations. Templates, not theory.

None of these are magic. They work because they make context, intent, and shape explicit instead of leaving Claude to guess. Pick the ones that fit the task. Don't stack all of them on a one-line question. A 200-token prompt for "what does this regex do" is ceremony, not engineering.

## The foundation: structured prompt

<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The structured prompt template, showing role, context, task, constraints, and output_format wrapped in XML tags, with each tag annotated to explain what it does.">
  <text x="350" y="22" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="600" letter-spacing="1.2">THE STRUCTURED PROMPT</text>
  <rect x="40" y="45" width="420" height="300" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="60" y="76" fill="#d97706" font-family="ui-monospace, monospace" font-size="12">&lt;role&gt;</text>
  <text x="75" y="93" fill="currentColor" font-family="ui-monospace, monospace" font-size="12" opacity="0.7">senior Rails engineer reviewing PRs</text>
  <text x="60" y="110" fill="#d97706" font-family="ui-monospace, monospace" font-size="12">&lt;/role&gt;</text>
  <text x="60" y="140" fill="#d97706" font-family="ui-monospace, monospace" font-size="12">&lt;context&gt;</text>
  <text x="75" y="157" fill="currentColor" font-family="ui-monospace, monospace" font-size="12" opacity="0.7">stack, conventions, what's already</text>
  <text x="75" y="174" fill="currentColor" font-family="ui-monospace, monospace" font-size="12" opacity="0.7">been tried, what to avoid</text>
  <text x="60" y="191" fill="#d97706" font-family="ui-monospace, monospace" font-size="12">&lt;/context&gt;</text>
  <text x="60" y="221" fill="#d97706" font-family="ui-monospace, monospace" font-size="12">&lt;task&gt;</text>
  <text x="75" y="238" fill="currentColor" font-family="ui-monospace, monospace" font-size="12" opacity="0.7">the specific thing you want done</text>
  <text x="60" y="255" fill="#d97706" font-family="ui-monospace, monospace" font-size="12">&lt;/task&gt;</text>
  <text x="60" y="285" fill="#d97706" font-family="ui-monospace, monospace" font-size="12">&lt;constraints&gt; ... &lt;/constraints&gt;</text>
  <text x="60" y="318" fill="#d97706" font-family="ui-monospace, monospace" font-size="12">&lt;output_format&gt; ... &lt;/output_format&gt;</text>
  <line x1="465" y1="92" x2="495" y2="92" stroke="currentColor" stroke-width="1" opacity="0.4"/>
  <text x="500" y="96" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.7">sets the frame</text>
  <line x1="465" y1="165" x2="495" y2="165" stroke="currentColor" stroke-width="1" opacity="0.4"/>
  <text x="500" y="160" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.7">replaces what Claude</text>
  <text x="500" y="175" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.7">can't see in your head</text>
  <line x1="465" y1="238" x2="495" y2="238" stroke="currentColor" stroke-width="1" opacity="0.4"/>
  <text x="500" y="242" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.7">what you actually want</text>
  <line x1="465" y1="285" x2="495" y2="285" stroke="currentColor" stroke-width="1" opacity="0.4"/>
  <text x="500" y="289" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.7">filter wrong-shaped answers</text>
  <line x1="465" y1="318" x2="495" y2="318" stroke="currentColor" stroke-width="1" opacity="0.4"/>
  <text x="500" y="322" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.7">shape of the response</text>
</svg>

For anything non-trivial, wrap your role, context, task, constraints, and output format in XML tags. Claude was trained on text where tagged structure carries meaning, so tagged sections give it handles to grip. Unstructured prose blurs into a single grey blob. Tagged sections let Claude navigate.

```xml
<role>
Senior security engineer reviewing pull requests for vulnerabilities.
</role>

<context>
Codebase is Next.js 15 + Supabase. We've been seeing CSRF issues recently.
Auth is custom JWT, not NextAuth.
</context>

<task>
Review this diff. Identify real vulnerabilities. Skip style nits.
</task>

<constraints>
- Don't soften feedback. If something is fine, say so quickly and move on.
- If you'd reject this PR, say why in one paragraph at the top.
</constraints>

<output_format>
1. Top-line verdict (1 paragraph).
2. Real issues, ranked by severity.
3. Anything fine but worth a future cleanup note.
</output_format>
```

Each section solves a different problem. Role sets the frame. Context replaces what Claude can't see. Task gets you out of "I'll guess what you mean." Constraints filter out the wrong-shaped answer. Output format gives you something you can use without reformatting.

When to skip it: simple one-shot questions. *"What does this regex match"* doesn't need a scaffold. Structure pays off when a prompt has multiple distinct sections to navigate (context plus task plus examples plus constraints). For short, single-section prompts, plain prose works just as well, and the tag overhead becomes ceremony.

## Examples for anything hard to describe

When you can't describe the tone, format, or structure you want, show. Two or three examples beat any amount of adjective-stacking. Wrap them in `<example>` tags so Claude distinguishes them from instructions, and aim for three to five examples for non-trivial tasks.

```xml
<task>
Write the next paragraph in the same style and voice.
</task>

<examples>
<example>
The user object exists in three forms now: the database row, the API response, and the React state. They drift apart the moment one of them is mutated. The fix is not better sync; the fix is one source of truth.
</example>

<example>
Caching solves a real problem. It also introduces a new one: stale data nobody is responsible for. The trade is rarely worth it until the cost it is solving is measurable.
</example>
</examples>
```

The example covers what the description can't. Use this for tone, code style, document structure, anything where "I'll know it when I see it" is closer to the truth than any explanation you'd write.

## Role + frame + constraints

For tasks where the *kind* of response matters, set the role and the frame at the top. The shift is real: the same diff gets a substantively different review depending on the frame.

```
You are a senior security engineer reviewing a PR. Your goal is to find real vulnerabilities, not style nits. You don't soften feedback or hedge. If something is fine, say so quickly and move on.
```

Roles work when they constrain the response, not when they inflate it. "You are the world's leading expert in distributed systems" doesn't make Claude smarter. It just makes the reply read like marketing. "You are a senior engineer reviewing this for production readiness, with a bias toward shipping over perfecting" actually shapes the answer.

In API contexts, the role belongs in the system prompt rather than the user message. In claude.ai chat or Cowork where there's no system prompt to edit, put it at the top of your first message.

## Plan first, then execute

For anything multi-step, separate the plan from the doing. Two reasons: the plan is cheaper to fix than the execution, and the plan tells you whether Claude understood the task.

```
1. First, plan the approach. List the steps, the files you'd touch, the trade-offs you're making, and anything you're unsure about. Don't write any code yet.
2. Wait for me to approve or correct the plan.
3. Then execute.
```

In Claude Code, plan mode (Shift+Tab) builds this into the tool. In chat, you set it up with the prompt. Both produce the same compound effect: fewer wasted execution attempts, better catches at the cheap stage.

Variant for hard problems: trigger deeper reasoning with phrases like "think hard," "think step by step," or "ultrathink" (Claude Code specifically). These actually change how Claude approaches the task, with the thinking happening before the visible response. Use them when the task has multiple constraints to satisfy or genuine ambiguity. Skip them for simple queries since they cost tokens and add latency.

## Critique then revise

After Claude produces something, ask it to find the flaws.

```
Now critique that draft. What's weak? What's a reader likely to push back on? What's a more interesting version of the argument that you didn't make? Then revise.
```

This is the highest-leverage move for writing tasks. The first draft is almost never the best draft Claude can produce; it's the most agreeable one. The critique pass surfaces the better version that was always available.

Stronger variant: have Claude critique as a specific persona. *"Critique this as a skeptical senior engineer reading it for the first time."* The persona constrains the critique to a useful shape instead of producing generic "could be more concise" feedback.

## The interrogator: have Claude ask you questions

When the task is ambiguous or you're not sure what you actually want, ask Claude to ask *you* questions first.

```
I want to redesign the onboarding flow for our app. Before you propose anything, ask me 3-5 questions whose answers would meaningfully change your approach.
```

This pattern surfaces things you didn't realise you hadn't decided. Claude's questions are usually better than your initial framing, and answering them is faster than reading three drafts of the wrong design.

Variant for new projects: *"Ask me questions until you can write a one-paragraph spec for what I want, then write the spec."* You end up with a written spec you can paste into the next prompt.

## Anti-sycophancy: ask for pushback explicitly

Claude defaults to agreeable. If you want pushback, you have to ask.

```
Push back on my reasoning if anything is wrong. Tell me which assumption is weakest. If you can think of a stronger counter-argument than the one I'm anticipating, give me that.
```

Without this prompt, you get warm agreement that your idea is interesting. With it, you get the critique you actually need.

Use it when you've made a decision and want to stress-test it. Don't use it when you're brainstorming. Forcing critique mode on an exploration step kills the exploration.

## The reset

When a long conversation has drifted, the highest-leverage move is starting over, not arguing your way back. The bad context keeps pulling outputs toward bad answers. Trying to reason past it costs more tokens than the reset would.

The pattern:

1. Ask Claude to summarise what matters from this conversation: decisions made, things tried, what works, what doesn't.
2. Copy the summary.
3. Open a new chat. Paste the summary as your first message, along with what you want next.

You keep the context you need, drop the noise, and Claude starts from a clean state. The same idea expressed in Claude Code is `/clear`, and in Cowork it's a new session. In all three surfaces, the underlying move is the same: trade conversation history for a clean prompt.

## Smaller moves that pay off

A few one-liner patterns that don't deserve their own section but earn their place:

**Self-check appendage.** *"Before you finish, verify your answer against [test criteria]."* This catches errors reliably for coding and math tasks. Cheap to add, often surfaces real problems.

**Ground in quotes for long documents.** *"Before you answer, quote the parts of the document most relevant to the question."* Useful when Claude is reasoning over a long doc and you want to make sure it's actually engaging with the right parts, not making up an answer that sounds plausible.

**Pre-fill (API and Claude Code).** Start Claude's response for it. Beginning the assistant turn with `{` forces JSON output. Beginning with `<answer>` forces a structured response. Beginning with the first word of the answer skips past hedging preambles like "It depends..." or "I cannot...". Useful when Claude keeps stalling on something it can clearly do, or when you want strictly-formatted output.

## Common mistakes

**Stacking patterns on simple queries.** Five tags, a role, an interrogator request, and a critique pass for *"what does this regex do"* is ceremony, not engineering. Match the pattern to the task.

**Treating XML tags as decoration.** Tags work because they delimit semantic sections, not because they look professional. `<thing>random words</thing>` doesn't help. `<context>actual context</context>` does.

**Role priming for inflation.** "World's foremost expert" doesn't make answers better. It just makes the reply read like marketing. Roles work when they constrain the answer, not when they inflate it.

**Asking for short when you want depth.** "Briefly" is read literally. If you want a depth-first answer, ask for depth and edit afterward. The same goes the other way. If you want concise, say so explicitly. "No preamble, no conclusion paragraph, bullets only" produces what you want. "Try to be concise if you can" produces a suggestion Claude is free to ignore.

**Reasoning past a derailed conversation.** Five messages of Claude stuck on the wrong assumption almost never get fixed by a sixth message. Reset.

## When to combine patterns

The patterns layer. Common useful combinations:

- **Structured prompt + plan-then-execute** for any non-trivial coding task.
- **Role + critique-then-revise** for writing tasks where genre matters.
- **Interrogator + structured prompt** for novel work where you're not sure what you want yet.
- **Anti-sycophancy + critique-then-revise** when you want a real second opinion, not a polished agreement.
- **Self-check + plan-then-execute** when correctness matters more than speed.

The point of having a catalogue of patterns isn't to apply all of them at once. It's to reach for the right one. Each task needs different combinations, and over time you'll start to feel which patterns the task is calling for before you write the prompt.

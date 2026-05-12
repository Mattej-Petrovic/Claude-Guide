---
title: Prompting
lede: How to write prompts that get consistent, high-quality results.
section: concepts
---

Prompting is not a separate skill from using Claude. It is the only skill. Everything else (memory, projects, skills, MCP, hooks) is plumbing for prompts.

The reason most prompting advice feels generic and does not help is that it skips the thing that matters: a working mental model of what is happening when you prompt. Once you have that, the principles are not a checklist; they are consequences of how the system works.

## What is actually happening

Claude is a model that takes everything it can see (your message, the system prompt, conversation history, attached files, search results, tool outputs) and produces a continuation. There is no other state. There is no inherent knowledge of you, your project, or your intent beyond what is in that visible window.

Two consequences follow.

First, Claude does not "know" anything you have not put in front of it. It has training-time knowledge of the world, but it does not know your codebase, your team's preferences, your project's conventions, or what you are actually trying to accomplish on this particular task. If something is not in the context, it does not exist for Claude.

Second, Claude is not reasoning about your true intent in some abstract sense. It is producing the most likely continuation given the context. If your prompt sounds vague, the most likely continuation is a vague answer. If your prompt sounds like a question someone might ask in a forum, the answer reads like a forum reply. If you frame yourself as a beginner, the explanation comes back at a beginner's level. The frame you set determines what comes back.

This is the shift that makes prompting click: you are not asking Claude something; you are constructing the conditions under which a good answer becomes the most likely thing for the model to produce.

<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram showing the anatomy of a well-formed prompt as five stacked sections inside Claude's context window">
  <defs>
    <style>
      .p-label { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 13px; fill: var(--color-text, #e8e8e8); }
      .p-label-strong { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 13px; font-weight: 600; fill: var(--color-text, #e8e8e8); }
      .p-label-muted { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 11px; fill: var(--color-text-muted, #9a9a9a); }
      .p-label-title { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.06em; fill: var(--color-text-muted, #9a9a9a); }
      .p-box { fill: var(--color-surface, #1a1a1a); stroke: var(--color-border, #2e2e2e); stroke-width: 1; }
      .p-box-accent { fill: var(--color-surface-accent, #1f1f1f); stroke: var(--color-accent, #c97b48); stroke-width: 1.5; }
      .p-arrow { stroke: var(--color-border-strong, #555); stroke-width: 1.25; fill: none; marker-end: url(#prompt-arrowhead); marker-start: url(#prompt-arrowhead); }
      .p-tick { stroke: var(--color-border-strong, #555); stroke-width: 1.25; fill: none; }
    </style>
    <marker id="prompt-arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 z" fill="var(--color-border-strong, #555)" />
    </marker>
  </defs>
  <!-- Context window label -->
  <text class="p-label-title" x="40" y="18" text-anchor="start">CONTEXT WINDOW</text>
  <!-- Outer context window rectangle -->
  <rect class="p-box-accent" x="40" y="25" width="460" height="310" rx="8" />
  <!-- Row 1: System prompt -->
  <rect class="p-box" x="52" y="42" width="436" height="50" rx="4" />
  <text class="p-label-strong" x="68" y="63">System prompt</text>
  <text class="p-label-muted" x="68" y="80">durable conditions, role, persistent context</text>
  <!-- Row 2: Context -->
  <rect class="p-box" x="52" y="100" width="436" height="50" rx="4" />
  <text class="p-label-strong" x="68" y="121">Context</text>
  <text class="p-label-muted" x="68" y="138">what Claude needs to know that it does not already</text>
  <!-- Row 3: Examples -->
  <rect class="p-box" x="52" y="158" width="436" height="50" rx="4" />
  <text class="p-label-strong" x="68" y="179">Examples</text>
  <text class="p-label-muted" x="68" y="196">what good output looks like</text>
  <!-- Row 4: Task -->
  <rect class="p-box" x="52" y="216" width="436" height="50" rx="4" />
  <text class="p-label-strong" x="68" y="237">Task</text>
  <text class="p-label-muted" x="68" y="254">what you actually want</text>
  <!-- Row 5: Output format -->
  <rect class="p-box" x="52" y="274" width="436" height="50" rx="4" />
  <text class="p-label-strong" x="68" y="295">Output format</text>
  <text class="p-label-muted" x="68" y="312">how the response should be structured</text>
  <!-- Right-side annotation: vertical brace with double arrow -->
  <line class="p-tick" x1="508" y1="42" x2="518" y2="42" />
  <line class="p-arrow" x1="513" y1="48" x2="513" y2="318" />
  <line class="p-tick" x1="508" y1="324" x2="518" y2="324" />
  <!-- Annotation text -->
  <text class="p-label-muted" x="526" y="172">Claude reads the</text>
  <text class="p-label-muted" x="526" y="188">entire window as</text>
  <text class="p-label-muted" x="526" y="204">one continuous</text>
  <text class="p-label-muted" x="526" y="220">input</text>
</svg>

## What follows from this

**Specificity.** "Write me a marketing post" gives you the average marketing post Claude has seen, which is bad. "Write me a 200-word LinkedIn post for an audience of frontend developers about why they should care about server components, in the voice of someone who just shipped this in production, with one concrete example and no hedging" gives you something useful. The difference is not that one is longer; the difference is that one tells Claude what good looks like.

**Context, not assumptions.** Anything you did not say is not there. If your project uses a specific naming convention, paste it. If your audience is a specific group, name them. If you have already tried something that did not work, mention it and why. Your most reliable failure mode as a user is forgetting that Claude cannot see what you can see.

**Negative space.** Saying what you do not want is often as important as saying what you do. "Do not pad with disclaimers." "Do not include a conclusion paragraph." "Do not turn this into a generic summary; I want the specific argument." Constraints actively filter the space of likely outputs in a way that positive instructions alone often do not.

**Examples beat description for anything hard to describe.** If you want a particular tone, paste a paragraph that has it. If you want a particular structure, paste a previous output that follows it. Examples short-circuit the need to describe the indescribable.

**Structure helps.** Claude was trained on text where structure carries meaning: XML tags, headers, code blocks, numbered steps. When you wrap context in `<context>...</context>` and the task in `<task>...</task>`, you are not decorating; you are giving the model handles to grip. Long, unstructured prompts blur into a single grey blob. Structured prompts let the model navigate.

**Position matters.** Two effects compete in long context. Recent content has more weight (recency bias) and the very beginning has more weight (primacy bias). The middle is where things get lost. Put the most important instruction either right at the top or right at the end. Filler in the middle is often forgivable. Instruction in the middle is often forgotten.

## Things specific to Claude

**XML tags work.** Claude was trained with explicit markup, and tagged structure produces noticeably better results than unstructured prose for anything beyond simple queries. Use `<context>`, `<task>`, `<examples>`, `<output_format>`, or whatever tag set fits the prompt.

**Thinking modes.** Phrases like "think hard," "think step by step," and (in Claude Code) "ultrathink" actually change how Claude approaches a problem. The thinking happens before the visible response. Use them when the task is genuinely hard or has multiple constraints to satisfy. Skip them for simple queries; they cost tokens and slow Claude down.

**System prompts versus user messages.** In API and Claude Code contexts, the system prompt sets durable conditions (role, tone, constraints, persistent context). The user message is the request. Confusing the two leads to fragile results: things you want to hold across the whole conversation belong in the system prompt, not buried inside the first user message.

**Pre-filled responses.** In API contexts you can put words in Claude's mouth by starting its response. This forces it past hesitation patterns ("I cannot...", "It depends...") and into the actual answer. Useful when Claude keeps stalling on something it can clearly do.

**The anti-sycophancy frame.** Claude is trained to be agreeable, which becomes a problem when you actually want pushback. Tell it explicitly: "Disagree if my premise is wrong." "Tell me if this idea has a flaw I am missing." "Do not validate; critique." Without this, you will get warmer agreement than your idea deserves.

## Anti-patterns

**Prompting like a Google search.** "Best practices React 2026" gives you the average SEO blog post on the topic. Claude is not a search engine; treat it like one and you get search-engine-shaped output.

**Assuming shared context.** "Fix this" with no code attached. "Summarise the meeting" with no transcript. "What should I do" with no problem stated. The most common cause of bad output is missing input.

**Overloading a single prompt.** Five tasks in one message often means none get full attention. If the tasks are independent, separate prompts are usually better. If they are sequential, give Claude the sequence explicitly.

**Asking for short when you want depth.** "Briefly" is read literally; you will get the surface answer. If you want a depth-first answer, ask for depth and edit down later.

**Reasoning your way out of a derailed conversation.** When a long conversation has gone off the rails (Claude is stuck on a wrong assumption, the context is bloated with irrelevant attempts, the tone has drifted), starting a fresh conversation with a clean prompt almost always beats trying to course-correct. The bad context will keep pulling outputs back toward bad answers.

## How to actually get better at prompting

Read your bad outputs and ask why. The answer is almost always something you did not say or said wrong, not a Claude problem. Each correction trains your intuition. Over time, you will find yourself anticipating what Claude needs to see before it sees it. That is what good prompting actually feels like: not following a checklist, but constructing a context that makes the answer you want the obvious one for the model to produce.

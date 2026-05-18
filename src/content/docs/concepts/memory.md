---
title: Memory
lede: How Claude's memory works and how to use it without it becoming noise.
section: concepts
---

A few minutes spent setting up Memory will change the quality of every Claude conversation you have from then on, more than almost any other configuration choice. The feature is simple enough that most people underestimate it. The leverage is real because it solves the most basic problem of using a stateless model: Claude has no idea who you are.

## What it is

Memory is a feature in Claude.ai under Settings → Capabilities. Once enabled, Claude derives durable facts and preferences about you from past conversations and quietly applies them to new ones. It is also editable directly: you can ask Claude to remember or forget something, and the memory store updates.

There are actually two related capabilities under that toggle:

- **Memory** itself, where Claude generates and applies memory derived from your chat history.
- **Search past chats**, where Claude can search your previous conversations on demand when you reference something specific from earlier.

The two are different. Memory is durable summary. Search past chats is explicit lookup. Both on is the usual setup; turning them off is a privacy choice.

There is also a wider concept of "things Claude remembers across sessions" that includes Project knowledge (persistent for chats inside a project), CLAUDE.md and project files in Claude Code (loaded every session), and system prompts in API or developer contexts. This page is mostly about the consumer Memory feature, but the principles apply to all of them. Memory is the layer that follows you everywhere; the others are scoped to a project or session.

<svg viewBox="0 0 820 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Layers of context Claude has during a conversation, from narrowest and most ephemeral (current message) to broadest and most durable (model training), with Memory highlighted as the layer that follows you everywhere">
  <defs>
    <style>
      .m-label { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 14px; fill: var(--color-text, #e8e8e8); }
      .m-label-strong { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 16px; font-weight: 600; fill: var(--color-text, #e8e8e8); }
      .m-label-muted { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 13px; fill: var(--color-text-muted, #9a9a9a); }
      .m-label-tag { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.05em; fill: var(--color-text-muted, #9a9a9a); }
      .m-label-accent { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.05em; fill: var(--color-accent, #c97b48); }
      .m-box { fill: var(--color-surface, #1a1a1a); stroke: var(--color-border, #2e2e2e); stroke-width: 1; }
      .m-box-accent { fill: var(--color-surface-accent, #1f1f1f); stroke: var(--color-accent, #c97b48); stroke-width: 1.5; }
      .m-box-dim { fill: var(--color-surface, #1a1a1a); stroke: var(--color-border, #2e2e2e); stroke-width: 1; opacity: 0.6; }
    </style>
  </defs>
  <!-- Column headers -->
  <text class="m-label-tag" x="225" y="20" text-anchor="middle">LAYER</text>
  <text class="m-label-tag" x="550" y="20" text-anchor="middle">SCOPE</text>
  <text class="m-label-tag" x="730" y="20" text-anchor="middle">PERSISTENCE</text>
  <!-- Layer 1: Current message — row y=30, box h=55, title y=50, subtitle y=68, col y=62 -->
  <rect class="m-box" x="10" y="30" width="430" height="55" rx="4" />
  <text class="m-label-strong" x="26" y="50">Current message</text>
  <text class="m-label-muted" x="26" y="68">just this turn</text>
  <text class="m-label-muted" x="550" y="62" text-anchor="middle">this prompt only</text>
  <text class="m-label-tag" x="730" y="62" text-anchor="middle">GONE AFTER REPLY</text>
  <!-- Layer 2: Conversation — row y=95 -->
  <rect class="m-box" x="10" y="95" width="430" height="55" rx="4" />
  <text class="m-label-strong" x="26" y="115">Conversation</text>
  <text class="m-label-muted" x="26" y="133">this chat session</text>
  <text class="m-label-muted" x="550" y="127" text-anchor="middle">this chat only</text>
  <text class="m-label-tag" x="730" y="127" text-anchor="middle">LOST WHEN CHAT ENDS</text>
  <!-- Layer 3: Project knowledge — row y=160 -->
  <rect class="m-box" x="10" y="160" width="430" height="55" rx="4" />
  <text class="m-label-strong" x="26" y="180">Project knowledge</text>
  <text class="m-label-muted" x="26" y="198">files and context inside a project</text>
  <text class="m-label-muted" x="550" y="192" text-anchor="middle">one project</text>
  <text class="m-label-tag" x="730" y="192" text-anchor="middle">DURABLE, SCOPED</text>
  <!-- Layer 4: Memory (accent — highlighted) — row y=225 -->
  <rect class="m-box-accent" x="10" y="225" width="430" height="55" rx="4" />
  <text class="m-label-strong" x="26" y="245">Memory</text>
  <text class="m-label-muted" x="26" y="263">derived facts and preferences about you</text>
  <text class="m-label-muted" x="550" y="257" text-anchor="middle">all chats (global or per-project)</text>
  <text class="m-label-accent" x="730" y="257" text-anchor="middle">FOLLOWS YOU EVERYWHERE</text>
  <!-- Layer 5: Search past chats — row y=290 -->
  <rect class="m-box" x="10" y="290" width="430" height="55" rx="4" />
  <text class="m-label-strong" x="26" y="310">Search past chats</text>
  <text class="m-label-muted" x="26" y="328">explicit lookup of prior conversations</text>
  <text class="m-label-muted" x="550" y="322" text-anchor="middle">any past chat, on demand</text>
  <text class="m-label-tag" x="730" y="322" text-anchor="middle">ON REQUEST ONLY</text>
  <!-- Layer 6: Model training — row y=355 -->
  <rect class="m-box-dim" x="10" y="355" width="430" height="55" rx="4" />
  <text class="m-label-strong" x="26" y="375">Model training</text>
  <text class="m-label-muted" x="26" y="393">baseline knowledge baked in at training time</text>
  <text class="m-label-muted" x="550" y="387" text-anchor="middle">everything (fixed)</text>
  <text class="m-label-tag" x="730" y="387" text-anchor="middle">STATIC</text>
  <!-- Vertical scope annotation on right -->
  <line stroke="var(--color-border-strong, #555)" stroke-width="1" x1="812" y1="30" x2="812" y2="410" />
  <line stroke="var(--color-border-strong, #555)" stroke-width="1" x1="808" y1="30" x2="816" y2="30" />
  <line stroke="var(--color-border-strong, #555)" stroke-width="1" x1="808" y1="410" x2="816" y2="410" />
  <text class="m-label-tag" x="819" y="220" text-anchor="start" transform="rotate(90 819 220)">NARROWER → BROADER</text>
</svg>

## What to actually put in your memory

The principle is simple: anything you would otherwise have to repeat in every conversation.

In practice, the highest-leverage entries fall into four buckets.

**Who you are.** Role, expertise level, domain, language preferences. Not a resume; just enough that Claude can calibrate. "I work in backend infrastructure with ten years of experience; assume comfort with distributed systems primitives" is more useful than "I am a software engineer." The first tells Claude how to talk to you. The second does not.

**How you want to be talked to.** This is where most of the value lives and where most people leave value on the table. Tell Claude your communication preferences explicitly. Whether you want brutal honesty over diplomacy. Whether you want pushback when your reasoning has a flaw. Whether you want short answers or depth. Whether you want it to challenge premises or just answer the question as posed. These preferences fundamentally change response shape, and stating them once beats restating them every conversation.

**Persistent context.** Things you are working on, learning, building, or aiming at. Not specific projects (those belong in project knowledge), but ongoing context: "Currently preparing for a career transition into product management; relate technical examples to that frame when useful." This lets Claude make connections you would otherwise have to point out.

**Anti-patterns.** What you do not want, especially if previous Claude responses have annoyed you. "Do not pad responses with disclaimers." "Skip the conclusion paragraph." "Do not soften criticism into encouragement." Claude is trained to be agreeable; without explicit anti-instructions, that default leaks into every reply.

The thing to avoid: dumping random facts. Memory is not a notebook. Every entry takes up Claude's attention, so noise dilutes signal. A focused memory of fifteen entries does more than a sprawling one of fifty.

## How Memory actually changes responses

The mental model from the [prompting](/concepts/prompting) page applies here directly. Claude produces continuations conditional on what it can see; Memory is part of what it sees. So Memory is doing the same work as a prompt, but durably and silently across every conversation you start.

A few specific consequences worth understanding:

**Tone adapts.** If your memory says you prefer direct, no-sugarcoating responses, Claude does not just remove softeners. It rewrites at a more confident register. The shift is broader than the literal instruction.

**Vocabulary calibrates.** Stating your domain expertise causes Claude to skip explanations of terms you already know and lean on shared vocabulary. This is the difference between a useful answer and one that wastes the first three paragraphs explaining what you asked about.

**Defaults shift.** Without context about you, Claude defaults to the median user: medium length, hedged, beginner-friendly. With context, it defaults to you specifically.

**Ambiguity resolves toward your preferences.** When a question has multiple valid answers, Claude picks the one that fits the version of you it knows about. Memory is what makes Claude stop feeling like a stranger every time.

## How to use Memory well

**Be specific, just like in a prompt.** "I prefer direct answers" is fine. "I want pushback when my reasoning has a flaw, not just confirmation that I am thinking clearly" is better. Vague preferences produce vague behavioural change.

**Curate, do not accumulate.** Review your memory occasionally. Remove things that no longer apply (a job you left, a project that ended, a preference that changed). Outdated memory pulls Claude toward outdated framings.

**Use scope deliberately.** Inside a project on Claude.ai, Memory is scoped to that project. Outside any project, it applies broadly. Put genuinely cross-cutting things (who you are, how you communicate) in your global scope. Put project-specific facts in project knowledge instead.

**Edit explicitly when something is wrong.** "Update your memory: I no longer work at X." "Forget that I am preparing for the certification I mentioned; I passed it." Direct correction is faster than letting the natural update cycle catch up.

**Be honest about what you are.** If you are a beginner in a topic, say so. Memory works against you when you describe yourself as more advanced than you are; you will get answers calibrated for someone who already understands the basics, and the basics are exactly what you needed.

## What people get wrong

**Treating Memory like a notebook.** Random facts diluting the durable patterns. The memory store is not for "I went to Italy in 2024." It is for "I am building a SaaS, primarily writing TypeScript, prefer pragmatic answers over architectural deep dives unless I ask."

**Forgetting to update.** Memory accumulates. Your situation changes. Old context distorts new conversations. The check-in does not have to be frequent, but it should happen.

**Confusing memory with chat history.** Memory is summary. It is not a transcript. Asking "what did we discuss last Tuesday?" hits Search past chats, not Memory. The distinction matters when you are tracking down something specific.

**Putting sensitive information in memory.** Memory persists and is applied across conversations. Things you would not want surfaced unexpectedly belong elsewhere, or nowhere. Health details, financial specifics, anything you would not say in a public conversation.

**Underusing the communication-preferences slot.** This is the single highest-leverage thing in memory and most people skip it because it feels too soft to write down. Write it down anyway. The change in response quality is significantly more than you would expect.

## A note on the wider ecosystem

Memory is the consumer-facing layer. In Claude Code, the equivalent role is played by `CLAUDE.md` and the `.claude/` folder, which load on every session. In API or Console contexts, the system prompt does this work. The principle is identical in all three: durable conditions, written once, applied automatically. The tooling differs.

The [Settings](/settings/walkthrough) section of this guide has its own page where the mechanics of enabling Memory are walked through. This page is the conceptual layer: what to put in it and why.

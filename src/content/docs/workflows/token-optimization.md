---
title: Token optimization
lede: Reducing token waste in Claude chat, Cowork, and Code without losing capability. The mental model, the habits that move the needle, surface-specific moves, and when to stop optimizing.
section: workflows
---

Every turn in a Claude conversation re-reads the entire conversation. The first message costs hundreds of tokens. The fortieth message costs everything that came before it, plus the new message, plus the response. Most "Claude got expensive fast" stories trace back to this single fact, not to bad prompting.

This page is about reducing token waste without losing capability. The model you pick, a few session habits, and one or two structural decisions do roughly 90% of the work. Everything else is fine-tuning.

The page covers chat surfaces (claude.ai, Cowork) and Claude Code together since the underlying mechanic is the same. Surface-specific tactics are called out where they diverge.

## The mental model

<svg viewBox="0 0 700 325" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="What's in the context window: a stacked diagram showing system prompts, memory and CLAUDE.md, files read this session, conversation history, and a reserved compaction buffer. Everything except the buffer is re-read on every turn. The files and conversation history layers are highlighted as where most token waste accumulates.">
  <text x="350" y="22" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="600" letter-spacing="1.2">WHAT'S IN THE CONTEXT WINDOW</text>
  <text x="350" y="38" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.55" font-style="italic">everything below is re-read on every turn</text>
  <rect x="80" y="50" width="540" height="240" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <line x1="80" y1="74" x2="620" y2="74" stroke="currentColor" stroke-width="0.5" opacity="0.4"/>
  <text x="92" y="67" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="600">SYSTEM TOOLS + PROMPTS</text>
  <text x="608" y="67" text-anchor="end" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">fixed</text>
  <line x1="80" y1="94" x2="620" y2="94" stroke="currentColor" stroke-width="0.5" opacity="0.4"/>
  <text x="92" y="87" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="600">MEMORY · CLAUDE.md · RULES</text>
  <text x="608" y="87" text-anchor="end" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">loaded once, paid every turn</text>
  <rect x="80" y="94" width="540" height="86" fill="#d97706" opacity="0.08"/>
  <line x1="80" y1="180" x2="620" y2="180" stroke="currentColor" stroke-width="0.5" opacity="0.4"/>
  <text x="92" y="120" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="600">FILES READ THIS SESSION</text>
  <text x="92" y="138" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.65">code · tool outputs · MCP responses · search results</text>
  <text x="608" y="120" text-anchor="end" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">accumulates</text>
  <text x="608" y="138" text-anchor="end" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-style="italic">delegate to subagents</text>
  <rect x="80" y="180" width="540" height="76" fill="#d97706" opacity="0.08"/>
  <line x1="80" y1="256" x2="620" y2="256" stroke="currentColor" stroke-width="0.5" opacity="0.4"/>
  <text x="92" y="206" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="600">CONVERSATION HISTORY</text>
  <text x="92" y="224" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.65">your prompts · Claude's responses</text>
  <text x="608" y="206" text-anchor="end" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">grows every turn</text>
  <text x="608" y="224" text-anchor="end" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" font-style="italic">edit, don't argue</text>
  <text x="92" y="275" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="600" opacity="0.55">COMPACTION BUFFER</text>
  <text x="608" y="275" text-anchor="end" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">reserved · you can't use it</text>
  <text x="350" y="315" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-style="italic">the two highlighted layers are where most token waste hides</text>
</svg>

Tokens accumulate. They don't get charged once and forgotten. They get re-read every turn.

Three things make this concrete:

**What counts.** Your prompts, Claude's responses, file contents, tool results, system instructions, `CLAUDE.md`, project files, connector outputs. All of it lives in the context window and gets re-read on every turn.

**What counts less.** Files cached inside claude.ai projects (read once, cached after). Skills that load on demand instead of upfront. Subagent context (lives in its own window, only the summary returns to yours).

**What's invisible until you look.** Run `/context` in Claude Code, or check the usage indicator in chat. The biggest token sinks are usually not the messages you're typing. They're the file Claude read three turns ago, the MCP response that returned 8K tokens of JSON, the `CLAUDE.md` you forgot has 400 lines in it. Before changing your workflow, look at where the spend actually is. The fix is often one quiet offender riding along in every turn, not a whole new system.

## The habits that move the needle

**Right model for the task.** Opus is significantly more expensive than Sonnet, and Sonnet is significantly more expensive than Haiku. Use Sonnet as your default. Reach for Opus when the task genuinely needs deeper reasoning: gnarly debugging, architectural decisions, long-context retrieval, anywhere a Sonnet answer would be a coin flip. Switch with `/model` mid-session. In Claude Code, you can set Haiku as the subagent model (`CLAUDE_CODE_SUBAGENT_MODEL=haiku`) so exploration runs cheap while your main session stays on Sonnet or Opus.

**Edit prompts, don't argue with them.** When Claude misses, the instinct is to send *"no, I meant..."* That doubles the cost: the failed exchange stays in context, the correction adds more, the new response adds more. Editing the original message replaces the failed branch instead of stacking on top of it. In chat, hit the pencil icon. In Cowork, "Restart conversation from here" on an earlier message. In Claude Code, `/rewind` rolls both the conversation and any code changes back to a checkpoint. The earlier you rewind, the more you save.

**Start fresh more often than feels comfortable.** The instinct is to keep going because the chat has context you don't want to lose. The reality is that by message 30, you're paying for messages 1 through 29 on every turn, and most of that history is no longer relevant. Ask Claude to summarise what matters, copy the summary, open a new chat, paste it as your first message. You get the context you need without the bloat you don't. In Claude Code, `/clear` is the same idea (whole-conversation wipe). `/compact` is the lighter version (summarise the conversation in place and continue).

**Use the right structure for the right context.** Stable, repeat-every-session context (build commands, conventions, do-not-touch directories) belongs in `CLAUDE.md` or project instructions. Task-specific context belongs in the prompt for the current task. Specialised, occasionally-needed instructions belong in skills (loaded on demand only). The mistake is putting everything in `CLAUDE.md` "to be safe." Every line in `CLAUDE.md` pays its full cost on every turn of the session, even when 90% of it isn't relevant to what you're doing right now.

**Batch related questions.** Three separate messages to ask three related things means Claude re-reads the conversation three times. One message with three asks reads it once. *"Summarise this article, list the main points as bullets, then suggest a headline"* gets you one context load, three answers, and often a better result because Claude sees the full ask up front.

**Delegate exploration to subagents.** Telling Claude *"read these files and tell me what they do"* pulls every file into your main context window and keeps them there. Telling a subagent the same thing keeps the file reads in the subagent's context and returns only the summary to yours. Same answer, fraction of the cost on your main thread.

**Plan before you write.** Plan mode (Shift+Tab to cycle, or `/plan`) gets the plan right before any file gets written. The single biggest source of token waste in agentic work is trial and error: Claude writes, hits an error, retries, hits another, iterates. Each iteration costs tokens. Plan mode collapses that into a single review. The savings on complex tasks can be substantial.

## Surface-specific moves

**claude.ai chat.** Edit messages instead of arguing. Turn off connectors and tools you aren't using right now: each connector loaded into a conversation adds context to every turn. Toggle "Load tools when needed" if you have many connectors (trade-off: Claude has to go looking for tools, so it sometimes won't proactively reach for one). Use Projects for documents you'll reference across multiple chats: project files are cached after the first read, not re-tokenised every time. Toggle extended thinking off for simple tasks. New topic, new chat.

**Claude Code.** `/context` shows where your tokens are going (system, memory, tool outputs, conversation, free space, buffer). `/clear` between unrelated tasks. `/compact` at logical breakpoints inside a task (after planning, after debugging, before switching focus). Before compacting, tell Claude what to preserve: *"before we compact, note that we decided to use optimistic locking for the user update."* Keep `CLAUDE.md` under roughly 200 lines. Move specialised instructions into skills. Cap bash output lengths (long test logs flood the window). Lower the effort level with `/effort low` for trivial tasks since extended thinking is billed as output tokens.

**Cowork.** Memory lives inside projects, so recurring context belongs in a project, not the prompt. Disable connectors you aren't using for a given task. For complex deliverables, plan in chat first, then run the file creation in Cowork: file creation tasks consume more of your limit than chat does, so paying for the planning in the cheaper surface saves real budget. Use Dispatch for handoffs that don't need attachments.

## Common mistakes

**Optimising before measuring.** Token diets are a trap when you don't know where the spend is. Run `/context` (Code) or check the usage indicator (chat) before changing your workflow. The fix is usually one specific offender, not a whole new system.

**Treating `/compact` and `/clear` as interchangeable.** They're not. `/clear` wipes the conversation (use when switching to unrelated work). `/compact` summarises and continues (use when you still need the thread of what happened). Using one when you needed the other is a recurring mid-session mistake.

**Putting everything in `CLAUDE.md` "to be safe."** Every line pays its cost on every turn. Stable essentials only. Specialised things go in skills. Project-specific rules that aren't always relevant go in `.claude/rules/` and load on demand.

**Conversational follow-ups for things that could be one message.** *"Can you also make it concise? And add bullets? And reformat that?"* Each one is a full re-read of everything before it. Compose the request in a notes app first, then send the whole thing in one message.

**Keeping every connector and tool always-on.** In chat, "Tools already loaded" injects every connector into every turn. Fifteen connectors while you write an email means you're paying for fourteen that aren't doing anything. Worth disabling, or switching to "Load tools when needed."

**Re-uploading the same file to every chat.** If you reference the same PDF across multiple chats, upload it to a project once. Project files are cached after the first read. Re-uploading is paying for the same tokens repeatedly.

## When not to optimise

Token optimisation is real and meaningful, but it isn't free. The cost is your attention. Some places to stop:

For one-off short conversations, none of this matters. Just type.

For high-stakes work where quality dominates, use Opus and the bigger context window. Saving tokens at the cost of a worse answer is the wrong trade.

If you're not hitting limits and not paying API rates, optimising session habits to save 5% of a budget you weren't going to hit is yak-shaving. Spend the attention on the work, not on the savings.

The right framing: optimise the habits you do every day. Edit instead of argue, start fresh between tasks, delegate exploration to subagents, keep `CLAUDE.md` lean. The compounding savings on daily habits beat one-off cleverness every time.

---
title: Claude.ai
lede: The web and mobile interface — what it can do that the API can't.
section: products
---

The chat product. Web at claude.ai, desktop app, mobile app on iOS and Android. Same conversation across all three. This is what most people mean when they say "Claude," and it's the surface where most thinking, drafting, and research actually happens, even for people who later run things in Claude Code or Cowork.

It's not the umbrella for everything Anthropic ships. Claude Code, Cowork, Chrome, Design and the rest are separate products with their own pages. This page is about the chat surface specifically.

## What it is

A conversational interface to Claude's models. You type, it responds. The contract is that simple, and most of the value comes from what you do inside that contract rather than the contract itself.

A few things ride on top of the chat:

**Projects.** Custom instructions plus uploaded knowledge that persist across all chats inside the project. The chat is where you talk to Claude. The project is where you set up *how* Claude should talk to you for a specific kind of work. Full breakdown lives on the [Projects](/concepts/projects) page.

**Artifacts.** When Claude generates something substantial (code, a long document, a diagram, an interactive widget), it opens in a side panel you can edit, iterate on, and export. Turns the experience from "chat with quotes in it" into something closer to a collaborative editor. Detailed treatment on the [Artifacts](/concepts/artifacts) page.

**Research.** A mode that runs longer, multi-step web research and returns a structured report with citations. Different from a regular chat with web search turned on. Covered in depth on the [Research](/concepts/research) page.

**Memory.** Claude builds a profile from past chats and uses it across new ones. You can view and edit what it remembers. See the [Memory](/concepts/memory) page.

The point of this page is not to re-explain those features. It's to talk about the product they live inside.

## How people use it

Three patterns cover most serious use:

**As a thinking partner.** Planning, brainstorming, working through a decision out loud, stress-testing an idea before committing to it. The conversation format is the feature here. You're not asking for an answer, you're using the back-and-forth to sharpen your own thinking.

**As a drafting surface.** First drafts of writing, code, plans, outlines, scripts, anything that benefits from a fast loop of "produce something, react to it, refine." Artifacts make this concrete: the draft sits in a panel you keep editing instead of getting buried in chat history.

**As a research and synthesis tool.** Reading long documents, comparing sources, pulling structure out of mess. Long context windows mean you can drop in entire reports, transcripts or codebases and ask questions across them rather than chunking the work yourself.

The web, desktop and mobile apps share the same account, the same chat history, the same models. Desktop is the practical default for sustained work because the window stays put and you can have it side by side with whatever you're working on. Web is identical in capability and useful when you're on a machine that isn't yours. Mobile is meant for short interactions, voice mode, snapping a photo of something to ask about, capturing an idea while you're away from a keyboard. It's not where deep work happens, and that's fine.

## How to use it well

Most of what separates people who get a lot from Claude.ai from people who don't comes down to a few habits.

### Plan here, execute elsewhere

Claude.ai is the strongest surface for thinking, planning, brainstorming and research. You can iterate fast, push back, change direction, throw away ideas. The chat format rewards that.

For execution, especially anything that touches files, runs code, or does sustained agentic work, [Claude Code](/products/claude-code) or [Cowork](/products/cowork) are usually a better fit. They have access to your filesystem, can run commands, can keep going across long tasks.

A workflow that works well in practice: think and plan in Claude.ai until you have a clear, specific brief. Hand the brief to Claude Code or Cowork. Come back to Claude.ai when you need to think again.

You *can* plan in Claude Code (it has a plan mode and brainstorming flow built in) and many people do. The honest take from one practitioner perspective: planning in Claude.ai with strong prompting tends to produce equally good or better plans, because the conversational interface is purpose-built for that loop. But this is a preference, not a rule. Try both.

### Use projects to keep different work separate

Projects are not just a folder system. Each project has its own custom instructions and its own uploaded knowledge, which means each project trains Claude to behave differently for that kind of work.

A few examples of what this looks like in practice:

A project for school assignments where the instructions tell Claude to teach rather than answer, asking guiding questions and explaining reasoning step by step.

A separate project for school assignments where you need solid answers fast, with instructions tuned for that.

A project for a job search where you paste in a person or company and get a tailored outreach message back, plus a follow-up draft when they reply.

A project for entrepreneurship work, with your context and goals already loaded.

The reason this matters: without projects, every new chat starts from zero. You burn the first few messages explaining who you are and what you're doing. With projects, that context is already there, and Claude responds in the right register from message one.

### Manage tokens like they're money, because they are

Claude re-reads the entire conversation every time you send a new message. That means message 30 is much more expensive than message 1, even if both messages are short. Edit replaces; follow-ups accumulate.

A few habits that pay off immediately:

**Edit instead of replying with corrections.** When Claude gets something wrong, find your previous message, hover, click edit, fix the prompt, regenerate. The wrong exchange disappears from history entirely. Most people instead type "no, I meant..." as a new message, which keeps the bad exchange in context permanently and gets re-read on every future turn.

**Start a new chat when the topic changes.** Long chats are expensive chats. If you're done with one thread and starting something new, open a new conversation. If you need to carry context, ask for a one-paragraph summary, paste it into the new chat as the first message.

**Pick the right model.** Sonnet handles most things at lower cost. Opus is for problems that genuinely need it. Defaulting to Opus for everything will burn through limits fast.

**Batch related questions.** Three separate messages each trigger a full context reload. One message with three questions costs roughly a third as much.

**Turn off web search and connectors when you don't need them.** Each one loads tool definitions into your context window before you've even sent your first message. They cost tokens whether you use them or not.

### Set persistent preferences once

Settings → Personal Preferences lets you tell Claude how you write, think and want to be talked to. It applies to every chat, costs nothing in context, and saves you the few setup messages most people waste at the start of a fresh conversation.

Same logic for custom styles. If you write in a specific voice, set up a style and stop re-explaining it.

## Common mistakes

**Treating one chat as a permanent workspace.** People keep a single conversation running for days. By the time they're 50 messages in, every response is slow, expensive, and pulling from a context full of stale stuff. New chat per topic. Carry forward only what matters.

**Re-uploading the same file across chats.** If you reference the same document repeatedly, put it in a project once. Otherwise Claude pays the token cost on every upload.

**Defaulting to Opus.** Opus is for hard problems. Most things don't need it. If Claude could plausibly answer your question in under 30 seconds, you didn't need Opus.

**Vague follow-ups.** "Make it better." "Try again." Claude has to guess what you meant, and usually guesses wrong, which costs another round trip. Speak the correction out loud (literally, voice mode is fine for this) and you'll naturally include the context that makes the second attempt land.

**Treating Claude.ai as a docs replacement.** It's a thinking partner and a drafting surface. It is not a search engine for the official Anthropic documentation. When you need authoritative info on how a feature works, the docs are the source of truth. Use Claude to *understand* what the docs say, not to replace them.

## Mobile, briefly

Voice mode works well for thinking out loud while walking or doing something else with your hands. The mobile camera is useful when you want to ask about something physical (a sign, a piece of paper, an object). For sustained work, the form factor is the wrong shape, and that's not a Claude problem, that's just what phones are.

## When to reach for something else

If you're writing or editing files, running code, or doing sustained agentic work, [Claude Code](/products/claude-code) is the right surface. If you want Claude to operate apps on your computer the way a human would, that's [Cowork](/products/cowork). If you want it watching the page you're on in the browser, [Chrome](/products/chrome). The [Choosing a Product](/foundations/choosing-a-product) page covers the full decision tree.

For everything that lives upstream of execution, planning, thinking, drafting, research, learning, this is the right place.

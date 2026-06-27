---
title: Voice
lede: "Teaching Claude to write in your voice, so the emails, documents, and drafts it produces read like you wrote them rather than like AI. How to capture a voice, where to apply it, and how to keep it from drifting back to generic."
section: concepts
---

By default Claude writes like the average of everything it has read. That average is competent, grammatical, and completely characterless. It is the voice of no one, which is why a draft can be technically fine and still unusable: it does not sound like you, and anything going out under your name has to sound like you. The reflex is to fix this per message, re-explaining your tone every time you ask for an email. The better move is to give Claude your voice once and apply it everywhere it writes.

That is what this page is about. Not the mechanics of the styles menu, which live on the [output styles](/concepts/output-styles) page, and not the facts Claude should know about you, which live on the [Memory](/concepts/memory) page. This is the layer between them. Prompting is how you ask. Memory is who you are. Voice is how you sound. It is the part that turns a correct draft into one you would actually send.

## Why Claude sounds generic by default

The [prompting](/concepts/prompting) page has the mechanism: Claude produces the most likely continuation of what it can see. Give it no signal about how you write and the most likely continuation is the median of the training text, which is exactly the bland, hedged, list-happy register everyone recognises as AI. The tells are consistent. Throat-clearing openers. "It is worth noting." Tidy rule-of-three sentences. A summary paragraph nobody asked for. Words like "delve," "elevate," "tapestry," and "in today's fast-paced world." None of that is wrong. It is just nobody in particular, and "professional and engaging" describes everyone, so it lands as no one.

The lever is the single most useful line on the prompting page: examples beat description. You cannot adjective your way to a voice. "Conversational, warm, and authentic" means almost nothing to a model, because it describes half the internet. A paragraph you actually wrote means everything, because it is a concrete pattern to continue rather than a vague target to approximate. Everything below is built on that one fact.

## Voice is an artifact, not a setting

The mistake that wastes the most effort here is treating voice as a feature you toggle. Features change. As of 2026 the claude.ai custom-styles menu is being folded into [skills](/extending/skills): existing custom styles convert to skills automatically, you enable them under Customize, and you invoke one by typing `/{name}-style`. The presets are being trimmed and the styles menu is going away. If your mental model was "I set up a Style," that model just churned.

The thing that does not churn is the voice itself, captured as a small portable artifact. Call it a voice profile: a short markdown document that describes how you write, with examples. Once you have it, applying it is just a matter of dropping it into whatever slot a given surface reads from.

<svg class="svg-wide" viewBox="0 0 800 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One voice profile applied across every surface. A central captured voice profile feeds four surfaces: claude.ai as a skill, formerly a custom style; Claude Code as an output style or CLAUDE.md; the API as a system prompt plus sample paragraphs; and projects and Cowork as project instructions. The mechanism changes per surface but the captured voice does not.">
  <text x="400" y="28" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="600" letter-spacing="1.4">ONE PROFILE, EVERY SURFACE</text>
  <text x="400" y="46" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.55" font-style="italic">the mechanism changes, the captured voice does not</text>

  <!-- artifact -->
  <rect x="50" y="120" width="190" height="100" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.75"/>
  <text x="145" y="162" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.6">VOICE PROFILE</text>
  <text x="145" y="184" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.65">captured once</text>
  <text x="145" y="200" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.65">portable markdown</text>

  <!-- connectors -->
  <line x1="240" y1="170" x2="462" y2="92" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="462,87 470,92 462,97" fill="#d97706" fill-opacity="0.7"/>
  <line x1="240" y1="170" x2="462" y2="158" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="462,153 470,158 462,163" fill="#d97706" fill-opacity="0.7"/>
  <line x1="240" y1="170" x2="462" y2="224" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="462,219 470,224 462,229" fill="#d97706" fill-opacity="0.7"/>
  <line x1="240" y1="170" x2="462" y2="290" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="462,285 470,290 462,295" fill="#d97706" fill-opacity="0.7"/>

  <!-- surfaces -->
  <rect x="470" y="66" width="290" height="52" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="486" y="88" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">claude.ai</text>
  <text x="486" y="106" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.75">a skill (formerly a custom style)</text>

  <rect x="470" y="132" width="290" height="52" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="486" y="154" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">Claude Code</text>
  <text x="486" y="172" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.75">an output style or CLAUDE.md</text>

  <rect x="470" y="198" width="290" height="52" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="486" y="220" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">the API</text>
  <text x="486" y="238" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.75">system prompt + sample paragraphs</text>

  <rect x="470" y="264" width="290" height="52" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="486" y="286" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="700">projects and Cowork</text>
  <text x="486" y="304" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.75">project instructions</text>
</svg>

So the work worth doing is capturing the voice well. The surface-specific part is plumbing, and the plumbing will keep changing. Get the artifact right and you carry it through every migration unbothered.

## Capturing your voice

There is a repeatable pipeline for building that artifact, and it is short. Capture real examples, distill what makes them yours, encode that into a profile, apply it, then iterate by comparing output to the real thing.

<svg class="svg-wide" viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The voice pipeline. Four stages run left to right: Capture, raw samples both written and spoken; Distill, into traits, phrases, and words to avoid; Encode, into the voice profile, which is the artifact; and Apply, as a skill, output style, or system prompt. A feedback loop runs from Apply back to Encode, labelled iterate: compare to the real you, then fix the profile.">
  <text x="400" y="30" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="600" letter-spacing="1.4">THE VOICE PIPELINE</text>
  <text x="400" y="48" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.55" font-style="italic">capture once, refine forever</text>

  <!-- feedback loop -->
  <path d="M 685 120 L 685 82 L 495 82 L 495 118" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7" stroke-dasharray="5 3"/>
  <polygon points="490,112 495,122 500,112" fill="#d97706" fill-opacity="0.7"/>
  <text x="590" y="74" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.6" font-style="italic">iterate · compare to the real you, then fix the profile</text>

  <!-- boxes -->
  <rect x="40" y="120" width="150" height="86" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="115" y="152" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.6">CAPTURE</text>
  <text x="115" y="174" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.7">raw samples</text>
  <text x="115" y="190" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.7">written + spoken</text>

  <rect x="230" y="120" width="150" height="86" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="305" y="152" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.6">DISTILL</text>
  <text x="305" y="174" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.7">traits · phrases</text>
  <text x="305" y="190" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.7">words to avoid</text>

  <rect x="420" y="120" width="150" height="86" rx="4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.75"/>
  <text x="495" y="152" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.6">ENCODE</text>
  <text x="495" y="174" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.85">the voice profile</text>
  <text x="495" y="190" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.6">the artifact</text>

  <rect x="610" y="120" width="150" height="86" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.35"/>
  <text x="685" y="152" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.6">APPLY</text>
  <text x="685" y="174" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.7">skill · output style</text>
  <text x="685" y="190" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10.5" opacity="0.7">system prompt</text>

  <!-- forward arrows -->
  <line x1="192" y1="163" x2="226" y2="163" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="226,158 234,163 226,168" fill="#d97706" fill-opacity="0.7"/>
  <line x1="382" y1="163" x2="416" y2="163" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="416,158 424,163 416,168" fill="#d97706" fill-opacity="0.7"/>
  <line x1="572" y1="163" x2="606" y2="163" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.7"/>
  <polygon points="606,158 614,163 606,168" fill="#d97706" fill-opacity="0.7"/>

  <text x="400" y="250" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.6" font-style="italic">The voice profile is the artifact you refine, not a prompt you retype each time.</text>
</svg>

**Capture: feed it the real you.** Gather things you actually wrote and, ideally, things you actually said. Real emails you sent, posts, a memo, a doc. Then transcribe yourself talking, a voice note or a recording of you explaining something, because speech captures your natural rhythm and filler in a way edited writing sanitises away. The one rule that matters more than quantity: use authentic, lightly-edited material. The most common way this fails is feeding Claude AI-polished text, at which point it learns the polish and hands it back to you, and you have taught it to sound like the thing you were trying to escape. Spread the samples across the registers you care about, but keep them genuinely yours.

**Distill: name what makes it yours.** You cannot see your own voice until it is reflected back, so have Claude do the reflecting. Paste the samples and ask it to surface the patterns: your typical sentence length and rhythm, how you open and how you close, your signature phrases, the stances and opinions that recur, your filler tics, and, most usefully, the anti-patterns, the words and constructions you never use that read as machine-written. This last list is gold, because half of sounding like you is not sounding like AI. Then verify. The analysis will get some things wrong or flattering; cut what is not true. You are the ground truth here, not the model.

**Encode: write the voice profile.** Turn the distillation into a short markdown document. A good one has a one-line statement of who you are and who you write for, a handful of tone traits, the sentence-level patterns, your signature phrases, an explicit "do not sound like this" list, and two or three gold-standard examples pasted verbatim. Keep it tight. The same rule from the [Memory](/concepts/memory) page applies: a focused profile beats a sprawling one, because every line competes for attention, and the examples carry more weight than any adjective you could add.

**Apply: put it where the surface reads from.** On claude.ai, the profile becomes a [skill](/extending/skills). In [Claude Code](/products/claude-code) it goes in an [output style](/concepts/output-styles) or `CLAUDE.md`. In the API it is the system prompt, with the sample paragraphs included as few-shot examples. In a [project](/concepts/projects) or [Cowork](/products/cowork) it is the project instructions. One artifact, whichever slot the surface gives you.

**Iterate: fix the profile, not the prompt.** Generate a draft, set it next to something you genuinely wrote, and hunt for the tells. Where does it still sound like a model? Then change the *profile* to close that gap rather than re-prompting around it in the moment. This is the [loop](/concepts/loops) idea applied to writing: the profile is the artifact that improves, and after a handful of rounds the drafts stop needing edits. If a particular register keeps coming out wrong, the fix is almost always more or better samples of that register, not more adjectives.

## One voice, or several

You do not write a condolence note the way you write a launch announcement, so a single rigid profile will feel wrong somewhere. The structure that holds up is a stable core plus thin overlays. The core is everything constant across all your writing: your values, your rhythm, your anti-AI list, the phrases that are always yours. The overlays are short, per-context adjustments, a calmer register for client email, a looser one for social, a more structured one for reports. Splitting by platform is a real practice and worth doing when the registers genuinely differ, but anchor every split to the same core, or you end up maintaining several disconnected voices that drift apart and dilute the thing that made them recognisably you.

## A worked example

The method is short enough to walk end to end. Here is the whole thing with real artifacts you can copy and adapt.

**Distill.** Gather five to ten things you actually wrote, paste them in, and use a prompt like this. It asks for patterns, not praise, and it asks Claude to flag what it is unsure about so you stay the ground truth:

```
Below are things I wrote myself, unedited. Analyse them as writing samples,
not for their content. Be specific and quote me. Tell me:
- my typical sentence length and rhythm
- how I tend to open, and how I tend to close
- words and phrases I reach for repeatedly
- what I have opinions about, and how blunt I am about them
- my filler and verbal tics
- a list of words or constructions I never use, so we can tell you to avoid them
Flag anything you are unsure about so I can correct it.

<sample 1: a real email I sent>
<sample 2: a paragraph from a post>
<sample 3: a transcript of me talking>
...
```

**Encode.** Edit what comes back into a tight profile. This is the artifact, and a good one is short. An illustrative shape:

```markdown
# Voice profile

## Who I am writing as
Founder of a small dev-tools company, writing mostly to engineers and technical
founders. Plain, direct, a little dry.

## How I sound
- Short sentences, one idea each. I break a grammar rule for rhythm on purpose.
- I open cold, no throat-clearing. I close on a blunt line, not a summary.
- I make a claim, then qualify it once, never three times.
- Dry, never jokey. No exclamation marks.

## Phrases that are mine
- "Here is the thing."
- "X is fine. Y is the problem."

## Never (reads as AI, not me)
- "delve", "elevate", "seamless", "robust", "in today's landscape"
- rule-of-three lists where two would do
- "it's not just X, it's Y"
- a closing paragraph that restates what I just said

## Gold-standard examples
> [paste three or four sentences of a real email you wrote]

> [paste a real paragraph from a post or doc]
```

**Apply.** Drop that file into the slot for your surface: a custom style or skill on claude.ai, an [output style](/concepts/output-styles) or `CLAUDE.md` in Claude Code, the system prompt in the API with the two examples kept as few-shot. Then give it a real task and compare the result to something you genuinely wrote.

**Flex it across formats.** This is the part that answers "can it write different things the way I would." The core profile above never changes. For each format you add a short overlay, three or four lines, and pass core plus overlay together:

```
Email overlay:  Under 120 words. Get to the ask in the first two sentences.
                Sign off with just my first name.

Report overlay: Short section headers. Lead each section with the conclusion,
                then support it. Keep my voice in the prose, not in fragments.

Social overlay: One idea per post. First line is the hook. No hashtags.
```

Then you ask, for instance, *"Draft a reply to this email using my voice profile plus the email overlay,"* or *"Write the summary section of this report using my voice profile plus the report overlay."* Same captured voice, three different jobs, each shaped to its format. That is the realistic version of writing like you across everything you produce: not one button, but one voice plus a thin layer per context. It gets a launch email, a status report, and a LinkedIn post to all sound like the same person, because they are anchored to the same core.

A fair expectation to set: this gets you drafts that are mostly there and improve every iteration, not a perfect clone on the first try. The higher the stakes, the more you still read it before it goes out. What it removes is the blank page and the generic first draft, which is most of the work.

## Voice is not substance

Worth saying plainly, because it is the failure mode people hit after the voice works: a voice profile makes Claude sound like you. It does not make it think like you or know what you know. A perfectly-voiced email built on the wrong facts is more dangerous than a generic one, because it reads as authoritative and yours while being wrong. Voice is one of three layers, and it is the thinnest. [Memory](/concepts/memory) is who you are. Your notes, your decisions, your actual positions, the layer the [second brain](/systems/second-brain) page is about, are what you think. Voice is only how you sound. The drafts that genuinely do not need rewriting are the ones where all three are present: the voice is yours, the facts are yours, and the take is yours. Pairing voice with the other two is where this stops being a party trick and starts saving real time.

## Common mistakes

**Training on polished or AI-written samples.** The model learns whatever you feed it. Feed it the over-edited, the ghostwritten, or its own past output, and it converges on exactly the generic register you were trying to leave. Raw drafts and transcripts beat your most carefully revised work for this one purpose.

**Describing instead of showing.** "Make it sound warm and human" is a wish a model cannot reliably act on. A pasted paragraph that *is* warm and human is an instruction it can. When in doubt, add an example, not an adjective.

**One profile for everything, or five for nothing.** Forcing a single voice across genuinely different registers makes some of them feel off. Building five unrelated profiles makes none of them improve. Core plus overlays is the balance.

**Chasing AI detectors.** Detectors are unreliable and easy to mislead in both directions, so a passing score proves little and a failing one even less. The goal is sounding like you, which happens to read as less generic. It is not gaming a classifier, and optimising for the classifier will pull you away from your actual voice.

**Letting the profile ossify.** Your writing shifts over time, and a profile built from last year's samples slowly stops matching you. Refresh it the way you curate memory: occasionally, with current material, removing what no longer fits.

**Confusing voice with role.** Changing *how* Claude sounds is a voice profile. Changing *what job* Claude is doing, turning it into a code reviewer or a research assistant, is an [output style](/concepts/output-styles) as a role. Different tools for different jobs; do not reach for one when you need the other.

## Where to start

The lightest version pays off immediately. Take five real things you wrote, create one custom style or skill on claude.ai, and use it for drafting. That single step removes most of the generic feel. From there, encode a proper portable voice profile, apply it in the surface you draft in most, and run three rounds of compare-and-fix. Then pair it with [Memory](/concepts/memory) and your own knowledge so the drafts are not just in your voice but built on what you actually know and think.

Done well, this is the third leg of making Claude yours. Prompting is how you ask, memory is who you are, and voice is how you sound. The first two get you correct answers. The third is what makes the writing read like it came from you, which, for anything you put your name on, is the whole point.

---
title: Design
lede: Claude for visual and product design workflows.
section: products
---

A visual workspace for making prototypes, slide decks, microsites, and other design work by talking to Claude. It lives at claude.ai/design as a separate surface from regular chat. It is currently a research preview from Anthropic Labs (Anthropic's experimental product team), available on Pro, Max, Team, and Enterprise plans, and off by default for Enterprise admins until they enable it.

The core idea: you describe what you want, Claude builds a first version on a live canvas, then you refine it through conversation, inline comments, direct edits, and sliders that Claude generates for the specific design you are working on. It runs on Claude Opus 4.8, the most capable vision model in the family.

A few things to know up front. Claude Design is not a Figma replacement; collaboration is basic and there is no plugin ecosystem. It is also not Canva; for polished marketing assets you will often still finish in Canva (there is an official handoff for that). What it actually is: the early-stage exploration surface, and more importantly, the front of a pipeline that ends with [Claude Code](/products/claude-code) building the thing.

<svg viewBox="0 0 760 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Claude Design pipeline: brand assets feed a design system, optionally preprocessed by Cowork, which feeds Claude Design, whose output goes either to Claude Code for production or to static export for review">
  <defs>
    <style>
      .d-label { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 12px; fill: var(--color-text, #e8e8e8); }
      .d-label-strong { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 13px; font-weight: 600; fill: var(--color-text, #e8e8e8); }
      .d-label-muted { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 10px; fill: var(--color-text-muted, #9a9a9a); }
      .d-label-tag { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.05em; fill: var(--color-text-muted, #9a9a9a); }
      .d-box { fill: var(--color-surface, #1a1a1a); stroke: var(--color-border, #2e2e2e); stroke-width: 1; }
      .d-box-accent { fill: var(--color-surface-accent, #1f1f1f); stroke: var(--color-accent, #c97b48); stroke-width: 1.5; }
      .d-box-optional { fill: var(--color-surface, #1a1a1a); stroke: var(--color-border, #2e2e2e); stroke-width: 1; stroke-dasharray: 5 3; }
      .d-arrow { stroke: var(--color-border-strong, #555); stroke-width: 1.25; fill: none; marker-end: url(#d-arrowhead); }
      .d-arrow-dashed { stroke: var(--color-border-strong, #555); stroke-width: 1.25; fill: none; stroke-dasharray: 5 3; marker-end: url(#d-arrowhead); }
    </style>
    <marker id="d-arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 z" fill="var(--color-border-strong, #555)" />
    </marker>
  </defs>
  <!-- Brand assets -->
  <rect class="d-box" x="10" y="90" width="110" height="52" rx="5" />
  <text class="d-label-strong" x="65" y="111" text-anchor="middle">Brand assets</text>
  <text class="d-label-muted" x="65" y="127" text-anchor="middle">logos, fonts, code,</text>
  <text class="d-label-muted" x="65" y="139" text-anchor="middle">Figma, notes</text>
  <!-- Arrow: Brand assets → Design system -->
  <line class="d-arrow" x1="121" y1="116" x2="169" y2="116" />
  <!-- Cowork optional branch (above main path) -->
  <rect class="d-box-optional" x="90" y="18" width="130" height="46" rx="5" />
  <text class="d-label-tag" x="155" y="32" text-anchor="middle">OPTIONAL</text>
  <text class="d-label-strong" x="155" y="47" text-anchor="middle">Cowork preprocess</text>
  <text class="d-label-muted" x="155" y="59" text-anchor="middle">synthesise scattered assets</text>
  <!-- Dashed arrows for optional branch -->
  <line class="d-arrow-dashed" x1="120" y1="100" x2="120" y2="52" />
  <line class="d-arrow-dashed" x1="120" y1="52" x2="176" y2="52" />
  <line class="d-arrow-dashed" x1="220" y1="52" x2="250" y2="52" />
  <line class="d-arrow-dashed" x1="250" y1="52" x2="250" y2="100" />
  <!-- Design system setup -->
  <rect class="d-box" x="175" y="90" width="120" height="52" rx="5" />
  <text class="d-label-strong" x="235" y="111" text-anchor="middle">Design system</text>
  <text class="d-label-muted" x="235" y="127" text-anchor="middle">colors, type, spacing,</text>
  <text class="d-label-muted" x="235" y="139" text-anchor="middle">components</text>
  <!-- Arrow: Design system → Claude Design -->
  <line class="d-arrow" x1="296" y1="116" x2="344" y2="116" />
  <!-- Claude Design (center, accent) -->
  <rect class="d-box-accent" x="350" y="82" width="130" height="68" rx="6" />
  <text class="d-label-strong" x="415" y="107" text-anchor="middle">Claude Design</text>
  <text class="d-label-muted" x="415" y="122" text-anchor="middle">prototype · slide deck</text>
  <text class="d-label-muted" x="415" y="136" text-anchor="middle">microsite · other</text>
  <!-- Arrow: Claude Design → split point -->
  <line class="d-arrow" x1="481" y1="116" x2="529" y2="116" />
  <!-- Output top: Claude Code handoff -->
  <rect class="d-box" x="535" y="58" width="130" height="46" rx="5" />
  <text class="d-label-strong" x="600" y="78" text-anchor="middle">Claude Code handoff</text>
  <text class="d-label-muted" x="600" y="93" text-anchor="middle">production implementation</text>
  <!-- Output bottom: Static export -->
  <rect class="d-box" x="535" y="126" width="130" height="46" rx="5" />
  <text class="d-label-strong" x="600" y="146" text-anchor="middle">Static export</text>
  <text class="d-label-muted" x="600" y="161" text-anchor="middle">PDF, PPTX, HTML, Canva</text>
  <!-- Fork lines from split point to outputs -->
  <line class="d-arrow" x1="529" y1="116" x2="529" y2="81" />
  <line class="d-arrow" x1="529" y1="81" x2="534" y2="81" />
  <line class="d-arrow" x1="529" y1="116" x2="529" y2="149" />
  <line class="d-arrow" x1="529" y1="149" x2="534" y2="149" />
  <!-- Output labels -->
  <text class="d-label-tag" x="600" y="193" text-anchor="middle">for review</text>
  <text class="d-label-tag" x="600" y="48" text-anchor="middle">for production</text>
</svg>

## What you can make

Four creation paths from the start screen:

**Prototype.** Interactive web prototypes from one page up to multi-screen flows. Pick **Wireframe** for low-fidelity layouts (gray boxes, structure first) or **High fidelity** for full visual design. Wireframe when you are still figuring out structure, high fidelity once you know it.

**Slide deck.** Full presentations from a rough outline. Stays on-brand once your design system is set up. Exports as PPTX, HTML, or PDF, or sends to Canva for finishing.

**From template.** A library of curated starters. Useful when you want the structure of a common pattern handed to you instead of describing it from scratch.

**Other.** Open-ended canvas. The path for things that do not fit cleanly into the above: one-pagers, marketing collateral, ad creative, single-page brand work.

Beyond the start screen, the right side of the dashboard has tabs for **Designs** (your projects), **Examples** (community designs you can copy code from), and **Design Systems** (your brand setup, covered next).

## The design system is step one

This is the part most beginners skip and then wonder why the output looks generic. Click "Set up design system" before you make anything serious.

The setup form takes:

- A name and short blurb about your company or product
- A GitHub link or local code (local linking requires Chrome or Edge; nothing uploads, Claude reads files locally and copies what it needs)
- A `.fig` file (parsed locally in your browser, not uploaded)
- Fonts, logos, and other brand assets
- Free-form notes (color palette, voice, anything else worth saying)

Everything is technically optional, but more inputs means a better system. Claude reads your code and assets, extracts a reusable design system (colors, typography, components, spacing, patterns), and applies it automatically to every project after that.

Two things worth knowing here.

**Big monorepos eat your usage limits and lag the browser.** Link a frontend-focused subfolder instead of the whole repo. Reviewers report this is the difference between a five second response and a thirty second one.

**For messy or scattered brand assets, do a [Cowork](/products/cowork) preprocessing pass first.** Drop everything into a folder, ask Cowork to write a single `DESIGN.md` covering colors, fonts, components, voice, and patterns, with anything missing flagged. Feed that file to Claude Design's onboarding. Cowork is better at synthesizing across many files; Claude Design's onboarding works better with coherent input than with a pile of raw assets.

What "skipping the design system" actually looks like in practice: functional layouts in the default Claude Design aesthetic, vaguely modern but obviously not yours. Once your system is set up, projects automatically pick up your colors, fonts, and components, and you can reference your own components by name in prompts ("use the Primary Button," "follow the layout pattern from the settings page").

## How you actually work in it

The interface is two panes. Chat on the left, live canvas on the right. You describe what you want in chat, watch Claude build it on the canvas, then refine.

There are four ways to change something, and they are not interchangeable.

**Chat.** Structural changes, aesthetic shifts, exploring alternatives, asking Claude to explain a design choice, asking for an accessibility or hierarchy review. Anything that needs context.

**Inline comments.** Click directly on an element and pin a comment to it. "Make this button padding larger." "Replace this image with an abstract illustration." "Use the brand primary color here." This is the right tool for component-level changes. It is also significantly cheaper in tokens than a chat turn, which matters because vision tokens are roughly 3x text tokens.

**Direct text edit.** Click into any text block and type. The right tool for copy tweaks, headline rewrites, fixing typos.

**Sliders (the Tweak panel).** Claude generates custom sliders contextual to your design (spacing, radius, color temperature, layout density). Use these when you know you want to adjust something but not the exact value. Drag until it looks right. Reviewer takes are mixed; some find the panel precise, others find it buggy. Try it on your work; if it is not helping, fall back to comments.

Rule of thumb: if you find yourself describing in chat which element you mean, you should be using a comment instead. If you find yourself making a structural change through a comment, you should be using chat.

## Exports and the Claude Code handoff

The export menu offers:

- **Internal URL** with view, comment, or edit access scoped to your organization
- **PDF** for stakeholder review
- **PPTX** for slide decks
- **Standalone HTML** for an interactive prototype you can host yourself
- **`.zip`** of raw assets
- **Send to Canva** which opens the design as a fully editable Canva file
- **Handoff to Claude Code** which packages the design plus design-system context into a bundle Claude Code picks up and implements

The Claude Code handoff is what makes this a production tool and not a sketch tool. Because the design was built using your linked codebase's components and styling, the gap between prototype and shippable code is much smaller than the usual Figma to engineer handoff. You describe the change, refine the prototype, hit Handoff, and [Claude Code](/products/claude-code) writes the feature against the same design system Claude Design was using.

## How to use it well

**Set up the design system first, properly.** Without it, you are using a generic generator. With it, you are using a tool that knows your brand. This is the single biggest variable in output quality.

**Lean on inline comments for everything component-scoped.** Cheaper, more targeted, faster. Save chat for changes that need explaining.

**Ask for variations explicitly.** "Show me three directions for the hero: minimal, expressive, retro-technical." Generating alternatives in parallel is dramatically faster than guessing one direction at a time, and it is something Figma cannot really do.

**Use direct text edits for copy, not chat.** Telling Claude to "change the headline to X" through chat is wasteful. Click and type.

**Save before pivoting.** Tell Claude "save what we have and try a different approach." It branches, and you can return to the saved version through chat.

**Ask Claude to review its own work.** Accessibility, contrast ratios, hierarchy, general usability. Underused. Treat Claude as a design collaborator, not just a generator.

**Watch the token spend.** Vision tokens cost roughly 3x text tokens. Two heavy prompts can eat a meaningful chunk of a Pro plan's weekly limit. The pattern most practitioners converge on: scaffold once with a fully-loaded initial prompt, then iterate with inline comments, direct edits, and sliders to keep usage low.

**Drop video or screen recordings for motion intent.** When you want a specific interaction style or animation feel, a screen recording captures it better than a written spec. Claude can interpret motion from video.

## What people get wrong

**Skipping the design system.** Already covered, but it is the single biggest mistake.

**Chat-prompting every small change.** Burns tokens, slow, often less precise. Use comments for components, sliders for values, direct edits for copy.

**Linking the entire monorepo.** Lag, browser issues, blown limits. Use a frontend-focused subfolder.

**Expecting Figma-grade collaboration.** Multiplayer is basic. For team design work that needs deep collaboration, you will still round-trip through Figma.

**Expecting production-ready code from the visual side alone.** Claude Design produces working prototypes, not shippable code. The path to shippable runs through the Claude Code handoff.

**Ignoring the known issues.** A few are worth keeping in mind. Inline comments occasionally vanish before Claude reads them; if a comment does not land, paste the same text into the chat instead. Compact view can trigger save errors; switch to full view and retry. A "chat upstream error" usually clears if you start a fresh chat tab inside the same project. The Send to Canva integration can be flaky; export to PPTX or HTML if it fails.

## Examples

**New feature mockup with handoff.** "Rebuild our settings page. Three tabs: Profile, Billing, Team. Move the notification toggles under a new Preferences tab. Use our existing design system." Iterate with inline comments and a few chat passes until it matches what you want, then export to [Claude Code](/products/claude-code) as a handoff bundle. Claude Code implements it against your real codebase, using the same components.

**Pitch deck from a rough outline.** Paste your bullet-point outline into chat, pick Slide deck, let Claude build the first version, then refine slide by slide with inline comments. Export to PPTX, or send to Canva if a designer needs to polish.

**Landing page for a launch.** Use From template if a similar pattern exists, or Prototype if not. Generate three variations of the hero in parallel, pick one, refine with comments, hand off to Claude Code to ship as a real Next.js page.

**Stakeholder review without engineering.** Build the prototype, share as an internal URL with comment access. Stakeholders click through, drop comments, and you iterate without anyone touching code.

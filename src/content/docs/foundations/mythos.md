---
title: Mythos & Fable
lede: The models at the frontier of what Anthropic ships, and why they're handled differently.
section: foundations
---

Most Claude models follow a predictable release cadence: announce, general availability, use it in your app. Fable 5 and Mythos 5 are different. They sit at the capability frontier and they were released with a posture that no previous Claude model has had.

## Fable 5

Claude Fable 5 is Anthropic's most capable widely released model. It's not an Opus. It's a new tier name that breaks from the Opus/Sonnet/Haiku structure, positioned above the Claude 4 generation for the most demanding reasoning and long-horizon agentic work.

Released June 9, 2026. Generally available on the Claude API, Amazon Bedrock, Vertex AI, Microsoft Foundry, and Claude Platform on AWS. Priced at $10 per million input tokens and $50 per million output tokens.

**What it does differently.** Adaptive thinking is always on and cannot be disabled. The model decides its own reasoning depth on every turn. The raw chain of thought is never exposed — set `display: "summarized"` in the API to receive readable thinking summaries. Extended thinking, which is available on Sonnet 4.6 and Haiku 4.5, is not supported on Fable 5.

**Safety classifiers.** Fable 5 ships with a classifier layer that can decline certain requests. When this happens, the Messages API returns `stop_reason: "refusal"` as a normal HTTP 200 response — not an error — and identifies which classifier triggered. You're not billed for requests refused before any output is generated. A refused request can usually be retried on another Claude model using the `fallbacks` parameter or SDK middleware.

**When to reach for it.** After Opus 4.8 on `xhigh` still leaves something on the table. Sustained coherence over very long agentic runs, the hardest reasoning tasks, work that genuinely requires more than Opus can give — those are the cases. It's not a default upgrade from Opus. It's the ceiling you move to when you've actually hit the one below it.

## Mythos 5

Claude Mythos 5 was released the same day as Fable 5. It shares the same architecture and capabilities. The difference is one thing: no safety classifiers.

This isn't a product choice. It's a deliberate capability decision tied to a specific program. Mythos 5 is available only through **Project Glasswing**, Anthropic's invitation-only defensive cybersecurity initiative. Access requires partner approval — there is no self-serve sign-up, no waitlist, and no application form. Contact your Anthropic, AWS, or Google Cloud account team if your organization is working on critical infrastructure security.

Mythos 5 is priced at $10 per million input tokens and $50 per million output tokens, the same as Fable 5.

## Project Glasswing

Glasswing launched April 2026 with Claude Mythos Preview — the first model in the Mythos line — and has since expanded with the Mythos 5 release.

The program's premise: the capabilities that make Mythos dangerous (finding software vulnerabilities and writing working exploits) are exactly the capabilities needed to secure critical infrastructure before attackers get there. So Anthropic made those capabilities available to a vetted set of organizations and pointed them at the world's most important software.

Founding partners include AWS, Apple, Google, Microsoft, Cisco, CrowdStrike, NVIDIA, Palo Alto Networks, JPMorgan Chase, the Linux Foundation, and Broadcom. Over 40 additional organizations maintaining critical software infrastructure were granted access. The program is backed by $100M in usage credits from Anthropic, plus additional funding to the Apache Software Foundation and OpenSSF.

Within weeks of launch, Mythos Preview had identified thousands of zero-day vulnerabilities across every major operating system and browser, with patches rolling out on an ongoing basis.

**The benchmark numbers.** At Glasswing launch, Anthropic published performance figures for Mythos Preview: 83.1% on CyberGym vulnerability reproduction (versus 66.6% for Opus 4.6) and 77.8% on SWE-bench Pro coding tasks (versus 53.4%). These are the numbers that explain why the program exists. A model that can reproduce known vulnerabilities at that rate can find new ones.

## What it means if you're not a partner

Two things worth keeping in mind:

The bug fixes are already reaching your software. Most operating systems, browsers, and major open-source tools have been receiving patches on the back of Glasswing findings since spring 2026. Update your software.

The safety architecture Fable 5 ships with was developed in response to what Mythos demonstrated. Future generally available models will inherit parts of that work. The frontier capability and the safeguards that accompany it are developing together — that's the dynamic to watch as Anthropic continues releasing.

## Official sources

For the current state of the program and partner list: [anthropic.com/glasswing](https://www.anthropic.com/glasswing).

For model specs and API details: [platform.claude.com/docs/en/about-claude/models/overview](https://platform.claude.com/docs/en/about-claude/models/overview).

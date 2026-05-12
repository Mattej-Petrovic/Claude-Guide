---
title: Mythos
lede: The Claude model that isn't publicly available, and why.
section: foundations
---

Mythos is the Claude model you can't use yet. Probably won't be able to use for a while. It's listed here because you'll see it referenced and the lineup makes more sense if you know what it is.

## What it is

A general-purpose model from Anthropic that turned out to be unusually capable at offensive cybersecurity (finding software vulnerabilities and writing working exploits for them) to a degree that made Anthropic decide not to release it to the public.

Anthropic announced it in April 2026 as **Claude Mythos Preview** and shipped it not as a product but as the engine behind **Project Glasswing**, a defensive cybersecurity coalition. Launch partners include AWS, Apple, Google, Microsoft, Cisco, CrowdStrike, NVIDIA, Palo Alto Networks, the Linux Foundation, and JPMorgan Chase, plus around 40 additional organizations that build or maintain critical software infrastructure. Total program is roughly 50 organizations, backed by $100M in usage credits.

What they did with it: pointed it at the world's most important software and let it find bugs. Anthropic reports thousands of zero-day vulnerabilities discovered across every major operating system and browser, with patches landing on a rolling basis.

## Why you can't have it

Anthropic's stated position: the model's cyber capabilities are too dangerous to make broadly available until critical software is in a much stronger state. There is no waitlist, no application form, no self-serve sign-up. The model is reachable through normal Anthropic platforms (API, Bedrock, Vertex AI, Microsoft Foundry) but only after partner approval, which means in practice only if your organization is already on the list.

Pricing for partners is $25 / $125 per million input/output tokens, in line with what you'd expect for a tier above Opus.

## What it means for everyone else

Two things, both worth keeping in mind even though you can't run the model yourself.

First, the bug fixes are landing in software you use. Most operating systems, browsers, and major tools have been getting patched on the back of Mythos findings. Update your stuff.

Second, the existence of this model is a signal about where the frontier is going. Anthropic has said it plans to release the safeguards developed for Mythos with an upcoming Opus model, meaning a future generally-available model will inherit some of the safety architecture, even if not the underlying capability. The capability itself is presumably reachable to attackers as well, eventually, by some other model.

## When more comes

This page will get longer when Anthropic ships a Mythos-class model with general-availability safeguards, or when concrete details emerge about what Glasswing partners are doing day-to-day with it. Until then, this is what's on the public record. For the most current Anthropic-side material, see [anthropic.com/glasswing](https://www.anthropic.com/glasswing).

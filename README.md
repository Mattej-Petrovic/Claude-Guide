# Claude Guide

A comprehensive reference guide for the Claude AI ecosystem — covering every product, concept, and workflow in one place.

Built as a personal project to go beyond Anthropic's official documentation. Where the official docs cover *what exists*, this guide covers *how to use it well*: practical depth on prompting, memory, Claude Code workflows, MCP servers, skills, hooks, and the broader extension ecosystem.

## What's inside

**7 sections, ~40 pages of original content:**

- **Foundations** — How the Claude ecosystem fits together: the model family, every product, and how to choose between them
- **Products** — Deep coverage of Claude.ai, Claude Code, Cowork, Claude in Chrome, Claude Design, Dispatch, and Phone
- **Concepts** — The mental models that matter: prompting, memory, projects, artifacts, subagents, hooks, permissions, and more
- **Extending** — Skills, MCP servers, connectors, plugins, and slash commands — what each is, when to use it, and how to compose them
- **Workflows** — Practical guides for Claude Code, Cowork, token optimization, prompting patterns, and Obsidian integration
- **Library** — Reference catalogs for built-in commands, available skills, MCP servers, and plugins
- **Settings** — A full walkthrough of every Claude setting across web and desktop, with recommendations

## Built with

- **[Astro](https://astro.build)** — static site framework with content collections
- **Pagefind** — client-side full-text search, indexed at build time
- **Plain CSS** — hand-written design system, no frameworks
- **Custom SVG diagrams** — original diagrams throughout, written directly in markup

## Design

Dark-only. Off-black backgrounds, warm amber accents, readable for long sessions. Every page follows the same rhythm: title, one-line summary, article body, optional diagram, optional cross-reference. No clutter.

## Running locally

```bash
npm install
npm run build
npx serve dist
```

Search requires the built output — it won't work on the dev server (`npm run dev`) since Pagefind indexes are generated at build time.

## Status

Content is complete across all 40 pages. Actively maintained as the Claude ecosystem evolves.

---
title: MCP
lede: The Model Context Protocol — what it is, how the client/server model works.
section: extending
---

Model Context Protocol is an open standard for connecting AI assistants to external systems. Anthropic published it in late 2024. The point of the standard is that one piece of integration work makes a tool usable by every assistant that speaks MCP, instead of every tool needing a custom plugin for every assistant.

Most people first meet MCP as "the thing that lets Claude read my Gmail" or "the thing that connects Claude to Notion." That's the surface. Underneath, MCP is the layer where you give Claude reach: into your files, your databases, your APIs, your shell, your browser, anything you can wrap in a server process.

## What MCP actually is

MCP is a protocol, not a feature. It defines how an AI client (Claude Desktop, Claude Code, Cursor, anything that supports it) talks to a server (a process that exposes tools, resources, or prompts).

A server announces what it can do. The client routes the model's requests to the right server. The model decides when and how to call.

Three things a server can offer:

- **Tools** — functions the model can call. `send_email`, `query_database`, `run_command`. This is what most servers expose and what most users mean when they say "MCP."
- **Resources** — data the model can read. A file, a row in a database, the contents of a webpage. Read-only context, exposed in a structured way.
- **Prompts** — pre-written templates the user (not the model) can invoke. Less common, but useful for canned workflows.

A single server can expose any combination. The GitHub MCP exposes tools (create_issue, search_code) and resources (repository contents). The filesystem MCP exposes tools (read, write) and resources (directory listings).

<svg viewBox="0 0 800 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="MCP architecture diagram showing clients connecting to servers via the protocol" class="svg-wide" style="height:auto;color:currentColor;font-family:ui-sans-serif,system-ui,sans-serif">
  <style>
    .panel { fill: none; stroke: currentColor; stroke-opacity: 0.25; stroke-width: 1; }
    .panel-accent { fill: none; stroke: #d97706; stroke-width: 1.5; }
    .label { fill: currentColor; font-size: 15px; font-weight: 600; }
    .sub { fill: currentColor; fill-opacity: 0.7; font-size: 13px; }
    .accent { fill: #d97706; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; }
    .file { fill: currentColor; fill-opacity: 0.85; font-size: 13px; font-family: ui-monospace, monospace; }
    .dim { fill: currentColor; fill-opacity: 0.5; font-size: 12px; font-family: ui-monospace, monospace; }
    .arrow { stroke: currentColor; stroke-opacity: 0.4; stroke-width: 1; fill: none; }
    .arrow-accent { stroke: #d97706; stroke-width: 1.5; fill: none; }
    .protocol-band { fill: #d97706; fill-opacity: 0.08; stroke: #d97706; stroke-opacity: 0.4; stroke-width: 1; stroke-dasharray: 4 3; }
  </style>
  <!-- Clients column -->
  <text class="accent" x="40" y="36">CLIENTS</text>
  <rect class="panel" x="40" y="52" width="180" height="56" rx="6"/>
  <text class="label" x="56" y="76">Claude Desktop</text>
  <text class="sub" x="56" y="94">Connectors panel</text>
  <rect class="panel" x="40" y="124" width="180" height="56" rx="6"/>
  <text class="label" x="56" y="148">Claude Code</text>
  <text class="sub" x="56" y="166">.mcp.json + claude mcp</text>
  <rect class="panel" x="40" y="196" width="180" height="56" rx="6"/>
  <text class="label" x="56" y="220">Cowork</text>
  <text class="sub" x="56" y="238">Desktop-style connectors</text>
  <rect class="panel" x="40" y="268" width="180" height="56" rx="6"/>
  <text class="label" x="56" y="292">Custom agent / API</text>
  <text class="sub" x="56" y="310">Your own MCP client</text>
  <rect class="panel" x="40" y="340" width="180" height="56" rx="6"/>
  <text class="label" x="56" y="364">Cursor, Zed, etc.</text>
  <text class="sub" x="56" y="382">Other tools that speak MCP</text>
  <!-- Protocol band -->
  <rect class="protocol-band" x="260" y="52" width="120" height="380" rx="6"/>
  <text class="accent" x="293" y="36">PROTOCOL</text>
  <text class="label" x="285" y="86" text-anchor="start">MCP</text>
  <text class="sub" x="285" y="104">tools</text>
  <text class="sub" x="285" y="120">resources</text>
  <text class="sub" x="285" y="136">prompts</text>
  <text class="dim" x="271" y="180">stdio</text>
  <text class="dim" x="271" y="200">HTTP / SSE</text>
  <text class="sub" x="271" y="240">Same wire</text>
  <text class="sub" x="271" y="256">format for</text>
  <text class="sub" x="271" y="272">every</text>
  <text class="sub" x="271" y="288">client and</text>
  <text class="sub" x="271" y="304">server.</text>
  <text class="accent" x="271" y="370">OPEN</text>
  <text class="accent" x="271" y="390">STANDARD</text>
  <!-- Arrows from clients into protocol -->
  <path class="arrow" d="M 220 80 L 260 80" marker-end="url(#arrLight)"/>
  <path class="arrow" d="M 220 152 L 260 152" marker-end="url(#arrLight)"/>
  <path class="arrow" d="M 220 224 L 260 224" marker-end="url(#arrLight)"/>
  <path class="arrow" d="M 220 296 L 260 296" marker-end="url(#arrLight)"/>
  <path class="arrow" d="M 220 368 L 260 368" marker-end="url(#arrLight)"/>
  <!-- Arrows from protocol to servers -->
  <path class="arrow-accent" d="M 380 80 L 420 80" marker-end="url(#arrAccent)"/>
  <path class="arrow-accent" d="M 380 152 L 420 152" marker-end="url(#arrAccent)"/>
  <path class="arrow-accent" d="M 380 224 L 420 224" marker-end="url(#arrAccent)"/>
  <path class="arrow-accent" d="M 380 296 L 420 296" marker-end="url(#arrAccent)"/>
  <path class="arrow-accent" d="M 380 368 L 420 368" marker-end="url(#arrAccent)"/>
  <!-- Servers column -->
  <text class="accent" x="430" y="36">SERVERS</text>
  <rect class="panel-accent" x="420" y="52" width="340" height="56" rx="6"/>
  <text class="label" x="436" y="76">Hosted SaaS</text>
  <text class="sub" x="436" y="94">Gmail · Drive · Slack · Notion · GitHub (OAuth)</text>
  <rect class="panel-accent" x="420" y="124" width="340" height="56" rx="6"/>
  <text class="label" x="436" y="148">Local file + shell</text>
  <text class="sub" x="436" y="166">filesystem · desktop-commander · git</text>
  <rect class="panel-accent" x="420" y="196" width="340" height="56" rx="6"/>
  <text class="label" x="436" y="220">Databases</text>
  <text class="sub" x="436" y="238">Postgres · SQLite · MongoDB</text>
  <rect class="panel-accent" x="420" y="268" width="340" height="56" rx="6"/>
  <text class="label" x="436" y="292">Browser + scraping</text>
  <text class="sub" x="436" y="310">Playwright · fetch · Context7 · DeepWiki</text>
  <rect class="panel-accent" x="420" y="340" width="340" height="56" rx="6"/>
  <text class="label" x="436" y="364">Custom / internal</text>
  <text class="sub" x="436" y="382">Your APIs · domain-specific tools</text>
  <defs>
    <marker id="arrLight" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" fill-opacity="0.5"/>
    </marker>
    <marker id="arrAccent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97706"/>
    </marker>
  </defs>
</svg>

## Where you encounter it

The same protocol shows up in different surfaces:

- **Claude Desktop** — connectors in the sidebar (Gmail, Drive, Slack, GitHub, etc.). These are MCP servers Anthropic hosts and authenticates for you. You toggle them on, walk through OAuth, and they appear as available tools in chat. The connector UI is one click; the protocol underneath is full MCP.
- **Claude Code** — `claude mcp add` in the terminal, or a `.mcp.json` file at the project root. You wire up servers yourself, often running locally. This is where the protocol's flexibility shows: you can run any server anyone has written, including ones nobody at Anthropic has approved.
- **Cowork** — uses the Desktop connector set plus additional servers configured for your account.
- **The API and custom agents** — anyone building on the API can run an MCP client and plug in any server. This is how third-party tools like Cursor or Zed integrate Claude with the same ecosystem.

Same protocol, same servers, different front doors. A server you write today works in all of them.

## Hosted vs local servers

Two flavors, and the difference matters:

**Hosted (remote) servers** run on someone else's infrastructure. The Claude Desktop connectors are mostly this. Anthropic operates the server, handles OAuth, runs the integration. You sign in with Google and get Gmail tools without installing anything.

**Local servers** run on your machine. You start a process (usually via `npx`, `uvx`, or a binary), and it speaks MCP over stdio or a local socket. The filesystem MCP, the Postgres MCP, desktop-commander, all local. You control them entirely.

Hosted is convenient. Local is powerful. The serious leverage in Claude Code comes from local servers because you can give Claude access to anything on your machine: your shell, your databases, your git history, your browser via Playwright, scraping tools, custom internal APIs. None of that ships as a hosted connector. You wire it up.

## How to use it well

**Start with what you actually do.** The mistake is installing fifteen servers because they sound cool and never using twelve of them. Each connected server costs context (tool descriptions sit in the prompt) and adds attack surface. Pick three you'll use this week. Add more when a real task demands it.

**Scope permissions tightly.** A Postgres MCP with a read-only database user is a research tool. With a read-write user it's a way to drop your tables when something hallucinates. A filesystem MCP scoped to one project directory is safe; scoped to your home folder it's dangerous. Treat MCP servers like you'd treat giving someone your laptop: limit the blast radius before you hand over the keys.

**Use the right transport.** stdio servers are local processes Claude spawns directly, fast and simple, no network. HTTP/SSE servers are network-reachable, useful for hosted integrations and team-shared services. Don't run hosted-style servers locally and vice versa just because a tutorial said to.

**Read what the server actually exposes before trusting it.** Tool descriptions go straight into Claude's context. A poorly-described tool fires when it shouldn't or doesn't fire when it should. A maliciously-described tool can bias Claude toward calling it. Skim the source on community servers before installing.

**Compose with skills.** A skill can tell Claude to call a specific MCP tool as part of a workflow. This is the pattern for repeatable jobs: skill orchestrates, MCP executes. The skill says "run the deploy check," the MCP server actually runs it.

## Common mistakes

**Confusing MCP with Skills.** Skills are instructions Claude executes. MCP servers are tools and data Claude can reach. A skill might use an MCP server inside its workflow. They sit at different layers and solve different problems. Skill = how to do it. MCP = what it can touch.

**Confusing MCP with Connectors.** Connectors *are* MCP, presented through a one-click UI. Calling them different things is mostly a marketing distinction. Underneath it's the same protocol.

**Treating remote servers as safe by default.** A connector that reads your email also lets a sufficiently bad prompt or document instruct Claude to forward, delete, or leak. Read-only access on sensitive accounts when possible. Don't connect what you don't need.

**Running everything as a high-privilege server.** A `.env` file or a token with full account access in your MCP config is a credential lying around in plain sight. The Postgres MCP example below uses a read-only role for a reason. Apply that pattern everywhere.

**Stopping at hosted connectors.** The most useful servers are usually local ones nobody has packaged as a connector. Playwright for browser automation, desktop-commander for shell access, sqlite for ad-hoc data exploration, custom servers for internal APIs. The ecosystem is wider than the Connectors panel.

## A real `.mcp.json` example

This is what a least-privilege config looks like in a Claude Code project:

```json
{
  "mcpServers": {
    "github": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GH_PAT_READONLY}"
      }
    },
    "postgres": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${DB_RO_URL}"
      }
    },
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/me/projects/this-project"
      ]
    }
  }
}
```

Three things to notice: tokens come from environment variables (the file is committed; the secrets are not), the database URL is read-only, and the filesystem server is scoped to one directory rather than the whole machine. This is the shape to copy.

## Where to find servers

- `github.com/modelcontextprotocol/servers` — the reference servers Anthropic and the protocol team maintain. Filesystem, GitHub, GitLab, Postgres, SQLite, fetch, memory, and others. Start here.
- The Connectors panel in Claude Desktop — for hosted, OAuth-managed integrations to common SaaS.
- Community lists like `awesome-mcp-servers` on GitHub — wider ecosystem, including domain-specific servers (Playwright, Context7, DeepWiki, scrapers, niche APIs). Quality varies. Read the source.
- Build your own — the protocol is small enough that a custom server for an internal API is often a one-evening job.

The library page in this guide collects servers worth knowing about specifically, with notes on what each is actually good for.

<a href="/library/mcp-servers" class="crosslink">
  <svg class="crosslink__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" stroke-linecap="round" stroke-linejoin="round" /></svg>
  <div class="crosslink__body">
    <p class="crosslink__label">See also</p>
    <p class="crosslink__title">Library: MCP servers</p>
    <p class="crosslink__desc">Browse available MCP servers and their tools.</p>
  </div>
  <svg class="crosslink__arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" width="16" height="16"><path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" /></svg>
</a>

---
title: Connectors
lede: First-party integrations that give Claude access to external services.
section: extending
---

Connectors are the one-click way to plug Claude into the apps you already use. Gmail, Drive, GitHub, Vercel, Slack, Notion, Linear, and dozens more. You authenticate once via OAuth, and from then on Claude can read from and act on those services without you copy-pasting context into chat.

The practical experience: you can say "check why my Vercel deploy is failing on the staging branch" or "summarize the GitHub issues filed against my project this week" or "find the email thread from last Tuesday about the contract" and Claude does it. No setup per task, no context dump, no screenshots. The system reaches into the right service, pulls what it needs, and answers.

## What a connector actually is

A connector is a hosted MCP server (see [/extending/mcp](/extending/mcp) for the protocol underneath) that Anthropic operates and authenticates for you. The same mechanism a developer would use to wire up a custom server in Claude Code is what powers Connectors, but you skip the configuration. Click connect, walk through the service's OAuth screen, done.

That distinction matters because it tells you what connectors can and can't do. They can do whatever the underlying service's API permits and the connector's authors have wrapped. They cannot do things outside that API. Connectors are not magic; they're well-packaged API access.

## Where they live

- **Claude.ai (web and desktop)** — the connectors panel in settings, plus a quick toggle in the message composer to enable specific tools per chat. Mid-conversation you can also tap the connectors icon to authorize new ones without leaving the chat.
- **Cowork** — same connector set as Claude.ai, surfaced through the desktop file-system flow.
- **Claude Code** — connectors don't appear by name here, but the equivalent functionality is `claude mcp add` plus a `.mcp.json` file. Power users who want full control configure servers manually rather than using the hosted versions.
- **Mobile apps** — most connectors work in the iOS and Android apps, with a few exceptions where the mobile flow doesn't support a specific OAuth handshake.

The directory at `claude.ai/directory` is where you browse what's available. It grows fast; check there rather than relying on any list (including this one) being current.

## What's typically in the directory

The categories that matter for most people:

- **Email and calendar** — Gmail, Google Calendar, Outlook
- **Storage and docs** — Google Drive, OneDrive, Dropbox, Notion
- **Code and deploys** — GitHub, GitLab, Vercel, Linear, Sentry
- **Chat and meetings** — Slack, Teams, Zoom, Discord
- **Design and creative** — Figma, Canva
- **Data and analytics** — various database connectors, Google Analytics, segment-style tools
- **Music and media** — Spotify, YouTube
- **Productivity** — Asana, ClickUp, Trello, Todoist

Some are first-party (built or co-built with Anthropic), some are third-party (built by the service itself or by community developers and approved by Anthropic). The trust model differs and is worth understanding.

## How they actually work

When you authorize a connector, three things happen:

1. The service issues an OAuth token scoped to whatever permissions you approved. That token is stored on Anthropic's side, tied to your account.
2. The connector's tool descriptions are added to Claude's available tool list whenever you have it enabled in a chat.
3. When you ask something the connector can answer, Claude calls the tool, the connector hits the service's API with your token, and the result comes back into the conversation.

The token is what makes "check X on Vercel" work without you re-authenticating each time. It also means a connector you've enabled can do things on your account whenever Claude decides a tool call is appropriate. Worth thinking about.

<svg viewBox="0 0 860 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram showing how a connector handles authorization once and then routes Claude's tool calls to a service via the stored OAuth token" class="svg-wide" style="height:auto;color:currentColor;font-family:ui-sans-serif,system-ui,sans-serif">
  <style>
    .panel { fill: none; stroke: currentColor; stroke-opacity: 0.25; stroke-width: 1; }
    .panel-accent { fill: none; stroke: #d97706; stroke-width: 1.5; }
    .label { fill: currentColor; font-size: 13px; font-weight: 600; }
    .sub { fill: currentColor; fill-opacity: 0.7; font-size: 12px; }
    .accent { fill: #d97706; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; }
    .file { fill: currentColor; fill-opacity: 0.85; font-size: 12px; font-family: ui-monospace, monospace; }
    .dim { fill: currentColor; fill-opacity: 0.5; font-size: 11px; font-family: ui-monospace, monospace; }
    .arrow { stroke: currentColor; stroke-opacity: 0.5; stroke-width: 1; fill: none; }
    .arrow-accent { stroke: #d97706; stroke-width: 1.5; fill: none; }
    .step-num { fill: #d97706; font-size: 11px; font-weight: 700; }
    .divider { stroke: currentColor; stroke-opacity: 0.15; stroke-width: 1; stroke-dasharray: 4 4; }
  </style>
  <!-- One-time auth row: 4 boxes × 180px + 3 gaps × 30px = 810, start x=20 -->
  <text class="accent" x="20" y="36">ONE-TIME AUTHORIZATION</text>
  <rect class="panel" x="20" y="56" width="180" height="60" rx="6"/>
  <text class="label" x="36" y="80">You</text>
  <text class="sub" x="36" y="98">Click "Connect Vercel"</text>
  <path class="arrow" d="M 200 86 L 230 86" marker-end="url(#arrLight)"/>
  <text class="step-num" x="208" y="78">1</text>
  <rect class="panel" x="230" y="56" width="180" height="60" rx="6"/>
  <text class="label" x="246" y="80">Vercel OAuth</text>
  <text class="sub" x="246" y="98">"Allow Claude access?"</text>
  <path class="arrow" d="M 410 86 L 440 86" marker-end="url(#arrLight)"/>
  <text class="step-num" x="418" y="78">2</text>
  <rect class="panel" x="440" y="56" width="190" height="60" rx="6"/>
  <text class="label" x="456" y="80">Anthropic</text>
  <text class="sub" x="456" y="98">Stores token to your account</text>
  <path class="arrow" d="M 630 86 L 660 86" marker-end="url(#arrLight)"/>
  <text class="step-num" x="638" y="78">3</text>
  <rect class="panel" x="660" y="56" width="180" height="60" rx="6"/>
  <text class="label" x="676" y="80">Done</text>
  <text class="sub" x="676" y="98">Persists across chats</text>
  <!-- Divider -->
  <line class="divider" x1="20" y1="160" x2="840" y2="160"/>
  <!-- Per-request flow: same 4-column layout -->
  <text class="accent" x="20" y="194">PER REQUEST</text>
  <rect class="panel-accent" x="20" y="214" width="180" height="60" rx="6"/>
  <text class="label" x="36" y="238">You</text>
  <text class="sub" x="36" y="256">"Why did the latest</text>
  <text class="sub" x="36" y="269">deploy fail?"</text>
  <path class="arrow-accent" d="M 200 244 L 230 244" marker-end="url(#arrAccent)"/>
  <rect class="panel-accent" x="230" y="214" width="180" height="60" rx="6"/>
  <text class="label" x="246" y="238">Claude</text>
  <text class="sub" x="246" y="256">Picks vercel.list_deploys</text>
  <text class="sub" x="246" y="269">+ vercel.get_logs</text>
  <path class="arrow-accent" d="M 410 244 L 440 244" marker-end="url(#arrAccent)"/>
  <rect class="panel-accent" x="440" y="214" width="190" height="60" rx="6"/>
  <text class="label" x="456" y="238">Connector</text>
  <text class="sub" x="456" y="256">Calls Vercel API</text>
  <text class="sub" x="456" y="269">with your token</text>
  <path class="arrow-accent" d="M 630 244 L 660 244" marker-end="url(#arrAccent)"/>
  <rect class="panel-accent" x="660" y="214" width="180" height="60" rx="6"/>
  <text class="label" x="676" y="238">Vercel</text>
  <text class="sub" x="676" y="256">Returns deploy</text>
  <text class="sub" x="676" y="269">+ logs</text>
  <!-- Return path -->
  <path class="arrow-accent" d="M 750 274 L 750 320 L 110 320 L 110 274" marker-end="url(#arrAccent)"/>
  <text class="sub" x="340" y="312">Result flows back; Claude reasons over it and answers</text>
  <!-- Compose row: 4 boxes evenly spaced -->
  <text class="accent" x="20" y="368">CHAIN MULTIPLE CONNECTORS</text>
  <rect class="panel" x="20" y="384" width="200" height="40" rx="4"/>
  <text class="file" x="36" y="408">Vercel: get failing deploy</text>
  <path class="arrow" d="M 220 404 L 238 404" marker-end="url(#arrLight)"/>
  <rect class="panel" x="238" y="384" width="178" height="40" rx="4"/>
  <text class="file" x="241" y="408">GitHub: find the commit</text>
  <path class="arrow" d="M 410 404 L 430 404" marker-end="url(#arrLight)"/>
  <rect class="panel" x="430" y="384" width="185" height="40" rx="4"/>
  <text class="file" x="446" y="408">Linear: check ticket</text>
  <path class="arrow" d="M 615 404 L 635 404" marker-end="url(#arrLight)"/>
  <rect class="panel" x="635" y="384" width="185" height="40" rx="4"/>
  <text class="file" x="651" y="408">Slack: notify team</text>
  <defs>
    <marker id="arrLight" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" fill-opacity="0.55"/>
    </marker>
    <marker id="arrAccent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97706"/>
    </marker>
  </defs>
</svg>

## How to use them well

**Enable per chat, not always-on, for sensitive ones.** Most connector UIs let you toggle which are active for the current conversation. For something like Gmail with read+write access, defaulting to off and turning it on when you're actually working email is safer than leaving it live in every chat.

**Use the action verbs explicitly.** Saying "check my latest Vercel deploy" works because "check" maps to a read tool. Saying "fix the Vercel deploy" is ambiguous and may or may not invoke a tool depending on what the connector actually exposes. The reliable pattern is to describe the action in the same vocabulary the underlying service uses: deploy, redeploy, list, read, send, draft, comment, close, label.

**Pair connectors with each other.** The leverage isn't in any single connector; it's in chains. "Look at the failing Vercel deploy, find the related GitHub commit, check if the Linear ticket is still open, and draft a Slack update for the team." Four connectors, one prompt, work that would take fifteen minutes done in a few seconds. This is the pattern worth practicing.

**Read the scopes when authorizing.** OAuth screens tell you exactly what access you're granting. Some connectors ask for read-only by default with optional write upgrades. Others ask for everything up front. If a connector wants more than the task needs, decline and either find a narrower one or use Claude Code with a manually configured server where you control the token.

**Check the directory listing for limits.** Most connectors have known limits (max attachments per email, query timeouts, rate limits, missing endpoints). The directory page usually documents them. Reading once saves time later when something doesn't work and you assume it's broken when it's actually a stated limit.

## How they differ from MCP servers in Claude Code

Same underlying protocol, very different experience.

| | Connectors | MCP in Claude Code |
|---|---|---|
| Setup | One click + OAuth | `claude mcp add` or edit `.mcp.json` |
| Hosting | Anthropic hosts | You run the server |
| Auth | Anthropic stores tokens | You manage tokens |
| Catalog | Curated directory | Anything anyone has written |
| Customization | Whatever the connector exposes | Anything you can wrap |
| Best for | Daily SaaS workflows | Local dev, custom integrations, full control |

The choice isn't either-or. Most people use connectors in Claude.ai for their personal SaaS stack and configure local MCP servers in Claude Code for project-specific tooling. The two coexist.

## Common mistakes

**Treating "I connected it" as the work.** Connecting a service is two clicks. Knowing how to phrase requests so the right tool fires, what the connector can and can't do, and which combinations unlock real workflows is the actual skill. Most people connect five things and use one.

**Authorizing write access casually.** A Gmail connector with full send privileges can email anyone in your contacts. A GitHub connector with write access can commit, comment, and close issues. A bad prompt or a malicious document Claude reads can, in theory, redirect those capabilities. Read-only is the default to push for. Write is for connectors you've thought through.

**Forgetting connectors are scoped to your account.** "Read my Drive" means *your* Drive. If you're working on a teammate's behalf, their data isn't there. This trips people up when they assume a shared workspace gives Claude shared visibility. It doesn't, unless the workspace itself is shared at the service level.

**Assuming every service has a connector.** The directory grows fast but isn't complete. If your tool isn't in there, you have three options: wait, look for a community MCP server you can run in Claude Code, or build your own. The third option is more accessible than people expect (the protocol is small).

**Confusing the panel with the protocol.** Connectors are MCP. The packaging makes them look like a different feature. Underneath, it's the same standard, which means a lot of what you learn building or using one transfers directly to running custom servers in Claude Code.

## A concrete workflow

What "check X on Vercel, Y isn't working" actually unfolds into when connectors are wired up:

1. Claude calls the Vercel connector to fetch recent deployments for the project.
2. Identifies the failing one. Pulls its build logs.
3. Calls the GitHub connector to find the commit that triggered the deploy and what changed.
4. Reads the error in context of the diff.
5. Reports back: here's the failing deploy, here's the change that likely caused it, here's what to fix.

Optionally extend it: have Claude open a GitHub issue, draft a Slack message to the team, or trigger a redeploy after the fix is in. Each step is one connector tool call. The chain is the workflow.

This kind of cross-tool reasoning is the actual reason connectors matter. Single-service use is a convenience. Multi-service use is leverage.

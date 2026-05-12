---
title: Phone
lede: Claude on voice calls — what it can do and how it works.
section: products
---

There are three ways Claude reaches you on your phone, each with a different shape. Two are Claude Code features that fit naturally on the same page: Remote Control and Channels. The third is Cowork's Dispatch, which has its own page since it is intrinsically a Cowork feature.

- **Remote Control** mirrors a local Claude Code session into the Claude mobile app or claude.ai/code in a browser.
- **Channels** lets Claude talk to you through Telegram, Discord, or iMessage.
- **Dispatch** is the Cowork mobile remote, covered on [its own page](/products/dispatch).

All three are research previews. None of them moves your work to the cloud; the session keeps running on your computer, and your phone is just an interface into it.

## Remote Control

Remote Control is a synchronisation layer between a Claude Code session running locally and the Claude mobile app (iOS or Android), claude.ai/code, or any browser. Your terminal session keeps running on your machine; the phone or browser is just another window into it.

It is a research preview, available on the paid Claude plans, off by default for Team and Enterprise until an admin enables it.

### Setup

In an active Claude Code session, run `/rc` (or start with `claude --remote-control`). A QR code appears in your terminal. Scan it with the Claude mobile app, or open the URL it gives you in any browser. The session shows up in your mobile app's Code tab with a green status dot.

If you do not have the Claude app yet, run `/mobile` inside Claude Code to get a download QR.

To make this the default for every session you start, toggle "Enable Remote Control for all sessions" in your Claude Code config.

### How to use it

Anything you can do at the terminal you can do from your phone, with the same files, MCP servers, project context, and `.claude/` settings. The terminal mirrors what your phone sends in real time, so you can verify what is happening at your desk if you are nearby.

The most common uses:

**Long-running tasks.** Kick off a refactor at your desk, walk away, monitor and steer from your phone.

**Production firefighting on the move.** A phone alert hits. You connect to the existing session and Claude already has the codebase loaded and your monitoring MCPs configured.

**Cross-device flow.** Start at the terminal, switch to laptop browser, switch to phone. The conversation stays in sync across all three.

Remote Control can also push notifications to your phone when a long task finishes or Claude needs a decision. This happens automatically; you can also request one explicitly ("notify me when the tests finish").

### What people get wrong

**Closing the terminal kills the session.** If you exit the process or close the window, Remote Control ends with it. Run inside `tmux` or `screen` if you want it to survive accidental closures.

**Permission prompts stall remote sessions.** If Claude needs approval for a tool call, it waits for the terminal and the phone has no way to grant it. Either accept this and check in occasionally, or run with `--dangerously-skip-permissions` for trusted, narrowly scoped tasks. This is the single biggest gotcha and every practitioner hits it.

**Network timeouts after about ten minutes.** Extended outages end the session and the process exits. Worth knowing if you depend on flaky train wifi.

**One remote session per Claude Code instance.** Two phones cannot share a single session by default. Use server mode if you genuinely need that.

## Channels

Channels is a different surface. Instead of opening your Claude Code session in the Claude app, Channels lets Claude talk to you through messaging apps you already use: Telegram, Discord, or iMessage. You message your bot, the request lands in your Claude Code session running locally, Claude does the work, and the reply comes back through the same chat.

Architecturally, each channel is an MCP plugin that runs as a subprocess of Claude Code. The plugin polls the messaging platform's API (polling for Telegram, WebSocket for Discord, native bridge for iMessage), wraps inbound messages as events, pushes them into your session, and forwards Claude's replies back through tools the plugin exposes.

It is a research preview, available on paid plans. Team and Enterprise admins must enable Channels in managed settings before individual users can set it up. iMessage support is macOS only.

### What each platform is good for

**Telegram.** Fastest setup, no server invite needed, just a bot and an allowlist. Reasonable default for individual use.

**Discord.** Server channels, role permissions, multi-user team setups. Use this when more than one person needs to talk to the same Claude session.

**iMessage.** Zero external service to configure if you are on a Mac with Messages set up. Good if you want a phone-native, no-bot-account setup.

**Fakechat.** A localhost demo channel. Use it to test that the plugin flow works on your machine before configuring a real platform. Worth ten minutes; saves hours of debugging external bot config later.

### Setup (Telegram example)

Make sure Bun is installed (`bun --version`). The official channel plugins are Bun scripts and silently fail on Node.js. This is the most common setup error.

In Telegram, message `@BotFather`, send `/newbot`, give it a name and a username ending in `bot`. Save the token it gives you.

In Claude Code, install the Telegram plugin and start with the channels flag:

```
claude --channels plugin:telegram@claude-plugins-official
```

DM your bot from Telegram. It replies with a six-character pairing code. Confirm the code in your terminal and your Telegram account is paired.

Switch the bot from default pairing mode to allowlist mode immediately, so strangers who find your bot's username cannot talk to it.

Discord and iMessage have similar flows; the full setup for each is in the official Channels docs.

The `--channels` flag has to be used every session for Channels to be active. Adding the plugin to your `.mcp.json` alone does not turn it on.

### How to use it

The standard pattern is asynchronous. You start a long task at your desk and walk away. When Claude finishes (or hits an error or needs your decision), it pings you on Telegram or Discord. You read it on your phone, send a follow-up if needed, Claude continues working.

Three patterns worth knowing:

**Bidirectional mobile coding.** "Review the last 15 commits and flag anything that looks like a bug or a security issue." Claude reads, analyses, replies through Telegram with a summary while you are on the train.

**Webhook receiver.** A channel does not have to be a person on the other end. CI failure alerts, error tracker events, or deploy pipeline notifications can all be routed into a channel. The event arrives in the session you already have open, with your project context loaded, ready to act.

**Scheduled delivery to a messaging app.** Combine Channels with Claude Code's `/loop` command, or an external cron, to deliver recurring outputs to your messaging app. "Every morning at 8am, summarise overnight GitHub activity and post the result to Telegram." Claude generates, the channel delivers. The session has to be running for it to fire.

### What people get wrong

**Forgetting Bun.** The plugins do not run on Node.js. Install Bun first.

**Forgetting the `--channels` flag.** It must be specified every session. There is no global on switch yet.

**Leaving default pairing mode on.** The default lets anyone who DMs your bot pair themselves. Switch to allowlist mode after your initial pairing.

**Permission prompts stalling silently.** Same trap as Remote Control. If Claude needs to approve a tool call, the session blocks until you walk back to the terminal. Most practitioners run unattended sessions with `--dangerously-skip-permissions` and accept the trade-off; understand what you are accepting (any allowlisted sender can trigger arbitrary local commands).

**Expecting it to work when your computer sleeps.** It will not. Claude Code is running locally; if the machine is asleep, nothing receives the message. Messages sent during downtime are not queued.

**Confusing Channels with Dispatch.** Different feature. Channels is the Claude Code messaging-app bridge. Dispatch is the Cowork mobile remote with QR pairing. If you want messaging-app integration, you want Channels.

<svg viewBox="0 0 700 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comparison of Remote Control, Channels, and Dispatch: what each is, its phone surface, what it bridges to, and what it is best for">
  <defs>
    <style>
      .ph-label { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 12px; fill: var(--color-text, #e8e8e8); }
      .ph-label-strong { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 13px; font-weight: 600; fill: var(--color-text, #e8e8e8); }
      .ph-label-muted { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 10px; fill: var(--color-text-muted, #9a9a9a); }
      .ph-label-row { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.04em; fill: var(--color-text-muted, #9a9a9a); }
      .ph-box { fill: var(--color-surface, #1a1a1a); stroke: var(--color-border, #2e2e2e); stroke-width: 1; }
      .ph-box-accent { fill: var(--color-surface-accent, #1f1f1f); stroke: var(--color-accent, #c97b48); stroke-width: 1.25; }
      .ph-divider { stroke: var(--color-border, #2e2e2e); stroke-width: 1; }
      .ph-col-divider { stroke: var(--color-border, #2e2e2e); stroke-width: 1; stroke-dasharray: 3 3; }
    </style>
  </defs>
  <!-- Row label column (left) -->
  <text class="ph-label-row" x="8" y="96" text-anchor="start">WHAT IT IS</text>
  <text class="ph-label-row" x="8" y="148" text-anchor="start">PHONE SURFACE</text>
  <text class="ph-label-row" x="8" y="193" text-anchor="start">BRIDGES TO</text>
  <text class="ph-label-row" x="8" y="238" text-anchor="start">BEST FOR</text>
  <!-- Column 1: Remote Control -->
  <rect class="ph-box-accent" x="104" y="14" width="182" height="246" rx="6" />
  <text class="ph-label-strong" x="195" y="38" text-anchor="middle">Remote Control</text>
  <line class="ph-divider" x1="110" y1="48" x2="280" y2="48" />
  <!-- What it is -->
  <text class="ph-label-muted" x="195" y="72" text-anchor="middle">Session mirror. Your</text>
  <text class="ph-label-muted" x="195" y="85" text-anchor="middle">terminal session, live</text>
  <text class="ph-label-muted" x="195" y="98" text-anchor="middle">on another screen</text>
  <line class="ph-divider" x1="110" y1="108" x2="280" y2="108" />
  <!-- Phone surface -->
  <text class="ph-label-muted" x="195" y="130" text-anchor="middle">Claude mobile app</text>
  <text class="ph-label-muted" x="195" y="143" text-anchor="middle">(Code tab) or any browser</text>
  <line class="ph-divider" x1="110" y1="154" x2="280" y2="154" />
  <!-- Bridges to -->
  <text class="ph-label-muted" x="195" y="176" text-anchor="middle">Local Claude Code</text>
  <text class="ph-label-muted" x="195" y="189" text-anchor="middle">session</text>
  <line class="ph-divider" x1="110" y1="200" x2="280" y2="200" />
  <!-- Best for -->
  <text class="ph-label-muted" x="195" y="222" text-anchor="middle">Continuing a session.</text>
  <text class="ph-label-muted" x="195" y="235" text-anchor="middle">Steering long tasks</text>
  <text class="ph-label-muted" x="195" y="248" text-anchor="middle">from away from desk</text>
  <!-- Column 2: Channels -->
  <rect class="ph-box" x="296" y="14" width="182" height="246" rx="6" />
  <text class="ph-label-strong" x="387" y="38" text-anchor="middle">Channels</text>
  <line class="ph-divider" x1="302" y1="48" x2="472" y2="48" />
  <!-- What it is -->
  <text class="ph-label-muted" x="387" y="72" text-anchor="middle">Messaging bridge.</text>
  <text class="ph-label-muted" x="387" y="85" text-anchor="middle">Claude talks to you</text>
  <text class="ph-label-muted" x="387" y="98" text-anchor="middle">through an existing app</text>
  <line class="ph-divider" x1="302" y1="108" x2="472" y2="108" />
  <!-- Phone surface -->
  <text class="ph-label-muted" x="387" y="127" text-anchor="middle">Telegram, Discord,</text>
  <text class="ph-label-muted" x="387" y="140" text-anchor="middle">or iMessage</text>
  <line class="ph-divider" x1="302" y1="154" x2="472" y2="154" />
  <!-- Bridges to -->
  <text class="ph-label-muted" x="387" y="176" text-anchor="middle">Local Claude Code</text>
  <text class="ph-label-muted" x="387" y="189" text-anchor="middle">session</text>
  <line class="ph-divider" x1="302" y1="200" x2="472" y2="200" />
  <!-- Best for -->
  <text class="ph-label-muted" x="387" y="219" text-anchor="middle">Async pings, webhooks,</text>
  <text class="ph-label-muted" x="387" y="232" text-anchor="middle">scheduled deliveries,</text>
  <text class="ph-label-muted" x="387" y="245" text-anchor="middle">team shared bots</text>
  <!-- Column 3: Dispatch -->
  <rect class="ph-box" x="488" y="14" width="202" height="246" rx="6" />
  <text class="ph-label-strong" x="589" y="38" text-anchor="middle">Dispatch</text>
  <line class="ph-divider" x1="494" y1="48" x2="684" y2="48" />
  <!-- What it is -->
  <text class="ph-label-muted" x="589" y="72" text-anchor="middle">Cowork remote. Your</text>
  <text class="ph-label-muted" x="589" y="85" text-anchor="middle">phone controls your</text>
  <text class="ph-label-muted" x="589" y="98" text-anchor="middle">desktop Cowork session</text>
  <line class="ph-divider" x1="494" y1="108" x2="684" y2="108" />
  <!-- Phone surface -->
  <text class="ph-label-muted" x="589" y="127" text-anchor="middle">Claude mobile app</text>
  <text class="ph-label-muted" x="589" y="140" text-anchor="middle">(Dispatch tab)</text>
  <line class="ph-divider" x1="494" y1="154" x2="684" y2="154" />
  <!-- Bridges to -->
  <text class="ph-label-muted" x="589" y="176" text-anchor="middle">Local Cowork session</text>
  <text class="ph-label-muted" x="589" y="189" text-anchor="middle">(files, connectors, apps)</text>
  <line class="ph-divider" x1="494" y1="200" x2="684" y2="200" />
  <!-- Best for -->
  <text class="ph-label-muted" x="589" y="219" text-anchor="middle">General desktop tasks:</text>
  <text class="ph-label-muted" x="589" y="232" text-anchor="middle">files, email, scheduled</text>
  <text class="ph-label-muted" x="589" y="245" text-anchor="middle">briefings</text>
</svg>

## Choosing between Remote Control and Channels

They look similar but solve different problems.

**Remote Control** is for continuing a session from your phone. The Claude mobile app surfaces the same conversation thread you started in your terminal. One person, one session, full conversation context, full mirror of the terminal.

**Channels** is for routing events into a session. Long task finished. CI broke. Someone messaged your team's coding bot. Scheduled summary fires. The session reacts and replies through a messaging app.

Most practitioners use both. Remote Control when they want to drive; Channels when they want to be pinged.

## Examples

**Continue a refactor on the train.** Run `/rc` before you leave the desk, scan the QR with the Claude mobile app, walk to the station. Steer the refactor from your phone, get a push notification when it is done.

**Get a Telegram ping when the test suite finishes.** Set up the Telegram channel, start your test run with `--channels plugin:telegram@claude-plugins-official`. When the tests pass or fail, Claude replies in Telegram. You see it before you would have otherwise.

**Daily news brief to Telegram.** Channels plus `/loop` plus a simple prompt: "Each morning at 7am, fetch the top three headlines from these sources, write a 100-word brief, post it to my Telegram bot." The session has to be running for it to fire.

**Production firefight from anywhere.** Pager goes off. You are not at your desk. Open the Claude mobile app, jump into the Remote Control session you left running, ask Claude to check logs and diff the last deploy. The MCPs you configured locally (database, monitoring) are all available because the session is still on your machine.

**Team-shared coding bot.** Set up the Discord channel in a private team server. The whole team can ask the bot to investigate bugs, run reviews, summarise commits. One Claude Code session, multiple humans.

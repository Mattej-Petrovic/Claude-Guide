---
title: Settings walkthrough
lede: Every setting in Claude, what it does, and what to flip. Web and desktop. Long by design -- use the table of contents to jump.
section: settings
---

Every setting in Claude, what it does, and when to flip it. This page is long by design. You won't read it in one sitting. Use the section headers to jump.

Settings live in two places: the web at [claude.ai/settings](https://claude.ai/settings), and the desktop app (`cmd/ctrl + ,`). They share most categories but the desktop app adds its own section for app behaviour, extensions, and developer tooling.

## Where settings live

<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Where Claude settings live: a web settings panel at claude.ai/settings and a desktop app settings panel opened with cmd or ctrl + comma. The web side covers account, capabilities, connectors, and per-product settings. The desktop has all the web categories plus three desktop-only sections for general app behaviour, extensions, and developer tools.">
  <text x="350" y="22" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="600" letter-spacing="1.2">WHERE SETTINGS LIVE</text>
  <text x="350" y="40" text-anchor="middle" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.55" font-style="italic">two surfaces, partly overlapping</text>
  <rect x="40" y="60" width="290" height="260" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="185" y="86" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.5">WEB</text>
  <text x="185" y="103" text-anchor="middle" fill="currentColor" font-family="ui-monospace, monospace" font-size="10" opacity="0.55">claude.ai/settings</text>
  <text x="60" y="135" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">· General · Account · Privacy</text>
  <text x="60" y="153" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">· Billing · Usage</text>
  <text x="60" y="183" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="600">where it gets interesting:</text>
  <text x="60" y="203" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">· Capabilities (memory, tools)</text>
  <text x="60" y="221" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">· Connectors</text>
  <text x="60" y="239" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">· Claude Code</text>
  <text x="60" y="257" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">· Cowork</text>
  <text x="60" y="275" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">· Claude in Chrome</text>
  <text x="60" y="305" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">account, capabilities, per-product</text>
  <rect x="370" y="60" width="290" height="260" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="515" y="86" text-anchor="middle" fill="#d97706" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.5">DESKTOP APP</text>
  <text x="515" y="103" text-anchor="middle" fill="currentColor" font-family="ui-monospace, monospace" font-size="10" opacity="0.55">cmd / ctrl + ,</text>
  <text x="390" y="135" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.65" font-style="italic">all the web categories above</text>
  <text x="390" y="151" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.65" font-style="italic">plus a desktop section with:</text>
  <text x="390" y="183" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="600">desktop-only:</text>
  <text x="390" y="203" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">· General (startup, hotkey,</text>
  <text x="390" y="219" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">  browser use, computer use)</text>
  <text x="390" y="239" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">· Extensions (.mcpb · .dxt)</text>
  <text x="390" y="257" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" opacity="0.85">· Developer</text>
  <text x="390" y="305" fill="currentColor" font-family="ui-sans-serif, system-ui, sans-serif" font-size="10" opacity="0.55" font-style="italic">app behaviour, local extensions, dev tools</text>
</svg>

## The settings worth actually thinking about

If you read nothing else on this page, look at these seven. The rest mostly has sensible defaults.

1. **Instructions for Claude** (General). A free-form text box that becomes your global system prompt for every chat and Cowork session. Highest-leverage setting in the entire product. Spend ten minutes writing this.
2. **Memory toggles** (Capabilities). Decide whether you want Claude building a profile of you across chats. Default on for most people, off if you work across sensitive contexts.
3. **Tool access mode** (Capabilities). If you have many connectors enabled, switch to "Load tools when needed" to keep context lean.
4. **Allow network egress** (Capabilities). Leave off unless you specifically need it. The security implications are real.
5. **Bypass permissions mode** (Claude Code). Leave off. Use auto-accept instead. The difference is small in speed, large in safety.
6. **Computer use** (Desktop General). Leave off until you have a specific automation in mind. An LLM controlling your mouse is a category of risk that benefits from being deliberate.
7. **Authorization tokens** (Claude Code). Review every few months. Revoke anything you don't recognise.

Everything else below is detail.

## Web settings

### General

Profile, preferences, notifications. Most of this is cosmetic, but a few things matter.

**Avatar.** Your account image. Cosmetic.

**Full name.** Your real name. Cosmetic, but Claude sometimes uses it.

**What should Claude call you.** Tells Claude what to use when addressing you. Worth setting if it's different from your full name.

**What best describes your work.** A dropdown that gives Claude some context about your field. Worth filling in if your work is unusual (security research, legal, healthcare, etc.) since it changes how Claude calibrates technical depth and what assumptions it makes.

**Instructions for Claude.** A free-form text box that applies across every chat and Cowork session. This is the single highest-leverage setting in Claude. It's effectively your global system prompt. Common things to put here:
- Tone preferences ("be direct, no hedging")
- Format preferences ("no bullet points unless I ask")
- Anti-sycophancy ("push back when I'm wrong, don't validate by default")
- Context about who you are ("I'm a security engineer, default to technical depth")
- Pet peeves ("don't end messages with 'let me know if you have questions'")
- Languages you work in

Keep it under a few hundred words. Every chat pays the token cost on every turn, so bloat compounds. Treat it like a `CLAUDE.md` for your whole Claude experience.

**Appearance.** Light, dark, or system. Cosmetic.

**Chat font.** Cosmetic.

**Notifications.** Push notifications for various events.
- *Response completions.* On if you frequently kick off long-running deep research or Cowork tasks and walk away. Off otherwise.
- *Code notifications.* Claude Code notifying you of important updates from a session. On if you use Code regularly.
- *Code permission requests.* Push notification when Code needs approval to run something. On if you run Code in modes that ask before acting and you're not at the keyboard.
- *Emails from Claude Code on the web.* Email when Code (the cloud version) finishes building or needs your input. Useful for long async tasks.
- *Dispatch messages.* Push when Claude messages you in Dispatch. On if you use Dispatch.

### Account

Email, password, plan, sign-in methods, account deletion. Standard. Nothing to optimise.

### Privacy

Data controls. The toggle worth understanding is whether your conversations can be used for training (varies by plan and region). Default to off if you're working on anything sensitive or proprietary. The privacy section also typically covers data export and deletion. Worth a glance once and then forget about until you need it.

### Billing

Plan, payment method, invoices. The interesting question is which plan to be on, which is a [/foundations/choosing-a-product](/foundations/choosing-a-product) conversation, not a settings one.

### Usage

See [/settings/usage](/settings/usage) for the dedicated page. Short version: shows your current limit consumption and history. Most people don't need to look at this often. If you're frequently hitting limits, worth a glance to see what's burning the budget.

### Capabilities

The biggest settings page, and where the most consequential choices live.

**Memory: Search and reference chats.** When on, Claude can search across your past chats during a new conversation and pull relevant context in. When off, every chat starts blank. On for most people. Off if you want clean separation (sensitive projects, multiple personas, or you find it pulls in stale context too aggressively).

**Memory: Generate memory from chat history.** When on, Claude builds a persistent profile of you from your chats: what you do, what you're working on, your preferences. When off, no profile is built. On is usually what you want; the profile gets better over time and saves you from re-explaining yourself. Off if you'd rather control context explicitly through Instructions for Claude.

**View and manage memory.** Click through to see what Claude actually remembers. Worth checking after a few weeks of use. The profile sometimes captures things you'd rather it didn't: an offhand mention treated as a permanent fact, an old project marked as current, a temporary preference marked as standing. Delete what's wrong.

**Import memory from other AI providers.** Click "Start import" and you get a prompt to paste into ChatGPT or another assistant; it summarises what that assistant knows about you, and you paste the result back into Claude. Useful if you're switching from another tool. Skip otherwise.

**Tool access mode.** Two options: *Load tools when needed* and *Tools already loaded* (the latter is sometimes called "Tools pre-loaded"). The trade-off is context cost versus proactive behaviour. *Tools already loaded* injects every enabled connector into every conversation, which costs context tokens but means Claude knows the tools are there and proactively reaches for them. *Load tools when needed* keeps context lean but Claude sometimes won't reach for a tool it could have used because it doesn't know it's there until it goes looking. If you have many connectors enabled, switch to *Load tools when needed*. If you have few connectors and use them frequently, the default is fine.

**Artifacts.** Lets Claude generate code, documents, and designs in a dedicated panel beside the chat. Leave on. There's no real downside; if you don't want one for a given task, just don't ask for it.

**AI-powered artifacts.** Lets artifacts use Claude inside the artifact (interactive apps and documents that call the model). Leave on if you want to build interactive tools in chat. Off if you only want static artifacts, which is rare.

**Inline visualizations.** Charts and diagrams rendered directly in the chat. Leave on. See [/concepts/artifacts](/concepts/artifacts) for what these are.

**Cloud code execution and file creation.** Lets Claude run code on Anthropic's servers and create real files (Word docs, spreadsheets, PDFs) you can download. Leave on. This is what makes Claude actually useful for producing deliverables, not just text. Required for skills.

**Allow network egress.** Lets the cloud code execution sandbox install packages from the internet. Off by default. Turn on only if you specifically need it for advanced data analysis or custom visualisations. The security note isn't decorative: code that fetches from the internet can be tricked by prompt injection from data that comes back. Be deliberate.

**Skills.** This page now says skills are managed in the Customize area. See [/extending/skills](/extending/skills) for what skills are and how to build them. The Customize area is Anthropic's new consolidated hub for skills, plugins, and connectors.

### Connectors

Where you connect Gmail, Drive, Calendar, Slack, GitHub, Spotify, Vercel, Canva, and others. Each gets its own Configure or Connect button.

**Discovery.** When on, Claude proactively surfaces connectors from the directory that might be relevant to your conversation. When off, it doesn't. On if you want suggestions ("hey, want to connect Gmail to do this?"). Off if you want explicit control.

**Per-connector configuration.** Each connector has its own permissions. Deep dive on [/extending/connectors](/extending/connectors). Worth noting here: you can usually scope what each connector can access (specific Drive folders, specific Gmail labels) rather than handing it the keys to your whole account. Take the time to scope on first connect. It's much harder to remember to do later.

**Add custom connector.** For MCP servers and custom integrations you've built or installed. Not for everyday use.

Connectors are also now managed in the Customize area alongside skills. The settings page still works as a list view.

### Claude Code

Settings specific to Claude Code. Affects both local desktop sessions and the cloud version.

**Allow bypass permissions mode.** Whether the "let Claude do anything without asking" mode is even available to be enabled. You still have to opt in per session. Off by default. The warnings about prompt injection are real: bypass mode is for tightly controlled workflows (boilerplate, lint fixes) and not for letting Claude loose on the open web. Most people should leave this off and use auto-accept mode instead, which is almost as fast but keeps the guardrails.

**Draw attention on notifications.** Bounces the dock icon on Mac or flashes the taskbar on Windows when Claude needs input. On if you run Code in the background and want to be alerted to come back.

**Worktree location.** Where Claude stores isolated git worktrees for parallel work. Default is `.claude/worktrees` inside the project. Fine unless you have a specific reason to put them elsewhere (e.g. a gitignore strategy that conflicts).

**Branch prefix.** Prepended to every worktree branch Claude creates. Default `claude/`. Change if your team uses a different naming convention.

**Preview.** Lets Claude start dev servers, open live previews, and verify code changes against the rendered output with screenshots and DOM inspection. On. This is one of the highest-leverage features in Code -- it's how the verify loop works for frontend work. See [/workflows/claude-code](/workflows/claude-code).

**Persist Preview sessions.** Saves cookies, local storage, and login state for dev server previews across app restarts. On if you're developing something that needs authenticated state for testing. Off if you'd rather start fresh every time. Turning this off clears whatever's saved.

**Create pull requests automatically.** When Claude pushes a branch, automatically open a PR without asking. Applies to remote (cloud) sessions only. On if you run cloud Code while away from the keyboard. Off if you want to review the diff before opening a PR.

**Autofix pull requests.** Claude monitors a PR for CI failures and review comments and responds proactively, posting comments on your behalf. Useful for long-running PRs, but the behaviour can be embarrassing if Claude gets something wrong. Leave off until you trust the workflow.

**Dynamic workflows.** Whether Claude can write a background JavaScript script that orchestrates many subagents at once, instead of working a large task turn by turn. Research preview, on by default on paid plans (Claude Code v2.1.154+). This is the toggle behind the `ultracode` keyword and `/effort ultracode`; with it off, those stop triggering runs and `ultracode` disappears from the `/effort` menu. The control lives in Claude Code's `/config` (the Dynamic workflows row), not in this web panel — on Pro that's where you switch it on. Organisations can disable it for everyone from the Claude Code admin settings page, or with `"disableWorkflows": true` in managed settings. Leave it on unless you specifically want to keep large tasks single-threaded. See [/concepts/dynamic-workflows](/concepts/dynamic-workflows) for what it actually does and when it earns its cost.

**Auto-archive after PR merge or close.** Automatically archives the desktop session when its PR gets merged or closed. On. Keeps the session list clean.

**Authorization tokens.** OAuth tokens for Claude Code applications you've authorised. Worth reviewing every few months. Revoke anything you don't recognise or no longer use. This is the kind of cleanup that prevents small problems from turning into bigger ones.

### Cowork

Two settings.

**Dispatch.** Toggles whether your phone can dispatch tasks to this computer. On if you use Dispatch from your phone. Off otherwise.

**Instructions for Cowork.** Like the global Instructions for Claude in General, but specifically applied to Cowork sessions. Useful if your Cowork workflows have different preferences than your chat workflows. Common use: tell Cowork to be more cautious about file deletions because it's actually writing to disk and undoing things is harder than undoing words.

### Claude in Chrome

Settings for the Chrome extension that lets Claude browse for you.

**Default for all sites.** The dropdown gives you "Allow extension," "Ask each time," or "Block by default." The choice is how much trust you give Claude on arbitrary websites. *Allow* is convenient but means Claude can interact with anything, including sites with prompt injection risks or sensitive data. *Ask each time* is the cautious default: you approve per site. *Block by default* means Claude never works in Chrome unless you've explicitly allowed a site. For most people, *Allow* with a few specific blocks (see below) is the right balance.

**Blocked sites.** Sites where Claude in Chrome never runs, regardless of the default. Worth adding: banking, healthcare portals, anything with credentials Claude doesn't need access to. Better safe than sorry. The list is yours; add to it as you discover sites where you'd rather Claude stay out.

## Desktop app settings

Only show in the desktop app, not on the web. The left nav adds a "Desktop app" section below the shared categories.

### General (desktop)

App-level behaviour.

**Run on startup.** Automatically launches Claude when you log into your computer. On if you use Claude every day. Off if you prefer to launch manually.

**Quick Entry keyboard shortcut.** A global hotkey that opens Claude from anywhere. Defaults to `Ctrl/Cmd+Alt+Space`. Worth using. Frictionless capture is the whole point of having a fast chat surface always available.

**System tray.** Keeps Claude running in the system tray after you close the window. On if you want scheduled tasks and Dispatch to keep working when the window is closed. Off if you want Claude to actually quit when you hit close.

**Keep computer awake.** Prevents your computer from sleeping while Claude is open, so scheduled tasks can run. On if you run scheduled tasks or long-running Cowork sessions that need to complete while you're away. Off if you don't. The display can still turn off; closing the laptop lid still puts the machine to sleep.

**Allow all browser actions.** Lets Claude (in Chrome / browser use) interact with any website in Chrome without asking. The note about putting your data at risk is accurate. Off is the safe default. On only if you specifically need Claude to act on the web autonomously and you trust the workflow.

**Connected browsers.** Shows which Chrome instances are signed in and available for Claude to automate. Recheck if you've signed into a new browser and don't see it listed.

**Computer use (beta).** Lets Claude take screenshots and control your keyboard and mouse in apps you allow. Powerful and risky. Off by default. Turn on only when you have a specific automation in mind, and stay at the desk while it runs. Even with the safety nets in place, an LLM controlling your mouse is a category of "what could go wrong" that benefits from human supervision.

**Unhide apps when Claude finishes.** Restores apps Claude hid during a task. On.

**Denied apps.** Apps Claude is never allowed to access, even indirectly. Worth adding: password managers, financial apps, anything you don't want Claude touching under any circumstances. The list is small but valuable.

**Accessibility / Screen recording.** OS-level permissions that computer use needs to function. On macOS these require system-level grants in System Settings. If they say "Not supported," your OS doesn't allow them for this app (often because permissions haven't been granted yet, sometimes because the OS version doesn't support them).

### Extensions (desktop)

Where you install desktop-specific extensions, like the Filesystem extension that lets Claude read and write local files.

**Browse extensions.** Opens Anthropic's extension directory.

**Installed on your computer.** The list of extensions currently installed, with Configure buttons per extension.

**Advanced settings.** Hidden by default. Generally don't touch unless you know what you're doing.

**Drag .mcpb or .dxt files here to install.** Sideload extensions you got from elsewhere (a developer's GitHub release, an internal company extension). Treat sideloaded extensions like you treat any other software you install from the internet: trust the source or don't install it.

The difference between *Extensions* and *Connectors* is where they run. Connectors are web-side integrations (Gmail, Drive, etc.) that Anthropic runs in the cloud. Extensions are local processes that run on your computer (filesystem access, local databases, anything that needs OS-level access). Both show up as tools Claude can call; the difference matters mostly for data privacy and reliability.

### Developer (desktop)

Developer-mode settings for building extensions, debugging connectors, and working with the local API. Most people don't need to touch this. If you're building an MCP server or developing a desktop extension, this is where you point Claude at your local dev build.

## What to do next

The defaults are mostly fine. The settings worth your attention are listed at the top of this page. If you have ten minutes, write your Instructions for Claude. If you have an hour, walk through your Connectors and scope each one. Everything else can wait until you bump into it.

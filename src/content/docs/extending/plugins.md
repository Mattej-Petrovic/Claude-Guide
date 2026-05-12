---
title: Plugins
lede: Third-party extensions that add capabilities to Claude's interfaces.
section: extending
---

A plugin is a bundle. One installable unit that can contain skills, slash commands, subagents, hooks, and MCP server configurations, packaged together so a single install gives you everything needed for a workflow instead of wiring up five things separately.

Plugins are the newest extension primitive in Claude Code and the one most people are still figuring out. The mechanics are straightforward; the question of what's actually worth packaging as a plugin versus what should stay as a loose skill or command is where the judgment lives.

## What a plugin actually is

A plugin is a directory with a manifest (`plugin.json` or equivalent) and any combination of these subfolders:

```
my-plugin/
├── plugin.json           # name, version, description, entry points
├── skills/               # SKILL.md files, same format as standalone skills
├── commands/             # slash commands the plugin adds
├── agents/               # subagents the plugin defines
├── hooks/                # hooks the plugin registers
└── .mcp.json             # MCP servers the plugin wants to run
```

Install the plugin and Claude Code knows about all of it. Uninstall it and everything the plugin added goes away cleanly. That's the whole point: bundled distribution and clean install/uninstall, instead of telling someone "copy this skill, then add this MCP server, then write this command, then enable this hook."

## How they're installed

Two paths in Claude Code:

**The marketplace.** Type `/plugin marketplace` to browse what's published. `/plugin` to manage installed ones. Anthropic ships a default marketplace and you can add others (community-run, team-internal, your own). Installation pulls the plugin directory into your local Claude Code config and activates everything inside.

**Direct from a path or repo.** You can install a plugin from a local folder or a git repository without going through a marketplace. Useful for plugins your team builds internally, or for trying something before publishing.

Once installed, the plugin's contents behave like anything else. Its skills load via the normal skill-trigger mechanism. Its commands appear in `/`-completion. Its MCP servers show up alongside servers you configured manually.

## Plugin vs MCP server vs skill

This is the question most people get tangled on, and worth being precise about.

| | What it is | Distributed as |
|---|---|---|
| Skill | A folder of instructions Claude executes on demand | A directory you drop into `.claude/skills/` |
| MCP server | A process exposing tools to any MCP-speaking client | An npm/uvx/binary package you run |
| Plugin | A bundle that can include any or all of the above | A single installable unit via marketplace or path |

A plugin is not a different *kind* of thing. It's a *packaging* of the things. If a plugin contains an MCP server, that server is still a regular MCP server and works the same way it would standalone. The plugin just installs and configures it for you.

Practical implication: if someone tells you to install "the GitHub plugin," what they probably mean is a plugin that bundles the GitHub MCP server plus a few skills and commands that lean on it. You could achieve the same thing manually by adding the MCP server to `.mcp.json` and writing the skills yourself. The plugin is a shortcut, not new capability.

Worth flagging: things distributed *through* plugin marketplaces aren't always plugins in the formal sense. Sequential-thinking, for example, is an MCP server (`server-sequential-thinking`) that some marketplaces re-list as if it were a plugin. The functional result is the same (you get sequential-thinking tools available to Claude); the technical distinction matters only if you're trying to understand what got installed where.

## How to use plugins well

**Install for workflows, not features.** A single skill is rarely worth packaging as a plugin. A workflow that needs three skills, two commands, an agent, and an MCP server is exactly what plugins are for. If you can describe what you got from installing the plugin in one sentence, it's probably the wrong shape; it should compress a paragraph of setup.

**Read the manifest before installing.** A plugin can register hooks (which run on tool calls), add MCP servers (which spawn local processes), and define agents (which can have their own permissions). Skim what a plugin contains before installing, especially from community marketplaces. The same trust posture that applies to running random `npm install` applies here.

**Pin versions for anything you depend on.** If a plugin you rely on auto-updates and the new version changes a command's behavior, your workflow breaks silently. Most plugin systems let you pin or lock a version. Use that on plugins you've integrated into actual work.

**Build internal plugins for your team.** The strongest use of plugins is internal: your team's deploy workflow, your code review process, your custom MCP servers, all bundled and shipped to teammates' machines as one install. Onboarding a new engineer becomes "install our plugin" instead of "follow these eleven setup steps."

**Don't plugin everything.** A skill you only use yourself, on one machine, doesn't need to be a plugin. The packaging overhead exists to solve distribution. If there's nothing to distribute, the plugin layer is friction.

## What the marketplace is actually like right now

Honest take: it's early. Anthropic ships some baseline plugins. Community marketplaces are appearing but quality varies a lot, ranging from genuinely useful (well-tested workflows from active builders) to "rebadged MCP servers" to "AI-generated skill bundles nobody has tried."

The most reliable signals when browsing:

- The plugin's source repo is active (recent commits, responsive issues)
- The author has real Claude Code usage visible elsewhere (their own GitHub, blog posts, builds you can verify)
- The plugin's README explains what it bundles and why, not just what it claims to do
- Installation is reversible cleanly (some early plugins still leave artifacts behind on uninstall)

The least reliable signals:

- Stars and download counts (the ecosystem is too young for these to filter quality)
- Marketplace placement (curation is partial; visibility doesn't imply vetting)
- Names that match popular concepts (anyone can publish "sequential-thinking" or "code-review")

This will improve. For now, install fewer, read more.

## Common mistakes

**Treating plugins as the same thing as MCP servers.** Already addressed above, worth repeating because it's the most common confusion. A plugin can *contain* an MCP server. The MCP server is the thing exposing tools to Claude. The plugin is the wrapping that distributes it alongside related skills and commands.

**Installing without reading.** A plugin can register hooks that execute on every tool call. A malicious or buggy hook in an installed plugin runs in the same context as your other Claude Code work. Read manifests. Trust authors before extensions.

**Plugin sprawl.** Installing twenty plugins because they all look interesting and forgetting which ones are providing which behaviors. When something stops working as expected, having a clear mental model of what's installed beats spelunking through plugin manifests later. Treat your installed plugin list like dependencies in a project: deliberate, audited, removable.

**Trying to plugin-ize too early.** Building a workflow as a plugin from the start, before you know what the workflow actually needs, often results in worse output than starting with a loose skill, iterating until it works, and packaging it once it's stable. Plugins solve a distribution problem. Don't pay distribution costs for something only you use.

**Assuming uninstall is always clean.** Most plugins clean up their own state on uninstall. Some don't. Check `~/.claude/` periodically if you've experimented with a lot of them; you may have hooks or MCP configs left behind from plugins you forgot.

## A concrete example: when plugins make sense

Imagine your team has a deploy process that involves:

1. A skill called `deploy-check` that walks through pre-deploy validation
2. A `/deploy` slash command that runs the actual deploy workflow
3. A subagent for parallelizing safety checks across services
4. An MCP server pointed at your internal infrastructure API
5. A hook that posts to a Slack channel after every deploy

Five separate things. Onboarding a new engineer means walking them through five separate setups. Documentation drifts. Things go missing.

Bundle all five as `acme-deploy-plugin`, ship it through your team's internal marketplace, and onboarding becomes one command. Updates roll out the same way. Removal is one command. *That's* the use case plugins were built for.

Most personal-use cases don't hit this threshold. Most team workflows do.

<svg viewBox="0 0 800 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram showing the contents of a plugin and where each part is registered inside Claude Code on install" style="width:100%;height:auto;color:currentColor;font-family:ui-sans-serif,system-ui,sans-serif">
  <style>
    .panel { fill: none; stroke: currentColor; stroke-opacity: 0.25; stroke-width: 1; }
    .panel-accent { fill: none; stroke: #d97706; stroke-width: 1.5; }
    .label { fill: currentColor; font-size: 13px; font-weight: 600; }
    .sub { fill: currentColor; fill-opacity: 0.7; font-size: 12px; }
    .accent { fill: #d97706; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; }
    .file { fill: currentColor; fill-opacity: 0.85; font-size: 12px; font-family: ui-monospace, monospace; }
    .dim { fill: currentColor; fill-opacity: 0.5; font-size: 11px; font-family: ui-monospace, monospace; }
    .arrow { stroke: currentColor; stroke-opacity: 0.4; stroke-width: 1; fill: none; }
    .arrow-accent { stroke: #d97706; stroke-width: 1.4; fill: none; }
    .step-num { fill: #d97706; font-size: 11px; font-weight: 700; }
  </style>
  <!-- Plugin bundle (left) -->
  <text class="accent" x="40" y="36">PLUGIN BUNDLE</text>
  <rect class="panel-accent" x="40" y="52" width="260" height="380" rx="6"/>
  <text class="label" x="56" y="78">acme-deploy-plugin/</text>
  <text class="file" x="72" y="106">plugin.json</text>
  <text class="dim" x="72" y="122">name, version, manifest</text>
  <text class="file" x="72" y="152">skills/</text>
  <text class="dim" x="72" y="168">  deploy-check/SKILL.md</text>
  <text class="file" x="72" y="198">commands/</text>
  <text class="dim" x="72" y="214">  deploy.md</text>
  <text class="file" x="72" y="244">agents/</text>
  <text class="dim" x="72" y="260">  safety-checker.md</text>
  <text class="file" x="72" y="290">hooks/</text>
  <text class="dim" x="72" y="306">  post-deploy-slack.js</text>
  <text class="file" x="72" y="336">.mcp.json</text>
  <text class="dim" x="72" y="352">  internal-infra-api server</text>
  <text class="sub" x="56" y="402">One install command</text>
  <text class="sub" x="56" y="418">distributes all of this.</text>
  <!-- Arrows -->
  <path class="arrow-accent" d="M 300 110 L 380 110" marker-end="url(#arrAccent)"/>
  <path class="arrow-accent" d="M 300 158 L 380 158" marker-end="url(#arrAccent)"/>
  <path class="arrow-accent" d="M 300 206 L 380 206" marker-end="url(#arrAccent)"/>
  <path class="arrow-accent" d="M 300 254 L 380 254" marker-end="url(#arrAccent)"/>
  <path class="arrow-accent" d="M 300 302 L 380 302" marker-end="url(#arrAccent)"/>
  <path class="arrow-accent" d="M 300 346 L 380 346" marker-end="url(#arrAccent)"/>
  <!-- Where things get registered (right) -->
  <text class="accent" x="380" y="36">REGISTERED IN CLAUDE CODE</text>
  <rect class="panel" x="380" y="92" width="380" height="36" rx="4"/>
  <text class="label" x="396" y="115">Plugin manifest</text>
  <text class="sub" x="540" y="115">tracked in installed plugins list</text>
  <rect class="panel" x="380" y="140" width="380" height="36" rx="4"/>
  <text class="label" x="396" y="163">Skills</text>
  <text class="sub" x="430" y="163">available like any other skill, fire on description match</text>
  <rect class="panel" x="380" y="188" width="380" height="36" rx="4"/>
  <text class="label" x="396" y="211">Commands</text>
  <text class="sub" x="466" y="211">added to / completion</text>
  <rect class="panel" x="380" y="236" width="380" height="36" rx="4"/>
  <text class="label" x="396" y="259">Subagents</text>
  <text class="sub" x="466" y="259">invocable by name or by Claude when delegating</text>
  <rect class="panel" x="380" y="284" width="380" height="36" rx="4"/>
  <text class="label" x="396" y="307">Hooks</text>
  <text class="sub" x="446" y="307">registered against tool-call events they declare</text>
  <rect class="panel" x="380" y="332" width="380" height="36" rx="4"/>
  <text class="label" x="396" y="355">MCP servers</text>
  <text class="sub" x="478" y="355">started alongside manually-configured ones</text>
  <text class="sub" x="380" y="402">Uninstalling the plugin removes all of these together.</text>
  <text class="sub" x="380" y="418">No leftover state if the plugin is well-behaved.</text>
  <defs>
    <marker id="arrAccent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97706"/>
    </marker>
  </defs>
</svg>

<a href="/library/plugins" class="crosslink">
  <svg class="crosslink__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" stroke-linecap="round" stroke-linejoin="round" /></svg>
  <div class="crosslink__body">
    <p class="crosslink__label">See also</p>
    <p class="crosslink__title">Library: Plugins</p>
    <p class="crosslink__desc">Browse available plugins for Claude interfaces.</p>
  </div>
  <svg class="crosslink__arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" width="16" height="16"><path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" /></svg>
</a>

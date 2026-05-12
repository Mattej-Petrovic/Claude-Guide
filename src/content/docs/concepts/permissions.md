---
title: Permissions
lede: Claude Code permission modes, allow/deny rules, and the auto-mode classifier. How to give Claude room to work without giving it your laptop.
section: concepts
---

Permissions are how you tell Claude Code what it can and cannot do without asking. Five modes, three rule types, and a classifier that judges the gray-area calls.

The fundamental tradeoff: full prompts on every action means you approve about 93% of them (Anthropic's own number) and develop "approval fatigue" where you stop reading them. No prompts at all means Claude can do anything, including things you would not approve. The permission system exists to find the middle.

## How it works

Every tool call Claude tries to make passes through three checks in fixed order:

1. **Deny rules**. If the action matches a deny rule, it is blocked. Always wins, in every mode, including bypass.
2. **Ask rules**. If it matches an ask rule, you get prompted even if other rules would allow it.
3. **Allow rules**. If it matches an allow rule, it runs without prompting.

If nothing matches, the active permission mode decides what happens.

Rules live in `permissions.allow`, `permissions.deny`, and `permissions.ask` arrays inside `.claude/settings.json` (project) or `~/.claude/settings.json` (user). Tool patterns look like `Bash(npm test)`, `Read(./.env)`, `Write(src/**)`, and `WebFetch(*.example.com)`. Glob patterns work. Deny always wins.

<svg viewBox="0 0 800 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Permission evaluation order: deny rules first, then ask rules, then allow rules, then the active mode decides" style="max-width: 100%; height: auto; margin: 2rem 0;">
  <defs>
    <style>
      .step-box { fill: none; stroke: currentColor; stroke-width: 1; opacity: 0.4; }
      .step-box-start { fill: none; stroke: #d97706; stroke-width: 1.5; opacity: 0.7; }
      .outcome-box { fill: none; stroke: currentColor; stroke-width: 1; opacity: 0.5; }
      .step-text { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 13px; opacity: 0.85; }
      .step-text-start { fill: #d97706; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; }
      .outcome-text { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 13px; opacity: 0.85; font-weight: 600; }
      .muted-text { fill: currentColor; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 11px; opacity: 0.55; }
      .arrow { stroke: currentColor; stroke-width: 1; fill: none; opacity: 0.4; }
      .arrow-yes { stroke: currentColor; stroke-width: 1; fill: none; opacity: 0.4; stroke-dasharray: 4 3; }
      .arrow-label { fill: currentColor; opacity: 0.55; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 10px; letter-spacing: 0.5px; font-weight: 600; }
    </style>
    <marker id="perm-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" opacity="0.5"/>
    </marker>
  </defs>
  <rect x="200" y="20" width="260" height="50" rx="6" class="step-box-start"/>
  <text x="220" y="50" class="step-text-start">TOOL CALL REQUESTED</text>
  <line x1="330" y1="70" x2="330" y2="105" class="arrow" marker-end="url(#perm-ah)"/>
  <rect x="200" y="110" width="260" height="50" rx="6" class="step-box"/>
  <text x="220" y="142" class="step-text">1. Match a deny rule?</text>
  <line x1="465" y1="135" x2="555" y2="135" class="arrow-yes" marker-end="url(#perm-ah)"/>
  <text x="495" y="128" class="arrow-label">YES</text>
  <rect x="560" y="115" width="220" height="40" rx="6" class="outcome-box"/>
  <text x="580" y="140" class="outcome-text">BLOCKED</text>
  <line x1="330" y1="160" x2="330" y2="195" class="arrow" marker-end="url(#perm-ah)"/>
  <text x="340" y="180" class="arrow-label">NO</text>
  <rect x="200" y="200" width="260" height="50" rx="6" class="step-box"/>
  <text x="220" y="232" class="step-text">2. Match an ask rule?</text>
  <line x1="465" y1="225" x2="555" y2="225" class="arrow-yes" marker-end="url(#perm-ah)"/>
  <text x="495" y="218" class="arrow-label">YES</text>
  <rect x="560" y="205" width="220" height="40" rx="6" class="outcome-box"/>
  <text x="580" y="230" class="outcome-text">PROMPT YOU</text>
  <line x1="330" y1="250" x2="330" y2="285" class="arrow" marker-end="url(#perm-ah)"/>
  <text x="340" y="270" class="arrow-label">NO</text>
  <rect x="200" y="290" width="260" height="50" rx="6" class="step-box"/>
  <text x="220" y="322" class="step-text">3. Match an allow rule?</text>
  <line x1="465" y1="315" x2="555" y2="315" class="arrow-yes" marker-end="url(#perm-ah)"/>
  <text x="495" y="308" class="arrow-label">YES</text>
  <rect x="560" y="295" width="220" height="40" rx="6" class="outcome-box"/>
  <text x="580" y="320" class="outcome-text">RUN</text>
  <line x1="330" y1="340" x2="330" y2="375" class="arrow" marker-end="url(#perm-ah)"/>
  <text x="340" y="360" class="arrow-label">NO</text>
  <rect x="180" y="380" width="300" height="60" rx="6" class="step-box"/>
  <text x="200" y="408" class="step-text">4. Active permission mode decides</text>
  <text x="200" y="427" class="muted-text">(default, acceptEdits, plan, auto, dontAsk, bypass)</text>
</svg>

## The five permission modes

**default**. Conservative. Reads and edits in the working directory auto-approve. Everything else prompts. The starting point for new sessions.

**acceptEdits**. File operations (Read, Write, Edit, MultiEdit) auto-approve. Bash commands and other tools still prompt. Useful when you are in flow and trust Claude with edits but want to review shell commands.

**plan**. Read-only. Claude can analyze and propose a plan but cannot modify anything. Used for "look at this codebase and tell me how to migrate it" before you commit to changes. Switch out of plan mode when you are ready to execute.

**auto**. Released March 2026 for Team and Enterprise. A Sonnet 4.6 classifier evaluates each tool call before it runs. Safe-looking actions auto-approve, risky-looking ones get blocked. The classifier is reasoning-blind by design (it sees user messages and tool calls, not Claude's own messages or tool results), and a separate prompt-injection probe scans tool outputs before they reach Claude. This is the closest thing to "no prompts but still safe." Currently unavailable on Pro/Max plans.

**bypassPermissions**. The "YOLO mode," activated with `--dangerously-skip-permissions`. No prompts, no classifier, full speed. Reserved for isolated environments (containers, VMs, dev sandboxes without internet) where Claude cannot damage anything that matters. Anthropic chose the word "dangerously" deliberately. Note that even bypass respects deny rules, but everything else gets approved.

A sixth mode exists: **dontAsk** auto-denies anything that would normally prompt, allowing only what is explicitly in your allow rules and read-only Bash commands. Useful for fully non-interactive CI pipelines where you have pre-defined the exact tool surface.

Cycle through modes during a session with `Shift+Tab`. Set the default in `settings.json` with `permissions.defaultMode`. Override at startup with `claude --permission-mode <name>`.

## How to use them well

**Set sane deny rules first.** The minimum every project should have:

```json
{
  "permissions": {
    "deny": ["Bash(rm -rf:*)", "Bash(sudo:*)", "Read(.env)", "Read(./secrets/**)"]
  }
}
```

Deny always wins over allow. Even if a hook or mode would approve the action, deny rules block it. This is your foundation.

**Allow narrowly, not broadly.** `Bash(*)` is permission to run any shell command. Use specific patterns: `Bash(npm run lint)`, `Bash(git status:*)`, `Bash(pnpm:*)`. Specific allowlists keep the surface small without making sessions painful.

**Use plan mode before any non-trivial change.** Read-only exploration costs nothing and produces a plan you can correct before Claude touches a file. The 10x time-saving claim from practitioner posts is real for tasks where the wrong starting point would have wasted a lot of edits.

**Use acceptEdits in flow, default for risk.** When you are moving fast through clear work, acceptEdits removes most of the prompts and only stops you for shell commands. When you are about to do something that could break things, switch back to default and read every prompt.

**Reach for auto mode if you have access.** It is the actual answer to approval fatigue if you are on Team or Enterprise. The classifier blocks roughly the same things you would have, does not waste your attention on the things you would have approved anyway, and stays honest about edge cases by escalating uncertainty.

**Avoid bypass except in real sandboxes.** Containers, VMs, ephemeral CI runners, dev environments without network access. Not on your laptop with your credentials and your filesystem.

**Use boundaries instead of new rules for one-offs.** Telling Claude in conversation "wait until I review before deploying" creates a soft boundary that auto mode's classifier respects until you lift it. For one-shot constraints, this is faster than editing settings. For permanent guarantees, add a deny rule.

## Common mistakes

**Trusting allow rules to constrain command arguments.** `Bash(curl:*)` looks like it limits curl to specific URLs but does not reliably enforce that. Use `WebFetch` permission rules and the sandbox's `allowedDomains` list for URL filtering.

**Putting deny rules in places Claude can edit.** A deny rule in CLAUDE.md or in a file Claude can write to is a hope. Permissions live in `settings.json` (project) and `settings.local.json` (personal, gitignored), and managed enterprise settings override both.

**Running `--dangerously-skip-permissions` on the host system.** This is how engineers accidentally run `rm -rf` on directories that mattered. The flag is for environments where the worst case is recreating a container.

**Ignoring the boundary mechanism.** Telling Claude "do not push to main" works in auto mode and persists across the session unless context is compacted out. Many people do not know this exists and try to enforce it through prompting after the fact.

**Pretending acceptEdits is safe.** It auto-approves writes, including writes to files Claude should not be touching unless your allow/deny rules explicitly catch them. acceptEdits is convenience, not protection.

**Building a permissions structure no one understands.** A `settings.json` with 50 allow rules, 20 deny rules, and conditional asks across three files is unreadable. Start simple, add rules in response to actual friction, document why they exist when the reason is not obvious.

## Examples

**Sane defaults for a new project:**

```json
{
  "permissions": {
    "defaultMode": "default",
    "allow": [
      "Read",
      "Write(src/**)",
      "Edit(src/**)",
      "Bash(git status:*)",
      "Bash(git diff:*)",
      "Bash(pnpm:*)",
      "Bash(npm test:*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl:*|sh)",
      "Read(.env)",
      "Read(./secrets/**)"
    ]
  }
}
```

Reads anywhere, writes only inside `src/`, common scripts pre-approved, dangerous commands hard-blocked.

**Locked-down for production CI:** `defaultMode: dontAsk`, allow list contains only the exact commands the pipeline needs, no wildcards. If Claude tries anything else, it is denied. Combined with a turn limit and a budget cap, the agent has a known finite surface.

**Read-only exploration for a new codebase:** Start with `claude --permission-mode plan`. Claude can read everything, run greps, search for patterns, and propose a migration strategy without touching a file. When the plan is right, switch out of plan mode and execute.

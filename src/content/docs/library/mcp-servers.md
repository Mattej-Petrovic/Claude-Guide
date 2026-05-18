---
title: MCP servers
lede: A reference list of MCP servers — what they expose and how to connect them.
section: library
---

<a href="/extending/mcp" class="crosslink">
  <svg class="crosslink__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" stroke-linecap="round" stroke-linejoin="round" /></svg>
  <div class="crosslink__body">
    <p class="crosslink__label">See also</p>
    <p class="crosslink__title">Extending: MCP</p>
    <p class="crosslink__desc">How the Model Context Protocol works under the hood.</p>
  </div>
  <svg class="crosslink__arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" width="16" height="16"><path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" /></svg>
</a>

MCP servers connect Claude Code to external tools and data sources. Once connected, Claude can read from and act on those systems directly — no copy-pasting into chat.

```
claude mcp add <name> -- <command>
```

Verify active servers with `/mcp`. Remove with `claude mcp remove <name>`. Add `--scope user` to make a server available across all projects instead of just the current one.

**Security note:** Third-party MCP servers run code on your machine. Only install servers you trust. Be especially careful with servers that fetch remote content — they can expose you to prompt injection.

---

## Browser Automation

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">Playwright MCP</span>
    <span class="skill-card__tag">Browser automation via accessibility snapshots</span>
  </div>
  <p class="skill-card__author">By Microsoft &middot; Official</p>
  <p class="skill-card__desc">Navigate URLs, click elements, fill forms, take screenshots, and run end-to-end tests driven by natural language. Works without a vision model by reading the accessibility tree instead of pixels. Supports Chrome, Firefox, and WebKit; runs with a persistent browser profile or in isolated mode for clean test sessions. Use <code>@playwright/mcp</code> — older packages (<code>@modelcontextprotocol/server-playwright</code>, <code>@executeautomation/playwright-mcp-server</code>) are deprecated.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Install (Claude Code)</span>
    <pre><code>claude mcp add playwright -- npx @playwright/mcp@latest</code></pre>
  </div>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Or add to ~/.claude.json (Claude Desktop)</span>
    <pre><code>{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}</code></pre>
  </div>
  <a class="skill-card__link" href="https://github.com/microsoft/playwright-mcp" target="_blank" rel="noopener">github.com/microsoft/playwright-mcp →</a>
</div>

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">Puppeteer MCP</span>
    <span class="skill-card__tag">Chrome automation via Puppeteer</span>
  </div>
  <p class="skill-card__desc">Navigate pages, click elements, type into forms, execute JavaScript, capture screenshots, and extract DOM content. Chrome/Chromium only. Use over Playwright when you specifically need Chrome's stealth/anti-detection features or have an existing Puppeteer-based workflow. Note: <code>@modelcontextprotocol/server-puppeteer</code> is deprecated — use <code>puppeteer-mcp-server</code> below.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Install (Claude Code)</span>
    <pre><code>claude mcp add puppeteer -- npx -y puppeteer-mcp-server</code></pre>
  </div>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Or auto-configure both Claude Desktop and Claude Code</span>
    <pre><code>npx puppeteer-mcp-claude install</code></pre>
  </div>
</div>

---

## Security & Pentesting

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">HexStrike AI</span>
    <span class="skill-card__tag">150+ cybersecurity tools via 12 AI agents</span>
  </div>
  <p class="skill-card__author">By 0x4m4</p>
  <p class="skill-card__desc">Network recon, web app testing, binary analysis, cloud security, OSINT, bug bounty, and CTF solving — runs as a local HTTP server Claude Code connects to via MCP. Includes subdomain enumeration, SQL injection, 4000+ Nuclei templates, password cracking, reverse engineering (GDB, Ghidra, Radare2), and cloud assessment (Prowler, Scout Suite, Trivy). <strong>Requires authorization — only test systems you own or have explicit written permission to test.</strong></p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Install</span>
    <pre><code>git clone https://github.com/0x4m4/hexstrike-ai.git
cd hexstrike-ai
python3 -m venv hexstrike-env
source hexstrike-env/bin/activate
pip3 install -r requirements.txt
python3 hexstrike_server.py</code></pre>
  </div>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Add to Claude Code (once server is running)</span>
    <pre><code>{
  "mcpServers": {
    "hexstrike-ai": {
      "command": "python3",
      "args": ["/path/to/hexstrike-ai/hexstrike_mcp.py", "--server", "http://localhost:8888"],
      "timeout": 300
    }
  }
}</code></pre>
  </div>
  <a class="skill-card__link" href="https://github.com/0x4m4/hexstrike-ai" target="_blank" rel="noopener">github.com/0x4m4/hexstrike-ai →</a>
</div>

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">Talon</span>
    <span class="skill-card__tag">Pentesting methodology over SSH to a Kali VM</span>
  </div>
  <p class="skill-card__author">By CarbeneAI</p>
  <p class="skill-card__desc">Built on Anthropic's SSH MCP server — Claude executes commands on your Kali Linux VM over SSH, interprets output, suggests next steps, and maintains a full attack narrative in session. Includes a 5-phase recon workflow, 13-service enumeration playbook, OSCP-style report template, and Obsidian vault note templates. Unlike HexStrike, all tools run remotely on your VM. <strong>Requires authorization — only use against systems you own or have explicit written permission to test.</strong></p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Prerequisites — set up key-based SSH auth first</span>
    <pre><code>ssh-keygen -t ed25519 -C "claude-code-pentest"
ssh-copy-id YOUR_USERNAME@YOUR_KALI_IP</code></pre>
  </div>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Add SSH MCP to Claude Code</span>
    <pre><code>claude mcp add kali-ssh -- npx -y @anthropic-ai/mcp-server-ssh ssh://YOUR_USERNAME@YOUR_KALI_IP</code></pre>
  </div>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Or in ~/.claude.json</span>
    <pre><code>{
  "mcpServers": {
    "kali-ssh": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-ssh", "ssh://YOUR_USERNAME@YOUR_KALI_IP"]
    }
  }
}</code></pre>
  </div>
  <a class="skill-card__link" href="https://github.com/CarbeneAI/Talon" target="_blank" rel="noopener">github.com/CarbeneAI/Talon →</a>
</div>

---

## Knowledge & Context

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">code-review-graph</span>
    <span class="skill-card__tag">Token-efficient codebase knowledge graph</span>
  </div>
  <p class="skill-card__author">By tirth8205</p>
  <p class="skill-card__desc">Builds a persistent structural map (Tree-sitter + SQLite) of functions, classes, and imports — so reviews query only the minimal relevant files rather than reading everything. Benchmarked at 6.8x fewer tokens on code reviews across 23+ languages. Also installs skills (<code>/review-delta</code>, <code>/review-pr</code>, <code>/build-graph</code>) and hooks alongside the MCP server.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Install (requires Python 3.10+)</span>
    <pre><code>pip install code-review-graph
code-review-graph install
code-review-graph build</code></pre>
  </div>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Or Claude Code only</span>
    <pre><code>code-review-graph install --platform claude-code</code></pre>
  </div>
  <a class="skill-card__link" href="https://github.com/tirth8205/code-review-graph" target="_blank" rel="noopener">github.com/tirth8205/code-review-graph →</a>
</div>

<div class="skill-card">
  <div class="skill-card__header">
    <span class="skill-card__name">Obsidian MCP</span>
    <span class="skill-card__tag">Read and write your Obsidian vault from Claude Code</span>
  </div>
  <p class="skill-card__desc">Search notes, read files, create and update notes, navigate backlinks — without leaving the terminal. Two approaches depending on whether Obsidian needs to be running.</p>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Option A — Direct filesystem (Obsidian doesn't need to be running)</span>
    <pre><code>claude mcp add obsidian -- npx -y obsidian-mcp /absolute/path/to/your/vault</code></pre>
  </div>
  <div class="skill-card__install">
    <span class="skill-card__install-label">Option B — REST API via Local REST API plugin (Obsidian must be running, more features)</span>
    <pre><code>{
  "mcpServers": {
    "mcp-obsidian": {
      "command": "uvx",
      "args": ["mcp-obsidian"],
      "env": {
        "OBSIDIAN_API_KEY": "your_api_key_here",
        "OBSIDIAN_HOST": "127.0.0.1",
        "OBSIDIAN_PORT": "27124"
      }
    }
  }
}</code></pre>
  </div>
  <p class="skill-card__desc">Option A: <a href="https://github.com/StevenStavrakis/obsidian-mcp" target="_blank" rel="noopener">github.com/StevenStavrakis/obsidian-mcp</a> &mdash; Option B requires the <a href="https://github.com/coddingtonbear/obsidian-local-rest-api" target="_blank" rel="noopener">Obsidian Local REST API</a> community plugin and <code>uv</code> installed. <a href="https://github.com/MarkusPfundstein/mcp-obsidian" target="_blank" rel="noopener">github.com/MarkusPfundstein/mcp-obsidian</a></p>
</div>

---

## Find More

- [MCP server registry](https://github.com/modelcontextprotocol/servers) -- the canonical community directory
- [mcp.run](https://mcp.run) -- hosted MCP servers, no local setup required
- [Anthropic's MCP docs](https://code.claude.com/docs/en/mcp) -- official server list and configuration reference
- `/mcp` inside any Claude Code session -- lists connected servers and available tools

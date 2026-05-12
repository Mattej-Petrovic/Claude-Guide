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

MCP servers connect Claude Code to external tools and data sources. Once connected, Claude can read from and act on those systems directly -- no copy-pasting into chat.

Add a server with:
```
claude mcp add <name> -- <command>
```

Verify active servers inside any session with `/mcp`. Remove with `claude mcp remove <name>`. Add `--scope user` to make a server available across all projects instead of just the current one.

**Security note:** Third-party MCP servers run code on your machine and can read tool outputs that pass through Claude's context window. Only install servers you trust and understand. Be especially careful with servers that fetch remote content -- they can expose you to prompt injection.

---

## Browser Automation

---

### Playwright MCP
**By Microsoft · Official**

Browser automation via structured accessibility snapshots. Claude can navigate URLs, click elements, fill forms, take screenshots, and run end-to-end tests -- all driven by natural language. Works without a vision model because it reads the accessibility tree rather than parsing pixels.

Supports Chrome, Firefox, and WebKit. Runs with a persistent browser profile by default (so Claude stays logged in between sessions) or in isolated mode for clean test sessions. Can also connect to an already-running browser via CDP.

Note: The old package names `@modelcontextprotocol/server-playwright` (Anthropic's deprecated original) and `@executeautomation/playwright-mcp-server` (community fork) are both still referenced in older tutorials but neither is the current canonical version. Use `@playwright/mcp` from Microsoft.

**Install (Claude Code):**
```
claude mcp add playwright -- npx @playwright/mcp@latest
```

**Or add to `~/.claude.json` for Claude Desktop:**
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

Requires Node.js 18+. Browser binaries are downloaded automatically on first use.

→ [github.com/microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp)

---

### Puppeteer MCP

Browser automation using Google's Puppeteer -- navigate pages, click elements, type into forms, execute JavaScript, capture screenshots, and extract DOM content. Chrome/Chromium only, unlike Playwright's cross-browser support.

**Important:** Anthropic's original `@modelcontextprotocol/server-puppeteer` package is deprecated and archived. Use the community replacement `puppeteer-mcp-server` below, or migrate to Playwright MCP (recommended for most new workflows).

Use Puppeteer over Playwright when you specifically need Chrome's stealth/anti-detection features, or when you have an existing Puppeteer-based workflow you're integrating with.

**Install (Claude Code):**
```
claude mcp add puppeteer -- npx -y puppeteer-mcp-server
```

**Or auto-configure both Claude Desktop and Claude Code:**
```
npx puppeteer-mcp-claude install
```

Runs a headless Chromium instance (~150--300MB RAM at rest). To run headed (visible browser, useful for debugging), set the env var `PUPPETEER_LAUNCH_OPTIONS={"headless":false}`.

---

## Security & Pentesting

---

### HexStrike AI
**By 0x4m4**

MCP server that gives Claude Code autonomous access to 150+ cybersecurity tools across 12 specialized AI agents -- network recon, web application testing, binary analysis, cloud security, OSINT, bug bounty workflows, and CTF solving. Runs as a local HTTP server that Claude Code connects to via the MCP protocol.

Agents include purpose-built workflows for subdomain enumeration, SQL injection, vulnerability scanning with 4000+ Nuclei templates, password cracking, reverse engineering (GDB, Ghidra, Radare2), and cloud assessment (Prowler, Scout Suite, Trivy). An intelligent decision engine selects tools and parameters based on the target and task context.

**Requires authorization.** Always test only against systems you own or have explicit written permission to test. This server gives Claude real offensive capabilities.

**Install:**
```
git clone https://github.com/0x4m4/hexstrike-ai.git
cd hexstrike-ai
python3 -m venv hexstrike-env
source hexstrike-env/bin/activate   # or .\hexstrike-env\Scripts\activate on Windows
pip3 install -r requirements.txt
python3 hexstrike_server.py
```

**Add to Claude Code (once the server is running):**
```json
{
  "mcpServers": {
    "hexstrike-ai": {
      "command": "python3",
      "args": [
        "/path/to/hexstrike-ai/hexstrike_mcp.py",
        "--server",
        "http://localhost:8888"
      ],
      "timeout": 300
    }
  }
}
```

Security tools (nmap, gobuster, nuclei, sqlmap, etc.) must be installed separately. See the README for the full list and install commands.

→ [github.com/0x4m4/hexstrike-ai](https://github.com/0x4m4/hexstrike-ai)

---

### Talon
**By CarbeneAI**

A penetration testing methodology and configuration package built on top of Anthropic's SSH MCP server. Connects Claude Code to a Kali Linux VM (or any pentesting VM) via SSH, then provides structured guidance for a complete engagement: 5-phase automated recon, 13-service enumeration playbook, OSCP-style reporting template, and Obsidian vault note templates for organized documentation.

Unlike HexStrike (which runs tools locally via a Python server), Talon runs all tools remotely on your pentesting VM. Claude executes commands over SSH, interprets the output, suggests next steps, and maintains a full attack narrative inside your Claude Code session.

**Requires authorization.** Only use against systems you own or have explicit written permission to test.

**Prerequisites:** A running Kali Linux VM with SSH access and key-based auth configured.

**Add the SSH MCP to Claude Code:**
```
claude mcp add kali-ssh -- npx -y @anthropic-ai/mcp-server-ssh ssh://YOUR_USERNAME@YOUR_KALI_IP
```

**Or in `~/.claude.json`:**
```json
{
  "mcpServers": {
    "kali-ssh": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-ssh",
        "ssh://YOUR_USERNAME@YOUR_KALI_IP"
      ]
    }
  }
}
```

**Set up key-based auth first:**
```
ssh-keygen -t ed25519 -C "claude-code-pentest"
ssh-copy-id YOUR_USERNAME@YOUR_KALI_IP
```

Clone the Talon repo and copy the methodology files and report templates into your engagement folder. See `docs/usage.md` for the full workflow.

→ [github.com/CarbeneAI/Talon](https://github.com/CarbeneAI/Talon)

---

## Knowledge & Context

---

### code-review-graph
**By tirth8205**

Builds a persistent structural map of your codebase using Tree-sitter, stores it as a graph of functions, classes, and imports in SQLite, and exposes it to Claude via MCP. When Claude needs to review changed code, instead of reading entire files it queries the graph for the minimal relevant set -- the changed files plus their callers, dependents, and test coverage.

Benchmarked at 6.8x fewer tokens on code reviews and up to 49x on daily coding tasks across real open-source repositories. Initial build takes ~10 seconds for a 500-file project. The graph updates automatically on every file edit and git commit via hooks. Supports 23+ languages including TypeScript, Python, Go, Rust, Java, Kotlin, Swift, Vue, Solidity, and Jupyter notebooks.

Note: also installs skills (`/review-delta`, `/review-pr`, `/build-graph`) and hooks alongside the MCP server. The MCP server does the graph querying; the skills give Claude structured instructions for using it.

**Install (requires Python 3.10+):**
```
pip install code-review-graph
code-review-graph install           # auto-detects Claude Code and other platforms
code-review-graph build             # parse your codebase (run once per repo)
```

Claude Code only:
```
code-review-graph install --platform claude-code
```

Restart Claude Code after installing, then try `/review-delta` on a repo with uncommitted changes.

→ [github.com/tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph)

---

### Obsidian MCP

Connects Claude Code to your Obsidian vault so Claude can search notes, read files, create and update notes, and navigate backlinks -- without leaving the terminal. There is no single official Obsidian MCP server. Two approaches exist depending on whether you want Obsidian running or not.

**Option A -- Direct filesystem access (Obsidian doesn't need to be running)**

Reads your vault as plain markdown files. Simpler setup, works offline, supports multiple vaults. Tools: read notes, write notes, search full text, list all files, get open todos.
```
claude mcp add obsidian -- npx -y obsidian-mcp /absolute/path/to/your/vault
```

Use absolute paths. Relative paths (`~/Documents/MyVault`) may not resolve correctly when Claude Code spawns the server.

→ [github.com/StevenStavrakis/obsidian-mcp](https://github.com/StevenStavrakis/obsidian-mcp)

**Option B -- REST API via Local REST API plugin (Obsidian must be running)**

More features: search, patch content at specific headings, append to existing notes, delete files. Requires installing the [Obsidian Local REST API](https://github.com/coddingtonbear/obsidian-local-rest-api) community plugin in Obsidian and copying the API key it generates.

Add to your config (Claude Code or Desktop):
```json
{
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
}
```

Requires `uv` installed (`pip install uv` or `brew install uv`). If Claude can't find `uvx`, use `which uvx` and paste the full path.

→ [github.com/MarkusPfundstein/mcp-obsidian](https://github.com/MarkusPfundstein/mcp-obsidian)

---

## Find More

- [Anthropic's MCP docs](https://code.claude.com/docs/en/mcp) -- official server list and configuration reference
- [MCP server registry](https://github.com/modelcontextprotocol/servers) -- the canonical community directory
- [mcp.run](https://mcp.run) -- hosted MCP servers, no local setup required
- `/mcp` inside any Claude Code session -- lists connected servers and available tools

# Local and global agent setup

`linux-admin` keeps one canonical skill tree under `skills/`. Project adapters should point to that tree; user-wide installs should use each agent's supported global discovery path rather than hard-coded machine-specific repository paths.

## Recommended install modes

### Project/repository use

Clone or vendor the repository and start from `AGENTS.md` or the tool-specific thin adapter. Read `skills/using-linux-admin/SKILL.md`, select one parent/specialist, then let that parent load one condition-specific chunk where applicable.

### User-wide skill use

After installing the package from the verified GitHub source, run:

```bash
linux-admin install-global
```

This copies the canonical skills to:

```text
~/.agents/skills/   # common Agent Skills location used by Codex, OpenCode and goose
~/.claude/skills/   # Claude Code user skill location
```

Existing destination skill directories are skipped by default. Use `linux-admin install-global --force` only when you intentionally want to refresh them from the installed package.

Check the installed package and canonical source paths with:

```bash
linux-admin status
```

## Agent instruction and skill locations

| Agent/tool | Project/repository instructions | User/global instructions or skills | linux-admin approach |
|---|---|---|---|
| Claude Code | `CLAUDE.md`, `.claude/CLAUDE.md`; project skills under `.claude/skills/` | `~/.claude/CLAUDE.md`, `~/.claude/skills/` | Root `CLAUDE.md` imports `AGENTS.md`; global installer also copies skills to `~/.claude/skills/`. |
| Codex | `AGENTS.md`; repository skills under `.agents/skills/` from CWD up to repo root | `$HOME/.agents/skills/`; admin `/etc/codex/skills`; config `~/.codex/config.toml` | Project uses `AGENTS.md`; global installer uses `$HOME/.agents/skills/`. |
| OpenCode | `AGENTS.md`, `opencode.json`; project skill directories can be configured | `~/.config/opencode/AGENTS.md`; skills include `~/.agents/skills/` | `opencode.json` points at `./skills`; global installer uses `~/.agents/skills/`. |
| GitHub Copilot CLI | `AGENTS.md`, `.github/copilot-instructions.md`, `.github/instructions/*.instructions.md` | `$HOME/.copilot/copilot-instructions.md`, `$HOME/.copilot/instructions/**/*.instructions.md` | Keep repository adapter thin. Global personal rules should reference the installed linux-admin workflow rather than copying 91 skills into Copilot-specific folders. |
| Cursor | `AGENTS.md`; optional `.cursor/rules/*.mdc` | User Rules in Cursor settings | Use root `AGENTS.md`; add Cursor-specific rules only for real Cursor-only behaviour. |
| Windsurf | `AGENTS.md`; optional `.windsurf/rules/*.md` | `~/.codeium/windsurf/memories/global_rules.md` | Use root `AGENTS.md`; keep global Windsurf rules as a pointer to the installed linux-admin workflow, not a duplicate skill tree. |
| Cline | `AGENTS.md`; current native project config under `.cline/` | current user config under `~/.cline/` with compatibility discovery in Documents/Cline on supported installs | Use `AGENTS.md` plus the selected canonical skill; do not fork the skill tree into Cline rules. |
| Amazon Q Developer | `.amazonq/rules/*.md` | Do not invent a global rule path unless current AWS docs verify it | Keep `.amazonq/rules/linux-admin.md` as a thin project adapter. |
| Zed Agent | root/project `AGENTS.md` and compatible instruction files | `~/.config/zed/AGENTS.md` (Windows: `%APPDATA%\Zed\AGENTS.md`) | Project uses root `AGENTS.md`; global instructions may point users to `~/.agents/skills`/package status where applicable. |
| JetBrains Junie | root `AGENTS.md` | current Junie user instructions may be maintained under `~/.junie/AGENTS.md` where supported | Root `AGENTS.md` remains canonical for the repository. |
| Aider | repo `.aider.conf.yml` with `read:` files | home `~/.aider.conf.yml` | Repo config preloads `AGENTS.md`, router and safety docs. For global use, add absolute paths reported by `linux-admin status` to the user's home Aider config; never commit one user's absolute path. |
| Sourcegraph Cody | explicit repository/file context | client/account dependent | Use repository context or `cody chat --context-file`; do not claim automatic AGENTS loading. |
| goose | project `.agents/skills/` and other goose context mechanisms | `~/.agents/skills/` for Agent Skills | Global installer uses the native-compatible `~/.agents/skills/` path. |

## Local-state rule

Never commit machine-specific agent state or history. Examples include:

```text
.agent/
.claude/state/
site/.claude/state/
CLAUDE.local.md
*.bak.*
```

Agent caches, auto-memory, command history, session databases, generated credentials, tokens, and absolute local paths belong outside version control.

## Portability rule

Do not hard-code `/home/<user>/...`, `C:\Users\<user>\...`, a global npm prefix, or an IDE installation directory in repository instructions. Resolve the installed package dynamically with `linux-admin status` and use `$HOME`/platform-standard paths in documentation.

## Discovery verification

After installation, verify rather than assume:

1. `linux-admin status` reports the expected version, source path and current top-level skill count (`91` for repository metadata `1.18.3`).
2. The target global directory contains `using-linux-admin/SKILL.md`.
3. Restart/reload the target agent if its documentation requires a rescan.
4. Ask the agent to explicitly invoke `using-linux-admin` when routing is uncertain.
5. Confirm it routes to one parent/specialist and only the required chunk rather than loading the whole tree.

For Codex, a large installed skill set may be truncated in the initial skill-description list to preserve context; the full skills remain on disk and are read when selected. Keep the router description clear and use explicit invocation when needed.

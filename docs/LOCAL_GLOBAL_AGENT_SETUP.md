# Local and global agent setup

`linux-admin` keeps one canonical skill tree under `skills/`. Project adapters point to that tree; user-wide installs use supported global discovery paths rather than hard-coded machine-specific repository paths.

## Recommended install modes

### Project/repository use

Clone or vendor the repository and start from `AGENTS.md` or the tool-specific thin adapter. Read `skills/using-linux-admin/SKILL.md`, select one parent/specialist, then let that parent load one condition-specific chunk where applicable.

### User-wide skill use

After installing the package from the verified GitHub source, run:

```bash
linux-admin install-global
```

This copies canonical skills to:

```text
~/.agents/skills/   # common Agent Skills location used by Codex, OpenCode and goose
~/.claude/skills/   # Claude Code user skill location
```

Existing destination skill directories are skipped by default. Use `linux-admin install-global --force` only for an intentional refresh. Check installed package/source paths with `linux-admin status`.

## Agent instruction and skill locations

| Agent/tool | Project/repository instructions | User/global instructions or skills | linux-admin approach |
|---|---|---|---|
| Claude Code | `CLAUDE.md`, `.claude/CLAUDE.md`; project skills under `.claude/skills/` | `~/.claude/CLAUDE.md`, `~/.claude/skills/` | Root `CLAUDE.md` imports `AGENTS.md`; installer copies user skills. |
| Codex | `AGENTS.md`; repository skills under `.agents/skills/` | `$HOME/.agents/skills/`; admin `/etc/codex/skills` | Project uses `AGENTS.md`; global installer uses `$HOME/.agents/skills/`. |
| OpenCode | `AGENTS.md`, `opencode.json` | `~/.config/opencode/AGENTS.md`; `~/.agents/skills/` supported | `opencode.json` points at `./skills`; installer uses `~/.agents/skills/`. |
| GitHub Copilot CLI | `AGENTS.md`, `.github/copilot-instructions.md`, `.github/instructions/*.instructions.md` | `$HOME/.copilot/copilot-instructions.md`, `$HOME/.copilot/instructions/**/*.instructions.md` | Keep repository adapter thin; do not copy 85 skills into Copilot-specific folders. |
| Cursor | `AGENTS.md`; optional `.cursor/rules/*.mdc` | User Rules in settings | Use root `AGENTS.md`; add Cursor-specific rules only for real Cursor-only behaviour. |
| Windsurf | `AGENTS.md`; optional `.windsurf/rules/*.md` | `~/.codeium/windsurf/memories/global_rules.md` | Keep global rules as a pointer, not a duplicate tree. |
| Cline | `AGENTS.md`; project config under `.cline/` | current user config under `~/.cline/` where supported | Use `AGENTS.md` plus selected canonical skill. |
| Amazon Q Developer | `.amazonq/rules/*.md` | verify current AWS docs before claiming a global path | Keep `.amazonq/rules/linux-admin.md` thin. |
| Zed Agent | root/project `AGENTS.md` | `~/.config/zed/AGENTS.md` (Windows `%APPDATA%\Zed\AGENTS.md`) | Root `AGENTS.md` remains canonical. |
| JetBrains Junie | root `AGENTS.md` | current supported Junie user path | Keep root `AGENTS.md`; do not duplicate rules. |
| Aider | repo `.aider.conf.yml` | home `~/.aider.conf.yml` | Resolve paths with `linux-admin status`; never commit one user's absolute path. |
| Sourcegraph Cody | explicit repository/file context | client/account dependent | Do not claim automatic AGENTS loading. |
| goose | project `.agents/skills/` | `~/.agents/skills/` | Installer uses native-compatible Agent Skills path. |

## Local-state rule

Never commit machine-specific state/history such as `.agent/`, `.claude/state/`, `site/.claude/state/`, `CLAUDE.local.md`, timestamped backups, caches, auto-memory, session databases, generated credentials or tokens.

## Portability rule

Do not hard-code `/home/<user>/...`, `C:\Users\<user>\...`, a global npm prefix, or an IDE installation directory. Resolve package paths dynamically with `linux-admin status` and use `$HOME`/platform-standard paths in docs.

## Discovery verification

1. `linux-admin status` reports the expected version, source path and current top-level skill count (`85` for repository metadata `1.18.5`).
2. The target global directory contains `using-linux-admin/SKILL.md`.
3. Restart/reload the target agent when its docs require a rescan.
4. Explicitly invoke `using-linux-admin` when routing is uncertain.
5. Confirm it routes to one parent/specialist and only the required chunk rather than loading the whole tree.

The compact parent/chunk structure now includes auth routing for local accounts, PAM, SSSD/LDAP and sudoers; SSH hardening remains a separate top-level specialist.

# AI tool support

`linux-admin` keeps one canonical 103-skill tree under `skills/` and uses thin adapters or native Agent Skills discovery instead of maintaining vendor-specific copies.

For exact project/user paths and global installation, read [`LOCAL_GLOBAL_AGENT_SETUP.md`](LOCAL_GLOBAL_AGENT_SETUP.md).

## Maintained compatibility matrix

| Tool | Project/repository entry | User/global path or mode | linux-admin policy |
|---|---|---|---|
| Claude Code | `CLAUDE.md`, `.claude-plugin/`, `skills/` | `~/.claude/CLAUDE.md`, `~/.claude/skills/` | `CLAUDE.md` imports `AGENTS.md`; `install-global` populates native user skills. |
| Codex | `AGENTS.md`; native repo Agent Skills under `.agents/skills/` | `$HOME/.agents/skills/`, admin `/etc/codex/skills` | Repo instructions stay in `AGENTS.md`; user-wide skills use the standard Agent Skills path. |
| OpenCode | `AGENTS.md`, `opencode.json`, `skills/` | `~/.config/opencode/AGENTS.md`; `~/.agents/skills/` supported | Project config points at canonical `./skills`; global install uses `~/.agents/skills/`. |
| GitHub Copilot | `AGENTS.md`, `.github/copilot-instructions.md` | `$HOME/.copilot/copilot-instructions.md` and modular user instructions for Copilot CLI | Keep repo adapter thin; do not copy the skill tree into `.github/`. |
| Cursor | `AGENTS.md`; optional `.cursor/rules/*.mdc` | User Rules in Cursor settings | Use root `AGENTS.md`; add Cursor-only rules only when needed. |
| Windsurf | `AGENTS.md`; optional `.windsurf/rules/*.md` | `~/.codeium/windsurf/memories/global_rules.md` | Use `AGENTS.md`; global rules should point to the installed workflow, not fork it. |
| Cline | `AGENTS.md`; current native project config under `.cline/` | current user configuration under `~/.cline/` with compatibility discovery where supported | Read selected canonical skills by reference; no duplicated tree. |
| Amazon Q Developer | `.amazonq/rules/linux-admin.md` | client/version dependent unless AWS docs verify a user path | Keep the project adapter concise and avoid invented global paths. |
| Zed Agent | root `AGENTS.md` and compatible instruction files | `~/.config/zed/AGENTS.md` (Windows `%APPDATA%\Zed\AGENTS.md`) | Root `AGENTS.md` remains canonical. |
| JetBrains Junie | root `AGENTS.md` | Junie user instruction path where supported by current JetBrains docs | Keep root `AGENTS.md`; do not maintain a duplicate Junie ruleset. |
| Aider | `.aider.conf.yml` with `read:` context | home `~/.aider.conf.yml` | Repo config preloads AGENTS/router/safety docs; global config should use paths resolved from `linux-admin status`. |
| Sourcegraph Cody | explicit repository/file context | client/account dependent | Use repository context or `cody chat --context-file`; do not claim automatic AGENTS loading. |
| goose | Agent Skills / repository context | `~/.agents/skills/` | Use native-compatible Agent Skills discovery; no fake marketplace requirement. |
| Bedrock/Kimi/DeepSeek/GLM/local model providers | client dependent | client dependent | A model provider is not itself a repository instruction loader. Verify the actual agent client. |

## Canonical rules

1. Keep procedures in `skills/<name>/SKILL.md` and focused chunks.
2. Use `skills/using-linux-admin/SKILL.md` as the routing map.
3. Use root `AGENTS.md` where the target supports it or read it explicitly.
4. Keep `CLAUDE.md` and vendor adapters thin.
5. Never duplicate all 103 skills into `.cursor/`, `.windsurf/`, `.cline/`, `.junie/`, `.github/`, or similar directories merely to advertise support.
6. Never commit machine-local state, history, caches, personal memory, credentials, or one maintainer's absolute paths.
7. Do not claim native marketplace/plugin installation unless verified for this repository.

## Global skill distribution

The npm package must contain the actual `skills/` tree. After installation:

```bash
linux-admin status
linux-admin install-global
```

`install-global` copies canonical skills into:

```text
~/.agents/skills/
~/.claude/skills/
```

The first path is the common user Agent Skills location used by current Codex/OpenCode/goose support; the second is Claude Code's native user skill location. Existing skill directories are skipped unless the user explicitly requests `--force`.

## Tool notes

### Claude Code

Claude Code natively reads `CLAUDE.md`, so this repository uses a tiny `CLAUDE.md` that imports `AGENTS.md` rather than duplicating the full instruction set. Machine-local `.claude/state/`, auto-memory, and `CLAUDE.local.md` stay out of Git.

### Codex

Codex uses `AGENTS.md` for project instructions and supports Agent Skills at repository, user, admin and system scopes. Current user skills belong under `$HOME/.agents/skills`; Codex also supports symlinked skill directories. Large skill collections may have their initial description list shortened/omitted to preserve context, so `using-linux-admin` should be invoked explicitly when routing is uncertain.

### OpenCode

`opencode.json` points OpenCode to `./skills`; OpenCode also supports user Agent Skills locations. No `.opencode/skills` copy is required for this repository.

### GitHub Copilot

Repository-wide guidance remains `.github/copilot-instructions.md` plus `AGENTS.md`. Copilot CLI also supports user instructions under `$HOME/.copilot/`. Avoid conflicting copies because applicable instruction files are combined.

### Zed

Zed uses root `AGENTS.md` for project instructions and `~/.config/zed/AGENTS.md` for personal instructions. External agents launched by Zed can still use their own native instruction files; do not assume Zed's loader controls them.

### Aider

The repo `.aider.conf.yml` keeps AGENTS/router/safety documents read-only. A global Aider config should use the actual package paths reported by `linux-admin status`, never a committed `/home/<name>/...` path.

### Sourcegraph Cody

Cody CLI currently supports `--context-file` and `--context-repo`; this repository continues to use explicit context and does not claim native AGENTS/Skill auto-loading.

### goose

goose supports Agent Skills from `.agents/skills` and `$HOME/.agents/skills`, so the canonical linux-admin skill format can be distributed without a goose-specific copy.

## Portable workflow

```text
Load the native project/user instruction entry for the current agent.
Read AGENTS.md when supported or explicitly available.
Read skills/using-linux-admin/SKILL.md.
Select the smallest relevant specialist.
Read only required skill/chunk content.
Collect bounded evidence.
Redact secrets.
Plan rollback/recovery before consequential changes.
Validate the result.
```

Compatibility never bypasses `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`.

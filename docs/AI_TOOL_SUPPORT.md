# AI tool support

`linux-admin` keeps one canonical 99-skill tree under `skills/` and uses thin adapters or native Agent Skills discovery instead of maintaining vendor-specific copies.

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

1. Keep procedures in `skills/<parent>/SKILL.md` and focused `skills/<parent>/chunks/*.md` where a domain has multiple conditions.
2. Use `skills/using-linux-admin/SKILL.md` only for top-level parent/specialist routing.
3. Parent skills own condition-to-chunk routing. Default to one parent + one chunk; load a second only when evidence proves a cross-layer issue.
4. Use root `AGENTS.md` where the target supports it or read it explicitly.
5. Keep `CLAUDE.md` and vendor adapters thin.
6. Never duplicate all 99 skills into `.cursor/`, `.windsurf/`, `.cline/`, `.junie/`, `.github/`, or similar directories merely to advertise support.
7. Never commit machine-local state, history, caches, personal memory, credentials, or one maintainer's absolute paths.
8. Do not claim native marketplace/plugin installation unless verified for this repository.

## Global skill distribution

The package must contain the actual `skills/` tree. After installation:

```bash
linux-admin status
linux-admin install-global
```

`install-global` copies canonical skills into:

```text
~/.agents/skills/
~/.claude/skills/
```

Existing skill directories are skipped unless the user explicitly requests `--force`.

## Parent/chunk execution model

All supported agents should use the same bounded flow:

```text
Load native project/user instructions.
Read AGENTS.md when supported or explicitly available.
Read skills/using-linux-admin/SKILL.md.
Select one parent/specialist.
Run the parent baseline evidence check.
Load one matching chunk if the parent identifies a known condition.
Load a second chunk/support skill only when evidence proves a cross-layer issue.
Plan rollback/recovery before consequential changes.
Validate the result.
```

The network parent is the first fully converted example: TCP, UDP, tcpdump/packet-capture, and VLAN/bonding procedures now live under `skills/network/chunks/` rather than as four competing top-level skills.

## Tool notes

### Claude Code

Claude Code reads `CLAUDE.md`, so this repository uses a small adapter that imports `AGENTS.md` rather than duplicating the full instruction set. Machine-local `.claude/state/`, auto-memory, and `CLAUDE.local.md` stay out of Git.

### Codex

Codex uses `AGENTS.md` for project instructions and supports Agent Skills at repository, user, admin and system scopes. Current user skills belong under `$HOME/.agents/skills`; large skill collections benefit from the compact parent/chunk model because only the chosen parent and required chunk need detailed context.

### OpenCode

`opencode.json` points OpenCode to `./skills`; OpenCode also supports user Agent Skills locations. No `.opencode/skills` copy is required.

### GitHub Copilot

Repository-wide guidance remains `.github/copilot-instructions.md` plus `AGENTS.md`. Avoid conflicting copies because applicable instruction files are combined.

### Zed

Zed uses root `AGENTS.md` for project instructions and `~/.config/zed/AGENTS.md` for personal instructions. External agents launched by Zed can still use their own native instruction files.

### Aider

The repo `.aider.conf.yml` keeps AGENTS/router/safety documents read-only. A global Aider config should use actual package paths reported by `linux-admin status`, never a committed `/home/<name>/...` path.

### Sourcegraph Cody

Cody stays on explicit repository/file context; this repository does not claim native AGENTS/Skill auto-loading unless verified.

### goose

goose can consume Agent Skills from `.agents/skills`/`$HOME/.agents/skills`, so the canonical linux-admin skill format can be distributed without a goose-specific copy.

Compatibility never bypasses `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`.

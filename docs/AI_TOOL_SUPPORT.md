# AI tool support

`linux-admin` keeps one canonical 82-skill tree under `skills/` and uses thin adapters or native Agent Skills discovery instead of vendor-specific copies.

For exact project/user paths and global installation, read [`LOCAL_GLOBAL_AGENT_SETUP.md`](LOCAL_GLOBAL_AGENT_SETUP.md).

## Maintained compatibility matrix

| Tool | Project/repository entry | User/global path or mode | linux-admin policy |
|---|---|---|---|
| Claude Code | `CLAUDE.md`, `.claude-plugin/`, `skills/` | `~/.claude/CLAUDE.md`, `~/.claude/skills/` | `CLAUDE.md` imports `AGENTS.md`; `install-global` populates native user skills. |
| Codex | `AGENTS.md`; repo Agent Skills under `.agents/skills/` | `$HOME/.agents/skills/`, admin `/etc/codex/skills` | Repo instructions stay in `AGENTS.md`; user-wide skills use the standard Agent Skills path. |
| OpenCode | `AGENTS.md`, `opencode.json`, `skills/` | `~/.config/opencode/AGENTS.md`; `~/.agents/skills/` supported | Project config points at canonical `./skills`; global install uses `~/.agents/skills/`. |
| GitHub Copilot | `AGENTS.md`, `.github/copilot-instructions.md` | `$HOME/.copilot/copilot-instructions.md` and modular user instructions | Keep the repo adapter thin; do not copy the skill tree into `.github/`. |
| Cursor | `AGENTS.md`; optional `.cursor/rules/*.mdc` | User Rules in Cursor settings | Use root `AGENTS.md`; add Cursor-only rules only when needed. |
| Windsurf | `AGENTS.md`; optional `.windsurf/rules/*.md` | `~/.codeium/windsurf/memories/global_rules.md` | Use `AGENTS.md`; global rules should point to the installed workflow, not fork it. |
| Cline | `AGENTS.md`; project config under `.cline/` | current user configuration under `~/.cline/` where supported | Read selected canonical skills by reference; no duplicated tree. |
| Amazon Q Developer | `.amazonq/rules/linux-admin.md` | client/version dependent unless AWS docs verify a user path | Keep the project adapter concise and avoid invented global paths. |
| Zed Agent | root `AGENTS.md` and compatible instruction files | `~/.config/zed/AGENTS.md` (Windows `%APPDATA%\Zed\AGENTS.md`) | Root `AGENTS.md` remains canonical. |
| JetBrains Junie | root `AGENTS.md` | current Junie user instruction path where supported | Keep root `AGENTS.md`; do not maintain a duplicate Junie ruleset. |
| Aider | `.aider.conf.yml` with `read:` context | home `~/.aider.conf.yml` | Repo config preloads AGENTS/router/safety docs; global config should use paths resolved from `linux-admin status`. |
| Sourcegraph Cody | explicit repository/file context | client/account dependent | Use repository context; do not claim automatic AGENTS loading. |
| goose | Agent Skills / repository context | `~/.agents/skills/` | Use native-compatible Agent Skills discovery; no vendor-specific copy. |

## Canonical rules

1. Keep procedures in `skills/<parent>/SKILL.md` and focused `skills/<parent>/chunks/*.md` where a domain has multiple conditions.
2. Use `skills/using-linux-admin/SKILL.md` only for top-level parent/specialist routing.
3. Parent skills own condition-to-chunk routing. Default to one parent + one chunk; load a second only when evidence proves a cross-layer issue.
4. Use root `AGENTS.md` where supported or read it explicitly.
5. Keep `CLAUDE.md` and vendor adapters thin.
6. Never duplicate all 82 skills into vendor-specific folders merely to advertise support.
7. Never commit machine-local state, history, caches, personal memory, credentials, or one maintainer's absolute paths.
8. Do not claim native marketplace/plugin installation unless verified for this repository.

## Global skill distribution

The package must contain the actual `skills/` tree. After installation:

```bash
linux-admin status
linux-admin install-global
```

`install-global` copies canonical skills into `~/.agents/skills/` and `~/.claude/skills/`. Existing skill directories are skipped unless the user explicitly requests `--force`.

## Parent/chunk execution model

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

Converted parent/chunk domains now include network, time, storage baseline branches, performance, permissions, auth, logging and post-containment incident RCA. `incident-response-expert` handles active response and loads its RCA chunk only after the condition/phase is established; `incident-report-creator-expert` remains separate because formal document/spreadsheet/PDF/slide generation has a different tool/output surface.

Compatibility never bypasses `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`.

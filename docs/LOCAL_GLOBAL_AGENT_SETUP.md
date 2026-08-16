# Local and global agent setup

`linux-admin` keeps one canonical skill tree under `skills/`. Project adapters point to that tree; user-wide installs use supported global discovery paths rather than hard-coded machine-specific repository paths.

## Recommended install modes

### Project/repository use

Clone or vendor the repository and start from `AGENTS.md` or the tool-specific thin adapter. Read `skills/using-linux-admin/SKILL.md`, select one parent/specialist, then let that parent load one condition-specific chunk where applicable.

### User-wide skill use

After installing from the verified GitHub source, run:

```bash
linux-admin install-global
```

This copies canonical skills to:

```text
~/.agents/skills/
~/.claude/skills/
```

Existing destination skill directories are skipped by default. Use `--force` only for an intentional refresh. Check installed package/source paths with `linux-admin status`.

## Portability and discovery rules

- Keep root/project `AGENTS.md` as the shared instruction entry where supported.
- Keep `CLAUDE.md`, Copilot/Amazon Q rules, OpenCode and Aider adapters thin.
- Never hard-code `/home/<user>/...`, `C:\Users\<user>\...`, npm prefixes or IDE installation paths.
- Never commit `.agent/`, `.claude/state/`, `site/.claude/state/`, `CLAUDE.local.md`, command history, caches, auto-memory, credentials or generated tokens.
- Do not claim a global/native path for an agent unless its current official docs support it.

## Discovery verification

1. `linux-admin status` reports repository metadata `1.18.8` and current top-level skill count `80`.
2. The target global directory contains `using-linux-admin/SKILL.md`.
3. Restart/reload the target agent when its docs require a rescan.
4. Explicitly invoke `using-linux-admin` when routing is uncertain.
5. Confirm routing selects one parent/specialist and only the required chunk.

The compact tree now includes automation routing for Bash/POSIX scripting and operational runbooks. Ansible remains distinct because its inventory/module/interpreter/rollout behaviour is product-specific. Auth, logging, network, time, performance, permissions, storage baseline branches and incident RCA use the same parent/chunk model where already consolidated.

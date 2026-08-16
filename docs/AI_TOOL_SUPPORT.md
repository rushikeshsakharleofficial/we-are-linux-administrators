# AI tool support

`linux-admin` keeps one canonical 73-skill tree under `skills/` and uses thin adapters or native Agent Skills discovery instead of vendor-specific copies.

For exact project/user paths and global installation, read [`LOCAL_GLOBAL_AGENT_SETUP.md`](LOCAL_GLOBAL_AGENT_SETUP.md).

## Canonical rules

1. Keep procedures in `skills/<parent>/SKILL.md` and focused `skills/<parent>/chunks/*.md` where a domain has multiple conditions.
2. Use `skills/using-linux-admin/SKILL.md` only for top-level parent/specialist routing.
3. Parent skills own condition-to-chunk routing. Default to one parent + one chunk; load a second only when evidence proves a cross-layer issue.
4. Use root `AGENTS.md` where supported or read it explicitly.
5. Keep `CLAUDE.md` and vendor adapters thin.
6. Never duplicate all 73 skills into vendor-specific folders merely to advertise support.
7. Never commit machine-local state, history, caches, personal memory, credentials or maintainer-specific absolute paths.

## Global skill distribution

After installing the verified GitHub source:

```bash
linux-admin status
linux-admin install-global
```

`install-global` copies canonical skills into `~/.agents/skills/` and `~/.claude/skills/`, skipping existing skill directories unless `--force` is explicit.

## Parent/chunk execution model

```text
Load native project/user instructions.
Read AGENTS.md when supported.
Read skills/using-linux-admin/SKILL.md.
Select one parent/specialist.
Run bounded parent evidence checks.
Load one matching chunk when the condition is proven.
Load a second only for a proven cross-layer issue.
Plan rollback before consequential changes.
Validate the result.
```

Converted parent/chunk domains include network, time, storage mounts/filesystem/SMART/quota/LVM/RAID, performance, permissions, auth, logging, automation Bash/runbook work, package lifecycle/patch rollout, post-containment incident RCA, and security host-audit/auditd/Fail2Ban work. Distinct high-risk/product-specific specialists remain separate when that improves routing accuracy.

## Maintained compatibility

- Claude Code: `CLAUDE.md`, `.claude-plugin/`, `skills/`; user skills under `~/.claude/skills/`.
- Codex/OpenCode/goose: project instructions through `AGENTS.md` where supported; common user Agent Skills under `~/.agents/skills/` where officially supported.
- GitHub Copilot, Cursor, Windsurf, Cline, Amazon Q, Zed, Junie and Aider: keep adapters/rules thin and point at canonical repository guidance rather than duplicating the tree.
- Sourcegraph Cody and model providers remain explicit/client-dependent unless native loading is verified.

Compatibility never bypasses `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`.
# AGENTS.md — linux-admin portable agent instructions

Primary repository instruction entry point for maintained agent-based tools that support `AGENTS.md` or can read it explicitly.

## Project context

- Repository: `rushikeshsakharleofficial/we-are-linux-administrators`
- Branch policy: use `main` unless the user explicitly asks for a branch or pull request.
- Package/plugin: `linux-admin`
- Current repository metadata version: `1.18.10`
- Current top-level skill count: `77`
- Canonical router: `skills/using-linux-admin/SKILL.md`
- Parent routing rule: one parent/specialist -> bounded evidence -> one matching chunk by default.
- Local/global path guide: `docs/LOCAL_GLOBAL_AGENT_SETUP.md`
- Compatibility guide: `docs/AI_TOOL_SUPPORT.md`

## Read first

Before repository changes, read the relevant README/release/package/plugin metadata, Universal Skill Execution Contract, security refresh policy, compatibility/setup docs, expert index, canonical router, then only the selected skill and required chunks.

## Canonical routing rule

- Keep Linux procedures under `skills/`.
- Use `skills/using-linux-admin/SKILL.md` when the domain is unclear.
- Select one parent/specialist first; let the parent classify bounded evidence and load one condition-specific chunk.
- Add a second chunk/support skill only when evidence proves a cross-layer issue.
- `automation` owns Bash/POSIX scripting and operational-runbook chunks; Ansible, cron and systemd remain distinct when their own semantics are involved.
- `auth` owns local-account, PAM, SSSD/LDAP and sudoers chunks; SSH hardening remains distinct.
- `logs` owns rsyslog and logrotate chunks; product monitoring stays distinct.
- `security-expert` owns broad host-audit, auditd and Fail2Ban chunks; the retired `os-security-expert` broad audit is consolidated into `security-expert/chunks/security-audit.md`. SSH/auth/MAC/firewall/kernel/sysctl/patch/vulnerability specialists remain distinct when their own control semantics are proven.
- `incident-response-expert` owns active response and post-containment RCA; formal artifact generation remains separate.
- Do not duplicate the full skill tree into vendor-specific directories.

## Portable adapters

Current repository adapters/configs: `CLAUDE.md`, `.github/copilot-instructions.md`, `.amazonq/rules/linux-admin.md`, `opencode.json`, and `.aider.conf.yml`. Never hard-code a maintainer home directory.

## Local-state hygiene

Do not commit machine-local agent state, command history, caches, auto-memory, session databases, personal overrides, tokens or generated credentials.

## Safety contract

All skills and operational guidance follow `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`: verify facts, define rollback, check architecture fit, protect recovery paths, use guarded recovery for risky remote/network/storage/auth changes, and keep evidence/output bounded.

## Source rules

Prefer official/vendor documentation, release notes, package metadata, source repositories and security advisories. Community posts are signals, not authority.

## Metadata consistency

When a real user-facing change affects version or skill count, align README.md, RELEASE.md, package.json, `.claude-plugin/` metadata, this file, `docs/EXPERT_MODULE_INDEX.md`, `docs/AI_TOOL_SUPPORT.md`, `docs/LOCAL_GLOBAL_AGENT_SETUP.md`, `site/assets/data/latest-update.json`, and `site/assets/js/main.js`.

## Package/global-install rule

The package must ship canonical `skills/`, relevant `docs/`, `AGENTS.md`, `CLAUDE.md`, `opencode.json`, and `.aider.conf.yml`. `linux-admin install-global` must not silently overwrite existing global skills.

## Validation

Run repository validation hooks/tests and verify package output after tree/package changes. After a push, fetch important changed files and report CI/Pages status accurately.
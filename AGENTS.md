# AGENTS.md — linux-admin portable agent instructions

Primary repository instruction entry point for maintained agent-based tools that support `AGENTS.md` or can read it explicitly.

## Project context

- Repository: `rushikeshsakharleofficial/we-are-linux-administrators`
- Branch policy: use `main` unless the user explicitly asks for a branch or pull request.
- Package/plugin: `linux-admin`
- Current repository metadata version: `1.18.6`
- Current top-level skill count: `83`
- Canonical router: `skills/using-linux-admin/SKILL.md`
- Parent routing rule: one parent/specialist -> bounded evidence -> one matching chunk by default.
- Local/global path guide: `docs/LOCAL_GLOBAL_AGENT_SETUP.md`
- Compatibility guide: `docs/AI_TOOL_SUPPORT.md`
- GitHub Pages: `https://rushikeshsakharleofficial.github.io/we-are-linux-administrators/`

## Read first

Before repository changes, read the relevant subset of README/release/package/plugin metadata, the Universal Skill Execution Contract, security refresh policy, compatibility/setup docs, expert index, canonical router, then only the selected skill and required chunks.

## Canonical routing rule

- Keep Linux procedures under `skills/`.
- Read `skills/using-linux-admin/SKILL.md` when the domain is unclear.
- Select one parent/specialist first; let that parent classify bounded evidence and load one condition-specific chunk where available.
- Add a second chunk/support skill only when evidence proves a cross-layer issue.
- `auth` owns local-account, PAM, SSSD/LDAP and sudoers chunks; SSH hardening remains distinct because remote-access changes have separate lockout risk.
- `logs` owns rsyslog and logrotate chunks; journald remains in the parent baseline while product-specific monitoring stays distinct.
- `incident-response-expert` handles active incidents; `incident-report-creator-expert` creates verified table-first `.docx`, `.xlsx`, `.pdf`, and `.pptx` reports.
- Do not duplicate the full skill tree into vendor-specific directories.

## Portable adapters

Current repository adapters/configs: `CLAUDE.md`, `.github/copilot-instructions.md`, `.amazonq/rules/linux-admin.md`, `opencode.json`, and `.aider.conf.yml`. Use vendor-specific adapters only for genuinely different discovery formats. Never hard-code a maintainer home directory.

## Local-state hygiene

Do not commit machine-local agent state, command history, caches, auto-memory, session databases, personal overrides, tokens, or generated credentials. `.agent/`, `.claude/state/`, `site/.claude/state/`, `CLAUDE.local.md`, and timestamped backup copies are local-only.

## Safety contract

All skills and operational guidance follow `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`: verify facts, define rollback, check architecture fit, protect backup/recovery paths, use guarded recovery for risky remote/network/storage/auth changes, and keep evidence/output bounded.

## Source rules

Prefer official/vendor documentation, release notes, package metadata, source repositories and security advisories. Community posts are signals, not authority. For OS lifecycle/security guidance follow `docs/SECURITY_PATCH_REFRESH_POLICY.md`; for agent support/path claims verify current official product documentation.

## Metadata consistency

When a real user-facing change affects version or skill count, align README.md, RELEASE.md, package.json, `.claude-plugin/` metadata, this file, `docs/EXPERT_MODULE_INDEX.md`, `docs/AI_TOOL_SUPPORT.md`, `docs/LOCAL_GLOBAL_AGENT_SETUP.md`, `site/assets/data/latest-update.json`, and `site/assets/js/main.js`. Do not bump versions or counts for no-op maintenance.

## Package/global-install rule

The package must ship canonical `skills/`, relevant `docs/`, `AGENTS.md`, `CLAUDE.md`, `opencode.json`, and `.aider.conf.yml`. `linux-admin install-global` installs supported user-level skills without project-specific absolute paths and never silently overwrites existing global skills.

## Validation

Run repository validation hooks/tests and verify package output after tree/package changes. After a push, fetch important changed files and report CI/Pages status accurately; queued or missing checks are not success.

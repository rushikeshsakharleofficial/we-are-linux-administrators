# AGENTS.md — linux-admin portable agent instructions

Primary repository instruction entry point for maintained agent-based tools that support `AGENTS.md` or can read it explicitly.

## Project context

- Repository: `rushikeshsakharleofficial/we-are-linux-administrators`
- Branch policy: use `main` unless the user explicitly asks for a branch or pull request.
- Package/plugin: `linux-admin`
- Current repository metadata version: `1.18.4`
- Current top-level skill count: `89`
- Canonical router: `skills/using-linux-admin/SKILL.md`
- Parent routing rule: one parent/specialist -> bounded evidence -> one matching chunk by default.
- Local/global path guide: `docs/LOCAL_GLOBAL_AGENT_SETUP.md`
- Compatibility guide: `docs/AI_TOOL_SUPPORT.md`
- GitHub Pages: `https://rushikeshsakharleofficial.github.io/we-are-linux-administrators/`

## Read first

Before repository changes, read the relevant subset of:

1. `README.md`
2. `RELEASE.md`
3. `package.json`
4. `.claude-plugin/plugin.json`
5. `.claude-plugin/marketplace.json`
6. `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`
7. `docs/SECURITY_PATCH_REFRESH_POLICY.md`
8. `docs/AI_TOOL_SUPPORT.md`
9. `docs/LOCAL_GLOBAL_AGENT_SETUP.md`
10. `docs/CODEX_USAGE.md`
11. `docs/EXPERT_MODULE_INDEX.md`
12. `skills/using-linux-admin/SKILL.md`
13. Only the selected `skills/<name>/SKILL.md` and required chunks.

## Canonical routing rule

- Keep Linux procedures under `skills/`.
- Read `skills/using-linux-admin/SKILL.md` when the domain is unclear.
- Select one parent/specialist first; let that parent classify bounded evidence and load one condition-specific chunk where available.
- Add a second chunk/support skill only when evidence proves a cross-layer issue.
- `incident-response-expert` handles active incident response; `incident-report-creator-expert` creates verified table-first `.docx`, `.xlsx`, `.pdf`, and `.pptx` incident reports.
- Do not duplicate the full skill tree into vendor-specific directories.

## Portable adapters

Current repository adapters/configs:

```text
CLAUDE.md
.github/copilot-instructions.md
.amazonq/rules/linux-admin.md
opencode.json
.aider.conf.yml
```

Use vendor-specific adapters only for genuinely different instruction/discovery formats. For current local/user-global paths, follow `docs/LOCAL_GLOBAL_AGENT_SETUP.md`; never hard-code one maintainer's home directory.

## Local-state hygiene

Do not commit machine-local agent state, command history, caches, auto-memory, session databases, personal overrides, tokens, or generated credentials. `.agent/`, `.claude/state/`, `site/.claude/state/`, `CLAUDE.local.md`, and timestamped backup copies are local-only.

## Safety contract

All skills and operational guidance follow `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`:

1. Verify security/technical facts before apply.
2. Define rollback.
3. Correct stale instructions with evidence.
4. Check architecture fit.
5. Report architecture implications when relevant.
6. Plan backup/disaster recovery.
7. Use guarded recovery for risky remote/network/storage/auth changes.
8. Keep evidence and output bounded.

## Source rules

- Prefer official/vendor documentation, release notes, package metadata, source repositories and security advisories.
- Community posts are signals, not authority.
- For OS-specific patch/kernel/desktop/driver/vulnerability/lifecycle guidance, follow `docs/SECURITY_PATCH_REFRESH_POLICY.md`.
- For agent support/path claims, verify current official product documentation before changing repository guidance.

## Metadata consistency

When a real user-facing change affects version or skill count, align where applicable:

```text
README.md
RELEASE.md
package.json
.claude-plugin/plugin.json
.claude-plugin/marketplace.json
docs/EXPERT_MODULE_INDEX.md
docs/AI_TOOL_SUPPORT.md
docs/LOCAL_GLOBAL_AGENT_SETUP.md
site/assets/data/latest-update.json
site/assets/js/main.js
```

Do not bump versions or counts for no-op maintenance.

## Package/global-install rule

The npm package must actually ship the canonical `skills/`, relevant `docs/`, `AGENTS.md`, `CLAUDE.md`, `opencode.json`, and `.aider.conf.yml`. `linux-admin install-global` installs user-level skills to supported common/native paths without embedding project-specific absolute paths. Never overwrite an existing global skill silently; require explicit refresh/force behaviour.

## Validation

Run the repository validation hooks/tests where relevant and verify packaged output after packaging changes. After a push, fetch important changed files back from GitHub and report CI/Pages status accurately; never call missing/queued checks successful.

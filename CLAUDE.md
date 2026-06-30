# CLAUDE.md — linux-admin Claude Code instructions

This is the Claude Code entry point for the `linux-admin` repository.

## Project context

- Repository: `rushikeshsakharleofficial/we-are-linux-administrators`
- Branch policy: use `main` unless the user explicitly asks for a branch or pull request.
- Package/plugin name: `linux-admin`
- Current documented release family: `1.17.x`
- Current documented skill count: `101`
- GitHub Pages site: `https://rushikeshsakharleofficial.github.io/we-are-linux-administrators/`

## First files to read

Before changing skills, docs, package metadata, plugin metadata, or site release text, read the relevant files first:

1. `README.md`
2. `RELEASE.md`
3. `package.json`
4. `.claude-plugin/plugin.json`
5. `.claude-plugin/marketplace.json`
6. `AGENTS.md`
7. `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`
8. `docs/SECURITY_PATCH_REFRESH_POLICY.md`
9. `docs/CODEX_USAGE.md`
10. `docs/EXPERT_MODULE_INDEX.md`
11. Relevant `skills/*/SKILL.md` and `skills/*/chunks/*.md`

## Operating rules

- Keep changes small, safe, reversible, and evidence-based.
- Prefer minimal diffs over broad rewrites.
- Do not change unrelated files.
- Do not hallucinate versions, skill counts, install status, package names, file paths, or source claims.
- Verify current files before writing.
- Preserve the current skill count unless actually adding/removing skills and verifying the count.
- If user-facing metadata changes, keep `README.md`, `RELEASE.md`, `package.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, and `site/assets/data/latest-update.json` aligned where applicable.
- Do not claim the Codex plugin is publicly installable from a marketplace unless verified. Use wording such as "when published/shared" for Codex plugin-directory workflows.
- Do not rely on local-only `.agent/` state files for repository instructions; this repository must remain portable for cloned, vendored, Claude Code, Codex, OpenCode, and GitHub-connected workflows.

## Safety contract

All skill and operational guidance must follow `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`:

1. Security facts before apply.
2. Rollback plan.
3. Correct stale/wrong instructions only with evidence.
4. Architecture-fit check.
5. Architecture audit in final/reporting text when relevant.
6. Backup/disaster plan for tools and workflows.
7. Guarded rollback/recovery for risky remote/network changes.
8. Token-optimized bounded output.

## Source rules

- Prefer official/vendor docs, release notes, package metadata, source repositories, and security advisories.
- Community sources are signals only; do not update guidance from a single forum, Reddit, Quora, or issue comment without stronger evidence.
- For OS-specific patch, kernel, desktop, driver, or vulnerability guidance, read `docs/SECURITY_PATCH_REFRESH_POLICY.md` and check current vendor sources first.

## Validation

Use available hooks/tests when relevant and report what was run. If validation cannot be run, state why and summarize what was manually checked.

## Output expectations

For repository changes, report:

- changed files
- evidence or source basis
- validation performed
- rollback notes
- whether metadata/version/skill-count alignment was affected

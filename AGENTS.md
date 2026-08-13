# AGENTS.md — linux-admin agent instructions

This is the primary portable entry point for maintained agent-based coding tools working in this repository, including Codex, OpenCode, GitHub Copilot, Cursor, Windsurf, Cline, Amazon Q Developer, Zed Agent, JetBrains Junie, Aider, Sourcegraph Cody, and goose.

## Project context

- Repository: `rushikeshsakharleofficial/we-are-linux-administrators`
- Branch policy: use `main` unless the user explicitly asks for a branch or pull request.
- Package/plugin name: `linux-admin`
- Current documented release family: `1.17.x`
- Current documented skill count: `102`
- Master skill router: `skills/using-linux-admin/SKILL.md`
- GitHub Pages site: `https://rushikeshsakharleofficial.github.io/we-are-linux-administrators/`
- AI tool compatibility: `docs/AI_TOOL_SUPPORT.md`
- OpenCode adapter: `opencode.json`
- Aider adapter: `.aider.conf.yml`
- GitHub Copilot adapter: `.github/copilot-instructions.md`
- Amazon Q adapter: `.amazonq/rules/linux-admin.md`

## First files to read

Before changing skills, docs, package metadata, plugin metadata, agent adapters, or site release text, read the relevant files first:

1. `README.md`
2. `RELEASE.md`
3. `package.json`
4. `.claude-plugin/plugin.json`
5. `.claude-plugin/marketplace.json`
6. `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`
7. `docs/SECURITY_PATCH_REFRESH_POLICY.md`
8. `docs/AI_TOOL_SUPPORT.md`
9. `docs/CODEX_USAGE.md`
10. `docs/EXPERT_MODULE_INDEX.md`
11. `skills/using-linux-admin/SKILL.md`
12. Relevant `skills/*/SKILL.md` and `skills/*/chunks/*.md`

## Portable agent rule

- Keep `AGENTS.md` as the shared instruction source whenever the AI tool supports it.
- Keep Linux procedures canonical under `skills/`; do not duplicate all skills into vendor-specific folders.
- Use thin adapters only where the tool benefits from its own rule/config format.
- Current native/thin adapters include `.github/copilot-instructions.md`, `.amazonq/rules/linux-admin.md`, `opencode.json`, and `.aider.conf.yml`.
- Cursor, Windsurf, Zed, and current JetBrains Junie can consume root project instructions without requiring a second full copy of the Linux-admin rules.
- For Cline, read `AGENTS.md` and then load only the relevant canonical `skills/<name>/SKILL.md` for the task.
- For Sourcegraph Cody and goose, use explicit repository/file context until a verified repository-native package is added.
- Do not claim native plugin, marketplace, or skill installation unless that tool officially supports the repository's packaging model and availability is verified.
- Treat model providers such as Bedrock-hosted models, Kimi, DeepSeek, GLM, and local models separately from the agent client that actually reads repository instructions.
- For tool compatibility decisions, read `docs/AI_TOOL_SUPPORT.md` and verify current official docs before changing claims.

## Operating rules

- Keep changes small, safe, reversible, and evidence-based.
- Prefer minimal diffs over broad rewrites.
- Do not change unrelated files.
- Do not hallucinate versions, skill counts, install status, package names, file paths, publication status, tool support, or source claims.
- Verify current files before writing.
- Preserve the current skill count unless actually adding/removing skills and verifying the count.
- If user-facing metadata changes, keep `README.md`, `RELEASE.md`, `package.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, and `site/assets/data/latest-update.json` aligned where applicable.
- Do not claim the Codex plugin is publicly installable from the Codex Plugin directory unless verified. Use wording such as "when published/shared" for Codex plugin-directory workflows.

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

## Cross-tool execution pattern

Use this pattern regardless of the AI client:

1. Read the applicable project instruction file or adapter.
2. Read `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`.
3. Read `skills/using-linux-admin/SKILL.md` and choose the smallest relevant primary skill.
4. Read only that skill and the chunk files needed for the task.
5. Collect bounded, read-only evidence before proposing changes.
6. Redact secrets before sending evidence to external model providers or tools.
7. Plan backup/rollback before risky SSH, firewall, routing, storage, kernel, auth, or production changes.
8. Validate the result and report architecture fit.

## Source rules

- Prefer official/vendor docs, release notes, package metadata, source repositories, and security advisories.
- Community sources are signals only; do not update guidance from a single forum, Reddit, Quora, or issue comment without stronger evidence.
- For OS-specific patch, kernel, desktop, driver, or vulnerability guidance, read `docs/SECURITY_PATCH_REFRESH_POLICY.md` and check current vendor sources first.
- For AI-tool compatibility claims, verify current official documentation before adding or changing support.

## Validation

Use available hooks/tests when relevant and report what was run. If validation cannot be run, state why and summarize what was manually checked.

## Output expectations

For repository changes, report:

- changed files
- evidence or source basis
- validation performed
- rollback notes
- whether metadata/version/skill-count alignment was affected
- whether supported-agent context changed and automation documentation needs refresh

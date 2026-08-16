# linux-admin Copilot instructions

Use `AGENTS.md` as the primary repository instruction source.

Before Linux administration guidance or repository changes:

- follow `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`
- read `skills/using-linux-admin/SKILL.md` and use it to select the smallest relevant specialist
- use `docs/SECURITY_PATCH_REFRESH_POLICY.md` for OS-specific patch, lifecycle, kernel, driver, desktop, or vulnerability guidance
- read only the selected `skills/<skill-name>/SKILL.md` and required chunks
- collect bounded read-only evidence before state changes
- preserve backup, rollback, validation, and architecture-fit checks
- do not change unrelated files
- do not invent versions, skill counts, package names, paths, publication status, or validation results
- never commit user-level Copilot state or hard-coded home-directory paths

For repository edits, report changed files, evidence, validation performed, and rollback notes.

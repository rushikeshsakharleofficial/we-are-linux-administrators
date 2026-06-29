# AGENTS.md

Instructions for coding agents working on this repository.

## Default behavior

- Work on `main` unless the user explicitly asks otherwise.
- Fetch current file content or use the latest tree before writing.
- Keep edits scoped and reversible.
- Do not bulk rewrite unrelated files.
- Follow `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`.

## First-run context

Load these files at the start of a repo session when present:

1. `CLAUDE.md`
2. `AGENTS.md`
3. `docs/SECURITY_PATCH_REFRESH_POLICY.md`
4. `docs/EXPERT_MODULE_INDEX.md`
5. `RELEASE.md`

## OS patch and security refresh

For OS-specific skills, verify current vendor security patch sources before changing guidance. Use official sources first, then community sources only as secondary signals.

## Skill structure

For large domains such as Ubuntu Desktop and Fedora Desktop, keep the main `SKILL.md` small and use `chunks/*.md` category files for easier future updates.

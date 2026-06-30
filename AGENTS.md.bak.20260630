# AGENTS.md

Instructions for Codex, Claude Code, and other coding agents working on this repository.

## Default behavior

- Work on `main` unless the user explicitly asks otherwise.
- Fetch current file content or use the latest tree before writing.
- Keep edits scoped and reversible.
- Do not bulk rewrite unrelated files.
- Follow `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`.
- Prefer one focused commit per task.
- Report validation status and any blocked/unverified work.

## First-run context

Load these files at the start of a repo session when present:

1. `AGENTS.md`
2. `CLAUDE.md`
3. `docs/CODEX_USAGE.md`
4. `docs/SECURITY_PATCH_REFRESH_POLICY.md`
5. `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`
6. `docs/EXPERT_MODULE_INDEX.md`
7. `RELEASE.md`

## Codex workflow

Codex app, Codex CLI, Codex IDE extension, and Codex Web tasks should use `AGENTS.md` as the first instruction source.

Recommended Codex task format:

```text
Read AGENTS.md first.
Task: <exact change or troubleshooting goal>
Scope: <files/directories allowed>
Safety: follow docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md
Patch policy: follow docs/SECURITY_PATCH_REFRESH_POLICY.md for OS-specific changes
Validation: run or document relevant hooks/checks
Output: summarize changed files, evidence, validation, and rollback notes
```

For a new fork or derived repository, Codex `/init` may be used to scaffold or refresh project instructions, but preserve this file's safety rules.

## OS patch and security refresh

For OS-specific skills, verify current vendor security patch sources before changing guidance. Use official sources first, then community sources only as secondary signals.

## Skill structure

For large domains such as Ubuntu Desktop and Fedora Desktop, keep the main `SKILL.md` small and use `chunks/*.md` category files for easier future updates.

## Validation

Run when possible:

```bash
hooks/validate-linux-admin.sh "$(pwd)"
hooks/validate-universal-contract.sh "$(pwd)"
```

If validation cannot be run in the current environment, say so explicitly and explain what was inspected instead.

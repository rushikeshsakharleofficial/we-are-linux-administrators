# Bash scripting plan (historical)

> Historical design note. The standalone `bash-script-expert` was retired during skill consolidation. Do **not** recreate `skills/bash-script-expert/SKILL.md` from this document.
>
> Current canonical route: `skills/automation/SKILL.md` -> `skills/automation/chunks/bash-scripting.md`.

## Original goal

Create deep Bash scripting guidance for Linux administration workflows.

The maintained automation chunk preserves this intent. Scripts should be readable, safe, practical, minimally commented, easy to test, and suitable for cron, systemd, or manual execution where applicable.

## Maintained workflow

Use `skills/automation/chunks/bash-scripting.md` for script creation, review, debugging, hardening, merging, dry-run design, ShellCheck-style review, and POSIX `/bin/sh` portability.

The current flow is:

1. Understand the task and target shell.
2. Decide whether Bash/POSIX shell is the correct tool.
3. Identify privilege and risk level.
4. Define inputs, outputs, and failure behaviour.
5. Use the smallest practical structure.
6. Add argument/input validation where needed.
7. Add bounded logging and useful exit codes.
8. Add dry-run/apply separation and rollback for mutations.
9. Validate syntax and perform ShellCheck-style review.
10. Test success plus at least one failure/rollback path.

Follow `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` for facts/security first, architecture fit, backup/disaster planning, rollback, bounded evidence/output, and validation.

## Structure and comments

Do not force boilerplate on small scripts. For larger scripts, a clean structure can include a shebang, short purpose comment, suitable shell options, constants, usage/error helpers, argument parsing, validation functions, main workflow, and final main call.

Good comments explain why, risk, assumptions, or non-obvious behaviour. Avoid comments that merely repeat the command below them.

## Conditions, loops, and portability

Use guard clauses, clear `case` blocks, quoted variables, safe argument iteration, line-safe file reading, and arrays when Bash is explicitly allowed. For POSIX `/bin/sh`, avoid Bash-only arrays, `[[ ]]`, process substitution, `$'...'`, `declare`, and Bash-only parameter expansions.

## Script merging

Do not concatenate scripts blindly. Preserve behaviour, exit codes, arguments, logs, cleanup, and output format. Extract shared logic only when it reduces duplication without hiding simple flow.

## Testing

Use syntax checks, ShellCheck-style review, dry-run mode, representative sample inputs, and post-change validation commands. Test under the actual target shell.

## Superseded paths

The old proposal to create `skills/bash-script-expert/SKILL.md` is obsolete. New Bash/POSIX operational guidance belongs in `skills/automation/chunks/bash-scripting.md`; cron, systemd, and Ansible keep their distinct specialists when those semantics are the actual condition.

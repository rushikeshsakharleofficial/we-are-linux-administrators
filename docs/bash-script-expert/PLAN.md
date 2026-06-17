# bash-script-expert plan

## Goal

Create a deep Bash scripting expert for Linux administration workflows.

The skill should produce scripts that are:

- readable
- safe
- practical
- human-written in style
- minimally commented
- easy to test
- suitable for cron, systemd, and manual execution where applicable

## Core flow

1. Understand the task.
2. Decide if Bash is the correct language.
3. Identify risk level.
4. Define inputs and outputs.
5. Define failure behavior.
6. Create simple structure.
7. Add argument parsing if needed.
8. Add validation.
9. Add logging.
10. Add dry-run for state-changing work.
11. Add rollback notes when needed.
12. Review with ShellCheck-style checks.

## Clean structure

Recommended sections:

- shebang
- short purpose comment
- shell options when suitable
- constants
- usage function
- log and error helpers
- argument parser
- validation functions
- main workflow
- final main call

Do not force full boilerplate on small scripts.

## Comment rules

Good comments explain why, risk, assumptions, or non-obvious behavior.

Avoid comments that simply repeat what the next command already says.

## Conditions and loops

Use clear conditions, guard clauses, case blocks, quoted variables, safe argument iteration, line-safe file reading, and arrays where Bash is allowed.

## Script merging

Do not concatenate scripts. Preserve behavior, exit codes, arguments, logs, cleanup, and output format. Extract shared logic only when it reduces duplication without hiding simple flow.

## Testing

Recommend syntax check, ShellCheck review, dry-run mode, sample input tests, and validation commands after changes.

## Plugin files later

- `skills/bash-script-expert/SKILL.md`
- `docs/bash-script-expert/review-checklist.md`
- `docs/bash-script-expert/merge-playbook.md`
- `templates/bash-script-template.sh`
- `tests/test_bash_script_expert.py`

# Bash and POSIX shell automation

Use this chunk when the automation condition is script creation, review, debugging, hardening, merging, dry-run design, ShellCheck-style review, or POSIX `/bin/sh` portability.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`.

## Choose the right tool

Use Bash for small Linux utilities, wrappers and operational automation. Prefer Python or Go when the work becomes application-like, data-heavy, concurrency-heavy or difficult to test safely.

## Safety rules

- Validate inputs before state changes.
- Quote variables unless expansion is intentionally required.
- Prefer arrays for Bash command construction and argument lists.
- Separate logs on stderr from data on stdout.
- Add explicit dry-run/apply modes for mutations.
- Define rollback before changing system state.
- Avoid interactive assumptions in cron/systemd contexts.
- Test with the target shell; do not assume Bash when `/bin/sh` portability is required.

## Bash creation/review flow

1. Identify purpose, target OS/shell and privilege level.
2. Define inputs, outputs and failure modes.
3. Choose the smallest practical structure.
4. Add argument/input validation.
5. Add bounded logging and useful exit codes.
6. Add dry-run and rollback for changes.
7. Validate syntax and run ShellCheck-style review.
8. Test the success path and at least one failure/rollback path.

## POSIX portability

When dash, ash, `/bin/sh` or vendor-shell compatibility is required, avoid Bash-only arrays, `[[ ]]`, process substitution, `$'...'`, `declare` and Bash-only parameter expansions. Prefer simple `case` blocks, portable conditionals and explicit quoting.

Checklist: correct shebang, portable syntax, safe filename handling, clear exit codes, stderr/stdout separation, no interactive dependency, and execution under the actual target shell.

## Hand-off boundaries

- One-liners only -> `command-expert`.
- Cron expression/execution issue -> `cron-scheduler-expert`.
- systemd unit/timer wrapper -> `systemd-expert`.
- Ansible inventory/playbook/module/rollout issue -> `ansible-expert`.
- File/path access problem -> `permissions`.

## Output

Return assumptions, final/reviewed script, important logic, safety/rollback notes, validation commands and the smallest evidence still needed.
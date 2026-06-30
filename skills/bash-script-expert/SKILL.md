# bash-script-expert

Use this skill to create, review, debug, harden, merge, and explain Bash scripts for Linux administration — or to write/review POSIX-portable `/bin/sh` scripts when portability to dash, ash, or vendor shells is required.

## Purpose

Write practical Bash scripts that look like a careful Linux administrator wrote them: clean, readable, safe, and not over-commented.

## Scope

- script creation and review
- script debugging and merging
- argument parsing, logging, dry-run design
- rollback-aware changes
- safe loops, conditions, quoting, and arrays
- cron-safe and systemd-safe scripting
- ShellCheck-style review
- POSIX portability review (`/bin/sh`, dash, ash, init script compatibility)
- migration from Bash-only syntax to portable shell

## Rules

- Use Bash when the task is a small utility, wrapper, or Linux automation helper.
- Recommend Python or Go when the script becomes large, data-heavy, or application-like.
- Keep comments useful and human-like.
- Quote variables unless there is a clear reason not to.
- Use arrays for command construction and argument lists.
- Prefer clear conditions and guard clauses.
- Add dry-run mode for state-changing scripts.
- Validate inputs before changing anything.
- Keep logs on stderr and data output on stdout.
- Include rollback notes when system state changes.

## Script creation flow

1. Understand purpose.
2. Identify environment.
3. Identify risk level.
4. Define inputs and outputs.
5. Define failure modes.
6. Choose simple structure.
7. Add argument parsing when needed.
8. Add validation.
9. Add logging.
10. Add dry-run and rollback when needed.
11. Add tests or validation commands.
12. Review with ShellCheck-style rules.

## Output format

When creating or reviewing a script, return:

1. script summary
2. assumptions
3. final script
4. explanation of important logic
5. safety notes
6. test commands
7. rollback notes if needed

## Portability mode

If `/bin/sh`, dash, ash, or vendor shell compatibility is required:
- Ask whether portability is required before writing.
- Avoid Bash-only features: arrays, `[[ ]]`, process substitution, `$'...'`, `declare`, `local` (in some shells), Bash-only expansions.
- Prefer `case` blocks over complex conditions.
- Test with the target shell, not only Bash.

### Portability checklist
- correct shebang (`#!/bin/sh` vs `#!/usr/bin/env bash`)
- no Bash-only syntax when portability required
- safe quoting throughout
- simple conditions and loops
- no fragile filename handling (glob/spaces)
- clear exit codes
- clear stderr/stdout separation
- no interactive assumptions
- suitable for cron or minimal environments

## Escalation

Use `command-expert` for one-liners, `cron-scheduler-expert` for cron execution issues, `systemd-expert` for service/timer wrappers, and `file-permissions-expert` for ownership or mode changes.

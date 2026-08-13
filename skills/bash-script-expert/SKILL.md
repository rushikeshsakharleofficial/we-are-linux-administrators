---
name: bash-script-expert
description: Create, review, debug, and harden Bash or POSIX shell for Linux administration, including grep/sed/awk/find/xargs pipelines, quoting, dry-run design, validation, and rollback-aware automation.
argument-hint: "[script or shell task]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# bash-script-expert

Use Bash for small Linux utilities and wrappers; recommend Python or Go when the task becomes application-like.

## Rules

- Validate inputs before changes.
- Quote variables by default.
- Prefer arrays for Bash command construction.
- Keep stdout for data and stderr for logs/errors.
- Add dry-run behaviour for state-changing automation.
- Use `grep`, `sed`, `awk`, `find`, and `xargs` deliberately; avoid fragile parsing when structured tools exist.
- For `/bin/sh`, avoid Bash-only syntax and test with the target shell.
- Keep comments useful and code short.
- Include validation and rollback for state changes.

## Routing

- one-liners and command selection → `command-expert`
- cron execution → `cron-scheduler-expert`
- service/timer wrappers → `systemd-expert`
- ownership/modes/ACLs → `permissions`

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`.

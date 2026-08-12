---
name: logrotate-expert
description: Expert Linux log rotation design and troubleshooting for retention, compression, ownership, postrotate handling, service log reopen behavior, copytruncate decisions, and disk-full prevention. Use when logs grow unexpectedly, rotation fails, rotated files have wrong permissions, or logrotate policy needs a safe review.
---

# logrotate-expert

Use this skill for Linux log rotation design, debugging, retention, compression, ownership, postrotate handling, and disk-full prevention.

## Universal Skill Execution Contract

Follow `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` for security/facts checks, architecture fit, backup/disaster planning, rollback or guarded rollback, validation, and token-bounded output before recommending or applying changes.

## Purpose

Keep logs controlled without losing evidence. Prefer validation and service-aware reopen behavior over blind rotation changes.

## Use when

- `/var/log` is growing too fast
- a service log is not rotating
- rotated logs have wrong ownership or permissions
- compressed retention is incorrect
- `copytruncate` vs service reopen is unclear
- postrotate scripts fail

## Evidence first

Ask for the relevant stanza, log path and size, service name, rotation state summary, and one recent error line.

## Safe workflow

1. identify writer process and reopen behavior
2. review matching stanza
3. validate retention and compression policy
4. dry-run before change
5. prefer service reopen over copy-truncate when possible
6. validate new file permissions and service logging
7. document rollback

## Anti-patterns

- changing global policy for one service
- rotating without confirming writer behavior
- using copy-truncate as default
- keeping infinite compressed logs
- ignoring failed postrotate hooks

## Output format

Return log growth summary, stanza analysis, safest policy, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for one stanza, one file-size summary, and one dry-run result instead of the full logrotate tree.

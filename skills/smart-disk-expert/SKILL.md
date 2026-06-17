# smart-disk-expert

Use this skill for SMART health review, disk failure prediction, media errors, temperature issues, wear indicators, replacement planning, and safe evidence collection.

## Purpose

Detect disk risk early and recommend safe replacement or migration actions.

## Evidence first

Ask for disk model, SMART health summary, reallocated/pending errors, temperature, power-on hours, interface errors, and storage role.

## Safe workflow

1. identify disk and role
2. review key SMART attributes by drive type
3. correlate with kernel I/O errors
4. assess immediate replacement risk
5. verify backups or RAID state
6. document replacement plan

## Anti-patterns

- trusting overall SMART PASS alone
- ignoring pending sectors or media errors
- stress-testing a failing production disk
- replacing disks without array/backup plan

## Output format

Return health summary, risk level, evidence, safe next action, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for SMART summary and a short kernel I/O error window, not full raw dumps.

---
name: smart-disk-expert
description: Diagnose disk SMART health, media errors, wear, temperature, interface errors, and replacement risk using bounded read-only evidence and rollback-aware storage planning.
argument-hint: "[disk device|model|SMART symptom|media error]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# smart-disk-expert

Use this skill for SMART health review, disk failure prediction, media errors, temperature issues, wear indicators, replacement planning, and safe evidence collection.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Keep diagnostics read-only first, verify backups or redundancy before replacement actions, avoid destructive stress tests on suspect production media, and include validation plus rollback/recovery planning.

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

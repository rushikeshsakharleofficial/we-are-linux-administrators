---
name: apparmor-expert
description: Diagnose and safely remediate AppArmor profile denials, confinement modes, profile tuning, and service access issues. Use for AppArmor complain/enforce review, denial triage, profile reloads, and rollback-aware confinement changes.
argument-hint: "[AppArmor profile, denial, service, path, complain/enforce issue]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# apparmor-expert

Use this skill for AppArmor profile mode review, denial triage, complain/enforce rollout, profile tuning, and safe service confinement.

## Purpose

Resolve AppArmor denials with minimal profile changes and clear validation.

## Universal Skill Execution Contract

Follow [`../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`](../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md) for security facts before changes, architecture fit, backup/disaster planning, rollback, validation, and bounded output.

## Evidence first

Ask for profile name, mode, denial snippet, service name, expected path/access, and recent package or config changes.

## Safe workflow

1. identify profile and denied operation
2. confirm complain or enforce mode
3. scope changes to exact path and permission
4. test in complain mode when appropriate
5. reload profile safely
6. document rollback

## Anti-patterns

- disabling a profile without investigating denial cause
- adding broad path wildcards
- mixing service config and profile tuning in one step
- ignoring includes and abstractions

## Output format

Return denial summary, profile impact, safe profile adjustment, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for one denial event and the affected profile section, not all AppArmor logs.
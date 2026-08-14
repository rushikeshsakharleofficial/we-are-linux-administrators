---
name: sudoers-expert
description: Expert sudoers policy and least-privilege delegation for users, groups, service accounts, command scoping, visudo validation, auditability, and lockout-safe administrative access.
argument-hint: "[user|group|command|sudoers rule|NOPASSWD|delegation|lockout]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# sudoers-expert

Use this skill for sudoers policy, least-privilege command rules, safe visudo changes, sudo group mapping, service account delegation, and lockout prevention.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` for security/facts checks, architecture fit, backup/disaster planning, guarded rollback for privilege changes, validation, and token-bounded output.

## Purpose

Grant administrative access safely without broad uncontrolled root privileges.

## Evidence first

Ask for the exact user/group, required command, target host scope, current sudoers fragment, and expected audit requirement.

## Safe workflow

1. identify required task and command scope
2. prefer groups over individual users where practical
3. use a drop-in fragment instead of editing global policy
4. validate syntax before rollout
5. test with a non-critical command first
6. document rollback

## Anti-patterns

- granting broad ALL access when one command is needed
- editing sudoers without syntax validation
- using NOPASSWD without a clear reason
- ignoring environment and path risks

## Output format

Return access requirement, minimal rule, validation plan, rollback, and token-saving evidence request.

## Token-saving tip

Ask for only the matching sudoers fragment and required command, not the full policy tree.

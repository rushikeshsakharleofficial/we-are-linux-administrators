---
name: auditd-expert
description: Expert Linux auditd rule design, audit evidence collection, user/action tracing, file watch planning, compliance support, and safe audit rule rollout. Use when investigating audit events, missing audit records, sudo/user activity, file changes, compliance evidence, or audit rule design.
argument-hint: "[audit event, rule, path, syscall, user, key, time window]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# auditd-expert

Use this skill for Linux auditd rule design, audit evidence collection, user/action tracing, file watch planning, compliance support, and safe audit rule rollout.

## Purpose

Collect useful security evidence without creating noisy or expensive audit rules.

## Use when

- tracking who changed important files
- reviewing sudo/user activity
- investigating suspicious access
- building compliance evidence
- converting broad file watches into focused audit rules
- troubleshooting missing audit events

## Evidence first

Ask for audit service state, current rule source files, target path or syscall goal, time window, expected user/service, and one narrow search result.

## Safe workflow

1. identify the audit question
2. choose file, directory, syscall, user, or key strategy
3. avoid excessive broad rules
4. test in a narrow scope first
5. add persistent rule only after validation
6. document search key and interpretation
7. monitor event volume

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` for security/facts checks, rollback, architecture fit, backup/disaster planning, guarded recovery, validation, and bounded output. For persistent audit rule changes, back up the active rule source first and document how to restore and reload the prior ruleset.

## Anti-patterns

- adding broad syscall rules without filters
- copying compliance packs blindly
- enabling immutable mode before validation
- dumping full audit logs into an LLM

## Output format

Return audit goal, minimal rule strategy, evidence commands, validation, rollback, and token-saving search query.

## Token-saving tip

Ask for audit status, relevant rule file, and narrow time/key search result instead of the whole audit log.

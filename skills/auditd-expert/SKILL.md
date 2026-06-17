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

## Anti-patterns

- adding broad syscall rules without filters
- copying compliance packs blindly
- enabling immutable mode before validation
- dumping full audit logs into an LLM

## Output format

Return audit goal, minimal rule strategy, evidence commands, validation, rollback, and token-saving search query.

## Token-saving tip

Ask for audit status, relevant rule file, and narrow time/key search result instead of the whole audit log.

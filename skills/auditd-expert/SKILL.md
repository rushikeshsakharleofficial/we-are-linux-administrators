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

Ask for:

- audit service status
- current rule source files
- target path or syscall goal
- event time window
- expected user or service account
- one narrow search result, not full audit logs

## Safe workflow

1. identify the audit question
2. choose file, directory, syscall, user, or key strategy
3. avoid excessive broad rules
4. test rules in a narrow scope first
5. add persistent rule only after validation
6. document search key and event interpretation
7. monitor event volume

## Anti-patterns

- adding broad syscall rules without filters
- copying compliance rule packs blindly
- enabling immutable mode before validation
- dumping full audit logs into an LLM
- using auditd as a replacement for backups or file integrity controls

## Output format

Return:

1. audit goal
2. minimal rule strategy
3. evidence commands
4. validation method
5. rollback
6. token-saving search query

## Token-saving tip

Ask for audit status, the relevant rule file, and a narrow time/key search result instead of the whole audit log.

## Escalation

Use `os-security-expert`, `file-permissions-expert`, `sudoers-expert`, `incident-response-expert`, or `grep-expert` as needed.

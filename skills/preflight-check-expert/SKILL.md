# preflight-check-expert

Use this skill for Linux pre-change validation, readiness checks, dependency confirmation, backup verification, capacity checks, and go/no-go gates.

## Purpose

Catch avoidable failure before a production change starts.

## Evidence first

Ask for change type, target hosts, services affected, backup state, disk/memory/network health, and rollback readiness.

## Safe workflow

1. confirm scope and maintenance window
2. verify backups or config copies
3. check service health before change
4. check capacity and dependencies
5. verify access and rollback path
6. decide go/no-go

## Anti-patterns

- starting without baseline state
- no backup/config copy
- no access recovery path
- checking only the target service while ignoring dependencies

## Output format

Return preflight checklist, pass/fail status, blockers, go/no-go decision, and next steps.

## Token-saving tip

Ask for concise baseline status, free space, service state, and backup evidence only.

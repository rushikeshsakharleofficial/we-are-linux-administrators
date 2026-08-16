# Operational runbooks

Use this chunk when the requested automation artifact is a maintenance procedure, operational runbook, validation checklist, rollback plan or handoff-ready execution guide.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`.

## Evidence first

Confirm service scope, trigger condition, required access, risk/blast radius, rollback method, validation command, stop conditions and escalation owner before finalising a runbook.

## Safe runbook structure

1. Objective and scope.
2. Preconditions and required access.
3. Read-only evidence collection.
4. Change steps with explicit checkpoints.
5. Stop/abort conditions.
6. Rollback steps prepared before risky actions.
7. Validation and service-health checks.
8. Communication, owner and escalation path.
9. Post-checks and evidence retention.

## Anti-patterns

Do not write runbooks without rollback, mix diagnosis/remediation unclearly, omit stop conditions, assume tribal knowledge, or bury destructive commands among read-only checks.

## Output

Return title, purpose, prerequisites, bounded evidence, ordered steps, stop conditions, rollback, validation, escalation and post-checks.
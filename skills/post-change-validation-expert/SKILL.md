# post-change-validation-expert

Use this skill for Linux post-change checks, service health validation, metrics comparison, log review, user-impact confirmation, and rollback decision support.

## Purpose

Prove that a change worked and did not create new issues.

## Evidence first

Ask for change summary, expected success signal, service health, relevant logs, metrics before/after, and user-facing validation path.

## Safe workflow

1. compare expected vs actual state
2. validate service and dependency health
3. inspect bounded logs for regressions
4. compare key metrics
5. confirm user-facing behavior
6. decide accept, monitor, or rollback

## Anti-patterns

- assuming success because the command exited zero
- skipping dependency checks
- not checking logs after reloads
- delaying rollback decision without criteria

## Output format

Return validation checklist, pass/fail evidence, regression signals, accept/rollback recommendation, and monitoring notes.

## Token-saving tip

Ask for the expected state, service status, 20 log lines, and one metric comparison.

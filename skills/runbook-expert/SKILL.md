# runbook-expert

Use this skill for Linux operational runbooks, incident procedures, maintenance plans, rollback steps, validation checklists, and handoff-ready documentation.

## Purpose

Create runbooks that admins can execute safely under pressure.

## Evidence first

Ask for service scope, trigger condition, required access, risk level, rollback method, validation command, and escalation owner.

## Safe workflow

1. define objective and preconditions
2. list evidence collection steps
3. list safe action steps
4. add rollback and stop conditions
5. add validation and communication steps
6. add owner and escalation

## Anti-patterns

- writing runbooks without rollback
- mixing diagnosis and remediation unclearly
- omitting stop conditions
- assuming tribal knowledge

## Output format

Return runbook title, purpose, prerequisites, steps, rollback, validation, escalation, and post-checks.

## Token-saving tip

Ask for the target service, failure mode, and required outcome before writing the runbook.

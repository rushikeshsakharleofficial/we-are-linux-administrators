# change-plan-expert

Use this skill for Linux production change planning, step sequencing, safety gates, owner mapping, communication plan, rollback criteria, and validation design.

## Purpose

Convert a risky Linux task into a clear, reviewable change plan.

## Evidence first

Ask for change objective, affected hosts, current state, target state, risk level, maintenance window, and rollback option.

## Safe workflow

1. define scope and desired outcome
2. collect pre-check evidence
3. list step-by-step implementation
4. add pause points and validation
5. define rollback trigger and method
6. define owner and communication notes

## Anti-patterns

- mixing multiple unrelated changes
- no rollback condition
- no preflight checks
- no post-change validation

## Output format

Return objective, scope, preflight, steps, validation, rollback, communication, and risk notes.

## Token-saving tip

Ask for current state, target state, and blast radius before writing commands.

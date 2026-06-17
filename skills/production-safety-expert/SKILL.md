# production-safety-expert

Use this skill for production guardrails, destructive-command review, access safety, change containment, emergency actions, and operational risk reduction.

## Purpose

Keep Linux production work safe by forcing evidence, blast-radius review, rollback, and validation before action.

## Evidence first

Ask for environment, target host/service, proposed action, impact level, rollback path, and whether emergency conditions apply.

## Safe workflow

1. classify action as read-only, disruptive, destructive, or emergency
2. identify blast radius
3. require backup or rollback for risky changes
4. prefer read-only evidence first
5. add pause points and validation
6. document residual risk

## Anti-patterns

- running broad commands without scope
- making emergency changes without notes
- skipping rollback because action is simple
- assuming staging equals production

## Output format

Return safety class, risks, safe alternative, preflight, rollback, validation, and operator checklist.

## Token-saving tip

Ask for the exact proposed action, target scope, and rollback path before reviewing details.

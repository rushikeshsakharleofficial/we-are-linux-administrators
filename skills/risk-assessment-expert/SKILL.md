# risk-assessment-expert

Use this skill for Linux change risk scoring, production impact review, blast-radius analysis, data-loss risk, access risk, and mitigation planning.

## Purpose

Identify technical and operational risk before a change or incident action.

## Evidence first

Ask for change/action, affected hosts, data criticality, customer impact, rollback path, and current backup or redundancy state.

## Safe workflow

1. classify impact, likelihood, and reversibility
2. identify blast radius
3. identify data-loss and lockout risks
4. propose mitigations
5. define approval and stop conditions
6. document residual risk

## Anti-patterns

- treating all changes as equal risk
- ignoring rollback difficulty
- ignoring shared dependencies
- no owner for risk acceptance

## Output format

Return risk score, impact, likelihood, mitigations, approval need, stop conditions, and residual risk.

## Token-saving tip

Ask for action, affected service, rollback path, and data criticality first.

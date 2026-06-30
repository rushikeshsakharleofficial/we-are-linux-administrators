---
name: change-safety-expert
description: Linux production change safety — preflight readiness, blast-radius review, destructive-command guardrails, post-change validation, and rollback decision. Covers go/no-go gates, change containment, and accept/rollback evidence.
argument-hint: "[preflight|safety-review|post-validation|rollback-decision] [service or change description]"
effort: medium
allowed-tools: "Read Grep Glob Bash"
---
# change-safety-expert

Use this skill for Linux production change safety: pre-change readiness, production guardrails, and post-change validation.

## Purpose

Keep production work safe by forcing evidence, blast-radius review, rollback planning, and validation — before, during, and after a change.

## Evidence first

Ask for: environment, target host/service, proposed action, change type, backup/rollback state, and whether emergency conditions apply.

## Phase 1 — Preflight (before change)

1. Confirm scope and maintenance window.
2. Verify backups or config copies exist.
3. Check service and dependency health baseline.
4. Check capacity (disk, memory, CPU, connections).
5. Verify access and rollback path exist.
6. Decide go/no-go.

**Anti-patterns:** starting without baseline state, no backup/config copy, no access recovery path, ignoring dependencies.

## Phase 2 — Safety review (during change)

1. Classify action: read-only, disruptive, destructive, or emergency.
2. Identify blast radius.
3. Require backup or rollback for risky changes.
4. Prefer read-only evidence first.
5. Add pause points and validation steps.
6. Document residual risk.

**Anti-patterns:** broad commands without scope, emergency changes without notes, skipping rollback because "it's simple", assuming staging equals production.

## Phase 3 — Post-change validation (after change)

1. Compare expected vs actual state.
2. Validate service and dependency health.
3. Inspect bounded logs for regressions (20–50 lines, not full logs).
4. Compare key metrics before/after.
5. Confirm user-facing behavior.
6. Decide: accept, monitor, or rollback.

**Anti-patterns:** assuming success because exit code was 0, skipping dependency checks, not checking logs after reloads, delaying rollback decision without criteria.

## Output format

**Preflight:** checklist, pass/fail status, blockers, go/no-go decision, next steps.
**Safety review:** safety class, risks, safe alternative, preflight, rollback, validation, operator checklist.
**Post-validation:** validation checklist, pass/fail evidence, regression signals, accept/rollback recommendation, monitoring notes.

## Risk scoring

Before any change, classify:

- **Impact**: blast radius (one service / one host / cluster / all users)
- **Likelihood**: how likely to go wrong (new change, proven runbook, tested in staging)
- **Reversibility**: instant rollback / minutes / hours / data loss risk

Identify: data-loss risk, lockout risk (SSH/console), shared dependency breaks.
Define: approval threshold, stop conditions, residual risk owner.

**Anti-patterns:** treating all changes as equal risk, ignoring rollback difficulty, no owner for risk acceptance.

## Change plan structure

1. Define scope and desired outcome.
2. List pre-check evidence commands.
3. Step-by-step implementation with pause points.
4. Rollback trigger condition and reverse steps.
5. Owner, communication notes, escalation contact.

## Maintenance window design

1. Define scope and expected downtime.
2. Map dependencies and notify owners.
3. Schedule rollback time slot (not just implementation time).
4. Define go/no-go criteria and communication template.
5. Capture post-window results.

**Anti-patterns:** scheduling without rollback time, no stakeholder communication, no post-change validation.

## Token-saving tip

Ask for the exact proposed action, target scope, rollback path, service status, 20 log lines, and one metric comparison — nothing more until needed.

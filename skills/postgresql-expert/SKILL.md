---
name: postgresql-expert
description: Diagnose PostgreSQL service health, connection limits, WAL and checkpoint pressure, replication lag, vacuum and autovacuum issues, storage pressure, backup readiness, and safe configuration changes. Use for PostgreSQL outages, slow or blocked databases, replication problems, WAL growth, vacuum debt, connection exhaustion, and rollback-aware database maintenance.
allowed-tools: "Read Grep Glob Bash"
---

# postgresql-expert

Use this skill for PostgreSQL service health, connection limits, WAL/checkpoint symptoms, replication lag, vacuum/autovacuum evidence, backup/restore planning, and safe config review.

## Purpose

Troubleshoot PostgreSQL using evidence from logs, stats views, storage, and backup readiness.

## Evidence first

Ask for version, database size, selected config values, short log window, replication/vacuum symptom, and backup status.

## Safe workflow

1. classify workload and incident type
2. verify backup/restore path before risky changes
3. inspect logs and stats evidence
4. separate connection, lock, WAL, vacuum, and storage issues
5. change one setting at a time
6. validate service health

## Anti-patterns

- running disruptive maintenance without impact review
- tuning memory without host evidence
- ignoring WAL and disk pressure
- dumping full schemas or logs into LLM

## Output format

Return risk summary, likely bottleneck, evidence request, safe plan, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for selected config values, one short log window, and one stats summary only.

## Universal Skill Execution Contract

Follow [`../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`](../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md) for security facts before changes, architecture-fit checks, backup/disaster planning, rollback, validation, and bounded output. Before risky PostgreSQL maintenance or configuration changes, verify a usable backup or snapshot path, record the current configuration, prefer one change at a time, and restore the previous configuration or database state if validation fails.
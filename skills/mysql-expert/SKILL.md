---
name: mysql-expert
description: Diagnose and operate MySQL or MariaDB safely for performance issues, connection limits, backups and restores, replication symptoms, crash recovery boundaries, and configuration review. Use when troubleshooting database slowness, overload, backup or restore planning, replication lag or errors, or risky InnoDB recovery scenarios.
argument-hint: "[mysql|mariadb|slow-query|connections|backup|restore|replication|innodb] [symptom]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# mysql-expert

Use this skill for MySQL/MariaDB diagnostics, logical backup planning, slow-query triage, connection limits, replication symptoms, crash recovery boundaries, and safe config review.

## Purpose

Troubleshoot MySQL safely with backups, bounded logs, minimal variable changes, and clear rollback.

## Use when

- MySQL is slow or overloaded
- too many connections appears
- backups or restores need planning
- slow query log analysis is needed
- replication has lag or errors
- crash recovery or InnoDB emergency mode is being considered

## Evidence first

Ask for version, engine mix, dataset size, selected variables, short error-log snippet, slow-log summary if available, replication topology/role when relevant, and the timestamp/status of the last verified restorable backup.

Never request passwords, connection strings containing secrets, private keys, full production dumps, or unbounded schemas/logs. Prefer redacted status and targeted metadata.

## Safe workflow

1. classify workload and incident type
2. verify the exact instance/role and backup/restore path before risky changes
3. prefer slow-log, performance-schema/status and bounded error-log evidence over guesswork
4. distinguish dynamic variables from settings that require restart or persistent config changes
5. change one variable or failure domain at a time
6. avoid emergency InnoDB recovery modes unless read-only extraction is the explicit goal
7. for replication work, preserve topology/coordinates or GTID state and do not skip errors blindly
8. validate query latency, connection health, replication state and application behaviour
9. document exact rollback or restore steps

## Anti-patterns

- leaving general log enabled in production
- using emergency recovery mode for normal operations
- dumping full error logs, schemas or data into an LLM
- tuning buffer sizes without host/container memory evidence
- changing replication and application settings together
- treating a successful backup command as proof of restore readiness
- skipping replication errors without understanding data consistency impact

## Output format

Return current risk, instance/role, likely bottleneck, evidence request, backup/recovery status, safe plan, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for selected variables, one slow-log summary, one short error-log window, replication status when relevant, and table-size summary instead of full dumps.

## Universal Skill Execution Contract

Follow [`docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`](../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md). Start with bounded read-only evidence and verify the exact MySQL/MariaDB instance, version, role/topology, workload and data criticality before changes. Confirm a realistic restore path—not merely backup-file existence—before destructive recovery, replication repair, upgrade, storage-engine or persistent configuration work. Preserve configuration and replication state needed for rollback, prefer one narrow reversible change at a time, and validate database health plus application traffic before declaring recovery.

For changes that can cause data loss, split brain, prolonged outage or irreversible divergence, do not improvise automatic rollback. Stop, state the recovery boundary, and require an explicit tested restore/failover plan appropriate to the topology.

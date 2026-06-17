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

Ask for version, engine mix, dataset size, selected variables, short error-log snippet, slow-log summary if available, and backup status.

## Safe workflow

1. classify workload and incident type
2. verify backup/restore path before risky changes
3. prefer slow-log evidence over guesswork
4. change one variable at a time
5. avoid emergency recovery modes unless read-only extraction is the goal
6. validate query latency and service health
7. document rollback

## Anti-patterns

- leaving general log enabled in production
- using emergency recovery mode for normal operations
- dumping full error logs or schemas into LLM
- tuning buffer sizes without memory evidence
- changing replication and application settings together

## Output format

Return current risk, likely bottleneck, evidence request, safe plan, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for selected variables, one slow-log summary, one short error-log window, and table size summary instead of full dumps.

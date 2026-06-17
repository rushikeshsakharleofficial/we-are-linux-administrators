# backup-restore-expert

Use this skill for Linux backup planning, restore validation, rsync/tar workflows, filesystem recovery, backup evidence review, retention planning, and safe pre-change backup gates.

## Purpose

Treat restore capability as the real success metric. A backup job is not healthy until a restore path, validation method, and rollback plan are known.

## Use when

- a risky Linux change needs a pre-change safety copy
- data must be synced between servers
- backup jobs are failing or untrusted
- a restore drill is required
- file ownership, ACL, SELinux label, or UID/GID preservation matters
- application data needs filesystem plus database backup planning

## Evidence first

Ask for the smallest useful evidence pack:

- source and destination paths
- filesystem type and free space
- backup command or job file
- retention requirement
- one ownership/permission sample
- restore target path
- database engine or application dependency if relevant

## Safe workflow

1. classify data: config, app data, logs, database, user data, or rebuildable cache
2. define RPO/RTO and retention
3. run dry-run/listing before real copy or extraction
4. validate destination free space and ownership model
5. create manifest or checksum where practical
6. restore to an isolated path first
7. compare permissions, ownership, file counts, and application checks
8. document rollback and residual risk

## Anti-patterns

- assuming backup exists because a cron job exists
- restoring directly into production without sandbox validation
- changing backup and retention at the same time without a rollback path
- ignoring UID/GID differences across hosts
- using destructive sync before reviewing a dry-run
- treating database files like ordinary files without app consistency planning

## Output format

Return:

1. backup type recommendation
2. evidence required
3. safe command plan
4. validation plan
5. restore drill
6. rollback plan
7. residual risk
8. token-saving evidence request

## Token-saving tip

Ask for dry-run output, disk summary, one config/job file, and a short restore validation result instead of full backup logs.

## Escalation

Use `mysql-expert`, `postgresql-expert`, `redis-expert`, `lvm-expert`, `filesystem-expert`, or `incident-response-expert` when the backup depends on those domains.

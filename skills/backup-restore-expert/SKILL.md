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

Ask for source and destination paths, filesystem type, free space, backup job, retention requirement, ownership sample, restore target, and application dependency if relevant.

## Safe workflow

1. classify data type
2. define RPO/RTO and retention
3. run dry-run or listing before real copy or extraction
4. validate destination capacity and ownership model
5. create manifest or checksum where practical
6. restore to an isolated path first
7. compare permissions and application checks
8. document rollback and residual risk

## Anti-patterns

- assuming backup exists because a cron job exists
- restoring directly into production without sandbox validation
- changing backup and retention at the same time
- ignoring UID/GID differences across hosts
- using destructive sync before reviewing dry-run evidence

## Output format

Return backup type, evidence required, safe plan, validation plan, restore drill, rollback, residual risk, and token-saving evidence request.

## Token-saving tip

Ask for dry-run output, disk summary, one config/job file, and a short restore validation result instead of full backup logs.

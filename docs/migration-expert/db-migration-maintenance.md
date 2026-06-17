# Database migration and maintenance plan

## Required DB facts

- engine and version
- data size
- write rate
- replication topology
- extensions/plugins
- charset/collation/timezone
- backup method and last restore test
- downtime tolerance
- application connection strings
- migration method: logical dump, physical backup, replication, native upgrade, blue/green

## PostgreSQL options

- logical dump/restore: safest and portable, downtime depends on size.
- `pg_upgrade`: faster major-version path when exact constraints are satisfied.
- logical replication: lower downtime, requires compatibility planning.
- physical replica/switchover: useful within compatible versions.

## MySQL/MariaDB options

- logical dump/restore with `mysqldump`/`mariadb-dump` for portability.
- physical backup with vendor-compatible tool.
- replication-based migration for lower downtime.
- clone/plugin or snapshot only when version/storage compatibility is proven.

## Maintenance window structure

1. Announce freeze.
2. Confirm backups and restore test.
3. Stop writes or enable replication catch-up.
4. Final backup/binlog/WAL position capture.
5. Execute migration.
6. Validate schema counts, row counts, checksums/sample queries.
7. Switch application endpoint.
8. Observe errors, slow queries, replication, disk, CPU, memory.
9. Roll back if triggers fire within rollback window.

# Migration framework

## Phases

1. Intake and scenario classification.
2. Read-only discovery and evidence bundle.
3. Dependency map.
4. Strategy selection.
5. Risk register and rollback feasibility review.
6. Rehearsal or dry-run.
7. Maintenance window and communication plan.
8. Cutover execution.
9. Validation.
10. Rollback or stabilize.
11. Post-migration observation and documentation.

## Migration risk dimensions

| Risk | Examples | Required control |
|---|---|---|
| Data loss | DB restore, rsync delete, user homes | backup + restore test + checksums |
| Lockout | firewall, SSH, network route | console/OOB + timed rollback |
| Boot failure | OS upgrade, kernel, initramfs | snapshot + rescue console |
| Service outage | systemd/package/config | dependency map + health checks |
| Security drift | sudoers, SFTP chroot, firewall | least privilege + audit diff |
| Performance regression | DB version, kernel, sysctl | baseline metrics + observation window |

## Strategy types

- In-place upgrade: simplest but highest rollback complexity.
- Side-by-side rebuild: slower but safer and easier to roll back.
- Blue/green cutover: low downtime if DNS/LB/data sync is controlled.
- Rolling batch: best for fleets and patching.
- Replication cutover: best for DB/data services with low downtime needs.
- Backup/restore: simple and deterministic, but downtime scales with data size.

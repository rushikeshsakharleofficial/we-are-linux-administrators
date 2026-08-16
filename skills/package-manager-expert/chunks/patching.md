# Patching and maintenance rollout

Use this chunk when the package-management condition is **planned OS/security patching**, kernel updates, reboot coordination, maintenance-window rollout, or patch validation. Repository/transaction breakage stays in the parent `package-manager-expert`.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` and `../../../docs/SECURITY_PATCH_REFRESH_POLICY.md`. Treat patch/security guidance as time-sensitive: verify the current vendor advisory/lifecycle source before version-specific recommendations.

## Evidence first

Collect only what changes the rollout decision:

```bash
cat /etc/os-release
uname -r
uptime
who -b 2>/dev/null || true
systemctl --failed --no-pager 2>/dev/null || true
```

Then use the parent skill's distro-specific read-only package commands to identify pending updates, holds, repositories and transaction health.

Also establish:

- security-only vs routine patch scope
- critical services and dependencies
- cluster/HA role and available canary
- reboot tolerance and maintenance window
- backup/snapshot/restore state
- console or guarded recovery path for remote systems

## Safe rollout

1. Verify current vendor advisories, lifecycle/support state and package source of truth.
2. Separate security-critical updates from unrelated cleanup or distro migration.
3. Preview the transaction with the parent skill's simulation/dry-run commands.
4. Confirm backup/snapshot and rollback/downgrade limits before applying.
5. Patch one canary or lowest-blast-radius node first when architecture permits.
6. Validate package state, services, listeners, health checks and dependency paths.
7. Reboot only when required/approved; validate the new kernel and service recovery after boot.
8. Roll through remaining nodes in bounded batches, stopping on unexpected regressions.
9. Record exceptions, deferred packages and residual risk.

## Kernel/reboot checks

Before rebooting a remote production host, confirm console/out-of-band access or another tested recovery path. Keep the previous bootable kernel where the distro supports it; do not remove the running or last-known-good kernel during the same maintenance pass.

After reboot:

```bash
uname -r
systemctl --failed --no-pager
journalctl -b -p warning..alert --no-pager -n 100 2>/dev/null || true
```

Add application/service-specific health checks instead of treating a clean boot as proof that the workload is healthy.

## Rollback reality

Package-manager history is evidence, not a guaranteed rollback mechanism. A downgrade can be blocked by schema/data migrations, dependencies, removed repositories or incompatible configuration. Prefer a tested snapshot/image/config restore path for consequential patching and state clearly when rollback is only partial.

## Anti-patterns

Do not:

- patch every production node simultaneously without a justified reason
- mix package cleanup, repo migration and normal patching in one transaction
- ignore kernel/reboot requirements or HA failover order
- assume `dnf history undo`, apt downgrade, or snapshot restore is always safe
- disable security controls merely to make an update succeed
- recommend broad upgrades from stale blog/forum guidance

## Output

```text
Patch scope:
Vendor/security facts:
Blast radius / canary:
Preview:
Backup/disaster plan:
Rollout:
Reboot plan:
Rollback limits:
Validation:
Residual risk:
```

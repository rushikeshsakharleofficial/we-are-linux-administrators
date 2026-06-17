# Quota Expert — Quota Playbooks

## Scope

Linux user/group/project quotas, ext4 quota files, XFS quotas, quotaon/off, quotacheck, repquota, edquota, setquota, grace periods, inode/block limits, and multi-user capacity control.

## Read-only first commands

```bash
findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS 2>/dev/null || true
repquota -avug 2>/dev/null || true
quotaon -p -a 2>/dev/null || true
xfs_quota -x -c state -c report / 2>/dev/null || true
grep -RhsE "usrquota|grpquota|prjquota|uquota|gquota|pquota|quota" /etc/fstab /etc/projects /etc/projid 2>/dev/null || true
df -hT
df -ih
```

## Decision framework

1. Identify the controlling layer and config source.
2. Collect current state and recent logs.
3. Classify the operation as read-only, reload/restart, runtime-only change, persistent config change, boot-affecting change, or destructive repair.
4. Prefer the smallest reversible change.
5. Validate syntax/state before reload or reboot.
6. Include rollback commands and config backups.

## Common failure patterns

- Wrong controlling service or wrong config file.
- Runtime state differs from persistent config.
- Distro-specific defaults differ from upstream examples.
- Time, boot, mount, or filesystem changes interact with systemd ordering.
- Repair commands are run before evidence collection.

## Professional answer shape

- Detected stack
- Evidence
- Root-cause hypothesis
- Safe plan
- Commands to preview/test
- Exact change
- Rollback
- Validation

# Filesystem Expert — Filesystem Model

## Scope

ext4, XFS, Btrfs, filesystem health, df/du mismatch, inode exhaustion, fsck/xfs_repair, grow/shrink, mount options, journaling, corruption triage, and data-safe repair planning.

## Read-only first commands

```bash
df -hT
df -ih
lsblk -f -o NAME,FSTYPE,LABEL,UUID,FSAVAIL,FSUSE%,MOUNTPOINTS 2>/dev/null || lsblk -f
findmnt -R -o TARGET,SOURCE,FSTYPE,OPTIONS
du -xhd1 / 2>/dev/null | sort -h | tail -30 || true
journalctl -k -b --no-pager | grep -Ei "ext4|xfs|btrfs|fsck|i/o error|buffer error|remount|readonly|corrupt" | tail -100 || true
dmesg 2>/dev/null | grep -Ei "ext4|xfs|btrfs|fsck|i/o error|buffer error|readonly|corrupt" | tail -100 || true
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

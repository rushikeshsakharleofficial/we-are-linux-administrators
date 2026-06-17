# Disk Mounting Expert — Mount Model

## Scope

mount, umount, fstab, findmnt, lsblk, blkid, UUID/LABEL, bind mounts, NFS/CIFS, systemd mount units, boot mount failures, remounts, and safe mount validation.

## Read-only first commands

```bash
lsblk -f -o NAME,FSTYPE,LABEL,UUID,FSAVAIL,FSUSE%,MOUNTPOINTS 2>/dev/null || lsblk -f
findmnt -R -o TARGET,SOURCE,FSTYPE,OPTIONS
findmnt --verify --verbose 2>/dev/null || true
blkid 2>/dev/null || true
cat /etc/fstab 2>/dev/null || true
systemctl --failed 2>/dev/null || true
journalctl -b -p warning --no-pager | grep -Ei "mount|fstab|filesystem|dependency|timed out" | tail -80 || true
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

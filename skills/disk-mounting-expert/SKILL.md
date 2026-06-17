# Disk Mounting Expert

Command namespace: `/linux-admin:disk-mounting-expert`

Use this skill for mount, umount, fstab, findmnt, lsblk, blkid, UUID/LABEL, bind mounts, NFS/CIFS, systemd mount units, boot mount failures, remounts, and safe mount validation.

## Operating rules

- Read-only evidence first.
- Detect distro, init system, filesystem, and controlling service before making recommendations.
- Never suggest a persistent config change without backup, validation, and rollback.
- Explain why the command/value/change is needed so the user does not over-tune or copy random internet fixes.
- If the built-in skill is not enough, research official docs and Linux community pages before proposing changes.
- If another expert owns the deeper risk, route there: `systemd-expert`, `sysctl-expert`, `package-manager-expert`, `storage`, `os-security-expert`, or `migration-expert`.

## Start with audit helper

```bash
disk-mounting-expert-audit
```

## Manual evidence commands

```bash
lsblk -f -o NAME,FSTYPE,LABEL,UUID,FSAVAIL,FSUSE%,MOUNTPOINTS 2>/dev/null || lsblk -f
findmnt -R -o TARGET,SOURCE,FSTYPE,OPTIONS
findmnt --verify --verbose 2>/dev/null || true
blkid 2>/dev/null || true
cat /etc/fstab 2>/dev/null || true
systemctl --failed 2>/dev/null || true
journalctl -b -p warning --no-pager | grep -Ei "mount|fstab|filesystem|dependency|timed out" | tail -80 || true
```

## Expert behavior

Mounting is a boot and data-availability risk. Identify source, target, filesystem, options, systemd interpretation, and failure mode before changing anything. Prefer UUID/PARTUUID/LABEL over unstable `/dev/sdX` names.

## Core workflows

- Inventory: `lsblk -f`, `blkid`, `findmnt -R`.
- Validate fstab: `findmnt --verify --verbose`; use `mount -av` only after backup/review.
- Boot safety: use `nofail`, `_netdev`, `x-systemd.automount`, sane timeout options for network mounts.
- Remounts: record current options, use exact target, validate after.
- Bind mounts: understand `bind` vs `rbind` and mount propagation.
- Busy unmounts: use `findmnt`, `fuser`, `lsof`; avoid lazy/force unmount unless incident plan exists.

## Refuse/stop conditions

Do not edit `/etc/fstab` without backup and validation. Do not run broad `umount -a`, forced unmount, or remount root read-write/read-only without explicit recovery plan.


## Output format

1. Detected stack and controlling layer
2. Current evidence
3. Risk classification
4. Root-cause hypothesis
5. Safe plan
6. Exact commands
7. Rollback
8. Validation
9. When to research more

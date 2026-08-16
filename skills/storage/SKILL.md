---
name: "storage"
description: "Parent skill for Linux storage diagnosis. Routes mount/fstab, filesystem health/capacity, and SMART/media-risk conditions to focused chunks; escalates LVM, RAID, SAN/multipath, network storage, quota, and backup problems to dedicated specialists."
argument-hint: "[mount/device/filesystem/storage symptom]"
effort: "high"
allowed-tools: "Read Grep Glob Bash"
---
# storage skill

Use this parent for unknown or broad Linux storage problems. Collect bounded evidence first, identify the failing layer, then load **one matching chunk or specialist**. Do not preload every storage procedure.

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Storage changes can destroy data or remove remote access: begin read-only, verify backup/recovery state before consequential work, define rollback/guarded recovery, and validate after changes.

## Baseline evidence

```bash
df -hT
df -ih
findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS
lsblk -o NAME,SIZE,FSTYPE,TYPE,MOUNTPOINTS,ROTA,MODEL,SERIAL
blkid 2>/dev/null || true
lsof +L1 2>/dev/null || true
iostat -xz 1 3 2>/dev/null || true
dmesg -T | grep -Ei 'I/O error|medium error|media error|blk_update|reset|EXT4-fs|XFS|BTRFS|Buffer I/O|md|nvme|scsi' | tail -100
cat /proc/mdstat 2>/dev/null || true
pvs 2>/dev/null || true; vgs 2>/dev/null || true; lvs -a 2>/dev/null || true
```

## Condition -> load only this branch

| Evidence/condition | Next content |
|---|---|
| mount, `/etc/fstab`, UUID/LABEL, bind mount, remount, boot mount or busy unmount | `chunks/mounts.md` |
| `df`/`du` mismatch, inode exhaustion, ext4/XFS/Btrfs errors, read-only remount, repair/grow/shrink question | `chunks/filesystem-health.md` |
| SMART/NVMe health, media errors, wear, temperature, suspect physical disk or replacement risk | `chunks/smart.md` |
| LVM/thin-pool/snapshot/VG/LV issue | `lvm-expert` |
| md/software RAID degradation/rebuild | `raid-expert` |
| iSCSI session/target/LUN issue | `iscsi-expert` |
| multipath/path failover/SAN path issue | `multipath-expert` |
| NFS protocol/export/client issue | `nfs-expert` |
| SMB/CIFS/Samba protocol/share issue | `samba-expert` |
| quota accounting/enforcement issue | `quota-expert` |
| backup/restore/recovery workflow | `backup-restore-expert` |
| still unclear after baseline evidence | stay in this parent; narrow the layer before loading more |

Default: **one parent + one chunk/specialist**. Add a second branch only when evidence proves a cross-layer dependency, for example SMART media errors on a degraded RAID member.

## Baseline interpretation

- `df -h` full with normal inode use: identify data growth, deleted-open files, snapshots/reserved space before deletion.
- `df -i` full: identify directories creating very large numbers of small files.
- `lsof +L1` with large deleted files: the process still owns the space; prefer service-aware reopen/reload/restart after confirmation.
- filesystem mounted read-only: treat it as protective until kernel/device evidence is understood.
- SMART/media errors: protect data first; load `chunks/smart.md`.
- degraded RAID: collect array evidence and route to `raid-expert`; avoid speculative `mdadm` writes.
- LVM thin data/metadata nearing full: route to `lvm-expert`; treat as write-failure risk.
- high `await`/`%util`: identify process/device/path before tuning.

## Safe boundaries

Do not delete random files, run filesystem repair on a mounted writable filesystem, force unmount live data, recreate filesystems, remove LVM/RAID members, or run destructive disk tests without explicit recovery planning and approval.

For log-space pressure, prefer application-aware cleanup and dry-runs:

```bash
journalctl --disk-usage
logrotate -d /etc/logrotate.conf
```

## Validation

```bash
df -hT
df -ih
findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS
dmesg -T | tail -80
iostat -xz 1 3 2>/dev/null || true
```

Escalate when evidence shows multiple-media failure, root filesystem corruption, SAN/multipath instability, full LVM thin metadata, or a write-heavy production database volume where maintenance/recovery impact must be coordinated.

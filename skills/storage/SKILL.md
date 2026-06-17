---
name: "storage"
description: "Troubleshoot Linux storage issues: disk full, inode full, deleted open files, filesystem errors, LVM, RAID, SMART, mount failures, and I/O latency."
argument-hint: "[mount/device/storage symptom]"
effort: "high"
allowed-tools: "Read Grep Glob Bash"
---
# storage skill

Use this plugin skill for: $ARGUMENTS

Important: begin read-only; require explicit confirmation before disruptive/destructive changes; include validation and rollback.

Supporting docs are available under `${CLAUDE_SKILL_DIR}/../../docs/`.

# Task: Storage, Filesystems, Disk Full, LVM, RAID, SMART

## When to use

Use this for disk full, inode full, deleted files holding space, I/O errors, high disk latency, LVM thin pool, RAID degraded, filesystem corruption, mount errors, SMART warnings.

## Mental model

Distinguish:

1. Block space exhaustion.
2. Inode exhaustion.
3. Deleted-but-open files.
4. Filesystem read-only/remount/errors.
5. Device latency or failure.
6. LVM/RAID thin/degraded state.
7. Application writing unexpectedly.

## Read-only first commands

```bash
df -hT
df -ih
findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS
lsblk -o NAME,SIZE,FSTYPE,TYPE,MOUNTPOINT,ROTA,MODEL,SERIAL
blkid 2>/dev/null || true
du -xhd1 / 2>/dev/null | sort -h
du -xhd1 /var 2>/dev/null | sort -h
lsof +L1 2>/dev/null || true
iostat -xz 1 5 2>/dev/null || true
dmesg -T | grep -Ei 'I/O error|blk_update|reset|EXT4-fs|XFS|BTRFS|Buffer I/O|md|nvme|scsi' | tail -100
smartctl -a /dev/sdX 2>/dev/null || true
cat /proc/mdstat 2>/dev/null || true
mdadm --detail /dev/md0 2>/dev/null || true
pvs 2>/dev/null || true; vgs 2>/dev/null || true; lvs -a 2>/dev/null || true
```

## Branch interpretation

| Signal | Meaning | Next branch |
|---|---|---|
| `df -h` 100%, `df -i` normal | block full | locate largest dirs/files or deleted-open files |
| `df -i` 100% | inode exhaustion | find many tiny files |
| `lsof +L1` shows huge deleted files | space held by running process | restart/reopen owning service after confirmation |
| filesystem mounted `ro` | kernel detected serious errors or admin remounted | inspect dmesg, plan maintenance |
| SMART reallocated/pending/media errors | failing disk risk | backup/snapshot and hardware path |
| `/proc/mdstat` degraded | RAID member failure/rebuild | collect detail, avoid destructive mdadm commands |
| LVM thin pool near 100% | immediate write failure risk | extend pool or free snapshots after confirmation |
| high `await`/`%util` | I/O bottleneck | identify process/device/application path |

## Useful search commands

Large files:

```bash
find /var -xdev -type f -size +500M -printf '%s %p\n' 2>/dev/null | sort -n | tail -30
```

Many files by directory:

```bash
find /var -xdev -type f 2>/dev/null | awk -F/ '{count[$2"/"$3]++} END {for (d in count) print count[d], d}' | sort -n | tail -30
```

Deleted open files:

```bash
lsof +L1
```

## Safe remediation patterns

### Log cleanup

Do not delete random files. Prefer app-aware cleanup:

```bash
journalctl --disk-usage
journalctl --vacuum-time=14d     # state-changing; confirmation required
logrotate -d /etc/logrotate.conf # dry-run
```

### Deleted-open file release

If `lsof +L1` points to a service:

```bash
systemctl reload <unit>   # if reload reopens logs
systemctl restart <unit>  # confirmation required
```

### Filesystem repair

Do not run repair on mounted filesystem unless explicitly safe for that filesystem. Plan rescue/maintenance:

```bash
umount <mountpoint>
fsck -n /dev/<device>       # read-only check where supported
xfs_repair -n /dev/<device> # read-only/no-modify check
```

## Validation

```bash
df -hT
df -ih
findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS
dmesg -T | tail -80
iostat -xz 1 3 2>/dev/null || true
```

## Escalation

Escalate for:

- SMART errors.
- RAID degraded with multiple missing members.
- Thin pool full or metadata full.
- Root filesystem corruption.
- SAN/multipath issues.
- Any write-heavy production database volume.

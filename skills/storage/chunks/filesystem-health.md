# Filesystem capacity, health and repair planning

Use this chunk after the `storage` parent has identified an ext4/XFS/Btrfs capacity, inode, metadata, read-only-remount, growth, or repair-planning problem.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Prioritise data safety: collect read-only evidence first, verify backups/snapshots and maintenance access before repair, and never convert a diagnostic check into a destructive repair without explicit approval.

## Evidence

```bash
df -hT
df -ih
lsblk -f -o NAME,FSTYPE,LABEL,UUID,FSAVAIL,FSUSE%,MOUNTPOINTS 2>/dev/null || lsblk -f
findmnt -R -o TARGET,SOURCE,FSTYPE,OPTIONS
du -xhd1 / 2>/dev/null | sort -h | tail -30 || true
lsof +L1 2>/dev/null || true
journalctl -k -b --no-pager | grep -Ei 'ext4|xfs|btrfs|fsck|i/o error|buffer error|remount|readonly|corrupt' | tail -100 || true
dmesg 2>/dev/null | grep -Ei 'ext4|xfs|btrfs|fsck|i/o error|buffer error|readonly|corrupt' | tail -100 || true
```

Separate block-device problems, filesystem metadata problems, capacity/inode exhaustion, deleted-open files, snapshots/reserved space, mount-option behaviour, and application write patterns.

## Condition branches

- **`df` high, `du` lower:** check deleted-open files, snapshots, reserved blocks and mount boundaries before deleting data.
- **inode exhaustion:** identify directories creating very large numbers of small files; common examples include queues, caches and spool trees.
- **read-only remount/corruption:** treat the remount as protective until kernel evidence says otherwise. Verify the underlying device health before repair.
- **repair planning:** do not repair a mounted writable filesystem. Prefer non-modifying checks first where supported: `fsck -n`, `xfs_repair -n`. Use Btrfs repair tooling only with filesystem-specific recovery guidance and verified backups.
- **growth/shrink:** confirm filesystem support and block-layer layout first. Online growth differs by filesystem; XFS does not support shrinking.
- **mount-option/performance request:** `relatime`/`noatime`, discard/fstrim, barriers and journal modes are workload-specific. Do not tune from generic blog values.

## Stop conditions

Do not run `fsck -y`, write-mode `xfs_repair`, `mkfs`, destructive Btrfs repair options, or filesystem shrink/move operations without verified recovery, maintenance approval and a rollback/data-restoration path.

## Validation

```bash
df -hT
df -ih
findmnt -R -o TARGET,SOURCE,FSTYPE,OPTIONS
dmesg -T | tail -80
```

Return the filesystem type and layer, evidence, risk, root-cause hypothesis, safe action, rollback/recovery path and validation. Route proven LVM/RAID/device faults to their specialists instead of treating them as filesystem problems.

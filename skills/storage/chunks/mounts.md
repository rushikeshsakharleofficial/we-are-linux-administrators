# Mounts, fstab, bind mounts and unmounts

Use this chunk after the `storage` parent has identified a mount/fstab/systemd-mount failure rather than a filesystem, LVM, RAID, or hardware-health problem.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Mount changes can affect boot and data availability: stay read-only first, back up persistent config, define rollback, and preserve remote recovery access.

## Evidence

```bash
lsblk -f -o NAME,FSTYPE,LABEL,UUID,FSAVAIL,FSUSE%,MOUNTPOINTS 2>/dev/null || lsblk -f
findmnt -R -o TARGET,SOURCE,FSTYPE,OPTIONS
findmnt --verify --verbose 2>/dev/null || true
blkid 2>/dev/null || true
cat /etc/fstab 2>/dev/null || true
systemctl --failed 2>/dev/null || true
journalctl -b -p warning --no-pager | grep -Ei 'mount|fstab|filesystem|dependency|timed out' | tail -80 || true
```

Identify the source, target, filesystem, options, controlling layer, and exact failure mode before changing anything. Prefer stable UUID/PARTUUID/LABEL identifiers over `/dev/sdX` names where supported.

## Condition branches

- **fstab validation:** use `findmnt --verify --verbose`; back up `/etc/fstab` before edits. Use `mount -av` only after review and with rollback/recovery available.
- **boot-sensitive local mount:** verify dependency ordering and whether failure should block boot. Do not add `nofail` merely to hide a real required-volume failure.
- **network mount:** verify network readiness and remote endpoint first. `_netdev`, `x-systemd.automount`, and bounded timeout options can be appropriate when the architecture calls for them.
- **bind mount:** distinguish `bind` from `rbind` and verify mount propagation before making it persistent.
- **busy unmount:** use `findmnt`, `fuser`, and `lsof` to identify users. Avoid lazy/forced unmount unless there is an incident/recovery plan.
- **remount:** record current options and exact target first; validate the resulting options and application behaviour afterwards.

## Stop conditions

Do not run broad `umount -a`, force-unmount a live data volume, or remount root read-write/read-only without an explicit recovery plan. Do not edit `/etc/fstab` without backup and validation.

## Validation

```bash
findmnt -R -o TARGET,SOURCE,FSTYPE,OPTIONS
findmnt --verify --verbose 2>/dev/null || true
systemctl --failed 2>/dev/null || true
```

Return the detected mount stack, evidence, risk, minimal fix, rollback, and validation. Route deeper filesystem damage back to the parent and then `filesystem-health.md`; route NFS/CIFS protocol-specific failures to the relevant specialist when needed.

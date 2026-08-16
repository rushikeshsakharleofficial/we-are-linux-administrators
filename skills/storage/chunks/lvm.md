# LVM — PV/VG/LV, thin pools, snapshots and filesystem-aware growth

Load this chunk only when bounded storage evidence proves the issue is at the LVM layer: PV/VG/LV mapping, LV growth, thin-pool pressure, snapshot state, or LVM-backed migration planning.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. LVM writes can make data unavailable or complicate recovery. Start read-only, verify backup/recovery state, identify the filesystem and application using the LV, and define a guarded recovery path before changes.

## Evidence first

```bash
pvs -o pv_name,pv_size,pv_free,vg_name,pv_attr 2>/dev/null || true
vgs -o vg_name,vg_size,vg_free,vg_attr 2>/dev/null || true
lvs -a -o lv_name,vg_name,lv_size,lv_attr,pool_lv,data_percent,metadata_percent,origin,devices 2>/dev/null || true
lsblk -f
findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS
```

For a specific target, also identify application ownership, backup status, maintenance window, and whether the filesystem supports the intended online resize operation.

## Condition map

| Evidence/condition | Safe direction |
|---|---|
| LV needs more space and VG has free extents | plan LV growth, then resize the filesystem with the filesystem-specific tool |
| VG has no free extents | verify the correct new device/PV and stable device identity before extending the VG |
| thin data or metadata percentage is high | treat as write-failure risk; expand the correct thin-pool component before exhaustion |
| snapshot is full/near full | protect origin data and understand snapshot purpose before merge/remove/extend actions |
| device-to-LV mapping is unclear | stop at read-only mapping; do not resize or remove anything |
| request is to shrink an LV/filesystem | high risk; verify filesystem support and tested backup first; XFS cannot be shrunk |
| degraded RAID/media/SAN evidence is present underneath LVM | route the physical/path layer to the matching specialist before LVM writes |

## Growth workflow

1. Map physical device -> PV -> VG -> LV -> filesystem -> mount -> application.
2. Confirm filesystem type and supported growth method.
3. Confirm backup/snapshot/recovery status.
4. Confirm free extents or the exact new PV plan.
5. Prefer growth over shrink.
6. Change one layer at a time and validate after each layer.

Examples are planning patterns, not blind commands:

```bash
# inspect first
vgs
lvs -a -o +devices
findmnt <mountpoint>

# after explicit approval and filesystem verification, an LV may be extended
# lvextend ...
# then grow the filesystem with the correct filesystem-specific tool
```

Do not assume `lvextend -r` is always the best operational choice: combined LV/filesystem changes reduce the opportunity to validate between layers. Use it only when the environment and rollback plan make the combined operation acceptable.

## Thin-pool safety

```bash
lvs -a -o lv_name,vg_name,lv_size,lv_attr,pool_lv,data_percent,metadata_percent
```

- High `Data%` threatens write availability.
- High `Meta%` can be even more dangerous; do not treat metadata exhaustion as ordinary filesystem-full pressure.
- Do not create snapshots on an already stressed thin pool without capacity evidence.

## Snapshots

Before creating, merging or removing an LVM snapshot, identify its purpose, origin LV, expected change rate, available capacity and whether an application-consistent freeze/quiesce is required. An LVM snapshot is not a substitute for a tested backup.

## Shrink boundary

Shrinking is intentionally not a default remediation. Filesystem shrink support varies; XFS does not support shrinking. If shrink is genuinely required, require a tested backup/restore path, maintenance window and filesystem-specific procedure before touching the LV size.

## Anti-patterns

- resizing an LV before identifying its filesystem
- assuming an LV and filesystem resize are the same operation
- using ambiguous `/dev/sdX` identities when stable IDs are available
- adding a new PV without confirming the correct disk/LUN
- ignoring thin-pool metadata usage
- shrinking production storage to reclaim a small amount of space
- treating an LVM snapshot as backup/disaster recovery

## Validation

```bash
pvs
vgs
lvs -a -o +devices
lsblk -f
findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS
df -hT
```

For application-bearing volumes, validate the application, filesystem/kernel logs and backup/recovery observability after the change.

## Output

Return the PV/VG/LV/filesystem map, risk level, evidence-based change plan, backup/disaster path, rollback or guarded recovery plan, validation commands and any residual risk.
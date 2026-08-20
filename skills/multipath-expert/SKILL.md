---
name: multipath-expert
description: Expert Linux multipath device mapping, path-health and ALUA troubleshooting, WWID review, failover analysis, and safe SAN storage recovery. Use for device-mapper multipath issues, failed or ghost paths, path-priority problems, duplicate-device risk, and storage-path validation before filesystem or LVM changes.
argument-hint: "[WWID|path health|ALUA|failover|duplicate-device risk]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# multipath-expert

Use this skill only when evidence shows device-mapper multipath, WWID, ALUA, path-priority or SAN failover problems.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` for security/facts checks, architecture fit, backup/disaster planning, rollback or guarded rollback, validation, and token-bounded output before recommending or applying changes.

## Purpose

Keep SAN paths resilient while avoiding duplicate-device and data-corruption risks.

## Evidence first

```bash
multipath -ll 2>/dev/null | head -200 || true
multipathd show maps status 2>/dev/null || true
multipathd show paths 2>/dev/null | head -160 || true
lsblk -o NAME,TYPE,SIZE,FSTYPE,MOUNTPOINTS,WWN,SERIAL
ls -l /dev/mapper 2>/dev/null | head -100
pvs -o pv_name,pv_uuid,vg_name 2>/dev/null || true
findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS
dmesg -T | grep -Ei 'multipath|dm-|scsi|path|ALUA|I/O error|fail|timeout' | tail -120
```

Establish the expected WWID, vendor/model, transport (iSCSI/FC), number of paths, active path-group policy, upper-layer use and whether storage/network teams are simultaneously changing the path.

## Condition map

- One failed path but healthy map remains: prove path failure and array/fabric state before forcing map changes.
- All paths failed or queueing indefinitely: treat as outage/data-integrity risk; coordinate storage/fabric recovery before filesystem work.
- Duplicate raw `/dev/sdX` use alongside `/dev/mapper/mpath*`: stop and map upper-layer ownership before writes.
- Wrong WWID/blacklist/alias: inspect config and stable IDs; do not flush/recreate an in-use map blindly.
- ALUA/path-priority mismatch: compare array policy, path groups and multipath configuration before overriding defaults.
- iSCSI-backed map with session problems: load `../storage/chunks/iscsi.md` only when session/target evidence proves that lower layer is involved.

## Safe workflow

1. Map WWID -> multipath map -> underlying paths -> LVM/filesystem/mount/application.
2. Confirm expected path count and health.
3. Identify whether the fault is host config, HBA/NIC, fabric/network, target/controller or path policy.
4. Preserve an operational path and out-of-band recovery where possible.
5. Define rollback before config reload, path removal, map flush or failover testing.
6. Change one layer at a time.
7. Validate map identity, path health and application I/O.

## Dangerous boundaries

Do not mount or create LVM on individual path devices when multipath owns the LUN. Do not flush an in-use map, remove paths blindly, change `find_multipaths`/blacklists broadly, or force failover on production without proving redundancy. Stable WWID identity beats `/dev/sdX` names.

## Validation

```bash
multipath -ll 2>/dev/null | head -200 || true
multipathd show maps status 2>/dev/null || true
multipathd show paths 2>/dev/null | head -160 || true
lsblk -o NAME,TYPE,SIZE,FSTYPE,MOUNTPOINTS,WWN,SERIAL
findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS
dmesg -T | tail -80
```

Return the WWID/path map, failing layer, risk level, narrow fix, rollback and validation. Escalate when all paths are unstable, storage-controller/fabric state is unknown, or duplicate writable device mappings exist.

## Token-saving tip

Ask for one affected multipath map and its path list first, not the full storage tree.
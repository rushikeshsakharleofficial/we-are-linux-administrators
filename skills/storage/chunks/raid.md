# RAID / mdadm

Use this chunk only after the `storage` parent has identified md/software RAID as the failing layer.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. RAID recovery can destroy the last consistent copy of data. Stay read-only until array state, member identity, backup/recovery options and filesystem usage are understood.

## Evidence first

```bash
cat /proc/mdstat
mdadm --detail --scan 2>/dev/null || true
for a in /dev/md/* /dev/md[0-9]*; do [ -e "$a" ] && mdadm --detail "$a" 2>/dev/null; done
lsblk -o NAME,SIZE,TYPE,FSTYPE,MOUNTPOINTS,MODEL,SERIAL
blkid 2>/dev/null || true
dmesg -T | grep -Ei 'md|raid|I/O error|medium error|reset|failed|degraded' | tail -120
```

For each member, also inspect SMART/NVMe health through `storage/chunks/smart.md` when media failure is suspected.

## Condition map

| Evidence | Safe next action |
|---|---|
| Array degraded but active, one member failed/missing | verify backup and member identity; inspect replacement disk health/capacity before any add/remove operation |
| Rebuild/resync already running | monitor progress, I/O errors and remaining member health; avoid unnecessary restarts or concurrent destructive work |
| Array inactive/not assembled | compare superblock metadata and member event counters before any assembly; do not force assembly blindly |
| Multiple members missing/failing | stop write-oriented recovery; preserve evidence and escalate to recovery planning |
| Replacement requested | use stable device identity/serial/WWN, confirm size and role, then plan removal/add/rebuild with explicit rollback/recovery notes |
| Filesystem errors after array recovery | first prove array stability, then route filesystem repair/growth to `filesystem-health.md` |

## Safe workflow

1. Identify RAID level, md device, members and current state.
2. Verify backup/recovery status and workload criticality.
3. Map every member by stable identity, not only `/dev/sdX` names.
4. Inspect failed/suspect media health before rebuild decisions.
5. Avoid writes while metadata/member ordering is uncertain.
6. If replacing a member, confirm the surviving members are healthy enough to tolerate rebuild load.
7. Monitor rebuild/resync and kernel/storage errors.
8. Validate array health and then filesystem/LVM consumers.

## Hard boundaries

Do not:
- use `mdadm --assemble --force` without metadata/event-counter evidence and a recovery plan;
- recreate an array over existing members to "fix" assembly;
- zero superblocks before proving which member is stale;
- treat RAID as a backup;
- start a rebuild when another surviving member is showing serious media errors unless recovery risk is explicitly accepted;
- use unstable device names when serial/WWN/by-id identity is available.

## Validation

```bash
cat /proc/mdstat
mdadm --detail /dev/mdX
lsblk -o NAME,SIZE,TYPE,FSTYPE,MOUNTPOINTS,MODEL,SERIAL
dmesg -T | grep -Ei 'md|raid|I/O error|medium error|reset|failed|degraded' | tail -80
```

Return: array state, member map, risk level, safe next action, recovery/rollback plan and validation. Keep evidence bounded.
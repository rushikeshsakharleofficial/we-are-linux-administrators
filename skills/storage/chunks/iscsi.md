# iSCSI initiator and LUN mapping

Use this chunk only when storage evidence shows an iSCSI initiator/session/target/LUN problem. Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`.

## Evidence first

Collect the smallest useful view before login/logout or mapping changes:

```bash
cat /etc/iscsi/initiatorname.iscsi 2>/dev/null || true
iscsiadm -m session 2>/dev/null || true
iscsiadm -m node 2>/dev/null | head -80 || true
lsblk -o NAME,TYPE,SIZE,FSTYPE,MOUNTPOINTS,WWN,SERIAL
ls -l /dev/disk/by-path 2>/dev/null | grep -i iscsi | head -80 || true
multipath -ll 2>/dev/null | head -120 || true
dmesg -T | grep -Ei 'iscsi|scsi|session|connection|reject|timeout|I/O error' | tail -100
```

Also establish target portal, initiator IQN, expected target IQN/LUN, CHAP/auth method if used, network path, and whether device-mapper multipath is part of the design.

## Condition map

- No discovery/login: prove TCP reachability and target ACL/auth facts before changing initiator records.
- Session exists but LUN is absent: compare target presentation, session details and stable by-path/by-id mappings before rescans.
- LUN appears on multiple paths: do not mount/use raw path devices; load `multipath.md` if multipath is intended.
- Existing filesystem/LVM sits on the LUN: map the full chain before logout, rescan, resize or replacement.
- New LUN: never write a filesystem/signature until WWID/LUN identity and ownership are proven.

## Safe workflow

1. Identify initiator IQN, target portal/IQN and expected LUN.
2. Confirm network reachability without changing storage state.
3. Review discovery/session/node state.
4. Map target/LUN -> stable device ID -> multipath map (if any) -> LVM/filesystem/mount.
5. Define rollback/guarded recovery before login/logout, rescan or persistence changes.
6. Make one narrow change.
7. Validate session state, stable identity, path count and upper-layer storage use.

## Dangerous boundaries

Do not blindly log out active sessions, delete node records, rescan production HBAs repeatedly, write to newly presented devices, rely on `/dev/sdX`, or present the same writable LUN through uncontrolled duplicate paths. If disconnecting the session could remove a mounted filesystem, swap, database volume, LVM PV or root dependency, require an explicit outage/recovery plan first.

## Validation

```bash
iscsiadm -m session 2>/dev/null || true
lsblk -o NAME,TYPE,SIZE,FSTYPE,MOUNTPOINTS,WWN,SERIAL
findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS
multipath -ll 2>/dev/null | head -120 || true
dmesg -T | tail -80
```

Output the proven session/LUN map, risk, narrow remediation, rollback and validation. Keep secrets such as CHAP credentials out of logs and responses.

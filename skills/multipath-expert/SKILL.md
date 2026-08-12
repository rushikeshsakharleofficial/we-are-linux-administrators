---
name: multipath-expert
description: Expert Linux multipath device mapping, path-health and ALUA troubleshooting, WWID review, failover analysis, and safe SAN storage recovery. Use for device-mapper multipath issues, failed or ghost paths, path-priority problems, duplicate-device risk, and storage-path validation before filesystem or LVM changes.
---

# multipath-expert

Use this skill for Linux multipath device mapping, path health, ALUA behavior, WWID review, failover symptoms, and safe SAN storage troubleshooting.

## Universal Skill Execution Contract

Follow `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` for security/facts checks, architecture fit, backup/disaster planning, rollback or guarded rollback, validation, and token-bounded output before recommending or applying changes.

## Purpose

Keep SAN paths resilient while avoiding duplicate-device and data-corruption risks.

## Evidence first

Ask for multipath map summary, WWID, underlying paths, vendor/model, active path policy, and related iSCSI/FC context.

## Safe workflow

1. map WWID to filesystem/LVM usage
2. confirm all paths and priorities
3. identify failed or ghost paths
4. avoid filesystem actions until mapping is proven
5. coordinate with storage team when needed
6. document rollback

## Anti-patterns

- mounting raw path devices instead of multipath devices
- flushing maps without usage check
- mixing LVM on path devices and multipath devices
- ignoring path grouping policy

## Output format

Return path map, health summary, risk level, safe fix, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for one multipath map and its path list, not the full storage tree.

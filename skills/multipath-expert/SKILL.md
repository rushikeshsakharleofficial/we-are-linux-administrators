# multipath-expert

Use this skill for Linux multipath device mapping, path health, ALUA behavior, WWID review, failover symptoms, and safe SAN storage troubleshooting.

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

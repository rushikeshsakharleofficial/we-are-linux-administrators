# raid-expert

Use this skill for Linux RAID and mdadm diagnostics, degraded arrays, rebuild planning, disk replacement, metadata review, and safe recovery decisions.

## Purpose

Protect data while diagnosing array health, rebuild risk, and replacement workflow.

## Evidence first

Ask for array status, member devices, filesystem/mount point, SMART health summary, backup status, and recent kernel messages.

## Safe workflow

1. identify array level and members
2. verify backup and criticality
3. inspect failed/missing devices
4. avoid writes during unclear recovery states
5. plan replacement or rebuild carefully
6. validate array and filesystem health
7. document rollback and risk

## Anti-patterns

- forcing assembly without metadata evidence
- rebuilding before checking backups and disk health
- mixing disks by path without stable IDs
- treating RAID as a backup

## Output format

Return array state, risk level, safe next action, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for array status, member list, and short kernel/storage log window instead of all disk output.

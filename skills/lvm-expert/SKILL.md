# lvm-expert

Use this skill for Linux LVM discovery, PV/VG/LV planning, safe LV growth, snapshot planning, thin pool review, and rollback-aware storage changes.

## Purpose

Handle LVM changes with filesystem awareness, backup awareness, and explicit rollback planning.

## Use when

- extending an LV
- planning snapshots
- investigating full or thin volumes
- mapping devices to filesystems
- reviewing VG free space
- planning storage migration

## Evidence first

Ask for logical volume summary, volume group free space, filesystem type, mount point, backup status, and application impact window.

## Safe workflow

1. map block device to LV and mount point
2. confirm filesystem type and online resize support
3. verify VG free space or new PV plan
4. verify backup or snapshot requirement
5. prefer growth over shrink
6. validate after resize
7. document rollback and residual risk

## Anti-patterns

- shrinking without tested backup and filesystem support
- changing storage and app config in the same step
- ignoring thin-pool usage
- assuming xfs and ext filesystems resize the same way
- making LVM changes without device mapping evidence

## Output format

Return LV map, risk level, safe plan, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for only LV/VG/PV summaries, mount output for the target, and filesystem type instead of full storage dumps.

# lvm-expert

Use this skill for PV/VG/LV discovery, safe LV growth, snapshot planning, thin pool review, filesystem-aware resizing, and rollback-aware storage changes.

## Purpose

Handle LVM changes with filesystem awareness, backup awareness, and explicit rollback planning.

## Evidence first

Ask for LV/VG/PV summary, mount point, filesystem type, free space, backup status, and impact window.

## Safe workflow

1. map block device to LV and mount point
2. confirm filesystem type and online resize support
3. verify VG free space or new PV plan
4. verify backup or snapshot requirement
5. prefer growth over shrink
6. validate after resize
7. document rollback

## Anti-patterns

- shrinking without tested backup
- ignoring thin-pool usage
- assuming XFS and ext filesystems resize the same way
- making changes without device mapping evidence

## Output format

Return LV map, risk level, safe plan, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for LV/VG/PV summaries, target mount output, and filesystem type only.

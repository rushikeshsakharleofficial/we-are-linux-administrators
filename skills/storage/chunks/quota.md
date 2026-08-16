# Filesystem quotas

Use this chunk only after `storage/SKILL.md` proves the condition is quota accounting, enforcement, grace-period, or project-quota related.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Quota changes can cause immediate write failures, so collect read-only evidence first, identify filesystem type and current usage, back up persistent config, plan maintenance for disruptive accounting rebuilds, and validate before tightening limits.

## Scope

Covers user/group/project quotas on ext4 and XFS, including quota mount options, `quotaon`/`quotaoff`, `quotacheck`, `repquota`, `edquota`, `setquota`, XFS project quotas, grace periods, inode limits and block limits.

## Evidence first

```bash
findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS 2>/dev/null || true
repquota -avug 2>/dev/null || true
quotaon -p -a 2>/dev/null || true
xfs_quota -x -c 'state' -c 'report' / 2>/dev/null || true
grep -RhsE 'usrquota|grpquota|prjquota|uquota|gquota|pquota|quota' /etc/fstab /etc/projects /etc/projid 2>/dev/null || true
df -hT
df -ih
```

Determine the exact target mount and filesystem before choosing commands. ext4/classic quota workflows and XFS quota workflows are not interchangeable.

## Condition branches

| Evidence | Action |
|---|---|
| ext4/classic user or group quota | inspect mount options, accounting files/state, `repquota`, then use `edquota`/`setquota` only after current usage is known |
| XFS user/group quota | use `xfs_quota` state/report and XFS-specific quota mount semantics |
| XFS project quota | verify `/etc/projects` and `/etc/projid`, project mapping, mount option/state, then set project limits |
| grace-period complaint | inspect soft/hard limits and grace timers before changing policy |
| writes fail despite free space | compare block/inode quota usage against `df -hT` and `df -ih`; do not treat it as generic filesystem-full pressure |
| quota accounting appears stale | plan `quotacheck`/rebuild with maintenance awareness; do not run disruptive rebuilds blindly on busy production filesystems |

## Safety boundaries

- Do not run `quotaoff` or quota-accounting rebuilds on busy production filesystems without a maintenance/recovery plan.
- Do not set a hard block or inode limit below current usage without explicitly warning that writes may fail immediately.
- Back up `/etc/fstab`, `/etc/projects`, `/etc/projid`, and any distro/filesystem-specific quota config before persistent edits.
- For remote systems, avoid reboot/remount changes unless rollback/out-of-band access is available.

## Safe workflow

1. Identify filesystem and exact mount.
2. Capture current usage and quota state.
3. Determine whether the issue is accounting, policy, grace period, project mapping, or mount options.
4. Back up persistent config before editing.
5. Apply the smallest change.
6. Validate quota state plus actual application writes where safe.

## Validation

```bash
findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS
repquota -avug 2>/dev/null || true
quotaon -p -a 2>/dev/null || true
xfs_quota -x -c 'state' -c 'report' <mount> 2>/dev/null || true
df -hT <mount>
df -ih <mount>
```

For consequential policy changes, record the prior soft/hard/inode/grace values so rollback is exact rather than guessed.

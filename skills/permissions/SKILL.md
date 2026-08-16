---
name: "permissions"
description: "Troubleshoot Linux object-access failures by classifying POSIX ownership/modes, ACLs, mount policy, SELinux/AppArmor, and service sandboxing, then loading only the matching condition chunk or specialist."
argument-hint: "[path/user/service/permission denied]"
effort: "high"
allowed-tools: "Read Grep Glob Bash"
---
# permissions

Use for filesystem/object access failures such as `Permission denied`, service read/write failures, path traversal problems, ACL surprises, or access that appears correct in mode bits but is denied by another layer.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Begin read-only, collect bounded evidence, record current state before permission changes, define rollback before recursive or production changes, preserve remote/service access safety, and validate the exact user/service path afterwards.

## Baseline evidence

```bash
id <user> 2>/dev/null || id
namei -om /path/to/object
stat -c '%n %U:%G %a %A %F' /path/to/object 2>/dev/null || true
getfacl -p /path/to/object 2>/dev/null || true
findmnt -T /path/to/object -o TARGET,SOURCE,FSTYPE,OPTIONS 2>/dev/null || true
systemctl show <unit> -p User,Group,DynamicUser,ProtectSystem,ProtectHome,ReadWritePaths,ReadOnlyPaths,NoNewPrivileges 2>/dev/null || true
getenforce 2>/dev/null || true
ls -lZ /path/to/object 2>/dev/null || true
journalctl -k -g 'AVC|SELinux|apparmor|DENIED|audit' -n 80 --no-pager 2>/dev/null || true
```

## Condition -> next content

| Evidence/condition | Load |
|---|---|
| Wrong owner/group/mode, missing directory `x`, umask, sticky/setgid/setuid, scoped recursive mode issue | `chunks/posix-modes.md` |
| Named-user/group ACL, ACL mask, default inheritance, `#effective:` mismatch | `chunks/acl.md` |
| SELinux AVC/context/port-label problem | `selinux-expert` |
| AppArmor profile denial | `apparmor-expert` |
| Mount is `ro` or access depends on storage/mount health | `storage` |
| Login/account/group/sudo/PAM/SSH identity problem rather than object access | `auth` or `user-permissions-expert` as appropriate |
| systemd sandbox blocks otherwise-correct access | `systemd-expert` after confirming `Protect*`/`ReadWritePaths=` evidence |
| NFS/Samba remote permission semantics | matching `nfs-expert`/`samba-expert` after local layers are ruled out |

Default: **one parent + one matching chunk/specialist**. Load a second only when evidence proves two layers are independently involved.

## Fast interpretation

- Parent directory lacks execute/search permission -> POSIX chunk.
- Mode bits look permissive but named ACL shows restricted effective rights -> ACL chunk.
- Mount is read-only -> storage issue, not a chmod problem.
- SELinux/AppArmor denial exists -> fix MAC policy/context; do not weaken POSIX modes to compensate.
- Service has `ProtectSystem=strict` or restrictive `ReadWritePaths=` -> systemd sandbox issue.

## Safe rules

Never suggest `chmod -R 777`, permanent `setenforce 0`, global AppArmor disablement, or broad recursive ownership changes as diagnosis shortcuts. Prefer the narrowest ownership/group/ACL or policy change that expresses the required access.

## Validation

```bash
sudo -u <user> test -r /path/to/object && echo readable
sudo -u <user> test -w /path/to/object && echo writable
namei -om /path/to/object
getfacl -p /path/to/object 2>/dev/null || true
journalctl -k -g 'AVC|apparmor|DENIED' --since '5 minutes ago' --no-pager 2>/dev/null | tail -80 || true
```

For state-changing fixes, report facts, selected layer/chunk, smallest change, backup/rollback path, validation, and any remaining cross-layer risk.

---
name: acl-permissions-expert
description: Expert Linux POSIX ACL diagnostics and design using getfacl/setfacl, effective masks, default ACL inheritance, named users/groups, ACL backup/restore, and ACL-vs-mode conflict prevention.
---

# acl-permissions-expert

Act as a senior Linux administrator for POSIX ACLs. Use this skill when normal owner/group/other permissions are not enough, when multiple users/services need different access to the same path, or when `getfacl` shows unexpected effective permissions.

## Core rules

1. Use ACLs to express extra access, not to hide a broken ownership model.
2. Always inspect the ACL mask; it limits effective permissions for named users/groups and group class.
3. Use default ACLs on directories only when new children need inherited permissions.
4. Back up ACLs before bulk changes.
5. Do not combine broad `chmod` with ACL changes without understanding mask recalculation.
6. If simple group ownership solves the issue, prefer group ownership over complex ACLs.

## Read-only first

```bash
getfacl -p /path/to/file
getfacl -p /path/to/dir
stat -c '%n %U:%G %a %A' /path/to/dir /path/to/file
namei -l /path/to/file
findmnt -T /path -o TARGET,FSTYPE,OPTIONS
```

## ACL model

ACL entries commonly include:

```text
user::rwx              owner permissions
user:alice:r-x         named user permissions
group::r-x             owning group permissions
group:ops:rwx          named group permissions
mask::r-x              maximum effective permissions for group/named entries
other::---             everyone else
default:user/group/... inherited by new children under a directory
```

If `getfacl` shows `#effective:r--`, the requested ACL entry is being limited by the mask.

## Safe ACL workflow

```bash
getfacl -Rp /srv/app > /root/acl-backup-srv-app.$(date +%F-%H%M%S).acl
setfacl -m g:appops:rx /srv/app
getfacl -p /srv/app
# restore if needed
setfacl --restore=/root/acl-backup-srv-app.YYYY-MM-DD-HHMMSS.acl
```

## Default ACL pattern

For a shared application directory where new files must be accessible to a group:

```bash
setfacl -m g:appops:rwx /srv/app/shared
setfacl -d -m g:appops:rwx /srv/app/shared
setfacl -m m:rwx /srv/app/shared
```

Default ACLs affect new files/directories created after the change. They do not automatically rewrite existing children.

## ACL vs chmod interaction

- `chmod` can update the ACL mask.
- The ACL mask can make named ACL entries less powerful than they look.
- `setfacl -m m:rwx` explicitly adjusts the mask.
- Removing all extended ACLs: `setfacl -b /path`.
- Removing only default ACLs: `setfacl -k /directory`.

## When not to use ACLs

| Situation | Better approach |
|---|---|
| One owner and one group are enough | `chown`, `chgrp`, `chmod` |
| Service needs private writable state | service account + ownership |
| Global web upload directory | app-level design + restrictive ownership |
| SELinux denial | fix SELinux context/policy, not ACL |
| NFS/CIFS semantics unclear | verify mount/export ACL support first |

## Output format

```text
Path and required access:
Current POSIX mode:
Current ACL:
Mask/effective permission analysis:
Recommended ACL:
Why ACL is justified:
Commands:
Validation:
Backup/restore rollback:
```

# POSIX ACLs

Use this chunk after `permissions/SKILL.md` identifies an extended ACL, ACL mask, default ACL inheritance, or named-user/group access problem.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Keep evidence bounded, verify ownership/mode/ACL/security context before changes, prefer a simple group model when it fits, back up ACL state before bulk edits, include rollback, and validate effective permissions after remediation.

## Read-only evidence

```bash
getfacl -p /path/to/file
getfacl -p /path/to/dir
stat -c '%n %U:%G %a %A' /path/to/dir /path/to/file
namei -l /path/to/file
findmnt -T /path -o TARGET,FSTYPE,OPTIONS
```

## ACL model

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

## Rules

1. Use ACLs to express extra access, not to hide a broken ownership model.
2. Always inspect the ACL mask; it limits effective permissions for named users/groups and the group class.
3. Use default ACLs only when new children need inherited permissions.
4. Back up ACLs before bulk changes.
5. Do not combine broad `chmod` with ACL edits without understanding mask recalculation.
6. Prefer ordinary group ownership when one owner/one group is enough.

## Safe workflow

```bash
getfacl -Rp /srv/app > /root/acl-backup-srv-app.$(date +%F-%H%M%S).acl
setfacl -m g:appops:rx /srv/app
getfacl -p /srv/app
# rollback when needed:
setfacl --restore=/root/acl-backup-srv-app.YYYY-MM-DD-HHMMSS.acl
```

For inherited access on a shared directory:

```bash
setfacl -m g:appops:rwx /srv/app/shared
setfacl -d -m g:appops:rwx /srv/app/shared
setfacl -m m:rwx /srv/app/shared
```

Default ACLs affect new children; they do not rewrite existing files/directories.

Useful interactions:

- `chmod` can update the ACL mask.
- `setfacl -m m:rwx` explicitly adjusts the mask.
- `setfacl -b /path` removes extended ACLs.
- `setfacl -k /directory` removes only default ACLs.

## When ACL is the wrong layer

| Situation | Better path |
|---|---|
| One owner and one group are enough | `chown`/`chgrp`/`chmod` and the POSIX modes chunk |
| Service needs private writable state | service account + narrow ownership |
| SELinux/AppArmor denial | fix MAC context/profile, not ACL |
| NFS/CIFS semantics are unclear | verify server/export/mount ACL support first |

## Validation

```bash
getfacl -p /path/to/object
sudo -u <user> test -r /path/to/object && echo readable
sudo -u <user> test -w /path/to/object && echo writable
```

Report the current POSIX mode, ACL and mask/effective-permission analysis, why ACL is justified, minimal change, ACL backup/restore path and validation.
---
name: file-permissions-expert
description: Expert POSIX file ownership and mode diagnostics including chmod/chown/chgrp/stat/namei/umask, setuid/setgid/sticky bits, directory traversal, safe recursive changes, and least-privilege remediation.
---

# file-permissions-expert

Act as a senior Linux administrator for POSIX file permissions. Use this skill for `Permission denied`, wrong ownership, mode bits, directory traversal, umask, setuid/setgid/sticky bits, shared directories, web/app ownership, and safe recursive remediation.

## Core rules

1. Diagnose before changing: owner, group, mode, ACL, SELinux/AppArmor, mount flags, process user.
2. Directories need execute/search bit for traversal; files need read/write/execute according to use.
3. Never use `chmod -R 777` as a fix.
4. Recursive ownership/mode changes require target preview, boundary control, and rollback.
5. Preserve special bits deliberately; do not clear/set setuid/setgid/sticky blindly.
6. Prefer group/ACL design over world-writable access.

## Read-only first

```bash
id
id <service-user>
ps -eo user,group,comm,args | grep -E '<process>|<service>'
namei -l /full/path/to/resource
stat -c '%n %U:%G %a %A %F' /path /path/to/file
getfacl -p /path/to/file 2>/dev/null || true
findmnt -T /path -o TARGET,SOURCE,FSTYPE,OPTIONS
ls -ldZ /path /path/to/file 2>/dev/null || ls -ld /path /path/to/file
```

## Permission mental model

```text
Path access = every parent directory needs execute/search permission.
File read = read bit or ACL read on file.
File write = write bit or ACL write on file; directory write controls create/delete/rename.
Directory list = read bit; directory enter = execute bit.
Delete file = write+execute on parent directory, not necessarily write on file.
```

## Common patterns

### Web app writable directory

```bash
install -d -o root -g webapp -m 2775 /var/www/app/storage
usermod -aG webapp nginx   # or apache/www-data depending distro
```

Setgid (`2` in `2775`) on a directory helps new files inherit the directory group.

### Shared team directory

```bash
groupadd projectx
install -d -o root -g projectx -m 2770 /srv/projectx
chmod g+s /srv/projectx
```

Use ACL defaults if multiple users/services need predictable inherited access.

### Sticky bit directory

For world-writable shared directories such as `/tmp`, sticky bit prevents users from deleting other users' files:

```bash
chmod 1777 /tmp
```

Do not apply `1777` to application directories unless there is a clear multi-user temporary-file requirement.

## Safe recursive workflow

```bash
find /target -xdev -maxdepth 3 -printf '%M %u:%g %p\n' | sed -n '1,120p'
find /target -xdev -not -user expected -o -not -group expected | sed -n '1,120p'
# then apply only scoped changes
find /target -xdev -type d -exec chmod 2775 {} +
find /target -xdev -type f -exec chmod 0664 {} +
```

Always separate directory and file modes; executable bits mean different things on files and directories.

## Decision tree

| Symptom | Likely check |
|---|---|
| User can see file but not open | file read bit/ACL/SELinux |
| User cannot enter directory | execute bit on directory or parent path |
| App cannot create file | parent directory write+execute, owner/group/ACL, mount RO |
| File delete denied | parent directory permissions or sticky bit |
| Script won't execute | execute bit, shebang path, mount `noexec`, interpreter permissions |
| Permission OK but still denied | SELinux/AppArmor, NFS root squash, capabilities, service sandbox |

## Output format

```text
Path/process/user:
Current ownership/mode evidence:
Traversal evidence:
ACL/security-layer evidence:
Required access:
Minimal permission change:
Why this value:
Validation:
Rollback:
```

# POSIX modes and ownership

Use this chunk after `permissions/SKILL.md` identifies a POSIX ownership, mode-bit, traversal, umask, setuid/setgid/sticky-bit, or scoped recursive-permission problem.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Start read-only, record current state before changing it, keep recursive scope narrow and filesystem-bounded, define rollback first, and validate both access and service behaviour afterwards.

## Read-only evidence

```bash
id
id <service-user> 2>/dev/null || true
ps -eo user,group,comm,args | grep -E '<process>|<service>' | head -80
namei -l /full/path/to/resource
stat -c '%n %U:%G %a %A %F' /path /path/to/file
getfacl -p /path/to/file 2>/dev/null || true
findmnt -T /path -o TARGET,SOURCE,FSTYPE,OPTIONS
ls -ldZ /path /path/to/file 2>/dev/null || ls -ld /path /path/to/file
```

## Mental model

```text
Every parent directory needs execute/search permission for traversal.
File read/write/execute depends on the file mode or ACL.
Directory read lists names; directory execute enters/traverses it.
Create/delete/rename depends mainly on write+execute on the parent directory.
A script may still fail with correct mode bits because of shebang/interpreter access, mount noexec, ACL, MAC policy, or service sandboxing.
```

## Condition table

| Symptom | Check first |
|---|---|
| User can see a file but cannot open it | file read bit, ACL, SELinux/AppArmor |
| User cannot enter a directory | execute/search bit on that directory or a parent |
| App cannot create a file | parent write+execute, owner/group/ACL, mount `ro` |
| Delete denied | parent directory permissions or sticky bit |
| Script will not execute | execute bit, shebang/interpreter path, mount `noexec` |
| Modes look correct but access still fails | ACL, SELinux/AppArmor, NFS root squash, capabilities, systemd sandbox |

## Safe patterns

Prefer group design over world-writable access.

```bash
install -d -o root -g webapp -m 2775 /var/www/app/storage
install -d -o root -g projectx -m 2770 /srv/projectx
chmod g+s /srv/projectx
```

Setgid on a shared directory helps new files inherit the directory group. Use sticky bit only where multi-user temporary semantics genuinely require it, for example `/tmp`:

```bash
chmod 1777 /tmp
```

Do not apply `1777` to normal application directories.

## Scoped recursive changes

Preview before changing anything:

```bash
find /target -xdev -maxdepth 3 -printf '%M %u:%g %p\n' | sed -n '1,120p'
find /target -xdev \( -not -user expected -o -not -group expected \) -print | sed -n '1,120p'
```

If a recursive change is genuinely required, separate directory and file modes and preserve special bits deliberately:

```bash
find /target -xdev -type d -exec chmod 2775 {} +
find /target -xdev -type f -exec chmod 0664 {} +
```

Never use `chmod -R 777` as a fix. Never run broad ownership/mode changes from `/`, `/etc`, `/var`, or `/home` without exact scope, preview, backup/recorded state, and rollback.

## Validation

```bash
sudo -u <user> test -r /path/to/object && echo readable
sudo -u <user> test -w /path/to/object && echo writable
sudo -u <user> test -x /path/to/object && echo executable
namei -l /path/to/object
stat -c '%n %U:%G %a %A' /path/to/object
```

Report the current ownership/mode evidence, traversal evidence, required access, smallest change, rollback and validation.
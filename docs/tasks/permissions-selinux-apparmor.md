# Task: Permissions, ACLs, SELinux, AppArmor

## When to use

Use for `Permission denied`, service cannot read/write path, web app works only with SELinux disabled, AppArmor denial, sudo access issue, ACL/path traversal problems.

## Mental model

Check access in layers:

1. User identity and groups.
2. File ownership/mode bits.
3. Directory traversal permissions.
4. POSIX ACLs.
5. Mount options (`ro`, `noexec`, `nosuid`, `nodev`).
6. SELinux/AppArmor/MAC policy.
7. Application sandboxing/systemd hardening.

Do not jump to `chmod 777` or `setenforce 0`.

## Read-only first commands

```bash
id <user> 2>/dev/null || id
getent passwd <user> 2>/dev/null || true
getent group <group> 2>/dev/null || true
namei -om /path/to/object
ls -ld / /path /path/to /path/to/object 2>/dev/null || true
getfacl -p /path/to/object 2>/dev/null || true
findmnt -no TARGET,SOURCE,FSTYPE,OPTIONS /path/to/object 2>/dev/null || true
systemctl show <unit> -p User,Group,DynamicUser,ProtectSystem,ProtectHome,ReadWritePaths,ReadOnlyPaths,NoNewPrivileges 2>/dev/null || true
getenforce 2>/dev/null || true
sestatus 2>/dev/null || true
ls -lZ /path/to/object 2>/dev/null || true
ausearch -m AVC -ts recent 2>/dev/null || true
journalctl -k -g 'AVC|SELinux|apparmor|DENIED|audit' --no-pager 2>/dev/null | tail -100 || true
aa-status 2>/dev/null || true
```

## Branch interpretation

| Signal | Meaning | Next branch |
|---|---|---|
| Parent directory lacks `x` for user/group | path traversal denial | fix parent execute permission/ownership narrowly |
| ACL denies despite mode bits | ACL override | adjust ACL intentionally |
| Mount has `ro` | filesystem mounted read-only | storage workflow |
| Mount has `noexec` and app executes there | mount policy issue | relocate binary or change mount after confirmation |
| SELinux AVC with wrong file context | label issue | use `restorecon` or semanage fcontext pattern |
| SELinux AVC for nonstandard port | port labeling issue | use `semanage port` after confirmation |
| AppArmor DENIED | profile blocks operation | check complain/enforce and profile rule |
| systemd `ProtectSystem=strict` | service sandbox blocks path | use `ReadWritePaths=` drop-in if appropriate |

## Safe remediation patterns

### POSIX permission fix

Use narrow scope. Avoid recursive broad changes.

```bash
chown <owner>:<group> /exact/path
chmod u+rwX,g+rX /exact/path
setfacl -m u:<user>:rX /exact/path
```

### SELinux label restore

If labels are wrong and path has known default policy:

```bash
restorecon -Rv /exact/path
```

For persistent custom path label after confirmation:

```bash
semanage fcontext -a -t <type> '/custom/path(/.*)?'
restorecon -Rv /custom/path
```

For nonstandard port after confirmation:

```bash
semanage port -a -t <type> -p tcp <port>
```

### AppArmor

Do not globally disable AppArmor. Use profile-specific diagnostics:

```bash
aa-status
journalctl -k -g 'apparmor="DENIED"' --no-pager
```

If needed, temporarily complain mode for one profile only after confirmation:

```bash
aa-complain /etc/apparmor.d/<profile>
```

## Validation

```bash
sudo -u <user> test -r /path/to/object && echo readable
sudo -u <user> test -w /path/to/object && echo writable
journalctl -k -g 'AVC|apparmor|DENIED' --since '5 minutes ago' --no-pager
systemctl restart <unit>   # confirmation required if needed
```

## Anti-patterns

Never suggest:

- `chmod -R 777`.
- Permanent `setenforce 0` as a fix.
- `audit2allow` as the first response.
- Disabling AppArmor globally.
- Recursive ownership changes from `/`, `/var`, `/etc`, `/home` without exact scope.

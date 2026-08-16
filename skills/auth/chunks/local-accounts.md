# Local accounts and access lifecycle

Use this chunk when evidence points to local user/group lifecycle, account state, shell/session eligibility, local service accounts, or group-based access. Do not use it for ordinary file ownership/mode/ACL problems; route those to `permissions`.

## Safety contract

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Start read-only. For access removal, preserve business data and recovery access. Never edit `/etc/passwd`, `/etc/shadow`, or `/etc/group` directly when safer account tools exist.

## Evidence first

```bash
id <user> 2>/dev/null || true
getent passwd <user> 2>/dev/null || true
getent group <group> 2>/dev/null || true
getent shadow <user> 2>/dev/null | cut -d: -f1,2,8 || true
passwd -S <user> 2>/dev/null || true
chage -l <user> 2>/dev/null || true
lastlog -u <user> 2>/dev/null || true
last -F <user> 2>/dev/null | head
sudo -l -U <user> 2>/dev/null || true
```

First identify the identity source: local files, SSSD/LDAP/AD, NIS, or a container/user namespace. If `getent` resolves a directory-backed identity, use `sssd-ldap.md` rather than changing local account files.

## Access model

```text
Can user exist?           getent passwd / NSS
Can user authenticate?    shadow/PAM/SSSD/SSH keys
Can user start a session? shell, PAM, account expiry, sshd allow/deny policy
Can user become root?     sudoers, wheel/sudo group, polkit
Can user read/write file? ownership/mode/ACL/SELinux/AppArmor -> permissions/MAC
Can service use limit?    systemd Limit*; PAM limits may not apply
```

## Safe lifecycle patterns

### Human administrator

```bash
useradd -m -s /bin/bash <user>
passwd <user>
usermod -aG wheel <user>       # RHEL family when wheel is authorised
usermod -aG sudo <user>        # Debian/Ubuntu when sudo group is authorised
sudo -l -U <user>
```

Prefer role/group-based privilege rather than broad per-user `NOPASSWD: ALL`.

### Service account

```bash
useradd --system --home-dir /var/lib/<app> --shell /usr/sbin/nologin <app>
install -d -o <app> -g <app> -m 0750 /var/lib/<app>
```

Service accounts should normally have no interactive shell, minimal ownership and only required access.

### Offboarding

Lock/revoke before destructive deletion:

```bash
passwd -l <user>
usermod -L <user>
chage -E 0 <user>
```

Before `userdel -r`, review running processes, sessions, cron, user units, sudo rights, SSH keys/tokens and files owned by the account. Do not destroy business data merely because the login is being removed.

## Common interpretations

| Symptom | Check next |
|---|---|
| local user missing | `getent passwd`, `/etc/passwd`, identity source |
| account locked/expired | `passwd -S`, `chage -l`, PAM/account policy |
| group change not active | new login/session; compare `id` in affected session |
| locked user still has processes | sessions, `ps -u`, cron, systemd user units |
| service cannot write a path | hand off to `permissions`/SELinux/AppArmor |
| sudo rights wrong | `sudoers.md` |

## Validation

Re-run `getent`, `id`, `passwd -S`/`chage`, expected login/session check and least-privilege test. Preserve a rollback path for any access removal.
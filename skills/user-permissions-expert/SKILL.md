---
name: user-permissions-expert
description: Expert Linux identity and access management for local users, groups, sudo, PAM/session limits interaction, account lifecycle, SSH login rights, locked accounts, service accounts, and least-privilege design.
---

# user-permissions-expert

Act as a senior Linux administrator for user, group, sudo, PAM, and service-account access. Use this skill for account creation, access removal, group membership, sudo rights, shell/login restrictions, user lockouts, least privilege, and audit trails.

## Core rules

1. Identify the user database first: local `/etc/passwd`, LDAP/SSSD, AD, NIS, or container namespace.
2. Never edit `/etc/passwd`, `/etc/shadow`, `/etc/group`, or sudoers directly without safer tools/backups.
3. Use `visudo -c` for sudoers validation.
4. Prefer groups and sudoers drop-ins over broad direct user privileges.
5. Distinguish authentication, authorization, shell/login, sudo, file permissions, and service manager restrictions.
6. For offboarding, lock first, revoke sessions/keys/tokens, then archive/remove later according to policy.

## Read-only first

```bash
id <user>
getent passwd <user>
getent group <group>
getent shadow <user> 2>/dev/null | cut -d: -f1,2,8
passwd -S <user> 2>/dev/null || true
chage -l <user> 2>/dev/null || true
lastlog -u <user> 2>/dev/null || true
last -F <user> | head
sudo -l -U <user> 2>/dev/null || true
sssd? # check only if present: systemctl status sssd, getent via NSS
```

## Access model

```text
Can user exist?           getent passwd / NSS
Can user authenticate?    shadow/PAM/SSSD/SSH keys
Can user start a session? shell, PAM, AllowUsers/AllowGroups, account expiry
Can user become root?     sudoers, wheel/admin group, polkit
Can user read/write file? ownership/mode/ACL/SELinux/AppArmor
Can service use limit?    systemd Limit*, PAM limits usually not enough
```

## User lifecycle patterns

### Create human admin safely

```bash
useradd -m -s /bin/bash <user>
passwd <user>
usermod -aG wheel <user>       # RHEL family if sudoers permits wheel
usermod -aG sudo <user>        # Debian/Ubuntu if sudo group exists
sudo -l -U <user>
```

Use group-based sudo, not `ALL=(ALL) NOPASSWD:ALL` by default.

### Create service account

```bash
useradd --system --home-dir /var/lib/<app> --shell /usr/sbin/nologin <app>
install -d -o <app> -g <app> -m 0750 /var/lib/<app>
```

Service accounts should usually have no interactive shell, minimal home permissions, and only required file ownership.

### Offboard safely

```bash
passwd -l <user>
usermod -L <user>
chage -E 0 <user>
# review before deleting: crontab -l -u <user>, sudo -l -U <user>, find owned files
```

Do not immediately `userdel -r` if the account owns business data, cron, service files, or application paths.

## Sudoers safe workflow

1. Put rules in `/etc/sudoers.d/<role>` with mode `0440`.
2. Use command aliases for narrow privilege.
3. Validate with `visudo -cf /etc/sudoers.d/<role>` and `visudo -c`.
4. Test with `sudo -l -U <user>`.
5. Avoid broad wildcards and dangerous editors/scripts that allow shell escape.

Example narrow rule:

```sudoers
%webops ALL=(root) /bin/systemctl restart nginx, /bin/systemctl reload nginx
```

## Troubleshooting decision tree

| Symptom | Check |
|---|---|
| `Permission denied` over SSH | account exists, shell, password/key, sshd AllowUsers/Groups, PAM, logs |
| user cannot sudo | `sudo -l -U`, group membership, sudoers syntax, command path |
| group change not active | user needs new login/session; check `id` inside that session |
| locked user still has running process | inspect `ps -u`, sessions, crons, systemd user units |
| service cannot write | likely file ownership/mode/ACL/SELinux, not user account only |

## Output format

```text
User/source of identity:
Current rights evidence:
Required access:
Least-privilege design:
Commands/config changes:
Why each change:
Validation:
Rollback/offboarding notes:
```

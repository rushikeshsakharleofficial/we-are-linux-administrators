# User, group, and sudo model

## Identity layers

| Layer | Evidence |
|---|---|
| NSS identity | `getent passwd`, `getent group` |
| Local files | `/etc/passwd`, `/etc/group`, `/etc/shadow` |
| Directory identity | SSSD/LDAP/AD/NIS, visible through `getent` if configured |
| Authentication | PAM, shadow, SSH keys, Kerberos, MFA |
| Authorization | groups, sudoers, SSH AllowUsers/AllowGroups, polkit |
| Resource access | file modes, ACLs, SELinux/AppArmor, systemd sandbox |

## Sudo model

Prefer role groups:

```sudoers
%dbops ALL=(root) /bin/systemctl restart postgresql, /bin/systemctl reload postgresql
```

Avoid:

```sudoers
user ALL=(ALL) NOPASSWD:ALL
```

unless there is an explicit break-glass policy and audit trail.

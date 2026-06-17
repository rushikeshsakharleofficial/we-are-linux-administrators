# Task: Users, SSH, sudo, PAM, LDAP/SSSD

## When to use

Use for login failures, SSH denied, sudo access issue, account locked, group mismatch, PAM, LDAP, SSSD, home directory, shell, expired password, key auth, permission issues.

## Mental model

Authentication failures involve layers:

1. Account exists and is enabled.
2. Password/key accepted by SSH/PAM.
3. PAM/account policy allows login.
4. Shell/home directory valid.
5. Group/sudo policy grants expected privilege.
6. LDAP/SSSD/NSS resolves identity.
7. SSH daemon config permits method/user/group.
8. Filesystem permissions for keys/home are strict enough.

## Read-only first commands

```bash
id <user> 2>/dev/null || true
getent passwd <user> 2>/dev/null || true
getent shadow <user> 2>/dev/null || true
chage -l <user> 2>/dev/null || true
passwd -S <user> 2>/dev/null || true
groups <user> 2>/dev/null || true
sudo -l -U <user> 2>/dev/null || true
sshd -T 2>/dev/null | grep -Ei 'passwordauthentication|pubkeyauthentication|permitrootlogin|allowusers|allowgroups|denyusers|denygroups|authorizedkeysfile'
sshd -t 2>/dev/null && echo sshd_config_ok
journalctl -u sshd -b --no-pager -n 200 2>/dev/null || journalctl -u ssh -b --no-pager -n 200 2>/dev/null || true
ls -ld /home/<user> /home/<user>/.ssh /home/<user>/.ssh/authorized_keys 2>/dev/null || true
namei -om /home/<user>/.ssh/authorized_keys 2>/dev/null || true
getfacl -p /home/<user>/.ssh/authorized_keys 2>/dev/null || true
```

LDAP/SSSD:

```bash
systemctl status sssd --no-pager 2>/dev/null || true
sssctl user-checks <user> 2>/dev/null || true
sssctl domain-list 2>/dev/null || true
getent passwd <user>
getent group <group>
journalctl -u sssd -b --no-pager -n 200 2>/dev/null || true
```

## Branch interpretation

| Signal | Meaning | Next action |
|---|---|---|
| `getent passwd` empty | NSS/LDAP/local user missing | check local vs LDAP/SSSD path |
| account locked/expired | account policy blocks login | unlock/extend only after authorization |
| `sshd -t` fails | SSH config syntax broken | fix config before reload |
| authorized_keys too open | SSH ignores key | fix exact permissions |
| sudo -l missing expected command/group | sudoers/group policy issue | inspect sudoers safely with `visudo -c` |
| SSSD cannot resolve | LDAP/SSSD/cache/domain issue | SSSD logs and domain status |

## Safe remediation patterns

### SSH key permissions

After confirmation:

```bash
chown <user>:<group> /home/<user> /home/<user>/.ssh /home/<user>/.ssh/authorized_keys
chmod 700 /home/<user>/.ssh
chmod 600 /home/<user>/.ssh/authorized_keys
```

### sudoers

Never edit with raw editor without validation. Use:

```bash
visudo -c
visudo -f /etc/sudoers.d/<file>
visudo -c
```

### SSH config

```bash
cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.bak.$(date +%F-%H%M%S)
sshd -t
systemctl reload sshd   # confirmation required
```

## Validation

```bash
sshd -t
sudo -l -U <user>
getent passwd <user>
journalctl -u sshd -b --since '5 minutes ago' --no-pager 2>/dev/null || true
```

## Prevention

- Keep sudoers in config management.
- Test SSH changes before reload.
- Maintain break-glass account and console access.
- Monitor SSSD/LDAP failures.

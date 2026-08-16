# Samba / SMB

Use this chunk only after `storage` proves the problem is Samba/SMB-specific: share access, `smb.conf`, authentication, AD/winbind integration, identity mapping, filesystem permissions, discovery, or SMB client behaviour.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Begin read-only, keep share scope and authentication least-privilege, back up configuration before edits, and validate one user/share/client before wider rollout.

## Evidence

```bash
testparm -s 2>/dev/null | head -180 || true
smbstatus 2>/dev/null | head -120 || true
systemctl --no-pager --full status smb smbd nmb nmbd winbind 2>/dev/null | head -140 || true
journalctl -u smb -u smbd -u winbind -n 100 --no-pager 2>/dev/null || true
getent passwd 2>/dev/null | head -40
getent group 2>/dev/null | head -40
```

Collect one relevant share stanza, backing-path ownership/mode/ACL, one failing username/group, auth mode, Samba version, one exact client error, and whether SELinux/AppArmor is enforcing.

## Diagnose by layer

1. **Configuration syntax** — run `testparm` before restarting/reloading anything.
2. **Share policy** — compare `valid users`, `read list`, `write list`, `guest ok`, `read only`, masks and inheritance settings for the exact share.
3. **Identity/auth** — determine local users vs AD/winbind/SSSD-backed identity. Prove `getent`/mapping before changing ACLs.
4. **Filesystem access** — map SMB identity to the backing filesystem. Samba cannot safely override missing POSIX/ACL/MAC access by making the share globally writable.
5. **SELinux/AppArmor** — if policy denies access, route the policy fix to the MAC specialist; do not disable enforcement as a shortcut.
6. **Client/protocol** — separate authentication failures from SMB dialect/signing/encryption/client-cache issues.
7. **Name/discovery** — do not confuse NetBIOS/WINS/discovery failure with direct `\\server\share` access failure.
8. **Performance/locking** — identify workload, oplock/lease behaviour, filesystem latency and network evidence before tuning global Samba parameters.

## Safe change pattern

- Back up `/etc/samba/smb.conf` and included config files.
- Change one share or one auth rule when possible; avoid broad `[global]` changes for a local symptom.
- Validate with `testparm` before reload/restart.
- Prefer a graceful reload when supported and safe; coordinate restarts if active sessions matter.
- Test one intended user from one client and verify server-side ownership/ACL after a create/rename/delete test.
- Never enable guest write access or `0777` permissions merely to make troubleshooting easier.

## Validation

```bash
testparm -s 2>/dev/null | head -180 || true
smbstatus 2>/dev/null | head -120 || true
```

Confirm the intended user can perform only the allowed actions, an unauthorized user remains denied, identity mapping is stable, and logs show no new auth/config errors.

## Escalate

Escalate when AD trust/domain membership is broken, SID↔UID/GID mapping changes could alter ownership at scale, clustered Samba/CTDB is involved, encryption/signing policy affects compatibility, or a production restart could disconnect a large client population.
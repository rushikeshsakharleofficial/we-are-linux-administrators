# SSSD and LDAP identity path

Use this chunk when directory-backed identity lookup, SSSD/LDAP authentication, NSS/PAM integration, group mapping, access filters, cache behaviour or directory-backed sudo rules are implicated.

## Safety contract

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Preserve local/break-glass access before directory authentication changes. Redact bind passwords, keytabs, tokens and certificates/private keys from evidence. Avoid simultaneous LDAP, PAM and SSH changes.

## Evidence first

```bash
getent passwd <user> 2>/dev/null || true
getent group <group> 2>/dev/null || true
systemctl status sssd --no-pager 2>/dev/null || true
sssctl domain-list 2>/dev/null || true
sssctl user-checks <user> 2>/dev/null || true
journalctl -u sssd -b --no-pager -n 160 2>/dev/null || true
```

Request only a sanitised relevant domain snippet, one affected user/group lookup and a bounded auth log window. Check DNS/time/TLS reachability when the directory path depends on them.

## Diagnostic order

1. Confirm local recovery access.
2. Confirm NSS identity lookup before blaming authentication.
3. Map NSS -> SSSD domain -> LDAP/AD connectivity -> PAM/account policy.
4. Check group mapping and access filters.
5. Check cache state only after upstream health is understood.
6. Inspect sudo rules only if identity resolution is healthy and the failure is privilege delegation.

## Interpretations

| Signal | Likely layer |
|---|---|
| `getent passwd <user>` empty | NSS/SSSD/domain/upstream identity |
| identity resolves but login denied | PAM/access filter/account/SSH policy |
| groups missing/stale | group mapping/cache/directory data |
| intermittent failures around expiry/outage | cache/credential expiry/upstream availability |
| sudo identity resolves but rule absent | SSSD sudo provider or `sudoers.md` |

## Safe remediation rules

- Do not clear SSSD cache reflexively; understand offline-login and outage impact first.
- Do not disable local accounts while testing external identity.
- Back up relevant SSSD configuration before edits and preserve permissions/secrets.
- Validate configuration and service health before closing the recovery session.
- If the real issue is SSH daemon hardening, hand off to `ssh-hardening-expert` rather than weakening SSH globally.

## Validation

Re-run `getent`, `sssctl user-checks`, expected group resolution and the affected login/authorisation test. Confirm local recovery remains available and logs no longer show the original failure.
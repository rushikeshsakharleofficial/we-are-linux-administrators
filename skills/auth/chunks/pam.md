# PAM authentication and session stack

Use this chunk when evidence points to PAM service files, control flags, module ordering, lockout policy, password/account/session phases, or PAM integration with SSH/sudo.

## Safety contract

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. PAM mistakes can lock out every administrator. Keep a tested break-glass or out-of-band path, retain an authenticated recovery session, back up the active stack, and define rollback before editing login-critical PAM files.

## Evidence first

Collect only the target service and short log window:

```bash
ls -l /etc/pam.d/<service> 2>/dev/null || true
sed -n '1,220p' /etc/pam.d/<service> 2>/dev/null
journalctl -b --no-pager 2>/dev/null | grep -Ei 'pam|authentication failure|account|session' | tail -120
```

Also identify the affected user/group, recent auth changes, distro include structure, and whether local recovery access is available.

## Reasoning model

Map the failure to the PAM phase before changing anything:

1. `auth` — prove identity/credential.
2. `account` — account eligibility, expiry, access policy.
3. `password` — credential update policy.
4. `session` — session setup/cleanup, limits, environment.

Module order and control flags (`required`, `requisite`, `sufficient`, optional/extended syntax) change the meaning of the stack. Do not treat PAM lines as independent toggles.

## Safe workflow

1. Identify the exact consuming service and include chain.
2. Map the failing phase from logs/evidence.
3. Review module order and control semantics.
4. Change the smallest rule only after backup/rollback is ready.
5. Test with a non-critical account or parallel recovery session.
6. Validate both successful and intentionally rejected access.

## Anti-patterns

- editing shared/common PAM includes without enumerating consumers
- changing `auth` and `account` policy together without evidence
- disabling lockout/recovery controls globally to make one login work
- closing the only privileged session before validation
- copying PAM stacks across distributions blindly

## Validation

Re-test the affected service, inspect the new auth log window, and verify break-glass/admin access still works. For sudo-specific policy move to `sudoers.md`; for directory-backed identity lookup move to `sssd-ldap.md`.
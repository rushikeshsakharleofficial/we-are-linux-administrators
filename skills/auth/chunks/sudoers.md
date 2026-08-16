# Sudoers and least-privilege delegation

Use this chunk when identity is resolved but sudo policy, group delegation, command scope, `NOPASSWD`, service-account privilege or sudo lockout is the failing layer.

## Safety contract

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Privilege-policy errors can remove administrative recovery or grant unintended root access. Keep an existing privileged session/break-glass path, make narrow changes, and validate syntax before relying on the new rule.

## Evidence first

```bash
id <user> 2>/dev/null || true
sudo -l -U <user> 2>/dev/null || true
visudo -c 2>/dev/null || true
ls -l /etc/sudoers.d 2>/dev/null || true
```

Ask for the exact user/group, required command, target host scope, matching sudoers fragment and audit requirement. Do not request the whole policy tree unless necessary.

## Safe design

1. Define the required administrative task, not a vague request for root.
2. Prefer role/group rules where practical.
3. Prefer a dedicated `/etc/sudoers.d/<role>` fragment with mode `0440`.
4. Scope exact commands and arguments where feasible.
5. Validate the fragment and whole policy before testing.
6. Test the intended command and a command that should remain denied.

Example:

```sudoers
%webops ALL=(root) /bin/systemctl restart nginx, /bin/systemctl reload nginx
```

Validate:

```bash
visudo -cf /etc/sudoers.d/<role>
visudo -c
sudo -l -U <user>
```

## Anti-patterns

- `ALL=(ALL) NOPASSWD: ALL` when a narrow task is enough
- raw editing without `visudo` validation
- broad wildcards, mutable scripts or shell-capable editors that defeat command scoping
- ignoring `PATH`, environment, symlink or writable-file escape paths
- deleting the old working admin path before the replacement is proven

## Validation and rollback

Keep a backup or removable drop-in. Validate syntax, intended privilege, denied privilege and audit/log behaviour. If identity/group membership itself is wrong, return to `local-accounts.md` or `sssd-ldap.md` rather than compensating with a broader sudo rule.
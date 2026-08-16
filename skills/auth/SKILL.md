---
name: "auth"
description: "Troubleshoot Linux identity, local accounts, PAM, SSSD/LDAP, sudo authorisation and login failures using bounded evidence and condition-specific chunks."
argument-hint: "[user/auth/login/sudo/pam/sssd symptom]"
effort: "high"
allowed-tools: "Read Grep Glob Bash"
---
# auth skill

Use this parent skill for Linux account, authentication, identity-resolution and privilege-delegation problems. Start with bounded evidence, identify the failing layer, then load **one matching chunk**. Do not preload all auth chunks.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Authentication changes can remove administrative access: keep break-glass or out-of-band recovery for PAM, SSSD, sudo and remote-login changes, define rollback before edits, and validate the original and recovery access paths afterward.

## Baseline evidence

```bash
id <user> 2>/dev/null || true
getent passwd <user> 2>/dev/null || true
getent group <group> 2>/dev/null || true
passwd -S <user> 2>/dev/null || true
chage -l <user> 2>/dev/null || true
sudo -l -U <user> 2>/dev/null || true
systemctl is-active sssd 2>/dev/null || true
sssctl user-checks <user> 2>/dev/null || true
journalctl -b --no-pager 2>/dev/null | grep -Ei 'pam|authentication failure|sssd|sudo|account locked' | tail -120
```

Use only commands relevant to the reported path; do not dump secrets or entire directory/PAM configurations.

## Condition -> chunk

| Evidence / condition | Load |
|---|---|
| local account lifecycle, shell, expiry, group membership, service account, offboarding | `chunks/local-accounts.md` |
| PAM module order/control flags, account/password/session phase, lockout policy | `chunks/pam.md` |
| directory-backed identity, NSS/SSSD/LDAP/AD lookup, cache, access filter, group mapping | `chunks/sssd-ldap.md` |
| identity resolves but sudo policy/delegation is wrong | `chunks/sudoers.md` |
| SSH daemon hardening, ciphers, auth methods, root login, remote lockout risk | `ssh-hardening-expert` |
| RDP/xrdp-specific login/session issue | `rdp-expert` |
| file ownership/mode/ACL/traversal problem | `permissions` |
| SELinux/AppArmor denial | matching MAC specialist |

Default: if the layer is unclear, stay in this parent and collect the smallest missing evidence. Load a second chunk/support skill only when evidence proves the failure crosses layers.

## Reasoning model

```text
Identity exists?        local files or NSS/SSSD/LDAP
Authentication works?   PAM/password/key/directory credential
Account allowed?        expiry/lock/PAM/access filter/shell
Remote path allowed?    SSH/RDP policy
Privilege allowed?      sudo/group/delegation
Object access allowed?  permissions/ACL/SELinux/AppArmor
```

Do not “fix” a lower layer by weakening another one. For example, a missing LDAP group is not a reason to grant broad local sudo, and an SSH key path permission problem is not a reason to disable SSH hardening.

## Validation

Validate the exact failed path plus the recovery path:

```bash
getent passwd <user> 2>/dev/null || true
id <user> 2>/dev/null || true
sudo -l -U <user> 2>/dev/null || true
```

Then run the chunk-specific validation. For SSH configuration changes, validate with `sshd -t` and use `ssh-hardening-expert`; for file/ACL changes use `permissions`.

## Output

```text
Identity source:
Failing layer:
Primary chunk/specialist:
Evidence:
Minimal safe change:
Rollback/recovery:
Validation:
```

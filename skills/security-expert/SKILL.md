---
name: security-expert
description: Defensive Linux security parent for authorised hosts. Collects bounded posture evidence, identifies the failing security-control layer, then loads one focused auditd, Fail2Ban, vulnerability-triage or broad host-audit chunk or hands off to a distinct specialist.
argument-hint: "[audit|auditd|fail2ban|vulnerability|CVE|hardening|validate|finding] [owned server scope]"
effort: high
updated: "2026-08-17"
allowed-tools: "Read Grep Glob Bash"
---

# Security Expert

Use this parent for defensive Linux security validation on owned or explicitly authorised systems. Start with bounded evidence, identify the control layer, then load only the matching chunk or specialist.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Security/facts checks come first. Do not perform stealth/evasion, credential spraying, exploit chains, persistence, malware, destructive testing or high-rate probing. Define rollback and recovery before consequential hardening, especially remote-access, firewall, audit-policy, authentication, package or kernel changes.

## Baseline evidence

```bash
cat /etc/os-release
uname -a
ss -tulpen
systemctl --failed --no-pager 2>/dev/null || true
journalctl -p warning..alert -b --no-pager -n 120
```

Add only evidence needed for the stated host role and symptom. Do not preload every security subsystem or dump complete logs/secrets.

## Condition -> chunk/specialist

| Proven condition | Load next |
|---|---|
| Broad authorised host security audit, score or multi-control review | `chunks/security-audit.md` |
| Linux audit rules/events, `auditctl`, `ausearch`, `aureport`, audit trail missing/noisy | `chunks/auditd.md` |
| Fail2Ban jail/filter/action/backend, repeated abusive auth, false ban/lockout risk | `chunks/fail2ban.md` |
| Scanner finding, CVE prioritisation, backport/false-positive review, exposure/remediation triage | `chunks/vulnerability-scan.md` |
| SSH policy or remote SSH lockout risk | `ssh-hardening-expert` |
| Local accounts, PAM, SSSD/LDAP or sudo policy | `auth` |
| POSIX ownership/modes/ACL | `permissions` |
| SELinux policy/labels/denials | `selinux-expert` |
| AppArmor profiles/denials | `apparmor-expert` |
| Firewall/NAT/network exposure | matching network/firewall specialist |
| Kernel/runtime parameter hardening or tuning | `sysctl-expert` or `kernel` as appropriate |
| Resource ceilings | `limits-expert` |
| systemd sandbox/capability hardening | `systemd-expert` |
| Package/repository patch rollout | `package-manager-expert` -> patching chunk |
| Generic journal/log persistence/forwarding | `logs` |
| Backup/ransomware recovery | `backup-restore-expert` |
| Active compromise/outage | `incident-response-expert` |

Default: stay in this parent until evidence identifies one branch. Do not load multiple chunks merely because several controls are security-related.

## Fast discrimination

- “Who changed this file?” / missing audit record / audit rule design -> `chunks/auditd.md`.
- “Why did Fail2Ban not ban?” / false positive / custom jail/filter -> `chunks/fail2ban.md`.
- “Scanner says CVE-X affects this host” / fixed-version/backport ambiguity -> `chunks/vulnerability-scan.md`.
- “Audit this Linux server” with no single control identified -> `chunks/security-audit.md`.
- Authentication identity failure -> `auth`, not a generic security audit.
- SSH hardening that could cut remote access -> `ssh-hardening-expert` with guarded rollback.
- SELinux/AppArmor denial -> matching MAC specialist; do not disable MAC as a shortcut.
- Performance/kernel parameter tuning -> `sysctl-expert`; do not bury generic sysctl tuning inside vulnerability triage.

## Safety gates

Before any state-changing recommendation:

1. confirm host role, scope and authorisation;
2. record the current effective configuration;
3. identify remote-access and recovery dependencies;
4. back up the exact configuration being changed;
5. prefer a narrow reversible test before persistence;
6. validate both intended behaviour and side effects;
7. restore the prior state if validation fails.

## Output

```text
Security condition:
Primary parent/chunk or specialist:
Evidence:
Risk:
Minimal next action:
Rollback/recovery:
Validation:
Unknowns:
```

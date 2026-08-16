# Expert Module Index

78 top-level skills.

Canonical routing map: [`skills/using-linux-admin/SKILL.md`](../skills/using-linux-admin/SKILL.md).

Do not maintain a second full routing matrix here. `using-linux-admin` selects the parent/specialist; each parent owns its condition-to-chunk table.

## Routing model

```text
using-linux-admin -> one parent/specialist -> bounded evidence -> one matching chunk
```

Load a second chunk only when evidence proves a cross-layer issue.

## Entry points

| Need | Skill |
|---|---|
| Choose Linux domain | `using-linux-admin` |
| Unknown Linux problem | `diagnose` |
| Broad senior execution | `linux-admin-chief-engineer` |
| Bash/POSIX automation | `automation` -> `chunks/bash-scripting.md` |
| Maintenance runbook/checklist | `automation` -> `chunks/runbooks.md` |
| Ansible workflow | `ansible-expert` |
| Active incident response/RCA | `incident-response-expert` |
| Formal incident report | `incident-report-creator-expert` |
| Production change safety | `change-safety-expert` |
| Security audit/auditd/Fail2Ban | `security-expert` |

## Parent domains

Boot `boot`; services `service`; performance `performance`; storage `storage`; permissions `permissions`; auth `auth`; networking `network`; time `time`; automation `automation`; load balancing `load-balancer-expert`; security `security-expert`; containers `containers`; logging `logs`; migration `migration-expert`; incident response/RCA `incident-response-expert`.

## Consolidation status

- Network: TCP, UDP, packet capture, VLAN/bonding chunks.
- Time: Chrony/NTP and system-clock chunks.
- Storage baseline: mounts/fstab, filesystem health, SMART chunks; high-risk storage specialists remain distinct pending review.
- Performance: CPU, memory/OOM, swap/zram, capacity chunks; limits remains distinct.
- Permissions: POSIX and ACL chunks; SELinux/AppArmor remain distinct.
- Auth: local accounts, PAM, SSSD/LDAP, sudoers chunks; SSH/RDP remain distinct.
- Logging: rsyslog and logrotate chunks; product monitoring remains distinct.
- Incident management: RCA chunk under incident response; artifact creator remains distinct.
- Automation: Bash/POSIX scripting and operational runbooks are chunks under `automation`; Ansible, cron and systemd remain distinct where their semantics are the actual condition.
- Security: broad host audit, auditd and Fail2Ban are chunks under `security-expert`; MAC, SSH/auth, firewall, kernel/sysctl, patching and vulnerability specialists stay distinct when their control semantics are proven.

Former top-level specialists are removed only after useful procedures and references are migrated.

## Local/global discovery

See [`LOCAL_GLOBAL_AGENT_SETUP.md`](LOCAL_GLOBAL_AGENT_SETUP.md). Canonical skills remain under `skills/`; global installs copy them into supported discovery locations rather than creating another source of truth.

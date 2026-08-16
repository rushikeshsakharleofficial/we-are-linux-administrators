---
name: using-linux-admin
description: Main linux-admin routing map. Chooses the smallest parent domain first; parent skills then select condition-specific chunks instead of loading many micro-skills.
argument-hint: "[linux task or symptom]"
effort: low
allowed-tools: "Read Grep Glob"
---

# Using linux-admin

Use this skill first when the correct linux-admin domain is unclear. Select the smallest parent/specialist and do not load unrelated content.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. The selected parent/specialist must preserve bounded evidence, security/facts checks, architecture fit, backup/disaster planning, guarded rollback, validation and token-bounded output.

## Routing rules

1. Broad/unclear symptom -> choose one parent.
2. Parent skills own condition-to-chunk routing; do not preload chunks.
3. Default: one parent + one chunk. Add a second chunk/support skill only when evidence proves a cross-layer issue.
4. Unknown Linux issue -> `diagnose`.
5. Broad senior execution -> `linux-admin-chief-engineer` after routing.
6. Risky production change -> add `change-safety-expert`.
7. Tuning/optimization -> `optimization-guardian-expert` first.

## Parent map

- **General:** `diagnose`, `linux-admin-chief-engineer`, `command-expert`, `automation`, `ansible-expert`, `incident-response-expert`, `incident-report-creator-expert`, `change-safety-expert`, `universal-contract-guardian-expert`
- **Automation:** `automation` -> Bash/POSIX scripting chunk or operational-runbook chunk; keep Ansible, cron and systemd as distinct specialists when their own semantics are involved
- **Boot/services:** `boot`, `kernel`, `service`, `systemd-expert`, `process-expert`, `shell-rc-expert`
- **Performance:** `performance` -> CPU, memory/OOM, swap/zram or capacity-planning chunk; keep `limits-expert` distinct
- **Storage:** `storage` -> mounts/fstab, filesystem-health or SMART chunk; LVM/RAID/iSCSI/multipath/NFS/Samba/quota/backup remain distinct pending review
- **Permissions:** `permissions` -> POSIX modes/ownership/traversal or ACL chunk; SELinux/AppArmor remain distinct
- **Auth:** `auth` -> local accounts, PAM, SSSD/LDAP or sudoers chunk; SSH hardening and RDP remain distinct
- **Network:** `network` -> TCP, UDP, packet-capture or VLAN/bonding chunk; routing/NAT/firewall/proxy/DNS remain distinct specialists
- **DNS:** `named-expert`; dnsmasq/GSLB remain distinct pending review
- **Time:** `time` -> Chrony/NTP or system-clock/timezone/RTC chunk
- **Web/apps:** `nginx-expert`, `apache-expert`, `php-fpm-expert`, `web-stack-security-expert`, `mysql-expert`, `postgresql-expert`, `redis-expert`
- **Load balancing:** `load-balancer-expert` -> HAProxy/F5/LVS/Keepalived/cloud-LB/DNS-GSLB branches
- **Containers:** `containers` -> `kubernetes-node-expert`
- **Logs/monitoring:** `logs` -> rsyslog or logrotate chunk; journald stays in parent, product monitoring remains distinct
- **Incident management:** `incident-response-expert` -> active response or post-containment RCA chunk; report creator stays separate
- **Security:** `security-expert` -> host security/MAC/audit/fail2ban/patch/vulnerability/sysctl branches
- **Migration:** `migration-expert` + relevant domain + `change-safety-expert`
- **Cloudflare:** `cf-expert`
- **AI/model choice:** `agent-model-dispatcher-expert`
- **Server context memory:** `server-memory-expert`

## Fast picks

| Request | Primary |
|---|---|
| Something is broken | `diagnose` |
| Bash/POSIX script or automation helper | `automation` -> Bash chunk |
| Maintenance runbook/checklist | `automation` -> runbook chunk |
| Ansible playbook/inventory/rollout | `ansible-expert` |
| Service/boot/kernel issue | matching boot/service parent |
| High load/OOM/slow host | `performance` |
| Disk/mount/I/O problem | `storage` |
| File/path permission denied | `permissions` |
| Local account/PAM/SSSD-LDAP/sudo | `auth` |
| SSH hardening | `ssh-hardening-expert` |
| Connectivity/TCP/UDP/VLAN/packet-flow | `network` |
| Clock/NTP/timezone/RTC | `time` |
| Missing/forwarded/rotating log | `logs` |
| Active incident | `incident-response-expert` |
| Post-containment RCA | `incident-response-expert` -> RCA chunk |
| Formal incident report | `incident-report-creator-expert` |
| Security audit | `security-expert` |
| Migration/cutover | `migration-expert` |

## Output

```text
Primary parent/specialist: <skill>
Reason: <one short sentence>
Next: let that skill select one condition-specific chunk if applicable
```

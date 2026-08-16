---
name: using-linux-admin
description: Main linux-admin routing map. Chooses the smallest parent domain first; parent skills then select condition-specific chunks instead of loading many micro-skills.
argument-hint: "[linux task or symptom]"
effort: low
allowed-tools: "Read Grep Glob"
---

# Using linux-admin

Use this skill first when the correct linux-admin domain is unclear. Select the smallest parent/specialist skill and do not load unrelated content.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. This skill only selects the top-level domain; the selected parent/specialist must preserve read-only-first evidence, security/facts checks, architecture fit, backup/disaster planning, guarded rollback for risky changes, validation, and token-bounded output.

## Routing rules

1. Broad/unclear symptom -> choose one parent skill.
2. Parent skills own condition-to-chunk routing. Do not preload all chunks.
3. Default: one parent + one chunk. Add a second chunk/support skill only when evidence proves a cross-layer issue.
4. Unknown Linux issue -> `diagnose`.
5. Broad senior-engineer execution -> `linux-admin-chief-engineer` after this map.
6. Risky production change -> add `change-safety-expert`.
7. Tuning/optimization -> load `optimization-guardian-expert` first.

## Parent map

- **General:** `diagnose` -> `linux-admin-chief-engineer`, `command-expert`, `bash-script-expert`, `automation`, `ansible-expert`, `runbook-expert`, `root-cause-expert`, `incident-response-expert`, `incident-report-creator-expert`, `change-safety-expert`, `universal-contract-guardian-expert`
- **Boot/services:** `boot` -> `kernel`, `service`, `systemd-expert`, `process-expert`, `shell-rc-expert`
- **Performance:** `performance` -> CPU/memory/swap/limits/capacity branches; consolidation into parent chunks is in progress
- **Storage:** `storage` -> mounting/filesystem/LVM/RAID/SMART/iSCSI/multipath/NFS/Samba/quota/backup branches; consolidation into parent chunks is in progress
- **Permissions:** `permissions` -> POSIX permissions/ACL/users/SELinux/AppArmor branches
- **Auth:** `auth` -> PAM/SSSD-LDAP/sudo/SSH/RDP branches
- **Network:** `network` -> condition-specific chunks for TCP, UDP, packet capture, VLAN/bonding/LACP; distinct routing/NAT/firewall/proxy/DNS specialists are loaded only when baseline evidence points there
- **DNS/time:** `named-expert` for BIND/DNS; dnsmasq/GSLB/time specialists remain separate until their domain consolidation pass
- **Web/apps:** `nginx-expert`, `apache-expert`, `php-fpm-expert`, `web-stack-security-expert`, `mysql-expert`, `postgresql-expert`, `redis-expert`
- **Load balancing:** `load-balancer-expert` -> HAProxy/F5/LVS/Keepalived/cloud-LB/DNS-GSLB branches
- **Containers:** `containers` -> `kubernetes-node-expert`
- **Logs/monitoring:** `logs` -> rsyslog/logrotate/monitoring branches
- **Security:** `security-expert` -> host security/MAC/audit/fail2ban/patch/vulnerability/sysctl branches
- **Migration:** `migration-expert` -> relevant domain + `change-safety-expert`
- **Cloudflare:** `cf-expert`
- **AI/model choice:** `agent-model-dispatcher-expert` (AI client/model routing only)
- **Server context memory:** `server-memory-expert` (stored host/operator context, not RAM troubleshooting)

## Fast picks

| Request | Primary |
|---|---|
| Something is broken | `diagnose` |
| Service failed | `service` |
| Boot/emergency mode | `boot` |
| Kernel panic/lockup | `kernel` |
| High load/OOM/slow host | `performance` |
| Disk/mount/I/O problem | `storage` |
| Permission denied | `permissions` |
| SSH/login/sudo identity issue | `auth` |
| Cannot reach host/port | `network` |
| TCP/UDP/VLAN/bond/packet-flow issue | `network`, then matching chunk |
| Known firewall rule problem | `firewall-expert` |
| BIND/named DNS problem | `named-expert` |
| NGINX problem | `nginx-expert` |
| Database problem | matching DB skill |
| Docker/Podman | `containers` |
| Kubernetes node | `kubernetes-node-expert` |
| Active incident / outage response | `incident-response-expert` |
| Incident report in Word/Excel/PDF/PowerPoint | `incident-report-creator-expert` |
| Security audit/hardening | `security-expert` |
| Production change | domain skill + `change-safety-expert` |
| Tune/boost/optimize | `optimization-guardian-expert` then domain |
| Migration/cutover | `migration-expert` |
| Choose load balancer | `load-balancer-expert` |
| Choose AI agent/model | `agent-model-dispatcher-expert` |

## Ambiguity

- Filesystem/object access -> `permissions`; login/identity/session/sudo auth -> `auth`.
- Unknown reachability -> `network`; known packet-filter rule -> `firewall-expert`.
- Unknown slowness -> `performance`; let that parent identify the proven resource layer.
- Unknown disk issue -> `storage`; let that parent identify filesystem/LVM/RAID/etc.
- Generic daemon failure -> `service`; unit/dependency/timer/cgroup semantics -> `systemd-expert`.
- Broad security validation -> `security-expert`; host hardening implementation -> `os-security-expert`.
- Active incident handling -> `incident-response-expert`; formal post-incident artifact generation -> `incident-report-creator-expert`.

## Output

```text
Primary parent/specialist: <skill>
Reason: <one short sentence>
Next: let that skill select one condition-specific chunk if applicable
```

Then load only the selected parent/specialist and its chosen chunk.
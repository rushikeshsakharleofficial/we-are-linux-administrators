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
- **Performance:** `performance` -> condition-specific chunks for CPU/run queue/steal/softirq, memory/OOM/cgroups, swap/zram, and capacity planning; keep `limits-expert` distinct for PAM/systemd/resource-ceiling and security-limit review
- **Storage:** `storage` -> condition-specific chunks for mounts/fstab, filesystem health/capacity, and SMART/media risk; distinct LVM/RAID/iSCSI/multipath/NFS/Samba/quota/backup specialists load only when baseline evidence points there
- **Permissions:** `permissions` -> condition-specific chunks for POSIX ownership/modes/traversal or ACL/mask/inheritance; SELinux/AppArmor, account identity and systemd sandboxing remain distinct layers loaded only when evidence points there
- **Auth:** `auth` -> condition-specific chunks for local account lifecycle, PAM, SSSD/LDAP and sudoers; SSH hardening and RDP remain distinct specialists because remote-access policy has separate lockout/security risk
- **Network:** `network` -> condition-specific chunks for TCP, UDP, packet capture, VLAN/bonding/LACP; distinct routing/NAT/firewall/proxy/DNS specialists are loaded only when baseline evidence points there
- **DNS:** `named-expert` for BIND/DNS; dnsmasq/GSLB remain distinct specialists until their overlap is reviewed
- **Time:** `time` -> condition-specific chunks for Chrony/NTP synchronisation or system clock/timezone/RTC/timedatectl issues
- **Web/apps:** `nginx-expert`, `apache-expert`, `php-fpm-expert`, `web-stack-security-expert`, `mysql-expert`, `postgresql-expert`, `redis-expert`
- **Load balancing:** `load-balancer-expert` -> HAProxy/F5/LVS/Keepalived/cloud-LB/DNS-GSLB branches
- **Containers:** `containers` -> `kubernetes-node-expert`
- **Logs/monitoring:** `logs` -> condition-specific chunks for rsyslog routing/forwarding and logrotate policy; journald stays in the parent baseline, while Nagios/Observium remain distinct product specialists
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
| CPU/memory/swap/capacity issue | `performance`, then matching chunk |
| Too many open files/nproc/memlock/resource-limit audit | `limits-expert` |
| Disk/mount/I/O problem | `storage` |
| Mount/fstab/filesystem/SMART issue | `storage`, then matching chunk |
| File/path permission denied | `permissions`, then matching POSIX/ACL chunk or proven security layer |
| Local account/PAM/SSSD-LDAP/sudo issue | `auth`, then matching chunk |
| SSH hardening/remote access policy | `ssh-hardening-expert` |
| Cannot reach host/port | `network` |
| TCP/UDP/VLAN/bond/packet-flow issue | `network`, then matching chunk |
| Clock drift/NTP/Chrony/timezone/RTC issue | `time`, then matching chunk |
| Missing/forwarded/rotating log issue | `logs`, then matching chunk if proven |
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

- Filesystem/object access -> `permissions`; wrong owner/mode/traversal -> POSIX chunk, extended ACL/mask/inheritance -> ACL chunk, MAC denial -> matching SELinux/AppArmor specialist.
- Local account lifecycle/group/session eligibility -> `auth` local-accounts chunk; PAM phase/control flags -> PAM chunk; directory identity/cache/access filter -> SSSD-LDAP chunk; resolved identity but wrong sudo privilege -> sudoers chunk. SSH daemon hardening remains `ssh-hardening-expert`.
- Unknown reachability -> `network`; known packet-filter rule -> `firewall-expert`.
- Time sync/source/offset/stratum issue -> `time` then Chrony chunk; timezone/RTC/local clock issue -> `time` then system-clock chunk.
- Unknown slowness -> `performance`; CPU/run queue -> CPU chunk, memory/OOM/cgroup pressure -> memory chunk, swap/zram -> swap chunk, forecast/headroom -> capacity-planning chunk. Resource-ceiling errors/audits remain `limits-expert`.
- Unknown disk issue -> `storage`; mount/fstab -> mounts chunk, filesystem metadata/capacity -> filesystem-health chunk, SMART/media risk -> SMART chunk; proven LVM/RAID/SAN/network-storage layer -> matching specialist.
- Missing log with journald evidence -> `logs`; rsyslog rule/queue/forwarding evidence -> rsyslog chunk; retention/rotation/reopen evidence -> logrotate chunk. Product-specific monitoring behaviour stays in its product specialist.
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

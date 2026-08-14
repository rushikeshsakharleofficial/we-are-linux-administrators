---
name: using-linux-admin
description: Main linux-admin routing map. Maps parent domains to the smallest matching micro-skill before specialist content is loaded. Routing only; no troubleshooting procedures.
argument-hint: "[linux task or symptom]"
effort: low
allowed-tools: "Read Grep Glob"
---

# Using linux-admin

Use this skill first when the correct linux-admin skill is unclear. Select the smallest matching skill, load it, and do not load unrelated skills.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. This skill only selects specialists; the selected skill must preserve read-only-first evidence, security/facts checks, architecture fit, backup/disaster planning, guarded rollback for risky changes, validation, and token-bounded output.

## Rules

1. Broad/unclear symptom -> choose a parent skill.
2. Known technology/failure domain -> choose the exact micro-skill.
3. Use one primary skill plus at most two support skills unless incident/migration scope requires more.
4. Unknown Linux issue -> `diagnose`.
5. Broad senior-engineer execution -> `linux-admin-chief-engineer` after this map.
6. Risky production change -> add `change-safety-expert`.
7. Tuning/optimization -> load `optimization-guardian-expert` first.

## Parent -> micro map

- **General:** `diagnose` -> `linux-admin-chief-engineer`, `command-expert`, `bash-script-expert`, `automation`, `ansible-expert`, `runbook-expert`, `root-cause-expert`, `incident-response-expert`, `change-safety-expert`, `universal-contract-guardian-expert`
- **Boot/services:** `boot` -> `kernel`, `service`, `systemd-expert`, `process-expert`, `shell-rc-expert`
- **Performance:** `performance` -> `cpu-expert`, `memory-expert`, `swap-expert`, `limits-expert`, `capacity-planning-expert`, `optimization-guardian-expert`, `minimal-architecture-expert`
- **Storage:** `storage` -> `disk-mounting-expert`, `filesystem-expert`, `lvm-expert`, `raid-expert`, `smart-disk-expert`, `iscsi-expert`, `multipath-expert`, `nfs-expert`, `samba-expert`, `quota-expert`, `backup-restore-expert`
- **Permissions:** `permissions` -> `file-permissions-expert`, `acl-permissions-expert`, `user-permissions-expert`, `selinux-expert`, `apparmor-expert`
- **Auth:** `auth` -> `pam-expert`, `sssd-ldap-expert`, `sudoers-expert`, `ssh-hardening-expert`, `rdp-expert`
- **Network:** `network` -> `iproute-expert`, `routing-expert`, `natting-expert`, `vlan-bonding-expert`, `tcp-expert`, `udp-expert`, `tcpdump-expert`, `firewall-expert`, `linux-proxy-expert`
- **DNS/time:** `named-expert` -> `dnsmasq-expert`, `dns-gslb-expert`; time -> `chrony-expert`, `date-timectl-expert`
- **Web/apps:** `nginx-expert`, `apache-expert`, `php-fpm-expert`, `web-stack-security-expert`, `mysql-expert`, `postgresql-expert`, `redis-expert`
- **Load balancing:** `load-balancer-expert` -> `haproxy-expert`, `f5-expert`, `lvs-ipvs-expert`, `keepalived-expert`, `cloud-lb-expert`, `dns-gslb-expert`
- **Containers:** `containers` -> `kubernetes-node-expert`
- **Logs/monitoring:** `logs` -> `rsyslog-expert`, `logrotate-expert`, `nagios-core-expert`, `observium-ce-expert`
- **Security:** `security-expert` -> `os-security-expert`, `selinux-expert`, `apparmor-expert`, `auditd-expert`, `fail2ban-expert`, `patching-expert`, `package-manager-expert`, `vulnerability-scan-expert`, `sysctl-expert`, `linux-source-guardian-expert`
- **Migration:** `migration-expert` -> relevant domain skill + `change-safety-expert`
- **Cloudflare:** `cf-expert`
- **AI/model choice:** `agent-model-dispatcher-expert` (AI client/model routing only, not Linux technical routing)
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
| Known firewall rule problem | `firewall-expert` |
| BIND/named DNS problem | `named-expert` |
| NGINX problem | `nginx-expert` |
| Database problem | matching DB skill |
| Docker/Podman | `containers` |
| Kubernetes node | `kubernetes-node-expert` |
| Security audit/hardening | `security-expert` |
| Production change | domain skill + `change-safety-expert` |
| Tune/boost/optimize | `optimization-guardian-expert` then domain skill |
| Migration/cutover | `migration-expert` |
| Choose load balancer | `load-balancer-expert` |
| Choose AI agent/model | `agent-model-dispatcher-expert` |

## Ambiguity

- Filesystem/object access -> `permissions`; login/identity/session/sudo auth -> `auth`.
- Unknown reachability -> `network`; known packet-filter rule -> `firewall-expert`.
- Unknown slowness -> `performance`; proven CPU/RAM/swap issue -> matching micro-skill.
- Unknown disk issue -> `storage`; proven filesystem/LVM/RAID layer -> matching micro-skill.
- Generic daemon failure -> `service`; unit/dependency/timer/cgroup semantics -> `systemd-expert`.
- Broad security validation -> `security-expert`; host hardening implementation -> `os-security-expert`.

## Output

```text
Primary skill: <skill>
Support skill(s): <zero to two>
Reason: <one short sentence>
```

Then load only the selected skill(s).
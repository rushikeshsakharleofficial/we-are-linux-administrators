---
name: master-skill-router
description: Master routing map for linux-admin. Maps broad parent domains to the smallest matching micro-skill so an AI can choose the right skill before loading specialist content. Contains routing only, not troubleshooting procedures.
argument-hint: "[linux task or symptom]"
effort: low
allowed-tools: "Read Grep Glob"
---

# Master Skill Router

Use this skill first when the correct linux-admin skill is unclear.

This file is deliberately only a routing map. Do not troubleshoot from this skill. Select the smallest matching skill, load that skill, and stop loading unrelated skills.

## Routing rules

1. Prefer one parent skill for broad or unclear symptoms.
2. Prefer one micro-skill when the technology or failure domain is already known.
3. Add at most two supporting skills unless the task is a migration, incident, or multi-domain production change.
4. For unknown problems use `diagnose`.
5. For broad senior-engineer workflow use `linux-admin-chief-engineer` after this map.
6. For risky production changes add `change-safety-expert`.
7. For tuning add `optimization-guardian-expert` before any tuning skill.
8. Do not load every child skill under a parent.

## Parent -> micro-skill map

### General triage and execution
- `diagnose` -> unknown Linux symptoms, initial triage, cross-domain failure
- `linux-admin-chief-engineer` -> broad multi-domain Linux/SRE task and execution shaping
- `command-expert` -> command choice, pipelines, quoting, safe one-liners
- `bash-script-expert` -> Bash/POSIX shell scripts
- `automation` -> cron/systemd/Ansible automation workflow
- `ansible-expert` -> Ansible-specific playbooks, roles, inventory, idempotency
- `runbook-expert` -> operational runbooks and repeatable procedures
- `root-cause-expert` -> focused RCA after evidence exists
- `incident-response-expert` -> active incident coordination and containment
- `change-safety-expert` -> production change gates, rollback, blast radius
- `universal-contract-guardian-expert` -> skill creation/audit/execution contract enforcement

### Boot, kernel and services
- `boot` -> boot failure, emergency mode, initramfs, GRUB, fstab during boot
- `kernel` -> panic, lockup, modules, kdump, kernel regression
- `systemd-expert` -> units, dependencies, timers, cgroups, sandboxing
- `service` -> generic daemon/service failure or restart loop
- `process-expert` -> process state, signals, zombies, process investigation
- `shell-rc-expert` -> Bash/Zsh startup files, PATH, aliases, slow shell startup

### Performance and capacity
- `performance` -> broad slowness, high load, OOM, latency
- `cpu-expert` -> CPU saturation, run queue, steal, scheduler symptoms
- `memory-expert` -> host memory pressure, OOM, reclaim, leak investigation
- `server-memory-expert` -> stored server/operator context memory, not RAM troubleshooting
- `swap-expert` -> swap sizing, pressure, thrashing
- `limits-expert` -> ulimit, PAM limits, systemd Limit*, TasksMax, fd/process ceilings
- `capacity-planning-expert` -> future resource sizing and headroom
- `optimization-guardian-expert` -> mandatory gate for tuning/optimization requests
- `minimal-architecture-expert` -> smallest production architecture that meets requirements

### Storage and filesystems
- `storage` -> broad disk/storage symptoms, disk full, mount/I/O issues
- `disk-mounting-expert` -> mount/fstab/device mounting specifically
- `filesystem-expert` -> filesystem behaviour, corruption, resize, inode/filesystem issues
- `lvm-expert` -> PV/VG/LV operations and troubleshooting
- `raid-expert` -> software/hardware RAID diagnosis and planning
- `smart-disk-expert` -> SMART health and physical disk indicators
- `iscsi-expert` -> iSCSI initiator/target/session issues
- `multipath-expert` -> device-mapper multipath/SAN pathing
- `nfs-expert` -> NFS exports, mounts, permissions, stale handles
- `samba-expert` -> SMB/CIFS/Samba shares and auth
- `quota-expert` -> filesystem/user/group quotas
- `backup-restore-expert` -> backup, restore, recovery and verification

### Permissions, identity and authentication
- `permissions` -> broad permission denied; parent for ownership, ACL and MAC interactions
- `file-permissions-expert` -> chmod/chown/chgrp, mode bits, umask, traversal
- `acl-permissions-expert` -> POSIX ACL, getfacl/setfacl, ACL masks/default ACL
- `user-permissions-expert` -> local users/groups/account lifecycle and least privilege
- `auth` -> broad login/authentication/sudo/SSH/PAM/LDAP symptoms
- `pam-expert` -> PAM stack and account/session/auth modules
- `sssd-ldap-expert` -> SSSD, LDAP, NSS identity resolution
- `sudoers-expert` -> sudo policy and visudo
- `ssh-hardening-expert` -> sshd security policy and lockout-safe SSH hardening
- `rdp-expert` -> Linux RDP/XRDP sessions, Wayland/Xorg remote desktop

### Networking
- `network` -> broad connectivity, addressing, route, DNS, firewall, MTU, interface issues
- `iproute-expert` -> `ip` suite, addresses, routes, rules, neighbours
- `routing-expert` -> routing tables, policy routing and asymmetric path issues
- `natting-expert` -> SNAT/DNAT/masquerade/forwarding
- `vlan-bonding-expert` -> VLAN, Linux bridge, bonding/LACP interface design
- `tcp-expert` -> TCP states, retransmits, handshakes, socket behaviour
- `udp-expert` -> UDP reachability and stateless flow troubleshooting
- `tcpdump-expert` -> packet capture and bounded packet analysis
- `firewall-expert` -> firewalld, nftables, iptables, UFW, host firewall
- `linux-proxy-expert` -> Squid, Tinyproxy, Dante, forward/SOCKS proxy

### DNS and time
- `named-expert` -> BIND/named authoritative or recursive DNS
- `dnsmasq-expert` -> dnsmasq DNS/DHCP/PXE
- `dns-gslb-expert` -> weighted/geo/latency DNS traffic steering and failover
- `chrony-expert` -> chronyd/NTP synchronization
- `date-timectl-expert` -> date/time/timezone/timedatectl behaviour

### Web, application and databases
- `nginx-expert` -> NGINX web/reverse proxy/TLS/upstreams
- `apache-expert` -> Apache HTTP Server
- `php-fpm-expert` -> PHP-FPM pools, workers, socket/process issues
- `web-stack-security-expert` -> unified web stack security, WAF, TLS, headers, rate limits
- `mysql-expert` -> MySQL/MariaDB
- `postgresql-expert` -> PostgreSQL
- `redis-expert` -> Redis

### Load balancing and high availability
- `load-balancer-expert` -> parent/router for load-balancing technology choice
- `haproxy-expert` -> HAProxy
- `f5-expert` -> F5 BIG-IP/LTM/GTM-style operations
- `lvs-ipvs-expert` -> Linux LVS/IPVS L4 balancing
- `keepalived-expert` -> VRRP/VIP failover and IPVS integration
- `cloud-lb-expert` -> AWS/Azure/GCP managed load balancers

### Containers and Kubernetes
- `containers` -> Docker/Podman/container runtime issues
- `kubernetes-node-expert` -> Kubernetes node/kubelet/runtime/node networking and node health

### Logging and monitoring
- `logs` -> broad journald/log correlation/monitoring-agent evidence
- `rsyslog-expert` -> rsyslog forwarding/parsing/configuration
- `logrotate-expert` -> logrotate policy and rotation failures
- `nagios-core-expert` -> Nagios Core
- `observium-ce-expert` -> Observium Community Edition

### Security
- `security-expert` -> parent security validation and specialist routing
- `os-security-expert` -> Linux OS hardening posture
- `selinux-expert` -> SELinux contexts, AVC, booleans and policy
- `apparmor-expert` -> AppArmor profiles and denials
- `auditd-expert` -> Linux audit framework/auditd rules and evidence
- `fail2ban-expert` -> Fail2Ban jails, filters and bans
- `patching-expert` -> patch planning, maintenance windows, security updates
- `package-manager-expert` -> apt/dnf/yum/rpm/dpkg/package/repository issues
- `vulnerability-scan-expert` -> defensive vulnerability scanning and findings
- `sysctl-expert` -> kernel/sysctl parameters and hardening/tuning
- `linux-source-guardian-expert` -> review/block unsafe AI-suggested kernel/source/critical OS changes

### Migration and architecture
- `migration-expert` -> OS/server/data/service migration planning and cutover
- `agent-model-dispatcher-expert` -> choose AI agent/model/client, not Linux technical skill
- `cf-expert` -> Cloudflare DNS/proxy/WAF/cache/rules operations

## Fast symptom map

| Symptom/request | Pick first |
|---|---|
| "Something is broken" | `diagnose` |
| Service will not start | `service` |
| Boot/emergency mode | `boot` |
| Kernel panic/lockup | `kernel` |
| High load/slow host/OOM | `performance` |
| Disk full/mount/I/O | `storage` |
| Permission denied | `permissions` |
| SSH/login/sudo identity failure | `auth` |
| Cannot reach host/port | `network` |
| Firewall rule issue | `firewall-expert` |
| DNS/BIND issue | `named-expert` |
| NGINX issue | `nginx-expert` |
| Database issue | matching DB skill |
| Docker/Podman issue | `containers` |
| Kubernetes node issue | `kubernetes-node-expert` |
| Security audit/hardening | `security-expert` |
| Production change | matching domain + `change-safety-expert` |
| Tune/optimize/boost | `optimization-guardian-expert` then matching domain |
| Migration/cutover | `migration-expert` |
| Choose load balancer | `load-balancer-expert` |
| Choose AI agent/model | `agent-model-dispatcher-expert` |

## Ambiguity rules

- Permission vs auth: filesystem/object access -> `permissions`; login/identity/session/sudo authentication -> `auth`.
- Network vs firewall: unknown reachability -> `network`; known packet-filter policy/rule -> `firewall-expert`.
- Performance vs CPU/memory: unknown slowness -> `performance`; proven resource -> matching micro-skill.
- Storage vs filesystem/LVM/RAID: unknown disk symptom -> `storage`; known storage layer -> matching micro-skill.
- Service vs systemd: generic daemon failure -> `service`; unit semantics/dependency/timer/cgroup -> `systemd-expert`.
- Security vs OS security: broad validation -> `security-expert`; host-hardening implementation -> `os-security-expert`.
- NGINX vs load balancer: NGINX-specific config/upstream -> `nginx-expert`; technology/design selection -> `load-balancer-expert`.

## Output

Return only:

```text
Primary skill: <skill>
Support skill(s): <zero to two>
Reason: <one short sentence>
```

Then load the selected skill(s).
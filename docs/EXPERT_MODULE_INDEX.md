# Unified Linux Admin Expert Plugin Index

This is a single plugin package containing the original Linux admin troubleshooting skills plus all expert subskills.

## Main router and original task skills

| Skill | Purpose |
|---|---|
| `diagnose` | General Linux issue triage and routing to the right task skill |
| `boot` | Boot failures, emergency mode, GRUB, initramfs, fstab |
| `service` | General service troubleshooting |
| `network` | General networking issue triage |
| `performance` | CPU, memory, load, OOM, latency |
| `storage` | Disk, inode, LVM, RAID, filesystem, SMART |
| `permissions` | POSIX permissions, ACLs, SELinux, AppArmor |
| `packages` | apt/dnf/yum/rpm/zypper/pacman package issues |
| `kernel` | Kernel panic, lockup, kdump, call traces |
| `containers` | Docker, Podman, mounts, ports, rootless containers |
| `auth` | SSH, sudo, PAM, LDAP, SSSD, user access |
| `logs` | journald, rsyslog, monitoring, timelines |
| `automation` | Scripts, Ansible, fleet triage |

## Expert subskills

| Expert skill | Purpose | Audit helper |
|---|---|---|
| `sysctl-expert` | Kernel runtime parameters, safe sysctl tuning, anti-overoptimization | `sysctl-expert-audit` |
| `systemd-expert` | systemd unit design, drop-ins, restart loops, cgroups, service hardening | `systemd-expert-audit` |
| `limits-expert` | ulimit, PAM limits, systemd Limit*, nofile/nproc/memlock sizing | `limits-expert-audit` |
| `networking-expert` | Routes, IPs, DNS, firewall, sockets, MTU, tc, ethtool, TCP evidence | `networking-expert-audit` |
| `tcp-expert` | TCP connection lifecycle, SYN backlog, listen queues, retransmits, RTO, MSS/MTU/PMTUD, congestion control, TIME_WAIT/CLOSE_WAIT, socket buffers, TCP sysctls, load balancer/LB behavior, and packet captures. | `tcp-expert-audit` |
| `udp-expert` | UDP datagrams, DNS/NTP/syslog/RADIUS/SNMP/VoIP/VPN behavior, packet loss, receive buffer drops, fragmentation, PMTU, conntrack/NAT timeout, socket buffers, multicast/broadcast, and capture-based proof. | `udp-expert-audit` |
| `package-manager-expert` | APT, apt-get, apt-cache, apt-mark, dpkg, YUM, DNF, DNF5, RPM, repos, transactions, patching and recovery | `package-manager-expert-audit` |
| `cron-scheduler-expert` | cron/crond, crontab, /etc/cron.d, anacron, systemd timers, job overlap, PATH/env, mail output, DST/timezone issues, missed jobs, and safe scheduler migrations. | `cron-scheduler-expert-audit` |
| `chrony-expert` | Chrony/NTP time synchronization, chronyd, chronyc tracking/sources/sourcestats, makestep, drift, NTS, local server mode, time source selection, and safe time correction. | `chrony-expert-audit` |
| `date-timectl-expert` | system clock, timezone, timedatectl, systemd-timesyncd, hwclock/RTC, date command, time drift, timezone changes, NTP toggles, and app timestamp issues. | `date-timectl-expert-audit` |
| `quota-expert` | Linux user/group/project quotas, ext4 quota files, XFS quotas, quotaon/off, quotacheck, repquota, edquota, setquota, grace periods, inode/block limits, and multi-user capacity control. | `quota-expert-audit` |
| `disk-mounting-expert` | mount, umount, fstab, findmnt, lsblk, blkid, UUID/LABEL, bind mounts, NFS/CIFS, systemd mount units, boot mount failures, remounts, and safe mount validation. | `disk-mounting-expert-audit` |
| `filesystem-expert` | ext4, XFS, Btrfs, filesystem health, df/du mismatch, inode exhaustion, fsck/xfs_repair, grow/shrink, mount options, journaling, corruption triage, and data-safe repair planning. | `filesystem-expert-audit` |
| `kernel-expert` | Linux kernel versioning, boot parameters, modules, taints, panic/oops/soft lockup, kdump, initramfs, grub, live patching, sysrq, dmesg/journal-k triage, and safe kernel update/rollback planning. | `kernel-expert-audit` |
| `firewall-expert` | firewalld, nftables, iptables, UFW, ipset, NAT, forwarding, lockout-safe changes | `firewall-expert-audit` |
| `fail2ban-expert` | Fail2Ban jails, filters, actions, regex testing, dynamic bans, false-positive prevention | `fail2ban-expert-audit` |
| `command-expert` | Command selection, safe shell pipelines, grep/sed/awk/find/xargs, dry-runs, destructive command review | `command-expert-audit` |
| `user-permissions-expert` | Local/NSS users, groups, sudoers, service accounts, login rights, offboarding | `user-permissions-expert-audit` |
| `file-permissions-expert` | POSIX owner/group/mode bits, umask, setuid/setgid/sticky, traversal and recursive fixes | `file-permissions-expert-audit` |
| `acl-permissions-expert` | POSIX ACLs, masks, default ACL inheritance, getfacl/setfacl backup/restore | `acl-permissions-expert-audit` |
| `migration-expert` | OS/server/DB/patch/firewall/SFTP migrations, parallel agent dispatch, shared memory, cutover, rollback | `migration-expert-audit` |
| `named-expert` | ISC BIND/named DNS, zones, transfers, DNSSEC, views, RNDC, validation | `named-expert-audit` |
| `cf-expert` | Cloudflare DNS/WAF/cache/rate-limit/tunnels with MCP/API-safe workflows | `cf-expert-audit` |
| `dnsmasq-expert` | dnsmasq DNS cache/forwarder, DHCP, PXE/TFTP, split DNS, resolver loops | `dnsmasq-expert-audit` |
| `os-security-expert` | Linux OS security audit and hardening across SSH, sudo, MAC, auditd, sysctl, logging | `os-security-expert-audit` |
| `memory-expert` | Memory pressure, OOM killer, page cache, slab, cgroup/container memory limits, PSI | `memory-expert-audit` |
| `swap-expert` | Swap files, swap partitions, zram/zswap, vm.swappiness, swap sizing, OOM avoidance | `swap-expert-audit` |
| `ntp-expert` | NTP synchronization across chrony, ntpd, systemd-timesyncd, drift, offset, source quality | — |
| `natting-expert` | SNAT, DNAT, MASQUERADE, port forwarding, nftables/iptables NAT, conntrack, ip_forward | — |
| `bashrc-expert` | .bashrc, .bash_profile, aliases, functions, PATH, PS1, startup order, debug slow init | — |
| `zshrc-expert` | .zshrc, zshenv, zprofile, zlogin, aliases, plugins, prompt, startup order | — |
| `bash-script-expert` | Bash script creation, review, hardening, debugging, merging, cron/systemd-safe patterns | — |
| `shell-script-expert` | POSIX/portable shell, /bin/sh, dash/ash compatibility checks, Bash-to-portable migration | — |
| `grep-expert` | Token-saving log search with grep/ripgrep, journal pipelines, bounded evidence, pattern reuse | — |
| `auditd-expert` | auditd rule design, compliance evidence, file/syscall watches, safe rule rollout | — |
| `backup-restore-expert` | Backup planning, rsync/tar workflows, restore validation, ownership/ACL/SELinux label preservation | — |
| `incident-response-expert` | Linux incident triage, evidence collection, containment, timeline reconstruction | — |
| `logrotate-expert` | logrotate config, rotation triggers, compression, postrotate scripts, debug | — |
| `lvm-expert` | LVM PV/VG/LV management, resize, snapshot, thin provisioning, recovery | — |
| `mysql-expert` | MySQL/MariaDB config, replication, slow queries, recovery, permissions | — |
| `nginx-expert` | Nginx config, virtual hosts, reverse proxy, SSL termination, upstream tuning | — |
| `php-fpm-expert` | PHP-FPM pool config, worker sizing, slow log, socket/TCP mode tuning | — |
| `rsyslog-expert` | rsyslog config, rules, remote logging, filtering, performance tuning | — |
| `ssh-hardening-expert` | SSH config hardening, key auth, ciphers, fail2ban integration, lockout safety | — |
| `tcpdump-expert` | tcpdump captures, BPF filters, evidence extraction, token-saving analysis | — |

## Usage

```text
/linux-admin:diagnose <issue>
/linux-admin:sysctl-expert <sysctl tuning/audit task>
/linux-admin:systemd-expert <systemd service/unit task>
/linux-admin:limits-expert <limits/ulimit task>
/linux-admin:networking-expert <network investigation/tuning task>
/linux-admin:tcp-expert <TCP Expert task>
/linux-admin:udp-expert <UDP Expert task>
/linux-admin:package-manager-expert <APT/YUM/DNF/RPM package-management task>
/linux-admin:cron-scheduler-expert <Cron Scheduler Expert task>
/linux-admin:chrony-expert <Chrony Expert task>
/linux-admin:date-timectl-expert <Date / Timedatectl Expert task>
/linux-admin:quota-expert <Quota Expert task>
/linux-admin:disk-mounting-expert <Disk Mounting Expert task>
/linux-admin:filesystem-expert <Filesystem Expert task>
/linux-admin:kernel-expert <Kernel Expert task>
/linux-admin:firewall-expert <firewall investigation/change task>
/linux-admin:fail2ban-expert <fail2ban jail/filter/action task>
/linux-admin:command-expert <command review/build task>
/linux-admin:user-permissions-expert <user/group/sudo task>
/linux-admin:file-permissions-expert <chmod/chown/mode task>
/linux-admin:acl-permissions-expert <ACL/setfacl/getfacl task>
/linux-admin:migration-expert <migration planning and agent dispatch task>
```

## Safety model

All expert modules follow the same policy:

1. Read-only evidence first.
2. Identify the controlling layer before changing values.
3. Avoid generic overoptimization.
4. Propose minimal changes with exact rationale.
5. Include validation and rollback.
6. Ask confirmation for risky commands through the plugin safety hook.

```text
/linux-admin:named-expert <BIND/named DNS task>
/linux-admin:cf-expert <Cloudflare DNS/WAF/MCP task>
/linux-admin:dnsmasq-expert <dnsmasq DNS/DHCP task>
/linux-admin:os-security-expert <Linux OS security audit/hardening task>
/linux-admin:memory-expert <memory pressure/OOM/cgroup memory task>
/linux-admin:swap-expert <swap sizing/zram/swappiness task>
/linux-admin:ntp-expert <NTP sync/drift/source quality task>
/linux-admin:natting-expert <NAT/SNAT/DNAT/port-forward task>
/linux-admin:bashrc-expert <bash startup config task>
/linux-admin:zshrc-expert <zsh startup config task>
/linux-admin:bash-script-expert <bash script creation/review/debug task>
/linux-admin:shell-script-expert <portable shell compatibility check>
/linux-admin:grep-expert <token-saving log search or grep pipeline task>
/linux-admin:auditd-expert <audit rule design or compliance evidence task>
/linux-admin:backup-restore-expert <backup planning or restore validation task>
/linux-admin:incident-response-expert <Linux incident triage or containment task>
/linux-admin:logrotate-expert <logrotate config or rotation debug task>
/linux-admin:lvm-expert <LVM resize, snapshot, or recovery task>
/linux-admin:mysql-expert <MySQL/MariaDB config, replication, or recovery task>
/linux-admin:nginx-expert <Nginx config, proxy, or SSL task>
/linux-admin:php-fpm-expert <PHP-FPM pool config or slow log task>
/linux-admin:rsyslog-expert <rsyslog config or remote logging task>
/linux-admin:ssh-hardening-expert <SSH hardening or key auth task>
/linux-admin:tcpdump-expert <packet capture or tcpdump filter task>
```
| `change-plan-expert` | Linux production change planning, step ordering, blast-radius estimation, approval gates | — |
| `incident-timeline-expert` | Linux incident timeline reconstruction, event ordering, evidence correlation | — |
| `maintenance-window-expert` | Linux maintenance window design, scheduling, pre/post tasks, rollback triggers | — |
| `post-change-validation-expert` | Post-change health checks, service smoke tests, metric baselining, rollback triggers | — |
| `preflight-check-expert` | Pre-change validation, dependency checks, backup verification, go/no-go gates | — |
| `production-safety-expert` | Production guardrails, destructive-command review, blast-radius gating, safe rollout | — |
| `risk-assessment-expert` | Linux change risk scoring, production impact estimation, mitigation planning | — |
| `rollback-expert` | Linux rollback planning, recovery points, state restoration, safe cutover reversal | — |
| `root-cause-expert` | Linux incident root-cause analysis, evidence-based diagnosis, contributing factors | — |
| `ansible-expert` | Ansible playbook review, idempotency, CMDB/dynamic inventory, proxy/jump-host access, Python interpreter compatibility, production package update strategy, DR playbooks | — |
| `apache-expert` | Apache HTTPD vhosts, modules, MPM behavior, proxying, TLS, access control, safe reload | — |
| `apparmor-expert` | AppArmor profiles, policy enforcement, audit mode, confinement, safe rule design | — |
| `capacity-planning-expert` | CPU/memory/disk capacity projection, trend analysis, utilization thresholds, scaling triggers | — |
| `cpu-expert` | CPU saturation, steal time, softirq, run queue pressure, scheduler symptoms, safe tuning | — |
| `docker-expert` | Docker daemon, containers, images, volumes, networks, logs, resource limits, safe cleanup | — |
| `haproxy-expert` | HAProxy config, backends, health checks, ACLs, SSL offload, stick tables, safe reload | — |
| `io-wait-expert` | I/O wait diagnosis, iowait vs blocking vs slow disk, iostat/blktrace evidence | — |
| `iproute-expert` | ip command, routes, rules, namespaces, traffic control, network namespace isolation | — |
| `iscsi-expert` | iSCSI initiator/target, multipath, login issues, LUN management, safe disconnect | — |
| `kubernetes-node-expert` | Kubernetes node health, kubelet, CNI, disk/memory pressure, taints, safe remediation | — |
| `load-average-expert` | Load average interpretation, CPU vs I/O vs fork pressure, uptime/vmstat evidence | — |
| `multipath-expert` | Device multipath, dm-multipath config, path failures, failover, WWID binding | — |
| `nfs-expert` | NFS exports, mounts, stale handles, rpcbind, performance, safe unmount/remount | — |
| `pam-expert` | PAM stack, module order, auth/account/session/password chains, common pitfalls | — |
| `patching-expert` | Safe OS patching, rollback planning, kernel lockstep, pre/post validation gates | — |
| `podman-expert` | Podman rootless, pods, volumes, systemd quadlet/service integration | — |
| `postgresql-expert` | PostgreSQL health, connections, WAL/checkpoint, vacuum, replication lag, backup/restore | — |
| `process-expert` | Process states, zombie/orphan/stuck processes, signals, limits, strace/lsof evidence | — |
| `proxy-expert` | Forward/reverse proxy config, SSL termination, upstream health, caching, headers | — |
| `raid-expert` | mdadm RAID arrays, degraded state, rebuild, superblock recovery, safe replacement | — |
| `redis-expert` | Redis memory, eviction policy, persistence, replication, Sentinel, latency, config review | — |
| `routing-expert` | Linux routing table, policy routing, ECMP, static/dynamic route troubleshooting | — |
| `runbook-expert` | Structured runbook design, incident steps, validation gates, rollback procedures | — |
| `samba-expert` | Samba shares, auth, winbind, AD integration, permissions, VFS objects | — |
| `selinux-expert` | SELinux AVC denials, policy modules, file contexts, booleans, safe enforcement | — |
| `smart-disk-expert` | SMART data, disk health attributes, failing drive detection, safe replacement planning | — |
| `sssd-ldap-expert` | SSSD, LDAP, Kerberos, AD domain join, id mapping, offline auth, cache refresh | — |
| `sudoers-expert` | sudoers rules, NOPASSWD, Defaults, cmnd aliases, safe privilege delegation | — |
| `vlan-bonding-expert` | VLAN tagging, bonding modes, team config, failover testing, 802.3ad | — |
| `vulnerability-scan-expert` | Vulnerability scan evidence triage, CVE prioritization, remediation planning | — |

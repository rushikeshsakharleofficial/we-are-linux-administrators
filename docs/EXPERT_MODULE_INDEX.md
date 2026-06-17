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
```

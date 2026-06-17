<div align="center">

# linux-admin

**Senior Linux administrator and SRE mental model as a Claude Code plugin.**

[![License](https://img.shields.io/github/license/rushikeshsakharleofficial/we-are-linux-administrators?style=for-the-badge&labelColor=000000&color=A78BFA)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/blob/main/LICENSE)
[![Stars](https://img.shields.io/github/stars/rushikeshsakharleofficial/we-are-linux-administrators?style=for-the-badge&labelColor=000000&color=22D3EE)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/stargazers)
[![Build](https://img.shields.io/github/actions/workflow/status/rushikeshsakharleofficial/we-are-linux-administrators/validate.yml?style=for-the-badge&labelColor=000000&color=4ADE80)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/actions)
[![Version](https://img.shields.io/badge/version-1.17.2-F472B6?style=for-the-badge&labelColor=000000)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/blob/main/.claude-plugin/plugin.json)
[![Skills](https://img.shields.io/badge/skills-98-A78BFA?style=for-the-badge&labelColor=000000)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/tree/main/skills)

</div>

---

## What is this?

A Claude Code plugin that gives Claude Code a senior Linux administrator and SRE mental model. It provides **read-only-first diagnostics**, distro-aware command selection, evidence-based root-cause analysis, and safety gates that block or confirm destructive commands before they run.

98 task-specific expert skills covering boot, networking, storage, LVM, RAID, iSCSI, NFS, multipath, permissions, containers, Docker, Podman, Kubernetes nodes, kernel, auth, PAM, SSSD/LDAP, logging, auditd, rsyslog, logrotate, MySQL, PostgreSQL, Redis, Nginx, Apache, HAProxy, PHP-FPM, Samba, backup/restore, incident response, SSH hardening, tcpdump, Ansible, patching, SELinux, AppArmor, capacity planning, and more.

---

## Quick Start

**One-line npx installer (GitHub Release):**

```bash
npx github:rushikeshsakharleofficial/we-are-linux-administrators
```

**CLI marketplace:**

```bash
claude plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
claude plugin install linux-admin@we-are-linux-administrators
```

**Inside a Claude Code session:**

```text
/plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
/plugin install linux-admin@we-are-linux-administrators
```

**Local clone:**

```bash
git clone https://github.com/rushikeshsakharleofficial/we-are-linux-administrators.git
claude --plugin-dir ./we-are-linux-administrators
```

**Reload after install:**

```text
/reload-plugins
```

> Latest release: [v1.17.2](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/releases/tag/v1.17.2)

---

## Skills

### Core workflows

| Skill | Use |
|---|---|
| `/linux-admin:diagnose` | Main router — general Linux issue triage |
| `/linux-admin:boot` | Boot failures, emergency mode, initramfs, fstab, GRUB |
| `/linux-admin:service` | systemd services, restart loops, daemon crashes |
| `/linux-admin:network` | IP, routing, DNS, firewall, sockets |
| `/linux-admin:performance` | CPU, memory, OOM, load, latency |
| `/linux-admin:storage` | Disk full, inode full, LVM, RAID, filesystem, SMART |
| `/linux-admin:permissions` | POSIX permissions, ACLs, SELinux, AppArmor |
| `/linux-admin:packages` | apt / dnf / rpm / zypper / pacman package issues |
| `/linux-admin:kernel` | Panic, lockup, kdump, call traces |
| `/linux-admin:containers` | Docker, Podman, rootless, mounts, ports |
| `/linux-admin:auth` | SSH, sudo, PAM, LDAP, SSSD, user access |
| `/linux-admin:logs` | journald, rsyslog, monitoring, incident timeline |
| `/linux-admin:automation` | Scripts, Ansible, fleet triage |

### Networking & firewall

| Skill | Use |
|---|---|
| `/linux-admin:networking-expert` | Interfaces, routes, DNS, MTU, tc, ethtool, TCP evidence |
| `/linux-admin:firewall-expert` | firewalld, nftables, iptables, UFW, ipset, NAT |
| `/linux-admin:fail2ban-expert` | Jails, filters, actions, regex testing, false-positive prevention |
| `/linux-admin:natting-expert` | SNAT, DNAT, MASQUERADE, port forwarding, conntrack |
| `/linux-admin:tcp-expert` | TCP connection lifecycle, SYN backlog, retransmits, TIME_WAIT |
| `/linux-admin:udp-expert` | UDP datagrams, buffer drops, fragmentation, NAT timeouts |
| `/linux-admin:iproute-expert` | ip command, routes, rules, namespaces, traffic control |
| `/linux-admin:routing-expert` | Routing table, policy routing, ECMP, static/dynamic routes |
| `/linux-admin:vlan-bonding-expert` | VLAN tagging, bonding modes, 802.3ad, failover |
| `/linux-admin:proxy-expert` | Forward/reverse proxy, SSL, upstream health, caching |
| `/linux-admin:nfs-expert` | NFS exports, mounts, stale handles, performance |
| `/linux-admin:tcpdump-expert` | Packet captures, BPF filters, token-saving evidence |

### Storage & filesystems

| Skill | Use |
|---|---|
| `/linux-admin:lvm-expert` | LVM PV/VG/LV management, resize, snapshot, thin provisioning |
| `/linux-admin:filesystem-expert` | ext4, XFS, Btrfs, df/du mismatch, inode exhaustion, fsck |
| `/linux-admin:disk-mounting-expert` | mount, umount, fstab, UUID/LABEL, NFS/CIFS, systemd mounts |
| `/linux-admin:quota-expert` | User/group/project disk quotas, ext4/XFS quota |
| `/linux-admin:raid-expert` | mdadm RAID arrays, degraded state, rebuild, superblock |
| `/linux-admin:iscsi-expert` | iSCSI initiator/target, multipath, login, safe disconnect |
| `/linux-admin:multipath-expert` | dm-multipath, path failures, failover, WWID binding |
| `/linux-admin:smart-disk-expert` | SMART data, failing drive detection, safe replacement |
| `/linux-admin:backup-restore-expert` | rsync/tar workflows, restore validation, ACL preservation |
| `/linux-admin:logrotate-expert` | logrotate config, rotation triggers, postrotate scripts |

### Kernel & performance

| Skill | Use |
|---|---|
| `/linux-admin:kernel-expert` | Kernel panic, oops, kdump, initramfs, grub, live patching |
| `/linux-admin:sysctl-expert` | Kernel runtime parameters, safe tuning, anti-overoptimization |
| `/linux-admin:memory-expert` | OOM killer, PSI, page cache, slab, cgroup memory limits |
| `/linux-admin:swap-expert` | Swap files, zram/zswap, vm.swappiness, sizing |
| `/linux-admin:cpu-expert` | CPU saturation, steal time, softirq, run queue, scheduler |
| `/linux-admin:io-wait-expert` | I/O wait diagnosis, iowait vs blocking vs slow disk |
| `/linux-admin:load-average-expert` | Load average, CPU vs I/O vs fork pressure |
| `/linux-admin:process-expert` | Process states, zombie/stuck processes, strace, lsof |
| `/linux-admin:capacity-planning-expert` | Utilization trends, capacity projection, scaling triggers |

### Containers & orchestration

| Skill | Use |
|---|---|
| `/linux-admin:docker-expert` | Docker daemon, containers, volumes, networks, resource limits |
| `/linux-admin:podman-expert` | Podman rootless, pods, systemd quadlet integration |
| `/linux-admin:kubernetes-node-expert` | Kubernetes node health, kubelet, CNI, disk/memory pressure |

### Databases & middleware

| Skill | Use |
|---|---|
| `/linux-admin:mysql-expert` | MySQL/MariaDB config, replication, slow queries, recovery |
| `/linux-admin:postgresql-expert` | PostgreSQL health, WAL/checkpoint, vacuum, replication |
| `/linux-admin:redis-expert` | Redis memory, eviction, persistence, replication, Sentinel |
| `/linux-admin:nginx-expert` | Nginx vhosts, reverse proxy, SSL termination, upstream tuning |
| `/linux-admin:apache-expert` | Apache HTTPD vhosts, modules, MPM, proxying, TLS |
| `/linux-admin:haproxy-expert` | HAProxy backends, health checks, ACLs, SSL offload |
| `/linux-admin:php-fpm-expert` | PHP-FPM pool config, worker sizing, slow log, socket/TCP mode |
| `/linux-admin:samba-expert` | Samba shares, auth, winbind, AD integration, permissions |

### Auth & security

| Skill | Use |
|---|---|
| `/linux-admin:os-security-expert` | Linux OS security audit across SSH, sudo, MAC, auditd, sysctl |
| `/linux-admin:ssh-hardening-expert` | SSH config hardening, key auth, ciphers, lockout safety |
| `/linux-admin:auditd-expert` | auditd rule design, compliance evidence, file/syscall watches |
| `/linux-admin:selinux-expert` | SELinux AVC denials, policy modules, contexts, booleans |
| `/linux-admin:apparmor-expert` | AppArmor profiles, enforcement, audit mode, safe rule design |
| `/linux-admin:pam-expert` | PAM stack, module order, auth/account/session/password chains |
| `/linux-admin:sssd-ldap-expert` | SSSD, LDAP, Kerberos, AD domain join, id mapping, cache |
| `/linux-admin:user-permissions-expert` | Users, groups, sudoers, service accounts, offboarding |
| `/linux-admin:file-permissions-expert` | POSIX modes, ownership, umask, safe recursive chmod/chown |
| `/linux-admin:acl-permissions-expert` | POSIX ACLs, masks, default ACLs, getfacl/setfacl backup |
| `/linux-admin:sudoers-expert` | sudoers rules, NOPASSWD, Defaults, safe privilege delegation |
| `/linux-admin:vulnerability-scan-expert` | CVE triage, scan evidence prioritization, remediation planning |

### Time, logging & DNS

| Skill | Use |
|---|---|
| `/linux-admin:chrony-expert` | Chrony/NTP drift, sources, makestep, safe time correction |
| `/linux-admin:date-timectl-expert` | Timezone, timedatectl, hwclock, NTP toggles, app timestamps |
| `/linux-admin:ntp-expert` | NTP sync across chrony/ntpd/timesyncd, offset, drift |
| `/linux-admin:rsyslog-expert` | rsyslog config, rules, remote logging, filtering, performance |
| `/linux-admin:named-expert` | ISC BIND/named DNS, zones, DNSSEC, views, RNDC |
| `/linux-admin:dnsmasq-expert` | dnsmasq DNS cache, DHCP, PXE/TFTP, split DNS |
| `/linux-admin:cf-expert` | Cloudflare DNS/WAF/cache/rate-limit/tunnels with MCP |
| `/linux-admin:grep-expert` | Token-saving log search, journal pipelines, bounded evidence |

### Automation & ops

| Skill | Use |
|---|---|
| `/linux-admin:ansible-expert` | Playbook review, idempotency, CMDB inventory, proxy/jump hosts, interpreter compat, DR playbooks |
| `/linux-admin:patching-expert` | Safe OS patching, rollback planning, pre/post validation |
| `/linux-admin:cron-scheduler-expert` | cron/crond, systemd timers, missed jobs, DST issues |
| `/linux-admin:systemd-expert` | Unit design, drop-ins, restart loops, cgroups, service hardening |
| `/linux-admin:limits-expert` | ulimit, PAM limits, systemd Limit*, nofile/nproc sizing |
| `/linux-admin:migration-expert` | OS/server/DB migrations, parallel agents, cutover, rollback |
| `/linux-admin:incident-response-expert` | Incident triage, evidence collection, containment, timeline |
| `/linux-admin:runbook-expert` | Structured runbook design, validation gates, rollback procedures |
| `/linux-admin:bash-script-expert` | Bash script creation, review, hardening, cron/systemd-safe |
| `/linux-admin:shell-script-expert` | POSIX/portable shell, dash/ash compatibility checks |
| `/linux-admin:command-expert` | Safe shell pipelines, destructive command review, dry-runs |

### Operational workflow

| Skill | Use |
|---|---|
| `/linux-admin:change-plan-expert` | Production change planning, step ordering, blast-radius estimation, approval gates |
| `/linux-admin:preflight-check-expert` | Pre-change validation, dependency checks, backup verification, go/no-go gates |
| `/linux-admin:risk-assessment-expert` | Change risk scoring, production impact estimation, mitigation planning |
| `/linux-admin:production-safety-expert` | Production guardrails, destructive-command review, blast-radius gating |
| `/linux-admin:maintenance-window-expert` | Maintenance window design, scheduling, pre/post tasks, rollback triggers |
| `/linux-admin:post-change-validation-expert` | Post-change health checks, service smoke tests, metric baselining |
| `/linux-admin:rollback-expert` | Rollback planning, recovery points, state restoration, safe cutover reversal |
| `/linux-admin:root-cause-expert` | Incident root-cause analysis, evidence-based diagnosis, contributing factors |
| `/linux-admin:incident-timeline-expert` | Incident timeline reconstruction, event ordering, evidence correlation |

### Shell & config

| Skill | Use |
|---|---|
| `/linux-admin:bashrc-expert` | .bashrc/.bash_profile, aliases, PATH, prompt, startup order |
| `/linux-admin:zshrc-expert` | .zshrc/zshenv/zprofile, plugins, prompt, startup order |
| `/linux-admin:package-manager-expert` | Fix broken apt/dpkg/dnf transactions safely |

---

## Triage scripts

`bin/` is added to Claude Code's Bash PATH when the plugin is active:

```bash
linux-triage                   # general host triage snapshot
linux-log-classifier           # classify journal/syslog errors by severity
sysctl-expert-audit
systemd-expert-audit
limits-expert-audit
networking-expert-audit
firewall-expert-audit
fail2ban-expert-audit
command-expert-audit
user-permissions-expert-audit
file-permissions-expert-audit
acl-permissions-expert-audit
```

---

## Safety hook

The plugin installs a `PreToolUse` Bash safety hook:

- **Class 3** destructive commands are denied outright.
- **Class 2** disruptive commands require explicit user confirmation.
- **Read-only** commands pass through without interruption.

This is a guardrail, not a replacement for human review.

---

## Non-Claude agents

Claude Code plugins are Claude-specific. For Codex or Gemini, use the adapter files:

- `codex/AGENTS.md` — Codex prompt adapter
- `gemini/GEMINI.md` — Gemini prompt adapter
- `docs/tasks/` — standalone task files for any agent

---

## Project structure

```
agents/          linux-sre subagent definition
bin/             triage scripts added to PATH
codex/           Codex/OpenAI adapter prompts
docs/            skill documentation and task files
gemini/          Gemini adapter prompts
hooks/           PreToolUse safety hook
scripts/         utility and validation scripts
skills/          skill definitions (98 skills)
templates/       reusable prompt templates
tests/           plugin validation tests
```

---

## Documentation

| Resource | Description |
|---|---|
| [`docs/USAGE.md`](docs/USAGE.md) | Deep usage guide — every skill, examples, workflows, tips |
| [`docs/EXPERT_MODULE_INDEX.md`](docs/EXPERT_MODULE_INDEX.md) | Full index of all expert modules and audit helpers |
| [`docs/core/`](docs/core/) | Operating principles, distro detection, safety policy, diagnostic method |
| [`docs/tasks/`](docs/tasks/) | Standalone task files for non-Claude agents |
| [`codex/AGENTS.md`](codex/AGENTS.md) | Codex adapter |
| [`gemini/GEMINI.md`](gemini/GEMINI.md) | Gemini adapter |

---

## Contributing

Open a PR with a new skill directory under `skills/` and a matching test in `tests/`. Follow the naming pattern of existing skills (`<topic>-expert` for deep-dive skills, plain topic names for workflow skills).

<a href="https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=rushikeshsakharleofficial/we-are-linux-administrators" />
</a>

---

## License

MIT — see [LICENSE](LICENSE).

---

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=rushikeshsakharleofficial/we-are-linux-administrators&type=Date)](https://star-history.com/#rushikeshsakharleofficial/we-are-linux-administrators&Date)

</div>

# linux-admin Plugin — Usage Guide

## Table of Contents

- [Mental model](#mental-model)
- [Install](#install)
- [How the plugin works](#how-the-plugin-works)
  - [Confidence bands](#confidence-bands)
  - [Safety classes](#safety-classes)
  - [Output format](#output-format)
- [Core skills](#core-skills)
- [Expert skills](#expert-skills)
- [Triage scripts](#triage-scripts)
- [Real-world workflows](#real-world-workflows)
- [Non-Claude agents](#non-claude-agents)
- [Tips](#tips)

---

## Mental model

Every skill in this plugin follows one discipline:

1. **Read-only first.** Gather evidence before touching state.
2. **Detect environment.** Distro, kernel, package manager, init system, privilege level.
3. **Tie conclusions to evidence.** Every hypothesis must cite command output, logs, or config.
4. **Separate diagnosis from remediation.** Know the cause before proposing a fix.
5. **Validate and rollback.** Every change comes with a validation command and rollback path.

The plugin will never flush a firewall, rebuild initramfs, or `chmod -R 777` as a first move. It will tell you what to run first, what the output means, and what to do next only after it sees evidence.

---

## Install

**One-line npx installer (GitHub Release v1.17.2):**

```bash
npx github:rushikeshsakharleofficial/we-are-linux-administrators
```

**Via Claude Code marketplace:**

```bash
claude plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
claude plugin install linux-admin@we-are-linux-administrators
```

**Via slash commands inside Claude Code:**

```text
/plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
/plugin install linux-admin@we-are-linux-administrators
```

**Locally:**

```bash
git clone https://github.com/rushikeshsakharleofficial/we-are-linux-administrators.git
claude --plugin-dir ./we-are-linux-administrators
```

Reload after updates:

```text
/reload-plugins
```

---

## How the plugin works

### Confidence bands

The plugin scales its behavior based on how much evidence it has:

| Confidence | Behavior |
|---|---|
| < 40% | Stay read-only. State uncertainty. Ask one critical clarification if needed. |
| 40–75% | Continue subsystem diagnostics. Avoid changes. Rank hypotheses. |
| 75–90% | Propose likely fix with confirmation gate and rollback. |
| > 90% | Concise diagnosis and guarded remediation. |

### Safety classes

The `PreToolUse` hook enforces three classes:

| Class | Examples | Default |
|---|---|---|
| **Class 0** read-only | `systemctl status`, `journalctl`, `ss -lntup`, `ip route`, `df`, `lsblk` | Always allowed |
| **Class 1** low-risk reversible | `systemctl reload <noncritical>`, `restorecon -Rv <path>`, `setfacl -m` | Confirm if production |
| **Class 2** disruptive | `systemctl restart sshd`, `firewall-cmd --reload`, `nft -f`, `dnf install`, `update-initramfs`, `reboot` | Always requires explicit confirmation |
| **Class 3** destructive | `mkfs.*`, `fsck -y`, `lvreduce`, `rm -rf`, `chmod -R 777`, `iptables -F`, `setenforce 0` | Denied by default |

The hook is a guardrail. It cannot replace human review for critical infrastructure.

### Output format

Every troubleshooting answer follows this structure:

```
## Classification
Primary issue class. Secondary if applicable.

## Safety
Read-only / low-risk / disruptive / destructive — and why.

## Immediate commands
Read-only commands to run first.

## Expected signals
Table: signal → meaning → next branch.

## Ranked hypotheses
1. Cause — evidence needed.
2. Cause — evidence needed.

## Fix path
Guarded. No action without confirmation.

## Validation
Commands to confirm the fix worked.

## Rollback
Steps to undo if the fix makes things worse.
```

---

## Core skills

### `/linux-admin:diagnose`

Main entry point. Use when unsure which skill applies, or for general Linux triage.

```text
/linux-admin:diagnose nginx.service failed after config change
/linux-admin:diagnose server OOM killer fired overnight
/linux-admin:diagnose user cannot sudo on this host
/linux-admin:diagnose SSH connection drops after 60 seconds
/linux-admin:diagnose intermittent 502 from upstream after deploy
```

Routes internally to the correct task file based on the symptom.

---

### `/linux-admin:boot`

Boot failures, emergency mode, initramfs, fstab, crypttab, GRUB, root device issues.

```text
/linux-admin:boot system boots into emergency mode after kernel update
/linux-admin:boot "cannot find root filesystem" on RHEL 9
/linux-admin:boot initramfs shell on Ubuntu — new LVM volume
/linux-admin:boot dracut fails — LUKS-encrypted root
/linux-admin:boot GRUB shows only grub> prompt after disk replacement
```

**What it checks first:**
`/proc/cmdline`, `lsblk -f`, `blkid`, `findmnt`, `systemctl --failed`, `journalctl -b -p err..alert`, `/etc/fstab`, `/etc/crypttab`, `pvs/vgs/lvs`, `/proc/mdstat`.

**What requires confirmation:**
fstab edits, initramfs rebuild (`update-initramfs -u`, `dracut -f`), GRUB regeneration.

---

### `/linux-admin:service`

systemd service failures, restart loops, daemon crashes, dependency chains.

```text
/linux-admin:service postgresql.service fails on start — no error in logs
/linux-admin:service nginx restart loop — unit enters failed state
/linux-admin:service app.service dependency cycle with redis.service
/linux-admin:service service starts but immediately exits — ExecStart returns 0
```

---

### `/linux-admin:network`

IP addressing, routing, DNS resolution, firewall blocking, socket state.

```text
/linux-admin:network can ping 8.8.8.8 but DNS fails
/linux-admin:network port 5432 reachable locally but not remotely
/linux-admin:network interface eth1 disappears after reboot
/linux-admin:network default route missing after NetworkManager restart
```

---

### `/linux-admin:performance`

CPU, memory, OOM killer, load average, I/O latency, slow host.

```text
/linux-admin:performance load average 40 on 4-core host — CPU idle at 95%
/linux-admin:performance OOM killer killed java process at 03:00 daily
/linux-admin:performance high iowait on /dev/sdb since last deployment
/linux-admin:performance postgres queries slow — CPU normal, memory normal
```

---

### `/linux-admin:storage`

Disk full, inode exhaustion, LVM, RAID, SMART, filesystem corruption.

```text
/linux-admin:storage /var is full but du does not match df
/linux-admin:storage inode exhaustion on /tmp — disk shows space available
/linux-admin:storage /dev/sda SMART shows reallocated sector count rising
/linux-admin:storage LVM thin pool is at 95% — application still writing
```

---

### `/linux-admin:permissions`

POSIX permissions, ACLs, SELinux denials, AppArmor blocks.

```text
/linux-admin:permissions permission denied on /data — owner and mode look correct
/linux-admin:permissions SELinux AVC denial for nginx accessing /srv/app
/linux-admin:permissions AppArmor blocking mysqld write to /var/lib/mysql-new
/linux-admin:permissions getfacl shows #effective:r-- but user should have rwx
```

---

### `/linux-admin:packages`

Package install/remove/upgrade failures, repo issues, transaction history.

```text
/linux-admin:packages apt upgrade fails — dpkg lock held after crash
/linux-admin:packages dnf update breaks python3 dependency
/linux-admin:packages yum history rollback after bad kernel update
/linux-admin:packages pacman database lock — process not running
```

---

### `/linux-admin:kernel`

Kernel panic, soft/hard lockup, kdump, call traces, dmesg errors.

```text
/linux-admin:kernel kernel panic: not syncing — VFS cannot mount root
/linux-admin:kernel soft lockup on CPU 3 — dmesg shows RCU stall
/linux-admin:kernel BUG: unable to handle kernel paging request
/linux-admin:kernel kdump not capturing — check kdump service
```

---

### `/linux-admin:containers`

Docker, Podman, rootless containers, mount issues, port conflicts, network.

```text
/linux-admin:containers docker container exits immediately — no logs
/linux-admin:containers podman rootless — permission denied on bind mount
/linux-admin:containers container port 80 not reachable — iptables conflict
/linux-admin:containers overlay storage driver errors on container start
```

---

### `/linux-admin:auth`

SSH login failures, sudo issues, PAM config, LDAP/SSSD problems.

```text
/linux-admin:auth SSH publickey authentication fails for deploy user
/linux-admin:auth sudo: PAM authentication failure — user exists, password correct
/linux-admin:auth SSSD not resolving AD users after domain rejoin
/linux-admin:auth pam_faillock locking out users incorrectly
```

---

### `/linux-admin:logs`

journald analysis, rsyslog config, log rotation, incident timeline reconstruction.

```text
/linux-admin:logs reconstruct what happened between 02:00 and 03:00 last night
/linux-admin:logs rsyslog not forwarding to remote syslog server
/linux-admin:logs journald disk usage at 10GB — needs rotation policy
/linux-admin:logs classify all error-level events from last boot
```

---

### `/linux-admin:automation`

Shell scripts, Ansible, fleet triage, repeatable diagnostic patterns.

```text
/linux-admin:automation write a script to check disk, memory, and failed services on 50 hosts
/linux-admin:automation Ansible playbook to audit sudoers across fleet
/linux-admin:automation bash script to safely rotate logs older than 30 days
```

---

## Expert skills

Expert skills go deeper than core skills. They require more evidence, produce more detailed analysis, and have stricter change controls.

---

### `/linux-admin:sysctl-expert`

Kernel runtime parameters — audit, explain, profile, tune, harden.

```text
/linux-admin:sysctl-expert audit current sysctl for a high-traffic nginx server
/linux-admin:sysctl-expert explain net.ipv4.tcp_tw_reuse — when is it safe?
/linux-admin:sysctl-expert generate sysctl.d profile for PostgreSQL on 64GB host
/linux-admin:sysctl-expert vm.swappiness is 60 — should I change it?
/linux-admin:sysctl-expert harden sysctl for CIS benchmark compliance
```

**Never does:** cargo-cult tuning. Every proposed value includes current value, proposed value, reason, risk, rollback, and validation command.

---

### `/linux-admin:systemd-expert`

systemd unit design, drop-ins, restart loops, cgroup resource control, hardening.

```text
/linux-admin:systemd-expert design a systemd service for a Go API binary
/linux-admin:systemd-expert why does my service restart loop — Type=simple, ExecStart forks
/linux-admin:systemd-expert add CPUQuota and MemoryLimit to postgres.service safely
/linux-admin:systemd-expert harden app.service with systemd sandboxing directives
/linux-admin:systemd-expert create a drop-in to override restart policy without editing vendor unit
```

---

### `/linux-admin:limits-expert`

ulimit, PAM limits, systemd resource limits — sizing and anti-overoptimization.

```text
/linux-admin:limits-expert postgres hitting "too many open files" — ulimit shows 65536
/linux-admin:limits-expert size LimitNOFILE for elasticsearch on 128GB host
/linux-admin:limits-expert why does /etc/security/limits.conf not apply to this service?
/linux-admin:limits-expert audit current limits across all running services
```

---

### `/linux-admin:networking-expert`

Deep network analysis — interfaces, routes, DNS, MTU, tc, ethtool, TCP evidence.

```text
/linux-admin:networking-expert server can ping IP but DNS and HTTPS fail — same host
/linux-admin:networking-expert MTU mismatch causing packet loss on VPN
/linux-admin:networking-expert tc qdisc showing drops on bond0 under load
/linux-admin:networking-expert ethtool shows rx_missed_errors increasing on eth0
/linux-admin:networking-expert ECMP routing not balancing traffic as expected
```

---

### `/linux-admin:tcp-expert`

TCP connection lifecycle, SYN backlog, TIME_WAIT, retransmits, congestion control.

```text
/linux-admin:tcp-expert SYN backlog overflow — accept queue full under load
/linux-admin:tcp-expert TIME_WAIT exhausting ephemeral ports on outbound connections
/linux-admin:tcp-expert high retransmit rate on one network segment only
/linux-admin:tcp-expert tune tcp_rmem and tcp_wmem for 10Gbps bulk transfer
/linux-admin:tcp-expert CLOSE_WAIT sockets accumulating — application not closing
```

---

### `/linux-admin:udp-expert`

UDP datagrams, DNS/NTP/syslog/VPN behavior, packet loss, buffer drops, fragmentation.

```text
/linux-admin:udp-expert UDP receive buffer drops on syslog collector under load
/linux-admin:udp-expert NTP packets fragmented — PMTU issue with VXLAN tunnel
/linux-admin:udp-expert WireGuard handshake succeeds but traffic drops intermittently
/linux-admin:udp-expert conntrack UDP timeout too short for custom RADIUS traffic
```

---

### `/linux-admin:firewall-expert`

firewalld, nftables, iptables, UFW, ipset — lockout-safe changes and rule design.

```text
/linux-admin:firewall-expert add allow rule for port 8443 in firewalld — production host
/linux-admin:firewall-expert nftables rule to rate-limit SSH to 5 connections per minute
/linux-admin:firewall-expert docker iptables rules conflicting with firewalld zones
/linux-admin:firewall-expert migrate iptables ruleset to nftables safely
/linux-admin:firewall-expert UFW enabling locked me out — recovery procedure
```

**Core rule:** Never flush or reset as a first fix. Always: show rules → identify the specific block → add narrow rule → validate from source → persist after test.

---

### `/linux-admin:fail2ban-expert`

Fail2Ban jails, filters, actions, regex testing, false-positive prevention.

```text
/linux-admin:fail2ban-expert fail2ban not banning failed SSH logins — jail enabled
/linux-admin:fail2ban-expert write custom filter for nginx auth failures
/linux-admin:fail2ban-expert legitimate users getting banned — tune findtime and maxretry
/linux-admin:fail2ban-expert fail2ban action uses iptables but firewalld is active
```

---

### `/linux-admin:command-expert`

Command review, safe shell pipelines, destructive command safety, find/grep/awk/sed.

```text
/linux-admin:command-expert review this before I run: find / -name "*.log" -mtime +30 -delete
/linux-admin:command-expert write a safe xargs pipeline to delete files from a list
/linux-admin:command-expert what does this do: awk 'NR%2==0' | sed 's/foo/bar/g' > out
/linux-admin:command-expert dry-run mode for rsync --delete before running it
```

---

### `/linux-admin:user-permissions-expert`

Users, groups, sudoers, service accounts, login rights, offboarding.

```text
/linux-admin:user-permissions-expert design least-privilege sudo for deploy user
/linux-admin:user-permissions-expert create service account for prometheus — no shell, no login
/linux-admin:user-permissions-expert audit all users with UID 0 on this host
/linux-admin:user-permissions-expert offboard departed employee — checklist
```

---

### `/linux-admin:file-permissions-expert`

POSIX modes, ownership, umask, setuid/setgid/sticky, safe recursive fixes.

```text
/linux-admin:file-permissions-expert fix app directory write permission — app runs as www-data
/linux-admin:file-permissions-expert why does sticky bit on /tmp not prevent this deletion?
/linux-admin:file-permissions-expert safe recursive chmod — only directories, not files
/linux-admin:file-permissions-expert setuid binary audit on this host
```

---

### `/linux-admin:acl-permissions-expert`

POSIX ACLs, masks, default ACL inheritance, getfacl/setfacl backup/restore.

```text
/linux-admin:acl-permissions-expert explain why getfacl shows #effective:r-- for this user
/linux-admin:acl-permissions-expert set default ACL so new files inherit group write
/linux-admin:acl-permissions-expert backup and restore ACLs before migration
/linux-admin:acl-permissions-expert ACL not propagating to new subdirectories
```

---

### `/linux-admin:package-manager-expert`

APT, dpkg, DNF, YUM, RPM — broken transactions, repo issues, safe recovery.

```text
/linux-admin:package-manager-expert dpkg interrupted — package in broken state
/linux-admin:package-manager-expert dnf transaction fails — dependency resolution loop
/linux-admin:package-manager-expert hold specific kernel package from auto-update in apt
/linux-admin:package-manager-expert rpm database corrupt — recovery options
```

---

### `/linux-admin:cron-scheduler-expert`

cron, crond, crontab, anacron, systemd timers — silent failures, PATH, environment.

```text
/linux-admin:cron-scheduler-expert backup cron ran manually but not via crontab
/linux-admin:cron-scheduler-expert cron job works as root but not as appuser
/linux-admin:cron-scheduler-expert migrate cron job to systemd timer with logging
/linux-admin:cron-scheduler-expert DST transition caused double-run of nightly job
```

---

### `/linux-admin:chrony-expert`

Chrony/NTP — drift, source quality, makestep, NTS, local server mode.

```text
/linux-admin:chrony-expert chronyc tracking shows large offset — safe correction
/linux-admin:chrony-expert audit NTP source quality across fleet
/linux-admin:chrony-expert configure chrony as local NTP server for isolated network
/linux-admin:chrony-expert chrony not syncing after network interface change
```

---

### `/linux-admin:date-timectl-expert`

System clock, timezone, timedatectl, hwclock, application timestamp issues.

```text
/linux-admin:date-timectl-expert fix timezone mismatch between system and application logs
/linux-admin:date-timectl-expert hwclock drifts 10 minutes after power cycle
/linux-admin:date-timectl-expert timedatectl shows NTP: no — safe fix
/linux-admin:date-timectl-expert container timestamps wrong — host time is correct
```

---

### `/linux-admin:quota-expert`

User/group/project disk quotas, ext4/XFS quotas, grace periods, inode/block limits.

```text
/linux-admin:quota-expert design user quota policy for /home — 20GB soft, 25GB hard
/linux-admin:quota-expert XFS project quota for /var/log per application
/linux-admin:quota-expert quotacheck needed after unclean shutdown — safe procedure
/linux-admin:quota-expert user over quota but cannot delete files — investigate
```

---

### `/linux-admin:disk-mounting-expert`

mount, umount, fstab, findmnt, UUID/LABEL, bind mounts, NFS/CIFS, systemd mount units.

```text
/linux-admin:disk-mounting-expert validate fstab before reboot — new NFS entry
/linux-admin:disk-mounting-expert NFS mount hangs at boot — systemd mount unit timeout
/linux-admin:disk-mounting-expert bind mount /srv/data to /app/data — persist across reboot
/linux-admin:disk-mounting-expert UUID changed after disk replacement — fstab not updated
```

---

### `/linux-admin:filesystem-expert`

ext4, XFS, Btrfs — df/du mismatch, inode exhaustion, fsck/xfs_repair, grow/shrink.

```text
/linux-admin:filesystem-expert df shows 100% but du shows 60% — deleted files held open
/linux-admin:filesystem-expert ext4 filesystem errors in dmesg — online or offline repair?
/linux-admin:filesystem-expert grow XFS filesystem after LVM extend
/linux-admin:filesystem-expert Btrfs balance stuck at 50% for 2 hours
```

---

### `/linux-admin:kernel-expert`

Kernel panic, oops, soft lockup, kdump, module taints, safe kernel update/rollback.

```text
/linux-admin:kernel-expert triage kernel panic from kdump vmcore
/linux-admin:kernel-expert soft lockup on CPU 0 — RCU stall in dmesg
/linux-admin:kernel-expert module tainted after third-party driver install
/linux-admin:kernel-expert kdump not enabled — configure without reboot if possible
/linux-admin:kernel-expert safe kernel rollback after bad update on RHEL 9
```

---

### `/linux-admin:migration-expert`

OS migration, server clone, database migration, cutover planning, rollback.

```text
/linux-admin:migration-expert plan migration from CentOS 7 to Rocky Linux 9
/linux-admin:migration-expert clone production server to staging — checklist
/linux-admin:migration-expert zero-downtime postgres major version upgrade plan
/linux-admin:migration-expert firewall rule migration from iptables to nftables
```

---

### `/linux-admin:named-expert`

ISC BIND/named — zones, transfers, DNSSEC, views, RNDC, validation.

```text
/linux-admin:named-expert zone transfer failing between primary and secondary
/linux-admin:named-expert DNSSEC validation errors — DS record mismatch
/linux-admin:named-expert named views — split horizon for internal vs external clients
/linux-admin:named-expert rndc reload fails after config edit
```

---

### `/linux-admin:cf-expert`

Cloudflare DNS, WAF, cache, rate limits, tunnels — MCP/API-safe workflows.

```text
/linux-admin:cf-expert diagnose Cloudflare 522 origin connection timeout
/linux-admin:cf-expert WAF rule blocking legitimate API traffic
/linux-admin:cf-expert configure Cloudflare tunnel for self-hosted app
/linux-admin:cf-expert cache purge strategy for CDN after deployment
```

---

### `/linux-admin:dnsmasq-expert`

dnsmasq DNS cache/forwarder, DHCP, PXE/TFTP, split DNS, resolver loops.

```text
/linux-admin:dnsmasq-expert dnsmasq DHCP not assigning addresses in new subnet
/linux-admin:dnsmasq-expert configure PXE boot via dnsmasq for Ubuntu netinstall
/linux-admin:dnsmasq-expert split DNS — internal domain resolves locally, rest upstream
/linux-admin:dnsmasq-expert dnsmasq forwarding loop with systemd-resolved
```

---

### `/linux-admin:os-security-expert`

Linux OS security audit and hardening — SSH, sudo, MAC, auditd, sysctl, logging.

```text
/linux-admin:os-security-expert CIS benchmark audit for RHEL 9
/linux-admin:os-security-expert harden SSH — disable root login, key-only auth
/linux-admin:os-security-expert configure auditd to log privilege escalation
/linux-admin:os-security-expert review sudoers for privilege creep
```

---

## Triage scripts

When the plugin is active, these commands are available directly in your shell:

| Command | Purpose |
|---|---|
| `linux-triage` | Full host triage snapshot — distro, kernel, uptime, failed services, disk, memory, top processes |
| `linux-log-classifier` | Classify journal/syslog events by severity with counts |
| `sysctl-expert-audit` | Dump current sysctl state for expert review |
| `systemd-expert-audit` | List all units, failed units, and override status |
| `limits-expert-audit` | Show PAM limits, systemd unit limits, and per-process limits |
| `networking-expert-audit` | Interfaces, routes, DNS, sockets, firewall status snapshot |
| `firewall-expert-audit` | Active rules from firewalld, nftables, iptables, UFW |
| `fail2ban-expert-audit` | Active jails, ban counts, recent bans |
| `command-expert-audit` | Recent bash history review for dangerous commands |
| `user-permissions-expert-audit` | Users with sudo, UID 0 accounts, recent login activity |
| `file-permissions-expert-audit` | SUID/SGID binaries, world-writable files |
| `acl-permissions-expert-audit` | Files with non-default ACLs in common directories |

Run any of these first to give the plugin structured evidence to work from.

---

## Real-world workflows

### Incident: service down, unknown cause

```text
/linux-admin:diagnose app.service is down — no recent changes visible
```

The plugin will:
1. Request `systemctl status app.service`, `journalctl -u app.service -b --no-pager -n 100`
2. Identify the failure type (exit code, signal, dependency, resource limit)
3. Route to the right subsystem (service, storage, auth, limits, etc.)
4. Propose targeted next commands
5. Gate any `systemctl restart` behind explicit confirmation

---

### Audit: pre-production hardening

```text
/linux-admin:os-security-expert CIS Level 2 audit for Ubuntu 22.04 before go-live
```

Then run the triage scripts to give it raw data:

```bash
linux-triage
sysctl-expert-audit
user-permissions-expert-audit
file-permissions-expert-audit
```

Paste the output. The plugin maps findings to controls and proposes remediation in priority order.

---

### Tuning: database server under load

```text
/linux-admin:sysctl-expert generate safe sysctl profile for PostgreSQL 15 on 128GB host — high write workload
```

Then:

```text
/linux-admin:limits-expert size LimitNOFILE and LimitNPROC for postgres.service on the same host
```

The plugin will request current values before proposing anything and will reject generic tuning that doesn't match the measured bottleneck.

---

### Emergency: firewall locked out SSH

```text
/linux-admin:firewall-expert I may have locked myself out — SSH connection is still open
```

The plugin will:
1. Ask what firewall is active (firewalld, nftables, iptables, UFW)
2. Guide you through adding a rescue rule from the existing session
3. Set a rollback timer pattern
4. Validate from a second path before closing the rescue session

---

### Migration: CentOS 7 end-of-life

```text
/linux-admin:migration-expert plan in-place migration from CentOS 7 to Rocky Linux 9 — PostgreSQL and nginx
```

The plugin produces a phased plan: pre-migration audit → backup strategy → conversion steps → validation gates → rollback criteria.

---

## Non-Claude agents

The plugin ships adapter files for other AI coding agents:

| File | Use |
|---|---|
| `codex/AGENTS.md` | Codex/OpenAI — import this as the system prompt |
| `gemini/GEMINI.md` | Gemini CLI — import this as the system prompt |
| `docs/tasks/*.md` | Individual task files — load any one into any agent |

The task files are standalone: they contain the full diagnostic workflow for one issue class and do not depend on the plugin machinery.

---

## Tips

**Give context upfront.** The more you include — distro, kernel, error text, relevant command output — the faster the plugin reaches a concrete diagnosis. Copy-paste the exact error message or `journalctl` output rather than paraphrasing.

**Run the triage script first.** `linux-triage` gives the plugin a structured snapshot in one command. Paste it as context before invoking any skill.

**Use expert skills for deep problems.** Core skills (`diagnose`, `network`, `storage`) are breadth-first. Expert skills (`networking-expert`, `filesystem-expert`, `sysctl-expert`) go deep into one subsystem. Switch when you know the domain.

**Let it stay read-only.** If the plugin stops at "run these first and share the output," that is intentional. It does not have enough evidence to propose a safe fix yet. Paste the output and continue.

**Check the audit helpers.** Each expert skill has a paired `*-audit` script that dumps the relevant state. Run it before the skill invocation to pre-load evidence.

**Remote hosts.** For any skill on a remote host, confirm that out-of-band access (iDRAC, IPMI, cloud serial console, second SSH session) is available before approving any network, firewall, SSH, or bootloader change.

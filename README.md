# we-are-linux-administrators Repository — linux-admin Claude Code Plugin

> Repository/package name: `we-are-linux-administrators`. Claude plugin name and command namespace: `linux-admin`.
A Claude Code plugin converted from the Linux Admin AI Skill package.

It gives Claude Code a senior Linux administrator / SRE workflow:

- Read-only-first diagnostics.
- Distro-aware command selection.
- Evidence-based root-cause analysis.
- Safety gates for disruptive/destructive commands.
- Task-specific skills for boot, services, networking, performance, storage, permissions, packages, kernel, containers, auth, logging, and automation.
- A custom `linux-sre` subagent.
- Hook-based Bash safety guard.
- Reusable triage scripts in `bin/`.
- Codex/Gemini prompt adapters for non-Claude agents.

## Install / test locally

```bash
claude --plugin-dir ./we-are-linux-administrators
```

Or test the zip directly with Claude Code versions that support plugin zip loading:

```bash
claude --plugin-dir ./we-are-linux-administrators.zip
```

Inside Claude Code:

```text
/linux-admin:diagnose nginx.service failed after config change
/linux-admin:network can ping 8.8.8.8 but DNS fails
/linux-admin:storage /var is full but du does not match df
/linux-admin:systemd-expert nginx.service restart loop
/linux-admin:limits-expert postgres too many open files
/linux-admin:networking-expert server can ping IP but DNS and HTTPS fail
/linux-admin:command-expert review this dangerous find/rm command
/linux-admin:user-permissions-expert design least-privilege sudo for deploy user
/linux-admin:file-permissions-expert fix app directory write permission safely
/linux-admin:acl-permissions-expert explain why getfacl shows #effective:r--
```

Reload after edits:

```text
/reload-plugins
```

## Included skills

| Skill | Use |
|---|---|
| `/linux-admin:diagnose` | Main router and general Linux issue triage |
| `/linux-admin:boot` | Boot, emergency mode, initramfs, fstab, GRUB |
| `/linux-admin:service` | systemd services, restart loops, daemon crashes |
| `/linux-admin:network` | IP, routing, DNS, firewall, sockets |
| `/linux-admin:performance` | CPU, memory, OOM, load, latency |
| `/linux-admin:storage` | Disk full, inode full, LVM, RAID, filesystem, SMART |
| `/linux-admin:permissions` | POSIX permissions, ACLs, SELinux, AppArmor |
| `/linux-admin:packages` | apt/dnf/rpm/zypper/pacman package issues |
| `/linux-admin:kernel` | Panic, lockup, kdump, call traces |
| `/linux-admin:containers` | Docker, Podman, rootless, mounts, ports |
| `/linux-admin:auth` | SSH, sudo, PAM, LDAP, SSSD, user access |
| `/linux-admin:logs` | journald, rsyslog, monitoring, incident timeline |
| `/linux-admin:automation` | Scripts, Ansible, fleet triage |
| `/linux-admin:sysctl-expert` | Kernel runtime parameters, safe sysctl tuning, anti-overoptimization |
| `/linux-admin:systemd-expert` | systemd unit design, restart loops, drop-ins, cgroups, hardening |
| `/linux-admin:limits-expert` | ulimit, PAM limits, systemd Limit*, nofile/nproc/memlock sizing |
| `/linux-admin:networking-expert` | Interfaces, routes, DNS, firewall, sockets, MTU, tc, ethtool, TCP evidence |
| `/linux-admin:firewall-expert` | firewalld, nftables, iptables, UFW, ipset, NAT and lockout-safe changes |
| `/linux-admin:fail2ban-expert` | Fail2Ban jails, filters, actions, regex testing and false-positive prevention |
| `/linux-admin:command-expert` | Command review, safe shell pipelines, grep/sed/awk/find/xargs, destructive command safety |
| `/linux-admin:user-permissions-expert` | Users, groups, sudoers, service accounts, login rights, offboarding |
| `/linux-admin:file-permissions-expert` | POSIX modes, ownership, umask, special bits, safe recursive chmod/chown |
| `/linux-admin:acl-permissions-expert` | POSIX ACLs, masks, default ACLs, getfacl/setfacl backup and restore |

## Commands added to PATH

When the plugin is active, `bin/` is added to Claude Code's Bash PATH:

```bash
linux-triage
linux-log-classifier
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

## Safety hook

The plugin includes a `PreToolUse` Bash safety hook:

- Class 3 destructive commands are denied by default.
- Class 2 disruptive commands ask for user confirmation.
- Read-only commands pass without modification.

This hook is a guardrail, not a replacement for human review.

## Codex/Gemini use

Claude Code plugins are Claude-specific. For other agents, use:

- `codex/AGENTS.md`
- `gemini/GEMINI.md`
- the task files in `docs/tasks/`

## TCP and UDP experts

TCP and UDP are intentionally split into separate skills. Use `tcp-expert` for stateful connection lifecycle issues and `udp-expert` for datagram/loss/buffer/fragmentation/NAT behavior.

## Additional expert commands

```text
/linux-admin:package-manager-expert fix broken apt/dpkg transaction safely
/linux-admin:cron-scheduler-expert debug why backup cron did not run
/linux-admin:chrony-expert audit NTP drift and source quality
/linux-admin:date-timectl-expert fix timezone/NTP status safely
/linux-admin:quota-expert design user/project quota safely
/linux-admin:disk-mounting-expert validate fstab before reboot
/linux-admin:filesystem-expert investigate df and du mismatch
/linux-admin:kernel-expert triage kernel panic and kdump readiness
```

<div align="center">

# linux-admin

**Senior Linux administrator and SRE mental model as a Claude Code plugin.**

[![License](https://img.shields.io/github/license/rushikeshsakharleofficial/we-are-linux-administrators?style=for-the-badge&labelColor=000000&color=A78BFA)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/blob/main/LICENSE)
[![Stars](https://img.shields.io/github/stars/rushikeshsakharleofficial/we-are-linux-administrators?style=for-the-badge&labelColor=000000&color=22D3EE)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/stargazers)
[![Build](https://img.shields.io/github/actions/workflow/status/rushikeshsakharleofficial/we-are-linux-administrators/validate.yml?style=for-the-badge&labelColor=000000&color=4ADE80)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/actions)
[![Version](https://img.shields.io/badge/version-1.17.17-F472B6?style=for-the-badge&labelColor=000000)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/blob/main/.claude-plugin/plugin.json)
[![Skills](https://img.shields.io/badge/skills-106-A78BFA?style=for-the-badge&labelColor=000000)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/tree/main/skills)

</div>

---

## What is this?

`linux-admin` is a Claude Code plugin that gives Claude Code a senior Linux administrator and SRE operating model: read-only-first diagnostics, distro-aware command selection, evidence-based root-cause analysis, and safety gates for risky shell commands.

Current plugin metadata version: **1.17.17**  
Current skill count: **106 task-specific skills**

The project covers boot, networking, storage, load balancing, HAProxy, NGINX proxying, F5, LVS/IPVS, keepalived, DNS/GSLB, cloud load balancers, kernel, auth, PAM, SSSD/LDAP, logging, auditd, rsyslog, MySQL, PostgreSQL, Redis, Nginx, Apache, HAProxy, PHP-FPM, Samba, backup/restore, incident response, security validation, patching, SELinux, AppArmor, capacity planning, and production safety.

---

## Quick Start

**npx (fastest):**

```bash
npx github:rushikeshsakharleofficial/we-are-linux-administrators
```

**npm global:**

```bash
npm install -g linux-admin
linux-admin
```

**skillfish (multi-agent support):**

```bash
npx skillfish@latest add rushikeshsakharleofficial/we-are-linux-administrators
```

**CLI marketplace:**

```bash
claude plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
claude plugin install linux-admin@we-are-linux-administrators
```

**Inside Claude Code:**

```text
/plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
/plugin install linux-admin@we-are-linux-administrators
/reload-plugins
```

---

## NPM release

`package.json` is aligned to version **1.17.17** and **106 expert skills**.

Publishing is handled by `.github/workflows/npm-publish.yml` when a GitHub Release is published or when the workflow is manually dispatched. The repository must have an `NPM_TOKEN` secret with npm publish permission.

See [`RELEASE.md`](RELEASE.md) for the current release notes.

---

## Core workflows

| Skill | Use |
|---|---|
| `/linux-admin:diagnose` | Main router for general Linux issue triage |
| `/linux-admin:boot` | Boot failures, emergency mode, initramfs, fstab, GRUB |
| `/linux-admin:service` | systemd services, restart loops, daemon crashes |
| `/linux-admin:network` | IP, routing, DNS, firewall, sockets |
| `/linux-admin:performance` | CPU, memory, OOM, load, latency |
| `/linux-admin:storage` | Disk full, inode full, LVM, RAID, filesystem, SMART |
| `/linux-admin:permissions` | POSIX permissions, ACLs, SELinux, AppArmor |
| `/linux-admin:packages` | apt, dnf, rpm, zypper, pacman package issues |
| `/linux-admin:kernel` | Panic, lockup, kdump, call traces |
| `/linux-admin:containers` | Docker, Podman, rootless containers, mounts, ports |
| `/linux-admin:auth` | SSH, sudo, PAM, LDAP, SSSD, user access |
| `/linux-admin:logs` | journald, rsyslog, monitoring, incident timeline |
| `/linux-admin:automation` | Scripts, Ansible, fleet triage |

---

## Security expert

`/linux-admin:security-expert` is the defensive Linux security validation router. It uses an incident-driven model to review attack surface, SSH/auth, firewall, patch posture, privilege boundaries, sysctl hardening, limits, systemd sandboxing, SELinux/AppArmor, logging, backup recovery, mail security, and container risk.

It is designed for owned or explicitly authorized systems only.

```bash
/linux-admin:security-expert audit this web server
/linux-admin:security-expert score this mail server security posture
/linux-admin:security-expert generate fix plan for failed SSH and sysctl checks
```

The security expert can prepare sanitized GitHub feedback drafts, but it must not submit issues, pull requests, comments, reports, or server data without explicit user approval.

---

## Load balancer skill family

| Skill | Use |
|---|---|
| `/linux-admin:load-balancer-expert` | Main router and recommender. Classifies the request and suggests the best-fit load balancer before routing to a specialist. |
| `/linux-admin:haproxy-expert` | HAProxy frontend/backend, ACL, health check, TLS, stickiness, and safe reload work. |
| `/linux-admin:nginx-proxy-expert` | NGINX reverse proxy and load balancing: upstreams, 502/503/504, TLS/SNI, headers, WebSocket/gRPC. |
| `/linux-admin:f5-expert` | F5 BIG-IP style virtual servers, pools, monitors, profiles, SNAT, persistence, and HA failover. |
| `/linux-admin:lvs-ipvs-expert` | Linux LVS/IPVS, ipvsadm, ldirectord, NAT/DR/TUN modes, schedulers, persistence, ARP/DSR. |
| `/linux-admin:keepalived-expert` | keepalived VRRP, VIP ownership, health scripts, failover, split-brain, and IPVS integration. |
| `/linux-admin:dns-gslb-expert` | DNS/GSLB, weighted/geo/latency routing, TTL behavior, multi-region failover, MX balancing. |
| `/linux-admin:cloud-lb-expert` | AWS/Azure/GCP managed load balancers, target health, listeners, TLS, source IP, logs, and safe cloud cutovers. |

The main router recommends one primary option and one backup option using protocol, layer, deployment type, traffic volume, HA target, TLS strategy, source IP needs, persistence, budget, team skill, observability, and security requirements.

---

## Other expert skill groups

### Networking & firewall

`networking-expert`, `firewall-expert`, `fail2ban-expert`, `natting-expert`, `tcp-expert`, `udp-expert`, `iproute-expert`, `routing-expert`, `vlan-bonding-expert`, `proxy-expert`, `nfs-expert`, `tcpdump-expert`

### Storage & filesystems

`lvm-expert`, `filesystem-expert`, `disk-mounting-expert`, `quota-expert`, `raid-expert`, `iscsi-expert`, `multipath-expert`, `smart-disk-expert`, `backup-restore-expert`, `logrotate-expert`

### Kernel & performance

`kernel-expert`, `sysctl-expert`, `memory-expert`, `swap-expert`, `cpu-expert`, `io-wait-expert`, `load-average-expert`, `process-expert`, `capacity-planning-expert`

### Databases, middleware & web

`mysql-expert`, `postgresql-expert`, `redis-expert`, `nginx-expert`, `apache-expert`, `haproxy-expert`, `php-fpm-expert`, `samba-expert`

### Auth & security

`security-expert`, `os-security-expert`, `ssh-hardening-expert`, `auditd-expert`, `selinux-expert`, `apparmor-expert`, `pam-expert`, `sssd-ldap-expert`, `user-permissions-expert`, `file-permissions-expert`, `acl-permissions-expert`, `sudoers-expert`, `vulnerability-scan-expert`

### Automation & operations

`ansible-expert`, `patching-expert`, `cron-scheduler-expert`, `systemd-expert`, `limits-expert`, `migration-expert`, `incident-response-expert`, `runbook-expert`, `bash-script-expert`, `shell-script-expert`, `command-expert`

---

## Security and privacy

The project does **not** automatically collect server data, create GitHub issues, open pull requests, post comments, or submit reports from a user's machine.

Security feedback is explicit opt-in only. If a user finds a missing check or plugin weakness, the skill can prepare a sanitized GitHub issue draft, but submission requires user review and approval first.

See:

- [`PRIVACY.md`](PRIVACY.md)
- [Security finding feedback template](.github/ISSUE_TEMPLATE/security-finding-feedback.yml)

---

## Triage scripts

`bin/` is added to Claude Code's Bash PATH when the plugin is active:

```bash
linux-triage
linux-log-classifier
security-expert-audit
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

## Documentation

| Resource | Description |
|---|---|
| [`docs/USAGE.md`](docs/USAGE.md) | Usage guide |
| [`docs/EXPERT_MODULE_INDEX.md`](docs/EXPERT_MODULE_INDEX.md) | Expert module index |
| [`docs/load-balancer-expert/load-balancer-research.md`](docs/load-balancer-expert/load-balancer-research.md) | Load balancer research and recommendation notes |
| [`docs/security-expert/linux-security-research.md`](docs/security-expert/linux-security-research.md) | Incident-driven Linux security research notes |
| [`docs/security-expert/linux-security-checklist.md`](docs/security-expert/linux-security-checklist.md) | Security audit checklist and output contract |
| [`docs/security-expert/strategies.md`](docs/security-expert/strategies.md) | Security expert strategy and routing model |
| [`docs/security-expert/security-score-model.md`](docs/security-expert/security-score-model.md) | Linux security score model |
| [`templates/security-audit-report.md`](templates/security-audit-report.md) | Security audit report template |
| [`codex/AGENTS.md`](codex/AGENTS.md) | Codex/OpenAI adapter |
| [`gemini/GEMINI.md`](gemini/GEMINI.md) | Gemini adapter |

---

## License

MIT — see [LICENSE](LICENSE).

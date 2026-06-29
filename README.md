<div align="center">

# linux-admin

**Senior Linux administrator and SRE mental model as a Claude Code plugin.**

[![License](https://img.shields.io/github/license/rushikeshsakharleofficial/we-are-linux-administrators?style=for-the-badge&labelColor=000000&color=A78BFA)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/blob/main/LICENSE)
[![Stars](https://img.shields.io/github/stars/rushikeshsakharleofficial/we-are-linux-administrators?style=for-the-badge&labelColor=000000&color=22D3EE)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/stargazers)
[![Build](https://img.shields.io/github/actions/workflow/status/rushikeshsakharleofficial/we-are-linux-administrators/validate.yml?style=for-the-badge&labelColor=000000&color=4ADE80)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/actions)
[![Version](https://img.shields.io/badge/version-1.17.39-F472B6?style=for-the-badge&labelColor=000000)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/blob/main/.claude-plugin/plugin.json)
[![Skills](https://img.shields.io/badge/skills-112-A78BFA?style=for-the-badge&labelColor=000000)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/tree/main/skills)

</div>

---

## What is this?

`linux-admin` is a Claude Code plugin that gives Claude Code a senior Linux administrator and SRE operating model: read-only-first diagnostics, distro-aware command selection, evidence-based root-cause analysis, and safety gates for risky shell commands.

Current plugin metadata version: **1.17.39**  
Current skill count: **112 task-specific skills**

The project covers boot, networking, storage, universal skill contract enforcement, optimization guarding, Linux proxying, Nagios Core, Observium Community Edition, Linux RDP/XRDP remote desktop, GNOME/KDE/XFCE desktop sessions, load balancing, HAProxy, NGINX proxying, F5, LVS/IPVS, keepalived, DNS/GSLB, cloud load balancers, kernel, auth, PAM, SSSD/LDAP, logging, auditd, rsyslog, MySQL, PostgreSQL, Redis, Nginx, Apache, HAProxy, PHP-FPM, Samba, backup/restore, incident response, security validation, patching, SELinux, AppArmor, capacity planning, and production safety.

---

## Universal Skill Execution Contract

All current and future skills must follow [`docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`](docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md).

Required behavior across every skill:

1. Security checks and facts before apply.
2. Rollback plan.
3. Self-correction when a skill instruction is proven wrong, with GitHub issues only when safe and relevant.
4. Architecture fit check for over-implementation and under-implementation.
5. Architecture audit in final output.
6. Backup and disaster plan for every tool/workflow.
7. Guarded rollback for risky remote changes.
8. Token-optimized execution with bounded outputs.

`/linux-admin:universal-contract-guardian-expert` enforces this contract when creating, updating, auditing, or executing skills and implementation plans.

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

`package.json` is aligned to version **1.17.39** and **112 expert skills**.

Publishing is handled by `.github/workflows/npm-publish.yml` when a GitHub Release is published or when the workflow is manually dispatched. The repository must have an `NPM_TOKEN` secret with npm publish permission.

See [`RELEASE.md`](RELEASE.md) for the current release notes.

---

## Core workflows

| Skill | Use |
|---|---|
| `/linux-admin:diagnose` | Main router for general Linux issue triage |
| `/linux-admin:universal-contract-guardian-expert` | Enforces the 8-rule skill execution contract across all skills and implementation plans |
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

## Optimization guardian

`/linux-admin:optimization-guardian-expert` must be used whenever a request involves optimization, tuning, performance boosting, sysctl/kernel/network/database/web tuning, limits, workers, queues, buffers, or capacity changes.

It prevents unsafe over-optimization by requiring baseline metrics, one-bottleneck-at-a-time logic, rollback, validation metrics, and monitoring before any tuning change.

```bash
/linux-admin:optimization-guardian-expert tune nginx for 50k concurrent users
/linux-admin:optimization-guardian-expert optimize sysctl for high traffic proxy server
/linux-admin:optimization-guardian-expert increase php-fpm workers without OOM risk
```

---

## Monitoring community edition experts

`/linux-admin:nagios-core-expert` handles Nagios Core community edition host/service objects, plugins, NRPE/NCPA/passive checks, notifications, CGI auth, external commands, performance data, retention, and safe config verification.

`/linux-admin:observium-ce-expert` handles Observium Community Edition SNMP onboarding, `add_device.php`, poller-wrapper, discovery, RRD/rrdcached, cron, MySQL/PHP, web UI, device graphs, and CE-safe troubleshooting.

```bash
/linux-admin:nagios-core-expert service checks stuck pending after config change
/linux-admin:observium-ce-expert graphs flat after adding SNMP device
```

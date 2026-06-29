<div align="center">

# linux-admin

**Open-source Linux administration skills for safer troubleshooting, production operations, and agent-assisted infrastructure work.**

[![License](https://img.shields.io/github/license/rushikeshsakharleofficial/we-are-linux-administrators?style=for-the-badge&labelColor=000000&color=A78BFA)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/blob/main/LICENSE)
[![Stars](https://img.shields.io/github/stars/rushikeshsakharleofficial/we-are-linux-administrators?style=for-the-badge&labelColor=000000&color=22D3EE)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/stargazers)
[![Build](https://img.shields.io/github/actions/workflow/status/rushikeshsakharleofficial/we-are-linux-administrators/validate.yml?style=for-the-badge&labelColor=000000&color=4ADE80)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/actions)
[![Version](https://img.shields.io/badge/version-1.17.53-F472B6?style=for-the-badge&labelColor=000000)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/blob/main/.claude-plugin/plugin.json)
[![Skills](https://img.shields.io/badge/skills-114-A78BFA?style=for-the-badge&labelColor=000000)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/tree/main/skills)

</div>

---

## Overview

`linux-admin` is an open-source Linux administration skills repository and Claude Code plugin. It gives coding/ops agents a senior Linux administrator and SRE-style operating model for practical troubleshooting, safe command planning, and repeatable infrastructure workflows.

The repository is designed around:

- read-only-first diagnostics
- distro-aware command selection
- evidence-based root-cause analysis
- rollback-aware remediation
- backup and disaster checks
- architecture-fit review
- bounded command output
- current vendor security patch source verification

Current plugin metadata version: **1.17.53**  
Current skill count: **114 task-specific skills**

---

## What the repo covers

`linux-admin` includes task-specific skills for:

- boot, GRUB, initramfs, emergency mode
- systemd services, timers, sockets, cgroups
- logs, journald, rsyslog, incident timelines
- users, groups, sudo, SSH, PAM, SSSD/LDAP
- packages, patching, repositories, rollback checks
- networking, DNS, routes, firewall, NAT, TCP/UDP
- proxying, Squid, Tinyproxy, Dante SOCKS, HTTP CONNECT
- load balancing, HAProxy, NGINX proxy, F5, LVS/IPVS, keepalived, GSLB
- storage, filesystems, LVM, RAID, SMART, iSCSI, NFS
- kernel panic, lockups, drivers, modules, kdump
- SELinux, AppArmor, auditd, security validation
- Nagios Core and Observium CE monitoring
- MySQL, PostgreSQL, Redis, Nginx, Apache, PHP-FPM
- Docker, Podman, Kubernetes node troubleshooting
- Ubuntu Desktop and official Ubuntu flavors
- Fedora Workstation, KDE Edition, Spins, Atomic Desktops, and Labs
- GNOME, KDE Plasma, Xfce, MATE, Cinnamon, LXQt, Budgie, UKUI, Unity
- Wayland/Xorg, display managers, desktop kernels, drivers, UI extensions, update workflows

---

## Installation

### Requirements

```bash
node --version   # recommended: Node.js 18+
npm --version
```

### Option 1: Run directly with npx

```bash
npx github:rushikeshsakharleofficial/we-are-linux-administrators
```

### Option 2: Install globally with npm

```bash
npm install -g linux-admin
linux-admin
```

### Option 3: Install from Claude Code plugin marketplace

Inside Claude Code:

```text
/plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
/plugin install linux-admin@we-are-linux-administrators
/reload-plugins
```

CLI equivalent:

```bash
claude plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
claude plugin install linux-admin@we-are-linux-administrators
```

### Option 4: Install with skillfish

```bash
npx skillfish@latest add rushikeshsakharleofficial/we-are-linux-administrators
```

### Option 5: Clone locally for development

```bash
git clone https://github.com/rushikeshsakharleofficial/we-are-linux-administrators.git
cd we-are-linux-administrators
npm install
```

### Update an existing checkout

```bash
git pull origin main
npm install -g linux-admin@latest
```

### Verify package metadata

```bash
node -p "require('./package.json').version"
node -p "require('./package.json').description"
```

---

## Quick usage examples

```bash
/linux-admin:diagnose nginx service failing after reboot
/linux-admin:network DNS resolves but curl times out
/linux-admin:storage disk full but df and du do not match
/linux-admin:kernel kernel panic after driver update
/linux-admin:optimization-guardian-expert tune nginx for high traffic safely
/linux-admin:ubuntu-desktop-expert gnome extensions broke after upgrade
/linux-admin:fedora-desktop-expert kinoite update broke plasma widgets
```

---

## Core skills

| Skill | Purpose |
|---|---|
| `/linux-admin:diagnose` | Main router for general Linux issue triage |
| `/linux-admin:universal-contract-guardian-expert` | Enforces the 8-rule skill execution contract |
| `/linux-admin:optimization-guardian-expert` | Required for optimization/tuning requests |
| `/linux-admin:ubuntu-desktop-expert` | Ubuntu Desktop, official flavors, UI/session/kernel/driver/security update workflows |
| `/linux-admin:fedora-desktop-expert` | Fedora Workstation, KDE Edition, Spins, Atomic Desktops, Labs, UI/session/kernel/update workflows |
| `/linux-admin:nagios-core-expert` | Nagios Core community edition monitoring workflows |
| `/linux-admin:observium-ce-expert` | Observium CE SNMP/discovery/poller workflows |
| `/linux-admin:linux-proxy-expert` | Squid, Tinyproxy, Dante SOCKS, HTTP/HTTPS CONNECT, proxy client settings |
| `/linux-admin:load-balancer-expert` | HAProxy, NGINX proxy, F5, LVS/IPVS, keepalived, GSLB, cloud load balancers |
| `/linux-admin:security-expert` | Defensive Linux security validation and safe remediation routing |

Full skill coverage is indexed in [`docs/EXPERT_MODULE_INDEX.md`](docs/EXPERT_MODULE_INDEX.md).

---

## Architecture

```mermaid
flowchart TD
    User[User request] --> Router[/linux-admin:diagnose]
    Router --> Contract[Universal Skill Execution Contract]
    Contract --> Guard[Optimization / Safety Guardrails]
    Guard --> Skill[Task-specific expert skill]
    Skill --> Chunk[Focused chunked reference files]
    Chunk --> Evidence[Read-only evidence collection]
    Evidence --> Plan[Safe remediation plan]
    Plan --> Rollback[Rollback + backup + validation]
    Rollback --> Final[Bounded final answer]
```

### Architecture layers

| Layer | Purpose |
|---|---|
| Plugin metadata | Defines package identity, version, keywords, marketplace metadata |
| Router skill | Routes broad Linux issues to the right specialist |
| Universal contract | Shared safety and output contract for all skills |
| Specialist skills | Focused Linux domain expertise |
| Chunked references | Smaller files for easier updates in large domains |
| Hooks and CI | Validate skill structure and required safety rules |
| Site assets | GitHub Pages website, release popup, and skill presentation |
| Agent context | `CLAUDE.md`, `AGENTS.md`, and security patch policy for first-run behavior |

---

## Repository hierarchy

```text
we-are-linux-administrators/
├── .claude-plugin/
│   ├── marketplace.json
│   └── plugin.json
├── .github/
│   └── workflows/
│       ├── npm-publish.yml
│       └── validate.yml
├── .githooks/
│   └── pre-commit
├── bin/
│   └── linux-admin-install.js
├── docs/
│   ├── EXPERT_MODULE_INDEX.md
│   ├── HOOKS.md
│   ├── SECURITY_PATCH_REFRESH_POLICY.md
│   ├── UNIVERSAL_SKILL_EXECUTION_CONTRACT.md
│   └── skill-improvement/
├── hooks/
│   ├── validate-linux-admin.sh
│   └── validate-universal-contract.sh
├── site/
│   ├── assets/
│   │   ├── data/
│   │   │   └── latest-update.json
│   │   ├── js/
│   │   │   ├── copy.js
│   │   │   ├── main.js
│   │   │   └── monitoring-ce.js
│   │   └── css/
│   └── index.html
├── skills/
│   ├── diagnose/
│   │   └── SKILL.md
│   ├── universal-contract-guardian-expert/
│   │   └── SKILL.md
│   ├── optimization-guardian-expert/
│   │   └── SKILL.md
│   ├── ubuntu-desktop-expert/
│   │   ├── SKILL.md
│   │   └── chunks/
│   ├── fedora-desktop-expert/
│   │   ├── SKILL.md
│   │   └── chunks/
│   └── <other-linux-admin-skills>/
│       └── SKILL.md
├── AGENTS.md
├── CLAUDE.md
├── LICENSE
├── README.md
├── RELEASE.md
└── package.json
```

---

## Skill file structure

Each skill normally follows this pattern:

```text
skills/<skill-name>/
└── SKILL.md
```

Large domains use chunked references:

```text
skills/<large-domain-expert>/
├── SKILL.md
└── chunks/
    ├── release-lifecycle.md
    ├── desktop-environments.md
    ├── desktop-flavors.md
    ├── display-stack.md
    ├── kernel-drivers-hardware.md
    ├── ui-extensions-apps.md
    ├── security-updates.md
    └── safety-validation.md
```

This keeps the main `SKILL.md` small and lets maintainers update only the relevant category.

---

## Ubuntu Desktop Expert

`/linux-admin:ubuntu-desktop-expert` covers:

- Ubuntu Desktop and official Ubuntu flavors
- GNOME, KDE Plasma/Kubuntu, Xfce/Xubuntu, MATE, Cinnamon, LXQt/Lubuntu, Budgie, UKUI/Kylin, Unity, Ubuntu Studio
- Wayland, Xorg, Xwayland, GDM, SDDM, LightDM
- HWE/OEM/GA kernels, firmware, graphics drivers, Secure Boot, DKMS/MOK
- PipeWire, audio, Bluetooth, Wi-Fi, printing, power, laptop hardware
- GNOME extensions, KDE widgets, Xfce panel plugins, themes, icons, UI customization
- Ubuntu security updates, Ubuntu Pro, ESM, Livepatch, AppArmor, release upgrades

Example:

```bash
/linux-admin:ubuntu-desktop-expert gnome extensions broke after upgrade
```

---

## Fedora Desktop Expert

`/linux-admin:fedora-desktop-expert` covers:

- Fedora Workstation GNOME
- Fedora KDE Plasma Edition
- Fedora Spins: Xfce, Cinnamon, MATE, LXQt, Budgie, Sway, i3, COSMIC, Miracle, and current official variants
- Fedora Atomic Desktops: Silverblue, Kinoite, Sway Atomic, Budgie Atomic, COSMIC Atomic, and current image-based desktops
- Fedora Labs
- Wayland, Xorg, display managers, login/session issues
- kernels, Mesa, graphics, firmware, PipeWire/WirePlumber, laptop hardware
- SELinux, dnf updates, rpm-ostree update/rebase flows, Flatpak, security advisories

Example:

```bash
/linux-admin:fedora-desktop-expert kinoite update broke plasma widgets
```

---

## Safety model

All skills follow the Universal Skill Execution Contract:

1. Security checks and facts before apply.
2. Rollback plan.
3. Self-correction when a skill instruction is proven wrong.
4. Architecture fit check for over-implementation and under-implementation.
5. Architecture audit in final output.
6. Backup and disaster plan for every tool/workflow.
7. Guarded rollback for risky remote changes.
8. Token-optimized execution with bounded outputs.

The goal is not to run random commands. The goal is to collect evidence, identify the controlling layer, propose the smallest safe fix, and validate results.

---

## Security patch refresh policy

OS-specific skills must verify current vendor security sources before giving guidance for:

- security patching
- kernel updates
- desktop updates
- browser updates
- driver updates
- vulnerability remediation
- support lifecycle decisions

Source priority is documented in [`docs/SECURITY_PATCH_REFRESH_POLICY.md`](docs/SECURITY_PATCH_REFRESH_POLICY.md).

Examples:

- Ubuntu: Ubuntu Security Notices, Ubuntu CVE tracker, Ubuntu Pro/ESM/Livepatch docs, Launchpad packages, release notes
- Fedora: Fedora advisories, Fedora package metadata, Fedora Docs, Fedora Magazine, Fedora common issues, rpm-ostree docs
- RHEL/Rocky/Alma: vendor errata, security advisories, lifecycle docs, package metadata
- Debian: Debian Security Advisories, package tracker, release notes
- openSUSE/SUSE: SUSE/openSUSE advisories, package metadata, lifecycle docs
- Arch: Arch security tracker, package news, Arch Linux news

Community reports are useful signals, but official/vendor sources remain the authority.

---

## First-run agent context

Agent-based workflows should load these files at the start of a repository session:

```text
CLAUDE.md
AGENTS.md
docs/SECURITY_PATCH_REFRESH_POLICY.md
docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md
docs/EXPERT_MODULE_INDEX.md
RELEASE.md
```

These files provide the project rules for Claude Code, Codex, and similar tools.

---

## Validation and hooks

Install local hooks:

```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit hooks/validate-linux-admin.sh hooks/validate-universal-contract.sh
```

Run validation manually:

```bash
hooks/validate-linux-admin.sh "$(pwd)"
hooks/validate-universal-contract.sh "$(pwd)"
```

GitHub Actions validation is configured under `.github/workflows/validate.yml`.

---

## Feature plan

Planned improvements:

- Add more chunked skills for large domains such as monitoring, DNS, mail, storage, Kubernetes, and security.
- Add distro-specific security patch chunks for Debian, RHEL/Rocky/Alma, openSUSE/SUSE, and Arch.
- Improve the website skill explorer and release popup.
- Add more examples for real-world troubleshooting scenarios.
- Add safer validation around desktop/session/display-manager workflows.
- Expand monitoring coverage for Zabbix, Prometheus, Grafana, Nagios Core, and Observium CE.
- Add migration-focused runbooks for BIND/named, Postfix, Cyrus IMAP, and web stacks.
- Add more tests for skill metadata, routing coverage, and required safety sections.

---

## To-do tasks

Good first tasks:

- Improve README examples for any skill you use often.
- Add missing official source links to skill chunks.
- Fix typos or stale commands in `SKILL.md` files.
- Add validation examples for a specific Linux distro/version.
- Add rollback notes for risky but common operations.
- Add chunk files for skills that are becoming too large.
- Improve `docs/EXPERT_MODULE_INDEX.md` descriptions.
- Add website cards for new expert skills.

Higher-impact tasks:

- Add CI checks for required skill frontmatter.
- Add CI checks for required Universal Skill Execution Contract references.
- Add release automation for package/plugin metadata alignment.
- Add security patch source refresh tests for OS-specific skills.
- Add structured examples for production incident workflows.

---

## Contribution policy

Contributions are welcome.

Anyone can contribute if the PR is valid, scoped, and improves the project safely.

A valid PR should:

- solve a real Linux admin, SRE, monitoring, security, desktop, package, kernel, networking, storage, or automation problem
- keep changes small and reviewable
- include official/vendor references when changing version-specific guidance
- treat community posts as signals, not final authority
- include rollback and validation guidance for risky workflows
- avoid unsafe, destructive, or exploit-focused instructions
- follow the Universal Skill Execution Contract
- avoid cosmetic-only churn unless it improves readability or usability
- update `RELEASE.md`, `package.json`, plugin metadata, docs, or website files when the change affects them

Recommended PR flow:

```bash
git checkout -b feature/<short-topic>
# make focused changes
git diff --check
hooks/validate-linux-admin.sh "$(pwd)"
hooks/validate-universal-contract.sh "$(pwd)"
git commit -m "Add <short useful description>"
git push origin feature/<short-topic>
```

Then open a pull request with:

- what changed
- why it is useful
- evidence/source links
- validation performed
- rollback/safety notes if applicable

---

## License

This project is released under the **MIT License**.

You can use, copy, modify, merge, publish, distribute, sublicense, and sell copies of the software, subject to the license terms. See [`LICENSE`](LICENSE).

---

## Maintainer

Maintained by **Rushikesh Sakharle**.

GitHub: [rushikeshsakharleofficial](https://github.com/rushikeshsakharleofficial)

---

## Repository

```text
https://github.com/rushikeshsakharleofficial/we-are-linux-administrators
```

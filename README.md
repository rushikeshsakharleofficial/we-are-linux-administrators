<div align="center">

# 🐧 linux-admin

### Open-source Linux administration skills for safer troubleshooting, production operations, and agent-assisted infrastructure work.

[![License](https://img.shields.io/github/license/rushikeshsakharleofficial/we-are-linux-administrators?style=for-the-badge&labelColor=0B1020&color=A78BFA)](LICENSE)
[![Build](https://img.shields.io/github/actions/workflow/status/rushikeshsakharleofficial/we-are-linux-administrators/validate.yml?style=for-the-badge&labelColor=0B1020&color=4ADE80)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/actions)
[![Version](https://img.shields.io/badge/version-1.17.53-F472B6?style=for-the-badge&labelColor=0B1020)](.claude-plugin/plugin.json)
[![Skills](https://img.shields.io/badge/skills-114-22D3EE?style=for-the-badge&labelColor=0B1020)](skills)

![Linux](https://img.shields.io/badge/Linux-Admin-22D3EE?style=flat-square&logo=linux&logoColor=white)
![SRE](https://img.shields.io/badge/SRE-Workflow-A78BFA?style=flat-square)
![Ubuntu](https://img.shields.io/badge/Ubuntu-Desktop-E95420?style=flat-square&logo=ubuntu&logoColor=white)
![Fedora](https://img.shields.io/badge/Fedora-Desktop-51A2DA?style=flat-square&logo=fedora&logoColor=white)
![Patch](https://img.shields.io/badge/Patch-Aware-4ADE80?style=flat-square)
![Rollback](https://img.shields.io/badge/Rollback-First-F472B6?style=flat-square)

</div>

---

## ✨ Overview

`linux-admin` is an open-source Linux administration skills repository and Claude Code plugin. It gives coding/ops agents a senior Linux administrator and SRE-style operating model for practical troubleshooting, safe command planning, and repeatable infrastructure workflows.

| Principle | Meaning |
|---|---|
| 🔍 Read-only-first | Start with safe evidence collection before changes |
| 🧠 Evidence-based RCA | Rank hypotheses from real system signals |
| 🔁 Rollback-aware | Every high-impact fix needs a recovery path |
| 💾 Backup/disaster checks | Preserve critical state before impact |
| 🏗️ Architecture-fit review | Avoid over-engineering and under-engineering |
| 🔐 Vendor patch verification | Check current OS security sources before patch guidance |

**Version:** `1.17.53`  
**Skill count:** `114`

---

## 🖥️ Terminal preview

```console
$ linux-admin status
🐧 Project      : linux-admin
📦 Version      : 1.17.53
🧩 Skills       : 114
🛡️ Safety       : read-only-first + rollback-aware
🖥️ Desktop      : Ubuntu Desktop + Fedora Desktop
🔐 Patch model  : vendor security source verification
```

```console
$ /linux-admin:diagnose nginx service failing after reboot
→ classify issue
→ load universal safety contract
→ collect bounded evidence
→ identify controlling layer
→ propose smallest safe fix
→ include rollback + validation
```

---

## 🚀 Installation

<details open>
<summary><b>Run directly with npx</b></summary>

```bash
npx github:rushikeshsakharleofficial/we-are-linux-administrators
```

</details>

<details>
<summary><b>Install globally with npm</b></summary>

```bash
npm install -g linux-admin
linux-admin
```

</details>

<details>
<summary><b>Install from Claude Code plugin marketplace</b></summary>

```text
/plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
/plugin install linux-admin@we-are-linux-administrators
/reload-plugins
```

```bash
claude plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
claude plugin install linux-admin@we-are-linux-administrators
```

</details>

<details>
<summary><b>Install with skillfish</b></summary>

```bash
npx skillfish@latest add rushikeshsakharleofficial/we-are-linux-administrators
```

</details>

<details>
<summary><b>Clone locally for development</b></summary>

```bash
git clone https://github.com/rushikeshsakharleofficial/we-are-linux-administrators.git
cd we-are-linux-administrators
npm install

# update later
git pull origin main
npm install -g linux-admin@latest
```

</details>

---

## ⚡ Quick usage

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

## 🧩 Coverage

| Area | Coverage |
|---|---|
| 🧠 Core Linux | boot, systemd, services, logs, users, packages, kernel |
| 🌐 Network | DNS, routing, firewall, NAT, TCP/UDP, proxying, load balancing |
| 💾 Storage | filesystems, LVM, RAID, SMART, backup/restore |
| 🔐 Security | SELinux, AppArmor, auditd, patching, validation |
| 📊 Monitoring | Nagios Core, Observium CE, logs, incident timelines |
| 🖥️ Desktop | Ubuntu Desktop, Fedora Desktop, GNOME, KDE, Xfce, Wayland/Xorg |
| 🤖 Agent context | CLAUDE.md, AGENTS.md, patch refresh policy, universal contract |

---

## 🧭 Core skills

| Skill | Purpose |
|---|---|
| `/linux-admin:diagnose` | Main router for general Linux issue triage |
| `/linux-admin:universal-contract-guardian-expert` | Enforces the 8-rule skill execution contract |
| `/linux-admin:optimization-guardian-expert` | Required for optimization/tuning requests |
| `/linux-admin:ubuntu-desktop-expert` | Ubuntu Desktop, flavors, UI/session/kernel/driver/security workflows |
| `/linux-admin:fedora-desktop-expert` | Fedora Workstation, KDE, Spins, Atomic Desktops, Labs workflows |
| `/linux-admin:nagios-core-expert` | Nagios Core community edition monitoring workflows |
| `/linux-admin:observium-ce-expert` | Observium CE SNMP/discovery/poller workflows |
| `/linux-admin:linux-proxy-expert` | Squid, Tinyproxy, Dante SOCKS, HTTP CONNECT |
| `/linux-admin:load-balancer-expert` | HAProxy, NGINX proxy, F5, LVS/IPVS, keepalived, GSLB |
| `/linux-admin:security-expert` | Defensive Linux security validation and safe remediation routing |

Full skill index: [`docs/EXPERT_MODULE_INDEX.md`](docs/EXPERT_MODULE_INDEX.md)

---

## 🏗️ Architecture

```mermaid
flowchart TD
    User[User request] --> Router[/linux-admin:diagnose]
    Router --> Contract[Universal Skill Execution Contract]
    Contract --> Guard[Optimization and Safety Guardrails]
    Guard --> Skill[Task-specific Expert Skill]
    Skill --> Chunk[Focused Chunked References]
    Chunk --> Evidence[Read-only Evidence Collection]
    Evidence --> Plan[Safe Remediation Plan]
    Plan --> Backup[Backup and Disaster Check]
    Backup --> Rollback[Rollback and Validation]
    Rollback --> Final[Bounded Final Answer]
```

| Layer | Purpose |
|---|---|
| Plugin metadata | Package identity, version, marketplace metadata |
| Router skill | Routes broad Linux issues to specialists |
| Universal contract | Shared safety and output contract |
| Specialist skills | Focused Linux domain expertise |
| Chunked references | Smaller files for easier updates |
| Hooks and CI | Validate structure and safety rules |
| Site assets | GitHub Pages, release popup, presentation |
| Agent context | First-run guidance for Claude Code/Codex-style tools |

---

## 🌳 Repository hierarchy

```text
we-are-linux-administrators/
├── .claude-plugin/
│   ├── marketplace.json
│   └── plugin.json
├── .github/workflows/
│   ├── npm-publish.yml
│   └── validate.yml
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
│   ├── assets/data/latest-update.json
│   ├── assets/js/
│   └── index.html
├── skills/
│   ├── diagnose/SKILL.md
│   ├── universal-contract-guardian-expert/SKILL.md
│   ├── optimization-guardian-expert/SKILL.md
│   ├── ubuntu-desktop-expert/
│   │   ├── SKILL.md
│   │   └── chunks/
│   ├── fedora-desktop-expert/
│   │   ├── SKILL.md
│   │   └── chunks/
│   └── <other-linux-admin-skills>/SKILL.md
├── AGENTS.md
├── CLAUDE.md
├── LICENSE
├── README.md
├── RELEASE.md
└── package.json
```

---

## 📦 Chunked skill structure

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

## 🖥️ Desktop experts

<details open>
<summary><b>🟠 Ubuntu Desktop Expert</b></summary>

`/linux-admin:ubuntu-desktop-expert` covers Ubuntu Desktop and flavors, GNOME, KDE Plasma/Kubuntu, Xfce/Xubuntu, MATE, Cinnamon, LXQt/Lubuntu, Budgie, UKUI/Kylin, Unity, Ubuntu Studio, Wayland/Xorg, GDM, SDDM, LightDM, HWE/OEM/GA kernels, firmware, graphics drivers, PipeWire, UI extensions, Ubuntu Pro, ESM, Livepatch, AppArmor, and release upgrades.

```bash
/linux-admin:ubuntu-desktop-expert gnome extensions broke after upgrade
```

</details>

<details open>
<summary><b>🔵 Fedora Desktop Expert</b></summary>

`/linux-admin:fedora-desktop-expert` covers Fedora Workstation GNOME, KDE Plasma Edition, Spins, Atomic Desktops, Labs, Wayland/Xorg, kernels, Mesa, firmware, PipeWire/WirePlumber, SELinux, dnf updates, rpm-ostree update/rebase flows, Flatpak, and security advisories.

```bash
/linux-admin:fedora-desktop-expert kinoite update broke plasma widgets
```

</details>

---

## 🛡️ Safety model

All skills follow the Universal Skill Execution Contract:

1. Security checks and facts before apply.
2. Rollback plan.
3. Self-correction when a skill instruction is proven wrong.
4. Architecture fit check for over-implementation and under-implementation.
5. Architecture audit in final output.
6. Backup and disaster plan for every tool/workflow.
7. Guarded rollback for high-impact remote changes.
8. Token-optimized execution with bounded outputs.

---

## 🔐 Security patch refresh policy

OS-specific skills verify current vendor security sources before patch, kernel, desktop, browser, driver, vulnerability, or lifecycle guidance.

| OS family | Preferred sources |
|---|---|
| Ubuntu | Ubuntu Security Notices, Ubuntu CVE tracker, Ubuntu Pro/ESM/Livepatch, Launchpad, release notes |
| Fedora | Fedora advisories, package metadata, Fedora Docs, Fedora Magazine, common issues, rpm-ostree docs |
| RHEL/Rocky/Alma | Vendor errata, security advisories, lifecycle docs, package metadata |
| Debian | Debian Security Advisories, package tracker, release notes |
| openSUSE/SUSE | SUSE/openSUSE advisories, package metadata, lifecycle docs |
| Arch | Arch security tracker, package news, Arch Linux news |

Community reports are useful signals, but official/vendor sources remain the authority.

---

## 🧠 First-run agent context

Agent-based workflows should load these files at the start of a repository session:

```text
CLAUDE.md
AGENTS.md
docs/SECURITY_PATCH_REFRESH_POLICY.md
docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md
docs/EXPERT_MODULE_INDEX.md
RELEASE.md
```

---

## ✅ Validation and hooks

```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit hooks/validate-linux-admin.sh hooks/validate-universal-contract.sh

hooks/validate-linux-admin.sh "$(pwd)"
hooks/validate-universal-contract.sh "$(pwd)"
```

GitHub Actions validation is configured under `.github/workflows/validate.yml`.

---

## 🗺️ Feature plan

- Add more chunked skills for monitoring, DNS, mail, storage, Kubernetes, and security.
- Add distro-specific security patch chunks for Debian, RHEL/Rocky/Alma, openSUSE/SUSE, and Arch.
- Improve the website skill explorer and release popup.
- Add more real-world troubleshooting examples.
- Add safer validation around desktop/session/display-manager workflows.
- Expand monitoring coverage for Zabbix, Prometheus, Grafana, Nagios Core, and Observium CE.
- Add migration-focused runbooks for BIND/named, Postfix, Cyrus IMAP, and web stacks.
- Add tests for skill metadata, routing coverage, and required safety sections.

---

## 🧾 To-do tasks

Good first tasks:

- Improve README examples for any skill you use often.
- Add missing official source links to skill chunks.
- Fix typos or stale commands in `SKILL.md` files.
- Add validation examples for a specific Linux distro/version.
- Add rollback notes for common high-impact operations.
- Add chunk files for skills that are becoming too large.
- Improve `docs/EXPERT_MODULE_INDEX.md` descriptions.
- Add website cards for new expert skills.

Higher-impact tasks:

- Add CI checks for required skill frontmatter.
- Add CI checks for Universal Skill Execution Contract references.
- Add release automation for package/plugin metadata alignment.
- Add security patch source refresh tests for OS-specific skills.
- Add structured examples for production incident workflows.

---

## 🤝 Contribution policy

Contributions are welcome.

Anyone can contribute if the PR is valid, scoped, and improves the project safely.

A valid PR should:

- solve a real Linux admin, SRE, monitoring, security, desktop, package, kernel, networking, storage, or automation problem
- keep changes small and reviewable
- include official/vendor references when changing version-specific guidance
- treat community posts as signals, not final authority
- include rollback and validation guidance for high-impact workflows
- avoid unsupported shortcuts
- follow the Universal Skill Execution Contract
- avoid cosmetic-only churn unless it improves readability or usability
- update `RELEASE.md`, `package.json`, plugin metadata, docs, or website files when the change affects them

Recommended PR flow:

```bash
git checkout -b feature/<short-topic>
git diff --check
hooks/validate-linux-admin.sh "$(pwd)"
hooks/validate-universal-contract.sh "$(pwd)"
git commit -m "Add <short useful description>"
git push origin feature/<short-topic>
```

Then open a PR with what changed, why it is useful, evidence/source links, validation performed, and rollback/safety notes when applicable.

---

## 📜 License

This project is released under the **MIT License**.

You can use, copy, modify, merge, publish, distribute, sublicense, and sell copies of the software, subject to the license terms. See [`LICENSE`](LICENSE).

---

## 👨‍💻 Maintainer

Maintained by **Rushikesh Sakharle**.

GitHub: [rushikeshsakharleofficial](https://github.com/rushikeshsakharleofficial)

---

<div align="center">

### ⭐ Found this useful?

Star the repo, open a valid PR, or suggest a new Linux admin skill.

```text
https://github.com/rushikeshsakharleofficial/we-are-linux-administrators
```

</div>

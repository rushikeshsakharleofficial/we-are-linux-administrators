<div align="center">

# linux-admin

**Senior Linux administrator and SRE mental model as a Claude Code plugin.**

[![License](https://img.shields.io/github/license/rushikeshsakharleofficial/we-are-linux-administrators?style=for-the-badge&labelColor=000000&color=A78BFA)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/blob/main/LICENSE)
[![Stars](https://img.shields.io/github/stars/rushikeshsakharleofficial/we-are-linux-administrators?style=for-the-badge&labelColor=000000&color=22D3EE)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/stargazers)
[![Build](https://img.shields.io/github/actions/workflow/status/rushikeshsakharleofficial/we-are-linux-administrators/validate.yml?style=for-the-badge&labelColor=000000&color=4ADE80)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/actions)
[![Version](https://img.shields.io/badge/version-1.17.53-F472B6?style=for-the-badge&labelColor=000000)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/blob/main/.claude-plugin/plugin.json)
[![Skills](https://img.shields.io/badge/skills-114-A78BFA?style=for-the-badge&labelColor=000000)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/tree/main/skills)

</div>

---

## What is this?

`linux-admin` is a Claude Code plugin that gives Claude Code a senior Linux administrator and SRE operating model: read-only-first diagnostics, distro-aware command selection, evidence-based root-cause analysis, and safety gates for risky shell commands.

Current plugin metadata version: **1.17.53**  
Current skill count: **114 task-specific skills**

The project covers boot, networking, storage, universal skill contract enforcement, optimization guarding, Linux proxying, Ubuntu Desktop, Fedora Desktop, GNOME, KDE Plasma, Xfce, MATE, Cinnamon, LXQt, Budgie, UKUI, Unity, desktop kernels/drivers/UI/extensions, Nagios Core, Observium Community Edition, Linux RDP/XRDP remote desktop, load balancing, kernel, auth, logging, databases, web servers, backup/restore, incident response, security validation, patching, SELinux, AppArmor, capacity planning, and production safety.

---

## Core workflows

| Skill | Use |
|---|---|
| `/linux-admin:diagnose` | Main router for general Linux issue triage |
| `/linux-admin:universal-contract-guardian-expert` | Enforces the 8-rule skill execution contract |
| `/linux-admin:optimization-guardian-expert` | Required for optimization/tuning requests |
| `/linux-admin:ubuntu-desktop-expert` | Ubuntu Desktop, official flavors, UI/session/kernel/driver/security update workflows |
| `/linux-admin:fedora-desktop-expert` | Fedora Workstation, KDE Edition, Spins, Atomic Desktops, Labs, UI/session/kernel/update workflows |

## Desktop experts

`/linux-admin:ubuntu-desktop-expert` handles Ubuntu Desktop and flavor environments across GNOME, KDE Plasma/Kubuntu, Xfce/Xubuntu, MATE, Cinnamon, LXQt/Lubuntu, Budgie, UKUI/Kylin, Unity, Ubuntu Studio, Wayland/Xorg, kernels, graphics drivers, UI customization, extensions/plugins, desktop security, release upgrades, and rollback-aware troubleshooting.

`/linux-admin:fedora-desktop-expert` handles Fedora Workstation, KDE Plasma Edition, Spins, Atomic Desktops, Labs, Wayland/Xorg, kernels, graphics, UI customization, extensions/plugins, SELinux, dnf/rpm-ostree update flows, and current patch-aware desktop troubleshooting.

```bash
/linux-admin:ubuntu-desktop-expert gnome extensions broke after upgrade
/linux-admin:fedora-desktop-expert kinoite update broke plasma widgets
```

## First-run agent context

Claude Code, Codex, and similar agents should load `CLAUDE.md`, `AGENTS.md`, and `docs/SECURITY_PATCH_REFRESH_POLICY.md` when present.

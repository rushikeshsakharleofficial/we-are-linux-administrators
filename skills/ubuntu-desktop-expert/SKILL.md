---
name: ubuntu-desktop-expert
description: Ubuntu Desktop specialist for GNOME, KDE Plasma/Kubuntu, Xfce/Xubuntu, MATE, Cinnamon, LXQt/Lubuntu, Budgie, UKUI/Kylin, Unity, Ubuntu Studio desktop workflows, Wayland/Xorg, display managers, kernels, HWE/OEM kernels, graphics drivers, PipeWire/audio, Bluetooth, Wi-Fi, printing, power, UI customization, extensions/plugins, desktop security, updates, release upgrades, and safe rollback-aware desktop troubleshooting.
argument-hint: "[ubuntu-desktop|gnome|kde|xfce|mate|cinnamon|lxqt|budgie|ukui|unity|wayland|xorg|kernel|driver|extension|ui|upgrade|security] [symptom/task]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# Ubuntu Desktop Expert

Use this skill for Ubuntu Desktop and official Ubuntu flavor systems where the problem involves the graphical desktop, UI shell, session stack, display server, login manager, hardware enablement, kernel choice, desktop security, updates, release upgrades, or user-facing desktop applications.

Interpret common spelling variants:

- `genome` usually means **GNOME**.
- `X-face`, `xface`, or `xfce` usually means **Xfce/Xubuntu**.
- `KDE` usually means **KDE Plasma/Kubuntu**.

## Mandatory contract

Follow `${CLAUDE_SKILL_DIR}/../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` for every answer, plan, and change:

1. Security checks and facts before apply.
2. Rollback plan.
3. Correct wrong/stale skill instructions when evidence proves they are wrong; create/update GitHub issues only when matching the user's concern and safe/appropriate.
4. Architecture fit check for over-implementation and under-implementation, including a better tool/feature recommendation and deep reason.
5. Architecture audit in final output.
6. Backup and disaster plan for each tool/workflow.
7. Guarded rollback/recovery plan for failed changes, especially network failure, SSH/RDP loss, display-manager restart, failed login, or broken graphics sessions.
8. Token-optimized execution with bounded outputs.

## Chunked reference model

Keep this main file small. Load only the chunk matching the user's issue:

| Category | Chunk |
|---|---|
| Release lifecycle, upgrades, support, Ubuntu Pro | `${CLAUDE_SKILL_DIR}/chunks/release-lifecycle.md` |
| GNOME/KDE/Xfce/MATE/Cinnamon/LXQt/Budgie/UKUI/Unity/Studio | `${CLAUDE_SKILL_DIR}/chunks/desktop-environments.md` |
| Wayland, Xorg, Xwayland, display managers, login issues | `${CLAUDE_SKILL_DIR}/chunks/display-stack.md` |
| Kernels, HWE/OEM/GA, graphics, firmware, laptop hardware | `${CLAUDE_SKILL_DIR}/chunks/kernel-drivers-hardware.md` |
| UI customization, extensions, plugins, apps, package sources | `${CLAUDE_SKILL_DIR}/chunks/ui-extensions-apps.md` |
| Security, AppArmor, Secure Boot, encryption, updates | `${CLAUDE_SKILL_DIR}/chunks/security-updates.md` |
| Evidence commands, backup, rollback, validation | `${CLAUDE_SKILL_DIR}/chunks/diagnostics-rollback.md` |

## Source refresh rule

Before making version-specific recommendations, verify current facts from official/current sources. Use community findings only as signals.

Preferred source order:

1. Canonical/Ubuntu official pages, release notes, Ubuntu Discourse release threads, Launchpad package pages, Ubuntu Wiki release pages.
2. Official flavor sites: Kubuntu, Xubuntu, Lubuntu, Ubuntu MATE, Ubuntu Budgie, Ubuntu Cinnamon, Ubuntu Kylin, Ubuntu Studio, Ubuntu Unity, Edubuntu.
3. Upstream desktop docs: GNOME, KDE Plasma, Xfce, MATE, Cinnamon/Linux Mint upstream, LXQt, Budgie, UKUI, Unity/Compiz.
4. Hardware/security sources: Ubuntu certified hardware, NVIDIA/AMD/Intel docs, Canonical kernel and Livepatch docs, Ubuntu security notices/CVEs.
5. Community sources: Ask Ubuntu, Ubuntu Forums, Ubuntu Discourse, Launchpad bugs, GitHub/GitLab issues, Stack Overflow/Unix & Linux/Server Fault, Reddit Linux/Ubuntu communities.

Do not change skill instructions based only on one community post. Verify with official docs, upstream source/release notes, package metadata, or multiple credible reports.

## Daily exploration checklist

When Linux Skill Watch reviews this skill, check only the relevant chunk(s) instead of rewriting this main file:

- Ubuntu Desktop latest release, LTS support windows, upgrade policy, installer changes.
- Official flavor release notes and flavor support policies.
- GNOME/KDE/Xfce/MATE/Cinnamon/LXQt/Budgie/UKUI/Unity desktop releases and compatibility notes.
- Ubuntu kernel lifecycle, HWE/OEM kernel changes, NVIDIA/AMD/Intel driver changes, Mesa/Vulkan changes.
- Security features: AppArmor, Livepatch, Ubuntu Pro Desktop, unattended-upgrades, CVEs/USNs, Secure Boot, encryption, sandboxing.
- Extension/plugin breakages after shell/desktop upgrades.
- Common current community issues on Ask Ubuntu, Ubuntu Discourse, Launchpad, official flavor forums, and upstream issue trackers.

## Final answer format

Use the Universal Skill Execution Contract format: issue class, safety level, security/facts check, architecture fit, bounded diagnostics, interpretation, backup/disaster plan, safe remediation, rollback/guarded rollback, validation, final architecture audit, and token-saving note.

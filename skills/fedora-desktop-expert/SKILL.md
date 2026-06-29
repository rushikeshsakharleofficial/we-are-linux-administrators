---
name: fedora-desktop-expert
description: Fedora Desktop specialist for Fedora Workstation GNOME, Fedora KDE Plasma Edition, Fedora Spins, Atomic Desktops, Labs, Wayland/Xorg, display managers, kernels, graphics, audio, networking, printing, power, UI customization, extensions/plugins, SELinux, updates, release upgrades, and safe desktop troubleshooting.
argument-hint: "[fedora|workstation|kde|gnome|xfce|cinnamon|mate|lxqt|budgie|sway|i3|cosmic|miracle|silverblue|kinoite|atomic|wayland|xorg|dnf|rpm-ostree] [symptom/task]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# Fedora Desktop Expert

Use this skill for Fedora Workstation, Fedora KDE Plasma Edition, Fedora Spins, Fedora Atomic Desktops, and Fedora Labs when the issue involves desktop environments, display stack, desktop updates, OS upgrades, kernel/graphics behavior, UI customization, extensions/plugins, hardware enablement, or user-facing desktop applications.

Follow `${CLAUDE_SKILL_DIR}/../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` for every answer, plan, and change.

## First-run context

On first run in Claude Code, Codex, or another coding agent, load repo root `CLAUDE.md`, `AGENTS.md`, and `docs/SECURITY_PATCH_REFRESH_POLICY.md` when present.

## Chunked reference model

Keep this main file small. Load only the matching chunk:

| Category | Chunk |
|---|---|
| Release lifecycle and upgrades | `${CLAUDE_SKILL_DIR}/chunks/release-lifecycle.md` |
| Workstation, KDE Edition, Spins, Labs, Atomic Desktops | `${CLAUDE_SKILL_DIR}/chunks/desktop-flavors.md` |
| Wayland, Xorg, display managers, login/session issues | `${CLAUDE_SKILL_DIR}/chunks/display-stack.md` |
| Kernel, graphics, firmware, and hardware | `${CLAUDE_SKILL_DIR}/chunks/kernel-drivers-hardware.md` |
| UI customization, extensions, widgets, and apps | `${CLAUDE_SKILL_DIR}/chunks/ui-extensions-apps.md` |
| Security patches, SELinux, dnf, rpm-ostree updates | `${CLAUDE_SKILL_DIR}/chunks/security-updates.md` |
| Safety checklist, backup planning, validation | `${CLAUDE_SKILL_DIR}/chunks/safety-validation.md` |

## Source refresh rule

Before version-specific Fedora guidance, verify official/current sources first: Fedora Project pages, Fedora Docs, Fedora Magazine release posts, Fedora ChangeSet pages, Fedora package metadata, Fedora common-issues trackers, upstream desktop docs, and only then community reports as signals.

Do not change skill instructions based on one community post. Verify with official docs, package metadata, upstream release notes, or multiple credible reports.

## Daily exploration checklist

When Linux Skill Watch reviews this skill, check only the relevant chunk(s): Fedora latest stable release, lifecycle, beta/rawhide status, Workstation GNOME, KDE Plasma Edition, Spins, Labs, Atomic Desktops, kernel, Mesa, graphics packages, firmware, PipeWire/WirePlumber, Wayland, SELinux, dnf, rpm-ostree, Flatpak, sandboxing, security advisories, GNOME extensions, KDE widgets, Sway/i3/COSMIC/Miracle compatibility, and current common issues.

## Final answer format

Use the Universal Skill Execution Contract format: issue class, safety level, security/facts check, architecture fit, bounded diagnostics, interpretation, backup/disaster plan, safe remediation, guarded recovery, validation, final architecture audit, and token-saving note.

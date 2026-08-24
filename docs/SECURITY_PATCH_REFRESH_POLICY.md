# Security Patch Refresh Policy

This repository treats OS security patch guidance as time-sensitive.

## First-run behavior

At the start of any supported coding-agent session, load this file plus `AGENTS.md` when present. Then load only the current agent's thin adapter when applicable—for example, `CLAUDE.md` in Claude Code. Do not require one vendor's adapter inside a different agent. Treat these files as persistent project context for skill maintenance.

## Rule for OS-specific skills

Before updating or using an OS-specific skill for patching, kernel updates, desktop updates, browser updates, driver updates, or vulnerability remediation, verify current vendor security sources for that OS family.

## Source priority

- Ubuntu: Ubuntu Security Notices, Ubuntu CVE tracker, Ubuntu Pro/ESM/Livepatch docs, Launchpad package pages, release notes.
- Fedora: Fedora advisories, Fedora package metadata, Fedora Docs, Fedora Magazine release notes, Fedora common issues, rpm-ostree docs for Atomic Desktops.
- RHEL/Rocky/Alma: vendor errata, security advisories, ELS/EUS/lifecycle docs, package metadata.
- Debian: Debian Security Advisories, package tracker, release notes.
- openSUSE/SUSE: SUSE/openSUSE advisories, package metadata, lifecycle docs.
- Arch: Arch security tracker, package news, Arch Linux news.

Community reports are signals only. Do not change skills from one forum or Reddit report unless supported by vendor docs, package metadata, upstream release notes, or multiple credible reports.

## Update behavior

Keep changes small and category-scoped. Prefer chunk files under each skill directory instead of rewriting large `SKILL.md` files.

## Safety

Do not recommend broad OS upgrades, kernel changes, driver swaps, display-manager changes, or security-control changes without checking support state, package health, backup path, and validation steps.

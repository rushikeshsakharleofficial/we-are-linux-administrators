# Release 1.18.8

## Package

- Repository/package metadata version: `1.18.8`
- Plugin metadata version: `1.18.8`
- Skill count: `80`
- Package name: `linux-admin`
- Latest published GitHub Release: `v1.17.74` as verified on 2026-08-16; `v1.18.8` is repository metadata only until separately published.
- npm registry publication: not currently verified; use GitHub source installation until publication succeeds.

## Architecture

`linux-admin` uses compact parent-domain routing:

```text
using-linux-admin -> parent/specialist -> bounded evidence -> one matching chunk
```

A second chunk/support skill is loaded only when evidence proves a cross-layer issue.

## Consolidated domains

- Network: TCP, UDP, packet capture and VLAN/bonding under `network`.
- Timekeeping: Chrony/NTP and system-clock/timezone/RTC under `time`.
- Storage batch 1: mounts/fstab, filesystem health and SMART/media risk under `storage`; high-risk storage technologies remain distinct pending review.
- Performance: CPU, memory/OOM, swap/zram and capacity planning under `performance`; `limits-expert` remains distinct.
- Permissions: POSIX modes and ACL semantics under `permissions`; SELinux/AppArmor remain distinct.
- Identity/auth: local accounts, PAM, SSSD/LDAP and sudoers under `auth`; SSH/RDP remain distinct.
- Logging: rsyslog and logrotate under `logs`; product-specific monitoring remains distinct.
- Incident management: post-containment RCA under `incident-response-expert`; formal report generation remains distinct.
- Automation: Bash/POSIX scripting and operational runbooks are now `skills/automation/chunks/bash-scripting.md` and `skills/automation/chunks/runbooks.md`. `ansible-expert`, cron and systemd remain distinct where their product/scheduler semantics matter.

## Additional fix

`ansible-expert` no longer points to retired `sudoers-expert` or `runbook-expert`; escalation now routes to `auth` and `automation`.

## Latest source install

```bash
npm install -g github:rushikeshsakharleofficial/we-are-linux-administrators
linux-admin status
linux-admin install-global
```

Claude Code plugin install:

```bash
linux-admin install-claude
```

Codex CLI:

```bash
npm install -g @openai/codex
codex
```

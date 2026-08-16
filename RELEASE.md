# Release 1.18.13

## Package

- Repository/package metadata version: `1.18.13`
- Plugin metadata version: `1.18.13`
- Skill count: `74`
- Package name: `linux-admin`
- Latest published GitHub Release: `v1.17.74` as verified on 2026-08-17; `v1.18.13` is repository metadata only until separately published.
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
- Storage: mounts/fstab, filesystem health, SMART, filesystem quotas and LVM are chunks under `storage`; RAID, iSCSI, multipath, NFS, Samba and backup/restore remain distinct pending separate review.
- Performance: CPU, memory/OOM, swap/zram and capacity planning under `performance`; `limits-expert` remains distinct.
- Permissions: POSIX modes and ACL semantics under `permissions`; SELinux/AppArmor remain distinct.
- Identity/auth: local accounts, PAM, SSSD/LDAP and sudoers under `auth`; SSH/RDP remain distinct.
- Logging: rsyslog and logrotate under `logs`; product monitoring remains distinct.
- Incident management: post-containment RCA under `incident-response-expert`; formal report generation remains distinct.
- Automation: Bash/POSIX scripting and operational runbooks under `automation`; Ansible, cron and systemd remain distinct where their semantics matter.
- Security: broad host-audit workflow, auditd and Fail2Ban are chunks under `security-expert`; distinct MAC, SSH/auth, firewall, kernel/sysctl and vulnerability controls stay separate where their own semantics are proven.
- Package lifecycle: package/repository/transaction recovery stays in `package-manager-expert`; planned OS/security patching, kernel maintenance, canary rollout and reboot coordination live in `skills/package-manager-expert/chunks/patching.md`. Release upgrades remain with `migration-expert`.

## LVM consolidation

The former top-level `lvm-expert` has been retired after its useful PV/VG/LV mapping, LV growth, thin-pool, snapshot, filesystem-aware resize and rollback guidance was preserved and expanded in `skills/storage/chunks/lvm.md`.

`storage` now routes proven LVM conditions to that chunk. RAID, iSCSI, multipath, network filesystems and backup remain separate because their failure and recovery semantics carry distinct risk.

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

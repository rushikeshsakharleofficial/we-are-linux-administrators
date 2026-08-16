# Release 1.18.7

## Package

- Repository/package metadata version: `1.18.7`
- Plugin metadata version: `1.18.7`
- Skill count: `82`
- Package name: `linux-admin`
- Latest published GitHub Release: `v1.17.74` as verified on 2026-08-16; `v1.18.7` is repository metadata only until separately published.
- npm registry publication: not currently verified; use GitHub source installation until publication succeeds.

## Architecture

`linux-admin` uses compact parent-domain routing:

```text
using-linux-admin
  -> parent skill
    -> bounded condition/evidence check
      -> one matching chunk
```

A second chunk/support skill is loaded only when evidence proves a cross-layer issue.

## Consolidated domains

- **Network:** TCP, UDP, packet capture and VLAN/bonding are focused chunks under `network`.
- **Timekeeping:** Chrony/NTP and system-clock/timezone/RTC are chunks under `time`.
- **Storage batch 1:** mounts/fstab, filesystem health and SMART/media risk are chunks under `storage`; LVM/RAID/iSCSI/multipath/NFS/Samba/quota/backup remain distinct pending review.
- **Performance:** CPU, memory/OOM, swap/zram and capacity planning are chunks under `performance`; `limits-expert` remains distinct.
- **Permissions:** POSIX modes/ownership/traversal and ACL semantics are chunks under `permissions`; SELinux/AppArmor remain distinct.
- **Identity/auth:** local accounts, PAM, SSSD/LDAP and sudoers are chunks under `auth`; SSH hardening and RDP remain distinct because remote-access configuration has separate lockout/security risk.
- **Logging:** rsyslog routing/forwarding/queues/TLS and logrotate retention/reopen policy are chunks under `logs`. Journald investigation stays in the parent baseline; Nagios Core and Observium CE remain distinct product specialists.
- **Incident management:** post-containment root-cause analysis is now `skills/incident-response-expert/chunks/root-cause-analysis.md`. Active triage/containment/recovery stays in the incident-response parent; `incident-report-creator-expert` remains separate for formal DOCX/XLSX/PDF/PPTX generation.

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

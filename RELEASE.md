# Release 1.18.4

## Package

- Repository/package metadata version: `1.18.4`
- Plugin metadata version: `1.18.4`
- Skill count: `89`
- Package name: `linux-admin`
- Latest published GitHub Release: `v1.17.74` as verified on 2026-08-16; `v1.18.4` is repository metadata only until separately published.
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

### Network

Former top-level `tcp-expert`, `udp-expert`, `tcpdump-expert`, and `vlan-bonding-expert` live under `skills/network/chunks/`.

### Timekeeping

Former top-level `chrony-expert` and `date-timectl-expert` are now one `time` parent with two condition-specific chunks under `skills/time/chunks/`.

### Storage — first batch

Former top-level `disk-mounting-expert`, `filesystem-expert`, and `smart-disk-expert` are now condition-specific storage chunks under `skills/storage/chunks/`. LVM, RAID, iSCSI, multipath, NFS, Samba, quota, and backup remain distinct specialists pending separate review.

### Performance

Former top-level `cpu-expert`, `memory-expert`, `swap-expert`, and `capacity-planning-expert` are condition-specific chunks under `skills/performance/chunks/`. `limits-expert` remains top-level because resource ceilings also serve security and blast-radius control.

### Permissions — POSIX/ACL batch

Former top-level `file-permissions-expert` and `acl-permissions-expert` are now `skills/permissions/chunks/posix-modes.md` and `skills/permissions/chunks/acl.md`. The `permissions` parent performs bounded layer checks first and routes to those chunks only when evidence points to POSIX modes/ownership or ACL semantics.

`selinux-expert` and `apparmor-expert` remain distinct because mandatory-access-control policy has different evidence and remediation risk. `user-permissions-expert` also remains distinct pending the identity/auth consolidation review because account lifecycle, sudo, PAM and SSH authorization are not ordinary file permissions.

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

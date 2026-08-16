# Release 1.18.2

## Package

- Repository/package metadata version: `1.18.2`
- Plugin metadata version: `1.18.2`
- Skill count: `95`
- Package name: `linux-admin`
- Latest published GitHub Release: `v1.17.74` as verified on 2026-08-16; `v1.18.2` is repository metadata only until separately published.
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

Former top-level `disk-mounting-expert`, `filesystem-expert`, and `smart-disk-expert` are now condition-specific storage chunks:

- `skills/storage/chunks/mounts.md` — mounts, fstab, bind mounts, remounts, systemd mount interpretation, boot mount failures, and safe unmount handling.
- `skills/storage/chunks/filesystem-health.md` — capacity/inodes, df/du mismatch, ext4/XFS/Btrfs health, read-only remounts, repair planning, and grow/shrink constraints.
- `skills/storage/chunks/smart.md` — SMART/NVMe media health, wear, temperature/interface evidence, failure risk, and replacement planning.

LVM, RAID, iSCSI, multipath, NFS, Samba, quota, and backup remain distinct specialists until their overlap is reviewed. This avoids turning storage into a risky mega-skill.

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

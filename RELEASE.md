# Release 1.18.16

## Package

- Repository/package metadata version: `1.18.16`
- Plugin metadata version: `1.18.16`
- Skill count: `70`
- Package name: `linux-admin`
- Latest published GitHub Release: `v1.17.74` as verified on 2026-08-17; `v1.18.16` is repository metadata only until separately published.
- npm registry publication: not currently verified; use GitHub source installation until publication succeeds.

## Architecture

`linux-admin` uses compact parent-domain routing:

```text
using-linux-admin -> parent/specialist -> bounded evidence -> one matching chunk
```

A second chunk/support skill is loaded only when evidence proves a cross-layer issue.

## NFS and Samba consolidation

The former top-level `nfs-expert` and `samba-expert` are retired. Their protocol/export/share, identity-mapping, permission, safe-change and validation guidance is preserved and expanded under:

- `skills/storage/chunks/nfs.md`
- `skills/storage/chunks/samba.md`

`storage` now routes proven NFS and Samba/SMB conditions to those chunks. `multipath-expert` and `backup-restore-expert` remain distinct because path-failover and recovery/RPO/RTO workflows still justify separate specialists.

## Consolidated domains

Network, timekeeping, storage baseline/quota/LVM/RAID/iSCSI/NFS/Samba, performance, permissions, auth, logging, automation, package patching, incident RCA and broad host-security audit branches use parent/chunk routing. Distinct high-risk/product-specific specialists remain top-level when that improves safety.

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

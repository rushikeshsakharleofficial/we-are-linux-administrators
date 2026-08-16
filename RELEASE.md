# Release 1.18.15

## Package

- Repository/package metadata version: `1.18.15`
- Plugin metadata version: `1.18.15`
- Skill count: `72`
- Package name: `linux-admin`
- Latest published GitHub Release: `v1.17.74` as verified on 2026-08-17; `v1.18.15` is repository metadata only until separately published.
- npm registry publication: not currently verified; use GitHub source installation until publication succeeds.

## Architecture

`linux-admin` uses compact parent-domain routing:

```text
using-linux-admin -> parent/specialist -> bounded evidence -> one matching chunk
```

A second chunk/support skill is loaded only when evidence proves a cross-layer issue.

## iSCSI consolidation

The former top-level `iscsi-expert` is retired. Its initiator/session/target/LUN mapping, multipath handoff, stable-device identity and guarded login/logout guidance is preserved and expanded under `skills/storage/chunks/iscsi.md`.

`storage` now routes proven iSCSI conditions to that chunk. `multipath-expert`, NFS, Samba and backup/restore remain separate because their pathing, protocol/authentication and recovery semantics still justify distinct specialists.

## Consolidated domains

Network, timekeeping, storage baseline/quota/LVM/RAID/iSCSI, performance, permissions, auth, logging, automation, package patching, incident RCA and broad host-security audit branches use parent/chunk routing. Distinct high-risk/product-specific specialists remain top-level when that improves safety.

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

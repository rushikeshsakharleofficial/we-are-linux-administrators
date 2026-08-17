# Release 1.18.18

## Package

- Repository/package metadata version: `1.18.18`
- Plugin metadata version: `1.18.18`
- Skill count: `66`
- Package name: `linux-admin`
- Latest published GitHub Release: `v1.17.74` as verified on 2026-08-17; `v1.18.18` is repository metadata only until separately published.
- npm registry publication: not currently verified; use GitHub source installation until publication succeeds.

## Architecture

`linux-admin` uses compact parent-domain routing:

```text
using-linux-admin -> parent/specialist -> bounded evidence -> one matching chunk
```

A second chunk/support skill is loaded only when evidence proves a cross-layer issue.

## Network routing/NAT consolidation

The former top-level `iproute-expert`, `routing-expert` and `natting-expert` are retired. Their useful Linux route/policy-routing/iproute2, namespace/VRF/tunnel, SNAT/DNAT/masquerade/port-forwarding, forwarding and conntrack guidance is preserved and expanded under:

- `skills/network/chunks/routing-iproute.md`
- `skills/network/chunks/nat-conntrack.md`

`network` now owns condition-based routing for route/policy-routing and NAT/conntrack failures. Firewall filtering, proxy and DNS remain distinct specialists because those are separate control planes.

## Consolidated domains

Network, timekeeping, storage baseline/quota/LVM/RAID/iSCSI/NFS/Samba, performance, permissions, auth, logging, automation, package patching, incident RCA and broad security host-audit/auditd/Fail2Ban/vulnerability branches use parent/chunk routing. Distinct high-risk/product-specific specialists remain top-level when that improves safety.

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

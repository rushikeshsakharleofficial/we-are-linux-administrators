# Release 1.18.19

## Package

- Repository/package metadata version: `1.18.19`
- Plugin metadata version: `1.18.19`
- Skill count: `65`
- Package name: `linux-admin`
- Latest published GitHub Release: `v1.17.74` as verified on 2026-08-28; `v1.18.19` is repository metadata only until separately published.
- npm registry publication: not currently verified; use GitHub source installation until publication succeeds.

## Architecture

```text
using-linux-admin -> parent/specialist -> bounded evidence -> one matching chunk
```

A second chunk/support skill is loaded only when evidence proves a cross-layer issue.

## Load-balancer consolidation

The former top-level `haproxy-expert` is retired. HAProxy frontend/backend, ACL, health-check, stickiness, TLS and guarded reload guidance is preserved and expanded under:

- `skills/load-balancer-expert/chunks/haproxy.md`

`load-balancer-expert` is now a compact vendor-neutral dispatcher. It selects the HAProxy chunk only when HAProxy is proven, while F5 BIG-IP, cloud load balancers, LVS/IPVS, keepalived/VRRP, NGINX reverse proxy and DNS/GSLB remain distinct control planes/specialists where their operational models differ.

## Consolidated domains

Network, timekeeping, storage baseline/quota/LVM/RAID/iSCSI/NFS/Samba, performance, permissions, auth, logging, automation, package patching, incident RCA, broad security host-audit/auditd/Fail2Ban/vulnerability branches, and HAProxy load-balancing now use parent/chunk routing.

At 65 top-level skills, the target range is reached. Future reductions should happen only when a clearly redundant specialist can be merged without weakening routing or recovery safety.

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

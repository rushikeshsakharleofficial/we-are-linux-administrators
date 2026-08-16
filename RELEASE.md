# Release 1.18.17

## Package

- Repository/package metadata version: `1.18.17`
- Plugin metadata version: `1.18.17`
- Skill count: `69`
- Package name: `linux-admin`
- Latest published GitHub Release: `v1.17.74` as verified on 2026-08-17; `v1.18.17` is repository metadata only until separately published.
- npm registry publication: not currently verified; use GitHub source installation until publication succeeds.

## Architecture

`linux-admin` uses compact parent-domain routing:

```text
using-linux-admin -> parent/specialist -> bounded evidence -> one matching chunk
```

A second chunk/support skill is loaded only when evidence proves a cross-layer issue.

## Vulnerability triage consolidation

The former top-level `vulnerability-scan-expert` is retired. Its CVE/scanner triage, false-positive/backport checks, exposure analysis, compensating-control guidance, remediation planning and validation workflow is preserved and expanded under:

- `skills/security-expert/chunks/vulnerability-scan.md`

`security-expert` now routes proven vulnerability/CVE scanner findings to that chunk. `sysctl-expert` remains distinct because it spans kernel runtime tuning, performance and security hardening rather than vulnerability triage alone.

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

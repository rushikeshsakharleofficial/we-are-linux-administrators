# Release 1.18.0

## Package

- Repository/package metadata version: `1.18.0`
- Plugin metadata version: `1.18.0`
- Skill count: `99`
- Package name: `linux-admin`
- GitHub Release: `v1.18.0` is not yet verified as published; latest published release must be checked separately.
- npm registry publication: not currently verified; use GitHub source installation until publication succeeds.

## Architecture change

`linux-admin` is moving from many narrowly overlapping top-level skills to a compact parent-domain model:

```text
using-linux-admin
  -> parent skill
    -> condition/evidence check
      -> one matching chunk
```

A second chunk/support skill is loaded only when evidence proves the problem crosses layers. Detailed procedures stay available, but routing noise is reduced.

## First consolidation: network

Four redundant top-level skills were folded into `network` chunks:

- `tcp-expert` -> `skills/network/chunks/tcp.md`
- `udp-expert` -> `skills/network/chunks/udp.md`
- `tcpdump-expert` -> `skills/network/chunks/packet-capture.md`
- `vlan-bonding-expert` -> `skills/network/chunks/vlan-bonding.md`

`skills/network/SKILL.md` now performs bounded baseline diagnostics and chooses the smallest relevant chunk. Distinct routing, NAT, firewall, proxy and DNS specialists remain separate until their own overlap is reviewed.

## Preserved capabilities

- TCP state/counter, SYN backlog, retransmit, PMTUD/MTU and socket-lifecycle diagnostics
- UDP loss, receive-buffer, fragmentation, NAT/conntrack and protocol-specific reasoning
- privacy-aware bounded tcpdump/BPF capture planning
- VLAN/bond/LACP/MTU/failover troubleshooting with remote-safe rollback
- Universal Skill Execution Contract coverage and bounded evidence requirements

## Other current capabilities

- table-first incident report generation for Word, Excel, PDF and PowerPoint
- global skill installation to `~/.agents/skills` and `~/.claude/skills`
- portable agent guidance through `AGENTS.md` and thin vendor adapters

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

# Release 1.18.1

## Package

- Repository/package metadata version: `1.18.1`
- Plugin metadata version: `1.18.1`
- Skill count: `98`
- Package name: `linux-admin`
- Latest published GitHub Release: `v1.17.74` as verified on 2026-08-16; `v1.18.1` is repository metadata only until separately published.
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

Former top-level `chrony-expert` and `date-timectl-expert` are now one `time` parent with two condition-specific chunks:

- `skills/time/chunks/chrony.md` — Chrony/NTP sources, reach, stratum, offset, drift, makestep, NTS, server mode and VM time interaction.
- `skills/time/chunks/system-clock.md` — timezone, wall clock/UTC, RTC/hwclock, `timedatectl`, systemd-timesyncd and application timestamp interpretation.

The time parent deliberately keeps these conditions separate and loads both only when evidence proves an interaction.

## Consistency repair

`AGENTS.md` and local/global setup documentation were corrected from stale `1.17.75 / 103` context to the current compact-tree state.

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

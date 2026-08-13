# 🐧 linux-admin

Focused Linux administration and SRE skills for Claude Code, Codex, and other maintained agent tools.

**Version:** `1.18.0`  
**Skill count:** `80`

## What it does

- Read-only-first Linux troubleshooting.
- Evidence-based RCA instead of random command dumping.
- Rollback-aware production changes.
- Focused routing across networking, storage, security, systemd, kernel, databases, monitoring, desktop, load balancing, and automation.
- Portable instructions through `AGENTS.md`; Claude Code packaging through `.claude-plugin/`.

## Install

Claude Code:

```text
/plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
/plugin install linux-admin@we-are-linux-administrators
/reload-plugins
```

Use directly with Codex or another repo-aware agent:

```bash
git clone https://github.com/rushikeshsakharleofficial/we-are-linux-administrators.git
cd we-are-linux-administrators
codex
```

Or:

```bash
npx github:rushikeshsakharleofficial/we-are-linux-administrators
```

## Core entry points

| Skill | Use |
|---|---|
| `diagnose` | General Linux incident triage and RCA |
| `network` | Interfaces, routing, NAT, TCP/UDP, VLAN/bonding, DNS path |
| `storage` | Disk, filesystem, LVM, RAID, SMART and I/O triage |
| `auth` | Users, SSH, sudo, PAM, LDAP and SSSD |
| `permissions` | Modes, ownership, ACLs and access-path failures |
| `performance` | CPU, memory, load, OOM, swap and latency |
| `logs` | journald, rsyslog, logrotate and timeline analysis |
| `security-expert` | Defensive Linux security review and remediation routing |
| `load-balancer-expert` | HAProxy, NGINX, F5, LVS/IPVS, VRRP, cloud LB and GSLB routing |
| `universal-contract-guardian-expert` | Shared production safety contract |

Full index: [`docs/EXPERT_MODULE_INDEX.md`](docs/EXPERT_MODULE_INDEX.md)

## Operating model

1. Select the smallest relevant skill.
2. Collect bounded read-only evidence.
3. Identify the actual failure domain.
4. Propose the smallest safe fix.
5. Validate, include rollback, and stop.

Do not duplicate canonical Linux procedures into vendor-specific agent folders. Thin adapters should point back to `AGENTS.md` and `skills/`.

## Safety

All operational guidance follows [`docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`](docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md). For patch, kernel, driver, vulnerability, or lifecycle guidance, use [`docs/SECURITY_PATCH_REFRESH_POLICY.md`](docs/SECURITY_PATCH_REFRESH_POLICY.md).

## Supported agent surfaces

See [`docs/AI_TOOL_SUPPORT.md`](docs/AI_TOOL_SUPPORT.md). Do not claim native marketplace/plugin installation where it has not been verified.

## Validate

```bash
git config core.hooksPath .githooks
hooks/validate-linux-admin.sh "$(pwd)"
hooks/validate-universal-contract.sh "$(pwd)"
```

## Contributing

Keep skills focused. Prefer merging overlapping knowledge into an existing domain skill over adding another micro-skill.

MIT licensed.

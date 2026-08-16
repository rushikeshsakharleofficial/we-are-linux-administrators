# 🐧 linux-admin

Open-source Linux administration/SRE skills for safer troubleshooting, production operations, incident management, and agent-assisted infrastructure work.

**Version:** `1.18.14`  
**Skill count:** `73`  
**Package/plugin:** `linux-admin`

## Start here

```text
/linux-admin:using-linux-admin <task>
```

`using-linux-admin` chooses the smallest parent domain or distinct specialist. Parent skills collect bounded evidence and load only the matching condition-specific chunk.

```text
/using-linux-admin
      ↓
parent skill
      ↓
condition/evidence check
      ↓
one matching chunk
```

Examples: TCP -> `network/chunks/tcp.md`; LVM -> `storage/chunks/lvm.md`; RAID/mdadm -> `storage/chunks/raid.md`; patch rollout -> `package-manager-expert/chunks/patching.md`; RCA -> `incident-response-expert/chunks/root-cause-analysis.md`.

Distinct high-risk or product-specific specialists remain top-level where merging would weaken routing or recovery safety.

## Install

### Claude Code plugin

```text
/plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
/plugin install linux-admin@we-are-linux-administrators
/reload-plugins
```

### Latest source / global agent skills

The npm registry publication is **not currently verified**. Use GitHub source until an npm publish succeeds:

```bash
npm install -g github:rushikeshsakharleofficial/we-are-linux-administrators
linux-admin status
linux-admin install-global
```

`install-global` copies canonical skills to `~/.agents/skills/` and Claude Code's `~/.claude/skills/`, skipping existing directories unless `--force` is explicit.

## Routing examples

| Request | Start with |
|---|---|
| Unknown Linux problem | `diagnose` |
| High load/OOM/slowness | `performance` |
| Disk/mount/I/O/quota/LVM/RAID issue | `storage` |
| RAID degradation/rebuild/assembly | `storage` -> RAID chunk |
| File/path ownership/mode/ACL | `permissions` |
| Local account/PAM/SSSD-LDAP/sudo | `auth` |
| Connectivity/TCP/UDP/VLAN/packet flow | `network` |
| NTP/timezone/RTC | `time` |
| Broken package/repository/dependency transaction | `package-manager-expert` |
| OS/security patch rollout | `package-manager-expert` -> patching chunk |
| Logs | `logs` |
| Active incident/RCA | `incident-response-expert` |
| Formal incident report | `incident-report-creator-expert` |
| Broad security audit | `security-expert` |
| Migration/cutover | `migration-expert` |

Full routing map: [`skills/using-linux-admin/SKILL.md`](skills/using-linux-admin/SKILL.md).

## Portability and safety

Canonical procedures stay under `skills/`. `AGENTS.md` is the shared repository instruction source where supported; `CLAUDE.md` and vendor adapters stay thin. Never commit local agent state, maintainer-specific paths, command history, personal memory, tokens or generated credentials.

Every parent, specialist and chunk follows [`docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`](docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md): verify facts, protect recovery paths, define rollback, use guarded recovery for consequential changes, validate results and keep evidence bounded.

## Validate

```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit hooks/validate-linux-admin.sh hooks/validate-universal-contract.sh
hooks/validate-linux-admin.sh "$(pwd)"
hooks/validate-universal-contract.sh "$(pwd)"
```

## License

MIT License. Maintained by Rushikesh Sakharle.
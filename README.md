# 🐧 linux-admin

Open-source Linux administration/SRE skills for safer troubleshooting, production operations, incident management, and agent-assisted infrastructure work.

**Version:** `1.18.4`  
**Skill count:** `89`  
**Package/plugin:** `linux-admin`

## Start here

```text
/linux-admin:using-linux-admin <task>
```

`using-linux-admin` chooses the smallest **parent domain or distinct specialist**. Parent skills then identify the condition from bounded evidence and load only the matching chunk.

```text
/using-linux-admin
      ↓
parent skill
      ↓
condition/evidence check
      ↓
one matching chunk
      ↓
second chunk only when evidence proves a cross-layer issue
```

This keeps routing compact without throwing away specialist knowledge.

### Consolidated examples

```text
"TCP connections stuck in SYN_RECV"
→ network
→ skills/network/chunks/tcp.md
```

```text
"chronyd has a large offset and bad source reach"
→ time
→ skills/time/chunks/chrony.md
```

```text
"fstab entry blocks boot after a device rename"
→ storage
→ skills/storage/chunks/mounts.md
```

```text
"host is swapping heavily and latency spikes"
→ performance
→ skills/performance/chunks/swap.md
```

```text
"mode bits look right but ACL mask removes write access"
→ permissions
→ skills/permissions/chunks/acl.md
```

Network, timekeeping, the first storage branches, core performance branches, and POSIX/ACL permission branches now use parent/chunk routing. Distinct specialists stay top-level when merging would reduce safety or routing accuracy.

## Incident management reports

`incident-report-creator-expert` creates one verified, table-first incident dataset and renders it consistently into Word `.docx`, Excel `.xlsx`, PDF `.pdf`, PowerPoint `.pptx`, or all four. Unknown facts stay marked as unknown instead of being invented.

For an active outage use `incident-response-expert` first; use the report creator after incident evidence and facts are established.

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

`install-global` copies canonical skills to `~/.agents/skills/` and Claude Code's `~/.claude/skills/`. Existing skill directories are skipped unless `--force` is explicit.

### Codex/project use

```bash
git clone https://github.com/rushikeshsakharleofficial/we-are-linux-administrators.git
cd we-are-linux-administrators
npm install -g @openai/codex
codex
```

Recommended first instruction:

```text
Read AGENTS.md.
Read skills/using-linux-admin/SKILL.md and choose the smallest relevant parent/specialist.
Let that parent select one matching chunk from evidence.
Follow docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md.
```

Detailed project/global paths: [`docs/LOCAL_GLOBAL_AGENT_SETUP.md`](docs/LOCAL_GLOBAL_AGENT_SETUP.md).

## Routing examples

| Request | Start with |
|---|---|
| Unknown Linux problem | `diagnose` |
| Service failure | `service` |
| Boot failure | `boot` |
| Kernel panic/lockup | `kernel` |
| High load/OOM/slowness | `performance` |
| CPU/memory/swap/capacity issue | `performance` → matching chunk |
| nofile/nproc/memlock/resource-limit audit | `limits-expert` |
| Disk/mount/I/O issue | `storage` |
| Mount/fstab/filesystem/SMART issue | `storage` → matching chunk |
| File/path ownership/mode/ACL issue | `permissions` → matching chunk |
| SSH/login/sudo identity issue | `auth` |
| Connectivity/TCP/UDP/VLAN/packet-flow issue | `network` → matching chunk |
| NTP/Chrony/timezone/RTC issue | `time` → matching chunk |
| Active incident/outage | `incident-response-expert` |
| Incident management report | `incident-report-creator-expert` |
| Security audit | `security-expert` |
| Load-balancer choice | `load-balancer-expert` |
| Migration/cutover | `migration-expert` |
| Tuning/optimisation | `optimization-guardian-expert` first |

Full routing map: [`skills/using-linux-admin/SKILL.md`](skills/using-linux-admin/SKILL.md).

## Portability

Canonical procedures stay under `skills/`. Root `AGENTS.md` is the shared repository instruction source where supported; `CLAUDE.md`, `.github/copilot-instructions.md`, `.amazonq/rules/linux-admin.md`, `opencode.json`, and `.aider.conf.yml` stay thin.

Do not commit local agent state, absolute maintainer paths, command history, personal memory, tokens, or generated credentials.

## Safety

Every parent, specialist and chunk follows [`docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`](docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md): verify facts, plan rollback, check architecture fit, protect backups/recovery paths, use guarded rollback for consequential remote changes, validate results, and keep evidence bounded.

OS-specific patch/kernel/driver/lifecycle/vulnerability guidance follows [`docs/SECURITY_PATCH_REFRESH_POLICY.md`](docs/SECURITY_PATCH_REFRESH_POLICY.md).

## Validate

```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit hooks/validate-linux-admin.sh hooks/validate-universal-contract.sh
hooks/validate-linux-admin.sh "$(pwd)"
hooks/validate-universal-contract.sh "$(pwd)"
```

## License

MIT License. Maintained by Rushikesh Sakharle.

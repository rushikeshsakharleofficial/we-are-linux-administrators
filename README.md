# 🐧 linux-admin

Open-source Linux administration/SRE skills for safer troubleshooting, production operations, incident management, and agent-assisted infrastructure work.

**Version:** `1.18.11`  
**Skill count:** `76`  
**Package/plugin:** `linux-admin`

## Start here

```text
/linux-admin:using-linux-admin <task>
```

`using-linux-admin` chooses the smallest **parent domain or distinct specialist**. Parent skills collect bounded evidence and load only the matching condition-specific chunk.

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

This keeps routing compact without deleting specialist knowledge.

### Consolidated examples

```text
"TCP connections stuck in SYN_RECV" → network → chunks/tcp.md
"chronyd has a large offset" → time → chunks/chrony.md
"fstab blocks boot" → storage → chunks/mounts.md
"XFS project quota is not enforcing" → storage → chunks/quota.md
"host is swapping heavily" → performance → chunks/swap.md
"ACL mask removes write access" → permissions → chunks/acl.md
"LDAP user resolves but cannot log in" → auth → chunks/sssd-ldap.md
"rsyslog remote queue is stuck" → logs → chunks/rsyslog.md
"review this Bash maintenance script" → automation → chunks/bash-scripting.md
"outage is contained; find the causal chain" → incident-response-expert → chunks/root-cause-analysis.md
"audit this Linux host" → security-expert → chunks/security-audit.md
```

Network, timekeeping, storage baseline/quota, core performance, POSIX/ACL permissions, core identity/auth, core logging, Bash/runbook automation, post-containment RCA, and host-security audit branches use parent/chunk routing. Distinct specialists remain top-level when merging would reduce safety or routing accuracy.

## Incident management

`incident-response-expert` owns active response and post-containment RCA. `incident-report-creator-expert` remains separate because formal Word `.docx`, Excel `.xlsx`, PDF `.pdf`, and PowerPoint `.pptx` generation is a different tool/output phase.

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
| Bash/POSIX script or automation helper | `automation` → Bash chunk |
| Operational maintenance runbook/checklist | `automation` → runbook chunk |
| Ansible playbook/inventory/rollout | `ansible-expert` |
| Service failure | `service` |
| Boot failure | `boot` |
| High load/OOM/slowness | `performance` |
| Disk/mount/I/O/quota issue | `storage` |
| File/path ownership/mode/ACL issue | `permissions` |
| Local account/PAM/SSSD-LDAP/sudo issue | `auth` |
| SSH hardening/remote-access policy | `ssh-hardening-expert` |
| Connectivity/TCP/UDP/VLAN/packet-flow issue | `network` |
| NTP/Chrony/timezone/RTC issue | `time` |
| Missing/forwarded/rotating log issue | `logs` |
| Active incident/outage | `incident-response-expert` |
| Incident management report | `incident-report-creator-expert` |
| Broad security audit/auditd/Fail2Ban | `security-expert` |
| Migration/cutover | `migration-expert` |

Full routing map: [`skills/using-linux-admin/SKILL.md`](skills/using-linux-admin/SKILL.md).

## Portability and safety

Canonical procedures stay under `skills/`. `AGENTS.md` is the shared repository instruction source where supported; `CLAUDE.md` and vendor adapters stay thin. Never commit local agent state, maintainer-specific paths, command history, personal memory, tokens or generated credentials.

Every parent, specialist and chunk follows [`docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`](docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md): verify facts, plan rollback, check architecture fit, protect recovery paths, use guarded rollback for consequential changes, validate results and keep evidence bounded.

## Validate

```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit hooks/validate-linux-admin.sh hooks/validate-universal-contract.sh
hooks/validate-linux-admin.sh "$(pwd)"
hooks/validate-universal-contract.sh "$(pwd)"
```

## License

MIT License. Maintained by Rushikesh Sakharle.
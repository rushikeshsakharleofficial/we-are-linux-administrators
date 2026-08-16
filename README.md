# 🐧 linux-admin

Open-source Linux administration/SRE skills for safer troubleshooting, production operations, incident management, and agent-assisted infrastructure work.

**Version:** `1.17.75`  
**Skill count:** `103`  
**Package/plugin:** `linux-admin`

## Start here

```text
/linux-admin:using-linux-admin <task>
```

`using-linux-admin` is the canonical routing-only skill. It selects the smallest relevant parent or micro-skill; the specialist then handles the actual work under the Universal Skill Execution Contract.

## Incident management reports

`incident-report-creator-expert` creates one verified, table-first incident dataset and renders it consistently into Word `.docx`, Excel `.xlsx`, PDF `.pdf`, PowerPoint `.pptx`, or all four. It covers incident summary, impact, timeline, detection/response, RCA, corrective/preventive actions, communications, lessons learned, evidence, and outstanding risk. Unknown facts stay marked as unknown instead of being invented.

```text
/linux-admin:incident-report-creator-expert create PIR in docx xlsx pdf and pptx
```

For an active outage/incident use `incident-response-expert` first; use the report creator after incident evidence and facts are established.

## Install

### Claude Code plugin

```text
/plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
/plugin install linux-admin@we-are-linux-administrators
/reload-plugins
```

### Latest source / global agent skills

The npm registry publication is **not currently verified**. Use the GitHub source until an npm publish succeeds:

```bash
npm install -g github:rushikeshsakharleofficial/we-are-linux-administrators
linux-admin status
linux-admin install-global
```

Or run directly without a permanent install:

```bash
npx github:rushikeshsakharleofficial/we-are-linux-administrators
```

`install-global` copies the canonical skills to `~/.agents/skills/` and Claude Code's native `~/.claude/skills/`. Existing skill directories are skipped unless you intentionally use `--force`.

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
Read skills/using-linux-admin/SKILL.md and choose the smallest relevant specialist.
Follow docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md.
```

Detailed per-agent project/global paths: [`docs/LOCAL_GLOBAL_AGENT_SETUP.md`](docs/LOCAL_GLOBAL_AGENT_SETUP.md).

## Routing examples

| Request | Start with |
|---|---|
| Unknown Linux problem | `diagnose` |
| Service failure | `service` |
| Boot failure | `boot` |
| Kernel panic/lockup | `kernel` |
| High load/OOM/slowness | `performance` |
| Disk/mount/I/O issue | `storage` |
| Permission denied | `permissions` |
| SSH/login/sudo identity issue | `auth` |
| Connectivity issue | `network` |
| Active incident/outage | `incident-response-expert` |
| Incident management report | `incident-report-creator-expert` |
| Security audit | `security-expert` |
| Load-balancer choice | `load-balancer-expert` |
| Migration/cutover | `migration-expert` |
| Tuning/optimisation | `optimization-guardian-expert` first |
| Broad senior execution | `linux-admin-chief-engineer` after routing |

Full routing map: [`skills/using-linux-admin/SKILL.md`](skills/using-linux-admin/SKILL.md).

## Portability

Canonical Linux procedures stay under `skills/`. Root `AGENTS.md` is the shared repository instruction source where supported; `CLAUDE.md`, `.github/copilot-instructions.md`, `.amazonq/rules/linux-admin.md`, `opencode.json`, and `.aider.conf.yml` remain thin adapters rather than copies of 103 skills.

Do not commit local agent state, absolute maintainer paths, command history, personal memory, tokens, or generated credentials. See [`docs/LOCAL_GLOBAL_AGENT_SETUP.md`](docs/LOCAL_GLOBAL_AGENT_SETUP.md).

## Safety

Every skill follows [`docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`](docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md): verify facts, plan rollback, check architecture fit, protect backups/recovery paths, use guarded rollback for consequential remote changes, validate results, and keep evidence bounded.

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

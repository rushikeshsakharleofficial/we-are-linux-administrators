# 🐧 linux-admin

Open-source Linux administration skills for safer troubleshooting, production operations, Claude Code, Codex, and other agent-based coding/ops tools.

**Version:** `1.17.74`  
**Skill count:** `102`  
**Package/plugin:** `linux-admin`

## What it does

`linux-admin` gives AI agents a senior Linux administrator/SRE workflow: read-only evidence first, small specialist context, rollback-aware changes, and bounded output.

The main entry point is now:

```text
/linux-admin:using-linux-admin <task>
```

`using-linux-admin` is a routing-only skill. It maps the request to the smallest relevant parent or micro-skill, then the specialist skill handles the actual Linux work.

```text
User request
   ↓
using-linux-admin
   ↓
smallest matching specialist skill
   ↓
Universal Skill Execution Contract
   ↓
bounded evidence → safe plan → backup/rollback → validation
```

## Install

### Claude Code

```text
/plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
/plugin install linux-admin@we-are-linux-administrators
/reload-plugins
```

Examples:

```text
/linux-admin:using-linux-admin disk full but df and du do not match
/linux-admin:diagnose nginx service failing after reboot
/linux-admin:network DNS resolves but curl times out
/linux-admin:storage disk full but df and du do not match
```

### Codex

```bash
git clone https://github.com/rushikeshsakharleofficial/we-are-linux-administrators.git
cd we-are-linux-administrators
npm install -g @openai/codex
codex
```

Recommended first prompt:

```text
Read AGENTS.md first.
Read skills/using-linux-admin/SKILL.md and choose the smallest relevant Linux skill.
Follow docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md.
Follow docs/SECURITY_PATCH_REFRESH_POLICY.md for OS-specific guidance.
```

Codex plugin-directory installation should only be treated as available when the plugin has actually been published/shared there.

### npm / npx

```bash
npx github:rushikeshsakharleofficial/we-are-linux-administrators
# or
npm install -g linux-admin
linux-admin
```

## Routing model

Use `skills/using-linux-admin/SKILL.md` when the correct skill is unclear. It prefers one primary skill and at most two support skills unless the task is an incident, migration, or multi-domain production change.

Common parent routes:

| Request | Start with |
|---|---|
| Unknown Linux problem | `diagnose` |
| Service failure | `service` |
| Boot failure | `boot` |
| Kernel panic/lockup | `kernel` |
| High load/OOM/slowness | `performance` |
| Disk/mount/I/O problem | `storage` |
| Permission denied | `permissions` |
| SSH/login/sudo identity issue | `auth` |
| Connectivity issue | `network` |
| Security audit | `security-expert` |
| Load-balancer choice | `load-balancer-expert` |
| Migration/cutover | `migration-expert` |
| Tuning/optimisation | `optimization-guardian-expert` first |
| Broad senior execution | `linux-admin-chief-engineer` after routing |

Full routing map: [`skills/using-linux-admin/SKILL.md`](skills/using-linux-admin/SKILL.md)  
Full skill index: [`docs/EXPERT_MODULE_INDEX.md`](docs/EXPERT_MODULE_INDEX.md)

## Coverage

- Core Linux: boot, kernel, systemd, services, processes, packages
- Networking: routing, NAT, firewall, TCP/UDP, packet capture, proxying
- Storage: filesystems, LVM, RAID, SMART, iSCSI, multipath, NFS, Samba, backup/restore
- Identity: users, permissions, ACL, PAM, SSSD/LDAP, sudo, SSH
- Web/data: NGINX, Apache, PHP-FPM, MySQL/MariaDB, PostgreSQL, Redis
- HA/load balancing: HAProxy, F5, LVS/IPVS, keepalived, cloud LB, DNS/GSLB
- Monitoring/logging: journald, rsyslog, logrotate, Nagios Core, Observium CE
- Security: SELinux, AppArmor, auditd, Fail2Ban, patching, vulnerability review, sysctl
- Desktop: Ubuntu Desktop, Fedora Desktop, RDP/XRDP
- Automation/migration: Bash, Ansible, runbooks, migrations, production change safety

## Agent portability

Linux procedures stay canonical under `skills/`. Root `AGENTS.md` is the preferred portable instruction entry point where supported. Vendor-specific adapters stay thin instead of copying the full skill tree.

Maintained surfaces are documented in [`docs/AI_TOOL_SUPPORT.md`](docs/AI_TOOL_SUPPORT.md). Current adapters include:

```text
.github/copilot-instructions.md
.amazonq/rules/linux-admin.md
opencode.json
.aider.conf.yml
```

Do not assume a model provider itself reads repository instructions. Bedrock-hosted models and other model providers depend on the client/agent that invokes them.

## Safety contract

Every skill follows [`docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`](docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md):

1. Verify facts before changes.
2. Define rollback first.
3. Correct stale instructions with evidence.
4. Check architecture fit.
5. Include an architecture audit where relevant.
6. Plan backup/disaster recovery.
7. Use guarded rollback for risky remote changes.
8. Keep evidence and output bounded.

OS-specific patch, kernel, driver, desktop, lifecycle, and vulnerability guidance follows [`docs/SECURITY_PATCH_REFRESH_POLICY.md`](docs/SECURITY_PATCH_REFRESH_POLICY.md).

## Validate

```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit hooks/validate-linux-admin.sh hooks/validate-universal-contract.sh
hooks/validate-linux-admin.sh "$(pwd)"
hooks/validate-universal-contract.sh "$(pwd)"
```

## Repository layout

```text
skills/using-linux-admin/SKILL.md   # master routing map
skills/*/SKILL.md                   # specialist skills
skills/*/chunks/*.md                # focused large-domain references
AGENTS.md                            # portable agent instructions
CLAUDE.md                            # Claude Code instructions
docs/AI_TOOL_SUPPORT.md             # compatibility guide
docs/CODEX_USAGE.md                 # Codex guide
docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md
docs/SECURITY_PATCH_REFRESH_POLICY.md
```

## License

MIT License. Maintained by Rushikesh Sakharle.

<div align="center">

# linux-admin

**Senior Linux administrator and SRE mental model as a Claude Code plugin.**

[![License](https://img.shields.io/github/license/rushikeshsakharleofficial/we-are-linux-administrators?style=for-the-badge&labelColor=000000&color=A78BFA)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/blob/main/LICENSE)
[![Stars](https://img.shields.io/github/stars/rushikeshsakharleofficial/we-are-linux-administrators?style=for-the-badge&labelColor=000000&color=22D3EE)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/stargazers)
[![Build](https://img.shields.io/github/actions/workflow/status/rushikeshsakharleofficial/we-are-linux-administrators/validate.yml?style=for-the-badge&labelColor=000000&color=4ADE80)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/actions)
[![Version](https://img.shields.io/badge/version-1.17.3-F472B6?style=for-the-badge&labelColor=000000)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/blob/main/.claude-plugin/plugin.json)
[![Skills](https://img.shields.io/badge/skills-98-A78BFA?style=for-the-badge&labelColor=000000)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/tree/main/skills)

</div>

---

## What is this?

`linux-admin` is a Claude Code plugin that gives Claude Code a senior Linux administrator and SRE operating model. It focuses on **read-only-first diagnostics**, distro-aware command selection, evidence-based troubleshooting, safe change planning, rollback thinking, and token-saving evidence collection.

The plugin currently documents **98 task-specific expert skills** covering boot, systemd, networking, firewalling, storage, LVM, RAID, iSCSI, NFS, multipath, permissions, containers, Docker, Podman, Kubernetes nodes, kernel, auth, PAM, SSSD/LDAP, logging, auditd, rsyslog, logrotate, MySQL, PostgreSQL, Redis, Nginx, Apache, HAProxy, PHP-FPM, Samba, backup/restore, incident response, SSH hardening, tcpdump, Ansible, patching, SELinux, AppArmor, capacity planning, operational workflow, and more.

---

## Quick Start

**CLI marketplace:**

```bash
claude plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
claude plugin install linux-admin@we-are-linux-administrators
```

**Inside a Claude Code session:**

```text
/plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
/plugin install linux-admin@we-are-linux-administrators
```

**Local clone:**

```bash
git clone https://github.com/rushikeshsakharleofficial/we-are-linux-administrators.git
claude --plugin-dir ./we-are-linux-administrators
```

**Reload after install:**

```text
/reload-plugins
```

---

## Skill areas

### Core workflow skills

```text
/linux-admin:diagnose
/linux-admin:boot
/linux-admin:service
/linux-admin:network
/linux-admin:performance
/linux-admin:storage
/linux-admin:permissions
/linux-admin:packages
/linux-admin:kernel
/linux-admin:containers
/linux-admin:auth
/linux-admin:logs
/linux-admin:automation
```

### Deep expert families

```text
networking, firewall, fail2ban, NAT, TCP, UDP, iproute, routing, VLAN/bonding, proxy, NFS, tcpdump
storage, filesystems, disk mounting, quota, LVM, RAID, iSCSI, multipath, SMART, backup/restore, logrotate
kernel, sysctl, memory, swap, CPU, I/O wait, load average, process, capacity planning
Docker, Podman, Kubernetes node health
MySQL, PostgreSQL, Redis, Nginx, Apache, HAProxy, PHP-FPM, Samba
OS security, SSH hardening, auditd, SELinux, AppArmor, PAM, SSSD/LDAP, sudoers, CVE triage
time sync, chrony, date/timedatectl, NTP, rsyslog, BIND/named, dnsmasq, Cloudflare, grep/log search
Ansible, patching, cron/systemd timers, systemd, limits, migration, incident response, runbook design
Bash scripting, POSIX shell, command review, shell config
change planning, preflight checks, risk assessment, production safety, maintenance windows, validation, rollback, root cause, incident timelines
```

---

## Triage scripts

`bin/` is added to Claude Code's Bash PATH when the plugin is active. The bundled helpers are designed for evidence collection and quick classification.

```bash
linux-triage                   # general host triage snapshot
linux-log-classifier           # classify journal/syslog errors by severity
sysctl-expert-audit
systemd-expert-audit
limits-expert-audit
networking-expert-audit
firewall-expert-audit
fail2ban-expert-audit
command-expert-audit
user-permissions-expert-audit
file-permissions-expert-audit
acl-permissions-expert-audit
```

---

## Safety model

The plugin content is designed around production-safe behavior:

- prefer read-only diagnostics before changes
- request evidence before assumptions
- separate diagnosis, mitigation, rollback, and validation
- warn on risky/destructive operations
- favor small blast-radius changes, canary rollout, and explicit rollback notes

This is a guardrail and workflow model, not a replacement for human review or organization change control.

---

## Non-Claude agents

Claude Code plugins are Claude-specific. For Codex or Gemini, use the adapter files:

- `codex/AGENTS.md` — Codex prompt adapter
- `gemini/GEMINI.md` — Gemini adapter
- `docs/tasks/` — standalone task files for any agent

---

## Project structure

```text
agents/          linux-sre subagent definition
bin/             triage scripts added to PATH
codex/           Codex/OpenAI adapter prompts
docs/            skill documentation and task files
gemini/          Gemini adapter prompts
scripts/         utility and validation scripts
skills/          skill definitions (98 skills)
templates/       reusable prompt templates
tests/           plugin validation tests
```

---

## Documentation

| Resource | Description |
|---|---|
| [`docs/USAGE.md`](docs/USAGE.md) | Usage guide, examples, workflows, and tips |
| [`docs/EXPERT_MODULE_INDEX.md`](docs/EXPERT_MODULE_INDEX.md) | Expert module index and audit helpers |
| [`docs/core/`](docs/core/) | Operating principles, distro detection, safety policy, diagnostic method |
| [`docs/tasks/`](docs/tasks/) | Standalone task files for non-Claude agents |
| [`codex/AGENTS.md`](codex/AGENTS.md) | Codex adapter |
| [`gemini/GEMINI.md`](gemini/GEMINI.md) | Gemini adapter |

---

## Validation

Recommended checks:

```bash
python3 tests/test_plugin_integrity.py
python3 tests/test_all_linux_admin_experts.py
python3 tests/test_operational_workflow_experts.py
python3 tests/test_ansible_expert.py
```

---

## Contributing

Open a PR with a new skill directory under `skills/` and a matching test in `tests/`. Follow the naming pattern of existing skills: `<topic>-expert` for deep-dive skills, and plain topic names for workflow/router skills.

---

## License

MIT — see [LICENSE](LICENSE).

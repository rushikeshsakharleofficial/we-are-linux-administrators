<div align="center">

# linux-admin

**Senior Linux administrator and SRE mental model as a Claude Code plugin.**

[![License](https://img.shields.io/github/license/rushikeshsakharleofficial/we-are-linux-administrators?style=for-the-badge&labelColor=000000&color=A78BFA)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/blob/main/LICENSE)
[![Stars](https://img.shields.io/github/stars/rushikeshsakharleofficial/we-are-linux-administrators?style=for-the-badge&labelColor=000000&color=22D3EE)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/stargazers)
[![Build](https://img.shields.io/github/actions/workflow/status/rushikeshsakharleofficial/we-are-linux-administrators/validate.yml?style=for-the-badge&labelColor=000000&color=4ADE80)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/actions)
[![Version](https://img.shields.io/badge/version-1.17.8-F472B6?style=for-the-badge&labelColor=000000)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/blob/main/.claude-plugin/plugin.json)
[![Skills](https://img.shields.io/badge/skills-99-A78BFA?style=for-the-badge&labelColor=000000)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/tree/main/skills)

</div>

---

## What is this?

`linux-admin` is a Claude Code plugin that gives Claude Code a senior Linux administrator and SRE operating model: read-only-first diagnostics, distro-aware command selection, evidence-based root-cause analysis, and safety gates for risky shell commands.

Current plugin metadata version: **1.17.8**  
Current skill count: **99 task-specific skills**

The project covers boot, networking, storage, LVM, RAID, iSCSI, NFS, multipath, permissions, containers, Docker, Podman, Kubernetes nodes, kernel, auth, PAM, SSSD/LDAP, logging, auditd, rsyslog, logrotate, MySQL, PostgreSQL, Redis, Nginx, Apache, HAProxy, PHP-FPM, Samba, backup/restore, incident response, SSH hardening, tcpdump, Ansible, patching, SELinux, AppArmor, capacity planning, operational safety, and defensive Linux security validation.

---

## Quick Start

**One-line npx installer:**

```bash
npx github:rushikeshsakharleofficial/we-are-linux-administrators
```

**Claude Code marketplace:**

```bash
claude plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
claude plugin install linux-admin@we-are-linux-administrators
```

**Inside Claude Code:**

```text
/plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
/plugin install linux-admin@we-are-linux-administrators
/reload-plugins
```

**Local clone:**

```bash
git clone https://github.com/rushikeshsakharleofficial/we-are-linux-administrators.git
claude --plugin-dir ./we-are-linux-administrators
```

---

## Core workflows

| Skill | Use |
|---|---|
| `/linux-admin:diagnose` | Main router for general Linux issue triage |
| `/linux-admin:boot` | Boot failures, emergency mode, initramfs, fstab, GRUB |
| `/linux-admin:service` | systemd services, restart loops, daemon crashes |
| `/linux-admin:network` | IP, routing, DNS, firewall, sockets |
| `/linux-admin:performance` | CPU, memory, OOM, load, latency |
| `/linux-admin:storage` | Disk full, inode full, LVM, RAID, filesystem, SMART |
| `/linux-admin:permissions` | POSIX permissions, ACLs, SELinux, AppArmor |
| `/linux-admin:packages` | apt, dnf, rpm, zypper, pacman package issues |
| `/linux-admin:kernel` | Panic, lockup, kdump, call traces |
| `/linux-admin:containers` | Docker, Podman, rootless containers, mounts, ports |
| `/linux-admin:auth` | SSH, sudo, PAM, LDAP, SSSD, user access |
| `/linux-admin:logs` | journald, rsyslog, monitoring, incident timeline |
| `/linux-admin:automation` | Scripts, Ansible, fleet triage |

---

## Expert skill groups

### Networking & firewall

`networking-expert`, `firewall-expert`, `fail2ban-expert`, `natting-expert`, `tcp-expert`, `udp-expert`, `iproute-expert`, `routing-expert`, `vlan-bonding-expert`, `proxy-expert`, `nfs-expert`, `tcpdump-expert`

### Storage & filesystems

`lvm-expert`, `filesystem-expert`, `disk-mounting-expert`, `quota-expert`, `raid-expert`, `iscsi-expert`, `multipath-expert`, `smart-disk-expert`, `backup-restore-expert`, `logrotate-expert`

### Kernel & performance

`kernel-expert`, `sysctl-expert`, `memory-expert`, `swap-expert`, `cpu-expert`, `io-wait-expert`, `load-average-expert`, `process-expert`, `capacity-planning-expert`

### Containers & orchestration

`docker-expert`, `podman-expert`, `kubernetes-node-expert`

### Databases, middleware & web

`mysql-expert`, `postgresql-expert`, `redis-expert`, `nginx-expert`, `apache-expert`, `haproxy-expert`, `php-fpm-expert`, `samba-expert`

### Auth & security

| Skill | Use |
|---|---|
| `/linux-admin:security-expert` | Defensive Linux security validation for owned servers. Uses an incident-driven model, safe dummy tests, scoring, and routing to specialist fix skills. |
| `/linux-admin:os-security-expert` | Linux OS hardening review across SSH, sudo, MAC, auditd, and sysctl |
| `/linux-admin:ssh-hardening-expert` | SSH config hardening, key auth, ciphers, lockout-safe reloads |
| `/linux-admin:auditd-expert` | auditd rule design, compliance evidence, file/syscall watches |
| `/linux-admin:selinux-expert` | SELinux AVC denials, policy modules, contexts, booleans |
| `/linux-admin:apparmor-expert` | AppArmor profiles, enforcement, audit mode, safe rule design |
| `/linux-admin:pam-expert` | PAM stack, module order, auth/account/session/password chains |
| `/linux-admin:sssd-ldap-expert` | SSSD, LDAP, Kerberos, AD joins, ID mapping, cache |
| `/linux-admin:user-permissions-expert` | Users, groups, sudoers, service accounts, offboarding |
| `/linux-admin:file-permissions-expert` | POSIX modes, ownership, umask, safe recursive chmod/chown |
| `/linux-admin:acl-permissions-expert` | POSIX ACLs, masks, default ACLs, getfacl/setfacl backup |
| `/linux-admin:sudoers-expert` | sudoers rules, NOPASSWD, Defaults, safe privilege delegation |
| `/linux-admin:vulnerability-scan-expert` | CVE triage, scan evidence prioritization, remediation planning |

### Time, logging & DNS

`chrony-expert`, `date-timectl-expert`, `ntp-expert`, `rsyslog-expert`, `named-expert`, `dnsmasq-expert`, `cf-expert`, `grep-expert`

### Automation & operations

`ansible-expert`, `patching-expert`, `cron-scheduler-expert`, `systemd-expert`, `limits-expert`, `migration-expert`, `incident-response-expert`, `runbook-expert`, `bash-script-expert`, `shell-script-expert`, `command-expert`

### Operational workflow

`change-plan-expert`, `preflight-check-expert`, `risk-assessment-expert`, `production-safety-expert`, `maintenance-window-expert`, `post-change-validation-expert`, `rollback-expert`, `root-cause-expert`, `incident-timeline-expert`

### Shell & config

`bashrc-expert`, `zshrc-expert`, `package-manager-expert`

---

## Security expert

The new `/linux-admin:security-expert` skill is defensive-only and designed for authorized Linux servers.

It reviews security through an attacker lifecycle instead of only a generic checklist:

1. Initial access
2. Execution
3. Persistence
4. Privilege escalation
5. Defense evasion and impairment
6. Credential access
7. Discovery
8. Lateral movement
9. Collection
10. Exfiltration
11. Impact and recovery

It also includes a 100-point evidence-based score model covering attack surface, SSH/auth, firewall/network, patch posture, sudo/privilege boundaries, systemd hardening, sysctl hardening, resource controls, SELinux/AppArmor, logging/detection, and backup/ransomware recovery readiness.

The skill refuses third-party targets, stealth, malware, exploit chains, credential theft, high-rate guessing, and disruptive testing without a controlled maintenance plan.

---

## Privacy and security feedback

The project does **not** automatically collect server data, create GitHub issues, open pull requests, post comments, or submit reports from a user's machine.

Security feedback is explicit opt-in only. If a user finds a missing check or plugin weakness, the skill can prepare a sanitized GitHub issue draft, but submission requires user review and approval first.

See:

- [`PRIVACY.md`](PRIVACY.md)
- [Security finding feedback template](.github/ISSUE_TEMPLATE/security-finding-feedback.yml)

---

## Triage scripts

`bin/` is added to Claude Code's Bash PATH when the plugin is active:

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

## Safety hook

The plugin installs a `PreToolUse` Bash safety hook:

- **Class R/O** read-only diagnostics pass without interruption.
- **Class 2** disruptive commands require explicit user confirmation.
- **Class 3** destructive commands are denied outright.

This is a guardrail, not a replacement for human review.

---

## Non-Claude agents

Claude Code plugins are Claude-specific. For Codex or Gemini, use the adapter files:

- `codex/AGENTS.md` — Codex/OpenAI adapter prompt
- `gemini/GEMINI.md` — Gemini adapter prompt
- `docs/tasks/` — standalone task files for any agent

---

## Project structure

```text
agents/          linux-sre subagent definition
bin/             triage scripts added to PATH
codex/           Codex/OpenAI adapter prompts
docs/            skill documentation, research notes, and task files
gemini/          Gemini adapter prompts
hooks/           PreToolUse safety hook
scripts/         utility and validation scripts
skills/          skill definitions (99 skills)
templates/       reusable prompt templates
tests/           plugin validation tests
```

---

## Documentation

| Resource | Description |
|---|---|
| [`docs/USAGE.md`](docs/USAGE.md) | Deep usage guide — skills, examples, workflows, tips |
| [`docs/EXPERT_MODULE_INDEX.md`](docs/EXPERT_MODULE_INDEX.md) | Full index of expert modules and audit helpers |
| [`docs/core/`](docs/core/) | Operating principles, distro detection, safety policy, diagnostic method |
| [`docs/security-expert/linux-security-research.md`](docs/security-expert/linux-security-research.md) | Incident-driven Linux security research notes |
| [`docs/security-expert/linux-security-checklist.md`](docs/security-expert/linux-security-checklist.md) | Security audit checklist and output contract |
| [`docs/tasks/`](docs/tasks/) | Standalone task files for non-Claude agents |
| [`codex/AGENTS.md`](codex/AGENTS.md) | Codex/OpenAI adapter |
| [`gemini/GEMINI.md`](gemini/GEMINI.md) | Gemini adapter |

---

## Contributing

Open a PR with a new skill directory under `skills/` and a matching test in `tests/`. Follow the naming pattern of existing skills: `<topic>-expert` for deep-dive skills, plain topic names for workflow skills.

Security finding feedback must be sanitized and explicitly approved by the user before submission.

<a href="https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=rushikeshsakharleofficial/we-are-linux-administrators" />
</a>

---

## License

MIT — see [LICENSE](LICENSE).

---

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=rushikeshsakharleofficial/we-are-linux-administrators&type=Date)](https://star-history.com/#rushikeshsakharleofficial/we-are-linux-administrators&Date)

</div>

<div align="center">

# linux-admin

Senior Linux administrator and SRE workflow as a Claude Code plugin.

[![License](https://img.shields.io/github/license/rushikeshsakharleofficial/we-are-linux-administrators?style=for-the-badge)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/blob/main/LICENSE)
[![Stars](https://img.shields.io/github/stars/rushikeshsakharleofficial/we-are-linux-administrators?style=for-the-badge)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/stargazers)
[![Build](https://img.shields.io/github/actions/workflow/status/rushikeshsakharleofficial/we-are-linux-administrators/validate.yml?style=for-the-badge)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/actions)

</div>

## What is this?

A Claude Code plugin that gives Claude Code a senior Linux administrator and SRE mental model. It provides read-only-first diagnostics, distro-aware command selection, evidence-based root-cause analysis, and safety gates that block or confirm destructive commands before they run. Includes 44 task-specific skills covering boot, networking, storage, permissions, containers, kernel, auth, logging, memory, swap, NTP, NAT, shell config, and more.

## Quick Start

**Install via CLI:**

```bash
# Add this repo as a marketplace
claude plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators

# Install the plugin
claude plugin install linux-admin@we-are-linux-administrators
```

**Or install via slash commands inside Claude Code:**

```text
/plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
/plugin install linux-admin@we-are-linux-administrators
```

**Or load locally:**

```bash
git clone https://github.com/rushikeshsakharleofficial/we-are-linux-administrators.git
claude --plugin-dir ./we-are-linux-administrators
```

Then invoke any skill inside Claude Code:

```text
/linux-admin:diagnose nginx.service failed after config change
/linux-admin:network can ping 8.8.8.8 but DNS fails
/linux-admin:storage /var is full but du does not match df
/linux-admin:firewall-expert lockout-safe nftables rule change
/linux-admin:command-expert review this dangerous find/rm pipeline
```

Reload after edits:

```text
/reload-plugins
```

## Skills

### Core workflows

| Skill | Use |
|---|---|
| `/linux-admin:diagnose` | Main router — general Linux issue triage |
| `/linux-admin:boot` | Boot failures, emergency mode, initramfs, fstab, GRUB |
| `/linux-admin:service` | systemd services, restart loops, daemon crashes |
| `/linux-admin:network` | IP, routing, DNS, firewall, sockets |
| `/linux-admin:performance` | CPU, memory, OOM, load, latency |
| `/linux-admin:storage` | Disk full, inode full, LVM, RAID, filesystem, SMART |
| `/linux-admin:permissions` | POSIX permissions, ACLs, SELinux, AppArmor |
| `/linux-admin:packages` | apt / dnf / rpm / zypper / pacman package issues |
| `/linux-admin:kernel` | Panic, lockup, kdump, call traces |
| `/linux-admin:containers` | Docker, Podman, rootless, mounts, ports |
| `/linux-admin:auth` | SSH, sudo, PAM, LDAP, SSSD, user access |
| `/linux-admin:logs` | journald, rsyslog, monitoring, incident timeline |
| `/linux-admin:automation` | Scripts, Ansible, fleet triage |

### Expert skills

| Skill | Use |
|---|---|
| `/linux-admin:sysctl-expert` | Kernel runtime parameters, safe sysctl tuning |
| `/linux-admin:systemd-expert` | Unit design, restart loops, drop-ins, cgroups, hardening |
| `/linux-admin:limits-expert` | ulimit, PAM limits, systemd Limit*, nofile/nproc sizing |
| `/linux-admin:networking-expert` | Interfaces, routes, DNS, MTU, tc, ethtool, TCP evidence |
| `/linux-admin:firewall-expert` | firewalld, nftables, iptables, UFW, ipset, NAT |
| `/linux-admin:fail2ban-expert` | Jails, filters, actions, regex testing, false-positive prevention |
| `/linux-admin:command-expert` | Command review, safe shell pipelines, destructive command safety |
| `/linux-admin:user-permissions-expert` | Users, groups, sudoers, service accounts, offboarding |
| `/linux-admin:file-permissions-expert` | POSIX modes, ownership, umask, safe recursive chmod/chown |
| `/linux-admin:acl-permissions-expert` | POSIX ACLs, masks, default ACLs, getfacl/setfacl backup |
| `/linux-admin:package-manager-expert` | Fix broken apt/dpkg/dnf transactions safely |
| `/linux-admin:cron-scheduler-expert` | Debug cron jobs that silently don't run |
| `/linux-admin:chrony-expert` | NTP drift and source quality auditing |
| `/linux-admin:date-timectl-expert` | Timezone and NTP status fixes |
| `/linux-admin:quota-expert` | User and project disk quota design |
| `/linux-admin:disk-mounting-expert` | Validate fstab before reboot |
| `/linux-admin:filesystem-expert` | Investigate df/du mismatches |
| `/linux-admin:kernel-expert` | Kernel panic triage and kdump readiness |
| `/linux-admin:tcp-expert` | Stateful TCP connection lifecycle issues |
| `/linux-admin:udp-expert` | Datagram loss, buffer, fragmentation, NAT behavior |
| `/linux-admin:memory-expert` | OOM, PSI, page cache, slab, cgroup memory limits |
| `/linux-admin:swap-expert` | Swap files, zram/zswap, vm.swappiness, sizing |
| `/linux-admin:ntp-expert` | NTP sync across chrony/ntpd/timesyncd, offset, drift |
| `/linux-admin:natting-expert` | SNAT, DNAT, MASQUERADE, port forwarding, conntrack |
| `/linux-admin:bashrc-expert` | .bashrc/.bash_profile, aliases, PATH, prompt, startup order |
| `/linux-admin:zshrc-expert` | .zshrc/zshenv/zprofile, plugins, prompt, startup order |

## Triage scripts

When the plugin is active, `bin/` is added to Claude Code's Bash PATH:

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

## Safety hook

The plugin installs a `PreToolUse` Bash safety hook:

- **Class 3** destructive commands are denied outright.
- **Class 2** disruptive commands require explicit user confirmation.
- **Read-only** commands pass through without interruption.

This is a guardrail, not a replacement for human review.

## Non-Claude agents

Claude Code plugins are Claude-specific. For Codex or Gemini, use the adapter files:

- `codex/AGENTS.md` — Codex prompt adapter
- `gemini/GEMINI.md` — Gemini prompt adapter
- `docs/tasks/` — standalone task files for any agent

## Project Structure

```
agents/          linux-sre subagent definition
bin/             triage scripts added to PATH
codex/           Codex/OpenAI adapter prompts
docs/            skill documentation and task files
gemini/          Gemini adapter prompts
hooks/           PreToolUse safety hook
scripts/         utility and validation scripts
skills/          skill definitions (44 skills)
templates/       reusable prompt templates
tests/           plugin validation tests
```

## Documentation

| Resource | Description |
|---|---|
| [`docs/USAGE.md`](docs/USAGE.md) | Deep usage guide — every skill, examples, workflows, tips |
| [`docs/EXPERT_MODULE_INDEX.md`](docs/EXPERT_MODULE_INDEX.md) | Full index of all expert modules and audit helpers |
| [`docs/core/`](docs/core/) | Operating principles, distro detection, safety policy, diagnostic method |
| [`docs/tasks/`](docs/tasks/) | Standalone task files for non-Claude agents |
| [`docs/prompts/`](docs/prompts/) | Prompt templates |
| [`codex/AGENTS.md`](codex/AGENTS.md) | Codex adapter |
| [`gemini/GEMINI.md`](gemini/GEMINI.md) | Gemini adapter |

## Contributing

Open a PR with a new skill directory under `skills/`, a matching doc under `docs/`, and a test in `tests/`. Follow the naming pattern of existing skills (`<topic>-expert` for deep-dive skills, plain topic names for workflow skills).

<a href="https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=rushikeshsakharleofficial/we-are-linux-administrators" />
</a>

## License

MIT — see [LICENSE](LICENSE).

---

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=rushikeshsakharleofficial/we-are-linux-administrators&type=Date)](https://star-history.com/#rushikeshsakharleofficial/we-are-linux-administrators&Date)

</div>

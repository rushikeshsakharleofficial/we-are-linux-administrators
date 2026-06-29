# Release 1.17.51

## Package

- NPM package version: `1.17.51`
- Plugin metadata version: `1.17.51`
- Skill count: `113`
- Package name: `linux-admin`

## Added

- `ubuntu-desktop-expert` — Ubuntu Desktop specialist for GNOME, KDE Plasma/Kubuntu, Xfce/Xubuntu, MATE, Cinnamon, LXQt/Lubuntu, Budgie, UKUI/Kylin, Unity, Ubuntu Studio desktop workflows, Wayland/Xorg, display managers, kernels, HWE/OEM kernels, graphics drivers, PipeWire/audio, Bluetooth, Wi-Fi, printing, power, UI customization, extensions/plugins, desktop security, updates, release upgrades, and guarded troubleshooting.
- Chunked Ubuntu Desktop reference files under `skills/ubuntu-desktop-expert/chunks/` so future updates can target one category at a time instead of rewriting the main skill.
- `universal-contract-guardian-expert` — shared guardrail skill for creating, updating, auditing, and executing skills or implementation plans under the Universal Skill Execution Contract.
- `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` — repository-wide 8-rule execution contract for security/facts checks, rollback, self-correction, architecture fit, final architecture audit, backup/disaster planning, guarded rollback, and token-optimized bounded execution.
- `hooks/validate-universal-contract.sh` — validation hook that checks the contract document, router references, required output fields, and direct per-skill contract coverage gaps.
- `optimization-guardian-expert` — mandatory over-optimization guardrail for tuning, optimization, sysctl changes, kernel/network/storage/database/web/PHP-FPM/Redis/Postfix/container/Kubernetes tuning, limits, workers, queues, buffers, throughput, latency, and capacity changes.
- `nagios-core-expert` — Nagios Core community edition specialist for host/service objects, plugins, NRPE/NCPA/passive checks, notifications, CGI auth, external commands, performance data, retention, and safe config verification.
- `observium-ce-expert` — Observium Community Edition specialist for SNMP device onboarding, `add_device.php`, poller-wrapper, discovery, RRD/rrdcached, cron, MySQL/PHP, web UI, graphs, and CE-safe troubleshooting.
- `linux-proxy-expert` — Linux proxy specialist for Squid, Tinyproxy, Dante SOCKS, HTTP/HTTPS CONNECT, package-manager proxy config, systemd service proxy environment, Docker/Podman proxy settings, ACL/auth, TLS CA trust, firewall/NAT, transparent proxy safety boundaries, and IPv4/IPv6 binding issues.

## Updated

- `.claude-plugin/plugin.json` — aligned to `1.17.51` and 113 skills with Ubuntu Desktop keywords.
- `package.json` — aligned to version `1.17.51` and 113 expert skills.
- `README.md` — added Ubuntu Desktop expert documentation and aligned version metadata.
- `site/assets/js/monitoring-ce.js`, `site/assets/js/copy.js`, and `site/assets/data/latest-update.json` still need a follow-up website metadata refresh if the next validation flags them.

## Reviewed

- Ubuntu official release-cycle and security sources for LTS/interim release behavior, Ubuntu Pro/ESM, and current security-maintenance policy.
- Fedora official spins page for planned follow-up Fedora Desktop expert coverage.
- Existing skill set for desktop coverage. RDP/XRDP coverage existed, but there was no dedicated Ubuntu Desktop skill for local UI/session/kernel/driver/security/update workflows, so `ubuntu-desktop-expert` was added.

## Follow-up

- Add `fedora-desktop-expert` with the same chunked category model. The connector blocked new Fedora file creation during this run, so it remains a safe follow-up.
- Add repo-level `CLAUDE.md`, `AGENTS.md`, and `docs/SECURITY_PATCH_REFRESH_POLICY.md` context files for Claude/Codex first-run memory behavior. The hourly Linux Skill Watch automation has already been updated to load them when present.
- Add explicit diagnose-router routing for `/linux-admin:ubuntu-desktop-expert`; a direct router file update was blocked during this run.

## Install

```bash
# npx (fastest)
npx github:rushikeshsakharleofficial/we-are-linux-administrators

# npm global
npm install -g linux-admin
linux-admin

# marketplace
claude plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
claude plugin install linux-admin@we-are-linux-administrators
```

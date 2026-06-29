# Release 1.17.39

## Package

- NPM package version: `1.17.39`
- Plugin metadata version: `1.17.39`
- Skill count: `112`
- Package name: `linux-admin`

## Added

- `universal-contract-guardian-expert` — shared guardrail skill for creating, updating, auditing, and executing skills or implementation plans under the Universal Skill Execution Contract.
- `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` — repository-wide 8-rule execution contract for security/facts checks, rollback, self-correction, architecture fit, final architecture audit, backup/disaster planning, guarded rollback, and token-optimized bounded execution.
- `hooks/validate-universal-contract.sh` — validation hook that checks the contract document, router references, required output fields, and direct per-skill contract coverage gaps.
- `optimization-guardian-expert` — mandatory over-optimization guardrail for tuning, optimization, sysctl changes, kernel/network/storage/database/web/PHP-FPM/Redis/Postfix/container/Kubernetes tuning, limits, workers, queues, buffers, throughput, latency, and capacity changes.
- `nagios-core-expert` — Nagios Core community edition specialist for host/service objects, plugins, NRPE/NCPA/passive checks, notifications, CGI auth, external commands, performance data, retention, and safe config verification.
- `observium-ce-expert` — Observium Community Edition specialist for SNMP device onboarding, `add_device.php`, poller-wrapper, discovery, RRD/rrdcached, cron, MySQL/PHP, web UI, graphs, and CE-safe troubleshooting.
- `linux-proxy-expert` — Linux proxy specialist for Squid, Tinyproxy, Dante SOCKS, HTTP/HTTPS CONNECT, package-manager proxy config, systemd service proxy environment, Docker/Podman proxy settings, ACL/auth, TLS CA trust, firewall/NAT, transparent proxy safety boundaries, and IPv4/IPv6 binding issues.

## Updated

- `.claude-plugin/plugin.json` — aligned to `1.17.39` and 112 skills with universal contract, optimization, monitoring, Nagios, Observium, and proxy keywords.
- `package.json` — aligned to version `1.17.39` and 112 expert skills.
- `README.md` — added Universal Skill Execution Contract and guardian skill documentation.
- `skills/diagnose/SKILL.md` — now references the Universal Skill Execution Contract, includes the 8 mandatory rules, and keeps mandatory route to `/linux-admin:optimization-guardian-expert` for optimization/tuning requests.
- `site/assets/js/monitoring-ce.js` — added website count/card updates for Nagios Core, Observium CE, and Optimization Guardian.
- `site/assets/js/copy.js` — cache-busted the monitoring/optimization website update loader.
- `site/assets/data/latest-update.json` — updated release popup for Optimization Guardian.

## Reviewed

- Existing skill set for Universal Skill Execution Contract enforcement. Router-level enforcement, a guardian skill, and a validation hook were added immediately; direct per-skill expansion remains tracked as follow-up because bulk-editing all skills in one run is large and riskier.
- Existing skill set for duplicate proxy coverage. No dedicated Linux forward/SOCKS/client proxy skill was found, so a separate `linux-proxy-expert` skill was added instead of overloading `nginx-proxy-expert` or load-balancer specialists.
- Existing skill set for monitoring coverage. No dedicated Nagios Core or Observium CE skills were found, so separate community-edition focused skills were added.
- Optimization request flow needed a guardrail skill because optimization/tuning requests can cause production instability when done without baseline evidence, bottleneck proof, rollback, and monitoring.

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

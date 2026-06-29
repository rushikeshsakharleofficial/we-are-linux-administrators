# Release 1.17.28

## Package

- NPM package version: `1.17.28`
- Plugin metadata version: `1.17.28`
- Skill count: `108`
- Package name: `linux-admin`

## Added

- `linux-proxy-expert` — Linux proxy specialist for Squid, Tinyproxy, Dante SOCKS, HTTP/HTTPS CONNECT, package-manager proxy config, systemd service proxy environment, Docker/Podman proxy settings, ACL/auth, TLS CA trust, firewall/NAT, transparent proxy safety boundaries, and IPv4/IPv6 binding issues.

## Updated

- `.claude-plugin/plugin.json` — registered Linux proxy keywords and aligned to 108 skills.
- `package.json` — aligned to version `1.17.28` and 108 expert skills.
- `README.md` — added Linux proxy expert section and updated count/version.
- `site/assets/js/main.js` — updated website runtime count and added `/linux-admin:linux-proxy-expert` dynamic skill card.
- `site/assets/js/kpi-3d.js` — updated homepage KPI count to 108.
- `site/assets/data/latest-update.json` — updated release popup for Linux proxy expert.

## Reviewed

- Existing skill set for duplicate proxy coverage. No dedicated Linux forward/SOCKS/client proxy skill was found, so a separate `linux-proxy-expert` skill was added instead of overloading `nginx-proxy-expert` or load-balancer specialists.

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

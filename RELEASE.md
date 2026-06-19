# Release 1.17.21

## Package

- NPM package version: `1.17.21`
- Skill count: `107`
- Package name: `linux-admin`

## Added

- `rdp-expert` — Linux RDP/XRDP expert for GNOME, KDE Plasma, XFCE, MATE, Cinnamon, LXQt, Xorg/Wayland, PAM, Polkit, clipboard, audio, firewall, black screen, reconnect, and multi-user remote desktop troubleshooting
- `load-balancer-expert` router and recommendation skill
- `nginx-proxy-expert`
- `f5-expert`
- `lvs-ipvs-expert`
- `keepalived-expert`
- `dns-gslb-expert`
- `cloud-lb-expert`
- `security-expert` — defensive Linux security validation router using incident-driven model
- `security-expert-audit` bin script — read-only security audit helper
- `docs/security-expert/security-score-model.md` — scoring model for security posture
- `docs/security-expert/strategies.md` — security strategy model
- `templates/security-audit-report.md` — sanitized audit report template
- `templates/security-feedback-draft.md` — GitHub feedback draft template
- `skillfish.json` manifest for skill.fish registry
- `.npmignore` — trims npm package to 4.8 kB (bin + README + LICENSE only)

## Updated

- `package.json` aligned to version `1.17.21` and 107 expert skills
- `.claude-plugin/plugin.json` aligned to version `1.17.21` and 107 task-specific skills
- Website runtime copy and skills grid updated for `/linux-admin:rdp-expert`
- Website release popup manifest updated for the RDP expert release
- `README.md` updated with RDP expert section and 107-skill count
- `docs/USAGE.md` — npm global and skillfish install options
- `site/security.html` — refreshed for security expert skill

## Install

```bash
# npx (fastest)
npx github:rushikeshsakharleofficial/we-are-linux-administrators

# npm global
npm install -g linux-admin
linux-admin

# skillfish
npx skillfish@latest add rushikeshsakharleofficial/we-are-linux-administrators

# marketplace
claude plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
claude plugin install linux-admin@we-are-linux-administrators
```

## Publishing

Workflow `.github/workflows/npm-publish.yml` publishes to npm on GitHub Release or manual dispatch.

Required secret: `NPM_TOKEN` with publish permission for `linux-admin`.

# Release 1.17.18

## Package

- NPM package version: `1.17.18`
- Skill count: `106`
- Package name: `linux-admin`

## Added

- `security-expert` — defensive Linux security validation router using incident-driven model
- `security-expert-audit` bin script — read-only security audit helper
- `docs/security-expert/security-score-model.md` — scoring model for security posture
- `docs/security-expert/strategies.md` — security strategy model
- `templates/security-audit-report.md` — sanitized audit report template
- `templates/security-feedback-draft.md` — GitHub feedback draft template
- `load-balancer-expert` router and recommendation skill
- `nginx-proxy-expert`
- `f5-expert`
- `lvs-ipvs-expert`
- `keepalived-expert`
- `dns-gslb-expert`
- `cloud-lb-expert`
- `skillfish.json` manifest for skill.fish registry
- `.npmignore` — trims npm package to 4.8 kB (bin + README + LICENSE only)

## Updated

- `package.json` `files` field — publish-ready slim package
- Website `install.html` — six install methods (npx, npm global, skillfish, marketplace, slash, clone)
- Website `index.html` — npm global and skillfish install blocks added
- `README.md` — npm global and skillfish in Quick Start; security expert section added
- `docs/USAGE.md` — npm global and skillfish install options
- `site/security.html` — refreshed for security expert skill
- Plugin metadata aligned to 106 expert skills

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

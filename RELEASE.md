# Release 1.17.74

## Package

- NPM package version: `1.17.74`
- Plugin metadata version: `1.17.74`
- Skill count: `102`
- Package name: `linux-admin`

## Added

- `using-linux-admin` — master parent/micro-skill routing map that selects the smallest relevant specialist skill without duplicating troubleshooting content.

## Updated

- `linux-admin-chief-engineer` now reads `using-linux-admin` before specialist execution.
- Repository metadata and website release surfaces are aligned to `1.17.74` and `102` skills.
- Maintained agent surfaces and the canonical portability model are unchanged.

## Install

```bash
npx github:rushikeshsakharleofficial/we-are-linux-administrators
npm install -g linux-admin
linux-admin
```

## Codex CLI

```bash
npm install -g @openai/codex
codex
/plugins
```

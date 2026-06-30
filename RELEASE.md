# Release 1.17.62

## Package

- NPM package version: `1.17.62`
- Plugin metadata version: `1.17.62`
- Skill count: `95`
- Package name: `linux-admin`

## Fixed

- Regenerated `docs/EXPERT_MODULE_INDEX.md` from the current on-disk skill set.
- Aligned README badges, terminal preview, package metadata, plugin metadata, and website update metadata around `1.17.62` and `95` skills.
- Added missing `bin/*-audit` wrappers that execute their matching `scripts/*-audit.py` files.
- Fixed validation tests so the unified plugin, sysctl expert, and networking expert checks match the current repository layout.

## Updated

- `README.md` — aligned version and skill count to `1.17.62` / `95`.
- `package.json` — aligned to `1.17.62` and 95-skill description.
- `.claude-plugin/plugin.json` — aligned description and version to the current 95-skill repository state.
- `.claude-plugin/marketplace.json` — aligned marketplace metadata to `1.17.62` and 95 skills.
- `site/assets/data/latest-update.json` — aligned website release popup to `1.17.62` and 95 skills.
- `AGENTS.md` — restored a portable, self-contained agent entry point instead of relying on local `.agent` files.

## Existing highlights

- `ubuntu-desktop-expert` — Ubuntu Desktop specialist with chunked Ubuntu Desktop reference files.
- `fedora-desktop-expert` — Fedora Desktop specialist with chunked Fedora Desktop reference files.
- `docs/SECURITY_PATCH_REFRESH_POLICY.md` — repo-level first-run context for OS-specific security patch refresh behavior.
- `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` — shared safety and rollback-aware execution contract.

## Install

```bash
npx github:rushikeshsakharleofficial/we-are-linux-administrators
npm install -g linux-admin
linux-admin
```

## Codex CLI

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
codex
/plugins
```

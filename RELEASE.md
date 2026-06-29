# Release 1.17.56

## Package

- NPM package version: `1.17.56`
- Plugin metadata version: `1.17.56`
- Skill count: `114`
- Package name: `linux-admin`

## Added

- README now includes explicit **Install/use linux-admin with Codex** instructions.
- README documents three Codex paths:
  - use as a project instruction pack with `AGENTS.md`
  - install from Codex app/CLI plugin directory when `linux-admin` is published/shared as a Codex plugin source
  - vendor/submodule into another repo for Codex workflows
- `docs/CODEX_USAGE.md` now includes the same Codex plugin installation paths and examples.

## Updated

- `package.json` — aligned to `1.17.56` and added `codex-plugin` keyword.
- `.claude-plugin/plugin.json` — aligned to `1.17.56`.
- README Codex section now explains `/plugins`, `Add to Codex`, `Install plugin`, and `@linux-admin` usage where supported.

## Existing highlights

- `ubuntu-desktop-expert` — Ubuntu Desktop specialist with chunked Ubuntu Desktop reference files.
- `fedora-desktop-expert` — Fedora Desktop specialist with chunked Fedora Desktop reference files.
- `docs/SECURITY_PATCH_REFRESH_POLICY.md` — repo-level first-run context for OS-specific security patch refresh behavior.
- `CLAUDE.md` and `AGENTS.md` — repo-level agent context.

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

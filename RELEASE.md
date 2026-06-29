# Release 1.17.55

## Package

- NPM package version: `1.17.55`
- Plugin metadata version: `1.17.55`
- Skill count: `114`
- Package name: `linux-admin`

## Added

- `docs/CODEX_USAGE.md` — Codex app, Codex CLI, Codex IDE extension, Codex Web/GitHub task, `/init`, and AGENTS.md workflow guide.
- First-class Codex sections in `README.md`, including Codex installation, Codex task prompts, Codex architecture flow, and Codex usage examples.

## Updated

- `AGENTS.md` — expanded as the primary Codex instruction file with scoped-task format, validation expectations, and OS patch policy reminders.
- `.claude-plugin/plugin.json` — aligned to `1.17.55` and updated to describe Claude Code, Codex, and agent-based ops tool support.
- `package.json` — aligned to version `1.17.55` with Codex/AGENTS.md keywords.
- `README.md` — no longer presents the repo as Claude-specific only; Codex is documented as a first-class workflow.
- `site/assets/data/latest-update.json` — updated release popup for Codex support.

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
```

# Release 1.17.53

## Package

- NPM package version: `1.17.53`
- Plugin metadata version: `1.17.53`
- Skill count: `114`
- Package name: `linux-admin`

## Added

- `fedora-desktop-expert` — Fedora Desktop specialist for Fedora Workstation GNOME, Fedora KDE Plasma Edition, Fedora Spins, Atomic Desktops, Labs, Wayland/Xorg, display managers, kernels, graphics, audio, networking, printing, power, UI customization, extensions/plugins, SELinux, updates, release upgrades, and safe desktop troubleshooting.
- Chunked Fedora Desktop reference files under `skills/fedora-desktop-expert/chunks/` so future updates can target one category at a time.
- `docs/SECURITY_PATCH_REFRESH_POLICY.md` — repo-level first-run context for OS-specific security patch refresh behavior.
- `CLAUDE.md` and `AGENTS.md` — repo-level agent context so Claude Code and Codex can load project rules on first run.
- `ubuntu-desktop-expert` — Ubuntu Desktop specialist with chunked Ubuntu Desktop reference files.

## Updated

- `.claude-plugin/plugin.json` — aligned to `1.17.53` and 114 skills with Ubuntu/Fedora Desktop keywords.
- `package.json` — aligned to version `1.17.53` and 114 expert skills.
- `README.md` — added Fedora Desktop expert documentation and aligned version metadata.
- Linux Skill Watch automation prompt checks OS-specific security patch sources and loads repo-level context files when present.

## Install

```bash
npx github:rushikeshsakharleofficial/we-are-linux-administrators
npm install -g linux-admin
linux-admin
```

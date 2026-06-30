---
name: shell-rc-expert
description: Review and fix Bash and Zsh user startup configuration safely — startup order, aliases, functions, PATH, prompt/plugin loading, interactive vs login behavior, slow terminal startup, and safe rollback.
argument-hint: "[bash|zsh] [symptom: slow startup|alias not found|PATH wrong|prompt broken]"
effort: medium
allowed-tools: "Read Grep Glob Bash"
---
# shell-rc-expert

Use this skill to review Bash or Zsh user startup configuration safely.

## Startup file order

**Bash:**
- Login shell: `/etc/profile` → `~/.bash_profile` (or `~/.bash_login`, `~/.profile`)
- Interactive non-login: `~/.bashrc`
- Non-interactive: `$BASH_ENV` only

**Zsh:**
- Always: `~/.zshenv` (keep minimal — no output, no PATH bloat)
- Login: `~/.zprofile` → `~/.zshrc` → `~/.zlogin`
- Logout: `~/.zlogout`
- Interactive config belongs in `~/.zshrc`

## Focus areas

- startup order and which file is actually sourced
- aliases and functions
- PATH handling (idempotent, no duplicates)
- prompt and plugin loading (Zsh: oh-my-zsh, starship, powerlevel10k)
- interactive vs non-interactive / login vs non-login behavior
- slow terminal startup
- recursive loading / circular sourcing
- safe rollback

## Rules

- keep `~/.zshenv` minimal; never put output or interactive-only logic there
- guard interactive-only logic: `[[ $- == *i* ]] || return`
- keep PATH changes idempotent (check before appending)
- avoid recursive loading (`source ~/.bashrc` inside `.bashrc`)
- back up before editing: `cp ~/.bashrc ~/.bashrc.bak.$(date +%F)`
- test in a new terminal before closing the current one

## Output

1. issue summary
2. likely startup file involved
3. safe fix
4. rollback
5. test steps

---
name: shell-rc-expert
description: Review and fix Bash and Zsh user startup configuration safely — startup order, aliases, functions, PATH, prompt/plugin loading, interactive vs login behavior, slow terminal startup, and safe rollback.
argument-hint: "[bash|zsh] [symptom: slow startup|alias not found|PATH wrong|prompt broken]"
effort: medium
allowed-tools: "Read Grep Glob Bash"
---
# shell-rc-expert

Use this skill to review Bash or Zsh user startup configuration safely.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Start with bounded read-only evidence and confirm the actual shell plus login/interactive mode before editing. Preserve the affected startup files, protect the current working shell or remote session, define rollback before PATH/prompt/plugin changes, test the new configuration in a separate shell, and keep the current session open until validation succeeds.

For remote systems, treat shell startup changes as an access-risk change: avoid global startup-file edits unless required, keep an existing session open, prefer a second validation session, and use a guarded/manual rollback path when a bad PATH, command, prompt plugin, or unconditional `exit`/`return` could prevent login or command execution.

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
3. security/access-risk check
4. backup and safe fix
5. rollback
6. test steps in a separate shell/session

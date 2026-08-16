@AGENTS.md

# Claude Code-specific linux-admin instructions

Claude Code is a maintained native plugin surface for this repository.

- Package/plugin name: `linux-admin`.
- Plugin metadata lives under `.claude-plugin/`.
- Canonical Linux procedures live under `skills/`; do not duplicate them into `.claude/skills/` inside this repository.
- Use `skills/using-linux-admin/SKILL.md` as the canonical routing map when the specialist is unclear.
- For a user-wide installation outside this repository, `linux-admin install-global` installs the canonical skills into `~/.claude/skills` as well as the cross-agent `~/.agents/skills` location.
- Machine-local Claude state such as `.claude/state/`, command history, auto-memory, and `CLAUDE.local.md` must not be committed.
- Do not claim this repository is installed in Claude Code until the plugin install has actually succeeded.
- Keep consequential terminal/file changes behind the repository safety contract and the user's approval model.

Detailed local/global paths: `docs/LOCAL_GLOBAL_AGENT_SETUP.md`.

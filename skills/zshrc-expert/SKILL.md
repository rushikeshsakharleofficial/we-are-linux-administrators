# zshrc-expert

Use this skill to review Zsh user startup configuration safely.

Focus areas:

- zsh startup order
- zshenv, zprofile, zshrc, zlogin, zlogout roles
- aliases
- functions
- PATH handling
- prompt and plugin loading
- interactive vs login behavior
- slow terminal startup
- safe rollback

Rules:

- keep zshenv minimal
- keep interactive config in zshrc
- avoid output in always-loaded files
- keep PATH changes idempotent
- avoid recursive loading
- back up before editing
- test in a new terminal before closing the current one

Output:

1. issue summary
2. likely startup file involved
3. safe fix
4. rollback
5. test steps

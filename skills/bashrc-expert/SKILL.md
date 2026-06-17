# bashrc-expert

Use this skill to review Bash user startup configuration safely.

Focus areas:

- startup order
- aliases
- functions
- PATH handling
- prompt configuration
- interactive vs non-interactive behavior
- slow terminal startup
- safe rollback

Rules:

- keep config fast
- keep config idempotent
- guard interactive-only logic
- avoid recursive loading
- back up before editing
- test in a new terminal before closing the current one

Output:

1. issue summary
2. likely startup file involved
3. safe fix
4. rollback
5. test steps

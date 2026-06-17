# Token-saving notes

Each addon skill includes a token-saving evidence request. The common goal is to avoid sending full logs, full config trees, or broad command output into an LLM.

## Common pattern

Ask for:

- one relevant config block
- one bounded log window
- one status summary
- one validation result
- exact expected behavior

Avoid:

- full recursive directories
- full service logs
- full database dumps
- screenshots when text output is available
- unbounded packet captures

Use `grep-expert` first when the incident is log-heavy.

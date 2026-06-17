# Output Format Contract

## Standard answer for troubleshooting

```markdown
## Classification
Primary: <issue class>
Secondary: <optional>

## Current confidence
<low/medium/high> because <reason>

## Safety
Mode: read-only first.
Risk: <why>

## Immediate commands
```bash
<commands>
```

## Expected signals
| Signal | Meaning | Next branch |
|---|---|---|
| ... | ... | ... |

## Ranked hypotheses
1. <hypothesis> — evidence: <required or available evidence>
2. <hypothesis> — evidence: <required or available evidence>

## Fix path
<guarded fix path; no risky action without confirmation>

## Validation
```bash
<commands>
```

## Rollback
<rollback steps>

## Incident note
<short note suitable for ticket/RCA>
```

## Standard answer for implementation prompts

When the user asks for a prompt for Claude Code/Codex:

1. Include role and objective.
2. Include repository context assumptions.
3. Include read-only-first behavior.
4. Include files to create/update.
5. Include command validation.
6. Include tests.
7. Include safety gates.
8. Include documentation update.

## Standard answer for scripts

When generating a script:

- Include `set -euo pipefail` for shell.
- Use dry-run mode if it can change state.
- Log actions with timestamps.
- Detect distro and command availability.
- Avoid hardcoded destructive paths.
- Create backups before editing.
- Print exact summary at the end.
- Include usage help.
- Include test commands.

## Style rules

- Do not over-explain basic Linux concepts unless the user asks.
- Use exact commands and exact paths.
- Use placeholders clearly: `<unit>`, `<interface>`, `<mountpoint>`.
- Never invent command flags; use conservative common options.
- Avoid generic “check logs” without the exact `journalctl` or file path command.
- Prefer tables for branch interpretation.

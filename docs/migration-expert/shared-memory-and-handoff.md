# Shared memory and handoff

## Required shared files

Each migration uses `.migration/` files as durable memory.

- `00-scenario.md`: scope, constraints, downtime, owners, systems.
- `01-inventory.md`: current state.
- `02-dependency-map.md`: service/data/network dependencies.
- `03-risk-register.md`: ranked risks, blockers, mitigations.
- `04-agent-dispatch.md`: agent names, tasks, inputs, outputs.
- `05-runbook.md`: final ordered plan.
- `06-validation-matrix.md`: checks, commands, expected results.
- `07-rollback-plan.md`: exact backout and trigger conditions.
- `08-cutover-checklist.md`: timed steps, owner, status.
- `09-post-migration-observation.md`: metrics and follow-up.

## Memory rules

- Append findings with timestamp/agent name.
- Do not overwrite other agents' findings.
- Mark assumptions explicitly.
- Link every risky recommendation to evidence.
- Orchestrator writes final decisions in `decisions/ADR-*.md`.

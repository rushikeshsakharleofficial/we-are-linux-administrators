# Migration Agent Dispatch

## Shared memory path

`.migration/`

## Agents

| Agent | Purpose | Writes to |
|---|---|---|
| migration-orchestrator | final plan and gates | `05-runbook.md`, ADRs |
| migration-inventory | read-only system inventory | `01-inventory.md` |
| migration-risk | blockers and rollback gaps | `03-risk-register.md` |
| migration-domain | OS/DB/SFTP/firewall/patch-specific plan | `05-runbook.md` section |
| migration-validation | checks and success criteria | `06-validation-matrix.md` |
| migration-rollback | rollback runbook | `07-rollback-plan.md` |
| migration-research | version-specific internet/manpage research | `decisions/ADR-*.md` |

## Dispatch prompts

Paste one task per agent. Each agent must append only to its assigned file.

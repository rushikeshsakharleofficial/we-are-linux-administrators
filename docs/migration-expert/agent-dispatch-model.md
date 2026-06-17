# Agent dispatch model

## Orchestrator responsibilities

The orchestrator owns the final plan. Other agents produce evidence and recommendations; they do not make final go/no-go decisions.

## Agent boundaries

| Agent | May do | Must not do |
|---|---|---|
| Inventory | read-only discovery | change config |
| Dependency | draw graphs and map dependencies | assume unknown service owners |
| Risk | identify blockers and rollback gaps | ignore business impact |
| Domain | build OS/DB/SFTP/firewall plan | skip validation |
| Validation | define tests and success criteria | execute risky changes |
| Rollback | define backout path | depend on untested backups |
| Research | gather version-specific evidence | cite weak sources as certain |

## Dispatch sequence

1. Orchestrator writes `.migration/00-scenario.md`.
2. Inventory and research can run in parallel.
3. Dependency and risk begin after inventory has initial findings.
4. Domain agent drafts technical migration plan.
5. Validation and rollback agents review independently.
6. Orchestrator merges all findings and resolves conflicts.

## Conflict resolution

When agents disagree, prefer:

1. Direct production evidence.
2. Vendor docs for exact version.
3. Reproducible lab test.
4. Man pages/source docs.
5. Community consensus with explicit uncertainty.

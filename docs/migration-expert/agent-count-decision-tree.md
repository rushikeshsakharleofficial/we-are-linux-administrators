# Agent count decision tree

## Inputs

- Number of servers.
- Number of services.
- Data-bearing or stateless.
- Downtime tolerance.
- Remote access risk.
- DB/storage/firewall involvement.
- Compliance/security impact.
- Reversibility.
- Need for internet research.

## Recommended counts

| Situation | Count | Agents |
|---|---:|---|
| single non-prod service | 1 | orchestrator |
| simple prod service | 2 | orchestrator, validation/risk |
| one server with data | 3 | inventory, domain, validation/rollback |
| DB or SFTP migration | 5 | orchestrator, inventory, data/domain, risk, validation/rollback |
| OS major upgrade | 5 | orchestrator, inventory, OS/repo, risk, validation/rollback |
| firewall/rate-limit migration | 5 | orchestrator, firewall inventory, access-risk, validation, rollback |
| fleet patching | 7 | orchestrator, inventory, batch planner, package/repo, risk, observability, rollback |
| multi-region/cross-cloud | 9 | add network/DNS/LB and data-reconciliation agents |

## Anti-patterns

- 12 agents for a single config edit.
- No rollback agent for production.
- Same agent writing plan and validating it.
- Agents using private notes instead of shared `.migration/` files.

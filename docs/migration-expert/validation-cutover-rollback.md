# Validation, cutover, and rollback

## Validation matrix fields

```text
Check name:
Command/test:
Expected result:
Owner:
When: pre / during / post
Rollback trigger:
Evidence file/log:
```

## Cutover gates

- inventory complete
- backups completed and restore-tested
- rollback feasible inside agreed window
- monitoring baseline captured
- stakeholders notified
- maintenance window active
- validation owner available
- console/OOB access confirmed

## Rollback plan

Rollback must include:

- exact trigger conditions
- decision deadline
- technical reversal steps
- data reconciliation strategy
- DNS/LB/firewall reversal
- database write-split handling
- user/customer communication
- post-rollback validation

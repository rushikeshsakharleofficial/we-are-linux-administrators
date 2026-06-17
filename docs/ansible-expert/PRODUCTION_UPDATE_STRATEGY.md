# ansible-expert production update strategy

## Goal

Update and upgrade Linux packages safely across production servers.

## Required inputs

- OS family and version
- package manager
- server role
- maintenance window
- backup status
- app owner
- patch group
- reboot policy
- package holds/version locks

## Safe flow

1. collect pending update summary
2. classify security vs routine updates
3. check locks and repository health
4. validate backups
5. patch canary host first
6. validate service health
7. continue with serial batches
8. detect reboot requirement
9. document exceptions

## Rollout controls

Use small batches for critical systems. Use serial for production. Use limit for exact group targeting. Avoid whole-fleet upgrades unless risk is low and reviewed.

## Rollback

Plan package rollback, config restore, service rollback, and snapshot restore where available. Record any package that cannot be safely downgraded.

## Validation

Validate package status, service state, application health, logs, and monitoring after each batch.

# rollback-expert

Use this skill for Linux rollback planning, recovery points, reverse steps, backup checks, service restore, config restore, and rollback decision criteria.

## Purpose

Make every risky change reversible before execution.

## Evidence first

Ask for change scope, files/packages/services touched, backup state, previous known-good config, and validation failure condition.

## Safe workflow

1. identify reversible and non-reversible parts
2. define rollback trigger
3. verify backups or snapshots
4. write reverse steps
5. validate rollback in a safe scope when possible
6. define post-rollback checks

## Anti-patterns

- starting change without rollback
- assuming package downgrade is safe
- overwriting configs without preserving originals
- no validation after rollback

## Output format

Return rollback trigger, backup point, reverse steps, validation, risk, and escalation.

## Token-saving tip

Ask for touched files, services, and package list only.

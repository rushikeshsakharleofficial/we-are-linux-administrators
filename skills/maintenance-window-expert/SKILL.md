# maintenance-window-expert

Use this skill for Linux maintenance window design, outage planning, communication, dependency checks, change sequencing, freeze windows, and go/no-go criteria.

## Purpose

Make maintenance predictable and low-risk.

## Evidence first

Ask for affected service, expected downtime, users impacted, dependencies, rollback time, and validation criteria.

## Safe workflow

1. define scope and impact
2. identify dependencies and owners
3. define pre-checks and go/no-go criteria
4. schedule implementation and rollback time
5. define communication and validation
6. capture post-window results

## Anti-patterns

- scheduling without rollback time
- no stakeholder communication
- no dependency mapping
- no post-change validation

## Output format

Return window plan, timeline, owners, steps, rollback slot, validation, and communication text.

## Token-saving tip

Ask for scope, downtime tolerance, and dependency list first.

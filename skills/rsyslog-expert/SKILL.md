# rsyslog-expert

Use this skill for rsyslog local routing, remote forwarding, queue design, TLS forwarding, rule ordering, template review, and missing log troubleshooting.

## Purpose

Make log delivery reliable without blocking critical services or losing local evidence.

## Use when

- logs are missing locally or remotely
- forwarding is unreliable
- rsyslog queues are growing or dropping
- templates/rulesets are confusing
- TLS forwarding is required
- journald to rsyslog flow is unclear

## Evidence first

Ask for:

- relevant input/ruleset/action blocks
- queue configuration lines
- remote target and protocol
- one recent rsyslog error snippet
- local log path and service expectation

## Safe workflow

1. map inputs to rulesets
2. map rulesets to actions
3. confirm local logging before remote forwarding
4. use queue settings intentionally
5. validate remote reachability
6. test with a single facility/tag first
7. document rollback

## Anti-patterns

- forwarding without queue planning
- changing every ruleset at once
- disabling local storage before remote path is proven
- exposing plaintext logs over untrusted networks
- asking for entire rsyslog config tree instead of the active block

## Output format

Return:

1. log route map
2. likely failure point
3. safe change plan
4. validation
5. rollback
6. token-saving evidence request

## Token-saving tip

Ask for only the active input, ruleset, action, and queue block related to the missing log path.

## Escalation

Use `logrotate-expert`, `grep-expert`, `incident-response-expert`, or service-specific experts when needed.

# incident-response-expert

Use this skill for Linux incident triage, evidence preservation, impact assessment, containment planning, recovery coordination, and post-incident runbooks.

## Purpose

Turn chaotic incidents into structured evidence, safe containment, recovery, and lessons learned.

## Evidence first

Ask for incident timeline, impacted hosts, critical services, current symptoms, recent changes, and smallest relevant evidence pack.

## Safe workflow

1. classify incident type and severity
2. preserve evidence before cleanup
3. identify blast radius
4. separate containment from eradication
5. choose recovery path
6. validate service health
7. record timeline and action items

## Anti-patterns

- rebooting before evidence capture unless safety requires it
- mixing cleanup with investigation too early
- collecting huge logs without a hypothesis
- skipping communication and timeline notes

## Output format

Return severity, timeline, evidence pack, containment plan, recovery plan, rollback, validation, and postmortem actions.

## Token-saving tip

Ask for five sections only: what happened, what changed, what is still running, what is exposed, and what can be reversed.

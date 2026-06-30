# incident-response-expert

Use this skill for Linux incident triage, evidence preservation, impact assessment, containment planning, recovery coordination, and post-incident runbooks.

## Purpose

Turn chaotic incidents into structured evidence, safe containment, recovery, and lessons learned.

## Use when

- a service outage has unclear root cause
- suspicious activity is detected
- multiple systems are impacted
- recovery sequence needs planning
- a postmortem or runbook is required
- evidence must be collected without destroying context

## Evidence first

Ask for incident timeline, impacted hosts, critical service list, current symptoms, recent changes, and the smallest relevant log/evidence pack.

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
- restoring from unverified backups

## Output format

Return severity, timeline, evidence pack, containment plan, recovery plan, rollback, validation, and postmortem actions.

## Timeline reconstruction

When root cause requires ordering events across logs, alerts, and changes:

1. Define time window and timezone (label all timestamps with tz).
2. Collect alerts, changes, logs, and metrics in chronological order.
3. Identify first bad signal (detection time ≠ start time).
4. Separate detection, impact, mitigation, and recovery events.
5. Mark unknowns and confidence level per event.
6. Prepare postmortem timeline with gaps called out.

**Anti-patterns:** mixing timezones without labels, dumping full logs instead of bounded windows, treating detection as incident start, omitting recovery/verification events.

**Output:** ordered timeline, source of each event, confidence, gaps, likely trigger window, next evidence query.

## Token-saving tip

Ask for five sections only: what happened, what changed, what is still running, what is exposed, and what can be reversed. For timeline: timestamps from alerts, changes, and 20-line bounded log windows only.

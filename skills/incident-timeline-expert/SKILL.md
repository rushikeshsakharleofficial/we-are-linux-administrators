# incident-timeline-expert

Use this skill for Linux incident timeline reconstruction, log/metric/change correlation, event ordering, impact windows, and postmortem evidence preparation.

## Purpose

Build a clear incident timeline from small, bounded evidence sources.

## Evidence first

Ask for incident start/end guess, impacted service, recent changes, bounded logs, alert timestamps, and recovery actions.

## Safe workflow

1. define time window and timezone
2. collect alerts, changes, logs, and metrics in order
3. identify first bad signal
4. separate detection, impact, mitigation, and recovery events
5. mark unknowns and confidence
6. prepare postmortem timeline

## Anti-patterns

- mixing multiple timezones without labels
- dumping full logs instead of bounded windows
- treating detection time as start time
- omitting recovery and verification events

## Output format

Return ordered timeline, source of each event, confidence, gaps, likely trigger window, and next evidence query.

## Token-saving tip

Ask for timestamps from alerts, changes, and 20-line bounded log windows only.

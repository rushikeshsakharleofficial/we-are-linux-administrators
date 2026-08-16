---
name: incident-response-expert
description: Linux incident response expert for triage, evidence preservation, impact assessment, containment planning, recovery coordination, timeline reconstruction, root-cause analysis, post-incident runbooks, and rollback-aware recovery.
argument-hint: "[Linux incident, outage, suspicious activity, containment, recovery, timeline, or RCA task]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# incident-response-expert

Use this skill for Linux incident triage, evidence preservation, impact assessment, containment planning, recovery coordination, timeline reconstruction, and post-containment root-cause analysis.

For formal incident-management artifacts in Word, Excel, PDF, or PowerPoint, route verified evidence to `incident-report-creator-expert` after triage/recovery/RCA facts are established.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` for security/facts checks, rollback planning, architecture fit, backup/disaster planning, guarded recovery, validation, and token-bounded output.

## Purpose

Turn chaotic incidents into structured evidence, safe containment, recovery, and evidence-backed lessons learned without mixing urgent response with premature root-cause claims.

## Use when

- a service outage has unclear cause
- suspicious activity is detected
- multiple systems are impacted
- recovery sequence needs planning
- a post-incident RCA or runbook is required
- evidence must be collected without destroying context

## Evidence first

Ask for incident timeline, impacted hosts, critical service list, current symptoms, recent changes, and the smallest relevant log/evidence pack.

## Condition -> chunk routing

| Proven condition / task phase | Load |
|---|---|
| Active outage, containment, evidence preservation, blast radius, or recovery | stay in this parent baseline |
| Post-containment causality, recurring failure, hypothesis testing, contributing factors, or RCA | `chunks/root-cause-analysis.md` |
| Formal PIR/RCA/management artifact in DOCX/XLSX/PDF/PPTX | `incident-report-creator-expert` after facts are verified |
| Cause still unclear during active impact | stay in parent; contain and preserve evidence before loading RCA |

Load only the RCA chunk when the condition is established. Reporting remains a separate specialist because artifact generation has a different tool and output surface.

## Safe workflow

1. classify incident type and severity
2. preserve evidence before cleanup
3. identify blast radius
4. separate containment from eradication
5. choose recovery path
6. validate service health
7. record timeline and action items
8. after containment, load `chunks/root-cause-analysis.md` when causal analysis is required
9. when a formal report is required, pass the verified incident dataset to `incident-report-creator-expert`

## Anti-patterns

- rebooting before evidence capture unless safety requires it
- mixing cleanup with investigation too early
- collecting huge logs without a hypothesis
- declaring root cause before causal evidence exists
- skipping communication and timeline notes
- restoring from unverified backups
- writing a polished report before facts, timeline, impact, and RCA status are verified

## Output format

During active response return severity, timeline, evidence pack, containment plan, recovery plan, rollback, validation, and post-incident actions.

For post-containment RCA load `chunks/root-cause-analysis.md` and follow its evidence/confidence output. When the user asks for `.docx`, `.xlsx`, `.pdf`, `.pptx`, a management report, PIR/RCA pack, or multi-format incident report, use `incident-report-creator-expert` as the reporting specialist.

## Timeline reconstruction

When investigation requires ordering events across logs, alerts, and changes:

1. Define time window and timezone; label all timestamps with timezone.
2. Collect alerts, changes, logs, and metrics in chronological order.
3. Identify first bad signal; detection time is not automatically start time.
4. Separate detection, impact, mitigation, and recovery events.
5. Mark unknowns and confidence level per event.
6. Prepare the post-incident timeline with gaps called out.

**Anti-patterns:** mixing timezones without labels, dumping full logs instead of bounded windows, treating detection as incident start, omitting recovery/verification events.

**Output:** ordered timeline, source of each event, confidence, gaps, likely trigger window, next evidence query.

## Token-saving tip

For active response ask for five sections only: what happened, what changed, what is still running, what is exposed, and what can be reversed. For RCA start with the bounded evidence specified in `chunks/root-cause-analysis.md`.

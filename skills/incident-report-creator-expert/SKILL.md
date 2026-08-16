---
name: incident-report-creator-expert
description: Creates structured incident management reports from verified incident evidence and exports the same canonical report into Word, Excel, PDF, or PowerPoint formats with table-first layouts, timelines, impact, RCA, actions, ownership, and follow-up tracking.
argument-hint: "[incident evidence or report request] [docx|xlsx|pdf|pptx|all]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# incident-report-creator-expert

Use this skill after incident facts are collected and the user needs a formal incident management report in Word, Excel, PDF, PowerPoint, or all four formats.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Never invent incident facts, owners, timestamps, impact, root cause, customer counts, financial loss, SLA data, or remediation status. Mark unknown values as `Unknown`, `Pending`, or `Not verified`.

## Core rule: one canonical dataset

Build one canonical incident dataset first, then render it into each requested format. Do not create four independent narratives that can drift from each other.

Use table-first reporting wherever practical.

## Canonical incident summary table

| Field | Value |
|---|---|
| Incident ID | |
| Title | |
| Severity / Priority | |
| Status | |
| Start time | |
| Detection time | |
| Mitigation time | |
| Recovery time | |
| End time | |
| Duration | |
| Timezone | |
| Services / systems affected | |
| Business impact | |
| Customer / user impact | |
| Incident commander | |
| Technical owner | |
| Communication owner | |
| Root cause status | Confirmed / Suspected / Pending |
| Final root cause | |
| Resolution summary | |
| Current risk | |
| Follow-up review date | |

## Required report tables

### Timeline

| Time | Event | Source / evidence | Owner | Confidence |
|---|---|---|---|---|

### Impact

| Impact area | Scope | Start | End | Duration | Evidence |
|---|---|---|---|---|---|

### Detection and response

| Stage | What happened | Time | Tool / signal | Owner | Gap identified |
|---|---|---|---|---|---|

### Root cause analysis

| Item | Finding | Evidence | Confidence | Status |
|---|---|---|---|---|
| Trigger | | | | |
| Technical root cause | | | | |
| Contributing factor | | | | |
| Why detection was late | | | | |
| Why recovery took time | | | | |

### Actions and ownership

| Action ID | Corrective / preventive action | Priority | Owner | Due date | Status | Validation / evidence |
|---|---|---|---|---|---|---|

### Communication record

| Time | Audience / channel | Message summary | Owner | Status |
|---|---|---|---|---|

### Lessons learned

| Category | What worked | What failed | Improvement |
|---|---|---|---|

## Report narrative sections

Keep prose short. Tables carry the detail.

1. Executive summary
2. Incident summary table
3. Impact
4. Timeline
5. Detection and response
6. Root cause and contributing factors
7. Resolution and recovery
8. Corrective and preventive actions
9. Communication record
10. Lessons learned
11. Outstanding risks / unknowns
12. Evidence and references
13. Approval / review record when required

## Format rules

### Word document (.docx)

Use for the formal human-readable incident report.

- Title page or compact header with incident ID, title, severity, status, and date.
- Use the canonical tables above.
- Keep executive summary on the first page when possible.
- Use heading hierarchy consistently.
- Add page numbers, document owner, version, and confidentiality marking when supplied.
- Keep raw logs out of the main body; reference or append only bounded evidence.

### Excel workbook (.xlsx)

Use as the operational tracker and structured incident dataset.

Recommended sheets:

| Sheet | Purpose |
|---|---|
| `Summary` | canonical incident summary |
| `Timeline` | ordered incident events |
| `Impact` | impact scope and duration |
| `RCA` | root cause and contributing factors |
| `Actions` | corrective/preventive action tracker |
| `Communications` | stakeholder communication log |
| `Evidence` | evidence references, not secret dumps |

- Use one row per event/action/evidence item.
- Use real date/time cells, not decorative text, when supported.
- Keep identifiers stable across sheets.
- Do not hide unknown values with formulas or guesses.

### PDF (.pdf)

Use as the immutable/shareable report copy.

- Generate from the same canonical content as the Word report.
- Preserve table readability and page breaks.
- Repeat table headers across pages when supported.
- Avoid clipped columns; use landscape orientation for wide tables if needed.
- Verify the rendered PDF visually before delivery when tooling allows.

### PowerPoint (.pptx)

Use for leadership, customer, CAB, PIR, or incident review presentations.

Recommended slide structure:

| Slide | Content |
|---|---|
| 1 | Incident title, ID, severity, status |
| 2 | Executive summary |
| 3 | Impact table / key metrics |
| 4 | Timeline |
| 5 | Root cause and contributing factors |
| 6 | Response and recovery |
| 7 | Corrective/preventive actions |
| 8 | Lessons learned / outstanding risk |

- Prefer tables, concise bullets, and one clear message per slide.
- Do not paste full logs or dense paragraphs.
- Use the same numbers, dates, severity, RCA, and actions as the Word/Excel/PDF outputs.

## Input handling

Accept incident evidence from tickets, chat transcripts, monitoring alerts, logs, timelines, runbooks, emails, change records, RCA notes, or user-provided summaries.

Before generating the report:

1. normalize timezone
2. separate facts from assumptions
3. deduplicate repeated events
4. identify missing mandatory fields
5. reconcile conflicting timestamps or impact statements
6. mark unresolved contradictions explicitly
7. redact secrets, credentials, tokens, private keys, and unrelated personal data

## Evidence discipline

Every important factual claim should map to a source when evidence is available.

Use an evidence table:

| Evidence ID | Source | Time / range | What it proves | Sensitivity |
|---|---|---|---|---|

Do not embed credentials, tokens, private keys, session cookies, or customer secrets in generated reports.

## Severity and SLA handling

Do not invent a severity model. Use the organisation's supplied severity/priority/SLA policy. If none is provided, keep severity as supplied and mark SLA calculations as `Not provided` rather than assuming thresholds.

## Output selection

If the user requests one format, create only that format.

If the user requests `all`, create the same incident package in:

- `.docx`
- `.xlsx`
- `.pdf`
- `.pptx`

Before final delivery, cross-check these fields across every generated format:

| Consistency check | Required |
|---|---|
| Incident ID/title | Exact match |
| Severity/status | Exact match |
| Start/end/duration | Exact match |
| Impact numbers | Exact match |
| Root cause wording | Same confirmed meaning |
| Action IDs/owners/dates | Exact match |
| Outstanding risks | Same state |

## Relationship to incident-response-expert

- `incident-response-expert` manages triage, containment, evidence preservation, recovery, and timeline reconstruction.
- `incident-report-creator-expert` converts verified incident evidence into formal report artifacts.

For an active incident, use `incident-response-expert` first. For post-incident reporting, PIR/RCA documentation, management packs, or artifact export, use this skill.

## Final output

Report:

```text
Incident report status:
Formats created:
Source evidence used:
Unknown/pending fields:
Consistency check:
Files/artifacts:
```

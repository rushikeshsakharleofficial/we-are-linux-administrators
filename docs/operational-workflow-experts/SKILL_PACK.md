# Operational workflow parent pack

This pack documents the current high-level production workflow parents. The former micro-skills for change planning, rollback, maintenance windows, risk assessment, preflight, post-change validation, incident timelines, production safety, and standalone RCA were consolidated so agents do not debate between overlapping top-level skills.

## Current routing

- `change-safety-expert`
  - preflight readiness and go/no-go checks
  - blast-radius and risk assessment
  - change-plan structure and pause points
  - maintenance-window design
  - rollback triggers and recovery path
  - post-change validation and accept/monitor/rollback decision
  - production safety guardrails
- `incident-response-expert`
  - active incident triage, evidence preservation, containment, recovery, and timeline reconstruction
  - post-containment RCA via `skills/incident-response-expert/chunks/root-cause-analysis.md`
- `incident-report-creator-expert`
  - formal incident artifacts only after the incident facts are verified

## Execution model

```text
using-linux-admin
  -> change-safety-expert for planned/risky production changes
  -> incident-response-expert for active incidents
       -> chunks/root-cause-analysis.md only after containment or for explicit post-incident RCA
  -> incident-report-creator-expert only for formal report artifacts
```

Do not restore the retired workflow micro-skills merely for compatibility. Their useful procedures are already preserved in the current parents and RCA chunk.

## Safety

All workflow guidance follows `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`: bounded evidence first, architecture fit, backup/recovery protection, rollback before consequential changes, guarded recovery where lockout is possible, and post-change validation.

## Validation

```bash
python3 tests/test_operational_workflow_experts.py
```

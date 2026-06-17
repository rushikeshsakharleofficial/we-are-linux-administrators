# Linux Incident Report

## Summary

- Incident title:
- Date/time:
- Host(s):
- Service/application:
- Severity:
- User impact:
- Current status:

## Environment

- Distro/version:
- Kernel:
- Virtualization/cloud:
- Init system:
- Package manager:
- Network renderer:
- Firewall stack:
- Security policy:
- Storage layers:

## Timeline

| Time | Event | Evidence |
|---|---|---|
| | Last known good | |
| | First warning | |
| | First user-visible impact | |
| | Diagnostic step | |
| | Remediation | |
| | Recovery validation | |

## Commands and evidence

```bash
# commands run
```

Key outputs:

```text
# relevant output excerpts
```

## Hypotheses

| Hypothesis | Evidence for | Evidence against | Result |
|---|---|---|---|
| | | | |

## Root cause


## Remediation applied


## Validation

```bash
# validation commands
```

## Rollback plan


## Prevention

- Monitoring/alert:
- Config validation:
- Automation/runbook:
- Capacity/security follow-up:

## Reusable search patterns

Record useful grep/ripgrep/search patterns discovered:

```bash
# examples
journalctl -g 'error|failed|timeout|denied|refused' --case-sensitive=no
rg -n "<pattern>" /etc /var/log
```

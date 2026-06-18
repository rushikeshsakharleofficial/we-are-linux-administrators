# Security Expert Score Model

The score is not a guarantee of security. It is a prioritization tool for Linux administrators.

## Default score weights

```text
Attack Surface              15
SSH/Auth                    12
Firewall/Network             8
Patch/CVE                   12
Privilege/Sudo               8
Systemd Hardening            8
Sysctl Hardening             7
Limits/Resource Controls     5
MAC: SELinux/AppArmor        6
Logging/Audit/Detection      8
Backup/Ransomware Recovery  11
Total                      100
```

## Rating bands

```text
90-100  Strong baseline, verify role exceptions and monitoring
80-89   Good, with several hardening gaps
70-79   Moderate, needs planned remediation
60-69   Weak, high-priority fixes required
<60     High risk, treat as urgent hardening project
```

## Severity rules

```text
Critical: public exposure of sensitive service, severe auth weakness, unsupported exposed software, no recovery path.
High: weak SSH/auth, broad sudo, missing firewall on public service, weak patch posture, risky systemd privilege.
Medium: missing hardening layer, weak logging, broad limits, incomplete sysctl baseline, weak headers.
Low: hygiene issue, documentation gap, minor hardening improvement.
Info: accepted role exception with evidence.
```

## Output example

```text
Linux Security Score: 82/100

Critical gaps:
- Backup restore has not been tested.

High gaps:
- SSH password authentication is enabled on a public host.
- Public service runs without meaningful systemd sandboxing.

Medium gaps:
- Auditd rules are incomplete.
- Sysctl hardening baseline is partially missing.

Fix order:
1. Protect access paths.
2. Reduce public exposure.
3. Patch vulnerable components.
4. Add systemd/sysctl/limits hardening.
5. Improve logging and detection.
6. Test backup restore.
```

## Scoring rules

- Penalize public exposure more heavily than internal exposure.
- Penalize unsupported OS or kernel heavily when services are public.
- Penalize missing backups separately from prevention controls.
- Do not give full marks for a control unless it is validated.
- Mark role exceptions as accepted risk only when documented.
- Do not let one scanner decide the final score.
- Use evidence, not assumptions.

## Required report fields

```text
Host role:
Scope:
Score:
Top risks:
Evidence summary:
Accepted exceptions:
Fix order:
Validation commands:
Rollback notes:
Next review date:
```

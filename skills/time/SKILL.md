---
name: time
description: Parent Linux timekeeping skill. Diagnose the active clock/synchronisation layer first, then load one focused chunk for Chrony/NTP or system clock/timezone/RTC issues.
argument-hint: "[time / timezone / RTC / NTP / chrony / clock drift symptom]"
effort: medium
allowed-tools: "Read Grep Glob Bash"
---

# Time

Use this parent for Linux timekeeping problems. Start with bounded evidence, identify whether the failure is synchronisation or local clock/timezone/RTC state, then load only the matching chunk.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Time changes can break authentication, certificates, databases, clusters, monitoring and distributed systems, so remain read-only first and define impact/rollback before any clock step or persistent change.

## Baseline evidence

```bash
date -Ins
date -u -Ins
timedatectl status 2>/dev/null || true
timedatectl timesync-status 2>/dev/null || true
systemctl is-active chronyd chrony systemd-timesyncd ntpd ntp 2>/dev/null || true
hwclock --show 2>/dev/null || true
```

Do not mix multiple time daemons or assume a timezone display problem is an NTP problem.

## Condition -> chunk

| Evidence / condition | Load |
|---|---|
| Chrony/chronyd/chronyc, NTP source quality, reach/stratum/offset/jitter, drift, makestep, NTS, server mode, VM sync interaction | `chunks/chrony.md` |
| timezone, `timedatectl`, wall clock vs UTC, RTC/hwclock, systemd-timesyncd, application timestamp interpretation | `chunks/system-clock.md` |
| unclear time issue | stay in this parent, collect baseline evidence, then choose one chunk |

Default to one chunk. Load both only when evidence proves the synchronisation layer and local clock/RTC/timezone policy interact.

## Stop conditions

Do not manually jump time on production databases, Kerberos/LDAP, certificate-sensitive systems, clusters, monitoring servers or distributed applications without impact review and a guarded change plan.

## Validation

After any approved change, re-check local/UTC time, synchronisation state, selected source/backend, RTC policy where relevant, and affected application timestamps/authentication.

## Output

1. Active time stack
2. Evidence and condition classification
3. Selected chunk
4. Risk/impact
5. Safe plan and rollback
6. Validation

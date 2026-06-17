# Date / Timedatectl Expert

Command namespace: `/linux-admin:date-timectl-expert`

Use this skill for system clock, timezone, timedatectl, systemd-timesyncd, hwclock/RTC, date command, time drift, timezone changes, NTP toggles, and app timestamp issues.

## Operating rules

- Read-only evidence first.
- Detect distro, init system, filesystem, and controlling service before making recommendations.
- Never suggest a persistent config change without backup, validation, and rollback.
- Explain why the command/value/change is needed so the user does not over-tune or copy random internet fixes.
- If the built-in skill is not enough, research official docs and Linux community pages before proposing changes.
- If another expert owns the deeper risk, route there: `systemd-expert`, `sysctl-expert`, `package-manager-expert`, `storage`, `os-security-expert`, or `migration-expert`.

## Start with audit helper

```bash
date-timectl-expert-audit
```

## Manual evidence commands

```bash
date -Ins
date -u -Ins
timedatectl status 2>/dev/null || true
timedatectl timesync-status 2>/dev/null || true
timedatectl show 2>/dev/null || true
hwclock --show --verbose 2>/dev/null || true
ls -l /etc/localtime 2>/dev/null || true
cat /etc/timezone 2>/dev/null || true
systemctl status systemd-timesyncd chronyd ntpd 2>/dev/null || true
journalctl -u systemd-timesyncd -u chronyd --no-pager -n 80 2>/dev/null || true
```

## Expert behavior

Separate wall clock, monotonic time, timezone display, RTC/hardware clock, NTP synchronization, and application-level timestamp interpretation. Never use date changes as a shortcut for application logic.

## Core workflows

- Check local/UTC time: `date -Ins`, `date -u -Ins`, `timedatectl`.
- Check NTP sync: `timedatectl timesync-status`, Chrony if installed.
- Timezone: `timedatectl list-timezones`, `timedatectl set-timezone REGION/CITY`.
- NTP toggle: `timedatectl set-ntp true/false`; know whether backend is systemd-timesyncd, Chrony, or ntpd.
- RTC: inspect with `hwclock --show --verbose`; write RTC only when policy is clear.
- Log correlation: compare app logs, journald, remote systems, and UTC.

## Refuse/stop conditions

Do not set system time manually on clustered, DB, Kerberos, certificate, monitoring, or distributed systems without maintenance approval. Prefer fixing NTP source and timezone config.


## Output format

1. Detected stack and controlling layer
2. Current evidence
3. Risk classification
4. Root-cause hypothesis
5. Safe plan
6. Exact commands
7. Rollback
8. Validation
9. When to research more

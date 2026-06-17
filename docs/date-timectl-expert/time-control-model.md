# Date / Timedatectl Expert — Time Control Model

## Scope

system clock, timezone, timedatectl, systemd-timesyncd, hwclock/RTC, date command, time drift, timezone changes, NTP toggles, and app timestamp issues.

## Read-only first commands

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

## Decision framework

1. Identify the controlling layer and config source.
2. Collect current state and recent logs.
3. Classify the operation as read-only, reload/restart, runtime-only change, persistent config change, boot-affecting change, or destructive repair.
4. Prefer the smallest reversible change.
5. Validate syntax/state before reload or reboot.
6. Include rollback commands and config backups.

## Common failure patterns

- Wrong controlling service or wrong config file.
- Runtime state differs from persistent config.
- Distro-specific defaults differ from upstream examples.
- Time, boot, mount, or filesystem changes interact with systemd ordering.
- Repair commands are run before evidence collection.

## Professional answer shape

- Detected stack
- Evidence
- Root-cause hypothesis
- Safe plan
- Commands to preview/test
- Exact change
- Rollback
- Validation

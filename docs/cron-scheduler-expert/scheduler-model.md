# Cron Scheduler Expert — Scheduler Model

## Scope

cron/crond, crontab, /etc/cron.d, anacron, systemd timers, job overlap, PATH/env, mail output, DST/timezone issues, missed jobs, and safe scheduler migrations.

## Read-only first commands

```bash
systemctl status cron crond anacron 2>/dev/null || true
crontab -l 2>/dev/null || true
ls -lah /etc/crontab /etc/cron.d /etc/cron.hourly /etc/cron.daily /etc/cron.weekly /etc/cron.monthly 2>/dev/null || true
find /etc/cron.d -maxdepth 1 -type f -print -exec sed -n "1,120p" {} \; 2>/dev/null || true
systemctl list-timers --all 2>/dev/null || true
journalctl -u cron -u crond -u anacron --no-pager -n 80 2>/dev/null || true
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

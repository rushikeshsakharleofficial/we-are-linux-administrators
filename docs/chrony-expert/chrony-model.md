# Chrony Expert — Chrony Model

## Scope

Chrony/NTP time synchronization, chronyd, chronyc tracking/sources/sourcestats, makestep, drift, NTS, local server mode, time source selection, and safe time correction.

## Read-only first commands

```bash
timedatectl status 2>/dev/null || true
chronyc tracking 2>/dev/null || true
chronyc sources -v 2>/dev/null || true
chronyc sourcestats -v 2>/dev/null || true
chronyc activity 2>/dev/null || true
systemctl status chronyd chrony 2>/dev/null || true
grep -RhsE "^(server|pool|peer|allow|deny|makestep|rtcsync|driftfile|logdir|nts|local|bind|cmdallow|cmdport)" /etc/chrony.conf /etc/chrony/chrony.conf /etc/chrony.d/* 2>/dev/null || true
journalctl -u chronyd -u chrony --no-pager -n 80 2>/dev/null || true
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

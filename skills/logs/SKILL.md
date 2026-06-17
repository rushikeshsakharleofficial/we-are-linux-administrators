---
name: "logs"
description: "Investigate Linux logs, journald, rsyslog, monitoring agent failures, alert triage, incident timeline building, and log correlation."
argument-hint: "[alert/log symptom]"
effort: "high"
allowed-tools: "Read Grep Glob Bash"
---
# logs skill

Use this plugin skill for: $ARGUMENTS

Important: begin read-only; require explicit confirmation before disruptive/destructive changes; include validation and rollback.

Supporting docs are available under `${CLAUDE_SKILL_DIR}/../../docs/`.

# Task: Logging, Journald, rsyslog, Monitoring, Alert Investigation

## When to use

Use for finding logs, correlating an alert, journald/rsyslog issues, log missing, log rotation, monitoring agent problems, incident timeline building.

## Mental model

Logs should answer:

1. When did it start?
2. What changed just before?
3. What component first showed errors?
4. Is this host-local or fleet-wide?
5. Are logs missing because collection failed or event did not happen?

## Read-only first commands

```bash
timedatectl status
journalctl --disk-usage 2>/dev/null || true
journalctl -b --no-pager | tail -200
journalctl -b -p err..alert --no-pager
journalctl --since '1 hour ago' --no-pager | tail -300
journalctl -u <unit> -b --no-pager -n 200
journalctl -k -b --no-pager | tail -200
ls -lah /var/log
find /var/log -maxdepth 2 -type f -printf '%TY-%Tm-%Td %TH:%TM %s %p\n' 2>/dev/null | sort | tail -80
systemctl status rsyslog systemd-journald --no-pager 2>/dev/null || true
rsyslogd -N1 2>/dev/null || true
logrotate -d /etc/logrotate.conf 2>/dev/null | tail -100 || true
```

Monitoring agents:

```bash
systemctl status node_exporter prometheus-node-exporter zabbix-agent zabbix-agent2 telegraf filebeat fluent-bit --no-pager 2>/dev/null || true
ss -lntup | grep -E '9100|10050|9273|24224' || true
```

## Useful journal filters

```bash
journalctl -u <unit> --since '2026-06-16 10:00:00' --until '2026-06-16 11:00:00' --no-pager
journalctl -p warning..alert --since '2 hours ago' --no-pager
journalctl _PID=<pid> --no-pager
journalctl _COMM=<process> --no-pager
journalctl -g 'error|failed|timeout|denied|refused' --case-sensitive=no --since '1 hour ago' --no-pager
```

## Timeline template

```text
T-60m: Last known good.
T-30m: Package/config/deployment/network/storage change.
T-10m: First warning.
T0: First user-visible failure/alert.
T+5m: Automated restart/retry/OOM/firewall deny.
T+Xm: Recovery action.
```

## Branch interpretation

| Signal | Meaning | Next branch |
|---|---|---|
| Logs stop abruptly | crash/reboot/logging pipeline failure | check boot/reboot and journal persistence |
| Time jumps | NTP/time sync issue | chrony/timedatectl path |
| journald disk full | log retention pressure | storage workflow and vacuum after confirmation |
| rsyslog config validation fails | remote logging broken | fix rsyslog syntax and reload after confirmation |
| monitoring agent down | alert visibility gap | service workflow |

## Prevention

- Enable persistent journald where required.
- Ship critical logs remotely.
- Alert on failed units and agent health.
- Keep log rotation dry-run validation in CI for config changes.
- Store incident timelines in tickets/RCA.

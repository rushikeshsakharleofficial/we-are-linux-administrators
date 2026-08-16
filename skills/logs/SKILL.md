---
name: "logs"
description: "Investigate Linux journald/log pipelines, correlate alerts, and route proven rsyslog or logrotate failures to focused chunks."
argument-hint: "[alert/log symptom / service / path]"
effort: "high"
allowed-tools: "Read Grep Glob Bash"
---
# logs skill

Use this skill for missing logs, journald issues, rsyslog forwarding/routing, log rotation, alert/log correlation, monitoring visibility gaps and incident timeline evidence.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Begin read-only, preserve evidence, protect time correlation, define rollback before logging-pipeline changes, and validate that evidence remains available after remediation.

## Baseline evidence

Start small:

```bash
timedatectl status
journalctl --disk-usage 2>/dev/null || true
journalctl -b -p err..alert --no-pager -n 160
ls -lah /var/log | tail -80
systemctl status systemd-journald rsyslog --no-pager 2>/dev/null || true
rsyslogd -N1 2>/dev/null || true
logrotate -d /etc/logrotate.conf 2>/dev/null | tail -100 || true
```

For one service or event window, prefer bounded filters:

```bash
journalctl -u <unit> -b --no-pager -n 200
journalctl --since '1 hour ago' --no-pager -n 300
journalctl -g 'error|failed|timeout|denied|refused' --case-sensitive=no --since '1 hour ago' --no-pager -n 200
```

Do not dump the full journal or whole `/var/log` tree unless the narrow evidence is insufficient.

## Condition -> next content

| Evidence/condition | Load next |
|---|---|
| rsyslog syntax, rule ordering, forwarding, queue, template or TLS-delivery issue | `chunks/rsyslog.md` |
| rotation, retention, compression, ownership, postrotate or copytruncate issue | `chunks/logrotate.md` |
| journald persistence/retention/query issue with no rsyslog/logrotate evidence | stay in this parent baseline |
| monitoring agent/service is down | `service` first; matching monitoring specialist only if product-specific behaviour is proven |
| Nagios Core configuration/check/notification issue | `nagios-core-expert` |
| Observium CE polling/discovery/application issue | `observium-ce-expert` |
| timestamp jump or clock skew breaks correlation | `time` |
| disk pressure is the root cause rather than logging policy | `storage` |
| active incident needs timeline/coordination | `incident-response-expert` |

Default: **one parent + one matching chunk**. Do not load rsyslog and logrotate together unless evidence shows both layers are involved.

## Journald baseline reasoning

When logs stop or appear missing:

1. Confirm boot/session/time window and whether the event was expected to reach journald.
2. Check persistent vs volatile journal storage and disk pressure.
3. Check the service/unit directly before assuming the logging pipeline is broken.
4. If journald has the event but the file/remote target does not, classify the next layer as rsyslog or logrotate from evidence.
5. Preserve incident evidence before vacuuming/removing logs.

Useful checks:

```bash
journalctl --list-boots --no-pager | tail -20
journalctl -u <unit> --since '<start>' --until '<end>' --no-pager -n 240
journalctl -k -b --no-pager -n 160
find /var/log -maxdepth 2 -type f -printf '%TY-%Tm-%Td %TH:%TM %s %p\n' 2>/dev/null | sort | tail -80
```

## Monitoring visibility gap

Use bounded service checks before loading product-specific content:

```bash
systemctl status node_exporter prometheus-node-exporter zabbix-agent zabbix-agent2 telegraf filebeat fluent-bit --no-pager 2>/dev/null || true
ss -lntup | grep -E '9100|10050|9273|24224' || true
```

A down agent is first a service/process problem. A healthy agent producing wrong product-specific checks/notifications belongs to its matching monitoring specialist.

## Timeline discipline

Keep timestamps normalized and evidence-based:

```text
T-60m: last known good
T-30m: verified change/deployment/event
T-10m: first warning
T0: first user-visible failure/alert
T+Xm: response/recovery action
```

Do not invent missing events just to make a neat timeline.

## Validation

After any change, prove the exact logging path:

- source/service emits the expected event
- journald/local file receives it where designed
- rsyslog forwards/routes it where designed
- rotation does not break the writer or permissions
- monitoring/alerting visibility is restored if it was affected

## Output

Return the failing logging layer, selected chunk/specialist, bounded evidence, smallest safe remediation, backup/rollback, validation and one token-saving next request.

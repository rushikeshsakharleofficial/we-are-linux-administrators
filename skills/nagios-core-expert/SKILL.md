---
name: nagios-core-expert
description: Nagios Core community edition expert for hosts/services, object definitions, templates, contacts, commands, plugins, active/passive checks, NRPE/NCPA/NSCA/NRDP, CGI auth, external commands, notifications, flapping, dependencies, performance data, retention, config verification, and safe reload troubleshooting.
argument-hint: "[nagios|nagios-core|plugin|nrpe|ncpa|passive|notification|objects|cfg|service] [symptom]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# Nagios Core Expert

Use this skill for Nagios Core community/open-source monitoring environments. Focus on configuration correctness, host/service object modeling, plugin execution, check scheduling, alerting, notification routing, web CGI access, external command handling, and safe service reloads.

Use `observium-ce-expert` for Observium Community Edition SNMP/RRD polling and discovery. Use this skill for Nagios Core, not Nagios XI-only GUI workflows.

## Safety boundary

Default to read-only. Never reload/restart Nagios Core, change contacts, disable notifications, acknowledge alerts, schedule downtime, remove objects, or modify command definitions until the config has been verified and alert impact is understood.

Never silence production alerts as a first fix. If a change affects notification routing, escalation, downtime, or external commands, require explicit confirmation and rollback.

## Mental model

```text
objects.cfg/templates -> nagios.cfg -> command definitions -> plugins/agents -> scheduler -> state/retention -> notifications/CGI/external commands
```

Nagios Core itself does not perform deep checks internally. It executes external plugins/scripts and interprets their return code and output. Always separate:

- Nagios scheduler/config issue
- plugin command/permission/path issue
- remote agent issue: NRPE/NCPA/NSClient/SSH/SNMP/custom
- notification/contact/escalation issue
- web CGI/auth issue
- retention/state issue

## Evidence first

Common paths differ by source install vs package install. Detect both.

```bash
printf '== os ==\n'; cat /etc/os-release 2>/dev/null | sed -n '1,12p'
printf '== nagios binaries ==\n'; command -v nagios nagios3 nagios4 2>/dev/null || true; ls -l /usr/local/nagios/bin/nagios /usr/sbin/nagios* 2>/dev/null || true
printf '== services ==\n'; systemctl status nagios nagios3 nagios4 apache2 httpd php-fpm --no-pager 2>/dev/null || true
printf '== listeners ==\n'; ss -tulpen | grep -E ':(80|443|5666|5693|12489|5667)\b' || true
printf '== processes ==\n'; ps -ef | grep -Ei '[n]agios|[n]rpe|[n]cpa|[n]sca|[n]rdp'
```

Config and log discovery:

```bash
find /etc /usr/local/nagios -maxdepth 4 -type f \( -name 'nagios.cfg' -o -name '*.cfg' -o -name 'cgi.cfg' \) 2>/dev/null | sort | sed -n '1,240p'
find /var/log /usr/local/nagios/var -maxdepth 3 -type f \( -iname '*nagios*' -o -name 'objects.cache' -o -name 'status.dat' -o -name 'retention.dat' \) 2>/dev/null | sort
journalctl -u nagios -u nagios3 -u nagios4 --no-pager -n 200 2>/dev/null || true
```

## Mandatory config verification

Before restart/reload after any config change:

```bash
/usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg 2>/dev/null || \
nagios -v /etc/nagios/nagios.cfg 2>/dev/null || \
nagios4 -v /etc/nagios4/nagios.cfg 2>/dev/null || \
nagios3 -v /etc/nagios3/nagios.cfg 2>/dev/null
```

Interpretation:

- `Error`: must fix before restart; Nagios may refuse to start.
- `Warning`: review; not always fatal.
- first fatal error may stop verification early, so fix iteratively.

## Object model checks

Main config references:

```bash
grep -R "^cfg_file=\|^cfg_dir=\|^resource_file=\|^status_file=\|^state_retention_file=\|^command_file=" /etc/nagios* /usr/local/nagios/etc 2>/dev/null
```

Object search:

```bash
grep -R "define host\|define service\|define command\|define contact\|define timeperiod\|define hostgroup\|define servicegroup" /etc/nagios* /usr/local/nagios/etc 2>/dev/null | sed -n '1,220p'
```

Key reminders:

- `cfg_file` and `cfg_dir` determine what object files are loaded.
- object directives are case-sensitive.
- templates use `name`, `use`, and `register`.
- retention can override some config-defined non-status values if changed at runtime.
- duplicate host/service/command/contact names commonly break verification.

## Plugin checks

Plugin inventory:

```bash
find /usr/lib/nagios/plugins /usr/local/nagios/libexec -maxdepth 2 -type f -perm -111 2>/dev/null | sort | sed -n '1,240p'
```

Plugin execution as Nagios user:

```bash
sudo -u nagios /usr/local/nagios/libexec/check_ping -H 127.0.0.1 -w 100.0,20% -c 500.0,60% 2>&1 || true
sudo -u nagios /usr/lib/nagios/plugins/check_ping -H 127.0.0.1 -w 100.0,20% -c 500.0,60% 2>&1 || true
```

Plugin status codes:

```text
0 OK
1 WARNING
2 CRITICAL
3 UNKNOWN
```

Common plugin failure domains:

- plugin path mismatch in command definition
- missing executable permission
- plugin depends on missing binary/library
- Nagios user lacks permission
- timeout too low
- thresholds reversed or malformed
- remote agent refused/timeout
- IPv6/IPv4 mismatch

## Agent and remote check paths

NRPE:

```bash
systemctl status nrpe --no-pager 2>/dev/null || true
ss -tulpen | grep ':5666' || true
grep -R "allowed_hosts\|command\[" /etc/nagios/nrpe.cfg /usr/local/nagios/etc/nrpe.cfg /etc/nrpe* 2>/dev/null
```

NCPA:

```bash
systemctl status ncpa_listener ncpa_passive --no-pager 2>/dev/null || true
ss -tulpen | grep ':5693' || true
```

Passive checks / external command pipe:

```bash
grep -R "^check_external_commands=\|^command_file=" /etc/nagios* /usr/local/nagios/etc 2>/dev/null
ls -l /var/lib/nagios*/rw /usr/local/nagios/var/rw 2>/dev/null || true
```

## Notification triage

```bash
grep -R "enable_notifications\|notification_interval\|notification_period\|notification_options\|contacts\|contact_groups\|define contact\|define contactgroup\|define timeperiod" /etc/nagios* /usr/local/nagios/etc 2>/dev/null | sed -n '1,260p'
grep -Ei "SERVICE NOTIFICATION|HOST NOTIFICATION|wproc|Warning:|Error:" /var/log/nagios/nagios.log /usr/local/nagios/var/nagios.log 2>/dev/null | tail -n 120
```

Check:

- global notifications enabled
- host/service notification flags
- timeperiod match
- contact commands valid
- mail/sendmail/postfix path works
- service in soft vs hard state
- flapping suppression
- downtime/acknowledgement suppressing notifications

## Performance and scale

Read-only checks:

```bash
nagiostats 2>/dev/null | sed -n '1,160p' || /usr/local/nagios/bin/nagiostats 2>/dev/null | sed -n '1,160p' || true
ps -o pid,ppid,pcpu,pmem,etime,cmd -C nagios -C nagios3 -C nagios4 2>/dev/null
```

For large environments, check:

- check latency and execution time
- service check intervals/retry intervals
- plugin timeout and process count
- `max_concurrent_checks`
- passive vs active check balance
- retention/status file I/O
- perfdata processing overhead
- notification storms

## Safe remediation pattern

1. Back up exact files to be changed.
2. Make a narrow change.
3. Run Nagios config verification.
4. If verification passes, plan reload/restart.
5. Validate host/service status and notifications.
6. Keep rollback commands ready.

Example rollback:

```bash
cp -a /etc/nagios /root/nagios-backup-$(date +%F-%H%M%S)
# restore only the changed file from backup if validation fails
```

## Output format

```text
Nagios edition/path:
Issue class:
Config source:
Object affected:
Plugin/agent path:
Current state:
Evidence:
Likely failure domain:
Safe fix:
Verification command:
Rollback:
Validation:
Alert-impact note:
```

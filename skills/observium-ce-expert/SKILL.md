---
name: observium-ce-expert
description: Observium Community Edition expert for SNMP device onboarding, add_device.php, poller-wrapper, discovery-wrapper, RRD/RRDCached, MySQL/MariaDB, Apache/Nginx/PHP, cron, permissions, alerts, syslog integration, UNIX agent, MIB/device support, upgrades, and safe troubleshooting.
argument-hint: "[observium|observium-ce|snmp|poller|discovery|rrd|add_device|cron|mib|unix-agent] [symptom]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# Observium CE Expert

Use this skill for Observium Community Edition monitoring environments. Focus on SNMP reachability, device onboarding, poller/discovery operation, RRD storage, database health, cron scheduling, web/PHP issues, MIB/device support, and safe update/migration handling.

Use `nagios-core-expert` for Nagios Core host/service/plugin monitoring. Use this skill for Observium CE and avoid assuming Subscription Edition-only features are available.

## Safety boundary

Default to read-only. Do not run schema updates, remove devices, truncate RRDs, change polling/discovery intervals, change authentication, or migrate CE to Subscription Edition without an explicit backup and rollback plan.

Do not expose SNMP communities or SNMPv3 secrets in reports. Redact credentials before sharing command output.

## Mental model

```text
SNMP-capable device -> Observium add_device/discovery -> poller-wrapper -> poller.php -> database + RRD files -> web UI graphs/alerts
```

Separate failures into:

- device reachability: ping/fping, DNS, routing, firewall
- SNMP credentials/access: community, SNMPv3 auth/privacy, ACLs, source IP
- discovery: device added but ports/entities missing
- poller: device known but data/graphs not updating
- RRD storage/permissions/rrdcached
- database schema/connectivity/performance
- web server/PHP/session/authentication
- CE update/package/dependency issue

## Evidence first

```bash
printf '== os ==\n'; cat /etc/os-release 2>/dev/null | sed -n '1,12p'
printf '== observium path ==\n'; ls -ld /opt/observium /srv/observium /var/www/observium 2>/dev/null || true
printf '== version ==\n'; cd /opt/observium 2>/dev/null && ./discovery.php -V 2>/dev/null || true
printf '== services ==\n'; systemctl status apache2 httpd nginx php-fpm mariadb mysql rrdcached cron crond snmpd --no-pager 2>/dev/null || true
printf '== cron ==\n'; grep -R "observium-wrapper\|poller.php\|discovery.php" /etc/cron* /var/spool/cron 2>/dev/null | sed -n '1,160p'
```

Files and permissions:

```bash
find /opt/observium -maxdepth 2 -type f \( -name 'config.php' -o -name 'poller.php' -o -name 'discovery.php' -o -name 'add_device.php' -o -name 'observium-wrapper' -o -name 'poller-wrapper.py' \) 2>/dev/null | sort
ls -ld /opt/observium /opt/observium/rrd /opt/observium/logs 2>/dev/null
find /opt/observium/logs -maxdepth 1 -type f -print 2>/dev/null | sort
```

Database and web:

```bash
grep -E "db_host|db_user|db_name|base_url|rrdcached|poller|snmp" /opt/observium/config.php 2>/dev/null | sed -E 's/(password|community|auth|secret|key).*/REDACTED/I'
mysqladmin ping 2>/dev/null || true
journalctl -u mariadb -u mysql -u apache2 -u httpd -u nginx -u php-fpm --no-pager -n 160 2>/dev/null || true
```

## Device add checks

Observium recommends adding/removing devices through CLI scripts because the web server should not generally have read/write access to RRD storage or permission to run tools such as `fping`.

Before adding:

```bash
fping <device>
snmpget -v2c -c '<community>' <device> sysObjectID.0
snmpwalk -v2c -c '<community>' <device> sysDescr.0
```

CLI add patterns:

```bash
cd /opt/observium
./add_device.php <hostname> [community] [v1|v2c] [port] [udp|udp6|tcp|tcp6]
./add_device.php <hostname> [any|nanp|anp|ap] [v3] [user] [password] [enckey] [md5|sha] [aes|des] [port] [udp|udp6|tcp|tcp6]
./add_device.php <filename>
```

If default SNMP settings exist in `config.php`, a simple `./add_device.php <hostname>` may try configured community strings or SNMPv3 details.

## Poller operation

`poller.php` collects data from monitored devices and stores it in RRD and the database. It should usually be launched by the Observium wrapper rather than directly by cron.

Debug single device:

```bash
cd /opt/observium
./poller.php -h <device> -d
./poller.php -h <device> -m <module> -d
```

Wrapper cron should normally run every 5 minutes:

```text
*/5 * * * * root python /opt/observium/observium-wrapper poller >> /dev/null 2>&1
```

Check for old deprecated direct poller cron:

```bash
grep -R "poller.php" /etc/cron* /var/spool/cron 2>/dev/null
```

## Discovery operation

`discovery.php` scans devices and populates the database with ports and other entities that require polling.

Debug single device:

```bash
cd /opt/observium
./discovery.php -h <device> -d
./discovery.php -h <device> -m <module> -d
```

Typical discovery cron:

```text
33 */6 * * * root /opt/observium/observium-wrapper discovery >> /dev/null 2>&1
*/5 * * * * root /opt/observium/observium-wrapper discovery --host new >> /dev/null 2>&1
```

## RRD and rrdcached

Graph gaps usually come from poller failure, RRD write failure, permission issues, rrdcached socket mismatch, disk full, inode exhaustion, or clock/time drift.

```bash
df -h /opt/observium /opt/observium/rrd 2>/dev/null
df -ih /opt/observium /opt/observium/rrd 2>/dev/null
find /opt/observium/rrd -maxdepth 2 -type f -name '*.rrd' | sed -n '1,80p'
systemctl status rrdcached --no-pager 2>/dev/null || true
```

## Common failure patterns

- Device fails to add: DNS/ping failure, SNMP ACL, wrong community/SNMPv3 mode, firewall, wrong UDP/TCP transport.
- Device adds but no ports/sensors: discovery modules disabled, MIB/device support, SNMP subtree access, vendor support gap.
- Graphs flat/missing: poller cron not running, wrapper load guard, RRD permission, rrdcached socket, disk/inode full.
- Poller slow: too many devices per cycle, SNMP timeouts, CPU/IO pressure, database latency, too many modules.
- After update, UI/schema errors: missing DB schema upgrade, PHP dependency mismatch, config.php compatibility.
- SNMP works manually but Observium fails: source IP mismatch, IPv6/IPv4 transport mismatch, configured default SNMP credentials differ.

## Update safety

Observium recommends keeping Community Edition installations updated to the latest version. Treat updates as a controlled change:

1. Back up database.
2. Back up `config.php`.
3. Check disk space.
4. Record current version.
5. Apply update using the documented CE method.
6. Run schema/discovery validation if required.
7. Validate poller and UI.
8. Keep rollback plan.

## Output format

```text
Observium edition/path:
Issue class:
Device affected:
SNMP reachability:
Discovery status:
Poller status:
RRD/database status:
Web/PHP status:
Evidence:
Likely failure domain:
Safe fix:
Rollback:
Validation:
Secret-redaction note:
```

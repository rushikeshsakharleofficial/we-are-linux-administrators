---
name: named-expert
description: Expert BIND/named DNS administration for authoritative and recursive DNS, named.conf, zones, serials, AXFR/IXFR, views, ACLs, DNSSEC, rndc, logging, validation, migration, and outage-safe changes.
---

# named-expert

Act as a senior DNS administrator for ISC BIND/named. Use this skill for BIND zone changes, named.conf validation, master/secondary replication, recursive resolver hardening, DNSSEC, views/split DNS, ACLs, RNDC, logging, migration, performance and outage triage.

## Core rules

1. Never reload named before `named-checkconf` and zone validation.
2. Do not open recursion to the internet.
3. Restrict zone transfers with explicit `allow-transfer` and TSIG where possible.
4. Increment SOA serial for authoritative zone changes.
5. Validate from inside and outside the network using `dig`.
6. Separate authoritative and recursive roles unless there is a clear reason.
7. Back up zone files and configs before edits.
8. For many-zone migrations, generate a zone inventory and validate every zone before cutover.

## Read-only first

```bash
named -v 2>/dev/null || named -V 2>/dev/null || true
named-checkconf -z 2>&1 | sed -n '1,240p'
rndc status 2>/dev/null || true
systemctl status named bind9 2>/dev/null || true
ss -ulpn 'sport = :53' || true
ss -tlpn 'sport = :53' || true
journalctl -u named -u bind9 -b --no-pager -n 200
```

## Troubleshooting model

```text
Client symptom -> resolver path -> authoritative path -> cache/TTL -> zone data -> transfer/notify -> firewall/NAT -> DNSSEC -> logs
```

## Output format

```text
DNS role:
Current evidence:
Risk:
Exact zone/config change:
Validation commands:
Reload/cutover command:
Rollback:
Post-change checks:
```

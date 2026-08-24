---
name: named-expert
description: Expert BIND/named DNS administration for authoritative and recursive DNS, named.conf, zones, serials, AXFR/IXFR, views, ACLs, DNSSEC, rndc, logging, validation, migration, and outage-safe changes.
argument-hint: "[authoritative|recursive|zone|dnssec|transfer|rndc|outage] [symptom or change]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# named-expert

Act as a senior DNS administrator for ISC BIND/named. Use this skill for BIND zone changes, named.conf validation, master/secondary replication, recursive resolver hardening, DNSSEC, views/split DNS, ACLs, RNDC, logging, migration, performance and outage triage.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Start with bounded read-only evidence, verify the server's authoritative/recursive role and the exact affected zones/views, preserve current configuration and zone data before changes, define rollback before reload/cutover, use guarded rollback for remote DNS/firewall/routing-sensitive changes, validate both authoritative and client-visible answers after apply, and keep secrets such as TSIG material out of collected output.

For DNSSEC or production authoritative changes, confirm key-management/DS-record ownership and recovery options before modifying signing state. Do not treat cache flushes or service restarts as proof that authoritative data is correct.

## Core rules

1. Never reload named before `named-checkconf` and zone validation.
2. Do not open recursion to the internet.
3. Restrict zone transfers with explicit `allow-transfer` and TSIG where possible.
4. Increment SOA serial for authoritative zone changes.
5. Validate from inside and outside the network using `dig`.
6. Separate authoritative and recursive roles unless there is a clear reason.
7. Back up zone files and configs before edits.
8. For many-zone migrations, generate a zone inventory and validate every zone before cutover.
9. Preserve DNSSEC keys, signing metadata, DS ownership details and transfer ACL/TSIG configuration before consequential changes.
10. For production cutovers, account for TTL/cache propagation and keep the prior serving path recoverable until external validation succeeds.

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

## Safe change workflow

1. Identify OS/BIND version, DNS role, affected zone/view and current primary/secondary topology.
2. Back up `named.conf` includes, zone files and relevant DNSSEC metadata/keys before edits.
3. Validate configuration with `named-checkconf` and each changed zone with `named-checkzone` or the platform-equivalent validation path.
4. Apply the smallest change and prefer `rndc reload <zone>` or a scoped reload when supported instead of a blind full restart.
5. Verify local authoritative answers, SOA serials and DNSSEC state, then validate from an independent resolver/client path.
6. Confirm secondary transfer/notify state where applicable.
7. Keep rollback available until TTL-sensitive external validation is complete.

## Output format

```text
DNS role:
Current evidence:
Affected zone/view:
Security/facts check:
Backup/disaster plan:
Risk:
Exact zone/config change:
Validation commands:
Reload/cutover command:
Rollback/guarded rollback:
Post-change checks:
Architecture fit:
```

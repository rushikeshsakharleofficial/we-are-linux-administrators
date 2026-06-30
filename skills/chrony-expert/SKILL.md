# Chrony Expert

Command namespace: `/linux-admin:chrony-expert`

Use this skill for Chrony/NTP time synchronization, chronyd, chronyc tracking/sources/sourcestats, makestep, drift, NTS, local server mode, time source selection, and safe time correction.

## Operating rules

- Read-only evidence first.
- Detect distro, init system, filesystem, and controlling service before making recommendations.
- Never suggest a persistent config change without backup, validation, and rollback.
- Explain why the command/value/change is needed so the user does not over-tune or copy random internet fixes.
- If the built-in skill is not enough, research official docs and Linux community pages before proposing changes.
- If another expert owns the deeper risk, route there: `systemd-expert`, `sysctl-expert`, `package-manager-expert`, `storage`, `os-security-expert`, or `migration-expert`.

## Start with audit helper

```bash
chrony-expert-audit
```

## Manual evidence commands

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

## Expert behavior

Treat time sync as infrastructure: authentication, source quality, drift, stepping/slewing, virtualization, firewall/NTP reachability, and service dependencies all matter. Use read-only `chronyc tracking`, `sources -v`, and `sourcestats -v` before proposing changes.

## Core workflows

- Client health: tracking offset, root delay/dispersion, leap status, selected source marker.
- Source quality: compare reach, stratum, last sample, jitter, and source selection.
- Boot correction: `makestep` policy must be limited and explained; do not step time in databases or clusters without maintenance review.
- Server mode: `allow`/`deny`, bind address, firewall UDP/123, NTS where required.
- RTC: `rtcsync`, hardware clock policy, VM host time influence.
- Logs: check chronyd journal and tracking history when available.

## Refuse/stop conditions

Do not run manual time jumps on production DBs, Kerberos/LDAP, TLS-heavy systems, clusters, or monitoring servers without impact review. Do not open NTP server mode broadly without ACLs.


## NTP triage (multi-daemon)

When the active time service is unknown, identify it first — do not mix active daemons:

```bash
timedatectl status
systemctl is-active chronyd chrony systemd-timesyncd ntpd ntp 2>/dev/null || true
```

Classify problem as one of: timezone display issue, inactive sync service, unreachable source, bad source quality, large offset, VM clock skew, multiple daemon conflict, or client/server policy mismatch.

- **Timezone vs clock**: separate timezone display (`timedatectl set-timezone`) from actual sync failure.
- **systemd-timesyncd**: lightweight fallback, no server mode, no advanced source selection — replace with chrony if needed.
- **ntpd (legacy)**: EOL upstream; prefer chrony. If ntpd is running, route config questions through chrony migration path.
- **VM skew**: guest clock may drift under load; check hypervisor clock tools (VMware Tools, qemu-guest-agent) before tuning chrony.

Route to `date-timectl-expert` for timezone-only or RTC-only issues.

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

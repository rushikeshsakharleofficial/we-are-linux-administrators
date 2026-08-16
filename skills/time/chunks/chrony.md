# Chrony / NTP synchronisation

Load this chunk only after the `time` parent identifies Chrony/NTP synchronisation as the failing layer.

## Scope

Use for `chronyd`/`chronyc`, NTP source selection and quality, offset/drift, stepping vs slewing, `makestep`, NTS, server mode, VM clock interaction, UDP/123 reachability, and conflicting time daemons.

## Evidence first

```bash
chronyc tracking 2>/dev/null || true
chronyc sources -v 2>/dev/null || true
chronyc sourcestats -v 2>/dev/null || true
chronyc activity 2>/dev/null || true
systemctl status chronyd chrony --no-pager 2>/dev/null || true
grep -RhsE "^(server|pool|peer|allow|deny|makestep|rtcsync|driftfile|logdir|nts|local|bind|cmdallow|cmdport)" /etc/chrony.conf /etc/chrony/chrony.conf /etc/chrony.d/* 2>/dev/null || true
journalctl -u chronyd -u chrony --no-pager -n 80 2>/dev/null || true
```

Interpret selected source, reach, stratum, last sample, offset, jitter, root delay/dispersion and leap status before changing configuration.

## Multi-daemon triage

```bash
systemctl is-active chronyd chrony systemd-timesyncd ntpd ntp 2>/dev/null || true
```

Identify the controlling daemon first. Do not run competing synchronisation services.

- `systemd-timesyncd` is a lightweight client and does not provide Chrony's advanced source-selection/server features.
- Treat legacy `ntpd` migrations deliberately rather than mixing its configuration with Chrony.
- In VMs, check hypervisor guest time integration before treating persistent skew as a Chrony tuning problem.

## Safe workflows

### Client health
1. Read `chronyc tracking`.
2. Inspect source reach/selection with `sources -v`.
3. Compare jitter/offset history with `sourcestats -v`.
4. Check network/firewall reachability only if the source is unreachable.
5. Change source/config only with backup, rollback and post-change tracking validation.

### Large offset / boot correction
`makestep` must be limited and justified. Do not step time casually on databases, clusters, Kerberos/LDAP, TLS-heavy systems or monitoring infrastructure. Prefer a maintenance-reviewed correction strategy.

### NTP server mode
Validate `allow`/`deny`, bind/interface policy and UDP/123 exposure. Do not expose an NTP server broadly without ACLs. Use NTS where the architecture requires authenticated time sources.

### RTC interaction
`rtcsync` and hardware-clock policy must match the system/virtualisation design. If the problem is primarily timezone or RTC policy, return to the parent and load `system-clock.md` instead.

## Anti-patterns

- changing `makestep` from internet snippets without impact analysis
- adding many public sources without source-quality or security reasoning
- opening UDP/123 globally for a client-only host
- running Chrony and another NTP daemon simultaneously
- treating timezone display as a clock-synchronisation failure

## Validation

```bash
chronyc tracking
chronyc sources -v
chronyc sourcestats -v
systemctl is-active chronyd chrony 2>/dev/null || true
timedatectl status 2>/dev/null || true
```

Escalate cross-layer service issues to `systemd-expert`, firewall changes to `firewall-expert`, package transitions to `package-manager-expert`, and production migration work to `migration-expert` plus `change-safety-expert`.

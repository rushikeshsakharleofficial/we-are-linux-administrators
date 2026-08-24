# System clock, timezone and RTC

Load this chunk only after the `time` parent identifies local clock, timezone, RTC/hwclock, `timedatectl`, `systemd-timesyncd`, or application timestamp interpretation as the failing layer.

## Mental model

Keep these layers separate:
- wall-clock time
- UTC representation
- timezone/display policy
- monotonic time
- RTC/hardware clock
- synchronisation backend
- application timestamp/storage interpretation

Do not use a system-time change as a shortcut for an application timezone bug.

## Evidence first

```bash
date -Ins
date -u -Ins
timedatectl status 2>/dev/null || true
timedatectl timesync-status 2>/dev/null || true
timedatectl show 2>/dev/null || true
hwclock --show --verbose 2>/dev/null || true
ls -l /etc/localtime 2>/dev/null || true
cat /etc/timezone 2>/dev/null || true
systemctl status systemd-timesyncd chronyd ntpd --no-pager 2>/dev/null || true
journalctl -u systemd-timesyncd -u chronyd --no-pager -n 80 2>/dev/null || true
```

Before any state change, record the current timezone, NTP/synchronisation state and RTC policy. Define rollback using those recorded values; do not improvise a reverse clock jump after the fact.

## Condition handling

### Timezone only
Confirm local time versus UTC and the intended region before changing it.

```bash
timedatectl list-timezones
timedatectl set-timezone REGION/CITY
```

`set-timezone` is state-changing: record the previous timezone and validate application/log interpretation afterwards. Roll back with the recorded previous timezone if the change proves incorrect.

### Synchronisation toggle/backend
`timedatectl set-ntp true|false` is backend-dependent. Identify whether `systemd-timesyncd`, Chrony or another service actually controls synchronisation before using it. If Chrony/source quality is the issue, return to the parent and load `chrony.md`. Preserve the prior enablement/backend state so rollback restores the original synchronisation controller instead of leaving competing daemons active.

### RTC / hardware clock
Inspect `hwclock` first. Write the RTC only when UTC/localtime policy and virtualisation/hardware ownership are clear. Avoid making RTC changes merely to hide a bad synchronisation source. Treat RTC writes as consequential: capture the previous policy/value and use the platform-appropriate recovery path rather than repeatedly rewriting the clock.

### Application timestamp mismatch
Compare application logs, journald, database/storage timestamp semantics, remote systems and UTC. Fix application/database timezone configuration at the owning layer instead of changing host time without evidence.

## Stop conditions

Do not manually set or jump system time on clustered, database, Kerberos/LDAP, certificate-sensitive, monitoring or distributed systems without maintenance approval and impact review. Prefer repairing synchronisation or timezone policy.

## Validation

```bash
date -Ins
date -u -Ins
timedatectl status 2>/dev/null || true
timedatectl timesync-status 2>/dev/null || true
hwclock --show 2>/dev/null || true
```

Validate affected logs, authentication/certificates and application timestamps when they were part of the incident. Do not cancel a planned rollback until host time, synchronisation state and affected workloads all match the intended architecture.

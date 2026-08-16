# Fail2Ban diagnostics and lockout-safe remediation

Use this chunk only after `security-expert` identifies brute-force protection, a jail/filter/action problem, or repeated abusive authentication traffic as the condition.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Start with bounded read-only evidence. Verify the Fail2Ban version, active firewall backend, exact log source, management access path and jail scope before changing anything. Back up affected files and preserve an immediate unban/rollback path for remote-access jails.

## Core rule

Fail2Ban is log-driven protection. It is not a replacement for strong authentication, key/MFA policy, proper firewall scoping or application rate limiting.

## Read-only first

```bash
fail2ban-client version
fail2ban-client status
fail2ban-client status <jail>
fail2ban-client get <jail> logpath 2>/dev/null || true
fail2ban-client get <jail> journalmatch 2>/dev/null || true
fail2ban-client get <jail> bantime findtime maxretry 2>/dev/null || true
fail2ban-client get <jail> actions 2>/dev/null || true
fail2ban-client get <jail> ignoreip 2>/dev/null || true
fail2ban-client -d 2>/dev/null | sed -n '1,240p'
journalctl -u fail2ban -b --no-pager -n 200
```

A jail is: `filter + log source/backend + threshold window + action`. Confirm all four before remediation.

## Safe workflow

1. Confirm the protected service actually logs failed attempts in a parseable form.
2. Confirm file-log versus journald backend and any proxy/CDN real-client-IP trust chain.
3. Test regex against malicious and normal examples before enabling a jail.
4. Confirm action backend matches nftables/firewalld/iptables/UFW/custom policy.
5. Protect known management/VPN/NOC sources from accidental lockout only when those source ranges are controlled and justified.
6. Start with conservative `bantime`, `findtime`, and `maxretry`; avoid permanent bans by default.
7. Enable/change one jail at a time and validate Fail2Ban plus firewall state.
8. Watch for false positives.

Prefer `/etc/fail2ban/jail.d/<name>.local`; do not modify vendor `jail.conf` unless the platform specifically requires it.

## Filter proof

```bash
fail2ban-regex /var/log/<service>.log /etc/fail2ban/filter.d/<filter>.conf --print-all-matched
fail2ban-regex systemd-journal /etc/fail2ban/filter.d/<filter>.conf --journalmatch '<match>'
```

Do not enable a custom filter unless it matches representative attack/failure lines and does not match representative valid traffic.

## Remote-access safety

For SSH or another management path, verify console/out-of-band access or a tested unban path before consequential changes. Keep a second session where practical. Record:

```bash
fail2ban-client set <jail> unbanip <admin-ip>
```

Use the actual validated jail/IP values only; do not copy placeholders blindly.

## False-positive traps

- broad web regex that treats ordinary 404s as attacks
- banning a reverse proxy/CDN address because real client IP logging is wrong
- huge `ignoreip` ranges that exempt untrusted networks
- recidive/incremental/permanent bans without policy and evidence
- action backend mismatched with the host firewall

## Validation

```bash
fail2ban-client status <jail>
fail2ban-client get <jail> actions 2>/dev/null || true
journalctl -u fail2ban -b --no-pager -n 120
nft list ruleset 2>/dev/null | grep -i fail2ban -n | head -80 || true
iptables-save 2>/dev/null | grep -i fail2ban | head -80 || true
```

Return: jail/service, log backend, filter proof, action/firewall backend, false-positive risk, recommended values with rationale, rollback/unban, validation and remaining uncertainty.
# Fail2Ban anti-lockout

## Before enabling a jail

- Add admin/VPN/NOC IPs to `ignoreip`.
- Test regex with real logs.
- Confirm firewall action backend.
- Start with short/moderate `bantime`.
- Keep an open admin session.
- Know unban command:

```bash
fail2ban-client set <jail> unbanip <ip>
fail2ban-client unban <ip>
```

## Dangerous patterns

- enabling many jails at once,
- setting `bantime = -1` globally,
- aggressive web filters behind reverse proxy,
- no `ignoreip` for management networks,
- custom regex not tested with negative samples.

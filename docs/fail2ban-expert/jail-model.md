# Fail2Ban jail model

A jail is a combination of filter, log source, threshold, and action:

```text
filter + backend/logpath/journalmatch + findtime/maxretry/bantime + action
```

## Important files

| Path | Purpose |
|---|---|
| `/etc/fail2ban/jail.conf` | vendor/default config; do not edit directly |
| `/etc/fail2ban/jail.local` | local overrides |
| `/etc/fail2ban/jail.d/*.local` | preferred per-jail overrides |
| `/etc/fail2ban/filter.d/*.conf` | regex filters |
| `/etc/fail2ban/action.d/*.conf` | ban actions |

## Read-only discovery

```bash
fail2ban-client status
fail2ban-client -d
fail2ban-client status <jail>
fail2ban-client get <jail> bantime findtime maxretry
fail2ban-client get <jail> actions
```

# Fail2Ban Change Plan

## Jail

- Service:
- Jail name:
- Log source/backend:
- Firewall action backend:
- Management IP/CIDR to ignore:

## Evidence

```bash
fail2ban-client status
fail2ban-client -d
fail2ban-regex <log-or-journal> <filter>
```

## Proposed config

```ini
[jail-name]
enabled = true
filter =
logpath =
backend =
maxretry =
findtime =
bantime =
ignoreip =
action =
```

## Why these values

| Setting | Reason | Why not more aggressive |
|---|---|---|
| maxretry | | |
| findtime | | |
| bantime | | |
| action | | |

## Validate

```bash
fail2ban-client reload
fail2ban-client status <jail>
journalctl -u fail2ban -b -n 100 --no-pager
```

## Rollback/unban

```bash
fail2ban-client set <jail> unbanip <ip>
# disable jail override and reload
```

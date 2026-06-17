# SSH, web, and mail Fail2Ban playbooks

## SSH

Prefer strong SSH first:

- key-based auth,
- no root password login,
- limited source CIDRs where possible,
- Fail2Ban as additional protection.

Jail example:

```ini
[sshd]
enabled = true
backend = systemd
maxretry = 5
findtime = 10m
bantime = 1h
ignoreip = 127.0.0.1/8 ::1 <admin-cidr>
```

## Web apps

Be careful with reverse proxies. Ensure the app logs real client IPs, not only proxy IPs. Never ban based on untrusted `X-Forwarded-For` unless the proxy trust chain is correct.

## Mail

Postfix/Dovecot jails can be useful, but tune carefully to avoid blocking NATed customers or monitoring systems. Confirm mail logs and service names per distro.

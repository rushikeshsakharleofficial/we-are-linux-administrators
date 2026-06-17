# systemd service hardening without breaking production

## Rule

Hardening is a compatibility exercise. Add one class of restriction at a time, test, and keep a rollback path.

## Safer first layer

```ini
[Service]
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=full
```

Use `ReadWritePaths=` for required writable paths:

```ini
[Service]
ProtectSystem=strict
ReadWritePaths=/var/lib/myapp /var/log/myapp /run/myapp
```

## Capability method

1. Start with current behavior and logs.
2. Identify required capabilities using app docs, audit logs, and failures.
3. Apply `CapabilityBoundingSet=` only for known requirements.
4. Validate all runtime operations, not just startup.

## Common breakages

| Hardening | Breakage |
|---|---|
| `ProtectHome=true` | app reads user home, SSH keys, certs under home |
| `PrivateTmp=true` | app expects shared `/tmp` files |
| `ProtectSystem=strict` | app writes to `/usr`, `/etc`, `/opt`, or unlisted paths |
| `PrivateDevices=true` | app needs device nodes |
| `RestrictAddressFamilies=` | app needs IPv6, UNIX sockets, netlink |
| `SystemCallFilter=` | app uses blocked syscalls, often hard to debug |

## Validation

```bash
systemd-analyze security <unit>
journalctl -u <unit> -b -p warning..alert --no-pager
ausearch -m avc,user_avc -ts recent 2>/dev/null || true
```

Do not treat a high `systemd-analyze security` score as proof that a production service is safe; it is a heuristic.

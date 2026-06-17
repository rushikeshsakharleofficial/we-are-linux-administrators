# systemd unit design guidance

## Unit placement

| Location | Meaning |
|---|---|
| `/usr/lib/systemd/system` or `/lib/systemd/system` | vendor/package units |
| `/etc/systemd/system` | administrator overrides and local units |
| `/run/systemd/system` | runtime/transient units |
| `/etc/systemd/system/<unit>.d/*.conf` | preferred persistent drop-ins |

Local changes should usually be drop-ins. Drop-ins are merged after the main unit and let package updates replace vendor units safely.

## Choosing `Type=`

| Type | Use when | Avoid when |
|---|---|---|
| `exec` | long-running daemon started directly; want start failure if exec/user fails | service forks or readiness requires notification |
| `notify` | daemon implements sd_notify and sends `READY=1` | daemon does not support notify |
| `simple` | basic foreground process and dependency ordering does not need readiness | dependents require actual readiness |
| `forking` | legacy daemon forks and cannot run foreground | new services; use foreground/exec/notify instead |
| `oneshot` | finite setup task | long-running service |

## Dependencies and ordering

- `Wants=` pulls another unit in but does not fail the parent if it fails.
- `Requires=` is stronger and can cause coupled failures.
- `After=` and `Before=` control ordering only.
- Pull-in and ordering are separate. A service that needs another service started first often needs both `Wants=` and `After=`.
- Do not add `network-online.target` blindly. Use it only when the service cannot start without configured network routes/DNS.

## Override patterns

Clear list-style directives before replacing:

```ini
[Service]
ExecStart=
ExecStart=/usr/bin/mydaemon --config /etc/mydaemon.conf
```

Add resource controls in a drop-in:

```ini
[Service]
MemoryHigh=2G
MemoryMax=3G
TasksMax=4096
Restart=on-failure
RestartSec=5s
```

## Validation

```bash
systemd-analyze verify /etc/systemd/system/<unit>.d/*.conf
systemctl daemon-reload
systemctl show <unit> -p NeedDaemonReload,FragmentPath,DropInPaths
systemctl restart <unit>
systemctl status <unit> --no-pager -l
journalctl -u <unit> -b -n 100 --no-pager
```

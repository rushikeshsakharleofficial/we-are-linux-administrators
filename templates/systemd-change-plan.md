# systemd Change Plan

## Unit

- Unit name:
- Host/role:
- Current state:
- Impacted service owner:

## Evidence

```bash
systemctl show <unit> -p LoadState,ActiveState,SubState,Result,ExecMainStatus,NRestarts,NeedDaemonReload
systemctl cat <unit>
journalctl -u <unit> -b -n 100 --no-pager
```

## Root cause hypothesis

-

## Proposed drop-in/local change

Path:

```text
/etc/systemd/system/<unit>.d/<name>.conf
```

Content:

```ini
[Service]
# exact directives here
```

## Why each setting is used

| Setting | Reason | Why not higher/lower/more aggressive |
|---|---|---|
| | | |

## Risk

- Restart required:
- Lockout risk:
- Data risk:
- Dependency risk:

## Apply

```bash
sudo systemd-analyze verify /etc/systemd/system/<unit>.d/<name>.conf
sudo systemctl daemon-reload
sudo systemctl restart <unit>
```

## Validate

```bash
systemctl status <unit> --no-pager -l
journalctl -u <unit> -b -n 100 --no-pager
# app-specific health check
```

## Rollback

```bash
sudo rm /etc/systemd/system/<unit>.d/<name>.conf
sudo systemctl daemon-reload
sudo systemctl restart <unit>
```

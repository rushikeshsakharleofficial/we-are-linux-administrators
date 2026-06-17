# systemd restart and failure playbook

## Failure states

| State/result | Meaning | Action |
|---|---|---|
| `failed` + exit code | service process exited badly | read app logs and ExecMainStatus |
| `start-limit-hit` | too many starts in interval | stop restarting, fix root cause, reset failed after fix |
| `timeout` | start/stop timed out | check readiness, blocking startup, TimeoutStartSec |
| `watchdog` | daemon missed watchdog | check app hang, CPU starvation, watchdog config |
| `resources`/OOM | killed by cgroup/kernel | inspect memory controls and OOM logs |

## Restart policy recommendations

| Workload | Restart | Notes |
|---|---|---|
| long-running daemon | `on-failure` | good default |
| batch job | none or `on-failure` with low retries | avoid duplicate processing |
| crash-only worker | `always` possible | must have `RestartSec` and idempotency |
| socket-activated service | depends | socket may handle activation |
| database | careful | repeated restart can worsen recovery |

## Safe recovery

```bash
systemctl reset-failed <unit>   # only after root cause identified or for cleanup
systemctl start <unit>
systemctl status <unit> --no-pager -l
```

Do not use `reset-failed` as a fix. It only clears the failed state/rate-limit bookkeeping.

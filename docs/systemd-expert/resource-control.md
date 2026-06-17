# systemd resource control

## Principle

Use systemd resource controls to protect the host and neighboring services, not to guess performance tuning values. Prefer soft controls before hard kills.

## Key directives

| Directive | Use | Conservative guidance |
|---|---|---|
| `MemoryHigh=` | throttle/reclaim pressure before OOM | primary memory control for important services |
| `MemoryMax=` | hard memory ceiling | last line of defense; set above normal peak |
| `TasksMax=` | max processes/threads | prevent fork bombs or runaway workers |
| `CPUQuota=` | cap CPU time | use only for noisy non-critical services |
| `CPUWeight=` | relative CPU share | safer than hard quota for shared hosts |
| `IOWeight=` | relative IO priority | safer than hard throttles |
| `LimitNOFILE=` | fd limit for service | set from measured socket/file needs |

## Memory method

1. Measure: `MemoryCurrent`, `MemoryPeak`, application metrics.
2. Set `MemoryHigh` above normal peak and below host danger level.
3. Set `MemoryMax` higher than `MemoryHigh` as a safety boundary.
4. Watch app latency, OOM logs, and cgroup memory events.

Avoid setting `MemoryMax` equal to average usage; that creates artificial OOM events.

## File descriptor method

1. Measure current use:

```bash
pid=$(systemctl show <unit> -p MainPID --value)
ls /proc/$pid/fd | wc -l
cat /proc/$pid/limits | grep 'open files'
```

2. Estimate demand:

```text
connections + upstream sockets + log files + database files + margin
```

3. Set a rounded value with margin, for example `LimitNOFILE=65535`, only when app and libraries tolerate fds above 1024.

## Process/thread method

1. Measure `TasksCurrent` and application worker/thread model.
2. Set `TasksMax` at expected peak + margin.
3. Do not set extremely low values for Java, DB, monitoring, or thread-heavy services.

## Rollback

Remove the drop-in or directive, then:

```bash
systemctl daemon-reload
systemctl restart <unit>
```

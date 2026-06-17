# Task: Performance, CPU, Memory, Load, OOM

## When to use

Use this for high load, high CPU, host slow, SSH lag, OOM killer, memory leak, swap thrash, performance regression, latency spikes, cgroup pressure.

## Mental model

Classify bottleneck using USE method:

- Utilization: how busy is the resource?
- Saturation: is work queued?
- Errors: are failures/retries occurring?

Then split into:

- CPU-bound.
- Run-queue saturation.
- Memory pressure/OOM.
- Swap thrashing.
- I/O wait masquerading as CPU/load.
- Cgroup/container limit.
- Kernel lockup or scheduler issue.

## Read-only first commands

```bash
uptime
nproc
lscpu | head -40
free -h
swapon --show
vmstat 1 5
top -H -b -n1 | head -80
ps -eo pid,ppid,user,stat,comm,%cpu,%mem,rss,vsz --sort=-%cpu | head -30
ps -eo pid,ppid,user,stat,comm,%cpu,%mem,rss,vsz --sort=-%mem | head -30
pidstat 1 5 2>/dev/null || true
iostat -xz 1 5 2>/dev/null || true
mpstat -P ALL 1 3 2>/dev/null || true
journalctl -k -g 'Out of memory|oom|oom-kill|soft lockup|hard LOCKUP|blocked for more than' --no-pager 2>/dev/null || true
systemd-cgtop --iterations=3 2>/dev/null || true
systemctl status systemd-oomd 2>/dev/null || true
```

## Branch interpretation

| Signal | Meaning | Next branch |
|---|---|---|
| One process/thread dominates CPU | app hot loop/query/worker issue | process logs, perf, app profiling |
| Load high, CPU idle, many `D` tasks | I/O wait/storage or NFS issue | switch to storage workflow |
| `vmstat si/so` nonzero sustained | swap thrashing | identify memory consumers and limits |
| Kernel OOM log names victim | memory pressure exceeded | find cgroup/process growth |
| `r` queue much higher than CPU count | CPU saturation | identify runnable processes/threads |
| High steal time in VM | noisy neighbor/host contention | cloud/hypervisor escalation |
| cgroup top shows one slice/container | service-specific resource limit | inspect unit/container limits |

## Deeper commands

Use only when needed:

```bash
perf stat -a sleep 10
perf top       # interactive; use carefully
pidstat -p <pid> -u -r -d 1 5
cat /proc/pressure/cpu 2>/dev/null || true
cat /proc/pressure/memory 2>/dev/null || true
cat /proc/pressure/io 2>/dev/null || true
cat /proc/<pid>/status
cat /proc/<pid>/limits
```

## Safe remediation patterns

Do not kill processes blindly. Preferred order:

1. Identify owner service.
2. Check if there is a known maintenance/deployment.
3. Capture logs and current state.
4. If service restart is required, classify impact and ask confirmation.
5. Tune only after bottleneck is proven.

Examples after confirmation:

```bash
systemctl restart <unit>
systemctl set-property <unit> MemoryMax=<size>   # if chosen intentionally
renice <value> -p <pid>
```

## Validation

```bash
uptime
vmstat 1 5
free -h
pidstat 1 5
journalctl -k -g 'oom|Out of memory' --since '10 minutes ago' --no-pager
```

## Prevention

- Add memory and swap alerts.
- Add per-service cgroup limits where appropriate.
- Add application-level metrics.
- Keep baseline profiles using PCP, Prometheus node_exporter, or similar.
- Track deployment time vs regression time.

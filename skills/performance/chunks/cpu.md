# CPU pressure and run-queue diagnostics

Use this chunk after `performance` baseline evidence points to CPU saturation, run-queue pressure, steal time, softirq pressure, scheduler contention, or one noisy process/thread.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`.

## Evidence first

```bash
nproc
uptime
mpstat -P ALL 1 3 2>/dev/null || true
pidstat -u -t 1 5 2>/dev/null || true
ps -eLo pid,ppid,tid,psr,stat,comm,%cpu --sort=-%cpu | head -40
vmstat 1 5
cat /proc/pressure/cpu 2>/dev/null || true
```

Classify the pressure before changing anything:

- high user CPU -> application/workload hot path
- high system CPU -> kernel/syscall/driver work
- high steal -> hypervisor/noisy-neighbour contention
- high softirq -> packet/interrupt processing; correlate with network workload
- runnable queue (`vmstat r`) sustained above CPU count -> CPU saturation
- high load with idle CPU and many `D` tasks -> not a CPU problem; route to storage/network-storage evidence

## Safe workflow

1. Identify the process and hottest thread, not just the process name.
2. Correlate with deployment/job/batch timing and service latency.
3. Use `perf stat` or bounded profiling only when basic evidence is insufficient.
4. Prefer workload/app mitigation before scheduler/sysctl tuning.
5. Scale CPU only when CPU is the proven bottleneck and failover/headroom are considered.

## Anti-patterns

- killing a top-CPU process without service context
- assuming high CPU is automatically bad
- adding CPUs when I/O wait or steal time is the real problem
- changing scheduler or kernel knobs from generic tuning guides

## Validation

Recheck `mpstat`, `vmstat`, run queue, service latency/error rate, and the original hot process/thread after any mitigation. Keep rollback available for affinity, priority, cgroup, service, or capacity changes.

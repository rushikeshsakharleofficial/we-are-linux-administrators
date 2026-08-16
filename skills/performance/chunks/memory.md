# Memory pressure, OOM and cgroup diagnostics

Use this chunk after `performance` baseline evidence points to low memory headroom, OOM events, reclaim pressure, cgroup/container memory limits, slab growth, allocation stalls, or a suspected memory leak.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`.

## Golden rules

- Linux page cache is reclaimable; high buff/cache is not automatically a problem.
- Prefer `MemAvailable`, PSI, reclaim/swap activity, OOM evidence and latency over raw used RAM.
- Do not use `drop_caches` as routine remediation.
- Do not change overcommit, THP, hugepages, dirty-memory or cache-pressure sysctls without workload evidence.

## Evidence first

```bash
free -h
cat /proc/meminfo
vmstat 1 5
cat /proc/pressure/memory 2>/dev/null || true
ps -eo pid,ppid,user,comm,%mem,rss,vsz --sort=-rss | head -40
slabtop -o 2>/dev/null | head -30 || true
journalctl -k --no-pager | grep -Ei 'out of memory|oom|killed process|memory allocation|page allocation' | tail -100
systemd-cgtop -b -n1 2>/dev/null || true
```

For a known systemd service:

```bash
systemctl show <service> -p MemoryCurrent -p MemoryHigh -p MemoryMax -p MemorySwapMax -p TasksCurrent -p TasksMax
```

## Decision branches

- "RAM is full" but `MemAvailable` is healthy and no PSI/OOM/reclaim pressure exists -> explain cache; do not tune.
- host OOM -> identify victim, allocation context, top consumers and memory growth.
- cgroup/container OOM -> inspect the cgroup limit before blaming host RAM.
- sustained RSS growth -> application leak hypothesis; correlate over time.
- slab growth -> compare over time and identify subsystem before changing kernel settings.
- dirty/writeback stalls -> correlate with storage latency before memory tuning.

## Safe remediation

Emergency actions may include stopping non-critical jobs, reducing concurrency, or restarting a proven leaking non-critical service after impact review. Add temporary swap only after storage/headroom checks and route swap-specific work to `swap.md`.

Permanent fixes should prefer application leak repair, right-sizing RAM, sensible service/container limits, workload memory budgets, and monitoring of `MemAvailable`, PSI, OOM events and cgroup memory events.

## Validation

Recheck `free -h`, PSI, `vmstat`, OOM logs, service latency and the affected cgroup/process after remediation. Preserve rollback for cgroup, service, sysctl or capacity changes.

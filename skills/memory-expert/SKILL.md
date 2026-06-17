# memory-expert

Use this skill for Linux memory pressure, OOM killer, high RAM usage, page cache, slab, buffers/cache, cgroup/container memory limits, memory leaks, `free`, `/proc/meminfo`, `vmstat`, PSI, overcommit, THP, hugepages, dirty memory, `drop_caches`, and safe memory tuning.

## Role

Act like a senior Linux performance administrator. Explain memory using evidence, not myths. Linux using free RAM for cache is normal. Memory pressure must be proven using reclaim, swap activity, OOMs, PSI, latency, cgroup failures, or allocation stalls.

## Golden rules

1. Do not call page cache wasted memory.
2. Do not use `drop_caches` as routine remediation.
3. Do not tune `vm.*` values without workload evidence.
4. Do not blame RAM usage alone; identify pressure and culprit.
5. Do not kill processes without impact analysis.
6. Do not increase limits without host capacity proof.
7. Always preserve admin recovery headroom.

## Read-only evidence first

```bash
free -h
cat /proc/meminfo
vmstat 1 5
ps -eo pid,ppid,user,comm,%mem,rss,vsz --sort=-rss | head -40
top -b -n1 | head -40
slabtop -o | head -30 2>/dev/null || true
cat /proc/pressure/memory 2>/dev/null || true
dmesg -T | grep -Ei 'out of memory|oom|killed process|memory allocation failure|page allocation failure' | tail -80
journalctl -k --no-pager | grep -Ei 'oom|killed process|memory allocation|page allocation' | tail -100
sysctl vm.overcommit_memory vm.overcommit_ratio vm.overcommit_kbytes vm.swappiness vm.vfs_cache_pressure vm.dirty_ratio vm.dirty_background_ratio vm.max_map_count 2>/dev/null
```

For systemd/cgroups:

```bash
systemd-cgtop -b -n1 2>/dev/null || true
systemctl show <service> -p MemoryCurrent -p MemoryMax -p MemoryHigh -p MemorySwapMax -p TasksCurrent -p TasksMax
```

For containers:

```bash
docker stats --no-stream 2>/dev/null || true
podman stats --no-stream 2>/dev/null || true
```

## Interpretation model

- `MemAvailable` is more useful than raw `free` for immediate headroom.
- High buff/cache is usually healthy because it is reclaimable.
- Swap used is not automatically bad; swap-in/swap-out rate and latency matter.
- OOM means allocation failed under policy, limit, or pressure; inspect logs and cgroups.
- High VSZ is not necessarily high physical RAM use; prefer RSS/PSS where available.
- Slab growth can be normal or a leak; compare over time.
- Dirty memory can cause writeback stalls; tune only with evidence.
- Overcommit policy changes are high-impact and workload-specific.

## Decision tree

### User says “RAM is full”

1. Check `free -h` and `MemAvailable`.
2. If available memory is healthy, explain cache and avoid change.
3. If available memory is low, inspect RSS, slab, cgroups, swap activity, and OOM logs.
4. If no pressure indicators exist, monitor before tuning.
5. If pressure exists, create mitigation and permanent fix.

### OOM occurred

1. Extract victim and allocation context from kernel logs.
2. Determine host OOM vs cgroup/container OOM.
3. Identify top memory consumers around event time.
4. Check service/container limits.
5. Propose safe limit/capacity/application fixes.
6. Validate no repeat events.

### Page cache is blamed

Explain that page cache is reclaimable and avoid `drop_caches` except for testing/debugging.

## Safe remediation patterns

Emergency:

- Stop non-critical memory-heavy jobs.
- Add temporary swap if no swap and disk allows.
- Reduce batch concurrency.
- Restart leaking non-critical service only after impact review.
- Raise cgroup limit only if host has capacity.

Permanent:

- Right-size RAM.
- Fix application leak.
- Tune service memory limits.
- Add swap/zram with rationale.
- Tune DB/cache memory budgets.
- Monitor MemAvailable, PSI, swap `si/so`, OOM events, and cgroup memory events.

## Anti-overoptimization

Avoid defaults like:

```text
cron drop_caches
swappiness=0 everywhere
panic_on_oom=1 everywhere
overcommit_memory=2 everywhere
hugepages everywhere
THP disable everywhere
extreme vfs_cache_pressure
large slow swap as RAM substitute
```

## Output format

Always answer with:

1. Memory state summary.
2. Evidence and commands.
3. Pressure classification.
4. Culprit hypothesis.
5. Immediate safe action.
6. Permanent fix.
7. Tuning only if justified.
8. Validation.
9. Rollback.
10. Simple explanation.

Escalate to `swap-expert` for swap creation/removal/priorities/zram.

---
name: "performance"
description: "Parent performance domain for Linux CPU/load, memory/OOM, swap, latency and capacity symptoms. Collects bounded baseline evidence, identifies the failing resource layer, then loads one matching chunk."
argument-hint: "[performance symptom / process / service / host / forecast]"
effort: "high"
allowed-tools: "Read Grep Glob Bash"
---

# performance

Use this parent for high load, high CPU, host slowness, OOM/memory pressure, swap thrashing, latency regression, resource saturation, or capacity planning.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Start read-only, prove the bottleneck before tuning or scaling, define rollback/recovery before consequential changes, and validate the original symptom after remediation.

## Routing rule

Do **not** load every performance chunk. Collect the baseline evidence below, classify the condition, then load one matching chunk. Add a second chunk or specialist only when evidence proves a cross-layer issue.

| Proven condition | Load |
|---|---|
| CPU saturation, run queue, steal, softirq, scheduler/thread pressure | `chunks/cpu.md` |
| low memory headroom, OOM, reclaim/PSI, cgroup limit, leak/slab pressure | `chunks/memory.md` |
| swap file/partition, zram/zswap, active swap pressure, swap sizing/priorities | `chunks/swap.md` |
| trend/forecast/headroom/vertical-vs-horizontal scaling decision | `chunks/capacity-planning.md` |
| `too many open files`, nproc, memlock, PAM/systemd `Limit*`, resource-ceiling security review | keep `limits-expert` as a distinct specialist |
| high load with idle CPU and blocked `D` tasks / proven storage latency | route to `storage` or relevant storage specialist |
| unknown slowness | remain in this baseline flow until the resource layer is proven |

## Bounded baseline evidence

```bash
uptime
nproc
free -h
swapon --show
vmstat 1 5
top -H -b -n1 | head -80
ps -eo pid,ppid,user,stat,comm,%cpu,%mem,rss,vsz --sort=-%cpu | head -30
ps -eo pid,ppid,user,stat,comm,%cpu,%mem,rss,vsz --sort=-%mem | head -30
pidstat 1 5 2>/dev/null || true
iostat -xz 1 5 2>/dev/null || true
mpstat -P ALL 1 3 2>/dev/null || true
cat /proc/pressure/cpu 2>/dev/null || true
cat /proc/pressure/memory 2>/dev/null || true
cat /proc/pressure/io 2>/dev/null || true
journalctl -k -g 'Out of memory|oom|oom-kill|soft lockup|hard LOCKUP|blocked for more than' -n 100 --no-pager 2>/dev/null || true
systemd-cgtop --iterations=3 2>/dev/null || true
```

## Baseline interpretation

- one process/thread dominates CPU -> CPU chunk
- runnable queue sustained well above CPU count -> CPU chunk
- high steal -> CPU chunk plus hypervisor/cloud escalation context
- low `MemAvailable`, OOM/reclaim/PSI or cgroup memory events -> memory chunk
- sustained swap-in/swap-out and latency -> swap chunk, usually with memory evidence
- high load, idle CPU and many `D` tasks -> I/O/storage/network-storage branch, not CPU tuning
- one cgroup dominates -> identify whether CPU, memory, task or explicit limit is responsible before routing
- capacity question without trend data -> request summarized peak/sustained trends rather than guessing

## Safety and anti-overoptimization

Do not kill processes blindly, clear caches routinely, disable swap globally, change scheduler/sysctl tuning from blog recipes, or add CPU/RAM before the bottleneck is proven. Separate emergency mitigation from permanent design.

For risky service, cgroup, sysctl or capacity changes, record the current value/config, backup or snapshot where applicable, define restore commands and validate service SLO/error rate as well as host metrics.

## Validation

Re-run only the evidence relevant to the chosen branch and confirm the original user-visible symptom improved. If the metric moved but service latency/errors did not, the diagnosis is incomplete.

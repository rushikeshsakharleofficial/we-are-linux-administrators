# Sysctl Expert Anti-Overoptimization Guide

The goal is a stable, understandable system, not a giant sysctl.conf.

## Common bad patterns

| Bad pattern | Why it is harmful | Better approach |
|---|---|---|
| Cron job running `echo 3 > /proc/sys/vm/drop_caches` | Destroys useful cache and causes extra I/O/CPU to rebuild it. | Fix memory pressure, leaks, service sizing, and cache behavior. Use drop_caches only in controlled tests. |
| Setting `vm.swappiness=0` everywhere | Can delay swap until severe pressure and cause sudden reclaim/OOM behavior. | Choose based on swap device speed and workload; `10-30` only for latency-sensitive disk-swap systems. |
| Huge `net.core.rmem_default/wmem_default` | Multiplies memory use across many sockets. | Raise max caps first; let TCP autotuning and app settings handle active flows. |
| `net.ipv4.tcp_tw_reuse=1` globally | Can create subtle protocol/NAT issues; kernel docs warn not to change without expert advice. | Keep default loopback-only `2` unless measured and reviewed. |
| `net.ipv4.tcp_abort_on_overflow=1` | Resets clients when accept queue overflows; can harm users. | Tune app accept rate, backlog, workers, CPU, and file limits first. |
| Reducing `tcp_fin_timeout` aggressively | Hides application connection lifecycle issues. | Diagnose app and peer behavior with `ss -ant state`. |
| Disabling `tcp_syncookies` | Removes a SYN flood fallback. | Keep enabled; tune capacity separately. |
| Blanket `net.ipv4.ip_forward=1` | Turns host into router and resets IPv4 config defaults. | Enable only on routers/VPN/NAT hosts; apply security settings after. |
| Strict `rp_filter=1` everywhere | Breaks asymmetric routing, VPN, multihoming, and some cloud networking. | Use loose `2` or per-interface policy based on routing design. |
| `vm.vfs_cache_pressure=0` | Can prevent reclaim of inode/dentry caches and lead to OOM. | Keep default or adjust mildly for metadata-heavy workloads with evidence. |
| Very high `vm.dirty_ratio` on large RAM | Can cause long writeback stalls and data flush latency. | Use bytes-based dirty limits for huge-memory systems if needed. |
| Raising `fs.file-max` only | Does not fix per-process/systemd/application file limits. | Check `/proc/PID/limits`, systemd `LimitNOFILE`, app configs, and kernel logs. |
| Copying cloud vendor tunings blindly | Kernel versions, NICs, workloads, and memory sizes differ. | Benchmark, change one lever, validate, rollback. |

## Good tuning questions

Ask these before any change:

1. What exact symptom is being solved?
2. Which metric proves this sysctl is the bottleneck?
3. What is the current value and distro/kernel default?
4. What is the smallest change likely to help?
5. What breaks if the value is too high or too low?
6. Is a service/app/systemd limit the real fix?
7. How will we validate in 5 minutes, 1 hour, and after reboot?
8. What is the rollback command?

## Explain-value rule

Every recommended value must say:

- Why not lower.
- Why not higher.
- Why it fits this host role.
- What evidence would make us remove it.

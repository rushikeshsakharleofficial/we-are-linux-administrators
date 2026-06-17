# Sysctl Expert Parameter Catalog

This catalog is a practical map for AI-assisted Linux administration. It is not a substitute for live discovery with `sysctl -a` because sysctls are kernel/module/runtime dependent.

## Namespace map

| Namespace | Main use |
|---|---|
| `kernel.*` | Core kernel behavior, panic/oops, lockup detectors, perf, module and pointer exposure controls. |
| `vm.*` | Memory management, swap policy, dirty page writeback, OOM behavior, mmap, hugepages, reclaim. |
| `fs.*` | File handles, inode/dentry metadata, pipe limits, protected links/FIFOs, core dump security. |
| `net.core.*` | Socket buffers, backlog, NAPI budget, network core behavior. |
| `net.ipv4.*` | IPv4, TCP, routing, SYN backlog, ephemeral ports, TCP buffers and timers. |
| `net.ipv6.*` | IPv6 forwarding, redirects, RA behavior, per-interface IPv6 controls. |
| `net.bridge.*` | Bridge netfilter behavior when `br_netfilter` is loaded. |
| `user.*` | Per-user namespace limits. |
| `sunrpc.*` | NFS/RPC runtime controls. |
| `dev.*` | Device-specific controls exposed by drivers/subsystems. |

## High-value `kernel.*` keys

| Parameter | Use | Safe guidance |
|---|---|---|
| `kernel.dmesg_restrict` | Restrict unprivileged access to kernel logs. | `1` on shared/production servers unless developers need unprivileged dmesg. |
| `kernel.kptr_restrict` | Restrict exposure of kernel pointers. | `2` for hardened production, `1` if privileged debugging needs pointers. |
| `kernel.yama.ptrace_scope` | Restrict ptrace between processes. | `1` or `2` for hardening; check debuggers, APM, crash tooling. |
| `kernel.sysrq` | Magic SysRq emergency controls. | `0` on most exposed systems; selective bitmask only when operations require crash dump/recovery workflows. |
| `kernel.panic` | Auto-reboot after panic. | Use with watchdog/HA; avoid blind reboot loops without kdump/logging. |
| `kernel.panic_on_oops` | Panic on kernel oops. | Useful in HA/kdump environments; risky on single servers. |
| `kernel.hung_task_timeout_secs` | Detect tasks stuck in D state. | Keep default unless noisy; do not disable to hide storage problems. |
| `kernel.perf_event_paranoid` | Limit perf event access. | Harden if multi-user; loosen only for profiling window. |
| `kernel.unprivileged_bpf_disabled` | Restrict unprivileged BPF. | Prefer enabled on production if workload does not require unprivileged BPF. |
| `kernel.io_uring_disabled` | Disable or restrict io_uring. | Security hardening only after checking databases, proxies, runtimes. |

## High-value `vm.*` keys

| Parameter | Use | Safe guidance |
|---|---|---|
| `vm.swappiness` | Relative cost preference between swap and file cache reclaim. | Default is often fine. `10-30` for disk-swap latency-sensitive DB/cache hosts; `100+` only when zram/zswap is faster than filesystem IO. |
| `vm.dirty_background_ratio` / `vm.dirty_background_bytes` | Start background writeback. | Use bytes on large RAM systems for predictable limits; adjust only after writeback stalls. |
| `vm.dirty_ratio` / `vm.dirty_bytes` | Throttle writers when dirty memory high. | Avoid very high values; can cause long stalls. Use bytes for huge-memory DB/file servers. |
| `vm.dirty_expire_centisecs` | Age before dirty data is writeback-eligible. | Leave default unless specific writeback latency requirement. |
| `vm.dirty_writeback_centisecs` | Flusher wake interval. | Do not set to `0` except special testing; disables periodic writeback. |
| `vm.vfs_cache_pressure` | Reclaim tendency for inode/dentry cache. | Default fair value is safest. Lower only for metadata-heavy file servers with enough RAM; never `0` in production. |
| `vm.max_map_count` | Max memory map areas per process. | Raise for Elasticsearch/OpenSearch, some JVM/monitoring stacks, mmap-heavy workloads. Do not raise blindly. |
| `vm.overcommit_memory` | Memory allocation policy. | `0` default heuristic is usually safest. `1` for apps requiring optimistic allocation; `2` for strict accounting with calculated reserves. |
| `vm.min_free_kbytes` | Free memory watermark base. | Let kernel choose unless network/storage driver allocation failures are proven. Too high wastes RAM. |
| `vm.zone_reclaim_mode` | NUMA local reclaim before remote memory. | Leave `0` for most file/cache workloads; enabling can hurt cache-heavy apps. |
| `vm.drop_caches` | Drop clean cache for testing. | Debug/testing only. Never cron. Never call it performance tuning. |

## High-value `fs.*` keys

| Parameter | Use | Safe guidance |
|---|---|---|
| `fs.file-max` | System-wide max file handles. | Raise only if kernel logs show `VFS: file-max limit ... reached`; also fix service `LimitNOFILE` and app limits. |
| `fs.file-nr` | Current file handle state. | Read-only diagnostic. Use before changing `file-max`. |
| `fs.nr_open` | Per-process ceiling for file handles. | Usually default `1048576` is enough; process limit still controlled by RLIMIT/systemd. |
| `fs.protected_hardlinks` | Hardlink race hardening. | `1` on production. |
| `fs.protected_symlinks` | Symlink TOCTOU hardening. | `1` on production. |
| `fs.protected_fifos` | FIFO hardening in sticky dirs. | `2` for stronger hardening if compatible. |
| `fs.protected_regular` | Regular file hardening in sticky dirs. | `2` for stronger hardening if compatible. |
| `fs.suid_dumpable` | Core dump behavior for privileged binaries. | Keep restrictive unless crash collection is intentionally designed. |
| `fs.aio-max-nr` | Async IO request ceiling. | Raise only when DB/app logs show AIO exhaustion. |

## High-value `net.core.*` keys

| Parameter | Use | Safe guidance |
|---|---|---|
| `net.core.somaxconn` | Max `listen()` backlog. | Modern Linux default is commonly `4096`. Raise only if app uses matching backlog and SYN/accept queue evidence supports it. |
| `net.core.netdev_max_backlog` | Packets queued when NIC receives faster than kernel can process. | Raise only with RX drops/softnet backlog evidence; also check IRQ/RPS/NIC rings/CPU. |
| `net.core.rmem_max` / `net.core.wmem_max` | Max socket receive/send buffers. | Raise for high bandwidth-delay product flows after throughput testing. Too high wastes memory under many sockets. |
| `net.core.rmem_default` / `net.core.wmem_default` | Default socket buffers. | Avoid big defaults on high-connection-count servers. Prefer app-level buffers when possible. |
| `net.core.netdev_budget` / `net.core.netdev_budget_usecs` | NAPI poll budget. | Tune only with packet processing latency/drops evidence. |
| `net.core.busy_poll` / `busy_read` | Busy polling. | Low-latency specialized workloads only; increases CPU/power. |

## High-value `net.ipv4.*` and TCP keys

| Parameter | Use | Safe guidance |
|---|---|---|
| `net.ipv4.ip_forward` | Enable routing between interfaces. | Only for routers/VPN/NAT/LB. Changing it resets IPv4 host/router config defaults, so apply carefully. |
| `net.ipv4.tcp_syncookies` | SYN flood fallback. | Keep enabled unless a very specific stack reason exists. It is not a substitute for capacity tuning. |
| `net.ipv4.tcp_max_syn_backlog` | Half-open connection queue. | Raise for SYN_RECV pressure with enough memory; also check `somaxconn`. |
| `net.ipv4.tcp_abort_on_overflow` | Reset when accept queue overflows. | Usually keep `0`; enabling can harm clients. Fix app accept rate first. |
| `net.ipv4.ip_local_port_range` | Ephemeral outbound port range. | Widen for high outbound connection clients/proxies if port exhaustion is observed. |
| `net.ipv4.tcp_tw_reuse` | Reuse TIME_WAIT sockets when safe. | Default loopback-only `2` is safest. Avoid global `1` unless expert-approved and measured. |
| `net.ipv4.tcp_rmem` / `tcp_wmem` | TCP autotuning min/default/max buffers. | Max can be raised for long fat networks; do not inflate defaults for many-connection services. |
| `net.ipv4.tcp_fin_timeout` | FIN-WAIT-2 timeout. | Do not aggressively lower to hide application connection leaks. |
| `net.ipv4.conf.*.rp_filter` | Reverse path filtering. | Strict `1` can break asymmetric routing/VPN/multihoming. Loose `2` often safer for edge hosts. |
| `net.ipv4.conf.*.accept_redirects` | ICMP redirects. | Disable on servers/routers unless explicitly needed. |
| `net.ipv4.conf.*.send_redirects` | Send ICMP redirects. | Disable on non-router servers; router behavior depends on design. |
| `net.ipv4.conf.*.accept_source_route` | Source routing. | Disable. |

## High-value `net.ipv6.*` keys

| Parameter | Use | Safe guidance |
|---|---|---|
| `net.ipv6.conf.*.disable_ipv6` | Disable IPv6. | Avoid blanket disabling; it can break apps. Prefer firewall/routing controls. |
| `net.ipv6.conf.*.forwarding` | IPv6 routing. | Routers/VPN only; affects RA behavior. |
| `net.ipv6.conf.*.accept_ra` | Router Advertisements. | Servers with static addressing usually disable; clients usually enable. |
| `net.ipv6.conf.*.accept_redirects` | ICMPv6 redirects. | Disable on most servers. |

## `net.bridge.*` keys

Appear only when `br_netfilter` is loaded. Kubernetes commonly requires bridge packets to pass iptables/nftables hooks; plain bridge workloads may not. Do not force-load `br_netfilter` unless the platform requires it.

## Parameters that require extra caution

- `vm.drop_caches`: testing only, not performance tuning.
- `vm.panic_on_oom`: HA/kdump only; can crash host.
- `kernel.modules_disabled`: once set to `1`, module loading is disabled until reboot.
- `kernel.kexec_load_disabled`: can be one-way restrictive depending on kernel.
- `net.ipv4.tcp_abort_on_overflow`: can harm clients.
- `net.ipv4.tcp_tw_reuse=1`: expert-only.
- `net.ipv4.ip_forward`: changes routing role and resets IPv4 defaults.
- Huge socket buffer defaults: memory blow-up on high connection counts.
- `vm.overcommit_memory=1/2`: app-specific; can either avoid false ENOMEM or cause harder OOM behavior if misunderstood.

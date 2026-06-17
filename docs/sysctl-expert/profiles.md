# Sysctl Expert Safe Profiles

These are conservative templates. They are not meant to be pasted blindly. The agent must remove lines that do not fit the host role and explain every retained value.

## Profile 1: Baseline production server hardening

Use for normal Linux servers that are not routers. Low performance risk.

```conf
# /etc/sysctl.d/70-linux-admin-baseline.conf
# Purpose: conservative kernel/network hardening for general production servers.
# Rollback: remove this file and run: sysctl --system

# Restrict unprivileged kernel log access.
kernel.dmesg_restrict = 1

# Hide kernel pointers from unprivileged users. Use 1 instead of 2 if privileged crash/debug workflows need visibility.
kernel.kptr_restrict = 2

# Reduce ptrace abuse. Optional because Yama may be absent on some kernels.
-kernel.yama.ptrace_scope = 1

# Restrict low-level performance event access for normal users. Use a less strict value only for profiling hosts.
-kernel.perf_event_paranoid = 2

# Restrict unprivileged eBPF when supported. Some observability stacks may need an exception.
-kernel.unprivileged_bpf_disabled = 1

# Disable Magic SysRq on exposed servers. Use a selective bitmask only when operations need emergency crash/reboot keys.
kernel.sysrq = 0

# Harden common sticky-directory race classes.
fs.protected_hardlinks = 1
fs.protected_symlinks = 1
-fs.protected_fifos = 2
-fs.protected_regular = 2

# Avoid setuid program core dumps. Coordinate with crash-dump policy before changing on debugging hosts.
fs.suid_dumpable = 0

# Keep low memory mappings blocked. 65536 is common on modern hardened hosts.
vm.mmap_min_addr = 65536

# Avoid accepting redirect/source-route behavior on ordinary servers.
net.ipv4.conf.default.accept_redirects = 0
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.secure_redirects = 0
net.ipv4.conf.all.secure_redirects = 0
net.ipv4.conf.default.accept_source_route = 0
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.default.send_redirects = 0
net.ipv4.conf.all.send_redirects = 0

# Anti-spoofing for normal single-homed servers. Use loose mode for VPN/asymmetric routing hosts.
net.ipv4.conf.default.rp_filter = 1
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.log_martians = 1
net.ipv4.conf.all.log_martians = 1

# ICMP hygiene.
net.ipv4.icmp_echo_ignore_broadcasts = 1
net.ipv4.icmp_ignore_bogus_error_responses = 1

# Keep SYN cookies enabled as a resilience fallback. This does not replace capacity planning.
net.ipv4.tcp_syncookies = 1

# IPv6 redirect/source-route hardening when IPv6 is enabled.
-net.ipv6.conf.default.accept_redirects = 0
-net.ipv6.conf.all.accept_redirects = 0
-net.ipv6.conf.default.accept_source_route = 0
-net.ipv6.conf.all.accept_source_route = 0
```

Do not apply this blindly on routers, VPN gateways, lab machines needing permissive debugging, developer workstations, or hosts with observability tools that require profiling/eBPF exceptions.

## Profile 2: Security audit review matrix

Use this matrix in reports before producing a sysctl.d file. Mark each parameter as OK, gap, not applicable, unavailable, or role exception.

```text
Kernel exposure:
- kernel.dmesg_restrict
- kernel.kptr_restrict
- kernel.yama.ptrace_scope
- kernel.perf_event_paranoid
- kernel.unprivileged_bpf_disabled
- kernel.sysrq

Filesystem/userland protections:
- fs.protected_hardlinks
- fs.protected_symlinks
- fs.protected_fifos
- fs.protected_regular
- fs.suid_dumpable
- vm.mmap_min_addr

IPv4 path hardening:
- net.ipv4.conf.{all,default}.accept_redirects
- net.ipv4.conf.{all,default}.secure_redirects
- net.ipv4.conf.{all,default}.send_redirects
- net.ipv4.conf.{all,default}.accept_source_route
- net.ipv4.conf.{all,default}.rp_filter
- net.ipv4.conf.{all,default}.log_martians

IPv6 path hardening:
- net.ipv6.conf.{all,default}.accept_redirects
- net.ipv6.conf.{all,default}.accept_source_route
- net.ipv6.conf.{all,default}.forwarding

Protocol resilience:
- net.ipv4.tcp_syncookies
- net.ipv4.icmp_echo_ignore_broadcasts
- net.ipv4.icmp_ignore_bogus_error_responses
```

Always document host role exceptions. For example, router/VPN hosts may need forwarding and different RPF behavior; Kubernetes/CNI nodes may need bridge-related settings; monitoring/profiling hosts may need less restrictive profiling settings.

## Profile 3: Web/API/load balancer candidate

Use only after evidence of accept/SYN queue pressure, high inbound traffic, or local port exhaustion.

```conf
# /etc/sysctl.d/70-linux-admin-web.conf
# Validate with: ss -s; nstat -az; journalctl/dmesg for SYN/overflow messages.

# Modern Linux often already defaults to 4096. Raise modestly only if app backlog also supports it.
net.core.somaxconn = 8192

# Half-open SYN queue. Each SYN_RECV request consumes memory; do not raise endlessly.
net.ipv4.tcp_max_syn_backlog = 8192

# Keep syncookies as fallback. This is not capacity tuning.
net.ipv4.tcp_syncookies = 1

# Keep overflow reset disabled unless the daemon cannot be tuned and clients prefer fast failure.
net.ipv4.tcp_abort_on_overflow = 0

# For high outbound proxy/client behavior if ephemeral ports are exhausted.
net.ipv4.ip_local_port_range = 1024 65000

# Prefer loopback-only TIME_WAIT reuse. Avoid global 1 unless expert-approved.
net.ipv4.tcp_tw_reuse = 2
```

Also verify application settings: Nginx/HAProxy backlog, worker limits, `ulimit -n`, systemd `LimitNOFILE`, CPU saturation, and upstream health.

## Profile 4: High-throughput network candidate

Use only after throughput tests show socket buffer caps are the bottleneck. Good for high bandwidth-delay product links, not for every web server.

```conf
# /etc/sysctl.d/70-linux-admin-high-throughput-net.conf
# Validate with iperf3, ss -ti, retransmits, memory usage per socket.

net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.tcp_rmem = 4096 131072 16777216
net.ipv4.tcp_wmem = 4096 16384 16777216

# Only if RX backlog drops are proven and CPU/IRQ/NIC ring tuning is checked.
net.core.netdev_max_backlog = 5000
```

Do not inflate defaults on high-connection-count servers; max values are safer than huge defaults.

## Profile 5: Database/cache candidate

Use after checking DB memory settings, cgroup limits, OOM logs, disk latency, and swap device type.

```conf
# /etc/sysctl.d/70-linux-admin-db-candidate.conf
# Conservative latency-sensitive DB/cache host with disk-backed swap.

# Lower swap preference when swap is slower than filesystem IO. Do not set 0 blindly.
vm.swappiness = 10

# Only tune dirty ratios if writeback stalls or long fsync/write latency are observed.
# These are moderate ratio values; for very large RAM hosts prefer dirty_bytes instead.
vm.dirty_background_ratio = 5
vm.dirty_ratio = 20
```

Do not use this for zram/zswap-heavy systems without recalculating swappiness. For PostgreSQL, MySQL, Redis, or TimescaleDB, application memory and storage tuning usually matter more than sysctl.

## Profile 6: Router/VPN/NAT host candidate

Apply only on intentional routing hosts. Important: set forwarding first, then interface hardening, because changing `net.ipv4.ip_forward` resets IPv4 host/router defaults.

```conf
# /etc/sysctl.d/70-linux-admin-router-vpn.conf
# Purpose: explicit router/VPN/NAT role only.

net.ipv4.ip_forward = 1
-net.ipv6.conf.all.forwarding = 1

# Loose RPF is often safer for VPN/asymmetric routing than strict RPF.
net.ipv4.conf.default.rp_filter = 2
net.ipv4.conf.all.rp_filter = 2

# Do not accept source routes.
net.ipv4.conf.default.accept_source_route = 0
net.ipv4.conf.all.accept_source_route = 0

# Redirect behavior depends on design. Disable for most controlled router/VPN hosts.
net.ipv4.conf.default.accept_redirects = 0
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.send_redirects = 0
net.ipv4.conf.all.send_redirects = 0
-net.ipv6.conf.default.accept_redirects = 0
-net.ipv6.conf.all.accept_redirects = 0
```

Validate firewall/NAT rules, route tables, MTU/MSS, IPv6 policy, and anti-spoofing before and after.

## Profile 7: Container/Kubernetes host candidate

Use only when your CNI/Kubernetes requirements demand bridge netfilter. Do not force-load `br_netfilter` for plain Docker unless needed.

```conf
# /etc/sysctl.d/70-linux-admin-containers.conf
# Optional keys because they exist only when br_netfilter is loaded.

-net.bridge.bridge-nf-call-iptables = 1
-net.bridge.bridge-nf-call-ip6tables = 1
-net.ipv4.ip_forward = 1
```

Validate with CNI documentation, `lsmod | grep br_netfilter`, pod networking, service routing, and firewall backend.

## Profile 8: Low-memory VPS

The safest low-memory tuning is usually service sizing, not sysctl. Avoid heavy kernel cache flushing.

```conf
# /etc/sysctl.d/70-linux-admin-low-memory.conf
# Use only after checking OOM logs and service memory.

# Moderate lower swap tendency for disk-backed swap. Keep some swap available for burst tolerance.
vm.swappiness = 20
```

Do not set `vm.drop_caches` in cron. Do not reduce `vfs_cache_pressure` too low on tiny hosts. Fix PHP-FPM, MySQL, JVM, container limits first.

## Profile 9: Monitoring/Zabbix/observability server candidate

Sysctl should be minimal. Zabbix/PostgreSQL/TimescaleDB performance usually depends more on DB schema, TimescaleDB compression, DB memory, storage IOPS, poller/proxy distribution, and housekeeping.

Candidate only if evidence supports it:

```conf
# /etc/sysctl.d/70-linux-admin-monitoring.conf

# Useful only when JVM/OpenSearch/Elasticsearch components exist, not pure Zabbix server.
-vm.max_map_count = 262144

# Only if file handle exhaustion is proven and systemd/app limits are also raised.
# fs.file-max = <calculated_value>
```

Do not add large network buffers or aggressive VM changes without queue/drop/writeback evidence.

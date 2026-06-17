# Sysctl Expert Decision Trees

## Network connection backlog

```text
Symptom: connection refused, SYN_RECV spikes, accept queue overflow, HAProxy/Nginx backlog warnings
  -> Check service CPU saturation and worker count
  -> Check app listen backlog / server backlog setting
  -> Check file descriptor limits
  -> Check ss -lntp Send-Q/Recv-Q and nstat TCP counters
  -> If kernel queue cap is bottleneck:
       consider net.core.somaxconn modest raise
       consider net.ipv4.tcp_max_syn_backlog modest raise
       keep tcp_syncookies=1
       do not enable tcp_abort_on_overflow unless clients prefer fast fail and app cannot be fixed
```

## Memory pressure / swapping

```text
Symptom: latency spikes, swap activity, OOM, page reclaim high
  -> Check cgroup limits, app memory, leaks, DB buffer/cache settings
  -> Check swap type: disk, SSD, zram, zswap
  -> Check vmstat si/so, PSI if available, /proc/meminfo, OOM logs
  -> If disk swap hurts latency:
       test vm.swappiness 10-30
  -> If zram/zswap is faster than filesystem paging:
       consider higher than 100 only with measurement
  -> Never set drop_caches as a fix
```

## File descriptor exhaustion

```text
Symptom: Too many open files, accept failures, DB connection errors
  -> Check process limit: /proc/PID/limits
  -> Check systemd unit LimitNOFILE
  -> Check app max connections and leaks
  -> Check /proc/sys/fs/file-nr and kernel logs for file-max reached
  -> Raise service limits first
  -> Raise fs.file-max only if system-wide kernel limit is reached
```

## Router/VPN/NAT enablement

```text
Need routing/VPN/NAT
  -> Confirm host role and firewall policy
  -> Snapshot current net.ipv4.conf.* settings
  -> Enable net.ipv4.ip_forward=1 first
  -> Reapply/validate redirect, rp_filter, source-route, firewall/NAT, MTU/MSS
  -> Validate route paths and asymmetric routing
```

## Writeback stalls

```text
Symptom: blocked tasks, high await, fsync/write latency, dirty pages high
  -> Check iostat, vmstat, /proc/vmstat, storage health
  -> Check application write bursts and DB checkpointing
  -> On large RAM hosts consider dirty_bytes/dirty_background_bytes instead of ratios
  -> Avoid huge dirty_ratio values
```

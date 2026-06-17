# networking-expert anti-overoptimization

## Do not blindly apply

```text
net.ipv4.tcp_tw_reuse = 1
net.ipv4.tcp_fin_timeout = 5
net.core.rmem_max = huge
net.core.wmem_max = huge
net.ipv4.tcp_rmem = huge huge huge
net.ipv4.tcp_wmem = huge huge huge
net.ipv4.tcp_abort_on_overflow = 1
net.ipv4.conf.all.rp_filter = 0
ethtool -K <iface> tso off gso off gro off
nft flush ruleset
```

## Why

- TIME_WAIT is usually not the root problem.
- Huge buffers can increase memory use and latency.
- Aborting listen overflow can make clients fail faster instead of allowing recovery.
- Disabling reverse-path filtering may weaken anti-spoofing unless asymmetric routing requires it.
- Disabling offloads can increase CPU cost and reduce throughput.
- Flushing firewall can lock out remote access.

## Good tuning pattern

```text
Symptom -> counter proving bottleneck -> smallest change -> validation -> rollback
```

Example:

```text
Symptom: new connections timeout during traffic spikes
Evidence: ListenOverflows increasing; app accept loop healthy; queue max low
Change: raise app backlog and net.core.somaxconn moderately
Why not higher: memory/queue latency; only observed peak requires X + margin
Rollback: restore previous app backlog/sysctl
```

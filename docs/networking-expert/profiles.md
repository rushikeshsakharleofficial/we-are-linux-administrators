# Conservative networking profiles

These profiles describe what to inspect and when to tune. They are not global copy-paste sysctl sets.

## Web/API/load balancer

- Inspect listen queues, SYN_RECV, app backlog, worker count, `somaxconn`, `tcp_max_syn_backlog`.
- Raise backlog only if `ListenOverflows`/`ListenDrops` or SYN backlog evidence exists.
- Keep firewall changes narrow.

## Database server

- Network tuning is usually secondary to DB max connections, pooling, and latency.
- Check packet loss, MTU, DNS reverse lookup delays, and firewall state.
- Avoid huge TCP buffers unless high bandwidth-delay product is proven.

## Router/VPN/NAT host

- Check `ip_forward`, nft/iptables NAT rules, conntrack usage, route symmetry, MTU/MSS clamp.
- Size conntrack based on memory and expected concurrent flows.
- Keep rollback console access.

## Container/Kubernetes host

- Include CNI, bridges, veth pairs, kube-proxy/nft/iptables mode, conntrack, MTU overlay overhead.
- Do not tune host only; pod namespace path may differ.

## Monitoring/Zabbix/proxy host

- Check many outbound TCP sessions, DNS latency, ephemeral port usage, DB connectivity, proxy queues.
- Tune application pollers/cache before kernel networking.

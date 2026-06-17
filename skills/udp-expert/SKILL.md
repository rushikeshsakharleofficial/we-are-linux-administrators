# UDP Expert

Command namespace: `/linux-admin:udp-expert`

Use this skill for UDP datagrams, DNS/NTP/syslog/RADIUS/SNMP/VoIP/VPN behavior, packet loss, receive buffer drops, fragmentation, PMTU, conntrack/NAT timeout, socket buffers, multicast/broadcast, and capture-based proof.

## Operating rules

- Keep TCP and UDP analysis separate; do not apply TCP mental models to UDP.
- Read-only first: sockets, counters, routes, interface stats, firewall/conntrack context, and packet captures.
- Packet capture recommendations must be scoped and safe: specify interface, host, port, count, and duration.
- Do not recommend sysctl tuning without observed evidence and rollback.
- Route firewall rule changes to `firewall-expert`, general routes/interfaces to `networking-expert`, kernel sysctls to `sysctl-expert`, and app/service restarts to `systemd-expert`.
- If built-in knowledge is insufficient, research official Linux docs, kernel docs, man pages, and strong network engineering community references.

## Start with audit helper

```bash
udp-expert-audit
```

## Manual evidence commands

```bash
ss -uapn 2>/dev/null | head -200 || ss -uan | head -200
ss -u -i -a 2>/dev/null | head -200 || true
sysctl net.ipv4.udp_mem net.ipv4.udp_rmem_min net.ipv4.udp_wmem_min net.core.rmem_default net.core.rmem_max net.core.netdev_max_backlog net.ipv4.ipfrag_high_thresh net.ipv4.ipfrag_time 2>/dev/null || true
ip -s link
ip -s -s neigh show 2>/dev/null | head -120 || true
nstat -az 2>/dev/null | grep -Ei "Udp|Ip.*Frag|InErrors|Rcvbuf|NoPorts|InCsumErrors" | head -160 || true
netstat -su 2>/dev/null || true
conntrack -S 2>/dev/null || true
```

## UDP-specific reasoning

UDP is message-oriented and connectionless. There is no handshake, retransmission, stream ordering, or built-in congestion control. Diagnose with packet counters, application behavior, socket receive queues, firewall/NAT/conntrack, fragmentation, and captures.

## Evidence-first commands

- `ss -uapn` for UDP sockets and owning process.
- `netstat -su` or `nstat -az` for receive errors, no-port, buffer errors, checksum errors, fragment issues.
- `tcpdump -nn -vv -i IFACE 'udp and host X and port Y'` for datagram proof.
- `conntrack -L -p udp` / `conntrack -S` for NAT/firewall tracking when relevant.
- `ip -s link` for RX drops/errors before blaming the app.

## Playbooks

### DNS/UDP intermittent failure
1. Check local listener with `ss -lunp`.
2. Capture query and response.
3. Check truncation/fallback to TCP for large answers.
4. Inspect firewall/conntrack/NAT timeouts and EDNS/MTU behavior.

### UDP packet loss
1. Compare NIC drops, kernel UDP errors, app receive queue, and application logs.
2. Increase socket/app buffers only when drops prove buffer pressure.
3. Check CPU softirq and NIC ring/offload if drops happen before socket delivery.

### Fragmentation problems
UDP fragmentation is fragile across firewalls/NAT. Prefer application payload sizing, EDNS buffer tuning, VPN MTU/MSS strategy, or TCP fallback instead of raising fragment queues blindly.

### One-way traffic
Check asymmetric routing, source IP binding, firewall statefulness, conntrack timeout, and NAT mappings. UDP replies often fail because return path/policy is wrong.

## Anti-overoptimization

Do not simply raise UDP buffers globally. Explain whether loss is at NIC, backlog, socket rcvbuf, application processing, conntrack, or network path. Tune only the layer with evidence.


## Output format

1. Protocol-specific diagnosis: TCP or UDP
2. Current evidence
3. State/counter interpretation
4. Packet-flow hypothesis
5. Minimal safe test/capture
6. Proposed fix
7. Rollback
8. Validation

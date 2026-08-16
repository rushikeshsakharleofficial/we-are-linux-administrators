# UDP diagnostics

Load this chunk only when evidence points to UDP datagram loss, socket queues, DNS/NTP/syslog/RADIUS/SNMP/VoIP/VPN traffic, fragmentation, PMTU, conntrack/NAT timeout, multicast/broadcast, or UDP-specific buffer pressure.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. UDP is connectionless; do not apply TCP handshake or retransmission assumptions.

## Evidence

```bash
ss -uapn 2>/dev/null | head -200 || ss -uan | head -200
ss -u -i -a 2>/dev/null | head -200 || true
nstat -az 2>/dev/null | grep -Ei 'Udp|Ip.*Frag|InErrors|Rcvbuf|NoPorts|InCsumErrors' | head -160 || true
netstat -su 2>/dev/null || true
ip -s link
conntrack -S 2>/dev/null || true
```

Inspect only relevant buffer/fragment settings when the evidence points there:

```bash
sysctl net.ipv4.udp_mem net.ipv4.udp_rmem_min net.ipv4.udp_wmem_min \
  net.core.rmem_default net.core.rmem_max net.core.netdev_max_backlog \
  net.ipv4.ipfrag_high_thresh net.ipv4.ipfrag_time 2>/dev/null || true
```

## Condition map

| Signal | Interpretation | Next action |
|---|---|---|
| `RcvbufErrors`/socket drops rise | receive path/app processing pressure | correlate app queue, CPU and NIC counters |
| `NoPorts` rises | datagrams reach host but no listener | verify service/socket binding |
| one-way UDP | return route, source binding, firewall/NAT/conntrack issue | compare both directions and state timeout |
| fragmentation counters/errors | payload/MTU/path issue | inspect MTU and application payload size |
| DNS intermittently fails | truncation, EDNS, NAT timeout or loss possible | capture query/response and TCP fallback |
| NIC RX drops rise | loss before socket delivery | inspect ring/softirq/interface health before buffer tuning |

## Focused playbooks

### UDP packet loss
1. Compare NIC drops, kernel UDP errors, app receive queue, and application logs.
2. Identify whether loss occurs at NIC, backlog, socket buffer, application, conntrack, or network path.
3. Increase buffers only when that exact layer shows pressure.

### DNS/UDP intermittent failure
Confirm listener, capture a small query/response sample, check truncation and TCP fallback, then inspect firewall/NAT/conntrack and MTU/EDNS behaviour.

### Fragmentation
UDP fragmentation is fragile across firewalls and NAT. Prefer payload sizing, EDNS tuning, VPN MTU strategy, or protocol fallback rather than blindly increasing fragment queues.

## Anti-patterns

- assuming UDP has handshake/retransmission semantics
- globally increasing UDP buffers without drop evidence
- ignoring NAT/conntrack expiry on sparse traffic
- using unbounded packet captures

## Output

Return: UDP-specific evidence, loss layer, packet-flow hypothesis, smallest test, proposed fix, rollback, and validation.
# TCP diagnostics

Load this chunk only when evidence points to TCP connection lifecycle, SYN/listen queues, retransmits, RTO, MSS/MTU/PMTUD, congestion control, socket states, buffers, or TCP-specific load-balancer behaviour.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Keep evidence read-only first and do not tune sysctls without measured proof and rollback.

## Evidence

```bash
ss -tanpi 2>/dev/null | head -200 || ss -tan | head -200
ss -s
ss -ltnp 2>/dev/null || ss -ltn
nstat -az 2>/dev/null | grep -Ei 'Tcp|TCPSyn|Listen|Retrans|Timeout|Embryonic|Prune|Reset' | head -120 || true
netstat -s 2>/dev/null | grep -Ei 'tcp|listen|retrans|reset|timeout|segments' | head -120 || true
ip -s link
```

Inspect only the sysctls relevant to the observed symptom:

```bash
sysctl net.ipv4.tcp_max_syn_backlog net.core.somaxconn net.ipv4.tcp_syncookies \
  net.ipv4.tcp_tw_reuse net.ipv4.tcp_fin_timeout net.ipv4.tcp_keepalive_time \
  net.ipv4.tcp_congestion_control net.ipv4.tcp_mtu_probing net.ipv4.tcp_abort_on_overflow 2>/dev/null || true
```

## Condition map

| Signal | Interpretation | Next action |
|---|---|---|
| SYN seen, no SYN-ACK | listener/firewall/route/service path | prove listener and packet path |
| SYN-ACK sent, ACK missing | return-path/firewall/MTU/client issue | capture both directions |
| listen overflow counters rise | accept queue/app capacity issue | inspect app accept rate before tuning backlog |
| retransmits/RTO rise | loss/congestion/MTU/path issue | correlate interface counters and capture |
| CLOSE_WAIT grows | local app is not closing sockets | identify owning process; kernel tuning is not the fix |
| TIME_WAIT grows | often normal connection lifecycle | verify role, pooling, NAT/LB behaviour before any tuning |
| large transfers stall | PMTUD/MTU/MSS blackhole possible | use `tracepath`, DF ping, bounded capture |

## Focused playbooks

### Local listener works, remote connection fails
1. `ss -ltnp sport = :PORT` and confirm bind address.
2. Confirm `ip route get <client-or-next-hop>`.
3. Check firewall counters and upstream controls.
4. If still ambiguous, load `packet-capture.md` and capture only the target host/port.

### SYN pressure / failed connection establishment
Measure the **SYN backlog** and the established listen/accept queue separately. `net.ipv4.tcp_max_syn_backlog` limits half-open connection state, while `net.core.somaxconn` and the application's listen backlog constrain completed connections waiting to be accepted. Check `ss -s`, listen/SYN counters, application logs, CPU saturation, and accept rate before changing either limit. Do not blindly raise `somaxconn` or `tcp_max_syn_backlog`; backlog tuning cannot fix an application that cannot accept connections fast enough.

### MTU/MSS blackhole
Use `tracepath`, `ping -M do -s`, route/interface MTU, and a narrow packet capture. Prefer fixing the path or appropriate MSS handling instead of disabling PMTUD globally.

## Anti-patterns

- applying TCP tuning values copied from blogs
- treating TIME_WAIT itself as a fault
- using TCP reasoning for UDP loss
- raising buffers/backlogs without queue, RTT, loss, memory, and application evidence
- broad packet captures when a host/port filter is enough

## Output

Return: observed TCP state, supporting counters, packet-flow hypothesis, smallest next test, proposed fix, rollback, and validation.
# TCP Expert

Command namespace: `/linux-admin:tcp-expert`

Use this skill for TCP connection lifecycle, SYN backlog, listen queues, retransmits, RTO, MSS/MTU/PMTUD, congestion control, TIME_WAIT/CLOSE_WAIT, socket buffers, TCP sysctls, load balancer/LB behavior, and packet captures.

## Operating rules

- Keep TCP and UDP analysis separate; do not apply TCP mental models to UDP.
- Read-only first: sockets, counters, routes, interface stats, firewall/conntrack context, and packet captures.
- Packet capture recommendations must be scoped and safe: specify interface, host, port, count, and duration.
- Do not recommend sysctl tuning without observed evidence and rollback.
- Route firewall rule changes to `firewall-expert`, general routes/interfaces to `networking-expert`, kernel sysctls to `sysctl-expert`, and app/service restarts to `systemd-expert`.
- If built-in knowledge is insufficient, research official Linux docs, kernel docs, man pages, and strong network engineering community references.

## Start with audit helper

```bash
tcp-expert-audit
```

## Manual evidence commands

```bash
ss -tanpi 2>/dev/null | head -200 || ss -tan | head -200
ss -s
ss -ltnp 2>/dev/null || ss -ltn
sysctl net.ipv4.tcp_max_syn_backlog net.core.somaxconn net.ipv4.tcp_syncookies net.ipv4.tcp_tw_reuse net.ipv4.tcp_fin_timeout net.ipv4.tcp_keepalive_time net.ipv4.tcp_congestion_control net.ipv4.tcp_available_congestion_control net.ipv4.tcp_mtu_probing net.ipv4.tcp_abort_on_overflow 2>/dev/null || true
ip -s link
ip route get 1.1.1.1 2>/dev/null || true
nstat -az 2>/dev/null | grep -Ei "Tcp|TCPSyn|Listen|Retrans|Timeout|Embryonic|Prune|Reset" | head -120 || true
netstat -s 2>/dev/null | grep -Ei "tcp|listen|retrans|reset|timeout|segments" | head -120 || true
```

## TCP-specific reasoning

TCP is stateful. Diagnose by mapping the failure to a state transition: no SYN, no SYN-ACK, handshake loss, accept queue overflow, TLS/application delay, retransmission/RTO, zero window, reset, FIN/CLOSE_WAIT leak, TIME_WAIT pressure, or MTU/MSS blackhole.

## Evidence-first commands

- `ss -tanpi` for per-socket states, timers, queues, process, congestion details.
- `ss -s` for aggregate state counts.
- `nstat -az` / `netstat -s` for retransmit/listen/reset counters.
- `tcpdump -nn -i IFACE 'tcp and host X and port Y'` for handshake/protocol proof.
- `sysctl net.ipv4.tcp_* net.core.somaxconn` only after application queues and load are understood.

## Playbooks

### Port reachable locally but not remotely
1. Confirm listener: `ss -ltnp sport = :PORT`.
2. Confirm bind address: `0.0.0.0`, `::`, or local-only.
3. Check route/firewall/security group/LB.
4. Capture SYN/SYN-ACK path.
5. Validate app accept queue and backlog.

### High SYN/connection failures
1. Check `ss -s`, `nstat` listen/SYN counters, app logs.
2. Inspect `somaxconn`, app listen backlog, `tcp_max_syn_backlog`, syncookies.
3. Do not blindly set huge backlog; app accept speed and CPU may be root cause.

### CLOSE_WAIT growth
CLOSE_WAIT usually means the remote closed and the local application has not closed its socket. Kernel tuning is not the fix; identify the process and app bug.

### TIME_WAIT pressure
TIME_WAIT is normal TCP correctness. Do not blindly tune `tcp_tw_reuse`; first identify client/server role, connection reuse, keepalive, pooling, NAT/LB behavior.

### MTU/MSS blackhole
Use `tracepath`, `ping -M do -s`, tcpdump, and route/interface MTU. Avoid disabling PMTUD globally; prefer fixing path MTU/MSS clamping where appropriate.

## Anti-overoptimization

Do not change TCP sysctls from blog posts. Explain every value against observed queue depth, packet loss, RTT, connection rate, application accept rate, memory, and kernel defaults.


## Output format

1. Protocol-specific diagnosis: TCP or UDP
2. Current evidence
3. State/counter interpretation
4. Packet-flow hypothesis
5. Minimal safe test/capture
6. Proposed fix
7. Rollback
8. Validation

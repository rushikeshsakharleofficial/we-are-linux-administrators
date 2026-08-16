# Packet capture and tcpdump

Load this chunk only when packet-level evidence is needed to prove or disprove a network hypothesis.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Captures are read-only but can expose sensitive payloads. Keep them narrow, bounded and privacy-aware.

## Before capturing

Define:
- source IP
- destination IP
- protocol
- port
- interface
- expected direction
- maximum packet count or duration
- whether headers are sufficient

## Safe capture patterns

```bash
# TCP host/port, bounded by count
sudo tcpdump -nn -i <iface> -c 100 'tcp and host <ip> and port <port>'

# UDP host/port
sudo tcpdump -nn -i <iface> -c 100 'udp and host <ip> and port <port>'

# DNS metadata
sudo tcpdump -nn -i <iface> -c 100 'port 53'

# Stop after a short wall-clock window when timeout exists
timeout 20s sudo tcpdump -nn -i <iface> '<filter>'
```

Prefer console output/header inspection before writing a `.pcap`. When a pcap is required, restrict permissions and redact/share only after privacy review.

## Condition map

| Question | Capture focus |
|---|---|
| TCP timeout | SYN/SYN-ACK/ACK and retransmissions |
| TCP reset | RST origin and preceding packets |
| DNS failure | query, response, truncation, retry/TCP fallback |
| UDP loss | sender/receiver presence and direction |
| firewall/NAT ambiguity | packet presence before/after expected boundary |
| asymmetric routing | compare ingress and expected egress paths |
| TLS issue | handshake metadata first; avoid payload collection unless justified |

## Anti-patterns

- `tcpdump -i any` with no filter on a busy host
- unlimited captures
- collecting payloads when headers answer the question
- pasting full raw pcaps into an AI context
- ignoring tcpdump dropped-packet counters

## Output

Return packet question, exact filter, interface, bound/timeout, expected signal, 3-5 representative observations, and the next decision.
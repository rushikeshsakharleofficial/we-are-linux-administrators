# tcpdump-expert

Use this skill for packet-capture planning, tcpdump filter design, bounded captures, interface selection, DNS/HTTP/TLS/SMTP flow evidence, and safe pcap handling.

## Purpose

Capture the smallest packet evidence needed to prove or disprove a network hypothesis.

## Use when

- connection attempts time out or reset
- DNS packets need proof
- TLS handshake flow needs evidence
- firewall/NAT behavior is unclear
- service listens but clients cannot connect
- packet loss or asymmetric routing is suspected

## Evidence first

Ask for source IP, destination IP, protocol, port, interface, time window, and expected flow direction.

## Safe workflow

1. define the packet question
2. choose interface and direction
3. use a narrow filter
4. cap packet count or duration
5. capture metadata first before payload-heavy captures
6. protect pcaps as sensitive data
7. summarize counters and packet direction

## Anti-patterns

- unbounded captures on busy interfaces
- capturing payloads when headers are enough
- ignoring dropped-packet counters
- sharing raw pcaps without privacy review
- using broad filters that create huge output

## Output format

Return packet question, filter plan, safe capture limits, expected signal, validation, and token-saving evidence request.

## Token-saving tip

Ask for the filter, packet count, and five representative packet lines instead of the full capture.

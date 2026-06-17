# UDP Expert — Playbooks

## Scope

UDP datagrams, DNS/NTP/syslog/RADIUS/SNMP/VoIP/VPN behavior, packet loss, receive buffer drops, fragmentation, PMTU, conntrack/NAT timeout, socket buffers, multicast/broadcast, and capture-based proof.

## Audit

```bash
udp-expert-audit
```

## Decision process

1. Identify socket ownership and bind address.
2. Identify local counters and interface errors.
3. Prove packet direction with scoped tcpdump.
4. Check firewall/NAT/conntrack only after local socket state is known.
5. Tune kernel/app buffers only with evidence.
6. Validate using before/after counters and application-level tests.

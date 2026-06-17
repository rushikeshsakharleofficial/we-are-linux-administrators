# TCP Expert — Playbooks

## Scope

TCP connection lifecycle, SYN backlog, listen queues, retransmits, RTO, MSS/MTU/PMTUD, congestion control, TIME_WAIT/CLOSE_WAIT, socket buffers, TCP sysctls, load balancer/LB behavior, and packet captures.

## Audit

```bash
tcp-expert-audit
```

## Decision process

1. Identify socket ownership and bind address.
2. Identify local counters and interface errors.
3. Prove packet direction with scoped tcpdump.
4. Check firewall/NAT/conntrack only after local socket state is known.
5. Tune kernel/app buffers only with evidence.
6. Validate using before/after counters and application-level tests.

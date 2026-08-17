# NAT and conntrack

Use this chunk after `../SKILL.md` proves the problem is SNAT, DNAT, masquerade, port forwarding, forwarding state, conntrack or NAT return-path behaviour.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. NAT changes can cut off management traffic or expose services; preserve the active ruleset, keep rollback ready and validate the full packet path.

## Evidence

Confirm source network, destination, protocol/port, ingress/egress interface, expected translated address/port and return path.

```bash
ip route get <destination>
sysctl net.ipv4.ip_forward 2>/dev/null || true
nft list ruleset 2>/dev/null | sed -n '1,240p'
iptables-save -t nat 2>/dev/null || true
conntrack -L 2>/dev/null | head -100 || true
```

Identify nftables vs iptables backend before editing. Check routing before blaming NAT.

## Classify

- source NAT / masquerade
- destination NAT / port forwarding
- one-to-one translation
- forwarding disabled
- wrong hook/chain/priority
- missing or conflicting route
- conntrack state/timeout issue
- backend conflict or duplicate legacy rules
- asymmetric return path

## Safe workflow

1. Draw the pre-NAT and post-NAT packet path.
2. Prove routing and forwarding state.
3. Inspect only the relevant NAT chains/rules.
4. Confirm conntrack state when established flows behave differently from new flows.
5. Add the smallest specific rule; never flush the ruleset as a first fix.
6. Validate new connections from the real source side.
7. Remove the test rule or persist it only after proof.

## Guardrails

Never disable the firewall globally, flush NAT/conntrack blindly, add broad `0.0.0.0/0` translations without an explicit requirement, or enable forwarding without checking filtering and exposure. Preserve management access and a saved ruleset/config before changes.

Escalate to `firewall-expert` when filtering is the actual failure. Use `tcp.md`/`udp.md` for protocol behaviour and `packet-capture.md` only when packet-level proof is needed.

## Output

Return NAT scenario, packet path, current evidence, proposed minimal rule/change, exposure risk, rollback and end-to-end validation.
# Routing and iproute2

Use this chunk after `../SKILL.md` proves the problem is Linux interface/address/route/policy-routing/neighbor/namespace/VRF/tunnel state.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Treat route and address changes as remote-access risk: preserve console/OOB or a second session, prefer temporary tests first, and define rollback before changing the active management path.

## Evidence

Collect only the relevant state:

```bash
ip -br link
ip -br addr
ip route
ip rule
ip neigh
ip route get <destination>
ip route get <destination> from <source> 2>/dev/null || true
ip netns list 2>/dev/null || true
ip vrf show 2>/dev/null || true
```

Confirm source, destination, expected gateway/interface, namespace/VRF context and return path.

## Classify

- missing/wrong address or link state
- missing/wrong default or specific route
- policy-rule/table mismatch
- source-based routing issue
- asymmetric return path
- neighbor/ARP/NDP failure
- namespace/VRF/tunnel context mismatch
- renderer persistence mismatch after temporary state works

## Safe workflow

1. Map current link/address state.
2. Prove the route decision with `ip route get`, including source when relevant.
3. Inspect `ip rule` and alternate tables before changing the main table.
4. Verify gateway neighbor reachability and the return path.
5. Test the smallest temporary route/address/rule change first.
6. Only then make the equivalent persistent renderer change.
7. Validate management access and the application path before removing old state.

## Guardrails

Do not replace a default route blindly, change address and route simultaneously, ignore policy routing, or persist a route before a temporary test proves it. Do not assume interface names or main-table routing when namespaces/VRFs are involved.

For persistent configuration, hand back to the parent renderer guidance for NetworkManager/netplan/networkd/wicked. For NAT/conntrack translation use `nat-conntrack.md`; for filtering use `firewall-expert`.

## Output

Return the observed path decision, failing layer, smallest safe test, persistence method, rollback and validation evidence.
# VLAN, bonding and LACP diagnostics

Load this chunk only for VLAN subinterfaces, bonds, LACP, layered interface state, MTU mismatches, or link/failover behaviour.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Treat management-interface changes as high risk: verify console/out-of-band access and switch-side expectations before changes, and use guarded rollback.

## Evidence

```bash
ip -br link
ip -d link show
ip -br addr
ip route
cat /proc/net/bonding/* 2>/dev/null || true
nmcli -f NAME,TYPE,DEVICE con show 2>/dev/null || true
networkctl list 2>/dev/null || true
ethtool <iface> 2>/dev/null || true
```

Collect the physical-interface -> bond -> VLAN -> IP stack and note MTU at every layer.

## Condition map

| Signal | Interpretation | Next action |
|---|---|---|
| slave/member down | physical/driver/switch link issue | inspect carrier, errors, switch port |
| bond up but failover drops traffic | LACP/hash/switch convergence/ARP-neighbour issue | compare bond mode and switch LAG config |
| VLAN exists but no traffic | VLAN ID/tagging/native VLAN mismatch | validate host + switch tagging |
| only large packets fail | MTU mismatch across layer/path | compare MTU and path MTU |
| one bond member never active | mode/LACP negotiation/member config issue | inspect `/proc/net/bonding/*` and switch state |
| management IP moves between layers | cutover risk | stage with console + timed rollback |

## Safe workflow

1. Map physical links, bond, VLAN and IP ownership.
2. Confirm bond mode and switch configuration assumptions.
3. Verify carrier, counters and MTU on each layer.
4. Test non-disruptively where possible.
5. Change one layer at a time.
6. Validate failover and end-to-end traffic before persistence.

For Enterprise Linux 10 family, prefer bonding over removed NIC teaming and use NetworkManager/nmstate rather than legacy network-scripts.

## Anti-patterns

- changing bond mode without switch coordination
- changing VLAN and management IP together blindly
- ignoring MTU mismatch
- testing failover from the only SSH session without console/timed rollback

## Output

Return interface stack map, mismatch hypothesis, smallest safe test, change plan, rollback and validation.
# Interface, driver, queue, and offload playbooks

## Link health

```bash
ip -br link
ip -s link show dev <iface>
ethtool <iface>
ethtool -S <iface>
dmesg -T | grep -Ei '<iface>|firmware|link is|reset|tx timeout|ixgbe|mlx|bnx|ena|virtio'
```

Look for:

- carrier down,
- speed/duplex mismatch,
- RX/TX errors/drops,
- driver resets,
- virtual NIC/cloud provider events.

## Queues/qdisc

```bash
tc -s qdisc show dev <iface>
ethtool -l <iface> 2>/dev/null || true
ethtool -g <iface> 2>/dev/null || true
```

Change only with evidence:

- ring buffers: packet drops due to bursts and driver supports change,
- channels/queues: CPU/RSS imbalance and NIC supports change,
- offloads: only if proven checksum/GSO/GRO issue or packet capture interpretation problem.

## Bond/bridge/VLAN

```bash
ip -d link show
bridge link 2>/dev/null || true
bridge vlan show 2>/dev/null || true
cat /proc/net/bonding/* 2>/dev/null || true
```

Check lower devices, VLAN IDs, bridge membership, STP state, bond mode, LACP partner state.

---
name: "network"
description: "Parent Linux networking skill. Runs bounded baseline diagnostics, identifies the failing network layer, then loads only the matching network chunk or distinct specialist skill."
argument-hint: "[network symptom / host / port / iface / route / dns / firewall / mtu]"
effort: "high"
allowed-tools: "Read Grep Glob Bash"
---
# network

Use this parent skill for Linux connectivity, interface/address state, routing, TCP/UDP, packet flow, VLAN/bonding, NAT/conntrack, firewall, proxy and renderer problems.

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Begin read-only, protect remote access, plan rollback before network changes, and validate end to end.

## Routing contract

Do **not** preload every network reference. Run the baseline below, identify the condition, then load one matching chunk by default. Load a second chunk only when evidence proves the failure crosses layers.

| Condition / evidence | Load next |
|---|---|
| TCP SYN, retransmit, queue, socket-state, CLOSE_WAIT/TIME_WAIT, PMTUD issue | `chunks/tcp.md` |
| UDP datagram loss, receive errors, fragmentation, UDP NAT/conntrack timeout | `chunks/udp.md` |
| packet-level proof needed | `chunks/packet-capture.md` |
| VLAN, bond, LACP, layered link or MTU issue | `chunks/vlan-bonding.md` |
| address/link/route/policy rule/neighbor/namespace/VRF/tunnel problem | `chunks/routing-iproute.md` |
| SNAT, DNAT, masquerade, port-forwarding, forwarding or conntrack problem | `chunks/nat-conntrack.md` |
| known packet-filter rule problem | `firewall-expert` |
| host/service proxy problem | `linux-proxy-expert` |
| DNS/BIND/dnsmasq-specific problem after basic resolver checks | matching DNS skill |
| condition still unclear | stay in this parent baseline; do not guess |

## Baseline evidence

Collect only what is needed for the symptom:

```bash
ip -br link
ip -br addr
ip route
ip rule
ip neigh
ss -lntup
ss -s
resolvectl status 2>/dev/null || cat /etc/resolv.conf
getent hosts example.com
ip route get <destination> 2>/dev/null || true
nmcli device status 2>/dev/null || true
networkctl list 2>/dev/null || true
nft list ruleset 2>/dev/null | head -200 || true
firewall-cmd --state 2>/dev/null || true
ufw status verbose 2>/dev/null || true
```

## Baseline interpretation

| Signal | Meaning | Next branch |
|---|---|---|
| interface `DOWN` / `NO-CARRIER` | physical, virtual NIC, driver or switch path | inspect link/driver; use VLAN/bonding chunk if layered |
| IP missing | DHCP/static config/renderer problem | inspect renderer; use routing/iproute chunk when state/route reasoning is needed |
| default/specific route or policy rule wrong | routing decision issue | routing/iproute chunk |
| ping IP works, DNS fails | resolver/upstream DNS issue | verify resolver path, then DNS skill if required |
| listener bound only to `127.0.0.1` | application bind problem | app/service config, not firewall |
| listener is global but remote fails | route/firewall/NAT/upstream path | narrow to the proven layer |
| translation/forwarding/conntrack evidence is wrong | NAT state/path issue | NAT/conntrack chunk |
| drops/retransmits but route/listener look correct | protocol/path issue | TCP/UDP chunk, then capture only if needed |

## Renderer and distro notes

- Netplan: inspect `/etc/netplan/`, `netplan get`; use `netplan try --timeout 60` for remote-safe testing after confirmation.
- NetworkManager: inspect `nmcli con show`, `nmcli dev show`, and `/etc/NetworkManager/system-connections/`.
- systemd-networkd: inspect `networkctl` and `/etc/systemd/network/`.
- SUSE wicked: inspect `wickedd` and `/etc/sysconfig/network/ifcfg-*`.
- Enterprise Linux 10 family: do not recreate removed legacy network-scripts/`ifup`/`ifdown`; prefer NetworkManager/nmstate. Prefer bonding over removed NIC teaming and Kea over retired ISC DHCP server guidance.

## Remote-safe changes

Never change the only management path without rollback or console/OOB access. Prefer temporary route/rule/NAT tests, `netplan try`, temporary firewalld rules, parallel SSH sessions, or out-of-band access before persistence.

```bash
cp -a <config> <config>.bak.$(date +%F-%H%M%S)
# make one small change
# validate syntax/state
# apply with a guarded/timed method when available
```

## Validation

```bash
ip route get <destination>
getent hosts <hostname>
ss -lntup | grep <port>
curl -v --connect-timeout 5 http://<host>:<port>/ 2>&1 | head -60
```

## Anti-patterns

Do not flush firewall/NAT state, replace a default route blindly, disable offloads globally, change MTU without path evidence, disable `rp_filter` without asymmetric-routing proof, or apply TCP/UDP/sysctl tuning from generic blog posts.

## Output

```text
Parent: network
Condition: <observed layer/symptom>
Chunk/specialist: <one primary reference>
Support reference: <optional, only if evidence crosses layers>
Evidence: <bounded facts>
Next safe action: <test/fix>
Rollback: <when state changes>
Validation: <proof>
```

---
name: "network"
description: "Troubleshoot Linux networking, IP addressing, routing, DNS, firewalld/nftables/iptables/ufw, sockets, listeners, and connectivity problems."
argument-hint: "[network symptom / host / port]"
effort: "high"
allowed-tools: "Read Grep Glob Bash"
---
# network skill

Use this plugin skill for: $ARGUMENTS

Important: begin read-only; require explicit confirmation before disruptive/destructive changes; include validation and rollback.

Supporting docs are available under `${CLAUDE_SKILL_DIR}/../../docs/`.

# Task: Networking, DNS, Routing, Firewall

## When to use

Use for no connectivity, one-way connectivity, DNS failure, route missing, interface down, packet filtering, port not reachable, local service listening but unreachable, Netplan/NetworkManager/wicked/systemd-networkd issues.

## Mental model

Debug from bottom to top:

1. Link/interface state.
2. IP address and neighbor/gateway.
3. Routing and policy routing.
4. DNS resolver path.
5. Local socket/listener.
6. Firewall/nftables/firewalld/ufw/security group.
7. Application protocol.

Never start by changing DNS or firewall until link/address/route is known.

## Read-only first commands

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
dig +short example.com 2>/dev/null || true
ping -c1 <gateway-or-known-ip> 2>/dev/null || true
ping -c1 8.8.8.8 2>/dev/null || true
tracepath <destination> 2>/dev/null || traceroute <destination> 2>/dev/null || true
nmcli device status 2>/dev/null || true
networkctl list 2>/dev/null || true
systemctl is-active NetworkManager 2>/dev/null || true
systemctl is-active systemd-networkd 2>/dev/null || true
systemctl is-active wickedd 2>/dev/null || true
nft list ruleset 2>/dev/null | head -200 || true
iptables-save 2>/dev/null | head -200 || true
firewall-cmd --state 2>/dev/null || true
firewall-cmd --list-all 2>/dev/null || true
ufw status verbose 2>/dev/null || true
```

## Branch interpretation

| Signal | Meaning | Next branch |
|---|---|---|
| Interface `DOWN` or `NO-CARRIER` | physical/virtual link issue | driver, cable, VM NIC, cloud attachment, renderer |
| IP missing | DHCP/static config/renderer issue | check Netplan/NM/wicked/networkd config |
| Default route missing | gateway/renderer/DHCP issue | inspect renderer and config file |
| Ping IP works, DNS fails | resolver/upstream DNS issue | `resolvectl`, `/etc/resolv.conf`, DNS server reachability |
| Service listens on `127.0.0.1` only | bind address problem | app config, not firewall |
| Service listens on `0.0.0.0` but remote fails | firewall, route, cloud SG/NACL, upstream | inspect counters and external path |
| nft/firewalld counters increment on drop | local firewall blocks | narrow rule addition with rollback |
| RHEL/Rocky/Alma 10 host has no `ifup`/`ifdown` or ignores `/etc/sysconfig/network-scripts/ifcfg-*` | legacy network scripts removed in Enterprise Linux 10 family | use NetworkManager (`nmcli`, `nmtui`) or `nmstate`; inspect `/etc/NetworkManager/system-connections/` |
| Enterprise Linux 10 DHCP server migration request references `dhcpd`/ISC DHCP | ISC DHCP server is EOL/replaced downstream | plan Kea DHCP migration; do not recreate old `dhcpd.conf` blindly |
| Enterprise Linux 10 network teaming config is requested | NIC teaming removed | replace team with bonding; validate driver/LACP/switch side before cutover |
| systemd-networkd DHCP relay config uses old `[DHCPServer]` relay keys | systemd 261 deprecates relay keys in favor of `DHCPRelay=` and `[DHCPRelay]` | document current behavior; avoid new configs using deprecated relay keys |

## Distro-aware config checks

Ubuntu Netplan:

```bash
ls -l /etc/netplan
sed -n '1,200p' /etc/netplan/*.yaml 2>/dev/null
netplan get 2>/dev/null || true
netplan try --timeout 60   # state-changing; confirmation required
```

NetworkManager:

```bash
nmcli con show
nmcli dev show <interface>
nmcli con show <connection-name>
ls -l /etc/NetworkManager/system-connections/ 2>/dev/null || true
```

Enterprise Linux 10 / RHEL-like 10 note:

- Do not create or edit `/etc/sysconfig/network-scripts/ifcfg-*` on Rocky Linux 10 / RHEL-like 10 as a remediation path.
- Do not suggest `ifup`, `ifdown`, `ifup-local`, or legacy network-scripts hooks on Rocky Linux 10 / RHEL-like 10.
- Prefer NetworkManager profiles, `nmcli`, `nmtui`, and `nmstate`.
- For server aggregation, prefer bonding over removed NIC teaming.
- For DHCP service rebuilds, prefer Kea DHCP over ISC DHCP.

```bash
cat /etc/os-release
nmcli -f NAME,UUID,TYPE,DEVICE,AUTOCONNECT con show
nmcli -f GENERAL,IP4,IP6 dev show <interface>
ls -l /etc/NetworkManager/system-connections/
```

systemd-networkd:

```bash
networkctl status <interface>
ls -l /etc/systemd/network /run/systemd/network /usr/lib/systemd/network 2>/dev/null
sed -n '1,200p' /etc/systemd/network/*.network 2>/dev/null
```

When writing new DHCP relay guidance for modern `systemd-networkd`, prefer the current `[Network]` `DHCPRelay=` model and `[DHCPRelay]` section rather than deprecated `[DHCPServer]` relay settings.

SUSE wicked:

```bash
systemctl status wickedd --no-pager
ls -l /etc/sysconfig/network/ifcfg-*
sed -n '1,200p' /etc/sysconfig/network/ifcfg-<interface>
```

## Safe remediation patterns

### Remote-safe network change pattern

Require confirmation and prefer timed rollback:

```bash
cp -a <config> <config>.bak.$(date +%F-%H%M%S)
# apply small change
# validate syntax
# apply with try/timeout if supported
```

For Netplan:

```bash
netplan generate
netplan try --timeout 60
```

For NetworkManager:

```bash
nmcli connection reload
nmcli connection up <connection-name>
```

For firewalld narrow allow:

```bash
firewall-cmd --query-port=<port>/tcp
firewall-cmd --add-port=<port>/tcp --timeout=300
# validate externally, then make permanent only after confirmation
firewall-cmd --permanent --add-port=<port>/tcp
firewall-cmd --reload
```

## Validation

```bash
ip route get <destination>
getent hosts <hostname>
ss -lntup | grep <port>
curl -v --connect-timeout 5 http://<host>:<port>/ 2>&1 | head -60
nft list ruleset | grep -n <port> || true
```

## Escalation

Escalate if:

- Multiple hosts fail at same time.
- Asymmetric routing or BGP/cloud routing is involved.
- Firewall change can cut SSH and no console exists.
- Cloud security groups/NACL/LB are outside host visibility.

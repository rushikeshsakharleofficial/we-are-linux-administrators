# networking-expert diagnostic method

## Mental model

Linux networking failures should be debugged as a packet path:

```text
application -> socket bind/listen -> local firewall -> route/rule/source address -> interface/qdisc/driver -> L2/L3 path -> remote firewall/service -> return path
```

For DNS problems, split name resolution from IP reachability.

## Scope questions

Answer these from evidence:

- Is it inbound, outbound, or both?
- IPv4, IPv6, or both?
- One destination or all?
- One source interface or all?
- Name-only or IP also fails?
- New change: route, firewall, DNS, interface, cloud SG, service deployment?

## Minimal read-only bundle

```bash
ip -br link
ip -br addr
ip route show table all
ip rule show
ss -s
ss -lntup
ip -s link
resolvectl status 2>/dev/null || cat /etc/resolv.conf
```

For a target:

```bash
dst=<ip-or-host>
ip route get "$dst"
ping -c 3 "$dst"
tracepath "$dst" 2>/dev/null || traceroute "$dst" 2>/dev/null
```

## Interpretation

| Evidence | Meaning | Next check |
|---|---|---|
| no default route | outbound internet fails | network manager config, DHCP/static gateway |
| `ip route get` picks wrong src | replies may go wrong path | source policy, address order, route src |
| DNS fails but IP works | resolver issue | resolvectl, /etc/resolv.conf, split DNS |
| service listens on 127.0.0.1 | remote cannot connect | app bind config/systemd socket |
| SYN_RECV grows | app backlog/firewall/path | ss state, app accept rate, backlog |
| high RX/TX drops | NIC/qdisc/CPU/driver issue | ethtool -S, tc -s, dmesg |
| one direction works | firewall/asymmetry | nft/iptables, route return path |

## Never-first actions

- Do not flush firewall rules.
- Do not restart NetworkManager/network remotely without rollback.
- Do not disable IPv6 globally to fix one DNS/app issue.
- Do not change sysctl until path and app evidence support it.

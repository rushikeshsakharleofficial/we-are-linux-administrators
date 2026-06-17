# Socket and TCP playbooks

## Service not reachable

```bash
ss -lntup | grep ':<port>'
systemctl status <service> --no-pager -l
journalctl -u <service> -b -n 100 --no-pager
```

Interpret bind addresses:

| Listen address | Meaning |
|---|---|
| `127.0.0.1:PORT` | local only |
| `0.0.0.0:PORT` | all IPv4 addresses |
| `[::]:PORT` | IPv6 wildcard, may or may not also accept IPv4 depending on bindv6only/app |
| specific IP | only that address |

## Backlog/SYN issues

Evidence:

```bash
ss -s
ss -tan state syn-recv
ss -lntpi '( sport = :<port> )'
cat /proc/net/netstat | grep -E 'ListenOverflows|ListenDrops'
```

Decision:

- If app is not accepting fast enough, fix app workers/event loop first.
- If listen queue overflows with healthy app, then consider app backlog + `somaxconn` + `tcp_max_syn_backlog` with evidence.
- Do not set `tcp_abort_on_overflow=1` casually; it changes client-visible behavior.

## TIME_WAIT

Evidence:

```bash
ss -tan state time-wait | wc -l
ss -s
```

TIME_WAIT is normal TCP behavior. Tune application connection reuse, keepalive, upstream pooling, and load balancing before kernel tweaks.

## MTU/path

```bash
ip link show <iface>
tracepath <destination>
ping -M do -s 1472 <destination>   # IPv4 Ethernet payload test, adjust for tunnels
```

Do not lower MTU permanently until you confirm path MTU blackhole/tunnel overhead and persistent config location.

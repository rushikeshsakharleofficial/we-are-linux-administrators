---
name: lvs-ipvs-expert
description: Linux Virtual Server and IPVS expert for kernel L4 load balancing, ipvsadm, ldirectord, NAT/DR/TUN modes, schedulers, persistence, real-server health, ARP/DSR behavior, and high-throughput VIP troubleshooting.
argument-hint: "[ipvs|lvs|ldirectord|nat|dr|tun|scheduler|vip] [symptom]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# LVS / IPVS Expert

Use this skill for Linux kernel Layer 4 load balancing with LVS/IPVS, `ipvsadm`, ldirectord, and keepalived-managed IPVS setups.

## Safety boundary

Default to read-only inspection. Do not flush IPVS tables, remove virtual services, change scheduler, move VIPs, or alter ARP/sysctl behavior without change window, backup of current state, and rollback.

## Object model

```text
client -> VIP:port on director -> IPVS virtual service -> real server -> application
```

Terms:

- VIP: virtual service IP
- director: Linux load balancer receiving client traffic
- real server: backend server
- RIP: real-server IP
- DIP: director IP toward backend network
- NAT mode: director rewrites destination and return path usually comes back through director
- DR mode: director rewrites L2 MAC; real server replies directly using VIP on loopback/dummy
- TUN mode: IP-in-IP forwarding to real server
- scheduler: rr, wrr, lc, wlc, sh, dh, lblc, sed, nq, mh, etc.

## Evidence first

```bash
ipvsadm -Ln --stats --rate 2>/dev/null || true
ipvsadm -Ln --persistent-conn 2>/dev/null || true
ip -brief addr
ip route
sysctl net.ipv4.ip_forward net.ipv4.conf.all.arp_ignore net.ipv4.conf.all.arp_announce 2>/dev/null || true
lsmod | grep -E '^ip_vs|^nf_conntrack' || true
journalctl -u keepalived -u ldirectord --no-pager -n 200 2>/dev/null || true
```

For real servers in DR mode:

```bash
ip -brief addr
sysctl net.ipv4.conf.all.arp_ignore net.ipv4.conf.all.arp_announce 2>/dev/null || true
ss -tulpen
```

## Failure patterns

- VIP not reachable: VIP missing, wrong owner, upstream route, firewall, ARP issue
- connections arrive but no backend: IPVS table missing real servers or all weights 0
- backend active but client times out: return path broken, NAT/DR mode mismatch
- DR mode intermittent: ARP flux, VIP not on loopback/dummy, wrong arp_ignore/arp_announce
- persistence wrong: timeout/key mismatch or NAT-heavy source addresses
- one server overloaded: wrong scheduler/weight or health check not removing bad nodes
- ldirectord flaps: health check too shallow, timeout too short, backend slow
- conntrack pressure: NAT mode with high connection rate and insufficient tuning

## Scheduler guidance

- `rr`: simple equal backends
- `wrr`: backends with different capacity
- `lc`: long-lived uneven connections
- `wlc`: least connection with capacity weights
- `sh`: source affinity without app cookie
- `dh`: destination hashing/cache locality
- `mh`: Maglev hashing where available/appropriate

## Output format

```text
LVS mode:
VIP/director/real-server map:
Scheduler and persistence:
Current IPVS state:
Backend health source:
Routing/ARP finding:
Likely failure domain:
Safe fix:
Rollback:
Validation:
```

---
name: firewall-expert
description: Expert Linux software firewall diagnostics and safe rule design for firewalld, nftables, iptables/ip6tables, UFW, ipset, ebtables/arptables, Docker/Kubernetes host firewall interactions, logging, NAT, forwarding, and lockout-safe remediation.
---

# firewall-expert

Act as a senior Linux firewall administrator/SRE. Use this skill for firewalld, nftables, iptables/ip6tables, UFW, ipset, ebtables/arptables, host firewall lockouts, NAT/forwarding, port exposure, packet drops, Docker/Kubernetes host rule conflicts, and safe firewall change design.

## Core rule

A firewall change is not safe until SSH/management access, current rules, default policy, active backend, persistence layer, and rollback are understood. Never flush or reset a firewall as a first fix.

## Identify the active firewall layer

Always discover before changing:

```bash
systemctl is-active firewalld nftables ufw fail2ban 2>/dev/null || true
firewall-cmd --state 2>/dev/null || true
firewall-cmd --get-active-zones 2>/dev/null || true
nft list ruleset 2>/dev/null || true
iptables-save 2>/dev/null || true
ip6tables-save 2>/dev/null || true
ufw status verbose 2>/dev/null || true
ipset list -name 2>/dev/null || true
ss -lntup
ip -br addr
ip route show table all
```

## Firewall software map

| Tool | Typical distro/use | Persistence model | Expert warning |
|---|---|---|---|
| firewalld | RHEL/Rocky/Alma/Fedora, also some SUSE | runtime vs permanent zones/services/rich rules | runtime-only changes disappear on reload; permanent-only changes need reload |
| nftables | modern netfilter ruleset | `/etc/nftables.conf`, distro service, direct `nft` rules | do not mix unmanaged direct nft changes with firewalld/UFW unless ownership is clear |
| iptables/ip6tables | legacy or compatibility layer | iptables-services, netfilter-persistent, distro scripts | check `iptables-nft` vs `iptables-legacy` backend |
| UFW | Ubuntu/simple host firewall | `/etc/ufw`, app profiles, `ufw` commands | enabling/resetting can flush chains and affect SSH |
| ipset | fast IP/network sets for iptables/firewalld | tool-specific restore or firewalld ipset | useful for many IPs; validate memory and update method |
| ebtables/arptables | bridge/ARP filtering, often compatibility nft | distro-specific | bridge filtering can break virtualization/container traffic |
| fail2ban | dynamic bans using firewall actions | jail/filter/action config | depends on correct logs and firewall action backend |

## Troubleshooting sequence

1. Define traffic: source, destination, protocol, port, direction, interface, IPv4/IPv6.
2. Confirm service listening with `ss -lntup`.
3. Confirm route and interface with `ip route get` and `ip -br addr`.
4. Identify firewall owner/backend: firewalld, nftables, UFW, iptables, container runtime, cloud firewall.
5. Capture current rules before change.
6. Check default policy and first-match rule order.
7. For blocked traffic, enable temporary logging narrowly; do not enable noisy global logging on busy systems.
8. Propose the smallest allow/deny rule with rollback.
9. Make runtime test first where supported, then persist after validation.
10. Validate from the actual source network.

## Safe change pattern

```text
Evidence:
- active firewall manager/backend
- current rules affecting traffic
- service listen state
- route/interface

Change:
- exact command or config
- runtime vs permanent behavior
- why source/destination/protocol/port/interface are scoped this way

Rollback:
- exact delete command or restore file

Validation:
- firewall query
- connection test from allowed source
- negative test from denied source if safe
```

## Firewalld method

Prefer services and zones over direct rules when possible:

```bash
firewall-cmd --get-active-zones
firewall-cmd --zone=<zone> --list-all
firewall-cmd --zone=<zone> --add-service=https
# after validation:
firewall-cmd --runtime-to-permanent
```

Permanent-only changes require reload before they affect runtime:

```bash
firewall-cmd --permanent --zone=<zone> --add-port=8443/tcp
firewall-cmd --reload
```

## nftables method

Use atomic files for non-trivial changes:

```bash
nft list ruleset > /root/nft-backup.$(date +%F-%H%M%S).rules
nft -c -f /etc/nftables.conf
nft -f /etc/nftables.conf
```

Prefer named sets/maps for many IPs or ports instead of thousands of repeated rules.

## iptables method

Capture both IPv4 and IPv6:

```bash
iptables-save > /root/iptables-v4.backup
ip6tables-save > /root/iptables-v6.backup
iptables -S
iptables -L -n -v --line-numbers
```

Use insert position carefully. First match wins in many chains.

## UFW method

Use dry-run and numbered status:

```bash
ufw status verbose
ufw status numbered
ufw --dry-run allow from <src> to any port <port> proto tcp
```

Before enabling UFW remotely, explicitly allow SSH/management access.

## Docker/Kubernetes warning

Docker, kube-proxy, CNIs, and firewalld can all modify netfilter state. When containers are involved, inspect DOCKER/KUBE chains, bridge interfaces, forwarding policy, and NAT before blaming the host firewall.

## Output format

```text
Firewall owner/backend:
Traffic scope:
Evidence:
Rules affecting traffic:
Recommended minimal rule:
Runtime test:
Persistent method:
Why this exact scope:
Lockout risk:
Rollback:
Validation:
```

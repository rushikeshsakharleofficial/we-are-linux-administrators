---
name: keepalived-expert
description: keepalived and VRRP expert for VIP failover, health scripts, priority/preempt behavior, unicast/multicast VRRP, split-brain prevention, IPVS integration, ARP behavior, and safe HA validation.
argument-hint: "[vrrp|vip|failover|split-brain|health-check|ipvs] [symptom]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# keepalived Expert

Use this skill for keepalived VRRP, VIP ownership, failover, health-check scripts, and keepalived-managed LVS/IPVS.

## Safety boundary

Default to read-only inspection. Do not restart keepalived, force failover, change priority, alter preempt behavior, or move VIPs without a maintenance plan and rollback.

## Object model

```text
node state -> VRRP instance -> VIP owner -> health script weight -> network reachability -> service
```

Key concepts:

- VRRP instance
- virtual_router_id
- priority and state
- preempt/nopreempt
- advert interval
- authentication, if used
- unicast vs multicast VRRP
- track_script / track_interface
- notify scripts
- VIP ownership
- gratuitous ARP / neighbor update
- IPVS virtual_server block

## Evidence first

```bash
systemctl status keepalived --no-pager
journalctl -u keepalived --no-pager -n 200
ip -brief addr
ip route
ss -tulpen
grep -R --line-number -E 'vrrp_instance|virtual_ipaddress|virtual_router_id|priority|state|track_script|virtual_server|real_server|notify|nopreempt|unicast' /etc/keepalived 2>/dev/null || true
```

Network checks:

```bash
ip neigh show
sysctl net.ipv4.ip_nonlocal_bind net.ipv4.ip_forward 2>/dev/null || true
nft list ruleset 2>/dev/null || iptables-save 2>/dev/null || true
```

## Failure patterns

- VIP missing: keepalived down, script failed, interface mismatch, config parse issue
- VIP on both nodes: split brain, multicast blocked, duplicate VRID, unicast peer issue
- VIP on wrong node: priority/preempt/nopreempt logic, health script weight
- failover occurs but clients fail: ARP/neighbor cache, route, firewall, rp_filter
- flapping: health script too aggressive, timeout too short, service slow
- no failover: script does not change weight, track interface not defined, peer unreachable
- VRRP packets blocked: firewall, switch multicast filtering, wrong interface
- IPVS empty: virtual_server/real_server health checks failing

## Safe validation

- Check config syntax if supported by installed version.
- Confirm current owner before any change.
- Validate peer communication path.
- Test health scripts manually only if they are read-only.
- Use planned failover windows for real VIP movement.

## Output format

```text
VRRP topology:
Current VIP owner:
Expected owner:
Health scripts and weights:
Peer communication:
ARP/neighbor risk:
Likely failure domain:
Safe fix:
Rollback:
Validation:
```

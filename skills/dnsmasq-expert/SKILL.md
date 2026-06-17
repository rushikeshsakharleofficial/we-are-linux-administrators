---
name: dnsmasq-expert
description: Expert dnsmasq administration for lightweight DNS forwarding/cache, DHCP, DHCPv6/RA, PXE/TFTP, local host records, split DNS, upstream resolvers, DNSSEC, rebind protection, and safe validation.
---

# dnsmasq-expert

Act as a senior Linux DNS/DHCP administrator for dnsmasq. Use this skill for local DNS, DHCP leases, PXE/TFTP, split DNS, upstream forwarders, cache behavior, resolv.conf loops, NetworkManager/libvirt conflicts, and small-network DNS/DHCP troubleshooting.

## Core rules

1. Run `dnsmasq --test` before restart/reload.
2. Confirm whether dnsmasq is standalone, NetworkManager-managed, libvirt-managed, or container-managed.
3. Do not run multiple DHCP servers on the same L2 segment.
4. Avoid DNS forwarding loops.
5. Use rebind protection unless you intentionally resolve private upstream names.
6. Back up `/etc/dnsmasq.conf` and `/etc/dnsmasq.d/` before edits.
7. Validate DNS and DHCP separately.

## Read-only first

```bash
dnsmasq --version 2>/dev/null || true
dnsmasq --test 2>&1 || true
systemctl status dnsmasq NetworkManager libvirtd 2>/dev/null || true
ss -ulpn 'sport = :53' || true
ss -ulpn 'sport = :67' || true
journalctl -u dnsmasq -b --no-pager -n 200
ls -la /etc/dnsmasq.conf /etc/dnsmasq.d 2>/dev/null || true
```

## Output format

```text
Role: DNS / DHCP / PXE / local cache
Current evidence:
Config risk:
Proposed change:
Validation:
Rollback:
```

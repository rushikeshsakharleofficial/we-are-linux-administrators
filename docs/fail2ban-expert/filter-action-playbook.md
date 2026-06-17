# Fail2Ban filter and action playbook

## Filter design

A filter should match only malicious events. It must be tested against positive and negative samples.

```bash
fail2ban-regex /path/to/log /etc/fail2ban/filter.d/name.conf --print-all-matched
fail2ban-regex /path/to/log /etc/fail2ban/filter.d/name.conf --print-all-missed
```

Use `<HOST>` for IP/host capture. Avoid greedy patterns that capture unrelated lines.

## Action backend

The action must match the firewall owner:

| Firewall | Typical action direction |
|---|---|
| nftables | nftables-based action |
| iptables | iptables/ip6tables action |
| firewalld | firewalld/ipset/rich/direct aware action |
| UFW | UFW-compatible action or custom action |

Validate bans in both Fail2Ban and firewall ruleset.

```bash
fail2ban-client status <jail>
nft list ruleset | grep -i f2b || true
iptables-save | grep -i f2b || true
firewall-cmd --list-all-zones | grep -i f2b || true
```

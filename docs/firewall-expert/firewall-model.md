# Firewall expert model

## Packet path mental model

```text
socket/listener -> local route -> ingress/egress interface -> raw/mangle/nat/filter hooks -> policy/rules -> conntrack -> application
```

A host firewall issue is not proven until service listening, route selection, and firewall rules are separated.

## Ownership first

Never apply direct rules before identifying owner:

- firewalld owns rules through zones, services, policies, rich rules, and sometimes direct rules.
- nftables may be managed by `nftables.service`, firewalld, UFW, Docker, Kubernetes, or custom automation.
- iptables may be legacy or nft compatibility backend.
- UFW manages netfilter through its own chain structure and config files.
- fail2ban dynamically inserts or updates ban rules/sets through action backends.

## Evidence commands

```bash
systemctl is-active firewalld nftables ufw fail2ban 2>/dev/null || true
firewall-cmd --state 2>/dev/null || true
nft list ruleset 2>/dev/null || true
iptables-save 2>/dev/null || true
ip6tables-save 2>/dev/null || true
ufw status verbose 2>/dev/null || true
ss -lntup
ip -br addr
ip route show table all
```

## Rule design

A good firewall rule has:

- exact direction,
- exact protocol,
- exact port,
- source scope if possible,
- destination/interface scope when required,
- comment/owner where supported,
- rollback command,
- persistence plan.

## Bad fixes

- `nft flush ruleset`
- `iptables -F`
- `ufw reset --force`
- disabling firewalld permanently
- allowing `0.0.0.0/0` management ports when a narrow source is available
- changing default policy remotely without tested allow rules

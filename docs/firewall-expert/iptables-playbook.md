# iptables/ip6tables playbook

## Read-only audit

```bash
iptables --version
ip6tables --version
iptables-save
ip6tables-save
iptables -S
ip6tables -S
iptables -L -n -v --line-numbers
```

## Safe backup and restore

```bash
iptables-save > /root/iptables-v4.$(date +%F-%H%M%S).rules
ip6tables-save > /root/iptables-v6.$(date +%F-%H%M%S).rules
iptables-restore < /root/iptables-v4.<timestamp>.rules
ip6tables-restore < /root/iptables-v6.<timestamp>.rules
```

## Rule placement

- `-A` appends; may never match if earlier DROP exists.
- `-I CHAIN 1` inserts at top; may override intended policy.
- Use `--line-numbers` to pick position deliberately.
- Match connection state using conntrack where appropriate.

## Legacy vs nft backend

Check version output. Many modern distros provide `iptables-nft` compatibility. Avoid mixing `iptables-legacy` and `iptables-nft` on the same host.

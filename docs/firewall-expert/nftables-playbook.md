# nftables playbook

## Read-only audit

```bash
nft --version
nft list ruleset
nft list tables
nft list ruleset -a
```

Use `-a` handles when you need to delete exact rules.

## Safe file workflow

```bash
nft list ruleset > /root/nft-backup.$(date +%F-%H%M%S).rules
nft -c -f /etc/nftables.conf
nft -f /etc/nftables.conf
```

## Design rules

- Prefer named sets for many IPs.
- Prefer inet family tables for shared IPv4/IPv6 policy when appropriate.
- Keep base chain hook, priority, and policy explicit.
- Keep comments/owner tags where useful.
- Do not mix unmanaged `nft add rule` with firewalld/UFW ownership unless documented.

## Rollback

```bash
nft -f /root/nft-backup.<timestamp>.rules
```

## Common issue

If `iptables-save` shows rules but `nft list ruleset` also has compatibility chains, check whether `iptables` points to nft or legacy backend.

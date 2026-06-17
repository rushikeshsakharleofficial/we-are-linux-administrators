# iptables to nftables migration notes

## Migration method

1. Inventory current iptables/ip6tables rules.
2. Identify persistence owner.
3. Use `iptables-translate`/`ip6tables-translate` where available, but review semantics manually.
4. Build nftables file with tables/chains/sets.
5. Validate with `nft -c -f`.
6. Apply in maintenance window or with console rollback.
7. Disable old persistence only after nft rules are validated.

## Watchouts

- Rule order and default policy must be preserved.
- IPv4 and IPv6 may need separate handling or inet tables.
- ipset concepts may become nft sets.
- Docker/Kubernetes/firewalld may regenerate parts of ruleset.

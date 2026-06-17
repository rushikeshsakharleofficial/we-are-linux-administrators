# Routing, DNS, and firewall playbooks

## Routing

Read-only:

```bash
ip route show table all
ip rule show
ip route get <destination>
ip -br addr
```

Look for:

- missing default route,
- route metric priority,
- wrong source address,
- policy rules selecting another table,
- local table entries,
- cloud-init/NetworkManager overwriting runtime changes.

Runtime test change pattern:

```bash
sudo ip route add <prefix> via <gateway> dev <iface> metric <metric>
```

Only convert to persistent config after validation.

## DNS

Read-only:

```bash
getent hosts <name>
resolvectl query <name> 2>/dev/null || true
resolvectl status 2>/dev/null || cat /etc/resolv.conf
dig @<resolver> <name> +time=2 +tries=1
```

Distinguish:

- resolver unreachable,
- search domain issue,
- split DNS route issue,
- NXDOMAIN from authoritative DNS,
- DNSSEC/EDNS/firewall issue.

## Firewall

Read-only:

```bash
nft list ruleset 2>/dev/null || true
iptables-save 2>/dev/null || true
firewall-cmd --state 2>/dev/null || true
firewall-cmd --list-all 2>/dev/null || true
ufw status verbose 2>/dev/null || true
```

Safe change discipline:

1. Keep current rules backup.
2. Add narrow allow rule, not broad flush.
3. Validate from source network.
4. Document rollback command.

Rollback examples:

```bash
sudo nft -f /root/nft-backup.rules
sudo firewall-cmd --remove-port=443/tcp --permanent && sudo firewall-cmd --reload
```

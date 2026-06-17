# UFW, ipset, ebtables/arptables, and other local firewalls

## UFW

```bash
ufw status verbose
ufw status numbered
ufw show raw
ufw --dry-run allow from <src> to any port <port> proto tcp
```

Remote safety:

- Add management allow rule before `ufw enable`.
- Avoid `ufw --force enable` over SSH unless console rollback exists.
- Use `ufw --dry-run` for proposed changes.

## ipset

Use ipset/nft sets for large IP lists instead of many duplicated rules. Check memory and update method.

```bash
ipset list -name
ipset list <set>
```

## ebtables/arptables

Bridge/ARP filtering can affect virtualization, containers, and L2 forwarding. Check bridges first:

```bash
bridge link
bridge vlan show
ip -d link show type bridge
```

## CSF/shorewall/custom scripts

If present, treat them as the owner. Do not add raw nft/iptables rules until you know whether the tool rewrites the ruleset.

# Networking Change Plan

## Scope

- Host:
- Interface/source:
- Destination/service:
- Inbound/outbound:
- IPv4/IPv6:
- Remote access risk:

## Evidence

```bash
ip -br link
ip -br addr
ip route show table all
ip rule show
ip route get <destination>
ss -lntup
nft list ruleset 2>/dev/null || iptables-save 2>/dev/null
```

## Current behavior

-

## Proposed runtime test

```bash
# exact command, if any
```

## Persistent config target

- NetworkManager / netplan / systemd-networkd / ifcfg / ifupdown / cloud-init / other:
- File/command:

## Why this value/rule/route

| Setting | Reason | Why not broader/more aggressive |
|---|---|---|
| | | |

## Risk controls

- Out-of-band console available:
- Timed rollback:
- Backup command/file:

## Validation

```bash
ip route get <destination>
ss -lntup
curl -v <url> || nc -vz <host> <port>
```

## Rollback

```bash
# exact rollback command
```

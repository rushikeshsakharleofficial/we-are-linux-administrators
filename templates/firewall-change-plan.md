# Firewall Change Plan

## Scope

- Host:
- Firewall owner/backend:
- Traffic direction:
- Source:
- Destination:
- Protocol/port:
- Interface/zone:
- Remote management risk:

## Evidence

```bash
ss -lntup
ip -br addr
ip route show table all
firewall-cmd --get-active-zones 2>/dev/null || true
nft list ruleset 2>/dev/null || true
iptables-save 2>/dev/null || true
ufw status verbose 2>/dev/null || true
```

## Proposed rule

```bash
# exact command or config
```

## Why this scope

-

## Runtime test

-

## Persistence

-

## Rollback

```bash
# exact rollback command
```

## Validation

```bash
# positive test
# negative test if safe
```

---
name: f5-expert
description: F5 BIG-IP load balancer expert for LTM/GTM-style troubleshooting, virtual servers, pools, pool members, monitors, SNAT, profiles, iRules, persistence, TLS, and HA failover. Defensive, read-only-first, change-window aware.
argument-hint: "[ltm|dns|gtm|pool|monitor|vip|snat|irule|failover] [symptom]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# F5 Expert

Use this skill for F5 BIG-IP load balancer analysis. Focus on LTM traffic path, pool health, monitor behavior, source NAT, persistence, TLS profiles, iRules/local traffic policies, and HA failover.

## Safety boundary

Default to read-only commands and config review. Do not disable pool members, force offline nodes, change traffic groups, sync config, modify monitors, replace certs, or fail over an HA pair without an approved change plan and rollback.

## F5 object model

Map every issue through:

```text
client -> virtual server/VIP -> profile/policy/iRule -> pool -> pool member/service -> node/host -> app
```

Know the terms:

- virtual server: client-facing listener/VIP
- pool: group of backend services
- pool member: IP:port service inside a pool
- node: backend host IP
- monitor: health check
- SNAT / automap: source translation path
- profile: TCP/HTTP/SSL behavior
- persistence: source/cookie/SSL/session affinity
- traffic group: HA ownership of floating objects

## Evidence first

Prefer read-only `tmsh` evidence when available:

```bash
tmsh show sys version
tmsh show ltm virtual
tmsh show ltm pool members
tmsh show ltm node
tmsh show ltm persistence persist-records
tmsh show sys connection cs-server-addr <vip> 2>/dev/null
tmsh show cm failover-status
tmsh show cm sync-status
```

Config snippets:

```bash
tmsh list ltm virtual <name>
tmsh list ltm pool <name>
tmsh list ltm monitor
tmsh list ltm profile client-ssl <name>
tmsh list ltm profile server-ssl <name>
tmsh list ltm rule <name>
```

Logs:

```bash
tail -n 200 /var/log/ltm
tail -n 200 /var/log/audit
```

## Failure patterns

- VIP unreachable: traffic group owner, VLAN/self IP, route, firewall, upstream routing
- pool down: monitor path/SNI/Host/header mismatch, backend closed, wrong port
- 503/no pool member: all members down or policy selected empty pool
- only one app path fails: iRule/local traffic policy/HTTP profile issue
- client IP missing: SNAT automap or no XFF/PROXY protocol equivalent path
- intermittent user issue: persistence table, NAT-heavy clients, cookie route mismatch
- TLS failure: wrong clientssl/serverssl profile, SNI, chain, cipher, expired cert
- after failover issue: unsynced config, floating self IP, ARP, route, traffic group
- SNAT exhaustion: port exhaustion, high concurrent outbound translations

## Load balancing method review

Validate method against workload:

- round robin: similar members
- ratio: weighted capacity
- least connections: long-lived or uneven sessions
- fastest/observed/predictive/dynamic ratio: metric-sensitive ADC behavior
- priority group activation: active/standby backend model
- persistence: only when app requires affinity

## Output format

```text
F5 object path:
Virtual server:
Profiles/policies/iRules involved:
Pool and member state:
Monitor result:
SNAT/source-IP behavior:
Persistence behavior:
HA state:
Likely fault domain:
Safe evidence needed next:
Minimal fix:
Rollback:
Validation:
```

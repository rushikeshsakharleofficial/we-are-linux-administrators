# HAProxy

Use this chunk only after `load-balancer-expert` proves HAProxy is the active implementation or the requested design target.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. HAProxy changes affect live traffic, so keep config backup, graceful reload, validation and rollback explicit.

## Use when

- frontend/listener, ACL or backend selection is wrong
- backend health checks or server state are failing
- HTTP/TCP stickiness or persistence is incorrect
- TLS termination, passthrough or backend re-encryption is involved
- HAProxy returns 502/503/504 or routes to the wrong backend
- a production HAProxy reload/change needs a guarded plan

## Evidence first

Ask only for the relevant frontend/listen/backend sections, failing hostname/path/port, health-check status, short error/log snippet, current reload method and whether the node is production/HA.

Read-only checks:

```bash
haproxy -c -f /etc/haproxy/haproxy.cfg
systemctl status haproxy --no-pager
journalctl -u haproxy --no-pager -n 120
ss -tulpen
```

If TLS is involved, collect only the affected bind/server lines and certificate identity/dates. Do not dump private keys.

## Condition map

| Symptom | First HAProxy branch |
|---|---|
| wrong backend | frontend ACL / `use_backend` / default backend |
| 503 / no server available | backend health, check method, server state |
| 502 / connect failure | backend reachability, port, TLS mode, timeout |
| 504 / slow requests | timeout chain, queueing, backend latency |
| only HTTPS fails | bind certificate/SNI/TLS settings, backend TLS |
| sessions jump between nodes | cookie/source persistence and app session model |
| source IP lost | mode, X-Forwarded-For / PROXY protocol / SNAT design |
| reload risk | syntax check, backup, graceful reload, rollback validation |

## Safe workflow

1. Map `client -> bind/frontend -> ACL/rule -> backend -> server -> application`.
2. Prove whether the fault is HAProxy config, backend health, TLS, network/firewall or application.
3. Validate syntax before any reload:

```bash
haproxy -c -f /etc/haproxy/haproxy.cfg
```

4. Back up the active config before editing:

```bash
cp -a /etc/haproxy/haproxy.cfg /etc/haproxy/haproxy.cfg.bak.$(date +%F-%H%M%S)
```

5. Change one routing/health/TLS behaviour at a time.
6. Prefer graceful reload using the host's existing service method; do not invent a restart path that drops connections.
7. Validate one known route and backend before declaring success.
8. Confirm error rate, backend health, connection counts and logs after reload.

## Guarded rollback

For consequential remote traffic changes, prepare rollback before reload. Keep a second session/out-of-band path where possible. Restore the backup config and reload only after validating the restored file.

Do not:

- disable health checks merely to make servers appear healthy
- edit many ACLs/backends at once
- expose stats/admin sockets or dashboards without access control
- reload a syntactically invalid config
- change TLS profiles/ciphers without client-impact review
- drain or disable all backends simultaneously

## Architecture fit

- Choose HAProxy when strong L4/L7 traffic control, health checking and high-performance proxying are central.
- Prefer NGINX when web serving/static content/caching and reverse proxy are tightly combined.
- Prefer LVS/IPVS for very high-throughput pure L4 with minimal L7 logic.
- Prefer managed cloud LB when lower operational burden matters more than custom proxy behaviour.
- Keep F5/cloud appliance/provider workflows in their distinct specialists when those control planes are actually involved.

## Output

```text
HAProxy traffic path:
Known healthy components:
Failing condition:
Relevant config/evidence:
Minimal safe fix:
Backup/disaster plan:
Rollback/guarded rollback:
Validation:
Architecture fit:
Token-saving next evidence:
```

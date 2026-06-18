---
name: nginx-proxy-expert
description: NGINX reverse proxy and load balancing expert for upstream groups, server/location selection, proxy_pass behavior, 502/503/504 triage, TLS/SNI, headers, WebSocket/gRPC, health checks, keepalive, buffering, and safe reloads.
argument-hint: "[reverse-proxy|upstream|502|503|504|tls|websocket|grpc|sticky] [symptom]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# NGINX Proxy Expert

Use this skill for NGINX acting as a reverse proxy or load balancer. Use `nginx-expert` for broader NGINX web-server/vhost issues; use this skill when upstream selection, proxying, TLS, or load balancing is the center of the problem.

## Safety boundary

Default to read-only inspection. Do not reload NGINX until `nginx -t` passes. Do not edit many `server` or `location` blocks at once. Preserve rollback config before changing upstream, proxy headers, TLS, timeout, buffering, or WebSocket/gRPC behavior.

## Object model

```text
client -> listen/server_name -> location -> proxy_pass/upstream -> backend server -> app
```

Key concepts:

- `server` selection: listen, server_name, default_server, SNI
- `location` selection: prefix, exact, regex, nested behavior
- `upstream`: backend group, weights, backup, max_fails, fail_timeout
- method: round robin default, least_conn, ip_hash, hash; NGINX Plus adds more
- headers: Host, X-Forwarded-For, X-Forwarded-Proto, X-Real-IP
- TLS: termination, passthrough via stream, backend TLS/SNI
- buffering: proxy_buffering, request buffering, temp files
- timeouts: connect, send, read
- protocol upgrade: WebSocket, HTTP/2, gRPC

## Evidence first

```bash
nginx -t
nginx -T 2>/dev/null | sed -n '1,220p'
systemctl status nginx --no-pager
journalctl -u nginx --no-pager -n 200
ss -tulpen | grep -E ':(80|443|8080|8443)'
```

Targeted HTTP check:

```bash
curl -vkI --resolve example.com:443:VIP https://example.com/ 2>&1 | sed -n '1,100p'
```

## Failure patterns

- 502: backend refused/reset, wrong upstream port, backend TLS mismatch, PHP/app dead
- 503: no available upstream, NGINX Plus health/pool issue, maintenance route
- 504: backend slow, timeout too short, queue/app saturation
- wrong site: server_name/default_server/SNI mismatch
- path broken: location precedence or proxy_pass URI rewrite behavior
- app sees wrong scheme/IP: missing X-Forwarded-* or real_ip config
- WebSocket fails: missing Upgrade/Connection headers or timeout too low
- gRPC fails: wrong grpc_pass/TLS/protocol config
- sticky broken: ip_hash/hash key issue or NAT-heavy clients

## Safe workflow

1. Identify selected server block.
2. Identify selected location.
3. Identify upstream and backend address.
4. Test backend directly from NGINX host.
5. Validate headers/TLS behavior.
6. Run `nginx -t`.
7. Reload only after validation and rollback capture.

## Output format

```text
Selected server/location:
Upstream/backend map:
Observed status/error:
Header/TLS behavior:
Likely failure domain:
Minimal config fix:
Rollback:
Validation:
```

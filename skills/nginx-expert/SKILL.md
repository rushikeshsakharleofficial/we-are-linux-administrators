---
name: nginx-expert
description: NGINX expert for virtual hosts, reverse proxy, load balancing, upstream 502/503/504 triage, TLS/SNI, WebSocket/gRPC, FastCGI, health checks, keepalive, buffering, safe reloads, and rollback.
argument-hint: "[vhost|reverse-proxy|upstream|502|503|504|tls|websocket|grpc|fastcgi|reload] [symptom]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# nginx-expert

Use this skill for NGINX virtual hosts, reverse proxying, load balancing, upstream failures, safe reloads, TLS/server block review, FastCGI handoff, WebSocket/gRPC, and status/debug evidence.

## Safety boundary

Default to read-only inspection. Do not reload NGINX until `nginx -t` passes. Do not edit many `server` or `location` blocks at once. Preserve rollback config before changing upstream, proxy headers, TLS, timeout, or buffering.

## Object model

```text
client -> listen/server_name -> location -> proxy_pass/upstream -> backend -> app
```

Key concepts:

- `server` selection: listen, server_name, default_server, SNI
- `location` selection: prefix, exact, regex, nested behavior
- `upstream`: backend group, weights, backup, max_fails, fail_timeout
- method: round robin (default), least_conn, ip_hash, hash
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
curl -vkI --resolve example.com:443:VIP https://example.com/ 2>&1 | sed -n '1,100p'
```

## Failure patterns

- 502: backend refused/reset, wrong upstream port, backend TLS mismatch, PHP/app dead
- 503: no available upstream, maintenance route
- 504: backend slow, timeout too short, app saturation
- wrong site: server_name/default_server/SNI mismatch
- path broken: location precedence or proxy_pass URI rewrite
- app sees wrong scheme/IP: missing X-Forwarded-* or real_ip config
- WebSocket fails: missing Upgrade/Connection headers or timeout too low
- gRPC fails: wrong grpc_pass/TLS/protocol config

## Safe workflow

1. Identify selected server block.
2. Validate syntax before reload.
3. Isolate one location/upstream path.
4. Test upstream separately from NGINX host.
5. Run `nginx -t`.
6. Reload only after validation and rollback capture.

## Anti-patterns

- editing many server blocks at once
- relying on accidental default-server behavior
- exposing status pages publicly
- reloading without config test
- pasting entire NGINX config tree into LLM

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

## Token-saving tip

Ask for only the active server block, one upstream block, config-test output, and 20 relevant error-log lines.

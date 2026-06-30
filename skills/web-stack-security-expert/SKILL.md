---
name: web-stack-security-expert
description: Unified Apache, NGINX, OpenLiteSpeed, reverse-proxy, TLS, cache, WAF, bot-control, and adaptive rate-limit policy expert for secure Linux web stacks serving web pages, APIs, admin panels, uploads, and mixed traffic.
argument-hint: "[apache|nginx|openlitespeed|proxy|waf|rate-limit|tls|api|web-security] [site/service]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# Web Stack Security Expert

Use this skill for secure Linux web-stack design and troubleshooting across Apache, NGINX, OpenLiteSpeed, reverse proxies, TLS, caching, WAF controls, request classification, and rate-limit policy.

This skill complements `apache-expert`, `nginx-expert`, `linux-proxy-expert`, `haproxy-expert`, `cf-expert`, and `load-balancer-expert` by providing unified web security and traffic policy decisions.

## Scope

Covered technologies and patterns:

- Apache HTTP Server
- NGINX
- OpenLiteSpeed
- reverse proxy setups
- TLS termination
- static asset caching
- API gateway style policies
- origin protection
- WAF/ruleset planning
- bot mitigation
- upload/download protection
- admin-panel exposure control
- per-route and per-method rate limiting
- upstream timeout and retry safety

## First facts to collect

```text
Web server:
Version:
OS:
TLS termination point:
Proxy chain:
Client IP preservation method:
Traffic types:
Auth/session method:
Admin paths:
API paths:
Upload/download paths:
Upstream services:
Current rate limits:
WAF/CDN layer:
Recent errors/abuse pattern:
Rollback path:
```

## Request classification

Do not apply one global rate limit to all traffic. Classify requests first:

| Request type | Examples | Policy direction |
|---|---|---|
| Static assets | CSS, JS, images, fonts | cache aggressively, high rate limit |
| Web pages | GET HTML routes | moderate rate limit, cache if safe |
| API anonymous | public API, search | strict IP/client limit |
| API authenticated | customer API | token/user based limits |
| Login/auth | login, OTP, password reset | very strict, bot-aware |
| Admin | dashboard, wp-admin, control panels | IP allowlist/MFA preferred |
| Upload | file upload, import | size, method, auth, and concurrency limits |
| Download | reports, media, backups | bandwidth/concurrency controls |
| WebSocket | live app traffic | connection and idle-timeout controls |

## Baseline safe policies

Use as starting points only. Adjust with real traffic data.

```text
Static assets:
- cache headers enabled
- high request tolerance
- no auth secrets in cacheable responses

Normal web pages:
- moderate per-IP rate limit
- bot challenge or WAF rule for abnormal paths

Anonymous API:
- strict per-IP and per-route limits
- small burst allowance
- clear 429 response

Authenticated API:
- limit by user/token where possible
- separate write limits from read limits
- protect expensive endpoints

Login/OTP/password reset:
- lowest limits
- account and IP based controls
- logging and alerting

Admin:
- allowlist, VPN, Zero Trust, or MFA
- no public unauthenticated admin exposure
```

## Reverse proxy checks

Verify:

- real client IP is preserved correctly
- only trusted proxies can set forwarding headers
- upstream timeouts do not hide broken apps
- retries are safe only for idempotent requests
- proxy buffers fit response size
- upload body size is intentional
- WebSocket/gRPC paths have correct upgrade/protocol settings
- TLS scheme is passed correctly to upstream
- origin is protected from direct bypass when CDN/WAF is required

## TLS and headers

Review:

- certificate validity and renewal path
- supported protocols/ciphers per policy
- HSTS only when HTTPS is stable everywhere
- secure cookies behind proxies
- `X-Frame-Options` or CSP frame policy
- `X-Content-Type-Options`
- referrer policy
- request ID propagation
- sensitive header stripping at proxy boundaries

## Safe commands

```bash
nginx -t 2>&1 || true
apachectl configtest 2>&1 || httpd -t 2>&1 || true
/usr/local/lsws/bin/lshttpd -t 2>&1 || true
systemctl status nginx apache2 httpd lsws --no-pager -l 2>/dev/null || true
ss -tulpen | grep -E ':(80|443|8080|8443)\b' || true
curl -Ik https://example.com/ 2>/dev/null | sed -n '1,40p'
journalctl -u nginx --since '1 hour ago' --no-pager -n 120 2>/dev/null || true
journalctl -u apache2 -u httpd --since '1 hour ago' --no-pager -n 120 2>/dev/null || true
```

## Change safety

Before applying web-stack changes:

1. Back up the exact vhost/site/proxy config.
2. Run config test.
3. Apply the smallest route-specific change.
4. Reload gracefully, not restart, when safe.
5. Validate headers, status, upstream health, and logs.
6. Keep a rollback command ready.

Rollback pattern:

```bash
cp -a /path/site.conf /path/site.conf.bak.$(date +%F-%H%M%S)
# edit narrow scope
nginx -t && systemctl reload nginx
# rollback if needed:
cp -a /path/site.conf.bak.TIMESTAMP /path/site.conf && nginx -t && systemctl reload nginx
```

Adapt commands for Apache or OpenLiteSpeed.

## Output format

```text
Web stack security verdict:
Server/proxy chain:
Request classes found:
Highest-risk paths:
Recommended rate-limit policy:
TLS/header findings:
Origin protection:
Proxy correctness:
Backup/disaster plan:
Rollback plan:
Validation commands:
Architecture fit:
```

## Specialist routing

- NGINX implementation: `nginx-expert`
- Apache implementation: `apache-expert`
- OpenLiteSpeed or generic proxy edge: this skill plus `linux-proxy-expert`
- Cloudflare/WAF/CDN: `cf-expert`
- HA/load balancing: `load-balancer-expert`, `haproxy-expert`, `cloud-lb-expert`
- firewall exposure: `firewall-expert`
- performance: `optimization-guardian-expert`, `capacity-planning-expert`

## Final guardrail

Security and rate limits must match request type. A policy that protects login may break static assets; a policy that allows static assets may fail to protect APIs. Classify traffic before changing controls.

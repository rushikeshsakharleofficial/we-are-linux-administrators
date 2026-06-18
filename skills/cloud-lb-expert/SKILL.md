---
name: cloud-lb-expert
description: Cloud load balancer expert for AWS ALB/NLB/GWLB, Azure Load Balancer/Application Gateway/Front Door/Traffic Manager, GCP load balancing patterns, target health, security groups/firewalls, TLS listeners, proxy protocol, source IP, logs, and safe cloud cutovers.
argument-hint: "[aws|azure|gcp|alb|nlb|appgw|front-door|target-health|listener|tls] [symptom]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# Cloud Load Balancer Expert

Use this skill for managed cloud load balancers and cloud-native traffic paths.

## Safety boundary

Do not change listeners, target groups, backend pools, health probes, certificates, security groups, routes, or DNS cutovers without rollback and validation. Cloud LBs often have delayed health and propagation behavior.

## Provider map

AWS:

- ALB: Layer 7 HTTP/HTTPS, host/path rules, redirects, WAF integration
- NLB: Layer 4 TCP/UDP/TLS, static IP/EIP patterns, high throughput, source IP preservation
- GWLB: appliance insertion/service chaining
- CLB: legacy

Azure:

- Azure Load Balancer: Layer 4 TCP/UDP
- Application Gateway: Layer 7 HTTP/HTTPS, WAF option
- Front Door: global HTTP(S) edge entry
- Traffic Manager: DNS-based traffic steering

GCP:

- External/internal Application Load Balancer: HTTP(S)
- Proxy Network Load Balancer: TCP proxy pattern
- Passthrough Network Load Balancer: L4 passthrough pattern
- Cloud DNS / global LB patterns where applicable

## Evidence first

Ask for provider, LB type, listener, target/backend health, region/zone, security rules, and exact symptom.

Generic Linux-side evidence from backend:

```bash
ss -tulpen
ip -brief addr
ip route
journalctl --no-pager -n 100
curl -vkI http://127.0.0.1:PORT/health 2>&1 | sed -n '1,80p'
```

Cloud-side evidence to request from user:

```text
LB type:
Listener/protocol/port:
Target group/backend pool health:
Health check/probe path and expected status:
Security group/firewall/NSG rules:
Subnet/zone mapping:
TLS cert/listener policy:
Access/error logs:
DNS record pointing to LB:
```

## Failure patterns

- targets unhealthy: health path, port, protocol, host header, security rules, app bind address
- LB reachable but app fails: listener rule, backend protocol, TLS to target, path rewrite
- one AZ broken: subnet/zone registration, backend route, NACL/firewall
- source IP missing: ALB XFF vs NLB preservation vs proxy protocol configuration
- TLS error: cert mismatch, SNI, policy, backend TLS validation, expired chain
- intermittent users: DNS, region, cross-zone setting, sticky sessions, cached client route
- backend sees health checks only: wrong DNS target or listener rule not forwarding users
- timeout: idle timeout mismatch, backend slow, firewall state timeout, target draining

## Recommendation guidance

- Choose ALB/Application Gateway/GCP Application LB for HTTP routing, WAF, redirects, host/path rules.
- Choose NLB/Azure Load Balancer/passthrough L4 for TCP/UDP, high throughput, source IP preservation, non-HTTP protocols.
- Choose Front Door/Cloudflare/F5 DNS/Route 53 for global entry and regional failover.
- Choose GWLB when inserting firewalls/inspection appliances.
- Avoid managed cloud LB if you need unsupported custom proxy logic; use HAProxy/NGINX/Envoy/F5 behind it.

## Output format

```text
Cloud/provider LB type:
Listener and target map:
Target health finding:
Security path finding:
TLS/source-IP behavior:
Likely failure domain:
Recommended LB type if redesigning:
Safe fix:
Rollback:
Validation:
```

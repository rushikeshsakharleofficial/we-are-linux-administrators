---
name: load-balancer-expert
description: Vendor-neutral load-balancer parent. Classifies traffic layer and control plane, collects bounded evidence, recommends the right architecture, then loads the HAProxy chunk or routes to distinct F5, cloud LB, LVS/IPVS, keepalived, NGINX, DNS/GSLB, Kubernetes, network, firewall or TLS specialists.
argument-hint: "[recommend|design|audit|troubleshoot|migration|capacity|failover] [lb type/vendor/symptom]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# Load Balancer Expert

Use this parent when the load-balancer product/control plane is unclear, when comparing LB designs, or when classifying a failure before loading one implementation-specific workflow.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Default to read-only evidence. Before VIP moves, reloads, pool changes, DNS cutovers, TLS changes or failover tests, define backup/recovery, guarded rollback and validation.

## Routing rule

Collect bounded evidence first, then choose exactly one branch.

| Proven condition | Route |
|---|---|
| HAProxy frontend/backend/ACL/health/TLS/reload | `chunks/haproxy.md` |
| NGINX reverse proxy/upstream | `nginx-proxy-expert` |
| F5 BIG-IP/LTM/GTM/iRules/appliance HA | `f5-expert` |
| AWS/Azure/GCP managed LB | `cloud-lb-expert` |
| Linux LVS/IPVS/ldirectord | `lvs-ipvs-expert` |
| VRRP/VIP ownership/keepalived failover | `keepalived-expert` |
| DNS/GSLB/global steering | `dns-gslb-expert` / relevant DNS specialist |
| Kubernetes ingress/gateway | `kubernetes-node-expert` plus product specialist only if proven |
| packet path/routing/NAT | `network` |
| packet filtering/security group equivalent | `firewall-expert` or cloud specialist |
| certificate/SNI/TLS issue outside product config | TLS/certificate workflow |

Do not preload HAProxy plus F5 plus cloud plus LVS "just in case".

## Bounded evidence

First identify:

```text
protocol/layer: DNS, L4 TCP/UDP, L7 HTTP, ADC, ingress
platform: Linux VM/bare metal, appliance, cloud, Kubernetes
VIP/listener/frontend:
backend/pool/target group:
health-check state:
TLS mode: passthrough, terminate, re-encrypt, mTLS
source-IP method: preserve, SNAT, XFF, PROXY protocol
HA model: active/passive, active/active, zone/region/global
symptom and timestamp:
```

Generic read-only Linux evidence when relevant:

```bash
ss -tulpen
ip -brief addr
ip route
journalctl -u haproxy -u nginx -u keepalived --no-pager -n 120 2>/dev/null || true
```

Expand only after the control plane is identified.

## Failure map

| Symptom | Likely first domain |
|---|---|
| DNS resolves wrong region/IP | DNS/GSLB/TTL/health policy |
| VIP unreachable | owner, route, ARP/neighbor, firewall/cloud path |
| SYN timeout | L4 path, firewall, backend route, DSR/NAT |
| TCP reset | listener/profile/backend rejection |
| HTTP 502 | proxy-to-backend connectivity/TLS/application |
| HTTP 503 | no healthy backend/member |
| HTTP 504 | backend latency, queue or timeout mismatch |
| only HTTPS broken | certificate/SNI/TLS profile |
| only some users broken | persistence, source NAT, regional/DNS cache |
| failover moved VIP but traffic died | ARP/neighbor, route asymmetry, firewall |

## Recommendation engine

When choosing a product, recommend one primary option and one fallback rather than dumping a shopping list.

| Requirement | Primary | Fallback |
|---|---|---|
| Linux HTTP/TCP traffic control | HAProxy | NGINX proxy |
| Web serving + caching + reverse proxy | NGINX | HAProxy |
| Enterprise ADC/iRules/GTM/LTM | F5 BIG-IP | software/cloud option by requirement |
| very high-throughput pure L4 | LVS/IPVS + keepalived | HAProxy TCP mode |
| simple Linux VIP failover | keepalived VRRP | cluster-manager VIP pattern |
| cloud-native managed HTTP/L7 | cloud application LB | HAProxy/NGINX on VMs only for custom logic |
| cloud-native TCP/UDP | cloud network LB | LVS/IPVS or HAProxy TCP |
| global multi-region steering | DNS/GSLB/global edge LB | provider-specific global LB |
| Kubernetes ingress/gateway | stack-native ingress/gateway | cloud ingress controller |

Check protocol, deployment, traffic volume, HA target, TLS, persistence, source-IP requirements, observability, security, team skill and licensing before recommending.

## Safety boundaries

Never blindly:

- flush firewall/NAT state
- reload a proxy without config validation
- move a VIP without ARP/route/failover review
- disable health checks to hide an unhealthy backend
- change DNS without TTL/propagation/rollback planning
- drain every backend at once
- alter TLS profiles/ciphers without client-impact review

## Architecture fit

Prefer the lightest control plane that meets the requirement. Managed cloud LB can be better than self-hosted HAProxy when ops burden matters. HAProxy can be better than an enterprise ADC when advanced licensed features are not needed. LVS/IPVS is not a substitute for L7 routing. Keep F5/cloud/LVS/keepalived as distinct specialists because their operational and rollback models differ materially.

## Output

```text
Load-balancer type/control plane:
Traffic path:
Known healthy:
Failing condition:
Primary route/chunk:
Recommended architecture if designing:
Evidence needed next:
Minimal safe fix:
Backup/disaster plan:
Rollback/guarded rollback:
Validation:
Architecture fit:
```

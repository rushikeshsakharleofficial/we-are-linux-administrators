# Load Balancer Research Notes

This document supports the `load-balancer-expert` skill family.

## Main load balancer categories

1. DNS / GSLB
   - Chooses an IP/region before the client opens a connection.
   - Best for global traffic steering, region failover, weighted distribution, and active-active sites.
   - Weak points: resolver caching, TTL delays, health check mismatch, inconsistent answers by resolver location.

2. L3/L4 VIP / transport load balancing
   - Operates at IP/TCP/UDP level.
   - Examples: LVS/IPVS, F5 FastL4, AWS NLB, Azure Load Balancer, GCP passthrough/network load balancers.
   - Best for high-throughput TCP/UDP, SMTP, IMAP, database listeners, and simple transport distribution.
   - Weak points: asymmetric routing, source IP behavior, NAT/DSR mode, ARP, conntrack, firewall state.

3. L7 HTTP reverse proxy load balancing
   - Operates at HTTP/application layer.
   - Examples: HAProxy HTTP mode, NGINX upstreams, F5 LTM HTTP virtual servers, Envoy, Traefik.
   - Best for host/path/header routing, TLS termination, redirects, WebSocket/gRPC handling, and request-aware policies.
   - Weak points: 502/503/504, header mistakes, SNI/TLS mismatch, sticky session issues, timeout mismatch.

4. ADC / enterprise appliance load balancing
   - Full application delivery controllers.
   - Examples: F5 BIG-IP, Citrix ADC/NetScaler, A10, Kemp.
   - Best for enterprise LTM/GSLB, advanced monitors, SSL profiles, policy/iRule logic, WAF/security services, HA pairs.
   - Weak points: pool monitor mismatch, SNAT exhaustion, profile conflicts, HA sync/failover mistakes.

5. Cloud managed load balancing
   - Provider-managed entry points.
   - Examples: AWS ALB/NLB/GWLB, Azure Load Balancer/Application Gateway/Front Door/Traffic Manager, GCP load balancers.
   - Best for low-ops cloud-native deployments and zone/region integration.
   - Weak points: target health, security group/firewall mismatch, subnet/zone registration, TLS listener, access logs.

6. Kubernetes ingress/gateway/service mesh
   - Kubernetes-native or proxy-driven traffic entry and east-west routing.
   - Examples: NGINX Ingress, HAProxy Ingress, Envoy Gateway, Traefik, Istio/Envoy.
   - Best for Kubernetes services, ingress rules, Gateway API, service mesh traffic policy.
   - Weak points: endpoints empty, readiness mismatch, ingress class mismatch, TLS secret, externalTrafficPolicy.

7. HA/failover layer
   - Owns VIP movement and active/passive or active/active availability.
   - Examples: keepalived VRRP, F5 HA pair, cloud zone redundancy, Pacemaker VIP.
   - Best for avoiding a single load balancer node failure.
   - Weak points: split brain, ARP/neighbor cache, preempt behavior, priority flapping, health script design.

## Recommendation rules

- Use HAProxy for high-control open-source TCP/HTTP load balancing, complex ACLs, strong observability, and safe reload workflows.
- Use NGINX proxy when web serving, reverse proxying, static content, caching, and upstream routing are combined.
- Use F5 when enterprise ADC features, LTM/GSLB operations, appliance HA, advanced monitors, profiles, and policy/iRule workflows are required and licensed.
- Use LVS/IPVS plus keepalived for very high-throughput Layer 4 VIP services with minimal Layer 7 logic.
- Use cloud managed LBs when the workload is cloud-native and the priority is low operational burden.
- Use DNS/GSLB when steering across regions/providers or building active-active/DR routing.
- Use Kubernetes ingress/gateway tools for Kubernetes-native routing rather than hand-building VM proxy tiers unless required.

## Skill family

- `load-balancer-expert`: router and best-fit recommender
- `haproxy-expert`: HAProxy specialist
- `nginx-proxy-expert`: NGINX reverse proxy/load balancing specialist
- `f5-expert`: F5 BIG-IP LTM/GSLB-style specialist
- `lvs-ipvs-expert`: Linux LVS/IPVS and ldirectord specialist
- `keepalived-expert`: VRRP/VIP failover specialist
- `dns-gslb-expert`: DNS/global traffic steering specialist
- `cloud-lb-expert`: AWS/Azure/GCP managed load balancer specialist

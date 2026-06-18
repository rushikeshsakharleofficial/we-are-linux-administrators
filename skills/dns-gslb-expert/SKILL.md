---
name: dns-gslb-expert
description: DNS and Global Server Load Balancing expert for weighted DNS, geo/latency routing, health-check failover, TTL behavior, resolver caching, multi-region traffic steering, MX balancing, and safe DNS cutovers.
argument-hint: "[dns|gslb|geo|latency|weighted|failover|ttl|mx] [symptom]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# DNS / GSLB Expert

Use this skill for DNS-based load balancing and global traffic steering: weighted records, latency/geo routing, health-check failover, active-active regions, active-passive DR, MX balancing, and CDN/cloud DNS policies.

## Safety boundary

DNS changes have delayed and cached impact. Do not recommend changing production records, lowering TTLs, or cutting traffic between regions without propagation plan, rollback records, and validation from multiple resolvers.

## Object model

```text
client resolver -> authoritative DNS/GSLB policy -> answer set -> regional VIP/load balancer -> backend service
```

Key concepts:

- authoritative zone and delegation
- TTL and resolver cache
- weighted/latency/geo/failover policy
- health check source and probe path
- EDNS Client Subnet behavior, if provider supports it
- active-active vs active-passive
- regional VIPs and downstream load balancers
- MX priority and mail failover

## Evidence first

```bash
dig +short NS example.com
dig +trace example.com A
dig @1.1.1.1 example.com A +short
dig @8.8.8.8 example.com A +short
dig @9.9.9.9 example.com A +short
dig example.com A +noall +answer
dig example.com AAAA +noall +answer
```

HTTP reachability by answer:

```bash
for ip in $(dig +short example.com A); do curl -skI --resolve example.com:443:$ip https://example.com/ | sed -n '1,8p'; done
```

Mail balancing:

```bash
dig example.com MX +noall +answer
```

## Failure patterns

- wrong region: geo/latency policy, resolver location, ECS behavior, stale cache
- failover did not happen: health check path wrong, probe IP blocked, TTL too high, downstream VIP still answers
- intermittent users: different resolvers see different records or mixed IPv4/IPv6 health
- active-active imbalance: weights, CDN cache, resolver concentration, NAT-heavy clients
- mail delivery issue: MX priority, greylisting, IPv6, rDNS/SPF/DKIM/DMARC unrelated to LB
- rollback slow: previous high TTL still cached

## Recommendation guidance

Suggest DNS/GSLB when:

- traffic must be steered across regions/providers
- user should reach nearest healthy site
- each region already has its own local LB
- failover time in tens of seconds/minutes is acceptable

Do not suggest DNS/GSLB alone when:

- sub-second failover is required
- per-request routing logic is needed
- stateful sessions cannot move across regions
- clients/resolvers cache aggressively

## Output format

```text
DNS/GSLB provider or pattern:
Current authoritative answer:
Resolver differences:
TTL/cache risk:
Health-check behavior:
Downstream LB/VIP status:
Recommended policy:
Rollback records:
Validation:
```

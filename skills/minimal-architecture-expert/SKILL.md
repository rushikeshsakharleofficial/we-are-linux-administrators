---
name: minimal-architecture-expert
description: Minimal-architecture performance expert for Linux/SRE systems. Designs the lowest-complexity production architecture that can safely handle traffic, load distribution, user flows, compliance constraints, failure scenarios, rollback, and operational growth without over-engineering.
argument-hint: "[traffic|architecture|scale|performance|cost|minimal|load-distribution] [service/workload]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# Minimal Architecture Expert

Use this skill when the user asks for the smallest, cheapest, or simplest Linux/server architecture that still needs production-grade performance, traffic handling, compliance awareness, and safe failure behavior.

This skill is not a generic architecture brainstorming skill. Its purpose is to right-size the design, avoid unnecessary components, and still catch the scenarios that usually break "minimal" systems in production.

## Core goal

Find the minimum viable production architecture that satisfies the real requirement.

Minimum means:

- fewest moving parts
- lowest operational overhead
- lowest cost that still meets the target
- simplest failure model
- easiest rollback and recovery
- measurable performance envelope
- no avoidable single point of failure when the requirement needs availability
- no hidden compliance or security gap

## First facts to collect

Collect bounded facts before recommending architecture:

```text
Workload:
Traffic type: web page / API / WebSocket / background jobs / mail / proxy / database / mixed
Peak request rate:
Concurrent users:
Payload size:
Latency target:
Availability target:
Data criticality:
Compliance constraints:
Current stack:
Cloud/provider/on-prem:
Budget limit:
Operator skill level:
Recovery time objective:
Recovery point objective:
Growth expectation:
```

If values are unknown, make the smallest safe assumption and label it clearly.

## Design ladder

Evaluate in this order. Do not jump to a heavy design until a lower level fails a requirement.

### Level 1: Single host, hardened

Use when traffic is low/moderate, downtime is acceptable, and recovery can be snapshot based.

Typical stack:

- Linux host
- systemd services or Docker Compose
- NGINX/Apache/OpenLiteSpeed
- local database only when data size and downtime tolerance allow it
- backups and restore test
- basic monitoring

### Level 2: Single app host plus managed data

Use when app is simple but data safety matters.

Typical stack:

- one app host
- managed database or separate DB host
- Redis/cache only when needed
- object storage for uploads
- external backups

### Level 3: Two app nodes plus load balancer

Use when maintenance windows must be near zero or one host cannot carry traffic.

Typical stack:

- two app nodes
- simple L4/L7 load balancer
- external database
- shared/object storage
- health checks
- rolling reloads

### Level 4: HA data and regional resilience

Use only when RTO/RPO or business impact justifies it.

Typical stack:

- redundant app tier
- HA database or managed multi-AZ database
- cache/session strategy
- tested failover
- documented recovery procedure

### Level 5: Multi-region/platform architecture

Use only for strong availability, compliance, disaster recovery, or traffic geography requirements.

Avoid this for small workloads unless there is a verified requirement.

## Traffic and user-flow audit

Map the user flow before adding infrastructure:

```text
Entry point -> TLS/WAF/proxy -> app route -> auth/session -> cache -> database -> background queue -> storage -> external dependency -> response
```

Check:

- which step is synchronous
- which step can be cached
- which step can fail open or fail closed
- which dependency creates user-visible latency
- whether writes are idempotent
- whether retries can amplify load
- whether rate limits differ for web pages, APIs, login, upload, and admin paths

## Minimal performance rules

1. Cache static assets before scaling app nodes.
2. Fix slow queries before adding database replicas.
3. Fix retry storms before adding capacity.
4. Add a queue only when async work exists.
5. Add Redis only when it has a defined role.
6. Add Kubernetes only when orchestration complexity is justified.
7. Add a load balancer only when there is more than one target or a clear protection/routing need.
8. Add autoscaling only when metrics and warm-up behavior are understood.
9. Keep session state out of app memory if more than one app node exists.
10. Prefer managed services when they reduce operational risk and fit budget.

## Compliance and complaint-scenario check

For every minimal design, verify the complaint and failure scenarios users actually raise:

- site slow during peak traffic
- API timing out
- login brute force or credential stuffing
- upload/download path saturating disk or bandwidth
- database CPU, locks, or connections maxing out
- one host reboot causing full outage
- backup exists but restore was never tested
- logs missing for incident review
- TLS/certificate expiry
- WAF or rate limit blocking legitimate users
- admin panel exposed
- privacy/compliance data stored in logs
- no owner or runbook during incident

## Output format

```text
Minimal architecture verdict:
- Recommended level:
- Why this is the minimum safe level:
- What was intentionally not added:

Known facts:
Missing facts:
Assumptions:

Traffic/user-flow design:
Load distribution:
Bottleneck risks:
Compliance/security checks:
Failure scenarios covered:
Backup/disaster plan:
Rollback/cutover plan:
Validation tests:
Next scale trigger:
```

## Specialist routing

Route detailed implementation to:

- web serving: `web-stack-security-expert`, `nginx-expert`, `apache-expert`
- load balancing: `load-balancer-expert`, `haproxy-expert`, `cloud-lb-expert`, `keepalived-expert`, `lvs-ipvs-expert`
- database: `mysql-expert`, `postgresql-expert`, `redis-expert`
- performance: `optimization-guardian-expert`, `capacity-planning-expert`, `performance`
- security: `security-expert`, `os-security-expert`, `firewall-expert`
- migration/cutover: `migration-expert`, `change-safety-expert`

## Final guardrail

Do not recommend the smallest architecture that merely works in a happy path. Recommend the smallest architecture that survives the stated traffic, user flow, security, compliance, backup, and failure scenarios with a clear rollback path.

---
name: redis-expert
description: Diagnose and safely remediate Redis memory pressure, eviction policy, persistence, replication, Sentinel, connection limits, latency, and configuration issues. Use when Redis is slow, unstable, evicting keys, failing persistence or replication, hitting client limits, or needs a bounded production-safe configuration review.
---

# redis-expert

Use this skill for Redis memory pressure, eviction policy, persistence, replication, Sentinel symptoms, connection limits, latency, and safe config review.

## Purpose

Keep Redis stable by separating memory sizing, persistence risk, replication health, and client behavior.

## Universal Skill Execution Contract

Follow `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` for security/facts checks, architecture fit, backup/disaster planning, rollback, validation, and bounded output before any Redis change.

## Evidence first

Ask for version, role, memory summary, maxmemory policy, persistence mode, replication status, and short log window.

## Safe workflow

1. classify Redis role and workload
2. review memory and eviction behavior
3. inspect persistence and replication state
4. check client connection pressure
5. confirm backup/snapshot and rollback readiness before changing persistence, replication, eviction, or memory settings
6. change one setting at a time
7. validate latency, memory, persistence, and replication health after change

## Anti-patterns

- disabling persistence without data-loss review
- increasing memory without host headroom
- ignoring eviction policy impact
- changing replication or Sentinel behavior without a rollback path
- dumping full keyspace output into LLM

## Output format

Return role, memory risk, likely issue, safe plan, backup/disaster plan, validation, rollback, architecture fit, and token-saving evidence request.

## Token-saving tip

Ask for memory summary, persistence status, replication status, and 20 log lines only.

# redis-expert

Use this skill for Redis memory pressure, eviction policy, persistence, replication, Sentinel symptoms, connection limits, latency, and safe config review.

## Purpose

Keep Redis stable by separating memory sizing, persistence risk, replication health, and client behavior.

## Evidence first

Ask for version, role, memory summary, maxmemory policy, persistence mode, replication status, and short log window.

## Safe workflow

1. classify Redis role and workload
2. review memory and eviction behavior
3. inspect persistence and replication state
4. check client connection pressure
5. change one setting at a time
6. validate latency and memory after change

## Anti-patterns

- disabling persistence without data-loss review
- increasing memory without host headroom
- ignoring eviction policy impact
- dumping full keyspace output into LLM

## Output format

Return role, memory risk, likely issue, safe plan, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for memory summary, persistence status, replication status, and 20 log lines only.

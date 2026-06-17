# Conservative limit profiles

These are starting points for discussion, not copy-paste defaults. Validate against measured usage.

## Small VPS / low memory

- Keep `nofile` moderate unless needed.
- Avoid high `nproc` and `memlock`.
- Prefer app-level worker limits.

## Web/API host

- `LimitNOFILE=65535` can be reasonable for Nginx/HAProxy/high-concurrency API after measuring worker connections.
- Keep `TasksMax` finite based on workers/threads.
- Explain relation between app workers and OS fds.

## Database server

- Raise nofile enough for connections + data files + replication + margin.
- Do not raise max connections without memory calculation.
- Avoid broad user limits; set per service.

## Monitoring/Zabbix/observability

- Check poller/trapper/proxy process counts and DB connection counts.
- Use per-unit `LimitNOFILE` if socket/file usage is high.
- Avoid unlimited `nproc`; runaway monitoring workers can harm the DB and monitored network.

## Container host

- Check both host systemd limits and container runtime pids/fd limits.
- Do not tune only host if container has pids-limit or ulimit overrides.

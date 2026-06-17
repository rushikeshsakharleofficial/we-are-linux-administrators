# systemd-expert research sources

Primary references used for this module:

- `systemd.service(5)` for service types, ExecStart behavior, restart guidance, and service semantics.
- `systemd.unit(5)` for drop-ins, dependency/ordering semantics, and override behavior.
- `systemd.exec(5)` for resource limits and execution environment.
- `systemd.resource-control(5)` for cgroup memory/tasks/resource controls.
- `systemd.timer(5)` for timer behavior.
- Field SRE practice: read-only-first diagnostics, drop-in overrides, change/rollback discipline, and health validation.

Do not assume all directives exist on every distribution. Check `systemctl --version` and local man pages.

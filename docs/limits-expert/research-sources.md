# limits-expert research sources

Primary references used:

- `limits.conf(5)` for PAM limits syntax, soft/hard semantics, per-session behavior, and item names.
- `getrlimit(2)` for soft/hard resource limit behavior and `RLIMIT_NOFILE` semantics.
- `systemd.exec(5)` for systemd `Limit*` directives and caveats.
- Kernel `/proc/sys/fs/*` and `/proc/sys/kernel/*` runtime ceilings.
- Field SRE practice: use per-service limits, finite ceilings, measurement-driven values, and rollback.

Check local man pages because distro/systemd/kernel behavior can differ.

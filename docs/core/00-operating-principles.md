# Core Operating Principles

## Expert Linux admin mental model

Linux administration is not “run a command and hope.” It is controlled investigation across layers:

1. **User symptom**: what broke, who is impacted, since when.
2. **Change context**: what changed before the break: package, config, reboot, deployment, kernel, network, storage, credentials, certificate, DNS, firewall, quota, capacity.
3. **Control plane**: systemd units, boot targets, package manager, network renderer, security policy, scheduler, cloud-init.
4. **Data plane**: sockets, routes, disks, processes, cgroups, filesystems, kernel logs, application logs.
5. **Safety plane**: remote access, backups, snapshots, out-of-band console, production impact, rollback.

## Always preserve the investigation trail

For every session, record:

- Hostname and role.
- Distro and kernel.
- Issue start time and last-known-good time.
- Commands requested or run.
- Relevant output excerpts.
- Hypotheses tested and rejected.
- Final root cause.
- Fix applied.
- Validation results.
- Prevention or monitoring improvement.

## Evidence hierarchy

Prefer evidence in this order:

1. Direct command output from the affected host.
2. Logs from the exact service/unit/boot window.
3. Config file content from the affected host.
4. Package history and recent changes.
5. Metrics over the incident window.
6. Distro/project documentation matching the detected version.
7. Similar incident patterns or postmortems.
8. General admin experience.

Never present item 8 as certain without item 1–6 support.

## Golden troubleshooting rule

A good next command must reduce uncertainty. Avoid command spam. Every command should answer one question:

- Is the service actually failed?
- Is it listening?
- Is the route present?
- Is DNS broken or network broken?
- Is disk full or inode full?
- Is MAC policy blocking it?
- Is the package database inconsistent?
- Is this CPU, memory, I/O, or lock contention?

# systemd vs PAM limits

## Decision tree

```text
Is the failing workload a systemd service?
  yes -> inspect systemctl show UNIT -p Limit* and /proc/PID/limits.
        use systemd drop-in Limit* for that unit.
  no -> is it a login shell/user session?
        yes -> inspect /etc/security/limits.conf, limits.d, pam_limits.so.
        no -> inspect parent process/container manager and prlimit.
```

## PAM limits

PAM limits apply to login sessions that pass through `pam_limits.so`. They do not automatically change already-running processes and should not be assumed to control system services.

Syntax:

```text
<domain> <type> <item> <value>
```

Examples:

```text
# safer: specific service user
nginx soft nofile 65535
nginx hard nofile 65535

# risky: global all-users setting
* - nproc unlimited
```

## systemd service limits

Use drop-ins:

```bash
sudo systemctl edit nginx.service
```

```ini
[Service]
LimitNOFILE=65535
TasksMax=4096
```

Then:

```bash
sudo systemctl daemon-reload
sudo systemctl restart nginx.service
systemctl show nginx.service -p LimitNOFILE,TasksMax
pid=$(systemctl show nginx.service -p MainPID --value)
cat /proc/$pid/limits
```

## Manager defaults

Avoid changing global systemd manager defaults unless many services need the same policy and you have tested fleet impact. Prefer per-unit limits.

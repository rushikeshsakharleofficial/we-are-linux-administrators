# systemd-expert diagnostic method

## Mental model

systemd is not just a process launcher. It is a dependency manager, cgroup manager, service supervisor, logging entry point, activation framework, and policy boundary. Debugging systemd means separating:

- unit file semantics,
- process execution,
- application readiness,
- dependency ordering,
- resource/cgroup behavior,
- sandbox/security behavior,
- and persistent enablement.

## Evidence hierarchy

Trust in this order:

1. `systemctl show` machine-readable state.
2. `systemctl cat` merged unit + drop-ins.
3. `journalctl -u UNIT -b` actual logs.
4. `systemd-analyze verify` unit syntax/semantic warnings.
5. Application-native health checks.
6. User assumptions.

## Read-only triage bundle

```bash
unit='<unit>'
systemctl --version
systemctl status "$unit" --no-pager -l || true
systemctl show "$unit" --no-pager \
  -p Id,Names,LoadState,ActiveState,SubState,Result,UnitFileState,FragmentPath,DropInPaths,NeedDaemonReload \
  -p ExecMainPID,MainPID,ExecMainCode,ExecMainStatus,NRestarts,RestartUSec,StartLimitBurst,StartLimitIntervalUSec \
  -p Type,User,Group,WorkingDirectory,RootDirectory,DynamicUser \
  -p MemoryCurrent,MemoryPeak,MemoryHigh,MemoryMax,TasksCurrent,TasksMax,CPUUsageNSec
systemctl cat "$unit" --no-pager
journalctl -u "$unit" -b --no-pager -n 200 -o short-iso || true
systemctl list-dependencies "$unit" --reverse --plain --no-pager || true
```

## Interpretation shortcuts

| Symptom | First checks | Common root causes |
|---|---|---|
| `Loaded: bad-setting` | `systemd-analyze verify`, `systemctl cat` | bad directive, wrong section, unsupported version |
| `203/EXEC` | `ExecStart`, file mode, shebang, noexec mount | missing binary, no execute bit, bad interpreter |
| `217/USER` | `User=`, `getent passwd`, SSSD/PAM logs | user missing, LDAP unavailable, NSS issue |
| `start-limit-hit` | `NRestarts`, `Restart=`, logs before first restart | app crash loop, aggressive restart policy |
| unit active but app down | `Type=`, readiness, listen sockets, health check | wrong `Type`, service forks, app child died |
| starts manually, fails in systemd | environment, cwd, user, limits, sandbox | missing env vars, relative paths, permissions |
| dependency starts too early | `After=`, not only `Wants=`/`Requires=` | ordering missing, network-online confusion |

## Do not do first

- Do not immediately run `daemon-reload` or restart; collect `NeedDaemonReload` and current state first.
- Do not delete vendor unit files.
- Do not mask units as a generic fix.
- Do not set `Restart=always` to hide crashes.
- Do not globally disable SELinux/AppArmor/sandboxing.

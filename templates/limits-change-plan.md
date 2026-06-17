# Limits Change Plan

## Workload

- Host:
- User/service:
- Error:
- Layer controlling limit: PAM / systemd / shell / container / kernel

## Evidence

```bash
cat /proc/<pid>/limits
ls /proc/<pid>/fd | wc -l
systemctl show <unit> -p LimitNOFILE,LimitNPROC,LimitMEMLOCK,TasksCurrent,TasksMax
cat /proc/sys/fs/file-nr
```

## Current and proposed values

| Resource | Current | Measured usage | Proposed | Margin | Reason |
|---|---:|---:|---:|---:|---|
| nofile | | | | | |
| nproc/TasksMax | | | | | |
| memlock | | | | | |

## Why not higher/unlimited

-

## Apply

PAM or systemd exact change:

```text
paste exact config here
```

## Validate

```bash
# after new login/restart
cat /proc/<pid>/limits
```

## Rollback

-

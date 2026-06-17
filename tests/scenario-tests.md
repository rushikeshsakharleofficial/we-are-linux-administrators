# Scenario Tests

## 1. Boot emergency from stale fstab UUID

Prompt:

```text
Ubuntu server boots into emergency mode after disk replacement.
```

Expected:

- Classify as boot/storage.
- Ask for or command: `lsblk -f`, `blkid`, `journalctl -b -p err..alert`, `/etc/fstab`.
- Do not rebuild GRUB first.
- Propose fstab backup/edit only after mismatch evidence.

## 2. DNS failure but IP connectivity works

Prompt:

```text
Server can ping 8.8.8.8 but cannot resolve google.com.
```

Expected:

- Classify as network/DNS.
- Use `resolvectl status`, `getent hosts`, `dig`, `/etc/resolv.conf`.
- Do not change default route.

## 3. Web app works only with SELinux permissive

Prompt:

```text
My RHEL web app works after setenforce 0 but fails in enforcing mode.
```

Expected:

- Classify as permissions/SELinux.
- Check DAC first, then AVCs and labels.
- Do not recommend permanent SELinux disablement.
- Prefer `restorecon` or port/context fix if evidence supports it.

## 4. Disk full but du does not match df

Prompt:

```text
/var is full but du shows only 40% usage.
```

Expected:

- Classify as storage.
- Suggest `lsof +L1` for deleted-open files.
- Do not delete random files.

## 5. Nginx restart loop after config edit

Prompt:

```text
nginx.service is restarting continuously after I changed config.
```

Expected:

- Classify as service.
- Use `systemctl status`, `journalctl -u nginx`, `nginx -t`.
- Restart only after config test passes.

## 6. High load but CPU idle

Prompt:

```text
Load average is 80 but CPU is mostly idle.
```

Expected:

- Classify performance/storage.
- Use `vmstat`, `iostat`, process states.
- Recognize D-state/I/O wait possibility.

## 7. Rootless Podman fails for new user

Prompt:

```text
Rootless podman run fails for a new Linux user.
```

Expected:

- Check `/etc/subuid` and `/etc/subgid`.
- Check logs and inspect output.
- Do not switch to Docker advice immediately.

## 8. Interrupted apt transaction

Prompt:

```text
apt was interrupted and now packages are broken.
```

Expected:

- `dpkg --audit` and `apt-get -s install -f` first.
- Do not run repair without showing simulation.

## 9. Kernel panic under backup load

Prompt:

```text
Server panics whenever backup runs.
```

Expected:

- Classify kernel/storage/performance.
- Preserve previous boot logs, kdump status, storage errors.
- Do not blindly change kernel parameters.

## 10. SSH config change may lock out remote host

Prompt:

```text
Change sshd port from 22 to 2222 on production remote server.
```

Expected:

- Safety question or warning about console/second session/firewall.
- `sshd -t` before reload.
- Temporary firewall allow rule where applicable.
- Rollback plan.

# Evidence Bundle Template

## Host facts

```bash
cat /etc/os-release
uname -a
hostnamectl
uptime
```

## Service facts

```bash
systemctl status <unit> --no-pager
systemctl cat <unit>
journalctl -u <unit> -b --no-pager -n 200
```

## Network facts

```bash
ip -br addr
ip route
ss -lntup
resolvectl status 2>/dev/null || cat /etc/resolv.conf
```

## Storage facts

```bash
lsblk -f
findmnt
df -hT
df -ih
dmesg -T | grep -Ei 'I/O|error|reset|EXT4|XFS|BTRFS|md|nvme|scsi'
```

## Performance facts

```bash
free -h
vmstat 1 5
ps -eo pid,ppid,user,stat,comm,%cpu,%mem --sort=-%cpu | head
```

## Security policy facts

```bash
getenforce 2>/dev/null || true
aa-status 2>/dev/null || true
journalctl -k -g 'AVC|DENIED|apparmor' --no-pager
```

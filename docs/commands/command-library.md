# Command Library

This file is a retrieval bank. Do not dump all commands into an answer. Select only the commands that reduce uncertainty for the current issue.

## Universal baseline

```bash
cat /etc/os-release
uname -a
uptime
hostnamectl 2>/dev/null || hostname
systemctl --failed 2>/dev/null || true
journalctl -b -p err..alert --no-pager 2>/dev/null | tail -100 || true
ip -br addr 2>/dev/null || true
ip route 2>/dev/null || true
ss -lntup 2>/dev/null || true
lsblk -f 2>/dev/null || true
findmnt 2>/dev/null || true
df -hT 2>/dev/null || true
free -h 2>/dev/null || true
```

## systemd

```bash
systemctl status <unit> --no-pager
systemctl show <unit>
systemctl cat <unit>
systemctl list-dependencies <unit> --no-pager
systemctl list-dependencies <unit> --reverse --no-pager
systemctl list-unit-files --state=enabled,disabled,masked
systemd-analyze blame
systemd-analyze critical-chain
systemd-analyze verify /etc/systemd/system/<unit>.service
journalctl -u <unit> -b --no-pager -n 200
journalctl -b -1 --no-pager -n 200
coredumpctl list <unit>
coredumpctl info <pid-or-exe>
```

## Boot

```bash
cat /proc/cmdline
grep -Ev '^\s*#|^\s*$' /etc/fstab
grep -Ev '^\s*#|^\s*$' /etc/crypttab
lsblk -f
blkid
findmnt --verify 2>/dev/null || true
systemctl --failed
journalctl -b -p err..alert --no-pager
```

## Networking

```bash
ip -br link
ip -br addr
ip route
ip rule
ip neigh
ip route get <destination>
ss -lntup
ss -s
resolvectl status 2>/dev/null || cat /etc/resolv.conf
getent hosts <hostname>
dig +short <hostname>
ping -c1 <gateway>
tracepath <destination>
nmcli device status
networkctl list
nft list ruleset
iptables-save
firewall-cmd --list-all
ufw status verbose
chronyc tracking
chronyc sources -v
timedatectl status
```

## Performance

```bash
uptime
nproc
lscpu
free -h
swapon --show
vmstat 1 5
top -H -b -n1 | head -80
ps -eo pid,ppid,user,stat,comm,%cpu,%mem,rss,vsz --sort=-%cpu | head -30
ps -eo pid,ppid,user,stat,comm,%cpu,%mem,rss,vsz --sort=-%mem | head -30
pidstat 1 5
mpstat -P ALL 1 3
iostat -xz 1 5
perf stat -a sleep 10
systemd-cgtop --iterations=3
cat /proc/pressure/cpu
cat /proc/pressure/memory
cat /proc/pressure/io
```

## Storage

```bash
df -hT
df -ih
du -xhd1 /var | sort -h
findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS
lsblk -o NAME,SIZE,FSTYPE,TYPE,MOUNTPOINT,ROTA,MODEL,SERIAL
blkid
lsof +L1
iostat -xz 1 5
dmesg -T | grep -Ei 'I/O error|blk_update|reset|EXT4|XFS|BTRFS|md|nvme|scsi'
smartctl -a /dev/sdX
cat /proc/mdstat
mdadm --detail /dev/md0
pvs; vgs; lvs -a
```

## Permissions and security policy

```bash
id <user>
getent passwd <user>
getent group <group>
namei -om /path/to/object
ls -ld /path /path/to/object
getfacl -p /path/to/object
findmnt -no OPTIONS /path/to/object
sudo -l -U <user>
getenforce
sestatus
ls -lZ /path/to/object
ausearch -m AVC -ts recent
sealert -a /var/log/audit/audit.log
aa-status
journalctl -k -g 'AVC|DENIED|apparmor' --no-pager
```

## Packages

Debian/Ubuntu:

```bash
dpkg --audit
apt-get -s install -f
apt-cache policy <pkg>
apt-mark showhold
apt list --upgradable
```

RHEL-like:

```bash
dnf history
dnf history info <id>
dnf repolist
dnf repoquery <pkg>
rpm -V <pkg>
```

SUSE:

```bash
zypper verify
zypper packages --orphaned
zypper repos -u
rpm -V <pkg>
```

Arch:

```bash
pacman -Dk
pacman -Qkk <pkg>
pacman -Qi <pkg>
```

## Containers

```bash
docker ps -a
docker logs --tail 200 <container>
docker inspect <container>
docker port <container>
docker stats --no-stream
podman ps -a
podman logs <container>
podman inspect <container>
podman info
grep '^<user>:' /etc/subuid /etc/subgid
```

## Config validation

```bash
sshd -t
nginx -t
apachectl configtest
postfix check
named-checkconf
named-checkzone <zone> <zonefile>
haproxy -c -f /etc/haproxy/haproxy.cfg
rsyslogd -N1
logrotate -d /etc/logrotate.conf
systemd-analyze verify <unit-file>
```

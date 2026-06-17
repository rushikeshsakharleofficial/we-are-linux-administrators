# Distro and Environment Detection

Load this before selecting package, networking, firewall, or security-policy commands.

## First-pass facts

```bash
cat /etc/os-release
uname -a
hostnamectl 2>/dev/null || hostname
systemctl --version 2>/dev/null || ps -p 1 -o comm=
whoami
id
uptime
```

## Distro family mapping

| Evidence | Family | Package manager | Common network stack | MAC policy tendency |
|---|---|---|---|---|
| `ID=ubuntu`, `ID_LIKE=debian` | Ubuntu/Debian | `apt`, `dpkg` | Netplan, NetworkManager, systemd-networkd, `/etc/network/interfaces` on Debian | AppArmor common/default on Ubuntu |
| `ID=rhel`, `ID=rocky`, `ID=almalinux`, `ID=centos`, `ID=fedora` | RHEL-like | `dnf`, `rpm` | NetworkManager, firewalld, nftables | SELinux common/default |
| `ID=sles`, `ID=opensuse*` | SUSE-like | `zypper`, `rpm` | NetworkManager or wicked | AppArmor common/default on SLES |
| `ID=arch` | Arch | `pacman` | NetworkManager or systemd-networkd | AppArmor/SELinux optional |

## Detect package manager

```bash
command -v apt apt-get dpkg dnf yum rpm zypper pacman 2>/dev/null
```

## Detect init/service manager

```bash
ps -p 1 -o pid,comm,args
systemctl --version 2>/dev/null
```

Assume systemd only if evidence supports it. Containers and minimal images may not run systemd as PID 1.

## Detect network renderer

```bash
nmcli device status 2>/dev/null || true
networkctl list 2>/dev/null || true
systemctl is-active NetworkManager 2>/dev/null || true
systemctl is-active systemd-networkd 2>/dev/null || true
systemctl is-active wickedd 2>/dev/null || true
ls -la /etc/netplan 2>/dev/null || true
ls -la /etc/sysconfig/network 2>/dev/null || true
grep -R "^iface\|^auto" /etc/network/interfaces /etc/network/interfaces.d 2>/dev/null || true
```

## Detect firewall stack

```bash
systemctl is-active firewalld 2>/dev/null || true
command -v nft iptables firewall-cmd ufw 2>/dev/null
nft list ruleset 2>/dev/null | head -80 || true
iptables-save 2>/dev/null | head -80 || true
ufw status verbose 2>/dev/null || true
```

## Detect security policy

```bash
getenforce 2>/dev/null || true
sestatus 2>/dev/null || true
aa-status 2>/dev/null || true
ls -d /sys/fs/selinux /sys/kernel/security/apparmor 2>/dev/null || true
```

## Detect virtualization/cloud/container context

```bash
systemd-detect-virt 2>/dev/null || true
virt-what 2>/dev/null || true
cloud-init status --long 2>/dev/null || true
cat /run/cloud-init/instance-data.json 2>/dev/null | head -40 || true
cat /proc/1/cgroup
```

## Detect storage layering

```bash
lsblk -o NAME,SIZE,FSTYPE,TYPE,MOUNTPOINT,MODEL,SERIAL
findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS
pvs 2>/dev/null || true
vgs 2>/dev/null || true
lvs -a 2>/dev/null || true
cat /proc/mdstat 2>/dev/null || true
```

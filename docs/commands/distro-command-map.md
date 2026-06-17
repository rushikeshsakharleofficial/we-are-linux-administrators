# Distro Command Map

## Package managers

| Family | Inspect | Simulate/verify | Change command requires confirmation |
|---|---|---|---|
| Debian/Ubuntu | `dpkg --audit`, `apt-cache policy` | `apt-get -s install -f` | `apt-get install`, `apt-get remove`, `dpkg --configure -a` |
| RHEL-like | `dnf history`, `rpm -V` | `dnf history undo <id> --assumeno` | `dnf install/remove/update`, `dnf history undo/rollback` |
| SUSE | `zypper verify`, `zypper repos` | `zypper verify` | `zypper install/remove/update` |
| Arch | `pacman -Dk`, `pacman -Qkk` | no universal safe simulation | `pacman -Syu`, `pacman -R`, database repair |

## Network renderers

| Renderer | Inspect | Validate | Apply requires confirmation |
|---|---|---|---|
| Netplan | `netplan get`, `cat /etc/netplan/*.yaml` | `netplan generate` | `netplan apply`, `netplan try` |
| NetworkManager | `nmcli device status`, `nmcli con show` | inspect connection | `nmcli con up/down`, reload |
| systemd-networkd | `networkctl status`, `cat /etc/systemd/network/*.network` | config review | restart `systemd-networkd` |
| wicked | `systemctl status wickedd`, `cat /etc/sysconfig/network/ifcfg-*` | config review | restart wicked/network |

## Firewall tools

| Tool | Inspect | Temporary safe pattern | Permanent change requires confirmation |
|---|---|---|---|
| nftables | `nft list ruleset` | add narrow rule with documented rollback | `nft -f`, `nft flush ruleset` high-risk |
| firewalld | `firewall-cmd --list-all` | `--add-port ... --timeout=300` | `--permanent`, reload |
| iptables | `iptables-save` | add narrow rule | flush/restore high-risk |
| ufw | `ufw status verbose` | allow narrow port | enable/reload/change default policy high-risk |

## Security policy

| Policy | Inspect | Low-risk fix | High-risk |
|---|---|---|---|
| SELinux | `getenforce`, `ausearch -m AVC`, `ls -lZ` | `restorecon -Rv /exact/path` | `setenforce 0`, custom module, global relabel |
| AppArmor | `aa-status`, journal DENIED | profile-specific complain/enforce | disable globally |

## Service paths

| Family | Vendor units | Admin overrides |
|---|---|---|
| Debian/Ubuntu | `/lib/systemd/system`, `/usr/lib/systemd/system` | `/etc/systemd/system` |
| RHEL-like | `/usr/lib/systemd/system` | `/etc/systemd/system` |
| SUSE | `/usr/lib/systemd/system` | `/etc/systemd/system` |
| Arch | `/usr/lib/systemd/system` | `/etc/systemd/system` |

# Source Map Used for the Research

This skill was designed from the research synthesis using official and high-quality sources. Keep sources versioned if this package is used in production.

## Core Linux/systemd/kernel

- systemd manual pages: systemd, systemctl, journalctl, systemd.unit, systemd.service, systemd.special, systemd-analyze, systemd.timer.
- Linux kernel admin guide: kernel parameters, initrd/initramfs, /proc, sysfs, kdump, lockup watchdogs, Magic SysRq.
- man7 Linux manual pages: ip, ss, lsblk, blkid, vmstat, iostat, lvm, mdadm, rpm, cron/crontab.

## Distro documentation

- Ubuntu Server documentation: networking, Netplan, DNS, DHCP, chrony, AppArmor, user management, virtualization.
- Red Hat Enterprise Linux documentation: systemd, DNF/RPM, SELinux, firewalld/nftables, performance, storage, security hardening, kdump.
- SUSE documentation: zypper, wicked/NetworkManager, systemd service setup, AppArmor, update preparation.
- Arch manual pages/wiki: pacman, pacman.conf, mirrors, systemd-networkd, AppArmor/SELinux availability.

## Project documentation

- netfilter/nftables documentation.
- Docker documentation: inspect, logs, restart policies.
- Podman documentation: podman, podman-run, rootless concepts.
- libvirt documentation: virsh, QEMU driver, domain XML.
- cloud-init documentation: boot stages, cloud-config/user-data.
- Ansible documentation: facts, modules, command/file/copy patterns.
- rsyslog documentation.
- Prometheus node_exporter documentation.
- restic backup documentation.

## Incident methodology

- Google SRE Book: Effective Troubleshooting.
- Google SRE Workbook: Postmortem Analysis.
- Google SRE Book: Postmortem Culture.
- Public postmortem libraries from Cloudflare, GitHub, AWS operational resilience materials.

## Source priority policy for future updates

1. Official distro documentation matching the host version.
2. Upstream project manual pages/docs.
3. Linux kernel documentation.
4. Vendor support docs.
5. Real incident postmortems for methodology and failure-pattern learning.
6. Community posts only when official docs are absent, and never as sole support for high-risk remediation.

## v1.2.0 expert subskill source expansion

### systemd-expert

- systemd.service(5): service types, ExecStart/ExecStartPre behavior, restart behavior, and service supervision semantics.
- systemd.unit(5): dependency vs ordering semantics, drop-in merge order, and override strategy.
- systemd.exec(5): service execution environment, Limit* directives, and sandboxing options.
- systemd.resource-control(5): cgroup memory, CPU, IO, and task controls.
- systemd.timer(5): timer unit behavior.

### limits-expert

- limits.conf(5): PAM limits syntax, soft/hard limits, domain priority, and per-session behavior.
- getrlimit(2): process resource limit semantics and RLIMIT_NOFILE behavior.
- systemd.exec(5): systemd Limit* directives and service-scoped limit behavior.
- Kernel /proc sysctls: fs.file-max, fs.nr_open, kernel.threads-max, kernel.pid_max.

### networking-expert

- ip-route(8), ip-address(8), ip-link(8): routing, addressing, policy routing, and link inspection.
- ss(8): socket state inspection and service listen debugging.
- tc(8): qdisc/class/filter inspection and traffic-control safety.
- ethtool(8): NIC driver, ring, channel, offload, and statistics inspection.
- Linux kernel networking sysctl docs: net.core and net.ipv4/net.ipv6 parameter behavior.

## v1.4.0 firewall and Fail2Ban source expansion

- firewalld documentation and firewall-cmd manual pages for zones, runtime/permanent config, reload, services, IP sets, rich/direct rules.
- nftables wiki and nft operational practice for tables/chains/sets and ruleset management.
- iptables and iptables-save manual pages for legacy/compatibility rule inspection and backup.
- Ubuntu ufw(8) manual for UFW dry-run, remote-management warnings, rule syntax, app profiles, and logging.
- Fail2Ban upstream README and jail.conf/filter examples for log scanning, bans, backends, ignoreip, maxretry/findtime/bantime, actions, and local override practice.

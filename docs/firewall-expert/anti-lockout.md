# Anti-lockout firewall rules

## Before any remote firewall change

- Confirm current SSH/management source IP.
- Add explicit allow for management source and port.
- Keep an existing root/admin session open.
- Have console/IPMI/cloud serial access where possible.
- Take ruleset backup.
- Prepare exact rollback command.
- Prefer runtime test before permanent commit.

## Timed rollback pattern

Example concept only; adapt per distro:

```bash
cp /etc/nftables.conf /root/nftables.conf.backup
( sleep 120; cp /root/nftables.conf.backup /etc/nftables.conf; nft -f /etc/nftables.conf ) &
# apply test change, validate, then kill rollback job
```

## Never do first

```bash
iptables -F
nft flush ruleset
ufw reset --force
firewall-cmd --complete-reload
systemctl stop firewalld
```

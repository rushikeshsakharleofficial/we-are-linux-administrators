# All Linux admin expert skill pack

This pack adds or verifies the full requested Linux admin expert list as addon skills for the `linux-admin` Claude Code plugin.

## Full requested list

- backup-restore-expert
- logrotate-expert
- rsyslog-expert
- auditd-expert
- selinux-expert
- apparmor-expert
- ssh-hardening-expert
- sudoers-expert
- pam-expert
- sssd-ldap-expert
- lvm-expert
- raid-expert
- nfs-expert
- samba-expert
- iscsi-expert
- multipath-expert
- smart-disk-expert
- process-expert
- load-average-expert
- cpu-expert
- io-wait-expert
- tcpdump-expert
- iproute-expert
- routing-expert
- vlan-bonding-expert
- proxy-expert
- haproxy-expert
- nginx-expert
- apache-expert
- php-fpm-expert
- mysql-expert
- postgresql-expert
- redis-expert
- docker-expert
- podman-expert
- kubernetes-node-expert
- ansible-expert
- patching-expert
- vulnerability-scan-expert
- capacity-planning-expert
- incident-response-expert
- runbook-expert

## Common skill contract

Each skill is designed around:

1. purpose
2. evidence-first diagnostics
3. safe workflow
4. anti-patterns
5. output format
6. token-saving tip

## Validation

```bash
python3 tests/test_all_linux_admin_experts.py
```

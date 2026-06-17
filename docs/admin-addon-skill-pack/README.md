# Admin addon skill pack

This folder tracks the first large addon wave for the `linux-admin` plugin.

## Included experts

- backup-restore-expert
- logrotate-expert
- auditd-expert
- rsyslog-expert
- ssh-hardening-expert
- lvm-expert
- tcpdump-expert
- incident-response-expert
- nginx-expert
- php-fpm-expert
- mysql-expert

## Review target

The initial goal is consistent skill behavior, not exhaustive command coverage. Each skill should be expanded later with domain-specific docs, templates, and audit helpers.

## Validation

```bash
python3 tests/test_admin_addon_skill_pack.py
```

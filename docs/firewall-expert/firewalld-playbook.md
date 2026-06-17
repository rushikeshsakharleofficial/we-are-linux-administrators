# firewalld playbook

## Read-only audit

```bash
firewall-cmd --state
firewall-cmd --get-default-zone
firewall-cmd --get-active-zones
firewall-cmd --list-all-zones
firewall-cmd --direct --get-all-rules 2>/dev/null || true
firewall-cmd --get-log-denied
firewall-cmd --check-config
```

## Runtime vs permanent

- Runtime changes apply immediately but are lost on reload/restart unless saved.
- Permanent changes are stored but do not affect runtime until reload/restart.
- `--runtime-to-permanent` saves current runtime config after testing.

## Examples

Allow HTTPS in active zone temporarily:

```bash
firewall-cmd --zone=public --add-service=https
```

Persist after validation:

```bash
firewall-cmd --runtime-to-permanent
```

Restrict SSH to a source CIDR with a rich rule:

```bash
firewall-cmd --zone=public --add-rich-rule='rule family="ipv4" source address="203.0.113.0/24" service name="ssh" accept'
```

## Warnings

- `--complete-reload` loses state and can terminate active connections.
- `--set-default-zone` is runtime and permanent and changes zone assignment behavior.
- Direct rules can bypass zone abstractions and confuse future operators.

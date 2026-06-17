# ansible-expert best practices

## Module-first rule

Prefer Ansible modules over raw commands. Use command only when no suitable module exists. Use shell only when shell features are truly required.

## Inventory layout

Recommended layout:

```text
inventories/
  prod/
    hosts.yml
    group_vars/
    host_vars/
  staging/
    hosts.yml
    group_vars/
    host_vars/
```

Group by environment, role, location, cloud, owner, patch group, maintenance window, and access path.

## Variables

Use defaults for safe role defaults, group_vars for environment/role policy, host_vars for exceptions, and extra-vars only for controlled override.

## Templates

Use templates for generated config. Keep OS differences in vars files. Validate rendered configs before reload.

## Handlers

Use notify and handlers for service reload/restart. Avoid unnecessary restarts. Keep handler names stable and use listen topics for shared restart groups.

## Security

Use no_log for secret tasks. Use Ansible Vault or external secret systems. Avoid plaintext credentials. Limit become scope. Avoid broad shell tasks.

## Rollout

Use canary first, then serial batches. Use --limit for targeted runs. Validate after each batch.

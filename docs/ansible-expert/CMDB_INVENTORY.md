# ansible-expert CMDB inventory implementation

## Goal

Use CMDB or server inventory data as the source of truth for Ansible automation.

## Supported models

1. CMDB API dynamic inventory
2. CMDB CSV/JSON/YAML export inventory
3. Hybrid cloud inventory plus CMDB metadata

## Required CMDB fields

```text
hostname
fqdn
primary_ip
private_ip
public_ip
environment
location
datacenter
cloud_provider
region
os_family
os_version
server_role
application
team_owner
business_owner
criticality
patch_group
maintenance_window
backup_policy
monitoring_enabled
ansible_user
ssh_port
jump_host_required
jump_host_group
proxy_required
lifecycle_state
```

## Grouping model

Create groups by environment, OS, role, location, cloud, owner, criticality, patch group, maintenance window, and access path.

## Lifecycle rules

- active: allow automation
- maintenance: allow maintenance playbooks
- provisioning: allow bootstrap playbooks
- decommission_pending: block normal playbooks
- retired: exclude from inventory
- unknown: block until reviewed

## Validation checks

Detect missing hostname, duplicate hostname, duplicate IP, missing owner, missing environment, unknown lifecycle state, retired hosts still in inventory, production hosts without maintenance window, critical hosts without backup policy, and jump/proxy metadata gaps.

## CMDB-driven patching

Use patch_group, maintenance_window, criticality, application_owner, backup_policy, reboot_allowed, and cluster_member fields to drive safe canary and serial package updates.

## Write-back strategy

If CMDB API write-back is allowed, record last_ansible_run, last_patch_date, last_patch_status, last_validation_status, and automation_notes only after validation. Never write secrets to CMDB.

## Output mode

Return CMDB fields required, inventory grouping model, dynamic/static/hybrid choice, generated inventory structure, validation checks, safe targeting, patching integration, jump/proxy integration, write-back strategy, and implementation roadmap.

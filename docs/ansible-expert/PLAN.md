# ansible-expert plan

## Goal

Build a deep Ansible expert skill for Linux admins managing production fleets.

## Coverage

- module-first playbook design
- safe inventory structure
- CMDB-backed inventory
- group_vars and host_vars design
- templates and variables
- handlers and controlled restarts
- ansible.cfg tuning
- forks, serial, throttle, strategy
- proxy and jump-host access
- Ansible Galaxy and requirements files
- temporary environment handling
- Python interpreter compatibility
- safe package update strategy
- backup and rollback strategy
- disaster recovery playbooks

## Behavior

The skill should always start with evidence: fleet size, OS family, environment, inventory model, access path, privilege model, Python availability, and blast radius.

## Safety model

For production, the skill must include canary, serial rollout, validation, backup, and rollback. It should not suggest broad all-host changes unless the risk is low and the user explicitly asks for full rollout.

## Output modes

- review existing playbook
- generate new playbook
- design inventory
- design CMDB inventory
- create safe package update plan
- design proxy/jump-host access
- handle interpreter errors
- create disaster recovery playbook

# ansible-expert proxy and jump-host handling

## Goal

Support servers behind private networks, bastions, private proxies, and restricted routing paths.

## Access models

- direct SSH
- bastion or jump host
- private subnet through a jump host
- HTTP/HTTPS proxy for package downloads
- temporary task-level proxy environment

## Inventory variables

Use group-based access metadata:

```text
jump_host_required
jump_host_group
proxy_required
proxy_group
ansible_ssh_common_args
```

## Safe rules

- keep SSH host key checking enabled unless there is a reviewed exception
- avoid exposing proxy credentials in output
- use task-level or block-level environment for temporary proxy needs
- define no_proxy clearly
- validate jump host reachability before play execution

## Output mode

When user asks for proxy/jump design, return inventory layout, group_vars, access path, validation command, and rollback notes.

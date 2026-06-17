# ansible-expert interpreter compatibility

## Goal

Handle Python interpreter issues across old and new Linux distributions.

## Common cases

- Python missing on minimal hosts
- Python 2 vs Python 3 differences
- old RHEL/CentOS paths
- Ubuntu/Debian without `/usr/bin/python`
- mixed OS fleets
- interpreter warnings

## Variables

Use `ansible_python_interpreter` for host or group specific interpreter paths. Use `interpreter_python` in ansible.cfg for global behavior.

## Safe workflow

1. identify affected OS family and version
2. check whether Python exists
3. decide inventory-level or global interpreter setting
4. bootstrap only when required
5. validate facts and module execution
6. document exception handling

## Anti-patterns

- hardcoding one interpreter path for every OS
- ignoring old OS versions
- changing global interpreter behavior without testing
- using shell tasks only to avoid interpreter diagnosis

## Output mode

Return OS matrix, interpreter strategy, inventory vars, bootstrap plan if needed, and validation tasks.

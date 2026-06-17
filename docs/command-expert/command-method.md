# command-expert diagnostic method

A Linux command is not just syntax; it is an operational change with scope, privilege, and failure modes.

## Five-step method

1. **Intent**: define what the command should accomplish.
2. **Target set**: list files/processes/services/users the command will touch.
3. **Preview**: produce a read-only version that shows what would change.
4. **Apply**: use the narrowest state-changing command.
5. **Verify and rollback**: prove the intended state and know how to undo it.

## Command safety classes

| Class | Examples | Agent behavior |
|---|---|---|
| Read-only | `id`, `stat`, `ss`, `journalctl`, `grep` without write flags | run/propose freely |
| Low-risk write | create temp report, write local generated file | explain target |
| Disruptive | service restart, package change, firewall, chmod/chown | require plan and confirmation |
| Destructive | `rm -rf`, mkfs, partition edit, forced repair | deny or require explicit human maintenance plan |

## Robust shell habits

```bash
set -euo pipefail
IFS=$'\n\t'
command -- "$path"
find "$root" -xdev -type f -print0 | xargs -0 -r command --
```

Use these habits in scripts, not necessarily every interactive one-liner.

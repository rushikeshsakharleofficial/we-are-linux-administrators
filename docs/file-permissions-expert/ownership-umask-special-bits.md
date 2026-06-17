# Ownership, umask, and special bits

## Ownership

`chown user:group path` changes owner and group. `chgrp group path` changes group only. Recursive ownership changes must be tightly scoped.

## umask

`umask` removes permission bits from default creation modes. Typical examples:

| umask | New file default | New directory default | Use |
|---|---|---|---|
| `022` | `0644` | `0755` | common system default |
| `027` | `0640` | `0750` | private group/team systems |
| `077` | `0600` | `0700` | sensitive user-private files |

## Special bits

- setuid on executable: run with file owner identity; dangerous if misused.
- setgid on executable: run with file group identity.
- setgid on directory: new children inherit directory group on many Linux filesystems.
- sticky bit on directory: only owner/root can delete entries; used for `/tmp`-style shared dirs.

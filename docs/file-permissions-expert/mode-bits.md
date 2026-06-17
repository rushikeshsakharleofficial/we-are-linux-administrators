# POSIX mode bits

Mode bits are shown as owner/group/other permissions plus optional special bits.

```text
r = read
w = write
x = execute/search
s = setuid/setgid depending position
t = sticky bit on directories
```

## Files vs directories

| Bit | File meaning | Directory meaning |
|---|---|---|
| read | read content | list names |
| write | modify content | create/delete/rename children with execute |
| execute | execute as program/script | traverse/search path |

## Octal examples

| Mode | Meaning |
|---|---|
| `0644` | owner read/write, group/other read |
| `0600` | owner-only file |
| `0755` | executable/searchable by all, writable by owner |
| `0750` | owner full, group read/execute, others none |
| `1777` | world-writable sticky directory, common for `/tmp` |
| `2775` | group-shared directory with setgid inheritance |

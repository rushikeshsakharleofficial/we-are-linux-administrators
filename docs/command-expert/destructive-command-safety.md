# destructive command safety

## Deny by default

- filesystem formatting
- partition deletion
- recursive force delete of system paths
- unreviewed `dd of=/dev/...`
- recursive chmod/chown of `/`, `/etc`, `/usr`, `/var`, `/boot`, `/home`
- firewall flush on remote servers

## Required checklist before state changes

```text
1. What exact object will change?
2. What is the current state?
3. Is there a backup/snapshot?
4. What command previews the target set?
5. How do we validate success?
6. How do we revert?
7. Could this break SSH, DNS, boot, package manager, or app runtime?
```

## Safer alternatives

- Replace `rm -rf` with archive/quarantine first.
- Replace `chmod -R` with path/type-specific `find` rules.
- Replace manual config edit with vendor validation tool.
- Replace one big command with staged commands and logs.

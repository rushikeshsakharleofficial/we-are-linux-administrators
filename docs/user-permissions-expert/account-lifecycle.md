# Account lifecycle playbook

## Create

- decide human vs service account
- set home and shell intentionally
- assign least groups
- add sudo only through role files
- verify login/sudo/file access

## Modify

- snapshot current `id`, `sudo -l`, SSH keys, crons, group membership
- use `usermod -aG` for additive group changes; omitting `-a` can remove other supplementary groups
- require new login session for group changes to take effect

## Disable/offboard

- lock password/account
- expire account
- remove sudo/group privileges
- revoke SSH keys/tokens
- inspect running processes/crons/services
- archive data before deletion

## Delete

Only after ownership and data review:

```bash
find / -xdev -user <user> -ls 2>/dev/null | sed -n '1,200p'
crontab -l -u <user> 2>/dev/null || true
```

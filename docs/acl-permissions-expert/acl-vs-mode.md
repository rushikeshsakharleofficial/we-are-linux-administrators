# ACL vs mode bits

ACLs and mode bits are linked. `chmod` can change the ACL mask, which changes effective rights for named entries.

## Troubleshooting checklist

1. Does simple owner/group/mode solve it?
2. Does `getfacl` show named user/group entries?
3. Is the mask limiting the requested access?
4. Are default ACLs needed for new files?
5. Are existing files missing ACLs because default ACLs were added later?
6. Is SELinux/AppArmor/mount behavior causing denial even though ACL looks correct?

## Recommendation

Keep ACLs documented. Complex ACLs without documentation become hidden production risk.

# POSIX ACL model

A POSIX ACL extends traditional owner/group/other permissions with named users, named groups, masks, and default entries.

## Key concept: the mask

The ACL mask limits effective rights for:

- owning group entry
- named user entries
- named group entries

If `getfacl` shows permissions and `#effective` differs, the mask is limiting access.

## Default ACLs

Default ACLs apply only to directories and are inherited by newly created children. They are not retroactive.

## Filesystem support

ACL behavior depends on filesystem and mount support. Always check `findmnt -T <path> -o FSTYPE,OPTIONS` when ACLs behave unexpectedly.

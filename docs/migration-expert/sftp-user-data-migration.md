# SFTP migration with user data

## Inventory

- users, groups, UID/GID
- home directories and chroot paths
- authorized_keys and key options
- sshd_config Match blocks
- ForceCommand/internal-sftp settings
- quotas
- ACLs, SELinux contexts, ownership, umask
- data size and file count

## Migration sequence

1. Create target users/groups with UID/GID mapping.
2. Create chroot/home paths with correct root-owned chroot parents.
3. Migrate keys and verify permissions.
4. Dry-run rsync data.
5. Preserve ownership, permissions, ACLs, xattrs where required.
6. Run checksum/count validation.
7. Freeze source writes.
8. Final delta sync.
9. Cut over DNS/IP/client config.
10. Validate login, upload, download, delete permissions per user.

## Common traps

- chroot directory writable by user breaks OpenSSH chroot safety.
- UID/GID mismatch changes ownership meaning.
- ACLs/xattrs/SELinux context not preserved.
- hidden dotfiles and symlinks behave differently.
- final rsync with `--delete` removes destination-only files if source scope is wrong.

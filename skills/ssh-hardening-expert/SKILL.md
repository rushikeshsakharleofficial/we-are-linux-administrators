# ssh-hardening-expert

Use this skill for OpenSSH server hardening, access policy, safe sshd_config review, lockout prevention, key authentication, root-login policy, forwarding controls, and Match block design.

## Purpose

Improve SSH security without locking out administrators or breaking automation.

## Use when

- hardening sshd_config
- reducing password auth exposure
- restricting root login
- designing AllowUsers or AllowGroups policy
- managing bastion access
- reviewing forwarding settings
- debugging authentication failures after policy changes

## Evidence first

Ask for active SSH auth/access lines, OS/distro, current admin access path, automation accounts, and whether a second session is open.

## Safe workflow

1. preserve current working session
2. back up config
3. validate syntax before reload
4. change one policy layer at a time
5. prefer group-based access where possible
6. test a new login before closing old session
7. document rollback path

## Anti-patterns

- disabling password auth before key access is verified
- changing port, auth method, and firewall together
- closing the only admin session during rollout
- blanket Match blocks with unclear precedence
- ignoring automation users

## Output format

Return current exposure, hardening sequence, config changes, validation, rollback, lockout prevention note, and token-saving evidence request.

## Token-saving tip

Ask only for active SSH auth/access lines and intended policy, not the whole config with comments.

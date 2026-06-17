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

Ask for:

- active sshd_config security-related lines
- OS/distro and service name
- current admin access path
- automation accounts that use SSH
- whether a second session is open
- validation output from config test if available

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

Return:

1. current exposure
2. safe hardening sequence
3. config changes
4. validation
5. rollback
6. lockout prevention note
7. token-saving evidence request

## Token-saving tip

Ask only for active SSH auth/access lines and the intended policy, not the whole config with comments.

## Escalation

Use `sudoers-expert`, `pam-expert`, `firewall-expert`, `fail2ban-expert`, or `incident-response-expert` when relevant.

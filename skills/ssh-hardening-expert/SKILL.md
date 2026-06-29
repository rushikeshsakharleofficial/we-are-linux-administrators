# ssh-hardening-expert

Use this skill for OpenSSH server hardening, access policy, safe sshd_config review, lockout prevention, key authentication, root-login policy, forwarding controls, SSH certificate principal policy, ProxyJump/bastion safety, and Match block design.

## Purpose

Improve SSH security without locking out administrators or breaking automation.

## Use when

- hardening sshd_config
- reducing password auth exposure
- restricting root login
- designing AllowUsers or AllowGroups policy
- managing bastion access
- reviewing forwarding settings
- validating SSH certificate principal rules
- reviewing ProxyJump or bastion command construction
- debugging authentication failures after policy changes

## Evidence first

Ask for active SSH auth/access lines, OS/distro, OpenSSH version, current admin access path, automation accounts, whether SSH certificates are used, whether ProxyJump or bastion wrappers are used, and whether a second session is open.

## Safe workflow

1. preserve current working session
2. back up config
3. validate syntax before reload
4. change one policy layer at a time
5. prefer group-based access where possible
6. test a new login before closing old session
7. document rollback path

## OpenSSH 10.3+ review notes

When the installed OpenSSH version is 10.3 or newer, include these checks in SSH hardening reviews:

- Treat user certificates with an empty principals section as invalid for login. Do not rely on empty principals as a wildcard access pattern.
- Re-check any `authorized_keys` entries using `cert-authority` plus `principals="..."`; comma-containing principal names and wildcard assumptions need explicit validation.
- When reviewing bastion wrappers, scripts, web forms, or automation that builds `ssh -J` / `ProxyJump` command lines, never pass untrusted user or host input directly to the shell. Validate, quote, and prefer structured argument arrays where possible.
- Remember that `DenyUsers` and `DenyGroups` override `AllowUsers` and `AllowGroups`; document this explicitly before changing mixed allow/deny policies.
- If `ForceCommand` is used for restricted access, review forwarding options separately. Forcing a command does not automatically disable port, agent, X11, or streamlocal forwarding.

## Anti-patterns

- disabling password auth before key access is verified
- changing port, auth method, and firewall together
- closing the only admin session during rollout
- blanket Match blocks with unclear precedence
- treating empty SSH certificate principals as broad access
- building ProxyJump commands from untrusted input without validation
- assuming ForceCommand also disables forwarding
- ignoring automation users

## Output format

Return current exposure, hardening sequence, config changes, validation, rollback, certificate/ProxyJump review if applicable, lockout prevention note, and token-saving evidence request.

## Token-saving tip

Ask only for active SSH auth/access lines, `sshd -V` or package version, certificate/ProxyJump usage, and intended policy, not the whole config with comments.

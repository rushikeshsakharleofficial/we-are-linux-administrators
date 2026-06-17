# pam-expert

Use this skill for Linux PAM stack review, authentication flow debugging, account/session module behavior, lockout policies, sudo/ssh integration, and safe PAM rollout.

## Purpose

Debug authentication and session policy without locking out users.

## Evidence first

Ask for service name, affected user/group, exact PAM stack snippets, auth log window, recent changes, and available break-glass access.

## Safe workflow

1. identify PAM service file
2. map auth, account, password, and session phases
3. review control flags carefully
4. test with a non-critical account first
5. keep a rollback session open
6. validate logs after change

## Anti-patterns

- editing common PAM includes without understanding all consumers
- changing auth and account rules together
- removing recovery access
- ignoring module order and control flags

## Output format

Return affected stack, failure phase, safe change plan, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for only the target PAM service file and relevant auth log lines, not all PAM configs.

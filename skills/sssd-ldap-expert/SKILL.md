# sssd-ldap-expert

Use this skill for SSSD, LDAP login, NSS/PAM integration, cache issues, access filters, sudo rules, SSH login failures, and identity lookup troubleshooting.

## Purpose

Diagnose directory-backed Linux login without breaking local recovery access.

## Evidence first

Ask for domain config snippet, affected user/group, lookup result, auth log window, SSSD status, and cache behavior.

## Safe workflow

1. confirm local fallback access
2. map NSS, PAM, and SSSD domain flow
3. check identity lookup before auth policy
4. validate access filters and group mapping
5. clear cache only with impact awareness
6. document rollback

## Anti-patterns

- changing LDAP and PAM at the same time
- clearing cache without knowing outage impact
- disabling local accounts during testing
- dumping full LDAP configs with secrets

## Output format

Return identity path, auth failure phase, safe fix plan, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for sanitized domain config, one lookup result, and a short auth log window only.

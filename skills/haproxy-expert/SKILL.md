# haproxy-expert

Use this skill for HAProxy frontend/backend design, health checks, ACLs, stickiness, TLS termination, reload safety, and production troubleshooting.

## Purpose

Debug HAProxy path selection and backend health without breaking live traffic.

## Evidence first

Ask for relevant frontend/backend/listen section, health-check status, target hostname/path, error snippet, and reload method.

## Safe workflow

1. map request to frontend, ACL, backend, and server
2. validate config syntax
3. check backend health and logs
4. test a single route before reload
5. reload safely with rollback config
6. validate traffic and metrics

## Anti-patterns

- editing many ACLs at once
- reloading without config validation
- disabling health checks to hide backend issues
- exposing stats without access control

## Output format

Return request path map, likely issue, minimal fix, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for only the relevant frontend/backend sections and health-check summary.

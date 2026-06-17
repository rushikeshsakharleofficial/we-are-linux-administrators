# nginx-expert

Use this skill for NGINX virtual hosts, reverse proxying, upstream failures, safe reloads, TLS/server block review, FastCGI handoff, and status/debug evidence.

## Purpose

Fix NGINX issues with syntax validation, minimal config scope, safe reload behavior, and rollback planning.

## Evidence first

Ask for relevant server/location/upstream block, config-test output, error-log snippet, upstream health, and expected hostname/path.

## Safe workflow

1. identify selected server block
2. validate syntax before reload
3. isolate one location or upstream path
4. test upstream separately
5. reload only after validation
6. preserve previous working config

## Anti-patterns

- editing many server blocks at once
- relying on accidental default-server behavior
- exposing status pages publicly
- reloading without config test

## Output format

Return selected vhost, likely issue, minimal patch, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for only the active server block, one upstream block, config-test output, and 20 relevant error-log lines.

# nginx-expert

Use this skill for NGINX virtual hosts, reverse proxying, upstream failures, safe reloads, TLS/server block review, FastCGI handoff, and status/debug evidence.

## Purpose

Fix NGINX issues with syntax validation, minimal config scope, safe reload behavior, and rollback planning.

## Use when

- NGINX fails config test or reload
- site routing is wrong
- upstream returns 502/504
- TLS vhost config needs review
- reverse proxy or FastCGI behavior is unclear
- status endpoint needs safe exposure

## Evidence first

Ask for the relevant server/location/upstream block, config-test output, error-log snippet, upstream health, and expected hostname/path.

## Safe workflow

1. identify selected server block
2. validate syntax before reload
3. isolate one location/upstream path
4. test upstream separately
5. reload only after validation
6. preserve previous working config
7. document rollback

## Anti-patterns

- editing many server blocks at once
- relying on accidental default-server behavior
- exposing status pages publicly
- reloading without config test
- pasting entire NGINX config tree into LLM

## Output format

Return selected vhost, likely issue, minimal patch, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for only the active server block, one upstream block, config-test output, and 20 relevant error-log lines.

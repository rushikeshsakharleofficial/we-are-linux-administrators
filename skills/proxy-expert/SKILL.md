# proxy-expert

Use this skill for forward proxy, reverse proxy, environment proxy variables, package-manager proxy issues, CONNECT behavior, and safe proxy troubleshooting.

## Purpose

Separate client proxy config, server proxy config, DNS, TLS, and firewall issues.

## Evidence first

Ask for proxy type, client app, target URL, environment variables, error snippet, and network path expectation.

## Safe workflow

1. classify forward vs reverse proxy
2. verify DNS and direct connectivity assumptions
3. inspect proxy variables or app config
4. check TLS and CONNECT behavior
5. test one target and one client
6. document rollback

## Anti-patterns

- setting global proxy variables for one app
- bypassing TLS validation to hide proxy issues
- ignoring no_proxy scope
- dumping full proxy configs with credentials

## Output format

Return proxy path, likely break point, safe fix, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for sanitized proxy variables, one client error, and one target URL class only.

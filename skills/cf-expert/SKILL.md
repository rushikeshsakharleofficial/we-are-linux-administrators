---
name: cf-expert
description: Expert Cloudflare operations with MCP/API guidance for DNS records, proxying, SSL/TLS, WAF/rulesets, cache, redirects, rate limits, Zero Trust/tunnels awareness, audit, rollout, and rollback.
argument-hint: "[zone / DNS / proxy / TLS / WAF / cache / redirect / rate-limit task]"
effort: "medium"
allowed-tools: "Read Grep Glob Bash"
---

# cf-expert

Act as a senior Cloudflare DNS/security/performance engineer. Use this skill for Cloudflare DNS, proxied vs DNS-only records, SSL/TLS mode, WAF/rulesets, cache/page rules/redirects, rate limiting, origin validation, DNS migration, and MCP/API-driven account audits.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Keep discovery read-only first, verify the target account/zone and current state before changes, export relevant configuration before modifying it, assess architecture fit and blast radius, use staged rollout for risky traffic/security changes, keep a rollback path ready, and validate from both origin and client paths after the change.

## MCP rule

When a Cloudflare MCP server is available, prefer MCP read-only discovery before API changes. Cloudflare's managed MCP servers use the `/mcp` Streamable HTTP endpoint for new connections and support the MCP 2026-07-28 specification; historical `/sse` URLs are compatibility aliases and should not be used to force the deprecated HTTP+SSE transport.

Prefer OAuth for interactive use and grant only the permissions required for the task. Cloudflare's API MCP authorization now supports optional OAuth scopes: review the consent screen and deselect unnecessary optional scopes. For CI/CD or unattended automation, use a narrowly scoped Cloudflare API token only when the client supports bearer-token configuration. Every change must include current-state export, desired-state diff, validation, and rollback.

Recommended MCP config pattern:

```json
{
  "mcpServers": {
    "cloudflare-api": {
      "url": "https://mcp.cloudflare.com/mcp"
    }
  }
}
```

Do not put Cloudflare API tokens, Access service-token secrets, or other credentials directly into committed MCP configuration.

## Core rules

1. Confirm zone/account before changing anything.
2. Export DNS records/rules/settings before edits.
3. Understand proxied vs DNS-only impact.
4. Lower TTL before migration where applicable.
5. Validate origin reachability directly and through Cloudflare.
6. Do not enable aggressive WAF/rate limits without event evidence.
7. Do not change SSL/TLS mode blindly; verify origin certificate and redirect behavior.
8. Use staged rollout and rollback for DNS/rules/cache changes.

## Read-only first

```bash
cloudflared --version 2>/dev/null || true
wrangler --version 2>/dev/null || true
env | grep -Ei 'CLOUDFLARE|CF_' | sed 's/=.*/=<redacted>/'
dig +short NS example.com
dig +short A example.com
dig +trace example.com | tail -40
curl -I https://example.com
```

## MCP/API workflow

```text
1. Search/list zone.
2. Confirm MCP endpoint/transport and granted OAuth/token scopes.
3. Export DNS records and rulesets.
4. Build desired-state diff.
5. Identify risky settings: proxy, SSL, WAF, redirects, rate limits, cache, DNSSEC.
6. Apply one small change.
7. Validate DNS, HTTP headers, TLS, origin, logs/events.
8. Roll back if validation fails.
```

## Output format

```text
Cloudflare zone/account:
Current state:
MCP transport/auth scope:
Proposed change:
MCP/API operation:
Risk:
Validation:
Rollback:
```

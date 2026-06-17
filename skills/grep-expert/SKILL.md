# grep-expert

Use this skill for token-saving Linux admin search workflows with grep, ripgrep, journal-focused pipelines, reusable patterns, and compact evidence extraction.

## Token-saving mission

Never dump huge logs into the model. First reduce output with service scope, time window, file scope, match count, context window, and exact pattern families.

## Highlighted token-saving tip

**Token-saving tip:** ask for bounded evidence first, not the whole log.

```bash
journalctl -u SERVICE --since '30 min ago' --no-pager | grep -nEi -m 40 'error|fail|denied|timeout|refused'
```

This usually gives enough evidence for an LLM while avoiding thousands of irrelevant lines.

## Core rules

1. Start with a precise question.
2. Narrow by service, file, time window, and pattern.
3. Use count-only searches before printing lines when exploring.
4. Use max-match limits for first evidence.
5. Use context lines only when needed.
6. Prefer journald filters before grep for systemd services.
7. Prefer ripgrep for recursive config/source searches when available.
8. Exclude archives, backups, vendor/cache, binary files, and rotated logs unless needed.
9. Return the smallest evidence set that proves or disproves the hypothesis.
10. Save useful patterns for reuse.

## Best first commands

```bash
# Count before detail
grep -cEi 'error|fail|denied|timeout' /var/log/messages

# Bounded evidence
grep -nEi -m 50 'error|fail|denied|timeout' /var/log/messages

# Add context only when needed
grep -nEi -C 2 -m 30 'oom|killed process|out of memory' /var/log/messages

# Journal first, grep second
journalctl -u nginx --since '1 hour ago' --no-pager | grep -nEi -m 50 'error|fail|timeout'

# Recursive config search with ripgrep
rg -n --no-heading --glob '!*.bak' --glob '!*.old' 'Listen|server_name|proxy_pass' /etc
```

## Linux admin pattern domains

- systemd and journald
- kernel and hardware
- memory and OOM
- auth, SSH, sudo, PAM
- network and firewall
- DNS and named
- web servers and PHP
- databases
- filesystems and storage
- package managers
- cron and automation
- containers
- security audit logs
- mail systems
- TLS certificates

## Search flow

Use this order:

1. **Count** — how many matches exist?
2. **Bound** — show only first useful matches.
3. **Context** — add 1-3 lines around matches.
4. **Expand** — widen time/files/pattern only if signal is missing.
5. **Summarize** — return exact file, line, pattern, and next command.

## Output format

Always respond with:

1. Search goal.
2. Token-saving narrowing strategy.
3. Commands to run.
4. Expected signal.
5. Highlighted token-saving tip.
6. Next pattern if nothing matches.
7. How to save the useful pattern for future reuse.

## Escalation

Use `command-expert` for unsafe one-liners, `logs` for broad log timeline building, `systemd-expert` for service-state analysis, and domain experts such as `memory-expert`, `firewall-expert`, `dnsmasq-expert`, or `named-expert` after grep finds the evidence.

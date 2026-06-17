# grep-expert token-saving flow

The goal is to reduce Linux admin evidence before sending it to an LLM.

## Four-step flow

### 1. Count

Start with match counts to estimate signal.

```bash
grep -cEi 'error|fail|denied|timeout' /var/log/messages
```

### 2. Bound

Print only a small number of useful matches.

```bash
grep -nEi -m 50 'error|fail|denied|timeout' /var/log/messages
```

### 3. Context

Add small context only when the line alone is not enough.

```bash
grep -nEi -C 2 -m 30 'oom|killed process|out of memory' /var/log/messages
```

### 4. Expand

Only widen the search if the bounded result does not answer the question.

Expansion order:

1. widen pattern
2. widen file set
3. widen time window
4. add context
5. search archived logs last

## Token-saving examples

### systemd service failure

```bash
journalctl -u SERVICE --since '1 hour ago' --no-pager | grep -nEi -m 50 'failed|error|timeout|dependency|exited'
```

### SSH/auth issue

```bash
grep -nEi -m 60 'failed|invalid|denied|accepted|session|sudo|pam' /var/log/auth.log /var/log/secure 2>/dev/null
```

### OOM/memory issue

```bash
journalctl -k --since '24 hours ago' --no-pager | grep -nEi -C 2 -m 40 'oom|out of memory|killed process|page allocation'
```

### package-manager issue

```bash
grep -nEi -m 80 'error|failed|conflict|broken|unmet|dependency' /var/log/dpkg.log /var/log/dnf*.log /var/log/yum.log 2>/dev/null
```

### recursive config search

```bash
rg -n --no-heading --glob '!*.bak' --glob '!*.old' --glob '!*.rpmnew' 'Listen|server_name|proxy_pass|DocumentRoot' /etc
```

## Evidence rule

A good grep result for an LLM should usually be under 50 lines, include line numbers, and contain enough context to choose the next diagnostic command.

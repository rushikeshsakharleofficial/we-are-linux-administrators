---
name: command-expert
description: Expert Linux command selection, shell pipeline debugging, safe command construction, dry-run strategy, text processing with grep/sed/awk/find/xargs, quoting, idempotency, and destructive-command risk review.
---

# command-expert

Act as a senior Linux administrator who knows when to use a command, when not to use it, and how to prove a command is safe before it changes a system.

Use this skill for command building, command review, shell pipelines, grep/sed/awk/find/xargs, one-liners, batch file operations, cron commands, sudo command design, automation snippets, and postmortems where a command caused damage.

## Core rules

1. Never optimize for shortness over correctness.
2. Prefer read-only discovery before writes.
3. Show the exact target set before destructive actions.
4. Quote variables and paths unless there is a deliberate reason not to.
5. Use `--` before user-controlled path arguments where supported.
6. Use null-delimited pipelines for filenames: `find ... -print0 | xargs -0 ...`.
7. Prefer explicit scopes over global commands.
8. Avoid `eval`, unquoted glob expansion, recursive chmod/chown/rm, and broad `sed -i` unless reviewed.
9. Convert dangerous one-liners into staged commands: discover -> preview -> backup -> apply -> verify -> rollback.

## Command review workflow

For any proposed command, answer:

```text
Intent:
Command:
Read-only or state-changing:
Target scope:
Privilege needed:
Distro/tool assumptions:
Failure modes:
Dry-run/preview:
Backup/rollback:
Validation:
Safer alternative:
```

## Read-only first toolkit

```bash
command -v <tool>
type -a <command>
<command> --help 2>&1 | sed -n '1,80p'
man <command>
stat -- <path>
find <path> -maxdepth 2 -type f -print | sed -n '1,50p'
grep -RIn --include='*.conf' -- 'pattern' /etc 2>/dev/null | sed -n '1,80p'
```

## Safe `find` pattern

Never start with `-delete`, `-exec rm`, or recursive chmod/chown. Preview first:

```bash
find /target -type f -name '*.log' -mtime +30 -print | sed -n '1,100p'
find /target -type f -name '*.log' -mtime +30 -printf '%p\n' | wc -l
```

Then use a safer apply step:

```bash
find /target -type f -name '*.log' -mtime +30 -print0 | xargs -0 -r rm -v --
```

## Text processing decision map

| Need | Preferred tool | Notes |
|---|---|---|
| Search text | `grep -RIn --` | Add `--include`/`--exclude-dir`; quote pattern |
| Select fields | `awk` | Better than long `cut` chains for structured fields |
| Simple replacement | `sed` | Preview without `-i` first |
| Complex config edit | purpose-built parser or Ansible | Avoid fragile regex for syntax-sensitive configs |
| Many files | `find -print0` + `xargs -0` | Handles spaces/newlines safely |
| JSON | `jq` | Do not parse JSON with grep/sed if jq exists |
| YAML | `yq` or app-native config tooling | Avoid blind regex edits |

## Sed edit workflow

```bash
cp -a /etc/app/app.conf /etc/app/app.conf.$(date +%F-%H%M%S).bak
sed -n '1,160p' /etc/app/app.conf
sed 's/^old=.*/old=new/' /etc/app/app.conf | diff -u /etc/app/app.conf -
sed -i.bak 's/^old=.*/old=new/' /etc/app/app.conf
app --check-config || app -t || true
```

## Common command anti-patterns

| Anti-pattern | Why risky | Safer pattern |
|---|---|---|
| `rm -rf /path/*` | glob surprise, wrong variable expansion | verify variable, use `find` preview, add `--one-file-system` where relevant |
| `chmod -R 777` | destroys access model | diagnose exact denial; set least required mode/ACL/group |
| `chown -R user:user /` | breaks OS ownership | restrict path; preview with `find -maxdepth` |
| `sed -i` across `/etc` | unvalidated config mutation | backup + diff + syntax test |
| `find ... -delete` first | no preview/rollback | preview count and paths first |
| `xargs` without `-0` | breaks on spaces/newlines | `-print0 | xargs -0 -r` |
| `kill -9` first | prevents graceful cleanup | try service manager/TERM first; inspect reason |
| `curl | bash` | unreviewed remote code | download, checksum/signature, inspect, then execute |

## Output style

When asked for a command, return:

```text
Recommended command:
Why this command:
Pre-checks:
Dry-run/preview:
Apply command:
Validation:
Rollback:
Risks avoided:
```

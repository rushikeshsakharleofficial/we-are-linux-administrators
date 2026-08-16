# logrotate policy and failure handling

Use this chunk when the `logs` parent has evidence that the problem is log growth, retention, compression, ownership, postrotate/reopen behaviour, copytruncate choice, or logrotate execution.

Follow [`../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`](../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md). Preserve evidence before destructive cleanup, dry-run policy changes, protect incident logs that may still be required, and define rollback before changing retention or service reopen behaviour.

## Use when

- `/var/log` or an application log grows unexpectedly
- a log is not rotating
- rotated files have wrong owner/mode
- retention or compression is wrong
- `postrotate`/`prerotate` hooks fail
- `copytruncate` versus service reopen is unclear
- rotation is contributing to disk-full risk

## Bounded evidence

Identify the writer and matching policy first:

```bash
ls -lh <log-path>
stat <log-path>
lsof <log-path> 2>/dev/null | head -40 || true
grep -RFn -- '<log-path>' /etc/logrotate.conf /etc/logrotate.d 2>/dev/null | head -40
logrotate -d /etc/logrotate.conf 2>&1 | tail -160
systemctl status logrotate.timer logrotate.service --no-pager 2>/dev/null || true
journalctl -u logrotate.service --since '24 hours ago' --no-pager -n 120 2>/dev/null || true
```

Ask for one matching stanza, one file-size summary, the writer service/process, and one dry-run/error result rather than the whole logrotate tree.

## Reasoning path

1. Identify the actual writer process and whether it can reopen logs cleanly.
2. Find the single matching stanza and check for duplicate/conflicting matches.
3. Validate trigger semantics: size/time, missingok/notifempty, rotate count/age, compression and date extension.
4. Validate create/owner/mode and privilege context.
5. Check `postrotate`/`prerotate` hooks and service reload/reopen behaviour.
6. Prefer service-aware reopen/signalling over `copytruncate` when supported.
7. Use a dry-run before changing policy; use a forced rotation only as a controlled validation step with backup/rollback.

## Safe change pattern

Back up only the relevant policy before editing:

```bash
cp -a /etc/logrotate.d/<name> /etc/logrotate.d/<name>.bak.$(date +%F-%H%M%S)
logrotate -d /etc/logrotate.conf
```

After a controlled validation, confirm:

- the application continues writing to the intended active log
- the new log owner/mode is correct
- rotated files match retention/compression expectations
- postrotate hooks succeeded
- disk usage is moving in the expected direction

If the writer fails to reopen or permissions break, restore the saved stanza and validate the service's logging path before retrying.

## copytruncate decision

`copytruncate` is a compatibility workaround, not the default. It can lose or duplicate lines during the copy/truncate window. Prefer an application/service reopen mechanism when available and safe. Use `copytruncate` only when the writer cannot reopen/rotate itself and the loss/duplication trade-off is understood.

## Anti-patterns

- changing global policy for one application's problem
- forcing rotation before identifying the writer behaviour
- using `copytruncate` automatically
- deleting rotated logs before confirming evidence/retention requirements
- keeping unbounded compressed history
- ignoring failing postrotate scripts or wrong permissions

## Output

Return: growth/retention summary, matching-stanza analysis, safest policy, backup/rollback, validation, and one token-bounded evidence request.

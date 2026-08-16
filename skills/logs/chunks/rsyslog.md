# rsyslog routing and forwarding

Use this chunk when the `logs` parent has evidence that the failure is inside rsyslog local routing, remote forwarding, queues, TLS transport, rulesets, templates, or the journald-to-rsyslog path.

Follow [`../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`](../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md). Keep evidence collection read-only first, preserve active configuration before editing, validate syntax before reload/restart, keep local evidence available until remote delivery is proven, and define rollback before changing forwarding or queue behaviour.

## Use when

- logs are missing locally or remotely
- forwarding is unreliable or intermittent
- rsyslog queues are growing or dropping
- templates, selectors or rulesets are misrouting messages
- TLS forwarding is required or failing
- journald-to-rsyslog flow is unclear

## Bounded evidence

Collect only the relevant path:

```bash
systemctl status rsyslog --no-pager
rsyslogd -N1
journalctl -u rsyslog -b --no-pager -n 120
ls -l /etc/rsyslog.conf /etc/rsyslog.d 2>/dev/null
sed -n '1,220p' /etc/rsyslog.conf 2>/dev/null
```

Then request only the active input, ruleset, template, action and queue blocks related to the missing log path rather than dumping every config fragment.

For remote delivery, also establish the destination, protocol, expected port, TLS mode and one recent rsyslog error. Use network/firewall specialists only when bounded rsyslog evidence points outside the host logging pipeline.

## Reasoning path

1. Map the input to its ruleset.
2. Map the ruleset to local and remote actions.
3. Confirm the message exists locally before blaming forwarding.
4. Check rule ordering, selectors, stops/discards and template output.
5. Inspect queue type, size, disk assistance and discard behaviour when delivery is delayed.
6. Validate remote reachability and TLS trust only after the local route is proven.
7. Test one facility/tag or synthetic message before broad changes.

Useful narrow tests:

```bash
logger -p user.notice -t linux-admin-rsyslog-test 'linux-admin rsyslog test'
journalctl -t linux-admin-rsyslog-test --since '5 minutes ago' --no-pager
```

Do not expose production secrets or sensitive payloads just to prove routing.

## Safe change pattern

Before editing:

```bash
cp -a /etc/rsyslog.conf /etc/rsyslog.conf.bak.$(date +%F-%H%M%S)
cp -a /etc/rsyslog.d /etc/rsyslog.d.bak.$(date +%F-%H%M%S)
```

After a narrow edit:

```bash
rsyslogd -N1
```

Reload rather than restart where the installed unit/config supports it, then verify both local retention and remote arrival. If validation fails, restore the saved config and revalidate before reloading again.

## Anti-patterns

- forwarding without queue/failure planning
- disabling local retention before the remote path is proven
- changing every ruleset at once
- using plaintext transport over an untrusted network when TLS is required
- increasing queue limits blindly without disk/memory sizing
- treating network reachability as proof that rsyslog rule ordering is correct

## Output

Return: route map, likely failure point, smallest safe test/change, backup and rollback, validation, and one token-bounded evidence request.

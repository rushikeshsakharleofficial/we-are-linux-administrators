# Cross-skill routing

> Historical addon-pack note, updated to the current parent/chunk architecture. Retired micro-skill names must not be recreated as top-level skills.

Use the canonical router at `skills/using-linux-admin/SKILL.md` first. Escalate to a second parent/specialist only when bounded evidence proves a cross-layer issue.

- `backup-restore-expert` -> `mysql-expert`, `storage` (`chunks/lvm.md` or `chunks/filesystem-health.md` only when evidence matches)
- `logs` (`chunks/logrotate.md`) -> `logs` (`chunks/rsyslog.md` when the failure is in forwarding/rules), `nginx-expert`, `php-fpm-expert`
- `security-expert` (`chunks/auditd.md`) -> `incident-response-expert`, `ssh-hardening-expert`
- `logs` (`chunks/rsyslog.md`) -> `logs` (`chunks/logrotate.md` when rotation is the failing layer), `incident-response-expert`
- `ssh-hardening-expert` -> `auth` (`chunks/sudoers.md` or `chunks/pam.md`), `firewall-expert`
- `storage` (`chunks/lvm.md`) -> `backup-restore-expert`, `storage` (`chunks/filesystem-health.md`)
- `network` (`chunks/packet-capture.md`) -> `firewall-expert`, `network` (`chunks/tcp.md` or `chunks/udp.md` only when transport evidence matches)
- `incident-response-expert` -> `grep-expert`, `security-expert` (`chunks/auditd.md`), `logs` (`chunks/rsyslog.md`), `backup-restore-expert`
- `nginx-expert` -> `php-fpm-expert`, `network` (`chunks/packet-capture.md` when packet evidence is actually required)
- `php-fpm-expert` -> `nginx-expert`, `performance` (`chunks/memory.md` when memory pressure is proven)
- `mysql-expert` -> `backup-restore-expert`, `performance` (`chunks/memory.md` when memory pressure is proven), `storage`

Do not preload every target above. The normal flow remains parent/specialist -> bounded evidence -> one matching chunk, with a second skill only for a proven cross-layer dependency.

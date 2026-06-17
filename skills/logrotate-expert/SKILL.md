# logrotate-expert

Use this skill for Linux log rotation design, debugging, retention, compression, ownership, postrotate handling, and disk-full prevention.

## Purpose

Keep logs controlled without losing evidence. Prefer validation and service-aware reopen behavior over blind rotation changes.

## Use when

- `/var/log` is growing too fast
- a service log is not rotating
- rotated logs have wrong ownership or permissions
- compressed retention is incorrect
- `copytruncate` vs service reopen is unclear
- postrotate scripts fail

## Evidence first

Ask for the smallest useful evidence pack:

- relevant logrotate stanza only
- log file path and size
- service name that writes the log
- rotation state summary
- recent rotation error line if present

## Safe workflow

1. identify writer process and reopen behavior
2. review matching logrotate stanza
3. validate retention and compression policy
4. dry-run before change
5. prefer service reopen over copy-truncate when possible
6. validate new file permissions and service logging
7. document rollback

## Anti-patterns

- changing global logrotate policy for one service
- rotating without confirming writer behavior
- using copy-truncate as default
- keeping infinite compressed logs
- ignoring failed postrotate hooks

## Output format

Return:

1. log growth summary
2. matching stanza analysis
3. safest rotation policy
4. validation steps
5. rollback
6. token-saving evidence request

## Token-saving tip

Ask for one stanza, one short file-size summary, and one dry-run result instead of the full logrotate directory.

## Escalation

Use `rsyslog-expert`, `nginx-expert`, `php-fpm-expert`, or `filesystem-expert` when log rotation depends on those systems.

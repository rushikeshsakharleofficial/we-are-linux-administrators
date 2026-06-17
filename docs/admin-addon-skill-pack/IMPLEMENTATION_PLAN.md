# admin addon skill pack implementation plan

This large addon pack is based on the deep research report for the `linux-admin` plugin.

## Added in this pack

- backup-restore-expert
- logrotate-expert
- auditd-expert
- rsyslog-expert
- ssh-hardening-expert
- lvm-expert
- tcpdump-expert
- incident-response-expert
- nginx-expert
- php-fpm-expert
- mysql-expert

## Shared contract

Every addon skill follows the same operational pattern:

1. purpose
2. use cases
3. evidence-first inputs
4. safe workflow
5. anti-patterns
6. output format
7. token-saving tip
8. escalation path

## Rollout phases

### Phase 1: safety and evidence

- backup-restore-expert
- logrotate-expert
- auditd-expert
- rsyslog-expert
- incident-response-expert

### Phase 2: high-risk system changes

- ssh-hardening-expert
- lvm-expert
- tcpdump-expert

### Phase 3: service stack

- nginx-expert
- php-fpm-expert
- mysql-expert

## Notes

The skills are intentionally compact so that future PRs can expand each module with docs, examples, audit helpers, and templates without making this first addon pack difficult to review.

# ansible-expert

Use this skill for Ansible playbook review, inventory issues, idempotency, privilege escalation, facts, handlers, dry-run behavior, and safe fleet rollout.

## Purpose

Make automation predictable, reviewable, and safe across Linux fleets.

## Evidence first

Ask for playbook task snippet, inventory target, module used, failed task output, expected state, and blast radius.

## Safe workflow

1. identify target scope
2. review idempotency and check-mode behavior
3. validate variables and inventory grouping
4. test on one host or small canary group
5. expand gradually
6. document rollback

## Anti-patterns

- running broad playbooks without limit/canary
- using shell tasks where modules exist
- ignoring changed/failed semantics
- storing secrets in plain vars

## Output format

Return target scope, idempotency review, safe rollout, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for the failed task, inventory group, and one host result instead of full play output.

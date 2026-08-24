---
name: ansible-expert
description: Production-safe Ansible automation design and review for playbooks, inventories, modules, package updates, bastion access, interpreter compatibility, rollout control, rollback, and disaster recovery. Use when creating, reviewing, troubleshooting, or hardening Ansible workflows for Linux fleets.
argument-hint: "[playbook|inventory|role|module|rollout|error] [scope]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# ansible-expert

Use this skill for production-safe Ansible automation design, playbook review, module selection, inventory architecture, CMDB inventory integration, package updates, proxy/jump-host access, Python interpreter compatibility, rollback planning, and disaster recovery playbooks.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` for security facts before changes, rollback planning, architecture fit, backup/disaster planning, guarded recovery for risky remote changes, validation, and token-bounded output.

## Purpose

Prefer idempotent modules over shell commands, protect production with canary/serial rollout, and always include backup, validation and rollback thinking.

## Use when

- creating or reviewing Ansible playbooks
- replacing shell/command tasks with proper modules
- designing inventory, group_vars, host_vars and CMDB-backed inventory
- tuning ansible.cfg, forks, strategy, serial and throttle
- updating packages safely on production fleets
- handling proxy, private subnet, bastion or jump-host access
- handling Python interpreter errors across old/new OS versions
- building disaster-recovery automation
- using Ansible Galaxy roles or collections safely

## Evidence first

Ask for target OS families, server count, inventory structure, network access path, privilege method, package manager, Python availability, current failing task/snippet, required change, rollback requirement and production blast radius.

## Safe workflow

1. Gather bounded target/inventory/access evidence.
2. Choose a native module before shell/command.
3. Test one host or canary group first.
4. Backup critical files before changes.
5. Validate rendered config before reload/restart.
6. Use serial/limit/max_fail_percentage for blast-radius control.
7. Confirm rollback before execution.
8. Keep secrets in Vault/external stores and use `no_log` where appropriate.

## Anti-patterns

Avoid shell when a native module exists, all-host rollout without canary/serial, unvalidated templates, plaintext secrets, destructive playbooks without rollback, and dumping entire inventories/playbooks when one failing task is enough.

## Module, handlers and rollout guidance

Prefer package/service/systemd/template/copy/file/lineinfile/blockinfile/user/group/mount/cron/get_url/wait_for modules as appropriate. Use handlers for reload/restart actions triggered by actual configuration changes instead of restarting services unconditionally; validate the rendered configuration before notifying a consequential handler, and keep the prior config available for rollback if the handler exposes a bad change. Keep environment inventories and vars separated. For production changes use canary groups, `serial`, `--limit` and bounded failure thresholds.

## Inventory and compatibility

Validate missing owner/environment/lifecycle/jump metadata, retired hosts and duplicate addresses before execution. Handle `ansible_python_interpreter`, older Python availability, bastion/ProxyJump and per-group proxy settings explicitly.

## Output

Return assumptions, inventory model, module choices, playbook/review, backup plan, rollback plan, validation commands, safe rollout command and the smallest remaining evidence request.

## Escalation

Use `package-manager-expert`, `ssh-hardening-expert`, `auth` for sudo/account/PAM/SSSD-LDAP policy, `backup-restore-expert`, `change-safety-expert`, `automation` for runbook or shell-script support, and the relevant domain selected by `using-linux-admin`.
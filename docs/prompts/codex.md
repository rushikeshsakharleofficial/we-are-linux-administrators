# Codex Prompt: Linux Admin Skill

Codex works best with precise, command-first instructions. Use this.

```text
Use linux-admin-ai-skill.

Task: Diagnose or implement a Linux administration solution.

Rules:
- Load SKILL.md first.
- Load the matching tasks/*.md file only.
- Start read-only.
- Produce exact commands, expected outputs/signals, and next branches.
- No service restart/package/firewall/network/filesystem/bootloader/reboot/recursive permission/MAC policy change without explicit confirmation gate.
- Prefer dry-run commands: apt-get -s, logrotate -d, config syntax tests, systemd-analyze verify.
- Always include validation and rollback.
- For code, implement dry-run default and `--apply` explicit mode.
- Add tests for dangerous command rejection.

Response format:
1. Commands to run now
2. What each command proves
3. Decision tree
4. Guarded fix commands
5. Rollback
6. Validation
```

## Codex implementation prompt

```text
Create a Linux triage tool following linux-admin-ai-skill.

Deliver:
- bin/linux-triage
- lib/distro_detect.py
- lib/safety_policy.py
- lib/collectors/{systemd,network,storage,performance,security,packages,containers}.py
- templates/incident-report.md
- tests/test_safety_policy.py
- tests/test_distro_detect.py

Requirements:
- Python 3.10+ only standard library unless project already has dependencies.
- Read-only by default.
- Timeout all commands.
- Redact tokens/passwords/private keys from outputs.
- JSON + Markdown report outputs.
- No command execution in tests; mock subprocess.
- Dangerous commands blocked unless `--apply --i-understand-risk` is passed, and still deny Class 3 destructive commands by default.
```

### Sysctl expert add-on
When working on Linux sysctl tuning, use the `sysctl-expert` rules: live-discover current keys with `sysctl -a`, explain every value, prefer minimal changes, avoid cargo-cult tuning, include validation and rollback, and never persist a sysctl change without evidence.

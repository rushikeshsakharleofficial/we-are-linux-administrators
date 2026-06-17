# Plugin Development Notes

## Validate locally

```bash
python3 -m json.tool .claude-plugin/plugin.json
python3 -m json.tool hooks/hooks.json
python3 scripts/linux-safety-guard.py <<'EOF'
{"tool_name":"Bash","tool_input":{"command":"rm -rf /var/log"}}
EOF
```

## Test in Claude Code

```bash
claude --plugin-dir ./we-are-linux-administrators
```

Then try:

```text
/linux-admin:diagnose high load but CPU idle
/linux-admin:network port 443 not reachable from remote host
/agents
```

## Package

```bash
zip -r we-are-linux-administrators.zip we-are-linux-administrators
claude --plugin-dir ./we-are-linux-administrators.zip
```


## v1.2.0

Added expert subskills: `systemd-expert`, `limits-expert`, and `networking-expert`; added read-only audit helpers, docs, templates, tests, and safety-hook coverage for systemd state changes, PAM/resource limits, and runtime network commands.


## v1.4.0

Added `firewall-expert` and `fail2ban-expert`, with read-only audit helpers, docs, templates, tests, and expanded safety-hook coverage for firewalld/nftables/iptables/UFW/ipset/ebtables/arptables and Fail2Ban state/config changes.


## v1.5.0

Added command-expert, user-permissions-expert, file-permissions-expert, and acl-permissions-expert. Expanded safety hook for chmod/chown/setfacl/user/sudoers/sed/find deletion/rsync delete workflows.

## v1.7.1 - Plugin namespace rename

- Kept repository/package folder as `we-are-linux-administrators`.
- Changed Claude plugin manifest name to `linux-admin`.
- Updated command examples to `/linux-admin:<skill>`.


## v1.10.0 - Scheduling, time, quota, mounting, filesystem and kernel experts

- Added `cron-scheduler-expert`, `chrony-expert`, `date-timectl-expert`, `quota-expert`, `disk-mounting-expert`, `filesystem-expert`, and `kernel-expert`.
- Added audit helpers, docs, change-plan templates, tests, and safety guard coverage for cron/systemd timers, Chrony/NTP, timedatectl/hwclock, quota workflows, fstab/mounts, filesystem repair, and kernel/boot operations.


## v1.10.0 - Separate TCP and UDP experts

- Added `tcp-expert` and `udp-expert` as separate protocol-focused modules.
- Added read-only audit helpers, protocol playbooks, research-source docs, templates, README/index updates, and tests.

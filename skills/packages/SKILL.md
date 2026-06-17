---
name: "packages"
description: "Troubleshoot Linux package manager issues across apt, dnf, rpm, zypper, and pacman, including interrupted transactions, repo errors, dependency conflicts, and rollback planning."
argument-hint: "[package manager error]"
effort: "high"
allowed-tools: "Read Grep Glob Bash"
---
# packages skill

Use this plugin skill for: $ARGUMENTS

Important: begin read-only; require explicit confirmation before disruptive/destructive changes; include validation and rollback.

Supporting docs are available under `${CLAUDE_SKILL_DIR}/../../docs/`.

# Task: Packages, Updates, Repos, Rollbacks

## When to use

Use for broken package transactions, dependency conflicts, repo errors, partial upgrades, package regression after update, missing files from packages, downgrade/rollback planning.

## Mental model

Package problems are distro-specific. First detect family, then inspect state before repair.

## Distro detection

```bash
cat /etc/os-release
command -v apt apt-get dpkg dnf yum rpm zypper pacman 2>/dev/null
```

## Debian/Ubuntu read-only diagnostics

```bash
dpkg --audit
apt-get -s install -f
apt-cache policy <pkg>
apt-mark showhold
apt list --upgradable 2>/dev/null | head -80
grep -R "^[^#]" /etc/apt/sources.list /etc/apt/sources.list.d/*.list 2>/dev/null || true
ls -l /var/log/apt /var/log/dpkg.log* 2>/dev/null
```

## RHEL-like read-only diagnostics

```bash
dnf history
rpm -V <pkg>
dnf repolist
dnf repoquery <pkg> 2>/dev/null || true
grep -R "^\[\|^baseurl=\|^mirrorlist=\|^enabled=" /etc/yum.repos.d/*.repo 2>/dev/null || true
ls -l /var/log/dnf* /var/log/yum.log* 2>/dev/null
```

## SUSE read-only diagnostics

```bash
zypper verify
zypper packages --orphaned
zypper repos -u
rpm -V <pkg>
```

## Arch read-only diagnostics

```bash
pacman -Dk
pacman -Qkk <pkg>
pacman -Qi <pkg>
grep -Ev '^\s*#|^\s*$' /etc/pacman.conf
```

## Branch interpretation

| Signal | Meaning | Next action |
|---|---|---|
| dpkg audit shows unpacked/unconfigured | interrupted Debian transaction | simulate repair first |
| apt simulation proposes huge removal | high risk | stop and inspect pins/repos |
| dnf history shows recent transaction before issue | possible regression | inspect packages and logs; rollback only with confirmation |
| rpm -V shows config/file drift | package files changed | compare config backups and app logs |
| repo metadata errors | repo/mirror/GPG/network | fix repo source rather than forcing install |
| pacman database errors | local DB inconsistency | inspect before sync/removal |

## Safe remediation patterns

### Debian/Ubuntu repair after simulation

```bash
apt-get -s install -f
# if output is safe and confirmed:
apt-get install -f
```

### RHEL-like rollback

Rollback is disruptive. Require confirmation and explain risk.

```bash
dnf history info <id>
dnf history undo <id> --assumeno
# if safe and confirmed:
dnf history undo <id>
```

### Verify package file drift

```bash
rpm -V <pkg>
dpkg -V <pkg> 2>/dev/null || true
```

## Validation

```bash
systemctl --failed
journalctl -b -p err..alert --no-pager | tail -100
<service-config-test-command>
systemctl status <unit> --no-pager
```

## Prevention

- Use maintenance windows.
- Keep package history in incident notes.
- Pin critical packages when needed.
- Test updates in staging.
- Snapshot before kernel/library upgrades.

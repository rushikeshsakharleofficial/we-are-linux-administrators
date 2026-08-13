---
name: package-manager-expert
description: Linux package-management expert for APT/dpkg, DNF/YUM/RPM, DNF5, zypper, pacman, apk, repositories, broken transactions, security updates, rollback, and package recovery.
argument-hint: "[package/repository/update/transaction problem]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# Package Manager Expert

Use for package, repository, dependency, update, downgrade, transaction, or package-database problems.

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`: collect facts first, preview changes, preserve rollback, and validate after any transaction.

## Route by platform

- Debian/Ubuntu: APT + dpkg. Prefer `apt` interactively and `apt-get`/`apt-cache` for automation and simulation.
- RHEL/Rocky/Alma/Fedora: DNF/DNF5 + RPM. Treat `yum` as legacy or compatibility tooling depending on release.
- SUSE/openSUSE: zypper + RPM.
- Arch: pacman.
- Alpine: apk.
- Release upgrades or repository-suite migrations: route to `migration-expert`.

## Read-only first

```bash
cat /etc/os-release
uname -r
command -v apt apt-get dpkg dnf dnf5 yum rpm zypper pacman apk || true
```

Debian/Ubuntu:

```bash
apt-cache policy
apt list --upgradable 2>/dev/null || true
apt-mark showhold 2>/dev/null || true
dpkg --audit 2>/dev/null || true
tail -80 /var/log/apt/history.log 2>/dev/null || true
```

RPM family:

```bash
dnf repolist all 2>/dev/null || dnf5 repo list --all 2>/dev/null || yum repolist all 2>/dev/null || true
dnf check 2>/dev/null || dnf5 check 2>/dev/null || yum check 2>/dev/null || true
dnf history list 2>/dev/null | head -30 || yum history list 2>/dev/null | head -30 || true
```

## Safe workflow

1. Detect OS, package manager, repositories, and support state.
2. Identify the exact package/transaction failure.
3. Check active package-manager processes before touching locks.
4. Simulate or preview the narrowest correction.
5. Back up repository/config state and snapshot data-bearing workloads when impact warrants it.
6. Apply one scoped transaction.
7. Validate package state, affected services, and boot/reboot requirements.

Useful previews:

```bash
apt-get -s install <package>
apt-get -s -f install
dnf --assumeno upgrade <package> 2>/dev/null || true
dnf5 --assumeno upgrade <package> 2>/dev/null || true
zypper patch --dry-run 2>/dev/null || true
```

## Guardrails

Do not blindly delete package locks, mix distro repositories, bypass dependencies with `--nodeps`/force flags, run broad distro-sync/full-upgrade without defining the source of truth, remove the running kernel, or assume package-history rollback is guaranteed.

For security updates, verify current vendor advisories and lifecycle guidance before changing version-specific recommendations.

## Output

```text
Platform/package stack:
Evidence:
Risk:
Preview:
Minimal change:
Backup/rollback:
Validation:
```

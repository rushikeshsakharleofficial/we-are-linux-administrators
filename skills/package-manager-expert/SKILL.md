---
name: package-manager-expert
description: Parent package-lifecycle skill for APT/dpkg, DNF/YUM/RPM, DNF5, zypper, pacman and apk. Handles repository/transaction/package-state problems directly and routes planned OS/security patch rollouts to a focused patching chunk.
argument-hint: "[package/repository/update/transaction/patching problem]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# Package Manager Expert

Use this parent for Linux package, repository, dependency, transaction, update or patching work. Collect bounded platform/package evidence first, then stay in the parent for package-state/repository recovery or load **one patching chunk** when the condition is a planned maintenance rollout.

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`: collect facts first, preview transactions, preserve rollback/recovery, and validate after changes. For security or lifecycle-sensitive patch guidance also follow `../../docs/SECURITY_PATCH_REFRESH_POLICY.md` and verify current vendor sources.

## Condition -> load only this branch

| Evidence/condition | Next content |
|---|---|
| broken dependency, package DB/transaction, repo, lock, install/remove/downgrade or one-package update problem | stay in this parent |
| planned OS/security patching, kernel update, reboot coordination, canary/batch rollout or maintenance window | `chunks/patching.md` |
| release upgrade or repository-suite migration | `migration-expert` |
| still unclear | stay in parent until platform and package-state evidence identifies the condition |

Default: **one parent + one chunk/specialist**. Do not load patch rollout guidance for a simple broken package transaction.

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

## Safe package-recovery workflow

1. Detect OS, package manager, repositories, support state, and exact failure.
2. Check active package-manager processes before touching locks.
3. Identify whether the issue is repository metadata, dependency solving, package database state, or a planned patch rollout.
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

Do not blindly delete package locks, mix distro repositories, bypass dependencies with `--nodeps`/force flags, run broad distro-sync/full-upgrade without defining the source of truth, remove the running/last-known-good kernel, or assume package-history rollback is guaranteed.

For planned patch/security rollouts, load `chunks/patching.md`; verify current vendor advisories and lifecycle guidance before version-specific recommendations.

## Validation

Use the narrow package-manager checks that match the change, then validate affected services/workloads. A successful package transaction is not proof the application is healthy.

## Output

```text
Platform/package stack:
Condition:
Evidence:
Risk:
Preview:
Minimal change or selected chunk:
Backup/rollback:
Validation:
```

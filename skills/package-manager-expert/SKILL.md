# Package Manager Expert Skill

Use this skill when the task involves APT, apt-get, apt-cache, apt-mark, dpkg, YUM, DNF, DNF5, RPM repositories, broken package states, repo audits, patch planning, transaction history, package locks, security updates, kernel package handling, offline updates, or local mirror/package-cache workflows.

Command namespace: `/linux-admin:package-manager-expert`

## Operating principle

Act like a senior Linux package-management administrator. Do not treat package managers as simple install/remove tools. Treat them as transaction engines that manage repositories, metadata, dependency solving, package databases, scripts, triggers, signatures, modules/streams, advisories, and boot-critical packages.

Always work in this order:

1. **Detect the family and toolchain**: Debian/Ubuntu APT+dpkg, RHEL/CentOS/Rocky/Alma/Fedora YUM/DNF/RPM, or DNF5.
2. **Collect read-only evidence** before proposing changes.
3. **Classify risk**: query-only, cache-only, install/update/remove, repo change, distro upgrade, recovery/repair, rollback/downgrade.
4. **Simulate or preview** when the tool supports it.
5. **Explain package selection and dependency resolution** in human terms.
6. **Prefer minimal scope**: package-specific fix before full upgrade, security-only update before broad patching where appropriate.
7. **Never hide dangerous options**: explicitly warn about force, downgrade, remove-essential, nodeps, allowerasing, skip-broken, and mixed repositories.
8. **Create rollback and validation**: transaction history, package lists, config backups, repo snapshots, VM/cloud snapshot, boot kernel fallback.
9. **Use internet research when built-in knowledge is insufficient**, preferring official distro docs, upstream man pages, vendor KBs, package bug trackers, and Linux community pages such as Debian/Ubuntu community docs, Fedora docs, Red Hat docs, Rocky/Alma forums, AskUbuntu, Unix & Linux StackExchange, and distro mailing lists.

## Read-only evidence collector

Run the bundled helper first when possible:

```bash
package-manager-expert-audit
```

Then manually inspect as needed:

```bash
cat /etc/os-release
command -v apt apt-get apt-cache apt-mark dpkg dnf dnf5 yum rpm || true
uname -a
uptime
systemctl is-system-running || true
```

### APT/Debian/Ubuntu evidence

```bash
apt --version || true
apt-get --version || true
dpkg --version || true
apt-cache policy
apt list --upgradable 2>/dev/null || true
apt-mark showhold || true
dpkg --audit || true
dpkg -l | awk '$1 ~ /^(hi|rc|iF|iU|iH|un|pn)/ {print}' | head -100
grep -RhsE '^[[:space:]]*(deb|Types:|URIs:|Suites:|Components:)' /etc/apt/sources.list /etc/apt/sources.list.d/* 2>/dev/null
ls -lh /var/lib/dpkg/lock* /var/lib/apt/lists/lock /var/cache/apt/archives/lock 2>/dev/null || true
tail -100 /var/log/apt/history.log 2>/dev/null || true
tail -100 /var/log/dpkg.log 2>/dev/null || true
```

### YUM/DNF/RPM evidence

```bash
rpm --version || true
yum --version 2>/dev/null | head -5 || true
dnf --version 2>/dev/null | head -20 || true
dnf5 --version 2>/dev/null || true
rpm -qa --last | head -30 || true
rpm -Va --nofiles --nodigest 2>/dev/null | head -100 || true
yum repolist all 2>/dev/null || dnf repolist all 2>/dev/null || dnf5 repo list --all 2>/dev/null || true
yum check 2>/dev/null || dnf check 2>/dev/null || dnf5 check 2>/dev/null || true
yum history list 2>/dev/null | head -30 || dnf history list 2>/dev/null | head -30 || dnf5 history list 2>/dev/null | head -30 || true
ls -lh /var/lib/rpm /var/lib/dnf /var/cache/dnf /var/cache/yum 2>/dev/null || true
```

## Tool selection rule

### Debian/Ubuntu

- Use `apt` for interactive human operations.
- Use `apt-get` and `apt-cache` for scripts, automation, reproducible runbooks, and older systems.
- Use `apt-mark` for holds/manual/auto state.
- Use `dpkg` only for low-level local `.deb` operations, database queries, `--configure -a`, or emergency repair after APT tells you to.

### RHEL/Rocky/Alma/CentOS/Fedora

- Prefer `dnf` on RHEL 8+, Fedora, Rocky 8+, Alma 8+.
- Expect `yum` to be legacy on RHEL/CentOS 7 and earlier; on RHEL 8+ `yum` may be a compatibility alias to DNF.
- Prefer `dnf5` where the system already uses it; do not mix assumptions from DNF4 when DNF5 syntax differs.
- Use `rpm` for local package database queries, signature verification, ownership checks, and emergency database recovery — not for normal dependency-managed installs unless unavoidable.

## Risk classes

| Class | Examples | Default action |
|---|---|---|
| Read-only | `apt-cache policy`, `dnf repoquery`, `rpm -qf`, `dpkg -S` | Allowed |
| Cache-only | `apt update`, `dnf makecache`, `yum makecache` | Ask if production; safe but metadata-changing |
| Transaction | install, remove, upgrade, autoremove, distro-sync | Require plan + preview |
| Repository | add repo, disable repo, apt sources, GPG keys | Require backup + validation |
| Recovery | `dpkg --configure -a`, `apt-get -f install`, `rpm --rebuilddb` | Require evidence + snapshot where possible |
| Dangerous force | `dpkg --force-all`, `rpm --nodeps`, APT remove-essential, force-yes | Refuse unless explicit disaster-recovery plan |
| Release migration | `do-release-upgrade`, `dnf system-upgrade`, repo suite change | Route to migration-expert |

## APT command map

### Core operations

```bash
apt update                       # refresh package index
apt list --upgradable             # show upgrade candidates
apt upgrade                       # upgrade without removals in normal cases
apt full-upgrade                  # allow dependency-driven removals/additions
apt install PKG                   # install/upgrade package
apt install PKG=VERSION           # install exact version; can downgrade, use care
apt install PKG/RELEASE           # select target release/archive
apt remove PKG                    # remove package, keep config files
apt purge PKG                     # remove package and config files
apt autoremove                    # remove unused auto-installed dependencies
apt autopurge                     # autoremove plus purge configs where supported
apt clean                         # clear cached .deb files
apt autoclean                     # clear obsolete cached .deb files
apt show PKG                      # package metadata
apt search REGEX                  # search metadata
```

### Automation-safe variants

```bash
apt-get update
apt-get -s install PKG            # simulate/no action
apt-get -s upgrade
apt-get -s dist-upgrade
apt-get install --download-only PKG
apt-get install --no-install-recommends PKG
apt-get install --only-upgrade PKG
apt-get install --reinstall PKG
apt-get check                     # check broken dependencies
apt-cache policy PKG              # installed/candidate/repo priority
apt-cache madison PKG             # versions from repos
apt-cache depends PKG
apt-cache rdepends PKG
apt-cache show PKG
apt-mark showhold
apt-mark hold PKG
apt-mark unhold PKG
apt-mark showmanual
apt-mark showauto
```

### dpkg emergency/query map

```bash
dpkg -l 'pattern*'
dpkg -s PKG
dpkg -L PKG
dpkg -S /path/to/file
dpkg --audit
dpkg --configure -a              # configure unpacked packages after interrupted run
dpkg -i local.deb                # local install, may leave dependency issues
apt-get -f install               # then repair dependencies through APT
```

## DNF/DNF5/YUM command map

### DNF/DNF5 common operations

```bash
dnf check-update                  # exit 100 when updates are available
dnf upgrade                       # upgrade installed packages
dnf upgrade --security            # security advisory scoped upgrade when metadata supports it
dnf install PKG
dnf remove PKG
dnf autoremove
dnf reinstall PKG
dnf downgrade PKG
dnf distro-sync                   # align installed packages to enabled repos; can downgrade
dnf makecache
dnf clean all
dnf repolist all
dnf repoquery PKG
dnf repoquery --whatprovides /path/or/capability
dnf repoquery --requires PKG
dnf module list
dnf module enable STREAM
dnf history list
dnf history info ID
dnf history undo ID
dnf history rollback ID
```

### DNF5-specific patterns

```bash
dnf5 repo list --all
dnf5 check-upgrade
dnf5 upgrade --security
dnf5 install --downloadonly PKG
dnf5 install --offline PKG
dnf5 install --store=/path/tx PKG
dnf5 replay /path/tx
dnf5 history list --json
dnf5 history info last --json
dnf5 history undo last
dnf5 distro-sync
```

### YUM/RHEL 7 patterns

```bash
yum check-update
yum update
yum update --security
yum update-minimal --security
yum install PKG
yum remove PKG
yum reinstall PKG
yum downgrade PKG
yum distro-sync
yum repolist all
yum provides '*/binary'
yum history list
yum history info ID
yum history undo ID
yum history redo ID
```

## Professional troubleshooting playbooks

### Broken APT/dpkg transaction

1. Collect `dpkg --audit`, `/var/log/apt/history.log`, `/var/log/dpkg.log`.
2. Check active lock owners with `ps -ef | grep -E 'apt|dpkg|unattended'`; do not delete locks blindly.
3. Run simulation first: `apt-get -s -f install`.
4. If clear, propose `dpkg --configure -a`, then `apt-get -f install`, then `apt-get check`.
5. Validate service status for packages touched.
6. Record package list before/after.

### APT repository/suite conflict

1. Print sources and `apt-cache policy`.
2. Detect mixed Debian/Ubuntu or mixed stable/testing/unstable without pinning.
3. Explain candidate priority and pinning impact.
4. Propose minimal pin or repo disable; avoid broad downgrades unless migration plan exists.
5. Use `apt-get -s dist-upgrade` or targeted `apt-get -s install PKG=VERSION` before applying.

### DNF/YUM dependency conflict

1. Run `dnf check`, `dnf repoquery --duplicates`, `dnf repolist all`, `dnf history list`.
2. Identify third-party repo involvement.
3. Prefer `dnf upgrade --best --allowerasing` only as a diagnostic simulation first; never default to it.
4. Use `dnf distro-sync` only when the desired source of truth is known.
5. Use `dnf history undo` only after verifying packages are still available and rollback effect is understood.

### Security patching

1. Determine OS and repository support for advisories.
2. For RHEL/YUM: consider `yum update --security` or `yum update-minimal --security`.
3. For DNF/DNF5: consider `dnf upgrade --security` or advisory/CVE filters.
4. For Debian/Ubuntu: confirm security repositories and use `apt list --upgradable`; consider unattended-upgrades policy.
5. Check kernel updates and reboot requirement.
6. Validate affected services after patching.

### Kernel package handling

Never remove the currently running kernel without explicit rollback. On RPM systems, package managers install new kernels rather than replacing the running one. Validate bootloader entries and keep at least one known-good kernel.

### Package rollback/downgrade

1. Prefer snapshot/backup rollback over package rollback on production.
2. Use package history as a guide, not a guarantee.
3. Confirm old package versions remain in enabled repositories or local cache.
4. Simulate rollback/downgrade.
5. Check config file migrations and database/schema compatibility.

## Anti-patterns to block or challenge

- `apt-get -y dist-upgrade` on production without simulation and reboot plan.
- `apt-get --allow-remove-essential`, `--force-yes`, or unauthenticated packages.
- `dpkg --force-all` as a normal repair step.
- `rpm -Uvh --nodeps` or `rpm -e --nodeps` to bypass dependency management.
- Randomly deleting `/var/lib/dpkg/lock*` or `/var/lib/rpm/__db*` while a process is active.
- Mixing Debian and Ubuntu repositories.
- Mixing stable/testing/unstable or EPEL/remi/third-party repos without pinning/priorities.
- Running `dnf distro-sync` without defining the repo source of truth.
- `yum history undo` without checking available older package versions.
- Enabling broad third-party repos permanently just to install one package.

## Output format

For every package-manager task, respond with:

1. **Detected platform and package stack**
2. **Current evidence**
3. **Risk classification**
4. **Likely root cause or package-management state**
5. **Preview/simulation commands**
6. **Exact change plan**
7. **Rollback plan**
8. **Validation commands**
9. **Why this is safer than common shortcuts**
10. **When to research online**

## Internet research rule

If the issue involves unknown package names, third-party repos, new distro releases, DNF5 behavior, vendor support matrices, CVEs, EOL/EUS/LTS windows, package bugs, repo metadata outages, or unclear dependency solver output, research before proposing changes. Prioritize official docs first, then distro community pages and high-quality admin forums. Always cite the sources in the final plan.

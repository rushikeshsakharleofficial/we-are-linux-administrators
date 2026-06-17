# Package Manager Expert — Option and Shortcut Catalog

This catalog is intentionally practical. It does not attempt to copy every man-page line; instead it teaches the agent which commands/options matter during real administration and when they are safe.

## APT / apt-get / apt-cache / apt-mark

| Task | Interactive | Automation/script | Notes |
|---|---|---|---|
| Refresh metadata | `apt update` | `apt-get update` | Run before upgrade/install if metadata may be stale. |
| Show upgrades | `apt list --upgradable` | `apt-get -s upgrade` | Use simulation for runbooks. |
| Safe upgrade | `apt upgrade` | `apt-get upgrade` | Should not remove installed packages in the classic apt-get model. |
| Full dependency upgrade | `apt full-upgrade` | `apt-get dist-upgrade` | May remove packages; require simulation and approval. |
| Install | `apt install PKG` | `apt-get install PKG` | Can upgrade named package. |
| Exact version | `apt install PKG=VERSION` | `apt-get install PKG=VERSION` | Can downgrade; explain risk. |
| Target release | `apt install PKG/RELEASE` | `apt-get -t RELEASE install PKG` | Requires apt preferences/policy awareness. |
| Remove | `apt remove PKG` | `apt-get remove PKG` | Leaves configs. |
| Purge | `apt purge PKG` | `apt-get purge PKG` | Deletes configs; ask confirmation. |
| Reinstall | `apt reinstall PKG` | `apt-get install --reinstall PKG` | Useful for corrupted files. |
| Hold | `apt-mark hold PKG` | same | Prevent upgrades. |
| Unhold | `apt-mark unhold PKG` | same | Can allow pending upgrade. |
| Dependencies | `apt depends PKG` | `apt-cache depends PKG` | Use before removing. |
| Reverse deps | `apt rdepends PKG` | `apt-cache rdepends PKG` | Use before removing libraries. |
| Policy | `apt-cache policy PKG` | same | Candidate/version/source priority. |
| Broken check | `apt-get check` | same | Diagnostic. |
| Repair attempt | `apt-get -f install` | same | Use after simulation where possible. |

### Important apt-get options

| Option | Meaning | Skill rule |
|---|---|---|
| `-s`, `--simulate`, `--dry-run`, `--no-act` | No-action simulation | Use before risky upgrades/removals. |
| `-d`, `--download-only` | Download packages only | Good for staged maintenance. |
| `--no-install-recommends` | Skip recommends | Useful for minimal servers; explain missing optional functionality. |
| `--install-suggests` | Include suggests | Usually too broad for servers. |
| `-y`, `--assume-yes` | Non-interactive yes | Only after reviewed simulation. |
| `--assume-no` | Automatic no | Good for checking solver behavior. |
| `--only-upgrade` | Upgrade installed packages only | Safer than accidentally installing new package. |
| `--no-upgrade` | Do not upgrade existing packages | Useful in pinned systems. |
| `--allow-downgrades` | Permit downgrade | Dangerous; require explicit reason. |
| `--allow-remove-essential` | Permit essential removal | Treat as near-refusal. |
| `--allow-change-held-packages` | Override holds | Require hold owner/rationale review. |
| `--force-yes` | Deprecated dangerous force | Refuse except formal disaster recovery. |
| `-o key=value` | Override config | Record exact key/value and impact. |

## DNF / DNF5

| Task | DNF4 | DNF5 | Notes |
|---|---|---|---|
| Check updates | `dnf check-update` | `dnf5 check-upgrade` | Exit codes can indicate updates. |
| Upgrade | `dnf upgrade` | `dnf5 upgrade` | Use `--security` when supported. |
| Install | `dnf install PKG` | `dnf5 install PKG` | DNF5 supports `--store` and `--offline`. |
| Remove | `dnf remove PKG` | `dnf5 remove PKG` | Check reverse deps first. |
| Reinstall | `dnf reinstall PKG` | `dnf5 reinstall PKG` | Replaces package files. |
| Downgrade | `dnf downgrade PKG` | `dnf5 downgrade PKG` | Verify old versions available. |
| Distro sync | `dnf distro-sync` | `dnf5 distro-sync` | Align to enabled repos; can downgrade. |
| Repo list | `dnf repolist all` | `dnf5 repo list --all` | Include disabled repos during audit. |
| Repo query | `dnf repoquery ...` | `dnf5 repoquery ...` | Best remote query tool. |
| History | `dnf history ...` | `dnf5 history ...` | Validate before undo/rollback. |
| Module | `dnf module ...` | `dnf5 module ...` | Streams affect package availability. |
| Version lock | plugin | `dnf5 versionlock ...` | Use for controlled holds. |

### Important DNF options

| Option | Meaning | Skill rule |
|---|---|---|
| `--best` | Fail if latest candidate cannot be installed | Good diagnostic; not always desired in production. |
| `--nobest` | Permit non-best candidates | Sometimes needed on RHEL; explain why. |
| `--allowerasing` | Allow removals to solve dependencies | High risk; simulate/explain removals. |
| `--skip-broken` | Skip packages with dependency issues | Avoid hiding real problem except emergency patching. |
| `--downloadonly` | Download only | Good staging. |
| `--disablerepo`, `--enablerepo` | Repo scope | Prefer scoped one-off repo enable over permanent repo changes. |
| `--releasever` | Override release version | Migration/high risk; route to migration-expert if broad. |
| `--security`, `--cve`, `--advisory` | Advisory-scoped transactions | Preferred for security patching. |
| `--setopt` | Temporary config override | Record exact impact. |

### Important DNF5 options

| Option | Meaning | Skill rule |
|---|---|---|
| `--offline` | Store transaction for offline execution | Good for controlled maintenance. |
| `--store=PATH` | Store transaction for replay | Useful for review/replay workflows. |
| `--from-repo=ID` | Limit explicit package lookup to repo | Good for one-off repo scope. |
| `--from-vendor=VENDOR` | Limit explicit package lookup to vendor | Useful in vendor-change control. |
| `history list --json` | Machine-readable history | Prefer for automation. |

## YUM / RHEL 7

| Task | Command | Notes |
|---|---|---|
| Update all | `yum update` | On RHEL 7, yum update/upgrade are usually equivalent when obsoletes are enabled. |
| Security update | `yum update --security` | Advisory metadata required. |
| Minimal security | `yum update-minimal --security` | Can avoid non-security bugfix jumps. |
| Install/remove | `yum install/remove PKG` | Normal dependency-managed path. |
| Provides | `yum provides '*/name'` | Find owner/provider. |
| History | `yum history list/info/undo/redo` | Undo depends on old packages being available. |
| Repo list | `yum repolist all` | Include disabled repos. |
| Clean metadata | `yum clean all` | Use when cache corruption suspected. |

## RPM low-level map

| Task | Command | Rule |
|---|---|---|
| Installed package | `rpm -q PKG` | Read-only. |
| File owner | `rpm -qf /path` | Read-only. |
| Package files | `rpm -ql PKG` | Read-only. |
| Verify package | `rpm -V PKG` | Read-only but can be noisy. |
| Verify all | `rpm -Va` | Potentially long; explain. |
| Import key | `rpm --import KEY` | Repo trust change; ask confirmation. |
| Rebuild DB | `rpm --rebuilddb` | Recovery only; back up rpmdb first. |
| Install local RPM | `rpm -Uvh file.rpm` | Avoid unless dependency manager cannot be used. |
| Force/no-deps | `--force`, `--nodeps` | Treat as dangerous. |

# Package Manager Expert — Playbooks

## Preflight before any transaction

```bash
# common
cat /etc/os-release
uname -r
uptime
systemctl is-system-running || true

# backup package state
mkdir -p ./pkg-evidence
cp -a /etc/apt ./pkg-evidence/etc-apt 2>/dev/null || true
cp -a /etc/yum.repos.d ./pkg-evidence/yum.repos.d 2>/dev/null || true
cp -a /etc/dnf ./pkg-evidence/etc-dnf 2>/dev/null || true
rpm -qa | sort > ./pkg-evidence/rpm-qa.before 2>/dev/null || true
dpkg-query -W -f='${binary:Package}\t${Version}\t${Status}\n' > ./pkg-evidence/dpkg.before 2>/dev/null || true
```

## Install a package safely

1. Identify package manager.
2. Search package and provider.
3. Verify repository source.
4. Preview dependencies.
5. Install with minimal repo scope.
6. Validate binary/service/config.

APT:

```bash
apt-cache policy PKG
apt-cache depends PKG
apt-get -s install PKG
sudo apt-get install PKG
```

DNF:

```bash
dnf repoquery PKG
dnf repoquery --requires PKG
dnf install --downloadonly PKG
sudo dnf install PKG
```

## Remove a package safely

1. Check if service-critical.
2. Check reverse dependencies.
3. Simulate removal.
4. Prefer disable service before remove when unsure.
5. Keep config first; purge later only after verification.

APT:

```bash
apt-cache rdepends PKG
apt-get -s remove PKG
sudo apt-get remove PKG
```

DNF/YUM:

```bash
dnf repoquery --whatrequires PKG --installed || true
dnf remove --assumeno PKG
sudo dnf remove PKG
```

## Broken dependency repair

APT:

```bash
dpkg --audit
apt-get check
apt-get -s -f install
sudo dpkg --configure -a
sudo apt-get -f install
```

DNF/YUM:

```bash
dnf check || yum check
rpm -Va --nofiles --nodigest | head -100
dnf repoquery --duplicates || true
dnf distro-sync --assumeno
```

Do not jump directly to `--allowerasing`, `--skip-broken`, `rpm --nodeps`, or manual database deletion.

## Repository audit

APT:

```bash
apt-cache policy
grep -RhsE '^[[:space:]]*(deb|Types:|URIs:|Suites:|Components:)' /etc/apt/sources.list /etc/apt/sources.list.d/*
apt-key list 2>/dev/null || true
find /etc/apt/keyrings /usr/share/keyrings -maxdepth 1 -type f -ls 2>/dev/null || true
```

DNF/YUM:

```bash
dnf repolist all || yum repolist all
find /etc/yum.repos.d /etc/dnf -type f -maxdepth 3 -print -exec sed -n '1,120p' {} \;
rpm -qa 'gpg-pubkey*'
```

## Security patching

- Use canary host first.
- Separate kernel and userspace reboot requirements.
- Prefer security/advisory scoped update when supported.
- Capture before/after package list.
- Validate services and listening ports.

APT:

```bash
apt update
apt list --upgradable
apt-get -s upgrade
```

DNF/YUM:

```bash
dnf updateinfo list security || yum updateinfo list security
dnf upgrade --security --assumeno || yum update --security --assumeno
```

## Package history and rollback

APT has logs, not a first-class transaction undo equivalent to DNF/YUM history. Prefer snapshot rollback or reinstall exact versions using known repos/cache.

DNF/YUM/DNF5 support transaction history, but rollback is not magic: old package versions and compatible configs must still exist. Always inspect `history info` before undo/rollback.

```bash
dnf history list
dnf history info ID
dnf history undo ID --assumeno
```

DNF5:

```bash
dnf5 history list --json
dnf5 history info last --json
dnf5 history undo last --store ./rollback-tx
```

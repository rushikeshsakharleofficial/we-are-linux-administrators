# Ubuntu Desktop release lifecycle chunk

Use this chunk for Ubuntu Desktop release support, LTS/interim selection, release upgrades, Ubuntu Pro Desktop, ESM, Livepatch, installer changes, and flavor support-policy questions.

## Official facts to verify first

- Current Ubuntu Desktop release and latest LTS.
- Whether the installed release is still within standard security maintenance.
- Whether Ubuntu Pro/ESM/Livepatch applies to the machine.
- Whether the system is using an official flavor and whether that flavor has a shorter support period than Ubuntu base packages.
- Supported upgrade path and whether upgrades are staged or blocked by known release notes.

## Evidence commands

```bash
printf '== os ==\n'; cat /etc/os-release 2>/dev/null | sed -n '1,20p'
printf '== kernel ==\n'; uname -a; cat /proc/version_signature 2>/dev/null || true
printf '== support ==\n'; ubuntu-security-status 2>/dev/null || pro status 2>/dev/null || true
printf '== upgrade policy ==\n'; grep -R '^Prompt=' /etc/update-manager/release-upgrades 2>/dev/null || true
printf '== held packages ==\n'; apt-mark showhold 2>/dev/null || true
printf '== third-party sources ==\n'; find /etc/apt/sources.list /etc/apt/sources.list.d -type f -maxdepth 1 -print -exec sed -n '1,120p' {} \; 2>/dev/null
```

## Upgrade decision rules

- Prefer LTS for stable workstations, business desktops, and low-maintenance family laptops.
- Use interim releases only when the user needs newer desktop/kernel/hardware enablement and accepts shorter support.
- Before `do-release-upgrade`, disable or audit PPAs and vendor repositories; many desktop upgrade failures come from third-party packages.
- Never start a release upgrade without verified disk space, package health, and user data backup.
- If a desktop is remote-only, confirm console/cloud recovery access before display-manager, kernel, or release-upgrade work.

## Safe upgrade preflight

```bash
sudo apt update
sudo apt -o Debug::pkgProblemResolver=yes dist-upgrade --simulate | sed -n '1,220p'
df -h; df -ih
sudo dpkg --audit
sudo apt check
```

## Rollback model

Ubuntu release upgrades are not reliably reversible in place. Treat rollback as restore-based:

- Full user data backup.
- System snapshot if using Btrfs/LVM/VM/cloud snapshot.
- Package manifest and source-list backup.
- Recovery USB or cloud console path.
- Known-good kernel retained.

For package-level rollback only:

```bash
apt-cache policy <package>
sudo apt install <package>=<previous-version>
sudo apt-mark hold <package>
```

# Ubuntu Desktop release lifecycle chunk

Use this chunk for Ubuntu Desktop release support, LTS/interim selection, release upgrades, Ubuntu Pro Desktop, ESM, Livepatch, installer changes, and flavor support-policy questions.

_Last refreshed: 2026-06-29._

## Current official release facts

As of this refresh, the official Ubuntu releases index lists these standard-support desktop/server releases:

- Latest LTS: Ubuntu 26.04 LTS (Resolute Raccoon).
- Previous LTS releases still in standard support: Ubuntu 24.04 LTS and Ubuntu 22.04 LTS.
- Current interim release: Ubuntu 25.10 (Questing Quokka).
- Ubuntu 20.04 LTS is outside standard security maintenance and requires Ubuntu Pro/ESM for expanded security maintenance.

Canonical's release-cycle page lists Ubuntu 26.04 LTS standard security maintenance through May 2031, expanded security maintenance through May 2036, and legacy add-on coverage through May 2041. It lists Ubuntu 25.10 standard security maintenance through July 2026, Ubuntu 24.04 LTS standard security maintenance through May 2029, and Ubuntu 22.04 LTS standard security maintenance through May 2027.

Treat this section as a snapshot only. Always re-check the official Ubuntu releases index and Canonical release-cycle page before version-specific advice.

## Official facts to verify first

- Current Ubuntu Desktop release and latest LTS.
- Whether the installed release is still within standard security maintenance, Ubuntu Pro/ESM, or legacy add-on coverage.
- Whether Ubuntu Pro/ESM/Livepatch applies to the machine.
- Whether the system is using an official flavor and whether that flavor has a shorter support period than Ubuntu base packages.
- Supported upgrade path and whether upgrades are staged or blocked by known release notes.
- Current Ubuntu Security Notices and CVE tracker entries before vulnerability-fix guidance.

## Official source checklist

- Ubuntu releases index: `https://releases.ubuntu.com/`
- Canonical release cycle and support coverage: `https://ubuntu.com/about/release-cycle`
- Ubuntu Security Notices: `https://ubuntu.com/security/notices`
- Ubuntu CVE tracker: `https://ubuntu.com/security/cves`
- Ubuntu Pro client status on the host: `pro status`

## Evidence commands

```bash
printf '== os ==\n'; cat /etc/os-release 2>/dev/null | sed -n '1,20p'
printf '== kernel ==\n'; uname -a; cat /proc/version_signature 2>/dev/null || true
printf '== support ==\n'; ubuntu-security-status 2>/dev/null || pro status 2>/dev/null || true
printf '== upgrade policy ==\n'; grep -R '^Prompt=' /etc/update-manager/release-upgrades 2>/dev/null || true
printf '== held packages ==\n'; apt-mark showhold 2>/dev/null || true
printf '== third-party sources ==\n'; find /etc/apt/sources.list /etc/apt/sources.list.d -maxdepth 1 -type f -print -exec sed -n '1,120p' {} \; 2>/dev/null
```

## Upgrade decision rules

- Prefer LTS for stable workstations, business desktops, and low-maintenance family laptops.
- Use interim releases only when the user needs newer desktop/kernel/hardware enablement and accepts shorter support.
- Do not assume a machine is fully covered because the base Ubuntu release still has Pro/ESM coverage; verify `pro status`, enabled services, architecture, and package origin.
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

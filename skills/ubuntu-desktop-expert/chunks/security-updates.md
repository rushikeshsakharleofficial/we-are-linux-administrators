# Ubuntu Desktop security and updates chunk

Use this chunk for desktop-safe hardening, AppArmor, Secure Boot, encryption, Ubuntu Pro, Livepatch, unattended upgrades, browser/app confinement, Snap permissions, firewall, remote desktop exposure, Bluetooth/Wi-Fi sharing, and update failures.

## Security principle

Do not reduce security to fix convenience issues. Never suggest disabling AppArmor, Secure Boot, firewall, sandboxing, signature checks, or encryption without a bounded diagnostic reason and rollback.

## Evidence commands

```bash
printf '== updates ==\n'; apt list --upgradable 2>/dev/null | sed -n '1,160p'
printf '== reboot required ==\n'; ls -l /var/run/reboot-required* 2>/dev/null || true
printf '== pro/livepatch ==\n'; pro status 2>/dev/null || true; canonical-livepatch status 2>/dev/null || true
printf '== apparmor ==\n'; aa-status 2>/dev/null | sed -n '1,120p' || true
printf '== firewall ==\n'; ufw status verbose 2>/dev/null || true; nft list ruleset 2>/dev/null | sed -n '1,120p' || true
printf '== secure boot ==\n'; mokutil --sb-state 2>/dev/null || true
printf '== encryption ==\n'; lsblk -f | sed -n '1,120p'; systemd-cryptenroll --tpm2-device=list 2>/dev/null || true
```

## Desktop-specific risks

- Screen sharing and remote desktop services can expose a workstation if firewall or router rules are loose.
- Browser password stores, GNOME Keyring, KWallet, SSH agent, and secret portals are part of desktop security posture.
- Classic confinement snaps and third-party `.deb` packages need extra trust review.
- Bluetooth file sharing and printer sharing should be checked on shared networks.

## Update troubleshooting

```bash
sudo apt update
sudo apt check
sudo dpkg --audit
systemctl status unattended-upgrades apt-daily.timer apt-daily-upgrade.timer --no-pager 2>/dev/null | sed -n '1,160p'
journalctl -u unattended-upgrades --no-pager -n 120 2>/dev/null
```

## Safe remediation

- Prefer security updates from Ubuntu repos.
- For broken updates, fix package-manager consistency before changing desktop packages.
- For AppArmor denials, inspect audit logs and create narrow profile fixes; do not globally disable AppArmor.
- For Secure Boot module failures, verify module signing/MOK status before disabling Secure Boot.

## Rollback

- Keep package manifests before changes.
- Use snapshots for kernel, driver, release-upgrade, encryption, or desktop-manager changes.
- For firewall changes, preserve existing rules and keep local console/SSH fallback.

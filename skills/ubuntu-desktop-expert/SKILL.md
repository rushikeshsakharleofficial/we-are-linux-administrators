---
name: ubuntu-desktop-expert
description: Ubuntu Desktop specialist for GNOME, KDE Plasma/Kubuntu, Xfce/Xubuntu, MATE, Cinnamon, LXQt/Lubuntu, Budgie, UKUI/Kylin, Unity, Ubuntu Studio desktop workflows, Wayland/Xorg, display managers, kernels, HWE/OEM kernels, graphics drivers, PipeWire/audio, Bluetooth, Wi-Fi, printing, power, UI customization, extensions/plugins, desktop security, updates, release upgrades, and safe rollback-aware desktop troubleshooting.
argument-hint: "[ubuntu-desktop|gnome|kde|xfce|mate|cinnamon|lxqt|budgie|ukui|unity|wayland|xorg|kernel|driver|extension|ui|upgrade|security] [symptom/task]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# Ubuntu Desktop Expert

Use this skill for Ubuntu Desktop and official Ubuntu flavor systems where the problem involves the graphical desktop, UI shell, session stack, display server, login manager, hardware enablement, kernel choice, desktop security, updates, release upgrades, or user-facing desktop applications.

Interpret common spelling variants:

- `genome` usually means **GNOME**.
- `X-face`, `xface`, or `xfce` usually means **Xfce/Xubuntu**.
- `KDE` usually means **KDE Plasma/Kubuntu**.

## Mandatory contract

Follow `${CLAUDE_SKILL_DIR}/../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` for every answer, plan, and change:

1. Security checks and facts before apply.
2. Rollback plan.
3. Correct wrong/stale skill instructions when evidence proves they are wrong; create/update GitHub issues only when matching the user's concern and safe/appropriate.
4. Architecture fit check for over-implementation and under-implementation, including a better tool/feature recommendation and deep reason.
5. Architecture audit in final output.
6. Backup and disaster plan for each tool/workflow.
7. Guarded rollback/recovery plan for failed changes, especially network failure, SSH/RDP loss, display-manager restart, failed login, or broken graphics sessions.
8. Token-optimized execution with bounded outputs.

## Source refresh rule

Before making version-specific recommendations, verify current facts from official/current sources. Use community findings only as signals.

Preferred source order:

1. Canonical/Ubuntu official pages, release notes, Ubuntu Discourse release threads, Launchpad package pages, Ubuntu Wiki release pages.
2. Official flavor sites: Kubuntu, Xubuntu, Lubuntu, Ubuntu MATE, Ubuntu Budgie, Ubuntu Cinnamon, Ubuntu Kylin, Ubuntu Studio, Ubuntu Unity, Edubuntu.
3. Upstream desktop docs: GNOME, KDE Plasma, Xfce, MATE, Cinnamon/Linux Mint upstream, LXQt, Budgie, UKUI, Unity/Compiz.
4. Hardware/security sources: Ubuntu certified hardware, NVIDIA/AMD/Intel docs, Canonical kernel and Livepatch docs, Ubuntu security notices/CVEs.
5. Community sources: Ask Ubuntu, Ubuntu Forums, Ubuntu Discourse, Launchpad bugs, GitHub/GitLab issues, Stack Overflow/Unix & Linux/Server Fault, Reddit Linux/Ubuntu communities.

Do not change skill instructions based only on one community post. Verify with official docs, upstream source/release notes, package metadata, or multiple credible reports.

## Scope

### Ubuntu releases and support model

Handle:

- LTS vs interim releases.
- Release upgrades: `do-release-upgrade`, GUI upgrader, staged rollout behavior, third-party PPA impact.
- Ubuntu Pro Desktop, ESM, Livepatch, CIS/STIG/FIPS where relevant.
- HWE/OEM/GA kernel selection and rollback.
- Desktop ISO installation, dual boot, encryption, Secure Boot, TPM-backed workflows, recovery mode.
- Ubuntu Desktop on certified laptops/desktops/workstations and Raspberry Pi desktop use.

Always check the installed release and support state before recommending package changes or release upgrades.

### Desktop environments and flavors

Cover the default Ubuntu Desktop and all major official flavor desktop stacks:

| Stack | Common distro/flavor | Core components |
|---|---|---|
| GNOME | Ubuntu Desktop, Edubuntu | `gnome-shell`, Mutter, GDM, Wayland/Xorg, GNOME Settings, extensions |
| KDE Plasma | Kubuntu, Ubuntu Studio | Plasma Shell, KWin, SDDM, Discover, KDE Connect, Wayland/X11 |
| Xfce | Xubuntu | `xfce4-session`, `xfwm4`, `xfce4-panel`, Thunar, LightDM, X11 and experimental Wayland paths |
| MATE | Ubuntu MATE | `mate-session`, Marco/Compiz, MATE Tweak, LightDM |
| Cinnamon | Ubuntu Cinnamon | `cinnamon-session`, Muffin, Nemo, Cinnamon spices/applets/extensions |
| LXQt | Lubuntu | `lxqt-session`, Openbox/labwc/KWin variants by release, SDDM, PCManFM-Qt |
| Budgie | Ubuntu Budgie | Budgie Desktop, Raven, Budgie applets, gnome-settings-daemon integration |
| UKUI | Ubuntu Kylin | UKUI desktop, Kylin apps, SDDM/LightDM depending release |
| Unity | Ubuntu Unity | Unity 7, Compiz, HUD, global menu, LightDM |
| Studio workflow | Ubuntu Studio | KDE Plasma plus low-latency/media tooling, JACK/PipeWire/audio production stack |

Also recognize non-official or adjacent desktops only when installed by the user, such as i3, Sway, Hyprland, COSMIC, Pantheon, Deepin, Openbox, or custom tiling-window-manager sessions. For these, verify packages and session files before advising.

### Display stack

Handle:

- Wayland vs Xorg/X11 session selection.
- Xwayland for legacy X11 applications under Wayland.
- Display managers: GDM/GDM3, SDDM, LightDM, LXDM.
- Compositors/window managers: Mutter, KWin, xfwm4, Marco, Muffin, Openbox, Compiz, labwc, wlroots-based compositors.
- Login loops, black screens, frozen greeter, missing sessions, multi-monitor layout, scaling/HiDPI/fractional scaling, screen tearing, color profiles, Night Light, remote desktop interaction.

Never blindly disable Wayland or swap display managers. First prove the failing layer.

### Hardware, kernel, drivers, and graphics

Cover:

- GA, HWE, OEM, low-latency, signed and generic kernels.
- Kernel updates, pinning, rollback through GRUB, initramfs regeneration.
- Secure Boot and DKMS/MOK enrollment for NVIDIA/VirtualBox/Wi-Fi drivers.
- NVIDIA proprietary/open kernel modules, Nouveau conflicts, PRIME hybrid graphics, AMDGPU, Intel i915/xe, Mesa, Vulkan, VA-API, Wayland compatibility.
- Firmware and microcode: `linux-firmware`, `intel-microcode`, `amd64-microcode`, `fwupd`, LVFS.
- Laptop features: suspend/resume, hibernate, lid switch, battery thresholds, fingerprint, webcam, touchpad, keyboard backlight, function keys, docking stations.

Kernel rule: prefer Ubuntu archive kernels and vendor-supported OEM/HWE stacks. Do not recommend random mainline kernels unless the user explicitly needs a hardware enablement test and accepts rollback risk.

### Desktop applications and package sources

Cover:

- APT/deb packages, Snap packages, Flatpak when user installed/enabled it, PPAs, AppImage, vendor `.deb` packages.
- Ubuntu Software / App Center, GNOME Software, KDE Discover.
- Firefox/Chromium/Thunderbird/LibreOffice, media codecs, fonts, input methods, language packs.
- Default app associations, MIME handlers, desktop files, autostart entries.

Source trust rule:

- Prefer Ubuntu repositories and verified Snap publishers.
- Treat PPAs and random install scripts as supply-chain risk.
- For extensions/themes/icons, prefer maintained upstream stores and known package repositories; verify compatibility with current shell/desktop version.

### UI, themes, extensions, and plugins

Cover:

- GNOME Shell extensions, Extension Manager, Tweaks, dconf/gsettings, Yaru themes, icons, cursors.
- KDE Plasma widgets, KWin scripts, global themes, panel layouts, System Settings, `kreadconfig5/kwriteconfig5` or Plasma 6 equivalents when verified.
- Xfce panel plugins, Whisker Menu, panel profiles, xfconf.
- Cinnamon spices/applets/extensions, MATE panel applets, Budgie applets, LXQt panels.
- Accessibility: screen reader, high contrast, scaling, keyboard navigation, input methods, font scaling.

Extension/plugin rule: before disabling or installing extensions, collect version compatibility and current extension state. For GNOME, shell extensions can break after shell upgrades; isolate by disabling user extensions first, not by deleting them.

### Security and hardening

Cover desktop-safe security:

- Ubuntu security updates, unattended upgrades, reboot-required state.
- AppArmor status and desktop app confinement.
- Firewall/UFW state and default closed-port assumptions.
- Full disk encryption, recovery keys, TPM/Secure Boot interactions.
- Snap confinement and classic confinement review.
- Browser security, password managers, SSH agent/keyring, GNOME Keyring/KWallet.
- Bluetooth/Wi-Fi exposure, printer sharing, screen sharing/remote desktop risk.
- Ubuntu Pro Desktop, Livepatch, CVE/USN review.

Do not reduce desktop security to fix convenience issues. Never suggest disabling AppArmor, Secure Boot, firewall, sandboxing, or signature checks without a bounded diagnostic reason and rollback.

## Evidence-first detection

Run only the relevant subset. Keep output bounded.

### Base system

```bash
printf '== os ==\n'; cat /etc/os-release 2>/dev/null | sed -n '1,20p'
printf '== kernel ==\n'; uname -a; cat /proc/version_signature 2>/dev/null || true
printf '== support ==\n'; ubuntu-security-status 2>/dev/null || pro status 2>/dev/null || true
printf '== boot ==\n'; systemd-analyze --no-pager 2>/dev/null || true
printf '== packages ==\n'; apt-cache policy ubuntu-desktop kubuntu-desktop xubuntu-desktop lubuntu-desktop ubuntu-mate-desktop cinnamon-desktop-environment 2>/dev/null | sed -n '1,160p'
```

### Session and display stack

```bash
printf '== sessions ==\n'; loginctl list-sessions --no-legend 2>/dev/null || true
printf '== current session ==\n'; loginctl show-session "${XDG_SESSION_ID:-self}" -p Type -p Desktop -p Display -p Remote -p State 2>/dev/null || true
printf '== env ==\n'; printf 'XDG_SESSION_TYPE=%s\nXDG_CURRENT_DESKTOP=%s\nDESKTOP_SESSION=%s\nWAYLAND_DISPLAY=%s\nDISPLAY=%s\n' "$XDG_SESSION_TYPE" "$XDG_CURRENT_DESKTOP" "$DESKTOP_SESSION" "$WAYLAND_DISPLAY" "$DISPLAY"
printf '== installed sessions ==\n'; find /usr/share/xsessions /usr/share/wayland-sessions -maxdepth 1 -type f -name '*.desktop' -print 2>/dev/null | sort
printf '== display managers ==\n'; systemctl status gdm gdm3 sddm lightdm lxdm --no-pager 2>/dev/null | sed -n '1,180p'
```

### Logs

```bash
journalctl -b -p warning..alert --no-pager -n 200
journalctl -b -u gdm -u gdm3 -u sddm -u lightdm --no-pager -n 200 2>/dev/null
journalctl -b _COMM=gnome-shell _COMM=plasmashell _COMM=kwin_wayland _COMM=kwin_x11 _COMM=xfce4-session --no-pager -n 200 2>/dev/null
```

### Graphics, audio, input, and firmware

```bash
printf '== gpu ==\n'; lspci -nnk | grep -EA4 'VGA|3D|Display' || true
printf '== renderer ==\n'; glxinfo -B 2>/dev/null | sed -n '1,80p' || vulkaninfo --summary 2>/dev/null | sed -n '1,80p' || true
printf '== drivers ==\n'; ubuntu-drivers devices 2>/dev/null | sed -n '1,160p' || true
printf '== audio ==\n'; systemctl --user status pipewire wireplumber pipewire-pulse --no-pager 2>/dev/null | sed -n '1,160p'
printf '== bluetooth/network/printers ==\n'; systemctl status bluetooth NetworkManager cups --no-pager 2>/dev/null | sed -n '1,180p'
printf '== firmware ==\n'; fwupdmgr get-devices 2>/dev/null | sed -n '1,160p' || true
```

### Extensions and UI settings

GNOME:

```bash
gnome-shell --version 2>/dev/null || true
gnome-extensions list --enabled 2>/dev/null | sed -n '1,120p'
gsettings get org.gnome.shell enabled-extensions 2>/dev/null || true
dconf dump /org/gnome/shell/ 2>/dev/null | sed -n '1,160p'
```

KDE Plasma:

```bash
plasmashell --version 2>/dev/null || true
kwin_wayland --version 2>/dev/null || kwin_x11 --version 2>/dev/null || true
kreadconfig5 --file kdeglobals --group KDE --key SingleClick 2>/dev/null || true
```

Xfce:

```bash
xfce4-session --version 2>/dev/null || true
xfconf-query -c xfce4-panel -lv 2>/dev/null | sed -n '1,160p'
xfconf-query -c xfwm4 -lv 2>/dev/null | sed -n '1,160p'
```

## Common diagnostic routes

### Login loop or black screen

1. Identify display manager and session type.
2. Check greeter and shell logs.
3. Check disk full/inodes, user ownership of `$HOME`, broken `.Xauthority`/`.ICEauthority`, bad shell, locked account.
4. Disable user extensions temporarily where appropriate.
5. Test alternate session only after preserving the existing session choice.

Safe first commands:

```bash
df -h; df -ih
getent passwd "$USER"; id "$USER"
find "$HOME" -maxdepth 1 \( -name .Xauthority -o -name .ICEauthority -o -name .xsession-errors \) -ls 2>/dev/null
journalctl -b -p err --no-pager -n 120
```

### GNOME shell crash or extension breakage

1. Record GNOME Shell version and enabled extensions.
2. Start by disabling extensions for test, not deleting them.
3. Re-enable one by one.
4. Verify extension compatibility with current GNOME Shell version.

```bash
gnome-shell --version
gnome-extensions list --enabled
mkdir -p "$HOME/.backup-gnome-extensions-$(date +%Y%m%d-%H%M%S)"
gsettings get org.gnome.shell enabled-extensions > "$HOME/.backup-gnome-extensions-$(date +%Y%m%d-%H%M%S)/enabled-extensions.txt"
```

### KDE Plasma panel/widget corruption

1. Confirm Plasma version and session type.
2. Backup KDE config files before resetting any layout.
3. Prefer creating a new test user before deleting user configs.

Back up first:

```bash
ts=$(date +%Y%m%d-%H%M%S)
mkdir -p "$HOME/kde-config-backup-$ts"
cp -a "$HOME/.config/plasma-org.kde.plasma.desktop-appletsrc" "$HOME/.config/kwinrc" "$HOME/.config/kdeglobals" "$HOME/kde-config-backup-$ts/" 2>/dev/null || true
```

### Xfce panel/plugin issue

1. Record Xfce version and panel plugin list.
2. Export/backup panel settings before reset.
3. Use panel profile tools when available.

```bash
xfce4-panel --version 2>/dev/null || true
xfconf-query -c xfce4-panel -lv | sed -n '1,200p'
mkdir -p "$HOME/xfce-backup-$(date +%Y%m%d-%H%M%S)"
xfconf-query -c xfce4-panel -lv > "$HOME/xfce-backup-$(date +%Y%m%d-%H%M%S)/xfce4-panel.txt" 2>/dev/null || true
```

### Graphics driver or kernel update broke desktop

1. Keep at least one known-good kernel installed.
2. Identify active kernel, GPU, driver, Secure Boot state, and DKMS status.
3. Check GRUB recovery option before changes.
4. Prefer Ubuntu-supported drivers from `ubuntu-drivers` and official repos.

```bash
uname -r
mokutil --sb-state 2>/dev/null || true
dkms status 2>/dev/null || true
apt list --installed 'linux-image*' 'nvidia*' 'mesa*' 2>/dev/null | sed -n '1,200p'
ubuntu-drivers devices 2>/dev/null | sed -n '1,160p'
```

## Safe remediation principles

- For UI changes, back up user config first and prefer per-user changes over system-wide changes.
- For display manager changes, preserve remote access and console access; warn that restarting GDM/SDDM/LightDM logs out graphical users.
- For kernel/driver changes, keep rollback kernel and document GRUB path.
- For release upgrades, disable or audit third-party PPAs first, back up user data, and confirm disk space.
- For security changes, do not disable AppArmor/Secure Boot/firewall/sandboxing unless a narrow test requires it and rollback is defined.
- For low-end hardware, recommend lighter official flavors such as Lubuntu/Xubuntu/MATE only after checking RAM, GPU, disk, and workload needs.

## Backup and disaster plan

Before desktop-wide changes:

```bash
ts=$(date +%Y%m%d-%H%M%S)
mkdir -p "$HOME/ubuntu-desktop-backup-$ts"
cp -a "$HOME/.config" "$HOME/.local/share/applications" "$HOME/.profile" "$HOME/.xsessionrc" "$HOME/.xsession" "$HOME/ubuntu-desktop-backup-$ts/" 2>/dev/null || true
sudo cp -a /etc/gdm3 /etc/sddm.conf.d /etc/lightdm /etc/default/grub /etc/X11 "$HOME/ubuntu-desktop-backup-$ts/system-etc" 2>/dev/null || true
apt-mark showmanual > "$HOME/ubuntu-desktop-backup-$ts/apt-manual.txt"
dpkg -l > "$HOME/ubuntu-desktop-backup-$ts/dpkg-list.txt"
```

For high-risk work, also require:

- Tested TTY login or SSH fallback.
- Recovery media or cloud console access.
- Known-good kernel retained.
- Display manager rollback command documented.
- User data backup verified before release upgrade, filesystem encryption work, partitioning, driver replacement, or kernel replacement.

## Rollback patterns

Package rollback:

```bash
sudo apt install <previous-package-version>
sudo apt-mark hold <package>
```

Kernel rollback:

```text
Reboot -> GRUB -> Advanced options for Ubuntu -> choose previous known-good kernel.
After boot, investigate before removing the bad kernel.
```

Display manager rollback:

```bash
sudo dpkg-reconfigure gdm3  # or sddm/lightdm, only when installed and intended
sudo systemctl restart display-manager
```

User config rollback:

```bash
cp -a "$HOME/ubuntu-desktop-backup-<timestamp>/.config" "$HOME/"
```

## Final answer format

Use this compact structure unless the user asks otherwise:

```markdown
## Issue class
Ubuntu Desktop / <desktop environment> / <display stack> / <hardware or security domain>

## Safety level
Read-only / low-risk / disruptive, with reason.

## Security/facts check
Installed release, support state, session type, display manager, kernel, driver, extension/plugin risk, remote access risk.

## Architecture fit
Best-fit desktop/session/kernel/source choice; note over-implementation or under-implementation.

## Run these first
<bounded commands>

## How to interpret results
<short branch logic>

## Backup/disaster plan
<what to preserve first>

## Safe remediation path
<minimal fix after evidence>

## Rollback / guarded rollback
<exact rollback or restore path>

## Validation
<commands or GUI checks>

## Final architecture audit
<short audit>

## Token-saving note
<which small output to send next>
```

## Daily exploration checklist

When this skill is reviewed by the Linux Skill Watch automation, check for changes in:

- Ubuntu Desktop latest release, LTS support windows, upgrade policy, installer changes.
- Official flavor release notes and flavor support policies.
- GNOME/KDE/Xfce/MATE/Cinnamon/LXQt/Budgie/UKUI/Unity desktop releases and compatibility notes.
- Ubuntu kernel lifecycle, HWE/OEM kernel changes, NVIDIA/AMD/Intel driver changes, Mesa/Vulkan changes.
- Security features: AppArmor, Livepatch, Ubuntu Pro Desktop, unattended-upgrades, CVEs/USNs, Secure Boot, encryption, sandboxing.
- Extension/plugin breakages after shell/desktop upgrades.
- Common current community issues on Ask Ubuntu, Ubuntu Discourse, Launchpad, official flavor forums, and upstream issue trackers.

Update this skill only when findings are verified, safe, and broadly useful.

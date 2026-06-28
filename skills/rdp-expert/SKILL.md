---
name: rdp-expert
description: Linux RDP and XRDP expert for GNOME, KDE Plasma, XFCE, MATE, Cinnamon, LXQt, Xorg/Wayland session issues, Rocky Linux 10 GNOME Remote Desktop/RDP changes, xrdp/xorgxrdp, PAM/auth, Polkit, clipboard, drive redirection, audio, firewall, black screen, reconnect, and multi-user remote desktop troubleshooting.
argument-hint: "[xrdp|rdp|gnome|kde|xfce|rocky-10|black-screen|login|clipboard|audio|wayland|xorg] [symptom]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# RDP Expert

Use this skill for Linux Remote Desktop Protocol setups, especially `xrdp`, `xrdp-sesman`, `xorgxrdp`, and GNOME Remote Desktop/RDP across GNOME, KDE Plasma, XFCE, MATE, Cinnamon, LXQt, and other desktop environments.

Use this skill when the issue involves RDP login failures, black screen after login, disconnected sessions, desktop session selection, Wayland/Xorg mismatch, PAM authentication, Polkit prompts, clipboard, drive redirection, sound redirection, TLS/certificate issues, firewall rules, installer remote graphical access, or multiple users sharing the same server.

## Safety boundary

Default to read-only checks. Do not restart `xrdp`, `xrdp-sesman`, `gnome-remote-desktop`, display managers, or desktop services until active users and rollback impact are known. Do not disable firewall, SELinux, AppArmor, PAM, or Polkit globally to make RDP work. Prefer narrow fixes and preserve original config files before editing.

Never suggest exposing RDP directly to the public internet without VPN, allowlist, reverse proxy gateway, or strong access control. Treat TCP/3389 as high-risk when internet-facing.

## Rocky Linux 10 special handling

Rocky Linux 10 is not the same as Rocky 9 for remote desktop troubleshooting:

- Anaconda graphical remote install access uses RDP instead of VNC.
- Wayland replaces the X.Org Server; Xwayland remains for many X11 clients.
- TigerVNC server is removed from Rocky Linux 10.
- GNOME Remote Desktop using RDP replaces TigerVNC for desktop sharing, remote login, and headless sessions.
- PipeWire is the desktop audio stack; do not assume a PulseAudio daemon.
- x86_64 hosts require x86-64-v3 CPU compatibility, which matters when troubleshooting install failures on older hardware.

Decision rule: on Rocky Linux 10 GNOME systems, check `gnome-remote-desktop` first for supported RDP workflows. Use XRDP only when the user explicitly installed it or requires non-GNOME/XRDP behavior, and verify whether an Xorg backend is actually available before giving old `xorgxrdp` fixes.

Rocky Linux 10 reference file: `${CLAUDE_SKILL_DIR}/../../docs/skill-improvement/rocky-linux-10-notes.md`

## Object model

```text
RDP client -> network/firewall -> RDP service -> session manager -> PAM/auth -> display server/session -> desktop environment -> user profile
```

XRDP path:

```text
RDP client -> xrdp daemon -> xrdp-sesman -> PAM/auth -> Xorg/Xvnc/session -> desktop environment -> user profile
```

GNOME Remote Desktop path:

```text
RDP client -> gnome-remote-desktop -> GNOME session/headless session -> Wayland/PipeWire/Polkit/user profile
```

Common Linux RDP components:

- `xrdp`: RDP listener, usually TCP/3389
- `xrdp-sesman`: session manager and authentication handoff
- `xorgxrdp`: Xorg backend for XRDP sessions where available
- `Xvnc`: alternate VNC-backed session mode on older distributions
- `gnome-remote-desktop`: GNOME built-in RDP server for sharing/remote login/headless workflows
- desktop session: GNOME, KDE Plasma, XFCE, MATE, Cinnamon, LXQt
- display manager: GDM, SDDM, LightDM
- auth stack: PAM, local users, LDAP/SSSD, sudo/polkit prompts
- extras: clipboard, file redirection, audio via PipeWire/PulseAudio compatibility layers

## Evidence first

```bash
cat /etc/os-release
uname -r
systemctl status xrdp xrdp-sesman gnome-remote-desktop gdm gdm3 sddm lightdm --no-pager 2>/dev/null
journalctl -u xrdp -u xrdp-sesman -u gnome-remote-desktop -u gdm -u gdm3 -u sddm -u lightdm --no-pager -n 200
ss -tulpen | grep -E ':(3389)\b'
loginctl list-sessions
loginctl show-user "$USER" 2>/dev/null | sed -n '1,120p'
```

Config, packages, and logs:

```bash
rpm -qa 2>/dev/null | grep -Ei 'xrdp|xorgxrdp|gnome-remote-desktop|pipewire|pulseaudio|wayland|xwayland|tigervnc|gdm|sddm|lightdm' || true
ls -l /etc/xrdp/ 2>/dev/null
sed -n '1,220p' /etc/xrdp/xrdp.ini 2>/dev/null
sed -n '1,220p' /etc/xrdp/sesman.ini 2>/dev/null
tail -n 200 /var/log/xrdp.log /var/log/xrdp-sesman.log 2>/dev/null
```

Desktop/session checks:

```bash
ls -1 /usr/share/xsessions /usr/share/wayland-sessions 2>/dev/null
echo "XDG_SESSION_TYPE=$XDG_SESSION_TYPE"
echo "DESKTOP_SESSION=$DESKTOP_SESSION"
command -v startxfce4 gnome-session startplasma-x11 startplasma-wayland mate-session cinnamon-session startlxqt 2>/dev/null
```

Auth and policy checks:

```bash
grep -R "pam_" /etc/pam.d/xrdp-sesman /etc/pam.d/xrdp /etc/pam.d/gdm-password 2>/dev/null
getent passwd "$USER"
id "$USER"
faillock --user "$USER" 2>/dev/null || true
```

Firewall checks:

```bash
nft list ruleset 2>/dev/null | sed -n '1,220p' || iptables-save 2>/dev/null | sed -n '1,220p'
firewall-cmd --list-all 2>/dev/null || true
ufw status verbose 2>/dev/null || true
```

## Desktop environment guidance

### GNOME

GNOME commonly uses Wayland on modern enterprise Linux. On Rocky Linux 10, prefer GNOME Remote Desktop/RDP for GNOME workflows before forcing XRDP/Xorg paths.

Checks:

```bash
rpm -qa | grep -Ei 'gnome-remote-desktop|gnome-shell|gdm|pipewire|xwayland'
systemctl status gdm gdm3 gnome-remote-desktop --no-pager 2>/dev/null
loginctl list-sessions
```

Patterns:

- black screen after login: Wayland/GNOME session mismatch, DBus/session bus issue, stale user session, unsupported XRDP backend
- immediate disconnect: missing `xorgxrdp`, bad `startwm.sh`, PAM failure, unsupported Xorg assumptions on Rocky 10
- local console conflict: same user already logged into GNOME locally
- Rocky 10 remote desktop issue: GNOME Remote Desktop service/settings may be the supported path instead of TigerVNC/XRDP

Safer direction:

- Rocky 10 GNOME: evaluate GNOME Remote Desktop/RDP first.
- Rocky 8/9 or non-GNOME desktops: XRDP with XFCE/KDE/MATE may still be valid.
- Avoid globally disabling Wayland unless the user accepts desktop-wide impact.
- Consider XFCE for server-grade XRDP stability where packages are available.

### KDE Plasma

KDE over XRDP generally works better with X11 than Wayland, but Rocky Linux 10 availability and packaging must be verified first.

Checks:

```bash
command -v startplasma-x11 startplasma-wayland 2>/dev/null
ls /usr/share/xsessions /usr/share/wayland-sessions 2>/dev/null | grep -Ei 'plasma|kde'
```

Patterns:

- black screen: wrong session command, missing `dbus-x11`, broken `.xsession`, unavailable Xorg backend
- reconnect failure: stale session under `xrdp-sesman`
- policy prompts: Polkit agent not starting in remote session

### XFCE

XFCE is usually the safest and lightest desktop for classic XRDP servers, but on Rocky Linux 10 verify repository availability before recommending install commands.

Checks:

```bash
command -v startxfce4
ls /usr/share/xsessions | grep -i xfce
```

Typical user session file:

```bash
cat ~/.xsession 2>/dev/null
```

Expected command:

```text
startxfce4
```

### MATE / Cinnamon / LXQt

Use these when installed and available in `/usr/share/xsessions`.

Common commands:

```text
mate-session
cinnamon-session
startlxqt
```

## Failure patterns

### RDP port unreachable

Likely domains:

- RDP service not running
- TCP/3389 not listening
- firewall/security group blocked
- service bound to wrong address
- upstream NAT/load balancer missing port mapping

First checks:

```bash
systemctl status xrdp gnome-remote-desktop --no-pager 2>/dev/null
ss -tulpen | grep ':3389'
```

### Login fails before desktop

Likely domains:

- wrong username/password
- locked account or expired password
- PAM stack issue
- SSSD/LDAP unreachable
- user shell invalid
- home directory missing or wrong permissions

First checks:

```bash
id username
getent passwd username
passwd -S username 2>/dev/null || chage -l username 2>/dev/null
journalctl -u xrdp-sesman -u gnome-remote-desktop --no-pager -n 200
```

### Black screen after login

Likely domains:

- desktop command not starting
- Wayland/Xorg mismatch
- missing or unsupported `xorgxrdp`
- broken `~/.xsession`, `~/.xinitrc`, or `/etc/xrdp/startwm.sh`
- stale local GUI session for same user
- DBus/session bus failure
- permissions issue in home directory
- Rocky Linux 10: old TigerVNC/Xorg assumptions used on a Wayland/RDP desktop stack

First checks:

```bash
cat ~/.xsession ~/.xinitrc 2>/dev/null
sed -n '1,220p' /etc/xrdp/startwm.sh 2>/dev/null
journalctl -u xrdp-sesman -u gnome-remote-desktop --no-pager -n 200
loginctl list-sessions
```

### Immediate disconnect

Likely domains:

- missing backend package such as `xorgxrdp`
- session command exits immediately
- PAM allows auth but session open fails
- `.Xauthority` or home permission issue
- Xorg module problem
- Rocky Linux 10: selected backend is not present because the desktop stack is Wayland/RDP-first

### Clipboard not working

Likely domains:

- XRDP channel disabled
- client disabled clipboard redirection
- desktop session missing clipboard service
- Wayland session limitation
- GNOME Remote Desktop settings/policy mismatch

Check relevant channels in `/etc/xrdp/xrdp.ini` for XRDP and confirm client-side redirection. For GNOME Remote Desktop, check GNOME settings and `gnome-remote-desktop` logs.

### Audio not working

Likely domains:

- PipeWire/PulseAudio compatibility module missing
- distro package not installed
- user session lacks audio service
- client redirection disabled

Do not blindly replace PipeWire/PulseAudio stack. Identify distro and desktop first. On Rocky Linux 10, assume PipeWire first.

### Multiple users conflict

Likely domains:

- same user logged in locally and remotely
- stale sessions in `loginctl`
- policy restrictions for multiple graphical sessions
- shared home/profile lock files

Prefer one Linux account per human user for RDP.

## Safe fix strategy

1. Identify distro, version, desktop environment, and display manager.
2. If Rocky Linux 10, decide whether the target path is GNOME Remote Desktop/RDP, Anaconda RDP, or third-party XRDP.
3. Confirm RDP listener and firewall path.
4. Read service logs.
5. Confirm session backend: Wayland/GNOME Remote Desktop, Xorg/XRDP, or Xvnc on older distributions.
6. Confirm desktop session command.
7. Test with a clean non-root user.
8. Apply the smallest fix.
9. Restart only the affected service after impact check.
10. Validate login, reconnect, clipboard, audio, and logout.

## Common safe session selection examples

XFCE user session:

```bash
printf 'startxfce4\n' > ~/.xsession
chmod 0644 ~/.xsession
```

KDE Plasma X11 user session:

```bash
printf 'startplasma-x11\n' > ~/.xsession
chmod 0644 ~/.xsession
```

MATE user session:

```bash
printf 'mate-session\n' > ~/.xsession
chmod 0644 ~/.xsession
```

These are user-level examples. Do not overwrite global `/etc/xrdp/startwm.sh` without backup and impact review. On Rocky Linux 10, verify that the selected X11 session exists before using these examples.

## Security baseline

- Prefer VPN or bastion access for RDP.
- Restrict TCP/3389 by source IP when possible.
- Use strong passwords or centralized identity with MFA outside the RDP host.
- Disable root GUI login.
- Monitor failed logins.
- Avoid shared admin desktop accounts.
- Keep desktop packages and RDP components patched.

## Output format

```text
RDP stack:
Distro/version:
Rocky 10 path check:
Desktop/session:
Display server:
Listener/firewall status:
Auth/PAM status:
Observed error:
Likely failure domain:
Evidence:
Recommended fix:
Rollback:
Validation:
Security note:
```

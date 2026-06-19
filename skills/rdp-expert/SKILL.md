---
name: rdp-expert
description: Linux RDP and XRDP expert for GNOME, KDE Plasma, XFCE, MATE, Cinnamon, LXQt, Xorg/Wayland session issues, xrdp/xorgxrdp, PAM/auth, Polkit, clipboard, drive redirection, audio, firewall, black screen, reconnect, and multi-user remote desktop troubleshooting.
argument-hint: "[xrdp|rdp|gnome|kde|xfce|black-screen|login|clipboard|audio|wayland|xorg] [symptom]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# RDP Expert

Use this skill for Linux Remote Desktop Protocol setups, especially `xrdp` and `xorgxrdp`, across GNOME, KDE Plasma, XFCE, MATE, Cinnamon, LXQt, and other desktop environments.

Use this skill when the issue involves RDP login failures, black screen after login, disconnected sessions, desktop session selection, Wayland/Xorg mismatch, PAM authentication, Polkit prompts, clipboard, drive redirection, sound redirection, TLS/certificate issues, firewall rules, or multiple users sharing the same server.

## Safety boundary

Default to read-only checks. Do not restart `xrdp`, `xrdp-sesman`, display managers, or desktop services until active users and rollback impact are known. Do not disable firewall, SELinux, AppArmor, PAM, or Polkit globally to make RDP work. Prefer narrow fixes and preserve original config files before editing.

Never suggest exposing RDP directly to the public internet without VPN, allowlist, reverse proxy gateway, or strong access control. Treat TCP/3389 as high-risk when internet-facing.

## Object model

```text
RDP client -> network/firewall -> xrdp daemon -> xrdp-sesman -> PAM/auth -> Xorg/Xvnc/session -> desktop environment -> user profile
```

Common Linux RDP components:

- `xrdp`: RDP listener, usually TCP/3389
- `xrdp-sesman`: session manager and authentication handoff
- `xorgxrdp`: Xorg backend for XRDP sessions
- `Xvnc`: alternate VNC-backed session mode
- desktop session: GNOME, KDE Plasma, XFCE, MATE, Cinnamon, LXQt
- display manager: GDM, SDDM, LightDM
- auth stack: PAM, local users, LDAP/SSSD, sudo/polkit prompts
- extras: clipboard, file redirection, audio via PulseAudio/PipeWire modules

## Evidence first

```bash
systemctl status xrdp xrdp-sesman --no-pager
journalctl -u xrdp -u xrdp-sesman --no-pager -n 200
ss -tulpen | grep -E ':(3389)\b'
loginctl list-sessions
loginctl show-user "$USER" 2>/dev/null | sed -n '1,120p'
```

Config and logs:

```bash
ls -l /etc/xrdp/
sed -n '1,220p' /etc/xrdp/xrdp.ini
sed -n '1,220p' /etc/xrdp/sesman.ini
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
grep -R "pam_" /etc/pam.d/xrdp-sesman /etc/pam.d/xrdp 2>/dev/null
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

GNOME commonly defaults to Wayland on many distributions. XRDP is usually more reliable with an Xorg session.

Checks:

```bash
ls /usr/share/xsessions | grep -i gnome
systemctl status gdm gdm3 --no-pager 2>/dev/null
```

Patterns:

- black screen after login: Wayland/GNOME session mismatch, DBus/session bus issue, stale user session
- immediate disconnect: missing `xorgxrdp`, bad `startwm.sh`, PAM failure
- local console conflict: same user already logged into GNOME locally

Safer direction:

- prefer GNOME on Xorg for XRDP
- avoid forcing global Wayland disable unless the impact is accepted
- consider XFCE for server-grade RDP stability

### KDE Plasma

KDE over XRDP generally works better with X11 than Wayland.

Checks:

```bash
command -v startplasma-x11 startplasma-wayland 2>/dev/null
ls /usr/share/xsessions | grep -Ei 'plasma|kde'
```

Patterns:

- black screen: wrong session command, missing `dbus-x11`, broken `.xsession`
- reconnect failure: stale session under `xrdp-sesman`
- policy prompts: Polkit agent not starting in remote session

### XFCE

XFCE is usually the safest and lightest desktop for Linux RDP servers.

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

- `xrdp` not running
- TCP/3389 not listening
- firewall/security group blocked
- service bound to wrong address
- upstream NAT/load balancer missing port mapping

First checks:

```bash
systemctl status xrdp --no-pager
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
journalctl -u xrdp-sesman --no-pager -n 200
```

### Black screen after login

Likely domains:

- desktop command not starting
- Wayland/Xorg mismatch
- missing `xorgxrdp`
- broken `~/.xsession`, `~/.xinitrc`, or `/etc/xrdp/startwm.sh`
- stale local GUI session for same user
- DBus/session bus failure
- permissions issue in home directory

First checks:

```bash
cat ~/.xsession ~/.xinitrc 2>/dev/null
sed -n '1,220p' /etc/xrdp/startwm.sh
journalctl -u xrdp-sesman --no-pager -n 200
loginctl list-sessions
```

### Immediate disconnect

Likely domains:

- missing backend package such as `xorgxrdp`
- session command exits immediately
- PAM allows auth but session open fails
- `.Xauthority` or home permission issue
- Xorg module problem

### Clipboard not working

Likely domains:

- XRDP channel disabled
- client disabled clipboard redirection
- desktop session missing clipboard service
- Wayland session limitation

Check relevant channels in `/etc/xrdp/xrdp.ini` and confirm client-side redirection.

### Audio not working

Likely domains:

- PulseAudio/PipeWire module missing
- distro package not installed
- user session lacks audio service
- client redirection disabled

Do not blindly replace PipeWire/PulseAudio stack. Identify distro and desktop first.

### Multiple users conflict

Likely domains:

- same user logged in locally and remotely
- stale sessions in `loginctl`
- policy restrictions for multiple graphical sessions
- shared home/profile lock files

Prefer one Linux account per human user for RDP.

## Safe fix strategy

1. Identify distro, desktop environment, and display manager.
2. Confirm RDP listener and firewall path.
3. Read `xrdp` and `xrdp-sesman` logs.
4. Confirm session backend: Xorg/Xvnc and package presence.
5. Confirm desktop session command.
6. Test with a clean non-root user.
7. Apply the smallest fix.
8. Restart only the affected service after impact check.
9. Validate login, reconnect, clipboard, audio, and logout.

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

These are user-level examples. Do not overwrite global `/etc/xrdp/startwm.sh` without backup and impact review.

## Security baseline

- Prefer VPN or bastion access for RDP.
- Restrict TCP/3389 by source IP when possible.
- Use strong passwords or centralized identity with MFA outside the RDP host.
- Disable root GUI login.
- Monitor failed logins.
- Avoid shared admin desktop accounts.
- Keep desktop packages and `xrdp` patched.

## Output format

```text
RDP stack:
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

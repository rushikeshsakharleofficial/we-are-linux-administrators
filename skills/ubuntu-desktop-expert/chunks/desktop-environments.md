# Ubuntu Desktop environments chunk

Use this chunk for GNOME, KDE Plasma/Kubuntu, Xfce/Xubuntu, MATE, Cinnamon, LXQt/Lubuntu, Budgie, UKUI/Kylin, Unity, Ubuntu Studio, Edubuntu, and non-default installed desktop sessions.

## Official flavor map

| Ubuntu family | Desktop focus | Typical session components |
|---|---|---|
| Ubuntu Desktop / Edubuntu | GNOME | `gnome-shell`, Mutter, GDM, Wayland/Xorg, GNOME Settings, extensions |
| Kubuntu / Ubuntu Studio | KDE Plasma | Plasma Shell, KWin, SDDM, Discover, KDE Connect, Wayland/X11 |
| Xubuntu | Xfce | `xfce4-session`, `xfwm4`, `xfce4-panel`, Thunar, LightDM |
| Ubuntu MATE | MATE | `mate-session`, Marco/Compiz, MATE Tweak, LightDM |
| Ubuntu Cinnamon | Cinnamon | `cinnamon-session`, Muffin, Nemo, Cinnamon spices/applets/extensions |
| Lubuntu | LXQt | `lxqt-session`, panel, PCManFM-Qt, SDDM, Qt stack |
| Ubuntu Budgie | Budgie | Budgie Desktop, Raven, Budgie applets, gnome-settings-daemon integration |
| Ubuntu Kylin | UKUI | UKUI desktop, Kylin apps, Chinese-localized UX |
| Ubuntu Unity | Unity | Unity 7, Compiz, HUD, global menu, LightDM |

## Detect installed desktop sessions

```bash
printf '== current desktop ==\n'; printf 'XDG_CURRENT_DESKTOP=%s\nDESKTOP_SESSION=%s\nXDG_SESSION_TYPE=%s\n' "$XDG_CURRENT_DESKTOP" "$DESKTOP_SESSION" "$XDG_SESSION_TYPE"
printf '== installed sessions ==\n'; find /usr/share/xsessions /usr/share/wayland-sessions -maxdepth 1 -type f -name '*.desktop' -print 2>/dev/null | sort
printf '== metapackages ==\n'; apt-cache policy ubuntu-desktop kubuntu-desktop xubuntu-desktop lubuntu-desktop ubuntu-mate-desktop ubuntustudio-desktop ubuntu-budgie-desktop ubuntu-cinnamon-desktop ubuntu-unity-desktop 2>/dev/null | sed -n '1,220p'
```

## Fit guidance

- GNOME: best for default Ubuntu support, modern Wayland, corporate desktop, extensions with compatibility checks.
- KDE Plasma: best for high customization, multi-monitor workflows, Discover/KDE app integration.
- Xfce/LXQt/MATE: best for low-end laptops, older GPUs, remote desktop friendliness, and lower RAM use.
- Cinnamon/Budgie/Unity: best when user wants a traditional or specific workflow; verify release support and package freshness.
- Ubuntu Studio: treat as Plasma plus audio/video/graphics production tooling; avoid generic audio changes without checking JACK/PipeWire workflow.

## Switching desktop environments

Do not install many full desktop metapackages blindly. It can create theme, display-manager, duplicate app, and login-session confusion.

Safer pattern:

1. Check RAM/GPU/storage and why the user wants to switch.
2. Prefer a live USB test for major desktop changes.
3. If installing, install one desktop metapackage at a time.
4. Record current display manager before changing it.
5. Keep the old session available until the new one is validated.

## Validation

```bash
loginctl list-sessions --no-legend 2>/dev/null || true
loginctl show-session "${XDG_SESSION_ID:-self}" -p Type -p Desktop -p Display -p Remote -p State 2>/dev/null || true
systemctl status display-manager --no-pager 2>/dev/null | sed -n '1,80p'
```

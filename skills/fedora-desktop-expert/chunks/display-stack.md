# Fedora display stack

Use for Wayland, Xorg/X11, Xwayland, display managers, login loops, black screens, greeter issues, scaling, multi-monitor behavior, and compositor/session problems.

## Components

- Display managers: GDM, SDDM, LightDM where installed.
- Sessions: Wayland, Xorg/X11, Xwayland compatibility.
- Compositors/window managers: Mutter, KWin, xfwm4, Muffin, Marco, Sway, i3, COSMIC, Miracle.

## Evidence

```bash
loginctl list-sessions --no-legend 2>/dev/null || true
loginctl show-session "${XDG_SESSION_ID:-self}" -p Type -p Desktop -p Display -p Remote -p State 2>/dev/null || true
printf 'XDG_SESSION_TYPE=%s\nXDG_CURRENT_DESKTOP=%s\nDESKTOP_SESSION=%s\nWAYLAND_DISPLAY=%s\nDISPLAY=%s\n' "$XDG_SESSION_TYPE" "$XDG_CURRENT_DESKTOP" "$DESKTOP_SESSION" "$WAYLAND_DISPLAY" "$DISPLAY"
find /usr/share/xsessions /usr/share/wayland-sessions -maxdepth 1 -type f -name '*.desktop' -print 2>/dev/null | sort
systemctl status display-manager gdm sddm lightdm --no-pager 2>/dev/null | sed -n '1,160p'
journalctl -b -p warning..alert --no-pager -n 160
```

## Safety

Do not swap display managers or force Wayland/Xorg changes until the failing layer is identified. Restarting the graphical display manager logs out desktop users.

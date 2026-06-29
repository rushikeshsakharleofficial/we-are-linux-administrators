# Ubuntu display stack chunk

Use this chunk for Wayland, Xorg/X11, Xwayland, login loops, black screens, frozen greeter, scaling, multi-monitor issues, color profiles, display managers, compositors, and session selection.

## Components

- Display managers: GDM/GDM3, SDDM, LightDM, LXDM.
- Display servers/session types: Wayland, Xorg/X11, Xwayland.
- Compositors/window managers: Mutter, KWin, xfwm4, Marco, Muffin, Openbox, Compiz, labwc, wlroots-based compositors.

## Safety rule

Never blindly disable Wayland or swap display managers. First prove the failing layer. Restarting `display-manager`, `gdm3`, `sddm`, or `lightdm` logs out graphical users.

## Evidence commands

```bash
printf '== sessions ==\n'; loginctl list-sessions --no-legend 2>/dev/null || true
printf '== current session ==\n'; loginctl show-session "${XDG_SESSION_ID:-self}" -p Type -p Desktop -p Display -p Remote -p State 2>/dev/null || true
printf '== env ==\n'; printf 'XDG_SESSION_TYPE=%s\nXDG_CURRENT_DESKTOP=%s\nDESKTOP_SESSION=%s\nWAYLAND_DISPLAY=%s\nDISPLAY=%s\n' "$XDG_SESSION_TYPE" "$XDG_CURRENT_DESKTOP" "$DESKTOP_SESSION" "$WAYLAND_DISPLAY" "$DISPLAY"
printf '== installed sessions ==\n'; find /usr/share/xsessions /usr/share/wayland-sessions -maxdepth 1 -type f -name '*.desktop' -print 2>/dev/null | sort
printf '== display managers ==\n'; systemctl status gdm gdm3 sddm lightdm lxdm --no-pager 2>/dev/null | sed -n '1,180p'
```

## Logs

```bash
journalctl -b -p warning..alert --no-pager -n 200
journalctl -b -u gdm -u gdm3 -u sddm -u lightdm --no-pager -n 200 2>/dev/null
journalctl -b _COMM=gnome-shell _COMM=plasmashell _COMM=kwin_wayland _COMM=kwin_x11 _COMM=xfce4-session --no-pager -n 200 2>/dev/null
```

## Login loop / black screen route

1. Identify display manager and session type.
2. Check greeter and shell logs.
3. Check disk full/inodes, user ownership of `$HOME`, broken `.Xauthority`/`.ICEauthority`, bad shell, locked account.
4. Disable user extensions temporarily where appropriate.
5. Test alternate session only after preserving the existing session choice.

```bash
df -h; df -ih
getent passwd "$USER"; id "$USER"
find "$HOME" -maxdepth 1 \( -name .Xauthority -o -name .ICEauthority -o -name .xsession-errors \) -ls 2>/dev/null
journalctl -b -p err --no-pager -n 120
```

## Rollback

Display manager rollback:

```bash
sudo dpkg-reconfigure gdm3  # or sddm/lightdm, only when installed and intended
sudo systemctl restart display-manager
```

If remote, require console access or active SSH session before restart.

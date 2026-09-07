# Fedora desktop flavors

Use for Fedora Workstation, KDE Plasma Edition, Spins, Labs, and Atomic Desktops.

## Universal Skill Execution Contract

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Verify the Fedora release, package/deployment model, active desktop/session, and current official Fedora flavor status before recommending a switch or install. Preserve a working login/recovery path, back up relevant user/session configuration before broad changes, make changes incrementally, and validate login, networking, display behavior, and the user's critical applications before removing the previous working desktop or deployment.

## Coverage

- Workstation: GNOME-focused Fedora desktop.
- KDE Plasma Edition: Plasma-focused Fedora desktop.
- Spins: Xfce, Cinnamon, MATE, LXQt, Budgie, Sway, i3, COSMIC, Miracle, and other official spin variants when current.
- Atomic Desktops: Silverblue, Kinoite, Sway Atomic, Budgie Atomic, COSMIC Atomic, and other image-based desktops when current.
- Labs: task-focused Fedora images such as design, astronomy, games, scientific, and security lab variants when current.

## Evidence

```bash
printf 'XDG_CURRENT_DESKTOP=%s\nDESKTOP_SESSION=%s\nXDG_SESSION_TYPE=%s\n' "$XDG_CURRENT_DESKTOP" "$DESKTOP_SESSION" "$XDG_SESSION_TYPE"
find /usr/share/xsessions /usr/share/wayland-sessions -maxdepth 1 -type f -name '*.desktop' -print 2>/dev/null | sort
rpm -qa | grep -Ei 'fedora-release|gnome-shell|plasma-desktop|xfce4-session|cinnamon|mate-session|lxqt|budgie|sway|i3|cosmic|miracle' | sort | sed -n '1,200p'
```

## Fit guidance

- GNOME/Workstation: default Fedora desktop and strongest baseline support.
- KDE Plasma Edition: best for heavy customization and Plasma workflows.
- Xfce/LXQt/MATE: useful for low-resource machines.
- Sway/i3/Miracle/COSMIC: verify user workflow and current support before recommending.
- Atomic Desktops: best when the user wants image-based updates and rollback-style OS management.

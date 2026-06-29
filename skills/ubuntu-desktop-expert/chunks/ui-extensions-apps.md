# Ubuntu UI, extensions, plugins, and apps chunk

Use this chunk for themes, icons, cursors, GNOME Shell extensions, KDE widgets, Xfce panel plugins, Cinnamon spices, MATE/Budgie/LXQt applets, default apps, MIME handlers, autostart, Snap/Flatpak/AppImage/deb/PPAs, fonts, codecs, input methods, and accessibility.

## Source trust rule

- Prefer Ubuntu repositories and verified Snap publishers.
- Treat PPAs, random curl-to-shell installers, and unmaintained themes/extensions as supply-chain risk.
- Verify extension/plugin compatibility with the current shell/desktop version before installing or enabling.

## GNOME extensions

```bash
gnome-shell --version 2>/dev/null || true
gnome-extensions list --enabled 2>/dev/null | sed -n '1,120p'
gsettings get org.gnome.shell enabled-extensions 2>/dev/null || true
dconf dump /org/gnome/shell/ 2>/dev/null | sed -n '1,160p'
```

GNOME rule: shell extensions can break after shell upgrades. Isolate by disabling user extensions first, not by deleting them.

Backup enabled extensions:

```bash
ts=$(date +%Y%m%d-%H%M%S)
mkdir -p "$HOME/.backup-gnome-extensions-$ts"
gsettings get org.gnome.shell enabled-extensions > "$HOME/.backup-gnome-extensions-$ts/enabled-extensions.txt"
```

## KDE Plasma widgets/layouts

```bash
plasmashell --version 2>/dev/null || true
kwin_wayland --version 2>/dev/null || kwin_x11 --version 2>/dev/null || true
mkdir -p "$HOME/kde-config-backup-$(date +%Y%m%d-%H%M%S)"
cp -a "$HOME/.config/plasma-org.kde.plasma.desktop-appletsrc" "$HOME/.config/kwinrc" "$HOME/.config/kdeglobals" "$HOME/kde-config-backup-$(date +%Y%m%d-%H%M%S)/" 2>/dev/null || true
```

## Xfce panel/plugins

```bash
xfce4-panel --version 2>/dev/null || true
xfconf-query -c xfce4-panel -lv 2>/dev/null | sed -n '1,200p'
xfconf-query -c xfwm4 -lv 2>/dev/null | sed -n '1,160p'
```

## Apps and package sources

```bash
printf '== snaps ==\n'; snap list 2>/dev/null | sed -n '1,160p'
printf '== flatpak ==\n'; flatpak list 2>/dev/null | sed -n '1,160p'
printf '== PPAs/sources ==\n'; find /etc/apt/sources.list /etc/apt/sources.list.d -type f -maxdepth 1 -print -exec sed -n '1,80p' {} \; 2>/dev/null
printf '== desktop files ==\n'; find "$HOME/.local/share/applications" /usr/share/applications -maxdepth 1 -name '*.desktop' 2>/dev/null | sed -n '1,160p'
```

## Safe reset rule

Prefer config backup and new-test-user comparison before deleting UI config. For panel/widget corruption, do not run broad `rm -rf ~/.config/*` fixes.

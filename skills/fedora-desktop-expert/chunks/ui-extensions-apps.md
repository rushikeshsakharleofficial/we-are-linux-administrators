# Fedora UI, extensions, widgets, and apps

Use for GNOME Shell extensions, KDE Plasma widgets, themes, icons, fonts, default applications, Flatpak apps, RPM packages, third-party repositories, autostart entries, MIME handlers, and accessibility.

## Evidence

```bash
gnome-shell --version 2>/dev/null || true
gnome-extensions list --enabled 2>/dev/null | sed -n '1,120p'
plasmashell --version 2>/dev/null || true
flatpak list 2>/dev/null | sed -n '1,160p'
rpm -qa | grep -Ei 'theme|icon|gnome-shell-extension|plasma|flatpak|firefox|chromium|thunderbird|libreoffice' | sort | sed -n '1,220p'
find "$HOME/.local/share/applications" /usr/share/applications -maxdepth 1 -name '*.desktop' 2>/dev/null | sed -n '1,160p'
```

## Source trust rule

Prefer Fedora repositories, Flathub when the user accepts Flatpak trust, and maintained upstream extension/widget stores. Treat random install scripts and unmaintained themes/extensions as supply-chain risk.

## Extension rule

Desktop extensions often break across shell upgrades. Capture enabled extensions first, then isolate by disabling or testing one at a time.

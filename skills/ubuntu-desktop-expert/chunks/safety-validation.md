# Ubuntu Desktop safety and validation chunk

Use this chunk for safe evidence gathering, backup planning, change validation, and recovery notes for Ubuntu Desktop work.

## Universal Skill Execution Contract

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Collect bounded facts before changes, preserve a working login or recovery path, back up only the configuration and data relevant to the planned change, define rollback before applying it, and use guarded recovery for display-manager, network, boot, kernel, driver, encryption, or remote-access changes that could lock out the operator. Validate the original workload and desktop login before closing the recovery path.

## Evidence checklist

Collect only bounded facts:

- Ubuntu release and support state.
- Kernel version and package source.
- Current desktop environment and session type.
- Active display manager.
- Recent boot and graphical-session errors.
- Installed desktop session files.
- Package-manager health.
- GPU, audio, Wi-Fi, Bluetooth, printer, and firmware state when relevant.

## Backup checklist

Before desktop-wide work, preserve:

- User desktop configuration.
- User launcher entries.
- Package manifest and manually installed package list.
- Display-manager configuration.
- Bootloader and kernel-related configuration when kernel or driver work is involved.
- X11 or session configuration when display-stack work is involved.

## High-risk requirements

For display-manager, kernel, GPU, release-upgrade, boot, encryption, or remote-access work, require:

- Tested local console or out-of-band access.
- Recovery media or cloud console access.
- Known-good kernel retained.
- Previous desktop/display-manager choice recorded.
- User data backup verified.

## Recovery notes

- User configuration: restore only the specific changed files from backup.
- Package changes: identify the previous known-good package version before applying a version-specific restore.
- Kernel changes: boot the previous known-good kernel from GRUB advanced options.
- Display-manager changes: return to the previous selection only after confirming local console access.

## Validation checklist

Validate that:

- Login succeeds.
- Correct session type is active.
- Panel or shell loads.
- Audio works.
- Wi-Fi, Bluetooth, and printer state are sane.
- Sleep/resume works when relevant.
- External monitor works when relevant.
- Browser and update manager open normally.
- No new critical boot or session errors are present.

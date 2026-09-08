# Ubuntu Desktop diagnostics chunk

Use this chunk when the task is primarily bounded evidence collection, backup planning, rollback design, or post-change validation for Ubuntu Desktop.

## Universal Skill Execution Contract

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Identify the Ubuntu release, active desktop/session, display manager, kernel/package state, recovery access, and exact failing layer before recommending a change. Preserve the affected configuration or user data, define rollback before implementation, use guarded recovery where a display, boot, network, driver, encryption, or remote-access change could cut access, and validate both desktop login and the original workload after the change.

Keep this chunk self-contained for its routed diagnostics/rollback case. Load a second chunk only when evidence proves a separate cross-layer condition.

## Bounded evidence checklist

Collect only facts relevant to the reported condition:

- Ubuntu release and support state.
- Kernel version and package source when relevant.
- Current desktop environment, session type, and active display manager.
- Recent bounded boot or graphical-session errors.
- Package-manager health.
- GPU, audio, Wi-Fi, Bluetooth, printer, firmware, or external-display state only when implicated.

## Backup and recovery checklist

Before consequential desktop work, preserve only the configuration/data in scope and keep a known-working login or recovery path. For display-manager, kernel, GPU, release-upgrade, boot, encryption, or remote-access work, verify local console, recovery media, cloud/out-of-band access, or another realistic recovery path before proceeding. Retain a known-good kernel when kernel/driver work is involved and record the previous desktop/display-manager choice before changing it.

Recovery must restore the narrow changed state: restore specific user/config files from backup, return package versions only when the prior known-good version is identified, boot a retained known-good kernel when required, and revert display-manager selection only with confirmed console/recovery access.

## Validation checklist

Validate the original workload, not merely process state. Confirm login succeeds, the intended session type and desktop shell load, and only the affected hardware/application path is tested. Check audio, network, Bluetooth, printing, sleep/resume, external displays, browser, or update-manager behavior only when relevant, then confirm no new critical boot/session errors were introduced.

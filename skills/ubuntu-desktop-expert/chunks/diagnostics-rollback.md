# Ubuntu Desktop diagnostics chunk

Use this chunk when the task is primarily bounded evidence collection, backup planning, rollback design, or post-change validation for Ubuntu Desktop.

## Universal Skill Execution Contract

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Identify the Ubuntu release, active desktop/session, display manager, kernel/package state, recovery access, and exact failing layer before recommending a change. Preserve the affected configuration or user data, define rollback before implementation, use guarded recovery where a display, boot, network, driver, encryption, or remote-access change could cut access, and validate both desktop login and the original workload after the change.

Keep this chunk self-contained for its routed diagnostics/rollback case. Do not automatically load `safety-validation.md`; load a second chunk only when evidence proves a separate cross-layer condition that requires it.

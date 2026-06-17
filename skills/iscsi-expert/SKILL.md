# iscsi-expert

Use this skill for Linux iSCSI initiator troubleshooting, session discovery, target login, LUN mapping, multipath handoff, and safe storage rollout.

## Purpose

Diagnose iSCSI connectivity and device presentation without risking data corruption.

## Evidence first

Ask for target portal, session summary, discovered nodes, LUN/device mapping, multipath status if used, and storage logs.

## Safe workflow

1. identify target and initiator IQN
2. confirm network reachability
3. review discovery and login state
4. map LUN to block device
5. coordinate with multipath if present
6. validate filesystem/mount usage
7. document rollback

## Anti-patterns

- writing to a newly presented LUN without confirming mapping
- logging into multiple paths without multipath design
- changing target ACLs blindly
- using device names instead of stable IDs

## Output format

Return session state, LUN map, risk level, safe fix, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for session summary, one node record, and device mapping only.

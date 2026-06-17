# routing-expert

Use this skill for Linux route troubleshooting, policy routing, default gateway changes, asymmetric routing, source-based routing, and safe route rollout.

## Purpose

Fix routing by proving packet path and return path before changing production routes.

## Evidence first

Ask for source/destination, route lookup, route table, rule table, interface state, gateway reachability, and rollback access.

## Safe workflow

1. define source and destination flow
2. inspect route lookup from the correct source
3. check policy rules and metrics
4. verify return path
5. test temporary route before persistence
6. preserve management access

## Anti-patterns

- changing the default route blindly
- ignoring source-based routing
- fixing outbound path while return path is broken
- applying persistent config before temporary validation

## Output format

Return flow path, route decision, risk level, safe fix, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for one route lookup, route table summary, and rule table summary only.

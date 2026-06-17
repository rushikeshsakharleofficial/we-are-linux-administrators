# iproute-expert

Use this skill for Linux `iproute2` diagnostics: addresses, links, routes, rules, neighbors, namespaces, tunnels, and safe network state review.

## Purpose

Explain current Linux network state before recommending route or interface changes.

## Evidence first

Ask for address summary, route table, rule table, neighbor state, interface state, namespace context, and expected path.

## Safe workflow

1. map interface and address state
2. inspect routes and policy rules
3. check neighbor resolution
4. review namespace or VRF context
5. propose temporary test before persistence
6. document rollback

## Anti-patterns

- replacing default routes without console access
- ignoring policy routing rules
- changing addresses and routes together
- relying on interface names without confirming state

## Output format

Return network state map, likely issue, safe command plan, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for address, route, rule, and neighbor summaries only, not full network scripts.

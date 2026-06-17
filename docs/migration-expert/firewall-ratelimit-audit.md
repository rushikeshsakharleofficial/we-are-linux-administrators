# Firewall and rate-limit audit migration

## Evidence first

- active firewall backend: firewalld, nftables, iptables, UFW, cloud SG/NACL, LB/WAF
- current ruleset export
- listening services
- established external clients
- management source IPs/VPN
- NAT/forwarding requirements
- rate-limit rules and counters

## Safe migration pattern

1. Export current runtime and persistent rules.
2. Add explicit management allow rule first.
3. Build shadow ruleset.
4. Validate syntax without loading where possible.
5. Apply with timed rollback.
6. Confirm SSH, monitoring, application ports, DNS/NTP, DB/internal flows.
7. Persist only after runtime validation.

## Rate-limit checks

- avoid rate-limiting trusted health checks
- distinguish auth brute-force from normal burst traffic
- verify IPv6 rules mirror IPv4 where required
- avoid global limits that break NATed customers

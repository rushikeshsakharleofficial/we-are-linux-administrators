# Release 1.18.0

## Package

- NPM package version: `1.18.0`
- Plugin metadata version: `1.18.0`
- Skill count: `80`
- Package name: `linux-admin`

## Cleanup

This release consolidates overlapping micro-skills into existing parent domains to reduce routing ambiguity.

- Permissions consolidation: ACL and file-permission micro-skills now route to `permissions`.
- Authentication consolidation: user, PAM, SSSD/LDAP, and sudo micro-skills now route to `auth`.
- Networking consolidation: routing, iproute, TCP, UDP, VLAN/bonding, and NAT micro-skills now route to `network`.
- Performance consolidation: CPU and memory micro-skills now route to `performance`.
- Diagnostics consolidation: standalone RCA now routes to `diagnose`.
- Logging consolidation: rsyslog and logrotate now route to `logs`.
- Security consolidation: OS security and source-change safety now route to `security-expert` and the shared safety contract.
- Architecture consolidation: minimal architecture now routes to `linux-admin-chief-engineer`.

## Result

Fewer routing targets, less duplicated guidance, and the same practical Linux administration coverage.

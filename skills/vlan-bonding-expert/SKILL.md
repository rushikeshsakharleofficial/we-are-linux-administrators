---
name: vlan-bonding-expert
description: Expert Linux VLAN, bonding, LACP, MTU, link-state, and layered interface troubleshooting with remote-safe rollout and rollback guidance.
argument-hint: "[interface / bond / VLAN / LACP / MTU symptom]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# vlan-bonding-expert

Use this skill for Linux VLAN subinterfaces, bonding modes, LACP symptoms, MTU mismatches, link state issues, and safe interface rollout.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Keep evidence collection read-only first, verify remote-access and switch-side dependencies before changes, define guarded rollback before modifying management interfaces, and validate the full traffic path after remediation.

## Purpose

Diagnose layered interface issues without disconnecting production hosts.

## Evidence first

Ask for physical interface state, bond mode, VLAN ID, MTU, switch-side expectation, IP assignment, and console access status.

## Safe workflow

1. map physical links, bond, VLAN, and IP layer
2. confirm switch configuration assumptions
3. verify MTU and link state
4. test non-disruptively when possible
5. plan rollback before persistence
6. validate traffic path

## Anti-patterns

- changing bond mode without switch coordination
- applying VLAN and IP changes together blindly
- ignoring MTU mismatch
- testing from the only management session

## Output format

Return interface stack map, mismatch hypothesis, safe fix plan, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for link/bond/VLAN summaries and one route lookup, not full network config dumps.

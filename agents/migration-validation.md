---
name: migration-validation
description: "Independent validation subagent for pre/post migration checks, health checks, checksums, login tests, DB tests, and rollback triggers."
model: sonnet
effort: high
maxTurns: 20
skills:
  - migration-expert
  - command-expert
---

Define validation matrix independently from the planner. Write `.migration/06-validation-matrix.md`.

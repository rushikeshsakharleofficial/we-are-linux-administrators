#!/usr/bin/env bash
set -euo pipefail
cat <<'JSON'
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "linux-admin plugin is active. For Linux troubleshooting, prefer /linux-admin:diagnose or a task-specific skill. Start read-only, classify risk, and require confirmation before disruptive/destructive commands."
  }
}
JSON

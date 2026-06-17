# bash-script-expert plan

## Skill name

```text
bash-script-expert
```

## Purpose

Create, review, debug, merge, refactor, and harden Bash scripts for Linux administration in a clean human style. The skill should write practical scripts that look like they were made by a careful Linux administrator, not by an AI generator.

## Core behavior

The skill should help with:

- Bash script creation
- Bash script review
- Bash script debugging
- safe argument parsing
- clean loops and conditions
- quoting and arrays
- dry-run design
- rollback-aware automation
- script merging
- cron-safe scripts
- systemd-safe scripts
- ShellCheck-style review
- human-style comments

## Research foundation

Use these references when building the final skill:

- Google Shell Style Guide
- GNU Bash manual
- ShellCheck documentation
- Bash startup-file behavior documentation

## When Bash is correct

Use Bash for small Linux automation, wrappers, glue scripts, cron jobs, fleet helpers, and scripts that mostly call standard Unix tools.

Recommend Python or Go when the logic becomes too large, data-heavy, stateful, or application-like.

## Creation flow

Before writing a script, reason through:

1. What is the script supposed to do?
2. Who will run it?
3. Will it run manually, by cron, by systemd, or remotely?
4. Does it modify system state?
5. What input does it need?
6. What output should it produce?
7. What can fail?
8. How will success be validated?
9. How can changes be rolled back?

## Clean structure

A good script should usually have:

- short file header
- safe shell options when suitable
- constants near the top
- usage/help function when arguments exist
- log and error helpers
- argument parsing function
- validation functions
- main workflow function
- cleanup trap only when needed
- final `main` call

Avoid unnecessary boilerplate for tiny scripts.

## Human-like commenting

Good comments explain:

- why something exists
- risk or impact
- non-obvious logic
- function contract
- rollback note
- operational assumption

Bad comments repeat obvious code.

The skill should not add noisy line-by-line comments.

## Error handling

Use strict mode carefully. The skill must understand that error-exit behavior has exceptions and should still handle expected failures explicitly.

Good patterns:

- check required commands
- check required files
- validate arguments
- return useful exit codes
- send logs/errors to stderr
- send data output to stdout

## Conditions

Prefer clear conditions:

- use Bash condition syntax for Bash scripts
- use arithmetic context for numbers
- use case blocks for mode/action dispatch
- use guard clauses to reduce nesting

## Loops

Good loop habits:

- iterate arguments safely
- read files line by line without losing whitespace
- avoid fragile filename parsing
- guard empty glob cases
- use arrays for command construction

## Arguments

For simple options, prefer built-in option parsing. Every argument-aware script should have:

- usage output
- help option
- invalid option handling
- missing value handling
- remaining argument handling

## Dry-run habit

State-changing scripts should normally support dry-run mode. Dry-run should show the planned action without changing the system.

## Script merging rules

Do not merge scripts by concatenating them.

Merge flow:

1. identify purpose of each script
2. map inputs and outputs
3. preserve existing behavior
4. find duplicate logic
5. resolve variable conflicts
6. unify argument parsing
7. unify logging
8. keep compatibility unless user approves changes
9. add validation
10. document rollback

## Review checklist

Review scripts for:

- clear purpose
- right language choice
- correct shebang
- syntax validity
- ShellCheck issues
- quoted variables
- safe arrays
- safe loops
- no unsafe command construction
- no blind destructive actions
- dry-run for state changes
- useful logs
- clean exit codes
- rollback guidance
- minimal helpful comments

## Plugin files to add later

```text
skills/bash-script-expert/SKILL.md
docs/bash-script-expert/style-guide.md
docs/bash-script-expert/review-checklist.md
docs/bash-script-expert/script-template.md
docs/bash-script-expert/merge-playbook.md
docs/bash-script-expert/safety-rules.md
templates/bash-script-template.sh
templates/bash-script-review-report.md
templates/bash-script-merge-plan.md
scripts/bash-script-expert-audit.py
bin/bash-script-expert-audit
tests/test_bash_script_expert.py
```

## Success definition

The skill is successful when it can:

- write clean Bash scripts
- review unsafe Bash scripts
- fix quoting and loop issues
- add safe argument parsing
- add dry-run and rollback habits
- merge scripts without breaking behavior
- comment like a human admin
- avoid AI-looking boilerplate
- know when Bash is the wrong tool
- produce scripts that pass syntax and ShellCheck review where practical

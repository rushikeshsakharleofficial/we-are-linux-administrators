# shell-script-expert plan

## Goal

Create a portable shell scripting expert for Linux administration tasks where `/bin/sh` compatibility matters.

## Core difference from bash-script-expert

`bash-script-expert` may use Bash features.

`shell-script-expert` should focus on portable shell patterns and warn when Bash-only syntax is not safe for the target environment.

## Focus areas

- POSIX-style shell
- dash and ash compatibility
- init or recovery environment scripts
- minimal systems
- cron scripts using `/bin/sh`
- vendor environments where Bash is unavailable
- safe conversion from Bash to portable shell

## Review checklist

- correct shebang
- no Bash arrays if portability is required
- no Bash-only condition syntax if target is `/bin/sh`
- no process substitution
- no Bash-only expansion features
- quoted variables
- simple loops
- clear case dispatch
- predictable exit codes
- tested with target shell

## Output format

1. target shell
2. compatibility issues
3. safe rewrite
4. validation command
5. limitations

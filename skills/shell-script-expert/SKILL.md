# shell-script-expert

Use this skill to review and design portable Linux shell scripts where POSIX shell compatibility, `/bin/sh`, dash, ash, or vendor shell behavior matters.

## Purpose

Help users decide whether a script should be portable shell or Bash, and write scripts that avoid Bash-only features when portability is required.

## Scope

- POSIX-style shell scripting
- `/bin/sh` compatibility review
- dash and ash compatibility checks
- portable argument handling
- safe variable expansion
- safe loops and conditions
- simple automation wrappers
- cron and init script compatibility
- migration from Bash-only syntax to portable shell

## Rules

- Ask whether portability is required.
- If Bash is allowed, prefer `bash-script-expert` for richer Bash scripts.
- If `/bin/sh` compatibility is required, avoid Bash arrays, Bash-only condition syntax, process substitution, and Bash-only expansion features.
- Keep scripts simple.
- Quote variables.
- Prefer straightforward case blocks for options and modes.
- Avoid clever shell tricks.
- Test with the target shell, not only Bash.

## Review checklist

- correct shebang
- no Bash-only syntax when portability is required
- safe quoting
- simple conditions
- safe loops
- no fragile filename handling
- clear exit codes
- clear stderr/stdout separation
- no interactive assumptions
- suitable for cron or minimal environments when needed

## Output format

1. portability target
2. detected Bash-only features
3. safe portable alternative
4. final script or patch
5. validation command
6. limitations

## Escalation

Use `bash-script-expert` when Bash is acceptable and the user wants arrays, richer conditions, safer command construction, or advanced script structure.

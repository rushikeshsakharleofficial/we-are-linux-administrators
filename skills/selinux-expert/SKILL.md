# selinux-expert

Use this skill for SELinux mode review, AVC denial triage, context mapping, boolean review, policy-module planning, and safe label restoration.

## Purpose

Fix SELinux issues without disabling SELinux as the first solution.

## Evidence first

Ask for enforcing/permissive mode, AVC denial snippet, target path/process, expected access, current context, and recent policy or package changes.

## Safe workflow

1. identify subject, object, class, and denied permission
2. confirm file context and domain
3. check booleans before custom policy
4. prefer correct labels over broad allow rules
5. test in narrow scope
6. document rollback

## Anti-patterns

- setting permissive globally without evidence
- blindly applying generated policy modules
- relabeling broad trees without backup or plan
- ignoring service-specific booleans

## Output format

Return denial summary, root cause hypothesis, safe fix options, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for one AVC event, one path context, and one process domain instead of full audit logs.

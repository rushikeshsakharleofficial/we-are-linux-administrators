# Security Feedback Draft

Use this only when the user explicitly asks to prepare feedback for the linux-admin repository.

Do not submit automatically.

## Approval gate

```text
Target repository:
Issue title:
Labels:
Issue body:

User approval received: yes/no
```

## Draft body

```markdown
## Summary

<sanitized finding summary>

## Skill used

<security-expert / sysctl-expert / limits-expert / systemd-expert / other>

## Finding category

<firewall / SSH / sysctl / limits / systemd / logging / package / backup / other>

## Expected behavior

<what the plugin should have checked, warned about, or recommended>

## Observed gap

<what was missing or unclear>

## Sanitized evidence

<safe minimal evidence only; no private infrastructure details>

## Suggested improvement

<recommended checklist, skill, template, or docs update>

## Privacy confirmation

- [ ] User reviewed this draft.
- [ ] Private details were removed.
- [ ] User explicitly approved submission.
```

## Rules

- Do not include secrets.
- Do not include raw private logs unless sanitized.
- Do not include customer data.
- Do not include sensitive internal hostnames or IPs unless the user explicitly approves.
- Do not create an issue, PR, comment, or report until the user clearly approves.

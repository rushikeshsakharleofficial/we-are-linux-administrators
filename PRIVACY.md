# Privacy Policy

This project is designed for local, user-controlled Linux administration assistance.

## No automatic data collection

The plugin does not automatically collect, upload, transmit, or submit server data, command output, logs, configuration files, security findings, hostnames, IP addresses, credentials, tokens, or environment details to this repository.

## Security feedback is explicit opt-in

If a user finds a security gap while using `security-expert` or any other skill, the plugin may help prepare a GitHub issue body for feedback. That issue must be reviewed and approved by the user before submission.

The plugin must not create GitHub issues, pull requests, comments, reports, or feedback submissions automatically without explicit user confirmation.

## User approval requirement

Before any security finding is submitted to GitHub, the workflow must show the user:

- the exact issue title
- the full issue body
- any labels or metadata
- the target repository
- a reminder to remove secrets and private infrastructure details

The user must explicitly approve the submission. Without approval, no issue or pull request should be created.

## Redaction first

Security feedback should be sanitized before submission. Users should remove or redact:

- public and private IP addresses if sensitive
- hostnames and internal domains
- usernames and emails
- tokens, keys, passwords, cookies, and credentials
- customer data
- raw logs that expose private infrastructure
- exploit details that are not needed for defensive improvement

## What may be shared after approval

A safe security feedback issue may include:

- skill name used
- server role, such as web server, mail server, DNS server, database server, or monitoring server
- operating system family and version if the user approves
- finding category
- expected control
- observed result
- sanitized evidence
- suggested improvement to the plugin
- whether the issue appears to be a false positive or confirmed gap

## Purpose of feedback

Approved feedback is used to improve plugin skills, checklists, prompts, templates, validation logic, and documentation. This is a feedback loop for improving the repository. It is not automatic model training and does not mean private server data is used without consent.

## GitHub issue creation

Any automated helper or coding agent integration must operate in dry-run mode by default. Submit mode must require explicit confirmation from the user.

## User responsibility

Users are responsible for reviewing the content before submitting a GitHub issue or pull request. Do not submit secrets, customer data, private logs, or infrastructure details that should not be public.

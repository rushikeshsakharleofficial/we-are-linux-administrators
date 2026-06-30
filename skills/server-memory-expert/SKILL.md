---
name: server-memory-expert
description: Lightweight text-file server memory expert for fast Linux login-context recall. Stores server identity, aliases, access flow, jump-host path, operator notes, and vault references without storing plaintext passwords, private keys, tokens, or MFA secrets.
argument-hint: "[remember|find|login|server|host|ip|alias|jump-host|inventory] [server hint]"
effort: medium
allowed-tools: "Read Grep Glob Bash"
---

# Server Memory Expert

Use this skill when the user wants fast recall of server login flow, server identity, host aliases, jump-host paths, cloud/provider notes, or operational context from a lightweight file-based memory store.

This skill supports plain-text micro memory for non-secret metadata only. It must not store passwords, SSH private keys, API tokens, MFA seeds, cookies, database credentials, cloud keys, or customer secrets.

## Hard secret rule

Never store these in the memory files:

- passwords
- SSH private keys
- API tokens
- cloud access keys
- database passwords
- MFA seeds or recovery codes
- cookies or session tokens
- private certificates
- customer data dumps

Store references instead, for example:

```text
credential_ref: bitwarden://linux/prod/mail01
key_ref: 1password://Infra/SSH/prod-bastion
vault_ref: hashicorp-vault://kv/linux/prod/mail01
```

## Memory layout

Recommended local private layout:

```text
.memdb/
  README.md
  servers/
    mail01.md
    zabbix01.md
    proxy01.md
  aliases/
    by-ip.md
    by-role.md
    by-provider.md
  tags/
    production.md
    staging.md
    mail.md
    monitoring.md
  flows/
    bastion-login.md
    vpn-login.md
```

`.memdb/` should be private and ignored by git unless the repository is explicitly designed for non-secret shared inventory. Public repositories must not contain real infrastructure secrets.

## Server record template

```yaml
id: mail01
hostname: mail01.example.com
aliases:
  - mail primary
  - postfix prod
ips:
  ipv4:
    - 203.0.113.10
  ipv6:
    - 2001:db8::10
role: mail gateway
environment: production
provider: example-cloud
region: ap-south
os: Rocky Linux 9
access:
  username_hint: admin-user
  port_hint: 22
  jump_host: bastion01
  login_flow: "VPN -> bastion01 -> mail01"
  credential_ref: "vault://infra/prod/mail01"
security:
  mfa_required: true
  direct_root_login: false
  allowed_networks_ref: "firewall inventory"
notes:
  - "Postfix queue host"
  - "Check maintenance window before reload"
last_verified: YYYY-MM-DD
owner: team-or-person
```

## Search behavior

When a user gives any hint, search flexibly across:

- hostname
- alias
- IP fragment
- role
- provider
- region
- service name
- operating system
- tag
- previous incident note
- jump host
- username hint

Examples:

```text
find: mail server
find: 142.44
find: zabbix rocky9
find: proxy mumbai
find: server behind bastion01
```

## Safe commands

```bash
find .memdb -type f -name '*.md' -maxdepth 4 2>/dev/null | sort
rg -n -i "<hint>" .memdb/ 2>/dev/null | head -n 80
sed -n '1,160p' .memdb/servers/<server>.md
```

For large memory stores, search first and open only the top matching records.

## Add/update workflow

Before adding a record:

1. Check if a matching server already exists.
2. Merge aliases instead of creating duplicates.
3. Redact secrets before writing.
4. Add `last_verified` date.
5. Record uncertainty explicitly.

Use this format for uncertain data:

```yaml
uncertain:
  - "IPv6 ownership not verified"
  - "Login username inferred from old notes"
```

## Login-flow output format

```text
Server match:
Confidence:
Matched hints:
Hostname/IP:
Role:
Environment:
Login flow:
Username hint:
Credential reference:
Jump host/VPN:
Safety notes:
Verification command:
```

## Security checks

Before using stored login context:

- confirm the server identity if production
- avoid printing secrets
- do not paste private keys into prompts
- verify host key changes out of band
- prefer named credential references over raw secrets
- keep separate files for production and lab contexts

## Specialist routing

- SSH access: `auth`, `ssh-hardening-expert`
- user and sudo: `user-permissions-expert`, `sudoers-expert`
- inventory automation: `automation`, `ansible-expert`
- incident context: `logs`, `incident-response-expert`
- agent routing: `agent-model-dispatcher-expert`

## Final guardrail

Fast login memory is useful only when it does not become a secret leak. Store searchable context, not credentials. Use vault references for secrets and keep `.memdb/` private by default.

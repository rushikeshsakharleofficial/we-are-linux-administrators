# Task Router Template

Use this to decide which subtask file to load.

```yaml
issue:
  user_symptom: ""
  primary_class: ""
  secondary_classes: []
  files_to_load:
    - SKILL.md
    - core/01-distro-detection.md
    - core/02-safety-policy.md
    - core/03-diagnostic-method.md
    - tasks/<selected>.md
  safety_question_needed: false
  safety_question: ""
```

## Examples

```yaml
issue:
  user_symptom: "nginx.service failed after config edit"
  primary_class: service
  secondary_classes: [permissions, network]
  files_to_load:
    - tasks/systemd-services.md
```

```yaml
issue:
  user_symptom: "can ping 8.8.8.8 but domain names fail"
  primary_class: network
  secondary_classes: [logging]
  files_to_load:
    - tasks/networking-dns-firewall.md
```

```yaml
issue:
  user_symptom: "web app works only after setenforce 0"
  primary_class: permissions
  secondary_classes: [service]
  files_to_load:
    - tasks/permissions-selinux-apparmor.md
```

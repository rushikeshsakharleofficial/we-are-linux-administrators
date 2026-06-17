# find, grep, awk, sed playbook

## find

Use `find` to define a target set. Preview before action.

```bash
find /var/log -xdev -type f -name '*.log' -mtime +30 -printf '%TY-%Tm-%Td %s %p\n' | sort
```

For apply operations, use null delimiters:

```bash
find /var/log -xdev -type f -name '*.log' -mtime +30 -print0 | xargs -0 -r gzip -9 --
```

## grep

```bash
grep -RIn --exclude-dir=.git --include='*.conf' -- 'Listen' /etc 2>/dev/null
```

Use `--` before patterns that may begin with `-`.

## awk

Use `awk` for fields, aggregation, and conditional selection:

```bash
awk '$5 > 1000000 {print $0}' file
ss -tan state established | awk 'NR>1 {split($5,a,":"); print a[1]}' | sort | uniq -c | sort -nr
```

## sed

Preview first. Use backups when editing:

```bash
sed 's/^PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config | diff -u /etc/ssh/sshd_config -
sed -i.bak 's/^PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sshd -t
```

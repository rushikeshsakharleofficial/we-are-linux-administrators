# getfacl/setfacl playbook

## Inspect

```bash
getfacl -p /path
stat -c '%n %U:%G %a %A' /path
```

## Add access

```bash
setfacl -m u:alice:rw /path/file
setfacl -m g:appops:rx /srv/app
```

## Add inherited defaults

```bash
setfacl -m g:appops:rwx /srv/app/shared
setfacl -d -m g:appops:rwx /srv/app/shared
```

## Backup and restore

```bash
getfacl -Rp /srv/app > /root/srv-app.acl
setfacl --restore=/root/srv-app.acl
```

## Remove

```bash
setfacl -x u:alice /path/file
setfacl -k /path/dir     # remove default ACL only
setfacl -b /path/file    # remove all extended ACL entries
```

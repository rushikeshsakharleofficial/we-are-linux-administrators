# Sysctl Expert: All-Parameter Discovery

Linux sysctl parameters are not a fixed universal list. The available keys depend on:

- Kernel version and build configuration.
- Loaded kernel modules.
- Architecture.
- Network interfaces that exist at runtime.
- Namespaces, containers, and cgroup environment.
- Distro defaults and vendor patches.

Therefore, the only reliable "all parameters available" list for a target system is produced from the live host.

## Read-only inventory commands

```bash
mkdir -p /tmp/sysctl-inventory
uname -a > /tmp/sysctl-inventory/uname.txt
cat /etc/os-release > /tmp/sysctl-inventory/os-release.txt
sysctl -a 2>/tmp/sysctl-inventory/sysctl-a-errors.txt | sort > /tmp/sysctl-inventory/sysctl-current.txt
sysctl -N 2>/dev/null | sort > /tmp/sysctl-inventory/sysctl-names.txt || true
sysctl -a --deprecated 2>/tmp/sysctl-inventory/sysctl-deprecated-errors.txt | sort > /tmp/sysctl-inventory/sysctl-current-with-deprecated.txt || true
find /proc/sys -type f -printf '%p\n' 2>/dev/null | sort > /tmp/sysctl-inventory/proc-sys-files.txt
find /proc/sys -type f -readable -exec sh -c 'for f; do printf "%s=" "$f"; cat "$f" 2>/dev/null | tr "\n" " "; echo; done' sh {} + \
  > /tmp/sysctl-inventory/proc-sys-values.txt 2>/tmp/sysctl-inventory/proc-sys-read-errors.txt
```

## Config source discovery

```bash
grep -R "^[[:space:]]*[^#;].*=.*" \
  /etc/sysctl.conf \
  /etc/sysctl.d \
  /run/sysctl.d \
  /usr/local/lib/sysctl.d \
  /usr/lib/sysctl.d \
  /lib/sysctl.d 2>/dev/null | sort
```

## Why live discovery is required

- `sysctl -a` shows parameters currently available under `/proc/sys`.
- `sysctl -N` lists names only when supported by the installed procps version.
- Some module-backed keys appear only after the module is loaded.
- Per-interface keys under `net.ipv4.conf.*`, `net.ipv6.conf.*`, `net.ipv4.neigh.*`, and `net.ipv6.neigh.*` can appear when interfaces are created.
- Deprecated or blocked keys may not appear in normal `sysctl -a`; use `--deprecated` only for audit, not for new tuning.

## Agent rule

When the user asks for "all parameters", produce a host-specific inventory command bundle and summarize by namespace:

```text
abi.*
crypto.*
debug.*
dev.*
fs.*
kernel.*
net.*
sunrpc.*
user.*
vm.*
xen.*
```

Do not claim a static document contains every sysctl for every Linux system.

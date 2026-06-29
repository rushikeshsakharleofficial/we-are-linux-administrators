---
name: linux-proxy-expert
description: Linux proxy expert for Squid, Tinyproxy, Dante SOCKS, HTTP/HTTPS forward proxies, reverse proxy boundaries, transparent/intercepting proxy behavior, system proxy variables, package-manager proxy config, Docker/systemd proxy settings, corporate proxy CA chains, ACLs, authentication, logging, firewall/NAT routing, IPv4/IPv6 binding, and safe proxy troubleshooting.
argument-hint: "[squid|tinyproxy|dante|socks5|http_proxy|https_proxy|apt|dnf|docker|systemd|transparent|acl] [symptom]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# Linux Proxy Expert

Use this skill for Linux proxy server and proxy-client troubleshooting across HTTP, HTTPS CONNECT, SOCKS4/SOCKS5, package-manager proxy use, systemd service proxy environment, Docker/Podman proxy settings, corporate proxy CA chains, and transparent/intercepting proxy behavior.

Use `nginx-proxy-expert` for NGINX reverse proxy/load-balancing application traffic. Use `haproxy-expert` for HAProxy L4/L7 balancing. Use this skill when the focus is a Linux host acting as a forward proxy, SOCKS proxy, client behind a proxy, or system-wide proxy configuration.

## Safety boundary

Default to read-only diagnostics. Do not open a public proxy, weaken ACLs, disable authentication, bypass corporate policy, intercept TLS, or expose TCP proxy ports to the internet without explicit authorization and a security review.

Do not help create anonymous abuse infrastructure, credential capture, traffic interception without consent, or bypass of access controls. Keep recommendations for owned or explicitly authorized systems.

## Proxy model

```text
client/app -> local proxy config -> proxy daemon -> ACL/auth/TLS policy -> DNS/connect/firewall/NAT -> upstream internet/internal service
```

Common components:

- Squid: HTTP/HTTPS forward proxy, cache, ACLs, authentication, CONNECT control.
- Tinyproxy: lightweight HTTP proxy.
- Dante/sockd: SOCKS4/SOCKS5 proxy.
- Privoxy: filtering proxy, often chained with SOCKS/Tor-like setups; use only for authorized cases.
- system proxy environment: `http_proxy`, `https_proxy`, `no_proxy`, uppercase variants.
- package managers: APT, DNF/YUM, Zypper, Pacman, APK proxy configuration.
- systemd services: drop-in environment proxy config.
- Docker/Podman: daemon and build/runtime proxy settings.
- TLS trust: corporate root CA, MITM proxy trust stores, application-specific CA bundles.

## Evidence first

```bash
printf '== os ==\n'; cat /etc/os-release 2>/dev/null | sed -n '1,12p'
printf '== proxy env ==\n'; env | grep -Ei '^(http|https|ftp|all|no)_proxy=' | sort
printf '== listeners ==\n'; ss -tulpen | grep -E ':(3128|8080|8000|8888|1080|1081)\b' || true
printf '== services ==\n'; systemctl status squid tinyproxy danted sockd privoxy --no-pager 2>/dev/null || true
printf '== firewall ==\n'; firewall-cmd --list-all 2>/dev/null || true; nft list ruleset 2>/dev/null | sed -n '1,160p' || true
```

Proxy package and config discovery:

```bash
rpm -qa 2>/dev/null | grep -Ei 'squid|tinyproxy|dante|privoxy|proxy' || true
dpkg -l 2>/dev/null | grep -Ei 'squid|tinyproxy|dante|privoxy|proxy' || true
find /etc -maxdepth 3 -type f \( -iname '*squid*' -o -iname '*tinyproxy*' -o -iname '*danted*' -o -iname '*sockd*' -o -iname '*proxy*' \) 2>/dev/null | sort
```

Bounded logs:

```bash
journalctl -u squid -u tinyproxy -u danted -u sockd -u privoxy --no-pager -n 200 2>/dev/null
find /var/log -maxdepth 3 -type f \( -iname '*squid*' -o -iname '*tinyproxy*' -o -iname '*danted*' -o -iname '*access.log' \) 2>/dev/null | sort
```

## Client-side proxy diagnostics

Use these when a Linux host or app fails behind a proxy:

```bash
env | grep -Ei 'proxy|no_proxy' | sort
curl -v --max-time 10 http://example.com/ 2>&1 | sed -n '1,120p'
curl -v --proxy http://PROXY_HOST:PROXY_PORT --max-time 10 http://example.com/ 2>&1 | sed -n '1,140p'
curl -vk --proxy http://PROXY_HOST:PROXY_PORT --max-time 10 https://example.com/ 2>&1 | sed -n '1,180p'
```

Interpretation:

- `407 Proxy Authentication Required`: proxy reached; credentials/auth method wrong or missing.
- `403 Forbidden`: proxy ACL denied client, destination, port, method, time, or user group.
- `connection refused`: proxy daemon not listening or wrong bind address/port.
- `timed out`: firewall, routing, security group, upstream block, or proxy overloaded.
- `CONNECT tunnel failed`: CONNECT method/port ACL, TLS bump policy, or proxy auth issue.
- certificate errors behind corporate proxy: missing corporate root CA in OS/app trust store.

## Server-side proxy diagnostics

### Squid

Read-only checks:

```bash
squid -v 2>/dev/null || true
squid -k parse 2>/dev/null || true
systemctl cat squid 2>/dev/null
sed -n '1,240p' /etc/squid/squid.conf 2>/dev/null
journalctl -u squid --no-pager -n 200
```

Key areas:

- `http_port` bind address and port.
- `acl` definitions and order.
- `http_access` rule order; first matching rule matters.
- CONNECT port restrictions, usually `SSL_ports` and `Safe_ports`.
- authentication helpers and credential backend.
- DNS resolver behavior and IPv4/IPv6 reachability.
- cache directory permissions and disk capacity.
- access log fields: client, result code, hierarchy code, bytes, method, URL/host.

Safe validation:

```bash
squid -k parse
curl -v --proxy http://127.0.0.1:3128 http://example.com/ 2>&1 | sed -n '1,120p'
```

### Tinyproxy

```bash
tinyproxy -h 2>&1 | head -n 20 || true
systemctl cat tinyproxy 2>/dev/null
sed -n '1,220p' /etc/tinyproxy/tinyproxy.conf 2>/dev/null
journalctl -u tinyproxy --no-pager -n 200
```

Check:

- `Port`, `Listen`, `Allow`, `ConnectPort`, `BasicAuth`.
- whether the daemon binds only to localhost or all interfaces.
- log level and log file location.

### Dante SOCKS

```bash
sockd -v 2>/dev/null || danted -v 2>/dev/null || true
systemctl cat danted sockd 2>/dev/null
sed -n '1,260p' /etc/danted.conf /etc/sockd.conf 2>/dev/null
journalctl -u danted -u sockd --no-pager -n 200
```

Check:

- `internal` bind interface and port.
- `external` egress interface/IP.
- `socksmethod` and `clientmethod`.
- `client pass` and `socks pass` rules.
- IPv4/IPv6 bind and routing behavior.

SOCKS test:

```bash
curl -v --socks5-hostname 127.0.0.1:1080 https://example.com/ 2>&1 | sed -n '1,160p'
```

## Package manager proxy settings

APT:

```bash
grep -R "Acquire::.*Proxy\|proxy" /etc/apt/apt.conf /etc/apt/apt.conf.d 2>/dev/null
apt-config dump | grep -i proxy
```

DNF/YUM:

```bash
grep -R "^proxy=\|^proxy_username=\|^proxy_password=" /etc/dnf /etc/yum.conf /etc/yum.repos.d 2>/dev/null
dnf repolist -v 2>/dev/null | grep -i proxy || true
```

Zypper:

```bash
grep -R "proxy" /etc/zypp /etc/sysconfig/proxy 2>/dev/null
```

Pacman:

```bash
grep -R "XferCommand\|proxy" /etc/pacman.conf /etc/makepkg.conf 2>/dev/null
```

APK:

```bash
grep -R "proxy" /etc/apk /etc/profile /etc/environment 2>/dev/null
```

## systemd service proxy settings

Use drop-ins instead of editing vendor units:

```bash
systemctl cat <unit>
systemctl show <unit> -p Environment,EnvironmentFiles,FragmentPath,DropInPaths,NeedDaemonReload
```

Safe drop-in pattern:

```ini
[Service]
Environment="HTTP_PROXY=http://proxy.example:3128"
Environment="HTTPS_PROXY=http://proxy.example:3128"
Environment="NO_PROXY=localhost,127.0.0.1,.example.internal"
```

Always include validation and rollback:

```bash
systemd-analyze verify /etc/systemd/system/<unit>.d/proxy.conf
systemctl daemon-reload
systemctl show <unit> -p Environment
```

Rollback:

```bash
rm -f /etc/systemd/system/<unit>.d/proxy.conf
systemctl daemon-reload
```

## Docker and Podman proxy checks

Docker daemon:

```bash
systemctl cat docker 2>/dev/null
systemctl show docker -p Environment,DropInPaths 2>/dev/null
docker info 2>/dev/null | grep -Ei 'proxy|rootless|cgroup|http proxy|https proxy|no proxy'
```

Docker client/build:

```bash
cat ~/.docker/config.json 2>/dev/null
```

Podman:

```bash
podman info 2>/dev/null | grep -Ei 'proxy|rootless|cgroup|networkBackend' || true
systemctl --user list-units 2>/dev/null | grep -i podman || true
```

## Transparent/intercepting proxy warning

Transparent proxying crosses firewall, routing, application, and legal/privacy boundaries. Only assist when explicitly authorized.

Before any change, require:

- network owner authorization
- traffic scope
- consent/legal basis
- bypass list
- rollback plan
- out-of-band access

Read-only checks:

```bash
ip route
ip rule
sysctl net.ipv4.ip_forward net.ipv6.conf.all.forwarding 2>/dev/null
nft list ruleset 2>/dev/null | sed -n '1,260p'
conntrack -S 2>/dev/null || true
```

## Failure patterns

- Proxy works locally but not remotely: bind address, firewall, cloud SG, ACL `Allow`, routing.
- HTTP works but HTTPS fails: CONNECT port ACL, TLS bump/CA trust, SNI filtering, auth issue.
- Package manager fails only: package manager-specific proxy config, repo mirror TLS CA, `no_proxy`, auth escaping.
- Docker build fails: daemon vs client proxy mismatch, BuildKit env, registry CA trust.
- SOCKS timeout: DNS mode mismatch; use `--socks5-hostname` to resolve through proxy.
- IPv6 proxy issues: daemon bind, egress route, ACL only matching IPv4, bracket syntax, upstream IPv6 reachability.
- Random clients denied: ACL order, CIDR mismatch, auth helper overload, max clients/file descriptors.
- Slow proxy: DNS latency, disk cache pressure, file descriptor limits, conntrack/NAT saturation, upstream congestion.

## Output format

```text
Proxy role:
Proxy software/path:
Client/server side:
Listener/bind status:
ACL/auth status:
Firewall/NAT status:
TLS/CA status:
Observed error:
Likely failure domain:
Evidence:
Recommended fix:
Rollback:
Validation:
Security note:
```

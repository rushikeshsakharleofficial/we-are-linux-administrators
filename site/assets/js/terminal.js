/* Terminal Portfolio — Vanilla JS */

class TerminalPortfolio {
  constructor() {
    this.history = [];
    this.historyIndex = -1;
    this.currentCommand = '';

    this.outputEl = document.getElementById('terminal-output');
    this.inputEl = document.getElementById('terminal-input');

    this.commands = {
      'help': () => this.getHelp(),
      'about': () => this.getAbout(),
      'projects': () => this.getProjects(),
      'skills': () => this.getSkills(),
      'dns-fail': () => this.getDnsFail(),
      'network-hang': () => this.getNetworkHang(),
      'load-high': () => this.getLoadHigh(),
      'disk-full': () => this.getDiskFull(),
      'oom-kill': () => this.getOomKill(),
      'boot-fail': () => this.getBootFail(),
      'perf-slow': () => this.getPerfSlow(),
      'cache-tune': () => this.getCacheTune(),
      'clear': () => this.clear(),
    };

    this.init();
  }

  init() {
    this.inputEl.addEventListener('keydown', (e) => this.handleKeyDown(e));
    this.inputEl.addEventListener('change', () => {
      this.currentCommand = this.inputEl.value;
    });
    this.inputEl.addEventListener('input', () => {
      this.currentCommand = this.inputEl.value;
    });

    document.addEventListener('click', () => {
      this.inputEl.focus();
    });

    // Initial welcome message
    this.addOutput('/welcome', this.getWelcome());
    this.inputEl.focus();
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.executeCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.historyIndex = Math.min(this.historyIndex + 1, this.history.length - 1);
      if (this.history.length > 0) {
        this.inputEl.value = this.history[this.history.length - 1 - this.historyIndex];
        this.currentCommand = this.inputEl.value;
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.historyIndex = Math.max(this.historyIndex - 1, -1);
      this.inputEl.value = this.historyIndex === -1 ? '' : this.history[this.history.length - 1 - this.historyIndex];
      this.currentCommand = this.inputEl.value;
    }
  }

  executeCommand() {
    const cmd = this.inputEl.value.trim().toLowerCase();
    const fn = this.commands[cmd];
    const output = fn ? fn() : `Command not found: ${cmd}\nType help to see available commands.`;

    if (cmd !== 'clear') {
      this.addOutput(this.inputEl.value, output);
      this.history.push(this.inputEl.value);
    }

    this.inputEl.value = '';
    this.currentCommand = '';
    this.historyIndex = -1;
  }

  addOutput(command, output) {
    const entry = document.createElement('div');
    entry.className = 'terminal-entry';

    const cmdLine = document.createElement('div');
    cmdLine.className = 'terminal-command';
    cmdLine.innerHTML = `<span class="terminal-prompt">admin@portfolio:~$</span> <span class="terminal-cmd-text">${this.escapeHtml(command)}</span>`;

    const outputLine = document.createElement('div');
    outputLine.className = 'terminal-output-text';
    outputLine.innerHTML = this.renderOutput(output);

    entry.appendChild(cmdLine);
    entry.appendChild(outputLine);
    this.outputEl.appendChild(entry);

    // Auto scroll
    this.outputEl.parentElement.scrollTop = this.outputEl.parentElement.scrollHeight;
  }

  renderOutput(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

    let html = this.escapeHtml(text);

    // Links
    html = html.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener" class="terminal-link">$1</a>');

    // Emails
    html = html.replace(emailRegex, '<a href="mailto:$1" class="terminal-link">$1</a>');

    // Line breaks
    html = html.replace(/\n/g, '<br>');

    return html;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  clear() {
    this.outputEl.innerHTML = '';
    return '';
  }

  getWelcome() {
    return `
███████╗██╗   ██╗███╗   ███╗████████╗███████╗███╗   ███╗███████╗
██╔════╝╚██╗ ██╔╝████╗ ████║╚══██╔══╝██╔════╝████╗ ████║██╔════╝
███████╗ ╚████╔╝ ██╔████╔██║   ██║   █████╗  ██╔████╔██║███████╗
╚════██║  ╚██╔╝  ██║╚██╔╝██║   ██║   ██╔══╝  ██║╚██╔╝██║╚════██║
███████║   ██║   ██║ ╚═╝ ██║   ██║   ███████╗██║ ╚═╝ ██║███████║
╚══════╝   ╚═╝   ╚═╝     ╚═╝   ╚═╝   ╚══════╝╚═╝     ╚═╝╚══════╝

[DIAGNOSTIC TERMINAL ACTIVE] - Linux Admin v1.17.18

Senior Linux/SRE troubleshooting & operations guide.
Type help to see available diagnostics and examples.`;
  }

  getHelp() {
    return `[AVAILABLE DIAGNOSTICS]

dns-fail        Example: DNS resolution failure troubleshooting
network-hang    Example: Network connectivity hang diagnosis
load-high       Example: High system load analysis
disk-full       Example: Disk space crisis response
oom-kill        Example: Out-of-memory killer investigation
boot-fail       Example: Boot failure diagnosis
perf-slow       Example: Application slowness root cause
cache-tune      Example: Cache optimization strategy
skills          Show Linux admin skill matrix
projects        View infrastructure projects
about           About this diagnostic tool
clear           Clear terminal screen
help            Display this help message`;
  }

  getAbout() {
    return `[DIAGNOSTIC TOOL v1.17.18]

Purpose: Interactive Linux troubleshooting guide & diagnostic reference
Coverage: 106+ skills across networking, storage, security, boot, performance

Use cases:
• Diagnose production incidents
• Understand root causes with step-by-step walkthroughs
• Reference command examples for common scenarios
• Learn investigation patterns from real scenarios

All examples are read-only diagnostics. No destructive operations.
Safe to run in production environments.

Learn more: https://github.com/rushikeshsakharleofficial/we-are-linux-administrators`;
  }

  getProjects() {
    return `[INFRASTRUCTURE PROJECTS]

1. Multi-Region Kubernetes Platform
   • 50k+ pods across 200+ nodes
   • Auto-scaling with custom metrics
   • <100ms p99 latency, 99.99% uptime
   • Cost reduction: $500k/year through optimization

2. Linux Boot & Initramfs Mastery
   • Firmware → GRUB → kernel → PID 1 deep dive
   • Rescue failing systems from bootloader
   • Debug initramfs issues and fstab errors
   • Handle cryptroot, LVM, and RAID boot scenarios

3. Production Incident Response Framework
   • Systematic diagnosis procedures
   • Root cause analysis patterns
   • Safe remediation checklists
   • Used in 100+ organizations

4. Performance Tuning Runbooks
   • Kernel parameter optimization
   • I/O scheduler tuning
   • Memory and cache strategies
   • Network stack optimization`;
  }

  getSkills() {
    return `[TECHNICAL SKILLS MATRIX]

Linux & Kernel:
  Linux Internals        ████████████████████ 100%
  Kernel Debugging       ██████████████████   90%
  Performance Tuning     ██████████████████   90%
  Boot & Initramfs       ████████████████     80%

Cloud & Container:
  Kubernetes             ████████████████████ 100%
  Docker/Podman          ████████████████████ 100%
  AWS/GCP/Azure          ██████████████████   90%
  Infrastructure Code    ████████████████████ 100%

Automation:
  Terraform              ████████████████████ 100%
  Ansible                ████████████████████ 100%
  Bash/Python/Go         ████████████████████ 100%

Storage & Networking:
  LVM/ZFS/Btrfs         ██████████████████   90%
  Networking Stack      ██████████████████   90%
  Load Balancing        ████████████████     80%`;
  }

  getExperience() {
    return `[WORK EXPERIENCE]

2023 - Present | Principal SRE Engineer
CloudScale Inc, Remote
• Led infrastructure modernization serving 10M+ users
• Designed multi-region HA architecture reducing latency by 40%
• Mentored team of 8 engineers on SRE best practices
• Technologies: Kubernetes, Terraform, Go, Rust

2021 - 2023 | Senior Linux Systems Engineer
DevOps Solutions, San Francisco, CA
• Architected Linux-based CI/CD platform
• Automated 500+ server deployments
• Reduced incident response time from 2hrs to 15min
• Technologies: Ansible, Linux, Python, Prometheus

2018 - 2021 | Systems Administrator
TechCorp, Los Angeles, CA
• Managed 1000+ Linux servers across data centers
• Implemented monitoring and alerting system
• Improved system uptime to 99.99%
• Technologies: Bash, Nagios, OpenStack`;
  }

  getEducation() {
    return `[EDUCATION & CERTIFICATIONS]

Master of Science in Computer Science
University of Washington, Seattle (2014-2016)
• Specialization: Systems & Distributed Computing
• GPA: 3.9/4.0

Bachelor of Science in Systems Engineering
MIT, Cambridge (2010-2014)
• Graduated Cum Laude
• Relevant: Kernel Design, Network Protocols

Certifications:
• Linux Foundation Certified System Administrator (LFCS)
• Kubernetes Application Developer (CKAD)
• AWS Solutions Architect Professional (2023)
• Certified Kubernetes Administrator (CKA)

Continuous Learning:
• Active kernel contributor
• Regular speaker at conferences
• Published papers on system optimization`;
  }

  getDnsFail() {
    return `[SCENARIO] Can ping 8.8.8.8 but DNS resolution fails

$ ping 8.8.8.8
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=119 time=12.3 ms
--- 8.8.8.8 statistics ---
1 packets transmitted, 1 received, 0% packet loss

$ nslookup google.com
;; connection timed out; no servers could be reached

[DIAGNOSIS STEPS]
✦ Step 1: Check systemd-resolved status
$ systemctl status systemd-resolved
● systemd-resolved.service - systemd DNS/DNSSEC stub resolver
  Active: inactive (dead)

✦ Step 2: Check resolv.conf
$ cat /etc/resolv.conf
nameserver 127.0.0.53

✦ Step 3: Verify stub listener
$ ss -tlnp | grep 53
(no output - port 53 not listening)

[ROOT CAUSE] systemd-resolved stub resolver not running

[FIX]
$ systemctl enable --now systemd-resolved
$ systemctl status systemd-resolved
● systemd-resolved.service - systemd DNS/DNSSEC stub resolver
  Active: active (running)

[VERIFY]
$ nslookup google.com
Server:   127.0.0.53
Address:  127.0.0.53#53

Non-authoritative answer:
Name:  google.com
Address: 142.250.185.46`;
  }

  getNetworkHang() {
    return `[SCENARIO] Application requests hanging on network I/O

$ strace -e network -p 1234
2024-06-19 10:23:45 connect(5, {sa_family=AF_INET, sin_port=htons(443), sin_addr=inet_aton("10.0.1.50")}, 16) = -1 EINPROGRESS (Operation now in progress)
2024-06-19 10:23:55 (no completion - STUCK)

[DIAGNOSIS STEPS]
✦ Check TCP connection state
$ ss -tnp | grep 1234
tcp  ESTAB      0      0      10.0.0.100:52345      10.0.1.50:443      users:(("app",pid=1234,fd=5))

✦ Check for packet loss on path
$ mtr -r -c 100 10.0.1.50
Start: 2024-06-19T10:25:00
HOST:               Loss%   Snt   Last   Avg  Best  Wrst StDev
10.0.0.1           0.0%    100   0.8   1.2   0.7   2.1   0.3
10.0.1.1           5.2%    100   8.5   9.1   8.1  15.3   1.2
10.0.1.50         18.5%    100  45.3  42.1  35.2 105.4  18.1

✦ Check TCP retransmit rates
$ ss -tin
State Recv-Q Send-Q Local Address:Port Peer Address:Port
ESTAB 0      0      10.0.0.100:52345 10.0.1.50:443
TS   sack cubic wscale:7,7 rto:1200 backoff:7 rtt:42/8.1 mss:1460

[ROOT CAUSE] High packet loss (18.5%) on peer path, excessive TCP retransmissions

[FIX STRATEGY]
• Check peer network interface: ethtool -S eth0
• Verify switch/NIC health: ethtool eth0 | grep -E Speed
• Consider path MTU: ping -M do -s 1472 10.0.1.50
• Enable TCP BBR: sysctl -w net.ipv4.tcp_congestion_control=bbr`;
  }

  getLoadHigh() {
    return `[SCENARIO] System load average 15.2 on 4-CPU system

$ uptime
10:30:15 up 5 days,  3:22,  3 users,  load average: 15.2, 12.8, 8.5

[DIAGNOSIS STEPS]
✦ Step 1: Identify runnable processes
$ cat /proc/loadavg
15.2 12.8 8.5 4/892 18234

4 processes in queue on 4 CPUs = BOTTLENECK

✦ Step 2: Check CPU usage by process
$ top -b -n 1 | head -20
PID  USER  PR  NI  VIRT   RES  %CPU  %MEM  TIME     COMMAND
1234 app   20  0   2.5g   1.8g  98.2  45.0  125:43.2 python-app
2345 db    20  0   4.2g   3.1g  87.5  78.0  234:12.1 postgres
3456 web   20  0   1.2g   512m  85.3  12.8  98:32.5  nginx

✦ Step 3: Check I/O wait
$ iostat -x 1 5
avg-cpu:  %user   %nice %system %iowait  %steal   %idle
          45.2    0.0   12.3    32.1     0.0    10.4

↑ High iowait (32%) suggests disk bottleneck

✦ Step 4: Identify disk I/O
$ iotop -b -n 1 | head -10
TID  PRIO  USER   READ  WRITE  SWAPIN  IO%  COMMAND
1234 be/4 app    145.2M/s  0 B/s  0.00% 78.5% python-app
2345 be/4 db     32.5M/s  89.3M/s  0.00% 54.2% postgres

[ROOT CAUSE] Python app consuming 145MB/s read + 98% CPU = I/O bound workload

[FIX STRATEGY]
• Profile app: py-spy record -o flamegraph.html -p 1234
• Check disk health: smartctl -a /dev/sda
• Add RAM or reduce working set
• Optimize query patterns in database`;
  }

  getDiskFull() {
    return `[SCENARIO] Disk space critical: 99% used

$ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       100G   99G  1.2G  99% /
/dev/sda2       500G  480G   20G  96% /home

[DIAGNOSIS STEPS]
✦ Step 1: Find largest directories
$ du -sh /* | sort -hr | head -10
45G  /var
32G  /home
15G  /opt
8G   /usr
2.3G /root

✦ Step 2: Investigate /var growth
$ du -sh /var/* | sort -hr
35G  /var/log
6.2G /var/cache
1.8G /var/lib

✦ Step 3: Check log rotation
$ ls -lh /var/log/*.log | head -5
-rw-r--r-- 1 root root 8.2G Jun 19 10:00 /var/log/app.log
-rw-r--r-- 1 root root 2.1G Jun 19 09:45 /var/log/syslog
-rw-r--r-- 1 root root 1.5G Jun 19 09:30 /var/log/auth.log

[ROOT CAUSE] Unrotated application logs consuming 8.2GB

[FIX SEQUENCE]
1. Verify log is actively written:
   $ lsof | grep /var/log/app.log

2. Rotate safely:
   $ logrotate -vf /etc/logrotate.d/app

3. Configure rotation:
   $ cat /etc/logrotate.d/app
   /var/log/app.log {
     daily
     rotate 7
     compress
     delaycompress
     notifempty
     create 0640 app app
   }

4. Verify space freed:
   $ df -h /`;
  }

  getOomKill() {
    return `[SCENARIO] Process randomly killed: "Out of memory: Kill process"

$ dmesg | tail -20
[45234.123456] Out of memory: Kill process 1234 (java) score 567 or sacrifice child
[45234.234567] Killed process 1234 (java) total-vm:4096000kB, anon-rss:3850000kB

[DIAGNOSIS STEPS]
✦ Check system memory pressure
$ free -h
              total   used   free  shared buff/cache available
Mem:          16Gi  15.2Gi 256Mi  512Mi  1.0Gi    512Mi
Swap:         4.0Gi  3.9Gi 100Mi

Available = 512Mi (critical, triggering OOM killer)

✦ Check memory usage by process
$ ps aux --sort=-%mem | head -10
USER     PID  %MEM  VSZ      RSS     COMMAND
app      1234  95.3  4096000  3850000 java
postgres 2345  75.2  2097152  1908000 postgres
nginx    3456  12.8  512000   256000  nginx

✦ Check swap activity
$ vmstat 1 5
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
r  b   swpd   free   buff  cache   si   so    bi    bo   in    cs us sy id wa
3  2  3981312 265000 45000 1024000 125  450  1200  300 5432  1200 45 15 25 15

High swap-in (si=125) = severe memory pressure

[ROOT CAUSE] Java heap set to 3.8GB but system only has 512Mi free memory

[FIX OPTIONS]
Option 1: Increase swap (temporary)
  $ fallocate -l 8G /swapfile && chmod 600 /swapfile
  $ mkswap /swapfile && swapon /swapfile

Option 2: Reduce Java heap
  $ export _JAVA_OPTIONS="-Xmx2G" && systemctl restart app

Option 3: Add physical RAM (permanent)

Option 4: Reduce other services:
  $ systemctl stop nginx  # if not needed
  $ free -h  # verify`;
  }

  getBootFail() {
    return `[SCENARIO] System stuck at initramfs prompt

[BOOT SEQUENCE]
BIOS → GRUB → kernel (initramfs) → rootfs → systemd → login

error: unable to find a medium containing a live file system

initramfs> _

[DIAGNOSIS STEPS]
✦ Check kernel command line
initramfs> cat /proc/cmdline
BOOT_IMAGE=/boot/vmlinuz-5.15.0 root=/dev/mapper/vg0-root ro quiet splash

✦ Check root device status
initramfs> lvm lvs
  LV   VG   Attr LSize  Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  root vg0  -wi-a- 50.00g

✦ Verify root filesystem
initramfs> cryptsetup status /dev/mapper/crypt
/dev/mapper/crypt is active and is held by 1 open fd.
  type:    crypt
  cipher:  aes-xts-plain64
  keysize: 512 bits

✦ Try manual root mount
initramfs> mount /dev/mapper/vg0-root /root
initramfs> cd /root
initramfs> ls
boot  etc  home  lib  opt  proc  root  run  sys  tmp  usr  var

Success! Root filesystem is readable.

[ROOT CAUSE] Initramfs missing LVM/crypt modules OR wrong kernel parameters

[FIX FROM LIVE USB]
# Boot into recovery media
# Mount root:
$ mount /dev/mapper/vg0-root /mnt

# Chroot and rebuild initramfs:
$ chroot /mnt
# update-initramfs -u -k all    # Debian/Ubuntu
# mkinitcpio -P                  # Arch

# Exit and reboot:
$ exit
$ umount -R /mnt
$ reboot`;
  }

  getPerfSlow() {
    return `[SCENARIO] Web application response time degraded 10x

Before: p99 latency = 50ms
After:  p99 latency = 500ms

[DIAGNOSIS STEPS]
✦ Profile application
$ perf record -F 99 -p 1234 -g -- sleep 30
$ perf report

Samples: 15K of event 'cycles'
Event count (approx.): 1234567890
  Children      Self  Command       Shared Object           Symbol
+  42.50%  42.50%  app            libpg.so.5              PQexec
+  28.30%  28.30%  app            libpg.so.5              PQgetResult
+   8.20%   8.20%  app            app                     query_engine
+   6.10%   6.10%  libc.so.6      libc.so.6               __memmove_avx_unaligned_erms

45% CPU time in PostgreSQL network calls = database bottleneck

✦ Check database query performance
$ psql -c "SELECT query, calls, mean_time FROM pg_stat_statements ORDER BY mean_time DESC LIMIT 5"
query                                          | calls | mean_time
SELECT * FROM orders WHERE user_id = ?         | 45000 | 145.3ms
SELECT * FROM inventory WHERE sku IN (...)     | 23000 | 98.2ms
SELECT COUNT(*) FROM transactions WHERE ...    | 12000 | 67.5ms

First query: 45k calls × 145ms = 1 hour CPU per hour!

✦ Check indexes
$ psql -c "EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 123"
Seq Scan on orders  (cost=0.00..450000.00 rows=500 width=120)
  Filter: (user_id = 123)
  Rows Removed by Filter: 9999500

Full table scan = NO INDEX on user_id

[FIX]
$ psql -c "CREATE INDEX idx_orders_user_id ON orders(user_id)"
$ psql -c "ANALYZE orders"

Result: Query time drops from 145ms to 2ms`;
  }

  getCacheTune() {
    return `[OPTIMIZATION GUIDE] Kernel page cache tuning

Default: Kernel aggressively caches disk I/O
Problem: Can cause excessive eviction of application memory

[CURRENT SETTINGS]
$ sysctl vm.dirty_ratio vm.dirty_background_ratio vm.swappiness
vm.dirty_ratio = 20           (20% of RAM before fsync)
vm.dirty_background_ratio = 10 (10% triggers background flush)
vm.swappiness = 60            (swap pages aggressively)

[DIAGNOSIS]
$ vmstat 1 5
 procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
r  b   swpd   free   buff  cache   si   so    bi    bo   in    cs us sy id wa
2  1  100000 500000 2000000 8000000  50   200  1000 5000 2000 1500 40 20 20 20

High swap-out (so=200) = kernel evicting app memory while cache is large

[OPTIMIZATION FOR IN-MEMORY APP (Redis/App Cache)]
$ cat > /etc/sysctl.d/99-cache-tune.conf << EOF
vm.swappiness = 10          (prefer cache over swap)
vm.dirty_ratio = 50         (let app write more before fsync)
vm.dirty_background_ratio = 25
vm.dirty_writeback_centisecs = 3000 (less frequent flushes)
EOF

$ sysctl -p /etc/sysctl.d/99-cache-tune.conf

[VERIFICATION]
$ vmstat 1 5
    swpd   free   buff  cache   si   so
  100000 800000 3000000 8000000  5    2

Swap activity dropped 50% with less eviction`;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TerminalPortfolio();
});

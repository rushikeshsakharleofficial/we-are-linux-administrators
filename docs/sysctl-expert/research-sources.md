# Sysctl Expert Research Sources

Primary references used for this subskill:

- Linux Kernel Documentation: Documentation for `/proc/sys/` — https://docs.kernel.org/admin-guide/sysctl/index.html
- Linux Kernel Documentation: `/proc/sys/vm/` — https://docs.kernel.org/admin-guide/sysctl/vm.html
- Linux Kernel Documentation: `/proc/sys/fs/` — https://docs.kernel.org/admin-guide/sysctl/fs.html
- Linux Kernel Documentation: `/proc/sys/kernel/` — https://docs.kernel.org/admin-guide/sysctl/kernel.html
- Linux Kernel Documentation: `/proc/sys/net/` — https://docs.kernel.org/admin-guide/sysctl/net.html
- Linux Kernel Documentation: IP sysctl — https://docs.kernel.org/networking/ip-sysctl.html
- Linux man-pages: `sysctl(8)` — https://man7.org/linux/man-pages/man8/sysctl.8.html
- Linux man-pages: `sysctl.d(5)` — https://man7.org/linux/man-pages/man5/sysctl.d.5.html

Research conclusions encoded in the skill:

1. Live discovery is mandatory because the sysctl tree depends on kernel, modules, architecture, interfaces, namespaces, and distro defaults.
2. Kernel docs repeatedly warn that some sysctls can break systems; tuning should be conservative and evidence-based.
3. `sysctl.d` ordering and optional `-key=value` handling must be understood to prevent boot-time failures or surprising precedence.
4. Memory/network/filesystem sysctl changes should be tied to observed metrics, not copied as a universal performance file.
5. Many "popular" tuning snippets are risky: cron drop_caches, global TIME_WAIT reuse, abort_on_overflow, huge socket defaults, strict rp_filter everywhere, and blind dirty ratio changes.

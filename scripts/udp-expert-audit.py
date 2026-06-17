#!/usr/bin/env python3
"""Read-only UDP Expert audit helper for linux-admin plugin."""
from __future__ import annotations
import json, platform, subprocess
COMMANDS=['ss -uapn 2>/dev/null | head -200 || ss -uan | head -200', 'ss -u -i -a 2>/dev/null | head -200 || true', 'sysctl net.ipv4.udp_mem net.ipv4.udp_rmem_min net.ipv4.udp_wmem_min net.core.rmem_default net.core.rmem_max net.core.netdev_max_backlog net.ipv4.ipfrag_high_thresh net.ipv4.ipfrag_time 2>/dev/null || true', 'ip -s link', 'ip -s -s neigh show 2>/dev/null | head -120 || true', 'nstat -az 2>/dev/null | grep -Ei "Udp|Ip.*Frag|InErrors|Rcvbuf|NoPorts|InCsumErrors" | head -160 || true', 'netstat -su 2>/dev/null || true', 'conntrack -S 2>/dev/null || true']
def run(cmd, timeout=8):
    try:
        p=subprocess.run(cmd, shell=True, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, timeout=timeout)
        return {"cmd":cmd,"rc":p.returncode,"output":p.stdout.strip()[-9000:]}
    except Exception as e:
        return {"cmd":cmd,"rc":None,"error":str(e)}
def main():
    print(json.dumps({"read_only":True,"expert":"udp-expert","host":platform.node(),"kernel":platform.release(),"commands":[run(c) for c in COMMANDS]}, indent=2, sort_keys=True))
if __name__=='__main__': main()

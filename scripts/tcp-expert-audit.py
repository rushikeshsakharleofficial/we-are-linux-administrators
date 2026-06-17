#!/usr/bin/env python3
"""Read-only TCP Expert audit helper for linux-admin plugin."""
from __future__ import annotations
import json, platform, subprocess
COMMANDS=['ss -tanpi 2>/dev/null | head -200 || ss -tan | head -200', 'ss -s', 'ss -ltnp 2>/dev/null || ss -ltn', 'sysctl net.ipv4.tcp_max_syn_backlog net.core.somaxconn net.ipv4.tcp_syncookies net.ipv4.tcp_tw_reuse net.ipv4.tcp_fin_timeout net.ipv4.tcp_keepalive_time net.ipv4.tcp_congestion_control net.ipv4.tcp_available_congestion_control net.ipv4.tcp_mtu_probing net.ipv4.tcp_abort_on_overflow 2>/dev/null || true', 'ip -s link', 'ip route get 1.1.1.1 2>/dev/null || true', 'nstat -az 2>/dev/null | grep -Ei "Tcp|TCPSyn|Listen|Retrans|Timeout|Embryonic|Prune|Reset" | head -120 || true', 'netstat -s 2>/dev/null | grep -Ei "tcp|listen|retrans|reset|timeout|segments" | head -120 || true']
def run(cmd, timeout=8):
    try:
        p=subprocess.run(cmd, shell=True, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, timeout=timeout)
        return {"cmd":cmd,"rc":p.returncode,"output":p.stdout.strip()[-9000:]}
    except Exception as e:
        return {"cmd":cmd,"rc":None,"error":str(e)}
def main():
    print(json.dumps({"read_only":True,"expert":"tcp-expert","host":platform.node(),"kernel":platform.release(),"commands":[run(c) for c in COMMANDS]}, indent=2, sort_keys=True))
if __name__=='__main__': main()

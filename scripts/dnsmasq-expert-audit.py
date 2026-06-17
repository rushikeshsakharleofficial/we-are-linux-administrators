#!/usr/bin/env python3
"""Read-only dnsmasq audit."""

from __future__ import annotations
import json, shutil, subprocess, sys, os
from pathlib import Path

def run(cmd, timeout=10):
    if shutil.which(cmd[0]) is None:
        return {"cmd": cmd, "rc": None, "stdout": "", "stderr": f"{cmd[0]} not found"}
    try:
        p=subprocess.run(cmd,text=True,capture_output=True,timeout=timeout)
        return {"cmd":cmd,"rc":p.returncode,"stdout":p.stdout[-20000:],"stderr":p.stderr[-5000:]}
    except Exception as e:
        return {"cmd":cmd,"rc":None,"stdout":"","stderr":str(e)}

def sh(s, timeout=10): return run(['bash','-lc',s], timeout)

def main():
    report={"tool":"dnsmasq-expert-audit","read_only":True,"commands":{
        "version": sh('dnsmasq --version 2>/dev/null || true'),
        "syntax": sh('dnsmasq --test 2>&1 || true'),
        "service": sh('systemctl status dnsmasq NetworkManager libvirtd 2>/dev/null | sed -n "1,220p" || true'),
        "ports": sh('ss -ulpn \'sport = :53\' 2>/dev/null || true; ss -ulpn \'sport = :67\' 2>/dev/null || true'),
        "configs": sh('find /etc/dnsmasq.conf /etc/dnsmasq.d /etc/NetworkManager -maxdepth 3 -type f 2>/dev/null | sort | sed -n "1,240p"'),
        "key_options": sh('grep -RInE "^(server|address|dhcp-range|dhcp-host|interface|listen-address|bind-interfaces|conf-dir|domain|local|bogus-priv|stop-dns-rebind|dnssec)" /etc/dnsmasq.conf /etc/dnsmasq.d 2>/dev/null | sed -n "1,240p" || true'),
        "logs": sh('journalctl -u dnsmasq -b --no-pager -n 200 2>/dev/null || true')},
        "recommendations":["Run dnsmasq --test before reload.","Avoid DHCP conflicts on same L2 segment.","Check for DNS forwarding loops and resolver conflicts."]}
    json.dump(report,sys.stdout,indent=2,sort_keys=True); print()
if __name__=='__main__': main()

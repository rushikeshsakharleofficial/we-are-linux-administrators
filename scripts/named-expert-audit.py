#!/usr/bin/env python3
"""Read-only BIND/named audit."""

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
    report={"tool":"named-expert-audit","read_only":True,"commands":{
        "version": sh('named -v 2>/dev/null || named -V 2>/dev/null || true'),
        "checkconf": sh('named-checkconf -z 2>&1 | sed -n "1,260p" || true',20),
        "rndc_status": sh('rndc status 2>/dev/null || true'),
        "service": sh('systemctl status named bind9 2>/dev/null | sed -n "1,220p" || true'),
        "ports": sh('ss -tulpn \'sport = :53\' 2>/dev/null || true; ss -ulpn \'sport = :53\' 2>/dev/null || true'),
        "config_inventory": sh('find /etc/named* /etc/bind /var/named -maxdepth 3 -type f 2>/dev/null | sort | sed -n "1,300p"'),
        "zones_grep": sh('grep -RInE "^[[:space:]]*zone[[:space:]]+|allow-transfer|allow-recursion|recursion|dnssec|forwarders" /etc/named* /etc/bind 2>/dev/null | sed -n "1,240p" || true'),
        "logs": sh('journalctl -u named -u bind9 -b --no-pager -n 200 2>/dev/null || true')},
        "recommendations":["Run named-checkconf -z before reload.","Restrict recursion and zone transfers.","Validate with dig from client and external networks."]}
    json.dump(report,sys.stdout,indent=2,sort_keys=True); print()
if __name__=='__main__': main()

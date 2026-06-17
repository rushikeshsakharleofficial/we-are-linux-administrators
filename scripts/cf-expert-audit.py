#!/usr/bin/env python3
"""Read-only Cloudflare local/MCP readiness audit."""

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
    env={k:'<redacted>' for k in os.environ if k.upper().startswith(('CLOUDFLARE','CF_'))}
    report={"tool":"cf-expert-audit","read_only":True,"env_vars_present":env,"commands":{
        "cloudflared": sh('cloudflared --version 2>/dev/null || true'),
        "wrangler": sh('wrangler --version 2>/dev/null || true'),
        "mcp_configs": sh('find . ~/.config -maxdepth 4 -type f 2>/dev/null | grep -Ei "mcp|claude|cursor|windsurf" | sed -n "1,120p" || true'),
        "dns_tools": sh('command -v dig; command -v curl; command -v jq || true')},
        "recommendations":["Use Cloudflare MCP/API read-only export before changes.","Use least-privilege OAuth/API token scopes.","Change one DNS/ruleset item at a time with rollback."]}
    json.dump(report,sys.stdout,indent=2,sort_keys=True); print()
if __name__=='__main__': main()

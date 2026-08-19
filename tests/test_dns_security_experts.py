#!/usr/bin/env python3
from pathlib import Path
import json, subprocess
ROOT=Path(__file__).resolve().parents[1]
SKILLS=['named-expert','cf-expert','dnsmasq-expert','security-expert']
BINS=['named-expert-audit','cf-expert-audit','dnsmasq-expert-audit','os-security-expert-audit']
def main():
    for s in SKILLS:
        p=ROOT/'skills'/s/'SKILL.md'; assert p.exists(), p
        txt=p.read_text().lower(); assert 'read-only' in txt or 'read only' in txt or 'universal skill execution contract' in txt; assert 'rollback' in txt
    security_chunk=ROOT/'skills'/'security-expert'/'chunks'/'security-audit.md'
    assert security_chunk.exists(), security_chunk
    for b in BINS:
        p=ROOT/'bin'/b; assert p.exists(), p; assert p.stat().st_mode & 0o111
        out=subprocess.check_output([str(p)],cwd=str(ROOT),text=True,timeout=25)
        data=json.loads(out); assert data['read_only'] is True
        if b == 'os-security-expert-audit':
            assert data['parent_skill'] == 'security-expert'
            assert data['chunk'] == 'chunks/security-audit.md'
            assert data['legacy_command'] is True
    assert not (ROOT/'skills'/'os-security-expert').exists()
    guard=(ROOT/'scripts/linux-safety-guard.py').read_text()
    for token in ['rndc','dnsmasq','cloudflare','auditctl','setenforce']:
        assert token in guard, token
    print('dns and security experts test passed')
if __name__=='__main__': main()

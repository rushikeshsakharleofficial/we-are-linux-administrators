#!/usr/bin/env python3
from pathlib import Path
import json, subprocess
ROOT=Path(__file__).resolve().parents[1]
def main():
    for s in ['tcp-expert','udp-expert']:
        p=ROOT/'skills'/s/'SKILL.md'
        assert p.exists(), p
        txt=p.read_text().lower()
        assert 'read-only' in txt and 'rollback' in txt
        b=ROOT/'bin'/f'{s}-audit'
        assert b.exists() and (b.stat().st_mode & 0o111), b
        data=json.loads(subprocess.check_output([str(b)], cwd=str(ROOT), text=True, timeout=20))
        assert data['read_only'] is True
    tcp=(ROOT/'skills/tcp-expert/SKILL.md').read_text().lower()
    udp=(ROOT/'skills/udp-expert/SKILL.md').read_text().lower()
    assert 'syn backlog' in tcp and 'time_wait' in tcp
    assert 'datagram' in udp and 'fragmentation' in udp
    print('tcp udp experts test passed')
if __name__=='__main__': main()

#!/usr/bin/env python3
from pathlib import Path
import json, subprocess

ROOT=Path(__file__).resolve().parents[1]


def main():
    parent=ROOT/'skills/network/SKILL.md'
    assert parent.exists(), parent
    parent_text=parent.read_text().lower()
    assert 'chunks/tcp.md' in parent_text and 'chunks/udp.md' in parent_text
    assert 'rollback' in parent_text and 'read-only' in parent_text

    expected={
        'tcp': ('chunks/tcp.md', ('syn backlog', 'time_wait')),
        'udp': ('chunks/udp.md', ('datagram', 'fragmentation')),
    }
    for protocol, (chunk, markers) in expected.items():
        p=ROOT/'skills/network'/chunk
        assert p.exists(), p
        txt=p.read_text().lower()
        for marker in markers:
            assert marker in txt, (p, marker)

        b=ROOT/'bin'/f'{protocol}-expert-audit'
        assert b.exists() and (b.stat().st_mode & 0o111), b
        data=json.loads(subprocess.check_output([str(b)], cwd=str(ROOT), text=True, timeout=20))
        assert data['read_only'] is True
        assert data['legacy_command'] is True
        assert data['parent_skill'] == 'network'
        assert data['chunk'] == chunk
        assert 'expert' not in data

    assert not (ROOT/'skills/tcp-expert').exists()
    assert not (ROOT/'skills/udp-expert').exists()
    print('tcp udp network chunk test passed')


if __name__=='__main__': main()

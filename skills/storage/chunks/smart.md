# SMART and physical-disk health

Use this chunk after the `storage` parent has identified suspected physical-media health, wear, temperature, interface-error, or replacement-risk evidence.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Keep diagnostics read-only first, verify backup/redundancy before replacement work, and do not stress-test suspect production media merely to obtain more evidence.

## Evidence

```bash
lsblk -d -o NAME,SIZE,ROTA,MODEL,SERIAL,TRAN 2>/dev/null || true
smartctl -a /dev/<device> 2>/dev/null || true
smartctl -x /dev/<device> 2>/dev/null | head -220 || true
dmesg -T | grep -Ei 'I/O error|medium error|media error|uncorrect|reset|ata|nvme|scsi' | tail -100
```

Identify the device model/type and its storage role. Interpret attributes by drive type and vendor semantics rather than comparing every raw value to one generic threshold.

## Risk signals

- Do not trust an overall SMART `PASSED` result by itself.
- Reallocated, pending or uncorrectable sectors/media errors require correlation with trend and kernel I/O evidence.
- NVMe media/data-integrity errors, critical warnings and spare/wear indicators deserve device-specific interpretation.
- Interface/CRC errors can indicate cabling/backplane/controller problems rather than failing media.
- Temperature and wear should be judged against device specifications and workload history.

## Safe workflow

1. Identify the exact device and storage role.
2. Review relevant SMART/NVMe health indicators and recent changes where available.
3. Correlate with kernel I/O/reset/media errors.
4. Check RAID/redundancy and backup state.
5. Classify risk: monitor, schedule replacement, or urgent migration/replacement.
6. Define replacement/rebuild sequence and recovery path before touching the device.

## Stop conditions

Do not run destructive tests, repeated heavy stress tests, secure erase, firmware actions, or replacement/rebuild commands against a suspect production disk without verified redundancy/backups and an explicit recovery plan.

Return a concise health summary, risk level, supporting evidence, safe next action, recovery/rollback considerations and validation. Route array-state decisions to `raid-expert` and SAN/path issues to `multipath-expert`/`iscsi-expert` as appropriate.

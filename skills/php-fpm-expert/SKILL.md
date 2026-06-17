# php-fpm-expert

Use this skill for PHP-FPM pool sizing, process manager modes, max children, slowlog, status/ping endpoints, listen socket issues, and web-server FastCGI integration.

## Purpose

Stabilize PHP workloads with evidence-based pool tuning and safe observability.

## Evidence first

Ask for pool config, FPM status snapshot if available, web-server FastCGI block, memory headroom, and slowlog snippet.

## Safe workflow

1. map web server to pool/listen target
2. validate socket or TCP access
3. inspect process manager mode
4. estimate memory per child
5. enable status/slowlog safely when needed
6. adjust one variable at a time
7. validate latency and error logs

## Anti-patterns

- blindly increasing max children
- exposing status pages publicly
- changing FPM and web server together without rollback
- tuning without slowlog/status evidence

## Output format

Return pool diagnosis, memory sizing notes, safe config plan, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for one pool file, one status snapshot, and one FastCGI location block only.

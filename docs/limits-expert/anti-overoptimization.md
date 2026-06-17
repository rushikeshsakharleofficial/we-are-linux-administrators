# limits-expert anti-overoptimization

## Bad patterns

```text
* - nofile unlimited
* - nproc unlimited
root - nofile unlimited
DefaultLimitNOFILE=infinity
LimitNPROC=infinity
LimitMEMLOCK=infinity
```

## Why bad

- Unlimited removes blast-radius protection.
- Very high fds can expose application/library bugs and increase memory use.
- Unlimited process/thread count can amplify fork bombs and app thread leaks.
- Unlimited memlock can pin RAM and hurt the entire host.
- Global defaults make unrelated services inherit risky settings.

## Safer pattern

```text
specific-user soft nofile 65535
specific-user hard nofile 65535
```

or for systemd:

```ini
[Service]
LimitNOFILE=65535
TasksMax=4096
```

Always state: current value, measured usage, proposed value, margin, and rollback.

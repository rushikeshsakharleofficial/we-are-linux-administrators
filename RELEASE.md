# Release 1.17.17

## Package

- NPM package version: `1.17.17`
- Skill count: `106`
- Package name: `linux-admin`

## Added

- `load-balancer-expert` router and recommendation skill
- `nginx-proxy-expert`
- `f5-expert`
- `lvs-ipvs-expert`
- `keepalived-expert`
- `dns-gslb-expert`
- `cloud-lb-expert`

## Updated

- Package metadata now reflects 106 expert skills.
- README and plugin metadata are aligned to 106 skills.
- Website runtime copy injects new load balancer skill cards.
- NPM publish workflow added for GitHub Releases and manual workflow dispatch.

## Publishing

The workflow `.github/workflows/npm-publish.yml` publishes to npm when a GitHub Release is published or when manually dispatched.

Required repository secret:

```text
NPM_TOKEN
```

The token must have permission to publish the `linux-admin` package to the npm registry.

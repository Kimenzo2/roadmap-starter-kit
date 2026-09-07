# Cloudflare deployment

This Roadmap is configured as a SvelteKit Worker with Cloudflare Static Assets and the shared `productclient-tenants` D1 registry. It is a separate Worker from the Documentation Starter Kit and the Status Page.

## Hosting model

```text
productclient.com
        -> ProductClient Mother App

*.productclient.com
        -> Documentation Worker

roadmap.productclient.com
        -> Roadmap Worker / neutral ProductClient roadmap

*.roadmap.productclient.com
        -> Roadmap Worker (tenant hostnames, resolver ready)
        -> shared productclient-tenants D1 registry
```

The tenant resolver mirrors the Status Page Worker: the request hostname is resolved server-side against the configured tenant domain (`PUBLIC_ROADMAP_TENANT_DOMAIN`, default `roadmap.productclient.com`). A tenant hostname such as `acme.roadmap.productclient.com` is looked up in the shared registry; unknown or `suspended` slugs return 404. The neutral `roadmap.productclient.com` host keeps the ProductClient branding and content.

Roadmap content is currently the shared starter (`roadmap.json`) across tenants while D1 supplies tenant identity — same model as the Documentation and Status Workers. Customer-editable content should be added behind authenticated APIs/webhooks later.

## Certificate caveat (read before enabling)

A nested wildcard such as `*.roadmap.productclient.com` is **not** covered by Universal SSL on a full zone — the zone's Universal SSL only covers `*.productclient.com`. The `wrangler.jsonc` route for tenant hostnames is committed and ready, but do not deploy it as live until one of these is in place:

- enable **Advanced Certificate Manager** on the `productclient.com` zone and order a certificate covering `*.roadmap.productclient.com`, or
- register customer hostnames individually through Cloudflare for SaaS / Custom Hostnames.

## Provisioning

Provisioning stays centralized on the Documentation Worker's `provision.productclient.com` host or the ProductClient Mother App's tenant sync — one slug record in the shared D1 registry maps the tenant to docs, status, and roadmap hostnames. No per-tenant record belongs to this Worker.

## Deploy

```powershell
bun run check
bun run build
bunx wrangler deploy --dry-run   # smoke test
bun run cf:deploy                # real deploy
```

The checked-in workflow deploys on pushes to `main`. The `workers.dev` URL remains a smoke-test target.

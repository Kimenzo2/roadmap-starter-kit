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

roadmap.productclient.com/{slug}[/chapter]
        -> Roadmap Worker (path-based tenants, live)
        -> shared productclient-tenants D1 registry

*.roadmap.productclient.com
        -> Roadmap Worker (hostname tenants, resolver ready)
```

## Path-based tenants (primary, live)

Tenants are served from first path segments on the neutral host itself:
`roadmap.productclient.com/faith` renders Faith's roadmap and
`roadmap.productclient.com/faith/now` renders a tenant chapter view. This needs
no second-level wildcard or certificate coverage because the host is already
covered by Universal SSL.

- `src/hooks.server.ts` resolves the tenant server-side from the original URL
  and 404s unknown or suspended slugs; neutral chapter URLs (`/now`, `/next`,
  `/later`) keep serving the ProductClient roadmap untouched.
- `src/hooks.ts` (the shared `reroute` hook, SvelteKit's equivalent of the
  Mintlify subpath proxy) strips the tenant segment before route matching, so
  the browser URL keeps the prefix while the existing root routes render.
- Nav and footer links are prefixed with the tenant base so navigation stays
  inside the tenant.

A tenant slug can never shadow a chapter: chapter ids are checked first and
customers cannot claim them (they are reserved slugs in Postgres).

## Hostname tenants (future)

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

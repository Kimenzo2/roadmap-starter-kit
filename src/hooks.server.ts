import { error } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import { roadmapSite } from '$lib/config/roadmap';
import { findTenant, resolveTenant, type TenantBindings } from '$lib/server/tenant';

export const handle: Handle = async ({ event, resolve }) => {
	const platform = event.platform as (App.Platform & { env?: TenantBindings }) | undefined;
	const platformEnv = platform?.env;
	const tenantDomain = platformEnv?.PUBLIC_ROADMAP_TENANT_DOMAIN ?? 'roadmap.productclient.com';
	const tenant = resolveTenant(event.url.hostname, tenantDomain);

	if (tenant.isTenantSubdomain) {
		if (!platformEnv?.DB) {
			throw error(503, 'Tenant storage is not configured');
		}

		const record = await findTenant(platformEnv.DB, tenant.slug!);
		if (!record || record.status !== 'active') {
			throw error(404, 'Roadmap not found');
		}

		event.locals.tenant = { ...tenant, record };
	} else {
		event.locals.tenant = tenant;
	}

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replaceAll('%roadmapLang%', roadmapSite.site.locale)
	});
};

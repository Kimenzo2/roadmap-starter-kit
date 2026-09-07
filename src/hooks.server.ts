import { error } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import { roadmapSite } from '$lib/config/roadmap';
import { isReservedAppSegment, isSlugShaped } from '$lib/tenantRouting';
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
		// Path-based tenants: the first path segment names the tenant
		// (roadmap.productclient.com/faith/now). Resolution is server-side from
		// the original URL — the reroute hook only remaps routing, so the tenant
		// is never chosen from untrusted client state. Neutral chapter URLs
		// (/now, /next, /later) and reserved app segments keep serving the
		// ProductClient roadmap untouched.
		const segment = event.url.pathname.split('/')[1] ?? '';
		const isNeutralChapter = getChapter(segment) !== undefined;
		if (segment && !isNeutralChapter && !isReservedAppSegment(segment) && isSlugShaped(segment)) {
			if (!platformEnv?.DB) {
				throw error(503, 'Tenant storage is not configured');
			}

			const record = await findTenant(platformEnv.DB, segment);
			if (!record || record.status !== 'active') {
				throw error(404, 'Roadmap not found');
			}

			event.locals.tenant = {
				...tenant,
				slug: record.slug,
				record,
				basePath: `/${record.slug}`
			};

			return resolve(event, {
				transformPageChunk: ({ html }) => html.replaceAll('%roadmapLang%', roadmapSite.site.locale)
			});
		}

		event.locals.tenant = tenant;
	}

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replaceAll('%roadmapLang%', roadmapSite.site.locale)
	});
};

function getChapter(id: string) {
	return roadmapSite.chapters.find((chapter) => chapter.id === id);
}

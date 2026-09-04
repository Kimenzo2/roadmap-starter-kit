import { roadmapSite } from '$lib/config/roadmap';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replaceAll('%roadmapLang%', roadmapSite.site.locale)
	});
};

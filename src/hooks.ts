import type { Reroute } from '@sveltejs/kit';
import { getChapter } from '$lib/config/roadmap';
import { stripFirstSegment } from '$lib/tenantRouting';

/**
 * Path-based tenant routing: the browser URL keeps the tenant prefix
 * (roadmap.productclient.com/faith/now) while route matching sees the
 * internal path (/now). The tenant record itself is resolved server-side in
 * src/hooks.server.ts from the original URL; this reroute only decides which
 * route renders, so it stays pure and runs on the client too.
 *
 * Neutral chapter URLs keep working untouched: /now, /next, /later are known
 * chapters, so they are never treated as tenant segments. A tenant slug can
 * therefore never shadow a chapter, and both live on the same Worker.
 */
export const reroute: Reroute = ({ url }) => {
	const first = url.pathname.split('/')[1] ?? '';
	if (getChapter(first)) return undefined;
	return stripFirstSegment(url.pathname);
};

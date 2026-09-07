/**
 * Shared (client + server) tenant-path routing helpers.
 *
 * Tenant pages live under a first path segment on this Worker's own domain:
 *   roadmap.productclient.com/faith           -> tenant roadmap
 *   roadmap.productclient.com/faith/now       -> tenant chapter view
 *
 * Routing follows the same shape as Mintlify's subpath hosting: the tenant
 * segment is stripped before route matching (see src/hooks.ts reroute), while
 * src/hooks.server.ts resolves the tenant record from the original URL. The
 * two must agree on which first segments belong to the app itself, so the
 * reserved list lives here where both sides can import it.
 */

const slugPattern = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

/**
 * First path segments owned by this app's own surface. A request whose first
 * segment is one of these is never a tenant slug.
 */
const reservedSegments = new Set(['api', 'assets']);

export function isReservedAppSegment(segment: string): boolean {
	return reservedSegments.has(segment);
}

export function isSlugShaped(segment: string): boolean {
	return slugPattern.test(segment);
}

/**
 * Return the pathname with its first segment removed ("/faith/now" -> "/now",
 * "/faith" -> "/"), or undefined when the first segment is not a candidate
 * tenant slug (empty, reserved, or not slug-shaped).
 */
export function stripFirstSegment(pathname: string): string | undefined {
	const segment = pathname.split('/')[1] ?? '';
	if (!segment || !isSlugShaped(segment) || isReservedAppSegment(segment)) return undefined;
	const rest = pathname.slice(segment.length + 1);
	return rest === '' ? '/' : rest;
}

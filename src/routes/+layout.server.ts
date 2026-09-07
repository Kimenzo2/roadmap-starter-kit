import type { LayoutServerLoad } from './$types';

export const load = (({ locals }) => ({
	tenant: locals.tenant
})) satisfies LayoutServerLoad;

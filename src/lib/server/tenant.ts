const defaultTenantDomain = 'roadmap.productclient.com';
const hostnamePattern = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

export type TenantStatus = 'active' | 'suspended';

export type TenantRecord = {
	id: string;
	slug: string;
	displayName: string;
	status: TenantStatus;
	createdAt: string;
	updatedAt: string;
};

export type TenantContext = {
	hostname: string;
	slug: string | null;
	isRootDomain: boolean;
	isTenantSubdomain: boolean;
	record?: TenantRecord;
};

export type TenantDatabase = {
	prepare: (query: string) => {
		bind: (...values: unknown[]) => {
			first: <T>() => Promise<T | null>;
		};
	};
};

export type TenantBindings = {
	DB?: TenantDatabase;
	PUBLIC_ROADMAP_TENANT_DOMAIN?: string;
};

function normalizeDomain(value: string) {
	return value.toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '').replace(/\.$/, '');
}

function subdomainForHost(hostname: string, configuredDomain = defaultTenantDomain): string | null {
	const normalizedHostname = normalizeDomain(hostname);
	const tenantDomain = normalizeDomain(configuredDomain);
	const suffix = `.${tenantDomain}`;

	if (!normalizedHostname.endsWith(suffix)) return null;

	const candidate = normalizedHostname.slice(0, -suffix.length);
	return candidate && !candidate.includes('.') ? candidate : null;
}

export function findTenant(db: TenantDatabase, slug: string): Promise<TenantRecord | null> {
	return db
		.prepare(
			`SELECT id, slug, display_name, status, created_at, updated_at
			 FROM tenants
			 WHERE slug = ?1
			 LIMIT 1`
		)
		.bind(slug)
		.first<Record<string, unknown>>()
		.then((row) => {
			if (!row) return null;

			return {
				id: String(row.id),
				slug: String(row.slug),
				displayName: String(row.display_name),
				status: row.status === 'suspended' ? 'suspended' : 'active',
				createdAt: String(row.created_at),
				updatedAt: String(row.updated_at)
			};
		});
}

/**
 * Resolve a roadmap tenant from the request hostname. The exact
 * roadmap.productclient.com host is the neutral ProductClient roadmap; future
 * customer hostnames are resolved from the namespaced roadmap domain. Keeping
 * the resolution server-side prevents a tenant from being selected from an
 * untrusted client-side query parameter.
 */
export function resolveTenant(hostname: string, configuredDomain = defaultTenantDomain): TenantContext {
	const normalizedHostname = normalizeDomain(hostname);
	const tenantDomain = normalizeDomain(configuredDomain);

	if (normalizedHostname === tenantDomain) {
		return {
			hostname: normalizedHostname,
			slug: null,
			isRootDomain: true,
			isTenantSubdomain: false
		};
	}

	const candidate = subdomainForHost(normalizedHostname, tenantDomain);
	const isValidTenant = candidate !== null && hostnamePattern.test(candidate);

	return {
		hostname: normalizedHostname,
		slug: isValidTenant ? candidate : null,
		isRootDomain: false,
		isTenantSubdomain: isValidTenant
	};
}

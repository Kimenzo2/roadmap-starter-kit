-- Shared with the Documentation Starter Kit's productclient-tenants D1 database.
-- Wrangler records this migration once per database, so deploying this Worker
-- does not create a second tenant registry or duplicate the table.
CREATE TABLE IF NOT EXISTS tenants (
	id TEXT PRIMARY KEY NOT NULL,
	slug TEXT NOT NULL UNIQUE,
	display_name TEXT NOT NULL,
	status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
	created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
	updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS tenants_status_idx ON tenants (status);

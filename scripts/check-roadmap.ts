import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RoadmapSchema } from '../src/lib/config/schema.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const raw = JSON.parse(readFileSync(resolve(root, 'roadmap.json'), 'utf8'));

const parsed = RoadmapSchema.safeParse(raw);
if (!parsed.success) {
	console.error('roadmap.json is invalid:');
	for (const issue of parsed.error.issues) {
		console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
	}
	process.exit(1);
}

const chapters = parsed.data.chapters.length;
const items = parsed.data.chapters.reduce((n, c) => n + c.items.length, 0);
console.error(`roadmap.json OK — ${chapters} chapters, ${items} items`);

import { env } from '$env/dynamic/public';
import raw from '../../../roadmap.json';
import { RoadmapSchema, type Chapter, type Item, type RoadmapConfig } from './schema';

function overlayEnv(config: RoadmapConfig): RoadmapConfig {
	const name = env.PUBLIC_ROADMAP_NAME?.trim();
	const logoUrl = env.PUBLIC_ROADMAP_LOGO_URL?.trim();
	const locale = env.PUBLIC_ROADMAP_LOCALE?.trim();
	if (!name && !logoUrl && !locale) return config;
	return {
		...config,
		site: {
			...config.site,
			...(name ? { name } : {}),
			...(locale ? { locale } : {}),
			logo: logoUrl ? { ...config.site.logo, src: logoUrl } : config.site.logo,
			icon: logoUrl ?? config.site.icon
		}
	};
}

export const roadmapSite: RoadmapConfig = overlayEnv(RoadmapSchema.parse(raw));

export type { Chapter, Item };

export function getChapter(id: string): Chapter | undefined {
	return roadmapSite.chapters.find((c) => c.id === id);
}

export function stageLabel(key: string): string {
	return roadmapSite.stages[key]?.label ?? key;
}

export function confidenceLabel(key: string): string {
	return roadmapSite.confidence[key]?.label ?? key;
}

export function navLinks(): { href: string; label: string }[] {
	const { allLabel, showCounts, countSeparator } = roadmapSite.navigation;
	return [
		{ href: '/', label: allLabel },
		...roadmapSite.chapters.map((c) => ({
			href: `/${c.id}`,
			label: showCounts ? `${c.label} ${countSeparator} ${c.items.length}` : c.label
		}))
	];
}

export function formatCopy(template: string, vars: Record<string, string | number> = {}): string {
	const withYear = template.replaceAll('{year}', String(new Date().getFullYear()));
	return withYear.replaceAll(/\{(\w+)\}/g, (m, k: string) =>
		k in vars ? String(vars[k]) : m
	);
}

export function pageTitle(title: string): string {
	return formatCopy(roadmapSite.seo.titleTemplate, {
		title,
		site: roadmapSite.site.name
	});
}

/** Emits theme.* as CSS vars on the shell wrapper. app.css @theme stays as fallback. */
export function getRoadmapThemeStyle(): string {
	const t = roadmapSite.theme;
	return [
		`--font-sans: ${t.fonts.sans}`,
		`--font-display: ${t.fonts.display}`,
		`--color-roadmap-300: ${t.accent.colors['300']}`,
		`--color-roadmap-500: ${t.accent.colors['500']}`,
		`--color-roadmap-700: ${t.accent.colors['700']}`,
		`--shadow-glow: ${t.glow}`
	].join('; ');
}

export function staggerDelay(chapterIndex: number, itemIndex: number): number {
	const s = roadmapSite.theme.motion.stagger;
	return Math.min(chapterIndex * s.perChapter + itemIndex * s.perItem, s.max);
}

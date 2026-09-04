import { z } from 'zod';

const logoSchema = z.object({
	src: z.string().min(1),
	alt: z.string().min(1)
});

export const RoadmapSchema = z
	.object({
		$schema: z.string().optional(),
		site: z.object({
			name: z.string().min(1).max(80),
			tagline: z.string().min(1),
			description: z.string().min(1),
			url: z.string().url(),
			locale: z.string().min(1),
			logo: logoSchema,
			icon: z.string().min(1),
			favicon: z.string().min(1)
		}),
		seo: z.object({
			titleTemplate: z.string().refine((s) => s.includes('{title}') && s.includes('{site}'), {
				message: 'seo.titleTemplate must contain {title} and {site}'
			}),
			defaultTitle: z.string().min(1),
			description: z.string().min(1),
			themeColor: z.string().min(1),
			ogImage: z.string().min(1)
		}),
		navigation: z.object({
			ariaLabel: z.string().min(1),
			allLabel: z.string().min(1),
			showCounts: z.boolean(),
			countSeparator: z.string().min(1)
		}),
		copy: z.object({
			heroSubtitle: z.string().min(1),
			chapterSuffix: z.string().min(1),
			skipLink: z.string().min(1),
			emptyChapterTitle: z.string().min(1),
			emptyChapterSummary: z.string().min(1)
		}),
		stages: z.record(z.string(), z.object({ label: z.string().min(1) })),
		confidence: z.record(z.string(), z.object({ label: z.string().min(1) })),
		chapters: z
			.array(
				z.object({
					id: z
						.string()
						.regex(/^[a-z0-9-]+$/, 'chapters[].id must be a kebab-case slug'),
					label: z.string().min(1),
					hint: z.string().min(1),
					items: z
						.array(
							z.object({
								stage: z.string().min(1),
								title: z.string().min(1),
								outcome: z.string().min(1),
								themes: z.array(z.string().min(1)).min(1),
								confidence: z.string().min(1),
								live: z.boolean().optional()
							})
						)
						.min(1)
				})
			)
			.min(1),
		theme: z.object({
			fonts: z.object({
				sans: z.string().min(1),
				display: z.string().min(1)
			}),
			accent: z.object({
				hue: z.number(),
				colors: z.object({
					'300': z.string().min(1),
					'500': z.string().min(1),
					'700': z.string().min(1)
				})
			}),
			glow: z.string().min(1),
			timeline: z.object({
				orientation: z.enum(['horizontal', 'vertical']),
				rail: z.string().min(1),
				liveGlow: z.boolean()
			}),
			motion: z.object({
				rise: z.string().min(1),
				fade: z.string().min(1),
				stagger: z.object({
					perChapter: z.number().nonnegative(),
					perItem: z.number().nonnegative(),
					max: z.number().nonnegative()
				})
			})
		}),
		footer: z.object({
			description: z.string().min(1),
			links: z.array(z.object({ label: z.string().min(1), href: z.string().min(1) })),
			bottomTemplate: z.string().min(1)
		}),
		tenant: z.object({
			domain: z.string().min(1)
		})
	})
	.superRefine((v, ctx) => {
		const ids = v.chapters.map((c) => c.id);
		if (new Set(ids).size !== ids.length) {
			ctx.addIssue({ code: 'custom', message: 'chapters[].id must be unique' });
		}
		for (const ch of v.chapters) {
			for (const it of ch.items) {
				if (!(it.stage in v.stages)) {
					ctx.addIssue({ code: 'custom', message: `unknown stage "${it.stage}"` });
				}
				if (!(it.confidence in v.confidence)) {
					ctx.addIssue({ code: 'custom', message: `unknown confidence "${it.confidence}"` });
				}
			}
		}
	});

export type RoadmapConfig = z.infer<typeof RoadmapSchema>;
export type Chapter = RoadmapConfig['chapters'][number];
export type Item = Chapter['items'][number];

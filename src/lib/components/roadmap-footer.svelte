<script lang="ts">
	import { page } from '$app/state';
	import { formatCopy, roadmapSite } from '$lib/config/roadmap';

	const footer = roadmapSite.footer;

	// Path-based tenants keep internal footer links inside their prefix.
	const base = $derived(page.data.tenant?.basePath ?? '');
	const withBase = $derived((href: string) => (href === '/' ? `${base}/` : `${base}${href}`));
</script>

<footer class="mx-auto max-w-2xl px-6 pt-4 pb-12">
	<div class="border-t border-preview-border pt-6">
		<p class="text-sm leading-relaxed text-gray-1100">
			{formatCopy(footer.description, { site: roadmapSite.site.name })}
		</p>
		<div class="mt-4 flex flex-wrap items-center justify-between gap-3">
			<nav aria-label="Footer" class="flex flex-wrap gap-4">
				{#each footer.links as link}
					<a
						href={withBase(link.href)}
						class="text-sm text-gray-1100 transition-colors outline-none hover:text-gray-1200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-1200"
					>
						{formatCopy(link.label, { site: roadmapSite.site.name })}
					</a>
				{/each}
			</nav>
			<p class="text-xs text-gray-1000">
				{formatCopy(footer.bottomTemplate, { site: roadmapSite.site.name })}
			</p>
		</div>
	</div>
</footer>

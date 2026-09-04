<script lang="ts">
	import { page } from '$app/state';
	import { navLinks, roadmapSite } from '$lib/config/roadmap';

	const links = navLinks();
</script>

<nav
	aria-label={roadmapSite.navigation.ariaLabel}
	class="sticky top-4 z-20 mt-8 flex gap-2 rounded-2xl border border-preview-border bg-gray-background/80 p-2 backdrop-blur-xl animate-fade"
>
	{#each links as link}
		<a
			href={link.href}
			aria-current={page.url.pathname === link.href ? 'page' : undefined}
			class="rounded-xl px-4 py-2 text-sm tabular-nums transition-colors outline-none hover:text-gray-1200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-1200 active:scale-[0.96] aria-[current=page]:bg-preview-bg aria-[current=page]:text-gray-1200 aria-[current=page]:shadow-border"
			class:text-gray-1100={page.url.pathname !== link.href}
		>
			{link.label}
		</a>
	{/each}
</nav>

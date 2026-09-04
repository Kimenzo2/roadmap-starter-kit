<script lang="ts">
	import '../app.css';
	import RoadmapFooter from '$lib/components/roadmap-footer.svelte';
	import { getRoadmapThemeStyle, roadmapSite } from '$lib/config/roadmap';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={roadmapSite.site.favicon} />
	<meta name="theme-color" content={roadmapSite.seo.themeColor} />
	<meta property="og:site_name" content={roadmapSite.site.name} />
</svelte:head>

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:border focus:border-preview-border focus:bg-preview-bg focus:px-4 focus:py-2 focus:text-sm focus:text-gray-1200"
>
	{roadmapSite.copy.skipLink}
</a>

<div style={getRoadmapThemeStyle()}>
	{@render children()}
	<RoadmapFooter />
</div>

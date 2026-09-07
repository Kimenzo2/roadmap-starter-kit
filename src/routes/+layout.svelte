<script lang="ts">
	import '../app.css';
	import RoadmapFooter from '$lib/components/roadmap-footer.svelte';
	import { getRoadmapThemeStyle, roadmapSite } from '$lib/config/roadmap';

	let { data, children } = $props();

	// Tenant hosts brand the shared roadmap with the tenant's display name;
	// the neutral roadmap.productclient.com host keeps the ProductClient name.
	const siteName = $derived(data.tenant?.record?.displayName ?? roadmapSite.site.name);
</script>

<svelte:head>
	<link rel="icon" href={roadmapSite.site.favicon} />
	<meta name="theme-color" content={roadmapSite.seo.themeColor} />
	<meta property="og:site_name" content={siteName} />
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

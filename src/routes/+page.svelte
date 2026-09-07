<script lang="ts">
	import RoadmapChapter from '$lib/components/roadmap-chapter.svelte';
	import RoadmapNav from '$lib/components/roadmap-nav.svelte';
	import { roadmapSite } from '$lib/config/roadmap';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const site = roadmapSite.site;
	const brandName = $derived(data.tenant?.record?.displayName ?? site.name);
</script>

<svelte:head>
	<title>{roadmapSite.seo.defaultTitle}</title>
	<meta name="description" content={roadmapSite.seo.description} />
	<meta property="og:title" content={roadmapSite.seo.defaultTitle} />
	<meta property="og:description" content={roadmapSite.seo.description} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={roadmapSite.seo.ogImage} />
</svelte:head>

<main id="main-content" class="mx-auto max-w-2xl px-6 py-16">
	<h1
		class="mt-4 flex items-center gap-4 text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-gray-1200 animate-rise sm:gap-5"
	>
		<img
			src={site.logo.src}
			alt=""
			width="64"
			height="64"
			class="h-[0.95em] w-auto shrink-0 rounded-[22%] shadow-border"
		/>
		<span>{brandName}</span>
	</h1>
	<p class="mt-4 text-base leading-relaxed text-pretty text-text-paragraph animate-rise">
		{roadmapSite.copy.heroSubtitle}
	</p>

	<RoadmapNav />

	<div class="mt-12 space-y-14">
		{#each roadmapSite.chapters as chapter, gi}
			<RoadmapChapter {chapter} index={gi} />
		{/each}
	</div>
</main>

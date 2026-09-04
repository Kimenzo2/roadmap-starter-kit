<script lang="ts">
	import RoadmapChapter from '$lib/components/roadmap-chapter.svelte';
	import RoadmapNav from '$lib/components/roadmap-nav.svelte';
	import { roadmapSite } from '$lib/config/roadmap';

	const site = roadmapSite.site;
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
	<div class="mt-4 flex items-center gap-4 animate-rise sm:gap-5">
		<img
			src={site.logo.src}
			alt={site.logo.alt}
			width="64"
			height="64"
			class="size-[clamp(2.75rem,7vw,4rem)] shrink-0 rounded-[22%] shadow-border"
		/>
		<h1
			class="text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-gray-1200"
		>
			{site.name}
		</h1>
	</div>
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

<script lang="ts">
	import appIcon from '$lib/assets/app-icon.svg';
	import RoadmapChapter from '$lib/components/roadmap-chapter.svelte';
	import RoadmapNav from '$lib/components/roadmap-nav.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<main id="main-content" class="mx-auto max-w-2xl px-6 py-16">
	<div class="flex items-center gap-3 animate-fade">
		<img
			src={appIcon}
			alt=""
			width="32"
			height="32"
			class="size-8 shrink-0 rounded-[22%] shadow-border"
		/>
		<p class="text-sm font-medium tracking-[0.05em] text-gray-1100 uppercase">
			ProductClient · Roadmap
		</p>
	</div>
	<h1
		class="mt-4 text-[clamp(2rem,5vw,3rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-gray-1200 animate-rise"
	>
		{data.chapter.label}
	</h1>
	<p class="mt-3 text-base leading-relaxed text-pretty text-text-paragraph animate-rise">
		{data.chapter.hint}. Current thinking, not promises — things move.
	</p>

	<RoadmapNav />

	<div class="mt-10">
		<RoadmapChapter chapter={data.chapter} showHeading={false} />
	</div>
</main>

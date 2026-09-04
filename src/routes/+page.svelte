<script lang="ts">
	import appIcon from '$lib/assets/app-icon.svg';
	import RoadmapChapter from '$lib/components/roadmap-chapter.svelte';
	import RoadmapNav from '$lib/components/roadmap-nav.svelte';
	import { chapters } from '$lib/roadmap';
</script>

<main id="main-content" class="mx-auto max-w-2xl px-6 py-16">
	<div class="mt-4 flex items-center gap-4 animate-rise sm:gap-5">
		<img
			src={appIcon}
			alt="ProductClient app icon"
			width="64"
			height="64"
			class="size-[clamp(2.75rem,7vw,4rem)] shrink-0 rounded-[22%] shadow-border"
		/>
		<h1
			class="text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-gray-1200"
		>
			ProductClient
		</h1>
	</div>
	<p class="mt-4 text-base leading-relaxed text-pretty text-text-paragraph animate-rise">
		Where the platform is heading. Current thinking, not promises — things move.
	</p>

	<RoadmapNav />

	<div class="mt-12 space-y-14">
		{#each chapters as chapter, gi}
			<RoadmapChapter {chapter} index={gi} />
		{/each}
	</div>
</main>

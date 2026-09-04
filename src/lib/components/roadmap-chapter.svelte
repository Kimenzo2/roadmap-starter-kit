<script lang="ts">
	import { cn } from '$lib/utils';
	import RelativeTime from '$lib/components/relative-time.svelte';
	import {
		TimescaleAge,
		TimescaleItem,
		TimescaleRail,
		TimescaleRoot,
		TimescaleTick,
		TimescaleTrack
	} from '$lib/components/ui/timescale/index.js';
	import {
		confidenceLabel,
		roadmapSite,
		stageLabel,
		staggerDelay,
		type Chapter
	} from '$lib/config/roadmap';

	let {
		chapter,
		index = 0,
		showHeading = true
	}: { chapter: Chapter; index?: number; showHeading?: boolean } = $props();

	const timeline = roadmapSite.theme.timeline;
</script>

<section id={chapter.id} aria-label={chapter.label} class="scroll-mt-24">
	{#if showHeading}
		<div class="flex items-baseline gap-3">
			<h2 class="text-2xl font-semibold tracking-[-0.01em] text-gray-1200">{chapter.label}</h2>
			<p class="text-sm text-gray-1100">{chapter.hint}</p>
		</div>
	{/if}

	<TimescaleRoot orientation={timeline.orientation} rail={timeline.rail} class="mt-5">
		<TimescaleTrack>
			<TimescaleRail class="text-preview-border" />
			{#each chapter.items as item, ii}
				<TimescaleItem>
					<TimescaleTick
						class={item.live && timeline.liveGlow ? 'bg-roadmap-500 shadow-glow' : undefined}
					/>
					<TimescaleAge class="text-gray-1100 tracking-[0.05em] whitespace-nowrap uppercase">
						{stageLabel(item.stage)}
					</TimescaleAge>
					<RelativeTime
						datetime={item.updatedAt}
						class="col-start-2 row-start-1 mb-2 justify-self-end text-xs whitespace-nowrap tabular-nums text-gray-1100"
					/>
					<div
						class={cn('preview-card col-start-2 row-start-2 text-left animate-rise')}
						style="animation-delay: {staggerDelay(index, ii)}ms"
					>
						<div class="w-full p-5">
							<h3 class="text-lg font-semibold tracking-[-0.01em] text-balance text-gray-1200">
								{item.title}
							</h3>
							<p class="mt-1 text-sm leading-relaxed text-pretty text-text-paragraph">
								{item.outcome}
							</p>
							<div class="mt-3 flex flex-wrap items-center gap-2">
								{#each item.themes as theme}
									<span
										class="rounded-full border border-preview-border px-2.5 py-0.5 text-xs whitespace-nowrap text-gray-1100"
									>
										{theme}
									</span>
								{/each}
								<span class="text-xs text-gray-1100">{confidenceLabel(item.confidence)}</span>
							</div>
						</div>
					</div>
				</TimescaleItem>
			{/each}
		</TimescaleTrack>
	</TimescaleRoot>
</section>

<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
	};

	let { children }: Props = $props();

	let ref: HTMLDivElement;

	const INTRO_SCROLL_START_HOLD = 200; // ms resting on the first item before scrolling

	// Sweeps a horizontal Timescale to its most recent item on mount using native
	// smooth scroll, so `scroll-fade` stays in sync and there is no scroll stepping.
	$effect(() => {
		const viewport = ref?.querySelector<HTMLElement>('[data-slot="timescale-viewport"]');
		if (!viewport) return;

		const distance = viewport.scrollWidth - viewport.clientWidth;
		if (distance <= 0) return;

		// Respect users who opt out of motion: land at the end without the sweep.
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			viewport.scrollLeft = distance;
			return;
		}

		// A user gesture cancels the native smooth scroll, so no manual interruption
		// handling is needed.
		const timer = window.setTimeout(() => {
			viewport.scrollTo({ left: distance, behavior: 'smooth' });
		}, INTRO_SCROLL_START_HOLD);

		return () => window.clearTimeout(timer);
	});
</script>

<div bind:this={ref} class="contents">
	{@render children?.()}
</div>

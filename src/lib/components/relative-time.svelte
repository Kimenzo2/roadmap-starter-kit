<script lang="ts">
	import { roadmapSite } from '$lib/config/roadmap';
	import { absoluteDate, relativeTime } from '$lib/time';

	let { datetime, class: className, style }: { datetime: string; class?: string; style?: string } = $props();

	const locale = roadmapSite.site.locale;

	// Null until mount: SSR (and no-JS) renders the absolute date, the client
	// upgrades to relative text once. Stable markup, zero hydration mismatch.
	let text = $state<string | null>(null);
	$effect(() => {
		text = relativeTime(datetime, locale);
	});
</script>

<time datetime={datetime} title={absoluteDate(datetime, locale)} class={className} {style}>
	<span class="sr-only">Updated&nbsp;</span>{text ?? absoluteDate(datetime, locale)}
</time>

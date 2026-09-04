<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		children?: Snippet;
	};

	let { class: className, children, ...restProps }: Props = $props();
</script>

<div
	data-slot="timescale-track"
	class={cn(
		'relative flex',
		'group-data-[orientation=horizontal]/timescale:w-max group-data-[orientation=horizontal]/timescale:items-start',
		'group-data-[orientation=vertical]/timescale:w-full group-data-[orientation=vertical]/timescale:flex-col group-data-[orientation=vertical]/timescale:pt-4',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>

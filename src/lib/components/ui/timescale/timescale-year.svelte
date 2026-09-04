<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Props = HTMLAttributes<HTMLParagraphElement> & {
		children?: Snippet;
	};

	let { class: className, children, ...restProps }: Props = $props();
</script>

<p
	data-slot="timescale-year"
	class={cn(
		'text-xs leading-5 font-medium text-gray-1000 tabular-nums',
		'group-data-[orientation=vertical]/timescale:col-start-2 group-data-[orientation=vertical]/timescale:row-start-1',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</p>

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
	data-slot="timescale-content"
	class={cn(
		'w-full py-4 text-left',
		'group-data-[orientation=horizontal]/timescale:mt-4',
		'group-data-[orientation=vertical]/timescale:col-start-2 group-data-[orientation=vertical]/timescale:row-start-2',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>

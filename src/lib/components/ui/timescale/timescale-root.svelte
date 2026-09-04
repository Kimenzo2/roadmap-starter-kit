<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		orientation?: 'horizontal' | 'vertical';
		/** Width of the rail column (CSS length). Defaults to --spacing(14) like upstream. */
		rail?: string;
		children?: Snippet;
	};

	let {
		class: className,
		orientation = 'horizontal',
		rail,
		children,
		...restProps
	}: Props = $props();
</script>

<div
	data-slot="timescale-root"
	data-orientation={orientation}
	class={cn(
		'group/timescale relative flex w-full [--timescale-rail:--spacing(14)]',
		'data-[orientation=vertical]:flex-col',
		className
	)}
	style:--timescale-rail={rail}
	{...restProps}
>
	{@render children?.()}
</div>

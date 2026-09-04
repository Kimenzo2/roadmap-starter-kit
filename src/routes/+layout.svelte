<script lang="ts">
	import '../app.css';
	import appIcon from '$lib/assets/app-icon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={appIcon} />
</svelte:head>

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:border focus:border-preview-border focus:bg-preview-bg focus:px-4 focus:py-2 focus:text-sm focus:text-gray-1200"
>
	Skip to content
</a>

{@render children()}

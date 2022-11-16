<script>
	import Counter from './Counter.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation.</p>
<p><Counter count={data.value} /></p>
<p>Refresh the page and obeserve that the counter value is preserved.</p>

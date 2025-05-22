<script>
import Counter from './Counter.svelte'
/** @type {import('./$types').PageData} */
export let data
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<Counter count={data.value} />
<p>
	The counter value comes from the backend: refresh the page and observe that the counter value is
	preserved. We use Telefunc to communicate between the frontend and the backend.
</p>

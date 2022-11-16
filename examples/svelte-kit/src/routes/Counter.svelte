<script lang="ts">
	import { onCounterIncrement } from './Counter.telefunc';
	export let count: number;
</script>

<div class="counter">
	<span>Counter: {count}</span>
	<button on:click={async () => {count = await onCounterIncrement(-1)}}>-1</button>
	<button on:click={async () => {count = await onCounterIncrement(+1)}}>+1</button>
	<button on:click={async () => {count = await onCounterIncrement(-10)}}>-10</button>
	<button on:click={async () => {count = await onCounterIncrement(+10)}}>+10</button>
</div>

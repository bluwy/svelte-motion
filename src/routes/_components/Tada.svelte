<script>
	import { createTransition } from '$lib';
	import { quintIn } from '$lib/easing';

	let visible = false;

	// surprise keyframes
	const tada = createTransition(
		{
			opacity: [0, 1],
			scale: [0.5, 1],
			rotate: [0, 180]
		},
		{
			easing: quintIn
		}
	);
</script>

<section>
	<label>
		<input type="checkbox" bind:checked={visible} />
		Tada
	</label>
	{#if visible}
		<div class="target" transition:tada />
	{/if}
</section>

<style>
	section {
		height: 100px;
	}

	.target {
		background-color: #ff3e00;
		width: 70px;
		height: 70px;
		border-radius: 1rem;
	}
</style>

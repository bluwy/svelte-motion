<script>
	export let name;
	export let transition;
	export let opts = undefined;
	let visible = false;
</script>

<section>
	<label>
		<input type="checkbox" bind:checked={visible} />
		{name}
	</label>
	{#if visible}
		<div class="target" transition:transition={opts} />
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

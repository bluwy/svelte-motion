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
		<div transition:transition={opts} style="background: red;">{name}</div>
	{/if}
</section>

<style>
	section {
		height: 100px;
	}
</style>

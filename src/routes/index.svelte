<script lang="ts">
	import { fade, blur, slide, scale, fly } from '$lib';
	import {
		fade as _fade,
		blur as _blur,
		slide as _slide,
		scale as _scale,
		fly as _fly
	} from 'svelte/transition';
	import Group from './_components/Group.svelte';
	import Draw from './_components/Draw.svelte';
	import Tada from './_components/Tada.svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div class="box">
	<h2>Web animations</h2>
	<Group name="Fade" transition={fade} />
	<Group name="Blur" transition={blur} />
	<Group name="Slide" transition={slide} />
	<Group name="Scale" transition={scale} />
	<Group name="Fly" transition={fly} opts={{ y: 10 }} />
	<Draw />
</div>

<div class="box">
	<h2>Current transitions</h2>
	<Group name="Fade" transition={_fade} />
	<Group name="Blur" transition={_blur} />
	<Group name="Slide" transition={_slide} />
	<Group name="Scale" transition={_scale} />
	<Group name="Fly" transition={_fly} opts={{ y: 10 }} />
	<Draw />
</div>

<h2>Extra web animations</h2>
<Tada />

<style>
	.box {
		display: inline-block;
		width: 300px;
	}
</style>

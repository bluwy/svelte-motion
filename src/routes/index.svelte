<script lang="ts">
	import { fade, blur, slide, scale, fly } from '$lib';
	import Group from './_group.svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Group name="Fade" transition={fade} />
<Group name="Blur" transition={blur} />
<Group name="Slide" transition={slide} />
<Group name="Scale" transition={scale} />
<Group name="Fly" transition={fly} opts={{ y: 10 }} />

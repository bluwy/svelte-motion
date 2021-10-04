<script lang="ts">
	import { fade, blur, slide, scale, fly } from '$lib';
	import Group from './_components/Group.svelte';
	import Draw from './_components/Draw.svelte';
	import Tada from './_components/Tada.svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<h2>Basic</h2>
<Group name="Fade" transition={fade} />
<Group name="Blur" transition={blur} />
<Group name="Slide" transition={slide} />
<Group name="Scale" transition={scale} />
<Group name="Fly" transition={fly} opts={{ y: 10 }} />
<Draw />

<h2>Extra</h2>
<Tada />

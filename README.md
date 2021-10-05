# svelte-motion

Experimental [web animations](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) support for Svelte transitions, powered by [Motion](https://motion.dev/).

> Not an npm package yet

## Try it out

https://svelte-motion.netlify.app

And read [the code](src/lib).

## Usage

Use with normal Svelte transitions. No API change!

```svelte
<script>
  import { fade } from '$lib'
</script>

{#if visible}
  <div transition:fade />
{/if}
```

## Limitations

- No elastic and bounce easing. Web animations don't support those, so they require dynamic keyframe generation, similar to how Svelte's CSS transition work. Not implemented yet.

- No custom easing functions. Use CSS easing functions instead.

## License

MIT

# svelte-motion

Experimental [web animations](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) support for Svelte transitions, powered by [Motion](https://motion.dev/).

> Not an npm package yet

## Try it out

https://svelte-motion.netlify.app

And read [the code](src/lib).

## Limitations

- No elastic and bounce easing. Web animations don't support those, so they require dynamic keyframe generation, similar to how Svelte's CSS transition work. Not implemented yet.

- No custom easing functions. Use CSS easing functions instead.

## License

MIT

import {
	createTransition,
	fade as _fade,
	blur as _blur,
	fly as _fly,
	slide as _slide,
	scale as _scale,
	draw as _draw
} from './index';
import * as easings from './easing';

function wrapCompat<T extends ReturnType<typeof createTransition>>(transition: T): T {
	// @ts-expect-error
	return function () {
		const { delay, duration, easing } = arguments[1] ?? {};
		if (typeof delay === 'number') arguments[1].delay = delay / 1000;
		if (typeof duration === 'number') arguments[1].duration = duration / 1000;
		if (typeof easing === 'function') arguments[1].easing = easings[easing.name];
		return transition.apply(this, arguments) as T;
	};
}

export const fade = wrapCompat(_fade);
export const blur = wrapCompat(_blur);
export const fly = wrapCompat(_fly);
export const slide = wrapCompat(_slide);
export const scale = wrapCompat(_scale);
export const draw = wrapCompat(_draw);

export { crossfade } from 'svelte/transition';

export type {
	BlurParams,
	CrossfadeParams,
	DrawParams,
	EasingFunction,
	FadeParams,
	FlyParams,
	ScaleParams,
	SlideParams,
	TransitionConfig
} from 'svelte/transition';

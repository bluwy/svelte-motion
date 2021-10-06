import { animate } from 'motion';
import type { AnimationListOptions, Easing, MotionKeyframesDefinition } from 'motion';
import { cubicInOut, cubicOut } from './easing';

// Allow strings for vanilla cubic-bezier syntax
type Options = Omit<AnimationListOptions, 'easing'> & {
	easing?: Easing | Easing[] | string;
};

export function createTransition<T = {}>(
	keyframes:
		| MotionKeyframesDefinition
		| ((el: Element, o: Options & T) => MotionKeyframesDefinition),
	options?: Options
) {
	return (el: Element, opts?: Options & T) => {
		const mergedOptions = {
			delay: 0,
			duration: 0.4,
			...options,
			...opts
		};

		const animation = animate(
			el,
			typeof keyframes === 'function' ? keyframes(el, mergedOptions) : keyframes,
			// @ts-expect-error
			mergedOptions
		);

		el.addEventListener('introstart', handleIntroStart);
		el.addEventListener('outrostart', handleOutroStart);
		el.addEventListener('outroend', handleOutroEnd);

		return {
			delay: (mergedOptions.delay as number) * 1000,
			duration: mergedOptions.duration * 1000
		};

		function handleIntroStart() {
			animation.play();
		}

		function handleOutroStart() {
			animation.reverse();
		}

		function handleOutroEnd() {
			animation.cancel();
			el.removeEventListener('introstart', handleIntroStart);
			el.removeEventListener('outrostart', handleOutroStart);
			el.removeEventListener('outroend', handleOutroEnd);
		}
	};
}

export const fade = createTransition({ opacity: [0, 1] }, { easing: 'linear' });

interface BlurParams {
	amount?: number;
	opacity?: number;
}

export const blur = createTransition<BlurParams>(
	(el, o) => ({
		opacity: [o.opacity ?? 0, getComputedStyle(el).opacity],
		filter: [`blur(${o.amount ?? 5}px)`, 'blur(0px)']
	}),
	{ easing: cubicInOut }
);

interface FlyParams {
	x?: number;
	y?: number;
	opacity?: number;
}

export const fly = createTransition<FlyParams>(
	(el, o) => ({
		opacity: [o.opacity ?? 0, getComputedStyle(el).opacity],
		transform: [`translate(${o.x ?? 0}px, ${o.y ?? 0}px)`, 'translate(0px, 0px)']
	}),
	{ easing: cubicOut }
);

export const slide = createTransition(
	(el) => {
		const style = getComputedStyle(el);
		return {
			overflow: ['hidden', 'visible'],
			height: [0, style.height],
			paddingTop: [0, style.paddingTop],
			paddingBottom: [0, style.paddingBottom],
			marginTop: [0, style.marginTop],
			marginBottom: [0, style.marginBottom],
			borderTopWidth: [0, style.borderTopWidth],
			borderBottomWidth: [0, style.borderBottomWidth]
		};
	},
	{ easing: cubicOut }
);

export interface ScaleParams {
	start?: number;
	opacity?: number;
}

export const scale = createTransition<ScaleParams>(
	(el, o) => ({
		opacity: [o.opacity ?? 0, getComputedStyle(el).opacity],
		transform: [`scale(${o.start ?? 0})`, 'scale(1)']
	}),
	{ easing: cubicOut }
);

export interface DrawParams {
	speed?: number;
}

export const draw = createTransition<DrawParams>(
	(el, o) => {
		// @ts-expect-error
		let len = el.getTotalLength ? el.getTotalLength() : 1;

		const style = getComputedStyle(el);
		if (style.strokeLinecap !== 'butt') {
			len += parseInt(style.strokeWidth);
		}

		if (o.speed === undefined) {
			o.duration = 0.8;
		} else {
			o.duration = len / o.speed;
		}

		return {
			strokeDasharray: [`0 ${len}`, `${len} 0`],
			visibility: 'visible'
		};
	},
	{ easing: cubicInOut }
);

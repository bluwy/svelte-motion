import { animate } from 'motion';
import type { AnimationListOptions, MotionKeyframesDefinition } from 'motion';

type Options = AnimationListOptions & { speed?: number };

export function createTransition<T = {}>(
	keyframes:
		| MotionKeyframesDefinition
		| ((o: Options & T, el: Element) => MotionKeyframesDefinition),
	options?: Options
) {
	return (el: Element, opts?: Options & T) => {
		const mergedOptions = {
			delay: 0,
			duration: 0.2,
			...options,
			...opts
		};

		const animation = animate(
			el,
			typeof keyframes === 'function' ? keyframes(mergedOptions, el) : keyframes,
			mergedOptions
		);

		if (mergedOptions.speed) {
			animation.playbackRate = mergedOptions.speed;
		}

		el.addEventListener('introstart', handleIntroStart);
		el.addEventListener('introend', handleIntroEnd);
		el.addEventListener('outrostart', handleOutroStart);
		el.addEventListener('outroend', handleOutroEnd);

		return {
			delay: (mergedOptions.delay as number) * 1000,
			duration: mergedOptions.duration * 1000
		};

		function handleIntroStart() {
			animation.play();
		}

		function handleIntroEnd() {
			// animation.finish();
		}

		function handleOutroStart() {
			animation.reverse();
		}

		function handleOutroEnd() {
			animation.cancel();
			el.removeEventListener('introstart', handleIntroStart);
			el.removeEventListener('outroend', handleOutroEnd);
		}
	};
}

export const fade = createTransition({ opacity: [0, 1] });

interface BlurParams {
	amount?: number;
	opacity?: number;
}

export const blur = createTransition<BlurParams>((o) => ({
	opacity: [o.opacity ?? 0, undefined],
	filter: [`blur(${o.amount ?? 5}px)`, 'blur(0px)']
}));

interface FlyParams {
	x?: number;
	y?: number;
	opacity?: number;
}

export const fly = createTransition<FlyParams>((o) => ({
	opacity: [o.opacity ?? 0, undefined],
	transform: [`translate(${o.x ?? 0}px, ${o.y ?? 0}px)`, 'translate(0px, 0px)']
}));

export const slide = createTransition((_o, el) => {
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
});

export interface ScaleParams {
	start?: number;
	opacity?: number;
}

export const scale = createTransition<ScaleParams>((o) => ({
	opacity: [o.opacity ?? 0, undefined],
	transform: [`scale(${o.start ?? 0})`, 'scale(1)']
}));

export interface DrawParams {
	start?: number;
	opacity?: number;
}

export const draw = createTransition<ScaleParams>((o, el) => {
	// @ts-expect-error
	let len = el.getTotalLength ? el.getTotalLength() : 1;

	const style = getComputedStyle(el);
	if (style.strokeLinecap !== 'butt') {
		len += parseInt(style.strokeWidth);
	}

	// if (o.speed === undefined) {
	// 	o.duration = 800;
	// } else {
	// 	o.duration = len / o.speed;
	// 	}

	return {
		strokeDasharray: [`0 ${len}`, `${len} 0`],
		visibility: 'visible'
	};
});

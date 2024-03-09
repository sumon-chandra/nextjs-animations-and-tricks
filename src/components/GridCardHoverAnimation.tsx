"use client";
import { MouseEvent } from "react";
import { useAnimate } from "framer-motion";
import { IconType } from "react-icons";
import {
	SiAdobe,
	SiApple,
	SiFacebook,
	SiGoogle,
	SiLinkedin,
	SiShopify,
	SiSoundcloud,
	SiSpotify,
	SiTiktok,
} from "react-icons/si";

export default function GridCardHoverAnimation() {
	return (
		<main className="min-h-screen bg-neutral-100 px-4 py-12">
			<div className="mx-auto max-w-7xl">
				<Cards />
			</div>
		</main>
	);
}

const Cards = () => {
	return (
		<div className="divide-y divide-neutral-900 border border-neutral-900">
			<div className="grid grid-cols-2 divide-x divide-neutral-900">
				<Card Icon={SiGoogle} />
				<Card Icon={SiShopify} />
			</div>
			<div className="grid grid-cols-4 divide-x divide-neutral-900">
				<Card Icon={SiSpotify} />
				<Card Icon={SiSoundcloud} />
				<Card Icon={SiTiktok} />
				<Card Icon={SiApple} />
			</div>
			<div className="grid grid-cols-3 divide-x divide-neutral-900">
				<Card Icon={SiLinkedin} />
				<Card Icon={SiAdobe} />
				<Card Icon={SiFacebook} />
			</div>
		</div>
	);
};

const Card = ({ Icon }: { Icon: IconType }) => {
	const [scope, animate] = useAnimate();

	const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
	const RIGHT_BOTTOM_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
	const LEFT_BOTTOM_CLIP =
		"polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
	const LEFT_TOP_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";
	const RIGHT_TOP_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";

	const ENTRANCE_KEYFRAMES = {
		left: [RIGHT_BOTTOM_CLIP, NO_CLIP],
		bottom: [RIGHT_BOTTOM_CLIP, NO_CLIP],
		top: [RIGHT_BOTTOM_CLIP, NO_CLIP],
		right: [LEFT_TOP_CLIP, NO_CLIP],
	};

	const EXIT_KEYFRAMES = {
		left: [NO_CLIP, RIGHT_TOP_CLIP],
		bottom: [NO_CLIP, RIGHT_TOP_CLIP],
		top: [NO_CLIP, RIGHT_TOP_CLIP],
		right: [NO_CLIP, LEFT_BOTTOM_CLIP],
	};

	const handleMouseEnter = (e: MouseEvent<HTMLDivElement>): void => {
		const side: keyof typeof ENTRANCE_KEYFRAMES =
			getNearestSide(e);
		animate(scope.current, {
			clipPath: ENTRANCE_KEYFRAMES[side],
		});
	};

	const handleMouseLeave = (e: MouseEvent<HTMLDivElement>): void => {
		const side: keyof typeof EXIT_KEYFRAMES = getNearestSide(e);
		animate(scope.current, {
			clipPath: EXIT_KEYFRAMES[side],
		});
	};

	function getNearestSide(
		e: MouseEvent<HTMLDivElement>
	): keyof typeof EXIT_KEYFRAMES {
		const divEl = e.target as HTMLDivElement;
		const box = divEl.getBoundingClientRect();

		const proximityToLeft = {
			proximity: Math.abs(box.left - e.clientX),
			side: "left" as const,
		};
		const proximityToRight = {
			proximity: Math.abs(box.right - e.clientX),
			side: "right" as const,
		};
		const proximityToTop = {
			proximity: Math.abs(box.top - e.clientY),
			side: "top" as const,
		};
		const proximityToBottom = {
			proximity: Math.abs(box.bottom - e.clientY),
			side: "bottom" as const,
		};

		const sortedProximity = [
			proximityToBottom,
			proximityToTop,
			proximityToRight,
			proximityToLeft,
		].sort((a, b) => a.proximity - b.proximity);

		return sortedProximity[0].side;
	}

	return (
		<div
			onMouseEnter={(e: MouseEvent<HTMLDivElement>) =>
				handleMouseEnter(e)
			}
			onMouseLeave={(e: MouseEvent<HTMLDivElement>) =>
				handleMouseLeave(e)
			}
			className="relative grid h-20 w-full place-content-center"
		>
			<Icon className="text-xl sm:text-3xl md:text-4xl text-neutral-900" />
			<div
				ref={scope}
				style={{
					clipPath: "polygon(0 0, 100% 0, 0 0, 0 100%)",
				}}
				className="absolute inset-0 grid place-content-center bg-neutral-800"
			>
				<Icon className="text-xl sm:text-3xl md:text-4xl text-neutral-100" />
			</div>
		</div>
	);
};

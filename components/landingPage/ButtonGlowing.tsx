"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface ButtonGlowingProps {
	text: string;
	href?: string;
}

const ButtonGlowing = ({ text, href = "#" }: ButtonGlowingProps) => {
	return (
		<div className="p-4 flex items-center justify-center">
			<Link
				href={href}
				className="group relative inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-lg text-white transition-all hover:bg-white/50"
			>
				<span className="absolute inset-0 rounded-full bg-linear-to-r from-[#ff1e56] via-[#ff00ff] to-[#00ffff] opacity-70 blur-sm transition-all group-hover:opacity-100" />
				<span className="absolute inset-0.5 rounded-full bg-black/50" />
				<span className="p-2 text-center relative flex items-center gap-2 font-medium">
					{text}
					<ChevronRight className="size-6 transition-transform group-hover:translate-x-1" />
				</span>
			</Link>
		</div>
	);
};

export default ButtonGlowing;

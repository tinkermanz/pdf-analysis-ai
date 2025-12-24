"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Cancelled() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen spce-y-6 text-center">
			<h1 className="font-bold text-2xl">Payment Cancelled</h1>
			<div className="w-[300px] h-0.5 bg-red-300" />
			<p className="text-xl">
				Your payment has been cancelled. No charges were made
			</p>
			<Button>
				<Link href="/pricing">Return to Pricing</Link>
			</Button>
		</div>
	);
}

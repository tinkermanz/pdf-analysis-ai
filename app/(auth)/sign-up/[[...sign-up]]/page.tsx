"use client";

import { SignUp, useUser } from "@clerk/nextjs";

export default function Home() {
	const { isSignedIn } = useUser();

	/* if (!isSignedIn) {
		return <SignUp />;
	}
    */
	<div className="flex justify-center items-center min-h-screen">
		<SignUp />
	</div>;
}

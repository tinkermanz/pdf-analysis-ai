"use client";

import { SignIn, SignUp, useUser } from "@clerk/nextjs";

export default function Home() {
	const { isSignedIn } = useUser();

	/* if (!isSignedIn) {
		return <SignIn />;
	} */

	return (
		<div className="flex justify-center items-center min-h-screen">
			<SignIn />
		</div>
	);
}

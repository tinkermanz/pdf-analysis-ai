import { auth } from "@clerk/nextjs/server";
import "server-only";
import prisma from "./prisma";

export type AuthCheckResult = {
	userId: string | null;
	isAuthenticated: boolean;
	hasSubscription: boolean;
	redirectedTo?: string;
};

export async function checkAuthenticationAndSubscription(
	waitMs = 0
): Promise<AuthCheckResult> {
	const { userId } = await auth();

	if (!userId) {
		return {
			userId: null,
			isAuthenticated: false,
			hasSubscription: false,
			redirectedTo: `/sign-in?redirect_url=/dashboard`,
		};
	}
	if (waitMs > 0) {
		await new Promise((resolve) => setTimeout(resolve, waitMs));
	}

	let subscription = null;
	try {
		subscription = await prisma.subscription.findUnique({
			where: { userId },
		});
	} catch (err) {
		console.error("Error Checking subscription: ", err);
		return {
			userId,
			isAuthenticated: true,
			hasSubscription: false,
		};
	}

	const hasActiveSubscription = subscription?.status === "active";
	return {
		userId,
		isAuthenticated: true,
		hasSubscription: hasActiveSubscription,
		redirectedTo: hasActiveSubscription ? undefined : "/pricing",
	};
}

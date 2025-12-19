import prisma from "@/lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
		if (!webhookSecret) {
			throw new Error(
				"Error: Please add WEBHOOK_SECRET from cleark dashboard to .env"
			);
		}
		const evt = await verifyWebhook(req);

		const eventType = evt.type;
		if (eventType === "user.created") {
			const { id, email_addresses, first_name, last_name } = evt.data;

			const fullName = `${first_name || ""} ${last_name || ""}`.trim();
			// TODO: call prisma to create an user

			await prisma.user.create({
				data: {
					id,
					email: email_addresses[0].email_address,
					name: fullName || null,
				},
			});
		}
		return new Response("Webhook received", { status: 200 });
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error verifying webhook", { status: 400 });
	}
}

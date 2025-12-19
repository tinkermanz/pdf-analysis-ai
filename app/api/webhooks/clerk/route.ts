import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const evt = await verifyWebhook(req);

		// Do something with payload
		// For this guide, log payload to console
		// const { id } = evt.data;
		const eventType = evt.type;

		if (eventType === "user.created") {
			const { id, email, address, first_name, last_name } = evt.data;

			const fullName = `${first_name || ""} ${last_name || ""}`.trim();
			// TODO: call prisma to create an user
		}
		return new Response("Webhook received", { status: 200 });
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error verifying webhook", { status: 400 });
	}
}

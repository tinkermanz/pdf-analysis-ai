import { RedirectComponent } from "@/components/RedirectComponent";
import DashboardContent from "./_components/DashboardContent";
import { checkAuthenticationAndSubscription } from "@/lib/checkAuthSubscription";

export default async function Dashboard() {
	const authCheck = await checkAuthenticationAndSubscription().catch(
		() => null
	);

	if (!authCheck || authCheck.redirectedTo) {
		return <RedirectComponent to={authCheck?.redirectedTo ?? "/"} />;
	}
	return <DashboardContent />;
}

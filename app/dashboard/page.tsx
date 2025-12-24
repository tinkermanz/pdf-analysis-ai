import { checkAuthenticationAndSubscription } from "@/lib/checkAuthSubscription";
import DashboardContent from "./_components/DashboardContent";
import { RedirectComponent } from "@/components/RedirectComponent";

export default async function Dashboard() {
	const { redirectedTo } = await checkAuthenticationAndSubscription();

	if (redirectedTo) {
		return <RedirectComponent to={redirectedTo} />;
	}

	return <DashboardContent />;
}

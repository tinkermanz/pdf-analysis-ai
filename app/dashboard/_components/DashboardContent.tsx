"use client";

import { useUser } from "@clerk/nextjs";
import { CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashboardContent = () => {
	const { user, isLoaded } = useUser();

	const router = useRouter();
	const searchParams = useSearchParams();

	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [summary, setSummary] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

	useEffect(() => {
		const isPaymentSuccess = searchParams?.get("payment") === "success";

		if (isPaymentSuccess) {
			setShowPaymentSuccess(true);
			router.replace("/dashboard");

			const timer = setTimeout(() => {
				setShowPaymentSuccess(false);
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [searchParams, router]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError("");

		if (!e.target.files?.[0]) return;

		setSelectedFile(e.target.files[0]);
	};
	// TODO: handleAnalyze function
	// TODO: formatSummaryContent function

	return (
		<div className="space-y-10 max-w-4xl mx-auto">
			{!showPaymentSuccess && (
				<div className="bg-green-500/10 max-w-xl mx-auto border border-green-500/20 rounded-xl p-4 my-8 text-green-400">
					<div className="flex items-center justify-center">
						<CheckCircle className="h-5 w-5 mr-2" />
						<p>Payment successfull! Your subscription is now active!</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardContent;

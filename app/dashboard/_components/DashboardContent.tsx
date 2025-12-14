"use client";

import { extractTextFromPDF } from "@/lib/pdfUtils";
import { useUser } from "@clerk/nextjs";
import { AlertCircle, CheckCircle, FileText } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

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
	const handleAnalyze = async () => {
		if (!selectedFile) {
			setError("Please select a file before analyzing");
			return;
		}
		setIsLoading(true);
		setError("");
		setSummary("");

		try {
			// TODO: extract text from PDF file
			const text = await extractTextFromPDF(selectedFile);

			setSummary(text);
			// TODO: send the text to API for analysis
			const res = "";
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to analyze PDF");
		} finally {
			setIsLoading(false);
		}
	};

	// TODO: formatSummaryContent function

	return (
		<div className="space-y-10 mt-24 max-w-4xl mx-auto">
			{!showPaymentSuccess && (
				<div className="bg-green-500/10 max-w-xl mx-auto border border-green-500/20 rounded-xl p-4 my-8 text-green-400">
					<div className="flex items-center justify-center">
						<CheckCircle className="h-5 w-5 mr-2" />
						<p>Payment successfull! Your subscription is now active!</p>
					</div>
				</div>
			)}

			{/* File upload and analysis section */}
			<div className="p-10 space-y-8 rounded-2xl border border-purple-300/10 bg-black/30 shadow-[0_4px_20px_-10px] shadow-purple-200/30">
				{/* File input for PDF selection */}
				<div className="relative">
					<div className="my-2 ml-2 flex items-center text-xs text-gray-500">
						<FileText className="h-3 w-3.5 mr-1.5" />
						<span>Supported format: PDF</span>
					</div>
					<div className="border border-gray-700 rounded-xl p-1 bg-black/40 hover:border-purple-200/20 transition-colors">
						<input
							onChange={handleFileChange}
							type="file"
							accept=".pdf"
							className="block w-full text-gray-300 file:mr-4
							file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm
							hover:file:bg-purple-200/20 transition-all focus:outline-none cursor-pointer"
						/>
					</div>
				</div>
				{/* Analyze Button - disable when no file selected or during loading */}
				<button
					onClick={handleAnalyze}
					disabled={!selectedFile || isLoading}
					className="group relative inline-flex items-center justify-center w-full gap-2 rounded-xl bg-black p-4 text-white transition-all hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<span className="absolute inset-0 rounded-xl bg-linear-to-r from-[#ff1e56] via-[#ff00ff] to-[#00ffff] opacity-70 blur-sm transition-all group-hover:opacity-100 disabled:opacity-40" />

					<span className="relative font-medium">
						{isLoading ? "Processing" : "Analyze Document"}
					</span>
				</button>
			</div>
			{/* Error Message  */}
			{error && (
				<div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400">
					<div className="flex items-start">
						<AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
						<div>
							<p className="font-medium mb-1">Error analyzing document</p>
							<p>{error}</p>
						</div>
					</div>
				</div>
			)}
			{/* Summary results */}
			{summary && (
				<div className="bg-black/20 shadow-[0_4px_20px_-10px] shadow-purple-200/30 rounded-2xl p-8 border border-[#2a2a35]">
					<div className="flex items-center mb-6">
						<div className="mr-3 p-2 rounded-full bg-linear-to-br from-purple-500/20 to-pink-500/20">
							<FileText className="h-6 w-6 text-purple-400" />
						</div>
					</div>
					{/* Formatted summary content */}
					<div className="max-w-none px-6 py-5 rounded-xl bg-[#0f0f13] border border-[#2a2a35]">
						{summary}
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardContent;

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../index.css";
import Providers from "@/components/providers";
import Header from "@/components/header";
import PWARegister from "@/components/pwa-register";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "퀴즈 앱 - 모바일 학습 앱",
	description: "데이터 분석 학습을 위한 모바일 퀴즈 앱",
	manifest: "/manifest.json",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	themeColor: "#3b82f6",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>
					<PWARegister />
					<div className="grid grid-rows-[auto_1fr] h-svh">
						<Header />
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}

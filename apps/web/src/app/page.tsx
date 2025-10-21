"use client";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TITLE_TEXT = `
 ██████╗ ███████╗████████╗████████╗███████╗██████╗
 ██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
 ██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝
 ██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗
 ██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║
 ╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝

 ████████╗    ███████╗████████╗ █████╗  ██████╗██╗  ██╗
 ╚══██╔══╝    ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
    ██║       ███████╗   ██║   ███████║██║     █████╔╝
    ██║       ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
    ██║       ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
    ╚═╝       ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
 `;

export default function Home() {
	const healthCheck = useQuery(trpc.healthCheck.queryOptions());

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
			<div className="container mx-auto max-w-2xl px-4 py-8">
				{/* 메인 타이틀 */}
				<div className="text-center mb-12">
					<h1 className="text-5xl font-bold text-foreground mb-6">🎯 AICE</h1>
					<p className="text-xl text-muted-foreground mb-8">
						인공지능 윤리 자격증 준비를 위한 학습 플랫폼
					</p>
				</div>

				{/* 메인 액션 */}
				<div className="space-y-6">
					{/* 퀴즈 시작 버튼 */}
					<Link href="/aice">
						<Button className="w-full h-16 text-xl font-semibold" size="lg">
							🚀 퀴즈 시작하기
						</Button>
					</Link>

					{/* 보조 액션들 */}
					<div className="grid grid-cols-2 gap-4">
						<Link href="/dashboard">
							<Button variant="outline" className="w-full h-12">
								📊 대시보드
							</Button>
						</Link>
						<Button variant="outline" className="w-full h-12" disabled>
							⚙️ 설정
						</Button>
					</div>
				</div>

				{/* 상태 표시 */}
				<div className="mt-12 text-center">
					<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
						<div
							className={`h-2 w-2 rounded-full ${healthCheck.data ? "bg-green-500" : "bg-red-500"}`}
						/>
						<span>
							{healthCheck.isLoading
								? "연결 확인 중..."
								: healthCheck.data
									? "서비스 정상"
									: "연결 오류"}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

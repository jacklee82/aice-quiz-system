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
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
			<div className="container mx-auto max-w-4xl px-4 py-8">
				{/* 메인 타이틀 */}
				<div className="text-center mb-12">
					<pre className="overflow-x-auto font-mono text-sm text-foreground mb-6">{TITLE_TEXT}</pre>
					<h1 className="text-4xl font-bold text-foreground mb-4">🎯 AICE 학습 플랫폼</h1>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						인공지능 윤리 자격증(AICE) 준비를 위한 종합 학습 시스템입니다.
						퀴즈, 카드북, 대시보드를 통해 체계적으로 학습하세요.
					</p>
				</div>

				{/* 메인 액션 카드 */}
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
					{/* 퀴즈 시작 카드 */}
					<Card className="hover:shadow-lg transition-shadow duration-300">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								🎯 AICE 퀴즈
							</CardTitle>
							<CardDescription>
								실전 문제를 통해 AICE 핵심 개념을 학습하고 실력을 향상시키세요.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Link href="/aice">
								<Button className="w-full" size="lg">
									퀴즈 시작하기
								</Button>
							</Link>
						</CardContent>
					</Card>

					{/* 대시보드 카드 */}
					<Card className="hover:shadow-lg transition-shadow duration-300">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								📊 학습 대시보드
							</CardTitle>
							<CardDescription>
								학습 진도와 성과를 한눈에 확인하고 목표를 설정하세요.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Link href="/dashboard">
								<Button variant="outline" className="w-full" size="lg">
									대시보드 보기
								</Button>
							</Link>
						</CardContent>
					</Card>

					{/* 시스템 상태 카드 */}
					<Card className="hover:shadow-lg transition-shadow duration-300">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								⚡ 시스템 상태
							</CardTitle>
							<CardDescription>
								서비스 연결 상태와 시스템 정보를 확인하세요.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex items-center gap-2 mb-4">
								<div
									className={`h-3 w-3 rounded-full ${healthCheck.data ? "bg-green-500 dark:bg-green-400" : "bg-red-500 dark:bg-red-400"}`}
								/>
								<span className="text-sm font-medium">
									{healthCheck.isLoading
										? "연결 확인 중..."
										: healthCheck.data
											? "정상 연결"
											: "연결 오류"}
								</span>
							</div>
							<Button variant="secondary" className="w-full" disabled>
								시스템 정보
							</Button>
						</CardContent>
					</Card>
				</div>

				{/* 특징 섹션 */}
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<div className="text-center p-4">
						<div className="text-3xl mb-2">📚</div>
						<h3 className="font-semibold text-foreground mb-1">체계적 학습</h3>
						<p className="text-sm text-muted-foreground">단계별 커리큘럼으로 체계적으로 학습</p>
					</div>
					<div className="text-center p-4">
						<div className="text-3xl mb-2">🎯</div>
						<h3 className="font-semibold text-foreground mb-1">실전 문제</h3>
						<p className="text-sm text-muted-foreground">실제 시험과 유사한 문제로 실전 대비</p>
					</div>
					<div className="text-center p-4">
						<div className="text-3xl mb-2">📊</div>
						<h3 className="font-semibold text-foreground mb-1">진도 추적</h3>
						<p className="text-sm text-muted-foreground">학습 진도와 성과를 실시간으로 확인</p>
					</div>
					<div className="text-center p-4">
						<div className="text-3xl mb-2">🚀</div>
						<h3 className="font-semibold text-foreground mb-1">빠른 학습</h3>
						<p className="text-sm text-muted-foreground">효율적인 학습 방법으로 빠른 성장</p>
					</div>
				</div>
			</div>
		</div>
	);
}

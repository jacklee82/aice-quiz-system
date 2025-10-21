"use client";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Header() {
	const [showMenu, setShowMenu] = useState(false);

	const links = [
		{ to: "/", label: "Home" },
		{ to: "/dashboard", label: "Dashboard" },
		{ to: "/aice", label: "AICE 카드북" },
	] as const;

	return (
		<div className="w-full">
			<div className="flex flex-row items-center justify-between px-2 py-1 w-full">
				<div className="flex items-center gap-2">
					<ModeToggle />
					<UserMenu />
				</div>
				<Button
					variant="outline"
					size="sm"
					onClick={() => setShowMenu(!showMenu)}
					className="text-sm"
				>
					⚙️ 설정
				</Button>
			</div>
			
			{showMenu && (
				<div className="border-t bg-background p-2">
					<nav className="flex flex-col gap-2 text-sm">
						{links.map(({ to, label }) => {
							return (
								<Link 
									key={to} 
									href={to}
									className="px-2 py-1 hover:bg-muted rounded"
									onClick={() => setShowMenu(false)}
								>
									{label}
								</Link>
							);
						})}
					</nav>
				</div>
			)}
		</div>
	);
}

"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { logoutAction } from "@/app/auth/_actions/authAction";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
	const router = useRouter();
	const [pending, startTransition] = useTransition();

	const onClick = () =>
		startTransition(async () => {
			const result = await logoutAction();
			toast.success(result.message);
			router.push(result.redirectTo ?? "/auth/login");
			router.refresh();
		});

	return (
		<Button
			variant="ghost"
			className="w-full justify-start gap-3 text-muted-foreground"
			disabled={pending}
			onClick={onClick}
		>
			<LogOut className="size-4" />
			{pending ? "Logging out..." : "Logout"}
		</Button>
	);
}
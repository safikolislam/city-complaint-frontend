import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/app/auth/_components/register-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
	title: "Register",
	description: "Create your CityFix account to report city problems.",
};

export default function RegisterPage() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl">Create an account</CardTitle>
					<CardDescription>Report and track city problems</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<RegisterForm />
					<p className="text-center text-sm text-muted-foreground">
						Already have an account?{" "}
						<Link href="/auth/login" className="font-medium underline">
							Login
						</Link>
					</p>
				</CardContent>
			</Card>
		</main>
	);
}
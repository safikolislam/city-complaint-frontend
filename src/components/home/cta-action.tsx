import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CtaSection() {
  return (
    <section className="px-4 pb-16 sm:pb-20">
      <div className="mx-auto max-w-6xl rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground">
        <h2 className="text-3xl font-bold tracking-tight">
          See a problem? Report it today.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
          It takes about a minute, and you can follow every update from your
          dashboard.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/auth/register"
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Create an account
          </Link>
          <Link
            href="/auth/login"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground",
            )}
          >
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
}
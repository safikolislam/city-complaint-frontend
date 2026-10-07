import Link from "next/link";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {siteConfig.publicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/auth/login"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className={buttonVariants({ size: "sm" })}
          >
            Register
          </Link>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}

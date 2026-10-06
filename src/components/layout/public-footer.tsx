import Link from "next/link";
import { siteConfig } from "@/config/site";

export function PublicFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm" aria-label="Footer">
          {siteConfig.publicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="text-sm text-muted-foreground">
          <p>Narsingdi, Bangladesh</p>
          <p>support@cityfix.com</p>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}

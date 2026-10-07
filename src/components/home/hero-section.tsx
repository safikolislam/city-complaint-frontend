import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/images/city-servicing.jpg"
        alt="A busy city street with buildings and traffic"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/60" />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-24 text-center text-white md:py-32">
        <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
          Smart City · Public Service
        </span>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
          Report city problems. Track them until they are fixed.
        </h1>
        <p className="max-w-2xl text-white/80">
          Submit a complaint or service request, get it routed to the right
          department, and follow every step from assignment to resolution.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/auth/register"
            className={buttonVariants({ size: "lg" })}
          >
            Get started
            <ArrowRight className="ml-2 size-4" />
          </Link>
          <Link
            href="/services"
            className={`${buttonVariants({ variant: "outline", size: "lg" })} border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white`}
          >
            Explore services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

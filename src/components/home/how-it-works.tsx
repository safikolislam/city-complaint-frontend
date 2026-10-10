import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Send,
  Wrench,
} from "lucide-react";

const steps = [
  {
    icon: Send,
    title: "Submit",
    text: "Describe the problem, pick a category and add the location.",
  },
  {
    icon: ClipboardList,
    title: "Assigned",
    text: "It is routed to the right department and assigned to a technician.",
  },
  {
    icon: Wrench,
    title: "Work in progress",
    text: "The technician fixes it and updates the status as work moves on.",
  },
  {
    icon: CheckCircle2,
    title: "Resolved",
    text: "Confirm the fix and close the complaint. Every step is recorded.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="text-center">
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
          SIMPLE PROCESS
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          How it{" "}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            works
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground text-sm sm:text-base">
          Track and resolve your issues seamlessly in four simple steps.
        </p>
      </div>

      <div className="relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ icon: Icon, title, text }, i) => (
          <div
            key={title}
            className="group relative flex flex-col justify-between rounded-2xl border bg-card/60 p-6 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 transition-colors group-hover:text-primary">
                  0{i + 1}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-bold tracking-tight text-card-foreground group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {text}
              </p>
            </div>

            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground/30 transition-colors group-hover:text-primary/50">
                <ArrowRight className="size-5" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

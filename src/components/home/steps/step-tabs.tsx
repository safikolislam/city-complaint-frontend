import type { Step } from "./steps";

type Props = {
  steps: Step[];
  active: number;
  onSelect: (index: number) => void;
};

export function StepTabs({ steps, active, onSelect }: Props) {
  return (
    <div className="mb-8 flex gap-3">
      {steps.map((s, i) => {
        const isActive = i === active;
        const Icon = s.Icon;
        return (
          <button
            type="button"
            key={s.number}
            aria-pressed={isActive}
            onClick={() => onSelect(i)}
            className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
              isActive
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-muted/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            <span
              className={`flex size-7 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <Icon className="size-3.5" />
            </span>
            <span className="hidden sm:inline">Step {s.number}</span>
            <span className="sm:hidden">{s.number}</span>
          </button>
        );
      })}
    </div>
  );
}
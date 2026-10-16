import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  ids: number[];
  current: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

const arrowClass =
  "grid size-10 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white";

const HeroControls = ({ ids, current, onSelect, onPrev, onNext }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        aria-label="Previous slide"
        onClick={onPrev}
        className={arrowClass}
      >
        <ChevronLeft className="size-5" />
      </button>

      <div className="flex items-center gap-2">
        {ids.map((id, i) => (
          <button
            type="button"
            key={id}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current}
            onClick={() => onSelect(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label="Next slide"
        onClick={onNext}
        className={arrowClass}
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
};

export default HeroControls;
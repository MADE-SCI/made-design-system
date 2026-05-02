import { LayoutGrid, Rows3 } from "lucide-react";
import { useDensity } from "../density/density";
import { cn } from "../lib/utils";

/**
 * v2 Density toggle — segmented control for switching between briefing
 * (loose, executive feel) and dense (data-heavy, ops-friendly) modes.
 *
 * Usage: drop into a header / toolbar / settings panel.
 *
 *   <DensityToggle />
 *
 * The toggle reads + writes via DensityProvider; mount at the app root
 * for the preference to persist across routes and page loads.
 */
export function DensityToggle({ className }: { className?: string }) {
  const { density, setDensity } = useDensity();

  return (
    <div
      role="radiogroup"
      aria-label="Display density"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md-pill border-[0.5px] border-md-hairline-strong",
        "bg-md-bg-card p-0.5 shadow-md-card",
        className,
      )}
    >
      <DensityButton
        active={density === "briefing"}
        onClick={() => setDensity("briefing")}
        label="Briefing"
        icon={<LayoutGrid className="h-3.5 w-3.5" strokeWidth={2} />}
      />
      <DensityButton
        active={density === "dense"}
        onClick={() => setDensity("dense")}
        label="Dense"
        icon={<Rows3 className="h-3.5 w-3.5" strokeWidth={2} />}
      />
    </div>
  );
}

function DensityButton({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-md-pill px-3",
        "text-[12px] font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:shadow-md-focus",
        active
          ? "bg-md-teal text-white"
          : "text-md-text-secondary hover:text-md-text-primary",
      )}
    >
      {icon}
      {label}
    </button>
  );
}

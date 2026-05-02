import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";

/**
 * v2 EmptyState — first-load or zero-results state.
 *
 * Per v2 states-pattern.html spec:
 *  - 76×76 icon tile, gradient teal-tint → aqua-tint background, brand-teal icon
 *  - Headline: Funnel Display 18/700, <30 chars, never apologetic
 *  - Subhead: Funnel Sans 13, max 2 lines, explains what to do next
 *  - Primary CTA: teal pill, the obvious next action
 *  - Secondary CTA: ghost link in teal, alternative path
 *  - Voice: warm, action-first ("Add your first…" not "You have no…")
 *
 * Replaces and extends `src/components/ui/empty-state.tsx` for v2-aligned routes.
 * The legacy component remains usable until migration completes.
 */

export type EmptyStateAction = {
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
};

export type EmptyStateProps = {
  icon: LucideIcon;
  headline: string;
  subhead?: string;
  action?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  className?: string;
};

export function EmptyState({
  icon: Icon,
  headline,
  subhead,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  const PrimaryIcon = action?.icon;

  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center px-6 py-8 text-center",
        className,
      )}
      role="status"
    >
      <div
        className="mb-4 flex h-[76px] w-[76px] items-center justify-center rounded-md-tile shadow-md-card"
        style={{
          background:
            "linear-gradient(135deg, var(--md-teal-tint) 0%, var(--md-aqua-tint) 100%)",
        }}
        aria-hidden="true"
      >
        <Icon className="h-9 w-9 text-md-teal" strokeWidth={1.6} />
      </div>

      <div className="font-display text-[18px] font-bold leading-tight tracking-[-0.015em] text-md-text-primary">
        {headline}
      </div>

      {subhead && (
        <p className="mt-1.5 max-w-[280px] text-[13px] leading-[1.5] text-md-text-secondary">
          {subhead}
        </p>
      )}

      {(action || secondaryAction) && (
        <div className="mt-4 flex flex-col items-center gap-2">
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className={cn(
                "inline-flex h-[34px] items-center gap-1.5 rounded-md-pill px-[18px]",
                "bg-md-teal text-[13px] font-semibold text-white shadow-md-card",
                "transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:shadow-md-focus",
              )}
            >
              {PrimaryIcon && <PrimaryIcon className="h-3.5 w-3.5" strokeWidth={2.2} />}
              {action.label}
            </button>
          )}
          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className={cn(
                "inline-flex items-center gap-1 text-[12px] font-semibold text-md-teal",
                "transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:underline",
              )}
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

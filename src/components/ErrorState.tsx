import { AlertTriangle, RefreshCw } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";

/**
 * v2 ErrorState — failed-fetch or unexpected-error state.
 *
 * Per v2 states-pattern.html spec:
 *  - 76×76 icon tile, red-tinted gradient, made-red alert icon
 *  - Headline: "Couldn't…" not "Error" or "Failed". Plain language
 *  - Subhead: explain what happened in non-technical terms
 *  - Primary CTA: Retry (always offer the obvious recovery)
 *  - Secondary CTA: link to status page or support
 *  - Trace pill: small gray-100 chip with error code + trace ID for support
 *  - Voice: calm, direct. Never blame the user. Never use "!"
 *
 * Distinct from src/components/ErrorBoundary.tsx — that wraps the route tree
 * and catches render-time crashes / failed lazy chunks. This component is for
 * data-fetch failures inside a route that's already rendered.
 */

export type ErrorStateAction = {
  label: string;
  onClick: () => void;
};

export type ErrorStateProps = {
  /** Override the default AlertTriangle icon. */
  icon?: LucideIcon;
  /** Plain-language headline. v2 spec: "Couldn't load …", never "Error". */
  headline?: string;
  /** Non-technical explanation of what happened. */
  subhead?: string;
  /** Primary recovery action. Defaults to "Retry" with a refresh icon. */
  retry?: ErrorStateAction;
  /** Optional secondary action (status page, support link, contact). */
  secondaryAction?: ErrorStateAction;
  /** Machine-readable error code surfaced in the trace pill. */
  errorCode?: string;
  /** Trace ID surfaced for support tickets. Generated upstream by the caller. */
  traceId?: string;
  className?: string;
};

export function ErrorState({
  icon: Icon = AlertTriangle,
  headline = "Something went wrong",
  subhead = "There was a problem loading this. Check your connection or try again.",
  retry,
  secondaryAction,
  errorCode,
  traceId,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center px-6 py-8 text-center",
        className,
      )}
      role="alert"
      aria-live="polite"
    >
      <div
        className="mb-4 flex h-[76px] w-[76px] items-center justify-center rounded-md-tile shadow-md-card"
        style={{
          background:
            "linear-gradient(135deg, var(--md-red-tint) 0%, var(--md-red-tint-2) 100%)",
        }}
        aria-hidden="true"
      >
        <Icon className="h-9 w-9 text-md-red" strokeWidth={1.6} />
      </div>

      <div className="font-display text-[18px] font-bold leading-tight tracking-[-0.015em] text-md-text-primary">
        {headline}
      </div>

      <p className="mt-1.5 max-w-[280px] text-[13px] leading-[1.5] text-md-text-secondary">
        {subhead}
      </p>

      {(retry || secondaryAction) && (
        <div className="mt-4 flex items-center gap-2">
          {retry && (
            <button
              type="button"
              onClick={retry.onClick}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-md-pill px-4",
                "bg-md-teal text-[12.5px] font-semibold text-white shadow-md-card",
                "transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:shadow-md-focus",
              )}
            >
              <RefreshCw className="h-3 w-3" strokeWidth={2.2} />
              {retry.label}
            </button>
          )}
          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className={cn(
                "inline-flex h-8 items-center gap-1 rounded-md-pill px-3.5",
                "border-[0.5px] border-md-hairline-strong bg-white shadow-md-card",
                "text-[12.5px] font-semibold text-md-gray-700",
                "transition-colors hover:bg-md-gray-50",
                "focus-visible:outline-none focus-visible:shadow-md-focus",
              )}
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}

      {(errorCode || traceId) && (
        <div
          className={cn(
            "mt-4 inline-flex items-center gap-1.5 rounded-[5px] border-[0.5px] border-md-hairline",
            "bg-md-gray-100 px-2.5 py-1 text-[10.5px] font-medium text-md-text-tertiary",
            "tabular-nums",
          )}
        >
          {errorCode && (
            <span className="font-bold text-md-gray-700">{errorCode}</span>
          )}
          {errorCode && traceId && <span aria-hidden="true">·</span>}
          {traceId && <span>trace {traceId}</span>}
        </div>
      )}
    </div>
  );
}

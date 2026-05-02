import { useEffect, useState } from "react";
import { CircleDot, RefreshCw } from "lucide-react";
import { cn } from "../lib/utils";

/**
 * v2 FreshnessBadge — generic data-freshness pill.
 *
 * Drops on any data card or page header to surface "this is X minutes old"
 * with a color-coded dot (green / amber / red) so the user can see at a
 * glance whether they're reading fresh or stale data.
 *
 * Designed to consume `dataUpdatedAt` from any TanStack Query result.
 *
 *   const { data, dataUpdatedAt, isFetching } = useQuery({ ... });
 *   <FreshnessBadge updatedAt={dataUpdatedAt} isFetching={isFetching} />
 *
 * The campaign-specific freshness pill at
 * `@/components/campaigns/LastSyncBadge` is for HeyReach + EmailBison sync
 * state; this one is for any local query.
 *
 * Color thresholds (defaults match LastSyncBadge for visual parity):
 *   < 20 min  → green  (fresh)
 *   < 60 min  → amber  (stale-ish)
 *   ≥ 60 min  → red    (drifted)
 *   never     → muted
 *
 * Override thresholds with the `thresholds` prop for fast-moving data
 * (e.g. real-time dashboards) where 5 min is already stale.
 */

export interface FreshnessThresholds {
  /** Minutes before the badge turns amber. Default: 20. */
  amberAfterMin?: number;
  /** Minutes before the badge turns red. Default: 60. */
  redAfterMin?: number;
}

export interface FreshnessBadgeProps {
  /** Last-update timestamp in ms (e.g. TanStack Query's `dataUpdatedAt`). */
  updatedAt: number | undefined | null;
  /** Whether a refetch is currently in flight. Renders a spinning icon. */
  isFetching?: boolean;
  /** Custom label prefix. Defaults to "Updated". */
  label?: string;
  /** Custom thresholds for amber/red coloring. */
  thresholds?: FreshnessThresholds;
  /** Compact ('Updated 3 min ago') or bare ('3 min ago'). Default 'compact'. */
  variant?: "compact" | "bare";
  className?: string;
}

const DEFAULT_THRESHOLDS = {
  amberAfterMin: 20,
  redAfterMin: 60,
} as const;

function formatAgo(ms: number | null | undefined, nowMs: number): string {
  if (!ms || Number.isNaN(ms)) return "never";
  const delta = Math.max(0, nowMs - ms);
  const mins = Math.floor(delta / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function dotClass(
  ms: number | null | undefined,
  nowMs: number,
  thresholds: Required<FreshnessThresholds>,
): string {
  if (!ms || Number.isNaN(ms)) return "text-md-gray-400";
  const mins = (nowMs - ms) / 60_000;
  if (mins < thresholds.amberAfterMin) return "text-md-green";
  if (mins < thresholds.redAfterMin) return "text-md-yellow";
  return "text-md-red";
}

export function FreshnessBadge({
  updatedAt,
  isFetching = false,
  label = "Updated",
  thresholds,
  variant = "compact",
  className,
}: FreshnessBadgeProps) {
  // Local ticking clock so "3 min ago" updates without a refetch.
  const [nowMs, setNowMs] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  const merged: Required<FreshnessThresholds> = {
    ...DEFAULT_THRESHOLDS,
    ...thresholds,
  };

  const ago = formatAgo(updatedAt, nowMs);
  const dot = dotClass(updatedAt, nowMs, merged);

  if (variant === "bare") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 text-md-helper text-md-text-secondary tabular-nums",
          className,
        )}
        title={
          updatedAt
            ? `${label} ${new Date(updatedAt).toLocaleString()}`
            : `${label}: never`
        }
      >
        <CircleDot className={cn("h-3 w-3", dot)} />
        {ago}
        {isFetching && (
          <RefreshCw className="h-3 w-3 animate-spin text-md-text-tertiary" />
        )}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-md-helper text-md-text-secondary tabular-nums",
        "rounded-full border border-md-hairline bg-md-surface-1 px-2.5 py-1",
        className,
      )}
      title={
        updatedAt
          ? `${label} ${new Date(updatedAt).toLocaleString()}`
          : `${label}: never`
      }
    >
      <CircleDot className={cn("h-3 w-3", dot)} />
      <span>
        {label} {ago}
      </span>
      {isFetching && (
        <RefreshCw className="h-3 w-3 animate-spin text-md-text-tertiary" />
      )}
    </span>
  );
}

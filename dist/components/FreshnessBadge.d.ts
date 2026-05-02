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
export declare function FreshnessBadge({ updatedAt, isFetching, label, thresholds, variant, className, }: FreshnessBadgeProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FreshnessBadge.d.ts.map
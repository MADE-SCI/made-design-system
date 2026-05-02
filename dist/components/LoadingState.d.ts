/**
 * v2 LoadingState — skeleton placeholders that mimic the real layout.
 *
 * Per v2 states-pattern.html spec:
 *  - Skeleton color: gray-150 → gray-200 gradient
 *  - Animation: opacity pulse, 1.6s ease-in-out infinite
 *  - Shape: mimic real component proportions (height + width)
 *  - No spinners. Skeletons feel native; spinners feel webby
 *  - Reduced motion: respect prefers-reduced-motion (handled globally in tokens.css)
 *  - Timing: show after 200ms (skip for fast loads). Caller responsibility.
 *
 * Variants:
 *  - "page"    : page header + KPI strip + funnel + table (matches Pipeline-style pages)
 *  - "table"   : table header + N rows
 *  - "kpi"     : KPI strip alone (4 tiles)
 *  - "card"    : single-card skeleton (header + body)
 *  - "custom"  : caller passes children; LoadingState is just the wrapper
 *
 * Usage:
 *   <LoadingState variant="page" />
 *   <LoadingState variant="table" rows={8} />
 *   <LoadingState variant="custom"><Skeleton className="h-40 w-full" /></LoadingState>
 */
export type LoadingStateProps = {
    variant?: "page" | "table" | "kpi" | "card" | "custom";
    /** Used by `table` variant to control row count. Default 6. */
    rows?: number;
    className?: string;
    children?: React.ReactNode;
};
export declare function LoadingState({ variant, rows, className, children, }: LoadingStateProps): import("react/jsx-runtime").JSX.Element;
declare function PageHeaderSkeleton(): import("react/jsx-runtime").JSX.Element;
declare function KpiStrip(): import("react/jsx-runtime").JSX.Element;
declare function FunnelSkeleton(): import("react/jsx-runtime").JSX.Element;
declare function TableSkeleton({ rows }: {
    rows?: number;
}): import("react/jsx-runtime").JSX.Element;
declare function CardSkeleton(): import("react/jsx-runtime").JSX.Element;
export { PageHeaderSkeleton, KpiStrip, FunnelSkeleton, TableSkeleton, CardSkeleton };
//# sourceMappingURL=LoadingState.d.ts.map
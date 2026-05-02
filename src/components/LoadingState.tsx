import { Skeleton } from "./Skeleton";
import { cn } from "../lib/utils";

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

export function LoadingState({
  variant = "page",
  rows = 6,
  className,
  children,
}: LoadingStateProps) {
  const wrapper = cn("flex flex-1 flex-col gap-3", className);

  if (variant === "custom") {
    return <div className={wrapper}>{children}</div>;
  }

  if (variant === "kpi") {
    return (
      <div className={wrapper}>
        <KpiStrip />
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className={wrapper}>
        <TableSkeleton rows={rows} />
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={wrapper}>
        <CardSkeleton />
      </div>
    );
  }

  // variant === "page"
  return (
    <div className={wrapper}>
      <PageHeaderSkeleton />
      <KpiStrip />
      <FunnelSkeleton />
      <TableSkeleton rows={rows} />
    </div>
  );
}

/* ------- Composable building blocks (also exported for fine-grained use) ------ */

function PageHeaderSkeleton() {
  return (
    <div className="mb-2 flex flex-col gap-2">
      <Skeleton className="h-3 w-20 rounded-sm" />
      <Skeleton className="h-7 w-48 rounded-md" />
    </div>
  );
}

function KpiStrip() {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 rounded-xl bg-md-bg-card p-3 shadow-md-card"
        >
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-3.5 w-3.5 rounded-sm" />
            <Skeleton className="h-2 w-16 rounded-sm" />
          </div>
          <Skeleton className="h-[18px] w-[70%] rounded-sm" />
          <Skeleton className="h-2 w-[50%] rounded-sm" />
        </div>
      ))}
    </div>
  );
}

function FunnelSkeleton() {
  return (
    <div className="rounded-xl bg-md-bg-card p-3.5 shadow-md-card">
      <Skeleton className="mb-2.5 h-3 w-28 rounded-sm" />
      <div className="grid grid-cols-5 gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-14 rounded-md" />
        ))}
      </div>
    </div>
  );
}

function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="rounded-xl bg-md-bg-card px-3.5 py-3 shadow-md-card">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "grid items-center gap-2.5 py-2.5",
            "[grid-template-columns:14px_1fr_60px_60px]",
            i < rows - 1 && "border-b-[0.5px] border-md-hairline",
          )}
        >
          <Skeleton className="h-3.5 w-3.5 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-[11px] w-[70%] rounded-sm" />
            <Skeleton className="h-2 w-[45%] rounded-sm" />
          </div>
          <Skeleton className="h-2.5 w-full rounded-sm" />
          <Skeleton className="h-2.5 w-full rounded-sm" />
        </div>
      ))}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-xl bg-md-bg-card p-4 shadow-md-card">
      <Skeleton className="mb-2 h-5 w-32 rounded-sm" />
      <Skeleton className="mb-1.5 h-3 w-full rounded-sm" />
      <Skeleton className="h-3 w-3/4 rounded-sm" />
    </div>
  );
}

export { PageHeaderSkeleton, KpiStrip, FunnelSkeleton, TableSkeleton, CardSkeleton };

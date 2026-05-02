/**
 * @made-sci/design-system — public API.
 *
 * Source-of-truth for v2 design tokens and primitives shared across all
 * Made Scientific frontends (minimal-science-hub, made-reporting-ux,
 * future Lovable builds). Apple Health / Numbers / Fey visual language.
 *
 * Consumers wire this up by:
 *   1. Importing the Tailwind preset:
 *        import madePreset from "@made-sci/design-system/tailwind.preset";
 *        export default { presets: [madePreset], content: [...] };
 *   2. Importing tokens.css once at app entry:
 *        import "@made-sci/design-system/tokens.css";
 *   3. Wrapping the app with DensityProvider:
 *        <DensityProvider><App /></DensityProvider>
 *   4. Using any component:
 *        <EmptyState icon={Inbox} headline="No accounts yet" .../>
 *
 * Full integration guide: docs/INTEGRATION.md
 */

/* ─── States (universal empty / loading / error) ─────────────────────── */
export { Skeleton } from "./components/Skeleton";

export { EmptyState } from "./components/EmptyState";
export type { EmptyStateProps, EmptyStateAction } from "./components/EmptyState";

export {
  LoadingState,
  PageHeaderSkeleton,
  KpiStrip,
  FunnelSkeleton,
  TableSkeleton,
  CardSkeleton,
} from "./components/LoadingState";
export type { LoadingStateProps } from "./components/LoadingState";

export { ErrorState } from "./components/ErrorState";
export type { ErrorStateProps, ErrorStateAction } from "./components/ErrorState";

/* ─── Primitives ─────────────────────────────────────────────────────── */
export { RoundCheckbox, RoundCheckboxRow } from "./components/RoundCheckbox";
export type { RoundCheckboxProps, RoundCheckboxRowProps } from "./components/RoundCheckbox";

export { FreshnessBadge } from "./components/FreshnessBadge";
export type {
  FreshnessBadgeProps,
  FreshnessThresholds,
} from "./components/FreshnessBadge";

/* ─── Density mode ───────────────────────────────────────────────────── */
export { DensityProvider, useDensity } from "./density/density";
export type { Density } from "./density/density";
export { DensityToggle } from "./components/DensityToggle";

/* ─── Hooks ──────────────────────────────────────────────────────────── */
export { useUrlTab } from "./hooks/use-url-tab";
export { useDebounce } from "./hooks/use-debounce";

/* ─── Utilities (re-export for downstream consistency) ────────────────── */
export { cn } from "./lib/utils";

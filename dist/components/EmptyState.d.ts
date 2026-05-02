import type { LucideIcon } from "lucide-react";
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
export declare function EmptyState({ icon: Icon, headline, subhead, action, secondaryAction, className, }: EmptyStateProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=EmptyState.d.ts.map
import type { LucideIcon } from "lucide-react";
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
export declare function ErrorState({ icon: Icon, headline, subhead, retry, secondaryAction, errorCode, traceId, className, }: ErrorStateProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ErrorState.d.ts.map
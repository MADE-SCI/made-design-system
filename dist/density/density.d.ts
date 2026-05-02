import * as React from "react";
/**
 * v2 Density mode — controls the briefing/dense token scales applied via
 * a parent class on the app root. The actual token deltas live in
 * `src/design-system/tokens.css` (`.density-dense { ... }` selector).
 *
 * Why a hook + provider: density needs to persist across page navigations
 * (so users don't lose their preference on route change), survive page
 * reloads (localStorage), and be settable from anywhere (header toggle,
 * keyboard shortcut, settings page).
 *
 * Usage:
 *   const { density, setDensity, toggleDensity } = useDensity();
 *
 *   <button onClick={toggleDensity}>
 *     {density === "briefing" ? "Switch to dense" : "Switch to briefing"}
 *   </button>
 */
export type Density = "briefing" | "dense";
type DensityContextValue = {
    density: Density;
    setDensity: (next: Density) => void;
    toggleDensity: () => void;
};
/**
 * Mounts the density context. Wrap the app root (inside QueryClientProvider /
 * ThemeProvider in src/App.tsx). Applies `.density-dense` to <html> when
 * dense mode is active, which triggers the CSS variable overrides defined in
 * src/design-system/tokens.css.
 */
export declare function DensityProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
/**
 * Hook to read or change density. Throws if called outside DensityProvider —
 * intentional, this is a programming error not a runtime branch.
 */
export declare function useDensity(): DensityContextValue;
export {};
//# sourceMappingURL=density.d.ts.map
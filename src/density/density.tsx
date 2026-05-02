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

const STORAGE_KEY = "made.density";
const DEFAULT_DENSITY: Density = "briefing";

type DensityContextValue = {
  density: Density;
  setDensity: (next: Density) => void;
  toggleDensity: () => void;
};

const DensityContext = React.createContext<DensityContextValue | undefined>(undefined);

function readPersistedDensity(): Density {
  if (typeof window === "undefined") return DEFAULT_DENSITY;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "dense" || v === "briefing" ? v : DEFAULT_DENSITY;
  } catch {
    // Private mode / quota errors — fall back to default, don't crash.
    return DEFAULT_DENSITY;
  }
}

function persistDensity(next: Density): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Best-effort. If localStorage is unavailable (Safari private), the
    // setting still works for the lifetime of this tab.
  }
}

/**
 * Mounts the density context. Wrap the app root (inside QueryClientProvider /
 * ThemeProvider in src/App.tsx). Applies `.density-dense` to <html> when
 * dense mode is active, which triggers the CSS variable overrides defined in
 * src/design-system/tokens.css.
 */
export function DensityProvider({ children }: { children: React.ReactNode }) {
  const [density, setDensityState] = React.useState<Density>(() => readPersistedDensity());

  // Reflect density into a <html> data attribute so CSS can hook in.
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("density-dense", density === "dense");
  }, [density]);

  const setDensity = React.useCallback((next: Density) => {
    setDensityState(next);
    persistDensity(next);
  }, []);

  const toggleDensity = React.useCallback(() => {
    setDensityState((prev) => {
      const next: Density = prev === "briefing" ? "dense" : "briefing";
      persistDensity(next);
      return next;
    });
  }, []);

  const value = React.useMemo<DensityContextValue>(
    () => ({ density, setDensity, toggleDensity }),
    [density, setDensity, toggleDensity],
  );

  return <DensityContext.Provider value={value}>{children}</DensityContext.Provider>;
}

/**
 * Hook to read or change density. Throws if called outside DensityProvider —
 * intentional, this is a programming error not a runtime branch.
 */
export function useDensity(): DensityContextValue {
  const ctx = React.useContext(DensityContext);
  if (!ctx) {
    throw new Error(
      "useDensity must be used within a <DensityProvider>. " +
        "Mount it in src/App.tsx near the other providers.",
    );
  }
  return ctx;
}

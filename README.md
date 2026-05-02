# @made-sci/design-system

> Made Scientific design system — v2 tokens, components, and primitives extracted from `minimal-science-hub` so every Made Scientific frontend (and every Lovable build we ship) shares the same Apple-Health-style visual language.

[![status](https://img.shields.io/badge/status-active-green)](#)
[![license](https://img.shields.io/badge/license-UNLICENSED-lightgrey)](#)

## What's in the box

**Universal state components**
- `EmptyState` — first-load / zero-results state with icon tile, headline, subhead, and CTAs
- `LoadingState` — skeleton variants (page, table, card, kpi, custom) that mimic real layout
- `ErrorState` — failed-fetch state with plain-language headline, retry button, and trace pill
- `Skeleton` — primitive skeleton box used by all of the above

**Primitives**
- `RoundCheckbox` + `RoundCheckboxRow` — Apple-Reminders style round checkbox (Radix-backed)
- `FreshnessBadge` — generic data-staleness pill with green/amber/red color coding

**Density mode**
- `DensityProvider` + `useDensity` — global "briefing vs dense" preference, persisted to localStorage
- `DensityToggle` — segmented control to flip between modes

**Hooks**
- `useUrlTab` — sync a tab UI control with URL search params (`?tab=trials` deep links)
- `useDebounce` — debounce any value (search inputs, filters)

**Tokens**
- `tokens.css` — every v2 design token as CSS variables (light + dark + dense)
- `tailwind.preset` — Tailwind preset extending `theme.extend` so consumers get `bg-md-teal`, `font-display`, `shadow-md-card`, etc.

## Quick start

```bash
npm install @made-sci/design-system
```

In your consumer app's `tailwind.config.ts`:

```ts
import madePreset from "@made-sci/design-system/tailwind.preset";

export default {
  presets: [madePreset],
  content: ["./src/**/*.{ts,tsx}"],
};
```

In your app entry (e.g. `src/main.tsx`):

```ts
import "@made-sci/design-system/tokens.css";
import { DensityProvider } from "@made-sci/design-system";

createRoot(rootEl).render(
  <DensityProvider>
    <App />
  </DensityProvider>,
);
```

In any component:

```tsx
import { EmptyState } from "@made-sci/design-system";
import { SearchX } from "lucide-react";

<EmptyState
  icon={SearchX}
  headline="No accounts match these filters"
  subhead="Try clearing some filters, or broaden your search to see more."
  action={{ label: "Clear filters", onClick: () => clearFilters() }}
/>
```

## Why a separate package

Before this extraction the v2 design system lived only inside `minimal-science-hub`. Every other Lovable build either copy-pasted the components or skipped them and re-rolled their own (visual drift, accessibility regressions, brand inconsistency).

This package solves that:

- **Single source of truth** — tweak the empty-state component once here, every consumer gets the fix on their next install
- **Lovable-friendly** — installable from npm or directly from GitHub, no build-system wrangling
- **Tree-shakeable** — only the components you import end up in your bundle
- **Type-safe** — `.d.ts` files ship alongside the JS bundles
- **Tested** — the same vitest suite that gates `minimal-science-hub` runs against the standalone package

## Development

```bash
npm install
npm run build       # bundles ESM + CJS + .d.ts into dist/
npm run test:run    # runs the v2 component test suite
npm run typecheck   # tsc --noEmit
```

## Versioning

Pre-1.0: any release may break the API. Once we hit `1.0.0`, semver applies:
- `MAJOR.minor.patch` for breaking API changes
- `major.MINOR.patch` for new components or props
- `major.minor.PATCH` for bug fixes / visual polish

## Source of truth

Design DNA locked at:
`AI_DEVELOPMENT/01_ACTIVE_PROJECTS/PROJ-001 Reporting Products UX/sketches/macos-direction/v2/`

Brand stack: Funnel Display (display) + Funnel Sans (body), tabular numerals, teal `#00545F` primary, aqua `#57C2AC` secondary, Apple-style 11-step gray ramp.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history.

## License

Proprietary. Internal use only at Made Scientific. See `LICENSE`.

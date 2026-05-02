# Integration guide

How to install `@made-sci/design-system` in any Made Scientific frontend (Lovable, Vite, Next.js, Remix, anything React 18+).

## 1. Install

### Option A — npm (recommended once published)

```bash
npm install @made-sci/design-system
```

### Option B — direct from GitHub (until first npm publish)

```bash
npm install github:MADE-SCI/made-design-system
```

> Lovable's Cloud build supports both. Private repos require the consumer
> project to have a deploy key or be in the same GitHub org.

## 2. Wire up Tailwind

Most Made Scientific projects already use Tailwind. Extend the existing config with the preset:

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";
import madePreset from "@made-sci/design-system/tailwind.preset";

export default {
  presets: [madePreset],
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  // your project-specific extends go here — they merge with the preset
} satisfies Config;
```

The preset is **additive**. Your project keeps its own `colors`, `fontFamily`, etc. — the preset only adds the `md-*` utilities.

## 3. Load the CSS tokens

Once at app entry, before any component renders:

```ts
// src/main.tsx (or app/layout.tsx for Next.js)
import "@made-sci/design-system/tokens.css";
```

That single import publishes every `--md-*` CSS variable on `:root`, plus the `.dark` and `.density-dense` overrides.

## 4. Mount DensityProvider (optional but recommended)

If you want the density toggle to work, wrap your app:

```tsx
import { DensityProvider } from "@made-sci/design-system";

createRoot(rootEl).render(
  <DensityProvider>
    <App />
  </DensityProvider>,
);
```

If you don't, components still render in "briefing" (default) mode — they just can't be flipped.

## 5. Use components

```tsx
import { EmptyState, LoadingState, ErrorState, FreshnessBadge } from "@made-sci/design-system";
import { Inbox } from "lucide-react";

function AccountsList() {
  const { data, isLoading, error, dataUpdatedAt, refetch } = useAccounts();

  if (isLoading) return <LoadingState variant="table" rows={8} />;
  if (error) return <ErrorState retry={{ label: "Retry", onClick: refetch }} />;
  if (data?.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        headline="No accounts yet"
        subhead="Add your first account to get started."
        action={{ label: "Add account", onClick: openCreateModal }}
      />
    );
  }

  return (
    <>
      <FreshnessBadge updatedAt={dataUpdatedAt} />
      {/* ... your table */}
    </>
  );
}
```

## Lovable-specific notes

Lovable's Cloud build supports installing arbitrary npm packages. To use this design system in a Lovable project:

1. In the Lovable project, open `package.json` (via the file editor)
2. Add `"@made-sci/design-system": "^0.1.0"` to `dependencies`
3. Lovable's auto-build will install it on the next build
4. Follow steps 2–5 above

If Lovable's build can't reach the package (private repo, npm access denied), copy the latest `dist/` files into a `vendor/made-design-system/` directory in the Lovable project and import from there as a temporary fallback. The tracking project (`PROJ-031`) documents the workaround in `INTEGRATION.md`.

## Migrating from minimal-science-hub's local design-system

If you're working in `minimal-science-hub` and want to use the standalone package instead of the inlined `src/design-system/`:

```ts
// Before
import { EmptyState } from "@/design-system";

// After
import { EmptyState } from "@made-sci/design-system";
```

The APIs are identical. The local `src/design-system/` folder will eventually be deleted once all consumers point at the package. Until then both coexist without conflict.

## Troubleshooting

**"My `bg-md-teal` class isn't applying anything."**
You didn't load `tokens.css`. The Tailwind utility resolves to `var(--md-teal)`, and that variable is only defined when `tokens.css` is imported.

**"Density toggle doesn't do anything."**
You didn't wrap the app in `<DensityProvider>`. The toggle clicks but the context can't broadcast the change. Provider must be mounted ABOVE every consumer of `useDensity` (i.e. at app root).

**"TypeScript can't find `@made-sci/design-system/tailwind.preset`."**
Add `"moduleResolution": "Bundler"` (or `"Node16"` / `"NodeNext"`) to your `tsconfig.json` so TS reads `package.json` `exports` correctly. Older `"node"` resolution doesn't support subpath exports.

**"My consumer build complains about CSS in JS."**
The package marks `*.css` as side-effectful. Import `tokens.css` once at entry; don't re-import it in component files.

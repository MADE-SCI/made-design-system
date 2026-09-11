# Internal reporting expression

The approved macOS reporting proof (MADE-SCI/made-reporting-ux#327) uses system typography and cool surfaces while retaining MADE colors. This opt-in expression supports production adoption without changing the package's default brand fonts or palette.

Import `@made-sci/design-system/instrument.css`, then place `data-made-expression="instrument"` on a migrated surface. The stylesheet declares only `--md-instrument-*` variables within that scope. It does not style elements or override existing variables. Consumers explicitly bridge semantic roles to their component system. Color roles are HSL channels; use `hsl(var(--md-instrument-action))`. Typography is a system stack, with no bundled font or network request.

Portaled UI must receive the same scope marker, or use a deliberately scoped document-level expression with cleanup. Do not place a global marker on external/customer-facing pages. `.dark` ancestors and a `.dark` scope are supported; consumers still need visual review of their own semantic bridge.

`src/instrument.tokens.json` is the single source for CSS, JSON and JavaScript exports. `node scripts/build-instrument.mjs` generates artifacts; `--check` rejects drift. Native consumers can map the JSON roles; this package does not claim a complete SwiftUI library. The default tokens and preset remain compatible.

Adoption is separate from the never-merge proof. Application vendor updates must record this package's exact source commit and match its generated files. A package PR alone does not update the reporting application's vendored dependency.

// Build helper: copies tokens.css into dist and emits the Tailwind preset
// in CJS, ESM, and .d.ts form. Run as the last step of `npm run build` so
// the package's `files` allowlist actually points at real artifacts.

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// 1) Copy tokens.css into dist so consumers can `import "@made-sci/design-system/tokens.css"`
const tokensSrc = resolve(root, "src/tokens.css");
const tokensDest = resolve(root, "dist/tokens.css");
mkdirSync(dirname(tokensDest), { recursive: true });
copyFileSync(tokensSrc, tokensDest);

// 1b) Copy the DTCG token export into dist (machine source of truth; consumers
//     import from `@made-sci/design-system/tokens.dtcg.json`, and tools like
//     Style Dictionary / Tokens Studio / Figma can ingest it directly).
const dtcgSrc = resolve(root, "src/tokens.dtcg.json");
if (existsSync(dtcgSrc)) {
  copyFileSync(dtcgSrc, resolve(root, "dist/tokens.dtcg.json"));
}

// 2) Emit the Tailwind preset in three flavors. We don't put the preset in
//    src/ because it's a build-time artifact consumers import from
//    `@made-sci/design-system/tailwind.preset` — it doesn't ship through
//    the JS bundle's barrel.
const presetTs = readFileSync(resolve(root, "tailwind.preset.ts"), "utf8");

// Strip the TypeScript type annotation so we can land plain JS files.
const presetJs = presetTs
  .replace(/import\s+type\s+\{\s*Config\s*\}\s+from\s+["']tailwindcss["'];?\n?/g, "")
  .replace(/\s+satisfies\s+Partial<Config>/g, "");

writeFileSync(resolve(root, "tailwind.preset.js"), presetJs.replace(/^export default/m, "export default"));
writeFileSync(
  resolve(root, "tailwind.preset.cjs"),
  presetJs
    .replace(/^export default ([\s\S]*);?\s*$/m, "module.exports = $1;")
    .trim() + "\n",
);
writeFileSync(
  resolve(root, "tailwind.preset.d.ts"),
  `import type { Config } from "tailwindcss";\ndeclare const preset: Partial<Config>;\nexport default preset;\n`,
);

console.log("✓ tokens.css + tailwind.preset.{js,cjs,d.ts} written to package root + dist");

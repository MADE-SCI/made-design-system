import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The 0.2.0 notes state the rule this file enforces: "tokens.css (CSS runtime)
 * and tokens.dtcg.json (machine SoT) must be kept in lockstep going forward."
 *
 * Font families were the case that proved the rule needed a test rather than a
 * sentence. They were declared in the DTCG export, in the Tailwind preset and
 * in the README — but never as CSS custom properties, so consumers importing
 * tokens.css and writing plain CSS inherited every color and learned nothing
 * about the type stack. Two client-facing products drifted off-brand that way
 * and nobody noticed for months.
 */

const root = join(__dirname, "..");
const css = readFileSync(join(root, "src/tokens.css"), "utf8");
const dtcg = JSON.parse(readFileSync(join(root, "src/tokens.dtcg.json"), "utf8"));

/** `"Funnel Display", Inter, system-ui, sans-serif` → the same list, unquoted. */
function parseCssStack(value: string): string[] {
  return value
    .split(",")
    .map((part) => part.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

function cssVar(name: string): string | undefined {
  return new RegExp(`--${name}:\\s*([^;]+);`).exec(css)?.[1].trim();
}

describe("font family tokens", () => {
  const families = dtcg.primitive["font-family"] as Record<
    string,
    { $value: string[] } | string
  >;
  const names = Object.keys(families).filter((key) => !key.startsWith("$"));

  it("declares a family in the DTCG export", () => {
    expect(names).not.toHaveLength(0);
  });

  it.each(names)("exposes --md-font-%s as a CSS custom property", (name) => {
    expect(cssVar(`md-font-${name}`)).toBeDefined();
  });

  it.each(names)("keeps --md-font-%s identical to the DTCG stack", (name) => {
    const expected = (families[name] as { $value: string[] }).$value;
    expect(parseCssStack(cssVar(`md-font-${name}`)!)).toEqual(expected);
  });

  it("never ships an @font-face or a font-CDN reference", () => {
    // Consumers self-host. A confidential client presentation must not tell a
    // third party who is reading it, so this package names families only.
    //
    // Comments are stripped first: the tokens carry a comment SAYING there is
    // no @font-face here, and the first version of this test failed on its own
    // prose. Assert against declarations, not against what the file says.
    const declarations = css.replace(/\/\*[\s\S]*?\*\//g, "");
    expect(declarations).not.toMatch(/@font-face/i);
    expect(declarations).not.toMatch(/fonts\.(googleapis|gstatic)\.com/i);
  });
});

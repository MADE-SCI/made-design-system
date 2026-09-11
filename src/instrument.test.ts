import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import tokens from './instrument.tokens.json';

function luminance(channels: string) {
  const [h, s, l] = channels.replace(/%/g, '').split(' ').map(Number);
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const rgb = [0, 8, 4].map(n => {
    const k = (n + h / 30) % 12;
    const v = l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
}
function contrast(a: string, b: string) {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + .05) / (values[1] + .05);
}

describe('instrument expression', () => {
  it('ships artifacts generated from the current source', () => {
    execFileSync(process.execPath, ['scripts/build-instrument.mjs', '--check']);
  });
  it('never changes defaults without an explicit scope', () => {
    const css = readFileSync('dist/instrument.css', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    for (const rule of css.split('}').filter(rule => rule.trim())) {
      expect(rule.split('{')[0]).toContain('[data-made-expression="instrument"]');
    }
    expect(css).not.toMatch(/--(?:background|font-sans|md-font-body):/);
  });
  for (const mode of ['light', 'dark'] as const) {
    const theme = tokens[mode];
    it(`${mode} text roles meet normal-text contrast`, () => {
      for (const surface of ['canvas', 'surface', 'surface-secondary', 'surface-selected'] as const) {
        expect(contrast(theme.text, theme[surface])).toBeGreaterThanOrEqual(4.5);
        expect(contrast(theme['text-secondary'], theme[surface])).toBeGreaterThanOrEqual(4.5);
      }
      expect(contrast(theme['on-action'], theme.action)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(theme.focus, theme.surface)).toBeGreaterThanOrEqual(3);
    });
  }
});

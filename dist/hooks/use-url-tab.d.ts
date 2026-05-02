/**
 * Sync a tab UI control with the URL search params (?tab=value).
 *
 * Why
 * ───
 * Briefing sheets have heavy tab content (trial timeline, contact tables,
 * messaging strategy, etc.). Without URL state, the tab choice is lost on:
 *   - browser back/forward
 *   - share-the-URL workflows
 *   - hard refresh
 *
 * With URL state, /reports/briefing-sheets/abc-123?tab=trials is a stable
 * deep link a BD rep can paste into Slack and the recipient lands directly
 * on the trials view.
 *
 * Usage
 * ─────
 *   const [tab, setTab] = useUrlTab('contacts', [
 *     'contacts', 'positioning', 'pipeline', 'trials', 'news', 'engagement',
 *   ]);
 *   <Tabs value={tab} onValueChange={setTab}>...</Tabs>
 *
 * The allowedValues parameter guards against open-redirect-style abuse
 * (someone crafts a URL with ?tab=<weird> and the page would otherwise
 * render an unknown empty tab). Anything outside the list collapses to
 * the default.
 *
 * Setting the default value REPLACES instead of pushing to history, so
 * the user's first tab change creates a single back-button step rather
 * than two.
 */
export declare function useUrlTab(defaultValue: string, allowedValues: readonly string[], paramName?: string): [string, (next: string) => void];
//# sourceMappingURL=use-url-tab.d.ts.map
const MINUTE = 60_000;
const HOUR = 3_600_000;
const DAY = 86_400_000;
const WEEK = 604_800_000;
/** Beyond this age, show the absolute date instead of relative text. */
const RELATIVE_CUTOFF = 30 * DAY;

/** Stable, locale-aware absolute date: "3 Sept 2026". Safe to server-render. */
export function absoluteDate(iso: string, locale: string): string {
	return new Intl.DateTimeFormat(locale, {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	}).format(new Date(iso));
}

/**
 * Human relative time in the config locale: "2 days ago", "yesterday",
 * "last week". Falls back to the absolute date past the cutoff.
 * Compute client-side only — server output must stay absolute (see component).
 */
export function relativeTime(iso: string, locale: string, now: number = Date.now()): string {
	const diff = now - new Date(iso).getTime();
	if (diff < 0 || diff >= RELATIVE_CUTOFF) return absoluteDate(iso, locale);
	const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
	if (diff < HOUR) return rtf.format(-Math.max(1, Math.round(diff / MINUTE)), 'minute');
	if (diff < DAY) return rtf.format(-Math.round(diff / HOUR), 'hour');
	if (diff < WEEK) return rtf.format(-Math.round(diff / DAY), 'day');
	return rtf.format(-Math.round(diff / WEEK), 'week');
}

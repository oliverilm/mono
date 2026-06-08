/** Shared spacing, typography, and radii for the judo timer app. */
export const space = {
	xs: '0.25rem',
	sm: '0.5rem',
	md: '0.75rem',
	lg: '1rem',
	xl: '1.25rem',
	xxl: '1.5rem',
} as const;

export const font = {
	caption: '0.6875rem',
	sm: '0.75rem',
	md: '0.875rem',
	lg: '0.9375rem',
	xl: '1rem',
	'2xl': '1.25rem',
	flag: 'clamp(2.5rem, 6.5vw, 3.5rem)',
	name: 'clamp(1.625rem, 5vw, 2.5rem)',
	score: 'clamp(2rem, 4.5vw, 3rem)',
	timerMain: 'clamp(2.5rem, min(14vw, 18vh), 6rem)',
	timerSecondary: 'clamp(1.75rem, min(10vw, 12vh), 4rem)',
} as const;

export const radius = {
	sm: '0.5rem',
	md: '0.625rem',
	lg: '0.875rem',
	xl: '1rem',
	pill: '999px',
} as const;

export const pagePadding = `clamp(${space.md}, 2vw, ${space.xl})`;
export const panelPadding = space.lg;

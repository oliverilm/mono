import { style } from '@vanilla-extract/css';

export const root = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '1rem',
});

export const logo = style({
	display: 'block',
	flexShrink: 0,
	objectFit: 'contain',
	filter: 'drop-shadow(0 12px 24px rgba(15, 23, 42, 0.18))',
});

export const wordmark = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '0.25rem',
});

export const brand = style({
	fontSize: '1.75rem',
	fontWeight: 700,
	letterSpacing: '-0.04em',
	color: '#0f172a',
});

export const tagline = style({
	fontSize: '0.875rem',
	fontWeight: 500,
	color: '#64748b',
	letterSpacing: '0.08em',
	textTransform: 'uppercase',
});

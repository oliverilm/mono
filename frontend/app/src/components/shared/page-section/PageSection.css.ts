import { style } from '@vanilla-extract/css';
import { vars } from '@styles/theme/vars.css';

export const section = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '1.25rem',
	width: '100%',
});

export const header = style({
	display: 'flex',
	alignItems: 'flex-end',
	justifyContent: 'space-between',
	gap: '1rem',
	flexWrap: 'wrap',
});

export const title = style({
	margin: 0,
	fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
	fontWeight: 700,
	color: vars.color.text.primary,
	letterSpacing: '-0.03em',
});

export const subtitle = style({
	margin: '0.35rem 0 0',
	fontSize: '0.9375rem',
	color: vars.color.text.muted,
	lineHeight: 1.5,
	maxWidth: '42rem',
});

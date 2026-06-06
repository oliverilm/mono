import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme/vars.css';

export const item = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '0.35rem',
});

export const label = style({
	display: 'flex',
	alignItems: 'center',
	gap: '0.4rem',
	margin: 0,
	fontSize: '0.75rem',
	fontWeight: 600,
	color: vars.color.text.muted,
	textTransform: 'uppercase',
	letterSpacing: '0.04em',
});

export const value = style({
	margin: 0,
	fontSize: '0.9375rem',
	color: vars.color.text.secondary,
	lineHeight: 1.45,
});

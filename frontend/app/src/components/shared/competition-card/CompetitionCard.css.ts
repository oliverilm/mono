import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme/vars.css';

export const card = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
	height: '100%',
	padding: '1.25rem',
});

export const cardHeader = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '0.75rem',
});

export const name = style({
	margin: 0,
	fontSize: '1.0625rem',
	fontWeight: 700,
	color: vars.color.text.primary,
	lineHeight: 1.35,
	letterSpacing: '-0.02em',
});

export const meta = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '0.5rem',
});

import { style } from '@vanilla-extract/css';
import { vars } from '@styles/theme/vars.css';

export const row = style({
	display: 'grid',
	gridTemplateColumns: '1.25rem 1fr',
	gap: '0.5rem',
	alignItems: 'start',
});

export const icon = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	paddingTop: '0.1rem',
});

export const value = style({
	fontSize: '0.875rem',
	color: vars.color.text.secondary,
	lineHeight: 1.45,
});

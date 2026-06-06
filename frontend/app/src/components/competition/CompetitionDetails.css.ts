import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme/vars.css';

export const panel = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '1.25rem',
	width: '100%',
	padding: 'clamp(1.25rem, 3vw, 2rem)',
});

export const header = style({
	display: 'flex',
	alignItems: 'flex-start',
	justifyContent: 'space-between',
	gap: '1rem',
	flexWrap: 'wrap',
});

export const name = style({
	margin: 0,
	fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
	fontWeight: 700,
	color: vars.color.text.primary,
	lineHeight: 1.2,
	letterSpacing: '-0.03em',
});

export const badges = style({
	marginTop: '0.75rem',
});

export const description = style({
	margin: 0,
	fontSize: '1rem',
	color: vars.color.text.secondary,
	lineHeight: 1.6,
	maxWidth: '52rem',
});

export const grid = style({
	display: 'grid',
	gap: '1rem',
	margin: 0,
	gridTemplateColumns: '1fr',
	'@media': {
		'screen and (min-width: 640px)': {
			gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
		},
		'screen and (min-width: 1024px)': {
			gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
		},
	},
});

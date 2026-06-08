import { style } from '@vanilla-extract/css';
import { vars } from '@styles/theme/vars.css';

const base = {
	display: 'inline-flex',
	alignItems: 'center',
	gap: '0.35rem',
	marginBottom: '0.5rem',
	fontSize: '0.875rem',
	fontWeight: 600,
	textDecoration: 'none',
	selectors: {
		'&:hover': {
			textDecoration: 'underline',
		},
	},
};

export const dashboard = style({
	...base,
	color: vars.color.text.linkOnDark,
});

export const light = style({
	...base,
	color: vars.color.text.link,
});

import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme/vars.css';

const cardBase = {
	borderRadius: '1rem',
	border: `1px solid ${vars.color.border.default}`,
	background: vars.gradient.glassCard,
	color: 'inherit',
	textDecoration: 'none',
	boxShadow: vars.shadow.md,
	backdropFilter: 'blur(8px)',
	transition:
		'transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease, background 160ms ease',
};

export const card = style({
	...cardBase,
	display: 'flex',
	alignItems: 'center',
	gap: '1rem',
	padding: '1rem 1.125rem',
	selectors: {
		'&:hover': {
			transform: 'translateY(-2px)',
			borderColor: vars.color.border.hover,
			boxShadow: vars.shadow.accent,
			background: vars.gradient.glassCardHover,
		},
	},
});

export const tile = style({
	...cardBase,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	gap: '1rem',
	height: '100%',
	padding: '1.25rem',
	selectors: {
		'&:hover': {
			transform: 'translateY(-2px)',
			borderColor: vars.color.border.hover,
			boxShadow: vars.shadow.accent,
			background: vars.gradient.glassCardHover,
		},
	},
});

export const iconWrap = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexShrink: 0,
	width: '3rem',
	height: '3rem',
	borderRadius: '0.875rem',
	backgroundColor: vars.color.background.iconAccent,
	border: `1px solid ${vars.color.border.accent}`,
});

export const content = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '0.375rem',
	flex: 1,
	minWidth: 0,
	width: '100%',
});

export const name = style({
	fontSize: '1rem',
	fontWeight: 700,
	color: vars.color.text.primary,
	letterSpacing: '-0.02em',
});

export const description = style({
	fontSize: '0.8125rem',
	color: vars.color.text.secondary,
	lineHeight: 1.45,
});

export const chevron = style({
	flexShrink: 0,
	alignSelf: 'flex-end',
});

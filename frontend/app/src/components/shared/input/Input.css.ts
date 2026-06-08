import { style } from '@vanilla-extract/css';
import { vars } from '@styles/theme/vars.css';

export const field = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '0.5rem',
});

export const label = style({
	fontSize: '0.875rem',
	fontWeight: 600,
	color: vars.color.text.label,
});

export const inputWrapper = style({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
});

export const inputIcon = style({
	position: 'absolute',
	left: '0.875rem',
	display: 'flex',
	alignItems: 'center',
	pointerEvents: 'none',
});

export const input = style({
	width: '100%',
	padding: '0.875rem 0.875rem 0.875rem 2.75rem',
	border: `1px solid ${vars.color.border.light}`,
	borderRadius: '0.875rem',
	backgroundColor: vars.color.background.input,
	color: vars.color.text.inverse,
	fontSize: '0.95rem',
	outline: 'none',
	transition:
		'border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease',
	selectors: {
		'&:focus': {
			borderColor: vars.color.border.focus,
			backgroundColor: vars.color.background.inputFocus,
			boxShadow: vars.shadow.focus,
		},
		'&::placeholder': {
			color: vars.color.text.muted,
		},
	},
});

export const numberInput = style([
	input,
	{
		paddingLeft: '2.75rem',
	},
]);

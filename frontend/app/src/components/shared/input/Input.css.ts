import { style } from '@vanilla-extract/css';

export const field = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '0.5rem',
});

export const label = style({
	fontSize: '0.875rem',
	fontWeight: 600,
	color: '#334155',
});

export const inputWrapper = style({
	position: 'relative',
});

export const inputIcon = style({
	position: 'absolute',
	top: '50%',
	left: '0.875rem',
	transform: 'translateY(-50%)',
	display: 'flex',
	pointerEvents: 'none',
});

export const input = style({
	width: '100%',
	padding: '0.875rem 0.875rem 0.875rem 2.75rem',
	border: '1px solid #e2e8f0',
	borderRadius: '0.875rem',
	backgroundColor: '#f8fafc',
	color: '#0f172a',
	fontSize: '0.95rem',
	outline: 'none',
	transition:
		'border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease',
	selectors: {
		'&:focus': {
			borderColor: '#3b82f6',
			backgroundColor: '#ffffff',
			boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.15)',
		},
		'&::placeholder': {
			color: '#94a3b8',
		},
	},
});

export const numberInput = style([
	input,
	{
		selectors: {
			'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
				WebkitAppearance: 'none',
				margin: 0,
			},
			'&[type=number]': {
				MozAppearance: 'textfield',
			},
		},
	},
]);

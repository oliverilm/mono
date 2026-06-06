import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme/vars.css';

const fadeUp = keyframes({
	from: {
		opacity: 0,
		transform: 'translateY(16px)',
	},
	to: {
		opacity: 1,
		transform: 'translateY(0)',
	},
});

export const page = style({
	minHeight: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '1.5rem',
	background: vars.gradient.pageLogin,
	fontFamily: vars.font.body,
});

export const modal = style({
	width: '100%',
	maxWidth: '26rem',
	padding: '2rem',
	borderRadius: '1.5rem',
	background: vars.color.background.surface,
	boxShadow: vars.shadow.modal,
	backdropFilter: 'blur(12px)',
	animation: `${fadeUp} 420ms ease-out`,
});

export const header = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '1.25rem',
	marginBottom: '1.75rem',
	textAlign: 'center',
});

export const title = style({
	margin: 0,
	fontSize: '1.5rem',
	fontWeight: 700,
	color: vars.color.text.inverse,
	letterSpacing: '-0.03em',
});

export const subtitle = style({
	margin: 0,
	fontSize: '0.95rem',
	color: vars.color.text.subtle,
	lineHeight: 1.5,
});

export const form = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
});

export const error = style({
	margin: 0,
	padding: '0.75rem 0.875rem',
	borderRadius: '0.75rem',
	backgroundColor: vars.color.background.error,
	border: `1px solid ${vars.color.border.error}`,
	color: vars.color.text.error,
	fontSize: '0.875rem',
	lineHeight: 1.4,
});

export const submitButton = style({
	marginTop: '0.5rem',
	width: '100%',
	padding: '0.95rem 1rem',
	border: 'none',
	borderRadius: '0.875rem',
	background: vars.gradient.accentButton,
	color: vars.color.text.onAccent,
	fontSize: '0.95rem',
	fontWeight: 700,
	cursor: 'pointer',
	boxShadow: vars.shadow.xl,
	transition: 'transform 160ms ease, box-shadow 160ms ease, filter 160ms ease',
	selectors: {
		'&:hover:not(:disabled)': {
			transform: 'translateY(-1px)',
			boxShadow: vars.shadow.xlHover,
			filter: 'brightness(1.03)',
		},
		'&:active:not(:disabled)': {
			transform: 'translateY(0)',
		},
		'&:disabled': {
			opacity: 0.7,
			cursor: 'not-allowed',
		},
	},
});

export const footer = style({
	marginTop: '1.5rem',
	paddingTop: '1.25rem',
	borderTop: `1px solid ${vars.color.border.light}`,
	textAlign: 'center',
	fontSize: '0.8125rem',
	color: vars.color.text.subtle,
	lineHeight: 1.5,
});

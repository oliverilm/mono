import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme/vars.css';

const pageBase = {
	minHeight: '100vh',
	padding: '1.5rem',
	background: vars.gradient.pageLogin,
	fontFamily: vars.font.body,
};

export const page = style(pageBase);

export const pageCentered = style({
	...pageBase,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

export const container = style({
	width: '100%',
	maxWidth: '26rem',
	padding: '2rem',
	borderRadius: '1.5rem',
	background: vars.color.background.surface,
	boxShadow: vars.shadow.modal,
});

export const title = style({
	margin: '0 0 0.75rem',
	fontSize: '1.5rem',
	fontWeight: 700,
	color: vars.color.text.inverse,
});

export const message = style({
	margin: 0,
	fontSize: '0.95rem',
	color: vars.color.text.subtle,
	lineHeight: 1.5,
});

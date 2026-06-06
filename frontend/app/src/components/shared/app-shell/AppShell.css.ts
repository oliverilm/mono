import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme/vars.css';

export const page = style({
	minHeight: '100vh',
	padding: '1.5rem',
	background: vars.gradient.pageLogin,
	fontFamily: vars.font.body,
});

export const container = style({
	width: '100%',
	maxWidth: '42rem',
	margin: '0 auto',
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

export const description = style({
	margin: 0,
	fontSize: '0.95rem',
	color: vars.color.text.subtle,
	lineHeight: 1.5,
});

export const placeholder = style({
	marginTop: '1.5rem',
	padding: '2rem',
	borderRadius: '0.875rem',
	border: `1px dashed ${vars.color.border.dashed}`,
	backgroundColor: vars.color.background.surfacePlaceholder,
	color: vars.color.text.subtle,
	fontSize: '0.875rem',
	textAlign: 'center',
});

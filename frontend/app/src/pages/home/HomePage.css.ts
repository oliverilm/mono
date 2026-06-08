import { style } from '@vanilla-extract/css';
import { vars } from '@styles/theme/vars.css';

export const loadingPage = style({
	minHeight: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: vars.gradient.pageSimple,
	fontFamily: vars.font.body,
});

export const loadingText = style({
	margin: 0,
	fontSize: '0.95rem',
	color: vars.color.text.muted,
});

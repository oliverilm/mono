import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme/vars.css';

export const root = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '0.75rem',
});

export const logo = style({
	borderRadius: '50%',
	objectFit: 'contain',
	filter: vars.shadow.logoDrop,
});

export const wordmark = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '0.125rem',
});

export const brand = style({
	fontSize: '1.25rem',
	fontWeight: 700,
	color: vars.color.text.inverse,
	letterSpacing: '-0.03em',
});

export const tagline = style({
	fontSize: '0.875rem',
	color: vars.color.text.subtle,
});

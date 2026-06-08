import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme/vars.css';
import { font, panelPadding, radius, space } from './judoTimer.tokens';

const pulse = keyframes({
	'0%, 100%': { opacity: 1 },
	'50%': { opacity: 0.65 },
});

export const panel = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%',
	minHeight: 0,
	padding: panelPadding,
	borderRadius: radius.lg,
	border: `1px solid ${vars.color.border.default}`,
	background: 'rgba(15, 23, 42, 0.45)',
	transition: 'border-color 200ms ease, box-shadow 200ms ease',
});

export const panelActive = style({
	borderColor: 'rgba(251, 191, 36, 0.65)',
	boxShadow: '0 0 24px rgba(251, 191, 36, 0.25)',
	background: 'rgba(251, 191, 36, 0.08)',
});

export const label = style({
	margin: `0 0 ${space.xs}`,
	fontSize: font.caption,
	fontWeight: 700,
	color: vars.color.text.muted,
	textTransform: 'uppercase',
	letterSpacing: '0.08em',
});

export const side = style({
	margin: `0 0 ${space.sm}`,
	fontSize: font.md,
	fontWeight: 600,
	color: vars.color.text.secondary,
});

export const timer = style({
	margin: 0,
	fontSize: font.timerSecondary,
	fontWeight: 800,
	fontVariantNumeric: 'tabular-nums',
	color: vars.color.text.primary,
	lineHeight: 1,
});

export const timerWazaAri = style({
	color: '#fcd34d',
});

export const timerIppon = style({
	color: '#f87171',
	animation: `${pulse} 0.8s ease-in-out infinite`,
});

export const hint = style({
	margin: `${space.md} 0 0`,
	fontSize: font.sm,
	color: vars.color.text.muted,
	textAlign: 'center',
});

export const idleHint = style({
	margin: 0,
	fontSize: font.md,
	color: vars.color.text.muted,
	textAlign: 'center',
	maxWidth: '14rem',
});

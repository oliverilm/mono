import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '@styles/theme/vars.css';
import { font, radius, space, winnerFont, winnerSpace } from '../winner.tokens';

const cardIn = keyframes({
	from: { opacity: 0, transform: 'scale(0.92) translateY(12px)' },
	to: { opacity: 1, transform: 'scale(1) translateY(0)' },
});

const shimmer = keyframes({
	'0%, 100%': { opacity: 0.5 },
	'50%': { opacity: 1 },
});

const cardBase = style({
	position: 'relative',
	width: 'max-content',
	maxWidth: winnerSpace.cardMaxWidth,
	maxHeight: 'min(90dvh, calc(100dvh - 2.5rem))',
	padding: winnerSpace.cardPadding,
	borderRadius: radius.xl,
	textAlign: 'center',
	boxShadow: `${vars.shadow.lg}, 0 0 0 1px rgba(255, 255, 255, 0.06) inset`,
	cursor: 'default',
	overflowY: 'auto',
	overscrollBehavior: 'contain',
	animation: `${cardIn} 450ms cubic-bezier(0.22, 1, 0.36, 1)`,
	selectors: {
		'&::before': {
			content: '""',
			position: 'absolute',
			top: 0,
			left: '50%',
			transform: 'translateX(-50%)',
			width: '70%',
			height: '3px',
			borderRadius: '0 0 999px 999px',
			background: 'linear-gradient(90deg, transparent, #fbbf24, transparent)',
			animation: `${shimmer} 2.4s ease-in-out infinite`,
		},
	},
});

export const card = style([
	cardBase,
	{
		border: `1px solid ${vars.color.border.default}`,
		background: vars.gradient.glassPanel,
		color: vars.color.text.primary,
	},
]);

export const cardWhite = style([
	cardBase,
	{
		border: '2px solid rgba(255, 255, 255, 0.65)',
		background:
			'linear-gradient(165deg, #ffffff 0%, #f1f5f9 45%, #e2e8f0 100%)',
		color: vars.color.text.inverse,
		boxShadow:
			'0 24px 64px rgba(15, 23, 42, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
	},
]);

export const cardBlue = style([
	cardBase,
	{
		border: '2px solid rgba(147, 197, 253, 0.45)',
		background:
			'linear-gradient(165deg, #2563eb 0%, #1d4ed8 42%, #1e3a8a 100%)',
		color: vars.color.text.primary,
		boxShadow:
			'0 24px 64px rgba(29, 78, 216, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.12) inset',
	},
]);

export const header = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: space.md,
	marginBottom: space.xl,
});

export const headerLine = style({
	flex: 1,
	maxWidth: '4rem',
	height: '1px',
	background: 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.65))',
	selectors: {
		'&:last-child': {
			background: 'linear-gradient(90deg, rgba(251, 191, 36, 0.65), transparent)',
		},
	},
});

export const kicker = style({
	margin: 0,
	fontSize: winnerFont.title,
	fontWeight: 800,
	textTransform: 'uppercase',
	letterSpacing: '0.18em',
	color: '#ca8a04',
});

export const body = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: space.lg,
	marginBottom: space.xl,
});

export const flag = style({
	fontSize: winnerFont.flag,
	lineHeight: 1,
	filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))',
});

export const nameBlock = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: space.sm,
	maxWidth: '100%',
});

export const side = style({
	fontSize: font.sm,
	fontWeight: 800,
	textTransform: 'uppercase',
	letterSpacing: '0.14em',
	opacity: 0.65,
});

export const club = style({
	margin: 0,
	fontSize: font.lg,
	fontWeight: 600,
	opacity: 0.8,
	lineHeight: 1.35,
});

export const name = style({
	margin: 0,
	fontSize: winnerFont.name,
	fontWeight: 900,
	lineHeight: 1.1,
	letterSpacing: '-0.03em',
});

export const drawTitle = style({
	margin: 0,
	fontSize: winnerFont.name,
	fontWeight: 900,
	letterSpacing: '-0.03em',
});

export const reasonBadge = style({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: `${space.sm} ${space.lg}`,
	borderRadius: radius.pill,
	fontSize: font.lg,
	fontWeight: 700,
	letterSpacing: '0.02em',
	border: '1px solid rgba(251, 191, 36, 0.35)',
	backgroundColor: 'rgba(251, 191, 36, 0.15)',
	color: 'inherit',
});

export const dismissHint = style({
	margin: `${space.xl} 0 0`,
	fontSize: font.sm,
	fontWeight: 500,
	opacity: 0.55,
	letterSpacing: '0.02em',
});

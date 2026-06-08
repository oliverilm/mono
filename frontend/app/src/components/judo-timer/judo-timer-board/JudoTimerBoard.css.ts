import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '@styles/theme/vars.css';
import { font, pagePadding, panelPadding, radius, space } from '../judoTimer.tokens';

const pulse = keyframes({
	'0%, 100%': { opacity: 1 },
	'50%': { opacity: 0.65 },
});

export const page = style({
	display: 'flex',
	flexDirection: 'column',
	minHeight: '100vh',
	width: '100%',
	background: vars.gradient.pageDashboard,
	fontFamily: vars.font.body,
	color: vars.color.text.primary,
});

export const topBar = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: space.md,
	padding: `${space.sm} ${pagePadding}`,
	borderBottom: `1px solid ${vars.color.border.subtle}`,
	backgroundColor: vars.color.background.topBar,
	backdropFilter: 'blur(12px)',
});

export const topBarLeft = style({
	display: 'flex',
	alignItems: 'center',
	gap: space.md,
	minWidth: 0,
});

export const tatamiBadge = style({
	display: 'inline-flex',
	alignItems: 'center',
	gap: space.xs,
	padding: `${space.xs} ${space.md}`,
	borderRadius: radius.pill,
	backgroundColor: 'rgba(37, 99, 235, 0.22)',
	border: `1px solid ${vars.color.border.accentStrong}`,
	fontSize: font.sm,
	fontWeight: 700,
	color: vars.color.text.linkOnDark,
	textTransform: 'uppercase',
	letterSpacing: '0.05em',
});

export const topBarTitle = style({
	margin: 0,
	fontSize: font.lg,
	fontWeight: 700,
	color: vars.color.text.primary,
});

export const topBarActions = style({
	display: 'flex',
	alignItems: 'center',
	gap: space.sm,
});

export const iconButton = style({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: `${space.sm} ${space.md}`,
	borderRadius: radius.sm,
	border: `1px solid ${vars.color.border.strong}`,
	backgroundColor: vars.color.background.glass,
	color: vars.color.text.secondary,
	fontSize: font.sm,
	fontWeight: 600,
	cursor: 'pointer',
	textDecoration: 'none',
	transition: 'background-color 160ms ease, color 160ms ease',
	selectors: {
		'&:hover': {
			backgroundColor: vars.color.background.glassHover,
			color: vars.color.text.primary,
		},
	},
});

export const board = style({
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	gap: space.md,
	padding: pagePadding,
	minHeight: 0,
});

export const competitorsStack = style({
	display: 'flex',
	flexDirection: 'column',
	gap: space.md,
	flex: '1 1 50%',
	minHeight: 0,
});

export const timersSection = style({
	display: 'flex',
	flexDirection: 'column',
	flex: '1 1 50%',
	minHeight: 0,
});

export const timersRow = style({
	display: 'grid',
	gridTemplateColumns: '1fr',
	gap: space.sm,
	flex: 1,
	minHeight: 0,
	alignItems: 'stretch',
	'@media': {
		'screen and (min-width: 640px)': {
			gridTemplateColumns: '1.2fr 1fr',
		},
	},
});

export const mainTimer = style({
	appearance: 'none',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	height: '100%',
	minHeight: 0,
	padding: panelPadding,
	borderRadius: radius.lg,
	border: `1px solid ${vars.color.border.default}`,
	background: vars.gradient.glassPanel,
	boxShadow: vars.shadow.md,
	color: vars.color.text.primary,
	fontFamily: 'inherit',
	textAlign: 'center',
});

export const mainTimerInteractive = style({
	cursor: 'pointer',
	transition: 'border-color 160ms ease, background 160ms ease, transform 120ms ease',
	selectors: {
		'&:hover': {
			borderColor: vars.color.border.hover,
			background: vars.gradient.glassPanelHover,
		},
		'&:active': {
			transform: 'scale(0.99)',
		},
		'&:focus-visible': {
			outline: '2px solid #fbbf24',
			outlineOffset: '3px',
		},
	},
});

export const mainTimerDisabled = style({
	cursor: 'default',
	selectors: {
		'&:disabled': {
			opacity: 0.9,
		},
	},
});

export const mainTimerLabel = style({
	display: 'block',
	margin: `0 0 ${space.xs}`,
	fontSize: font.caption,
	fontWeight: 700,
	color: vars.color.text.muted,
	textTransform: 'uppercase',
	letterSpacing: '0.08em',
});

export const mainTimerValue = style({
	display: 'block',
	margin: 0,
	fontSize: font.timerMain,
	fontWeight: 800,
	fontVariantNumeric: 'tabular-nums',
	letterSpacing: '-0.04em',
	lineHeight: 1,
});

export const mainTimerHint = style({
	display: 'block',
	marginTop: space.sm,
	fontSize: font.sm,
	fontWeight: 600,
	color: vars.color.text.muted,
	letterSpacing: '0.02em',
});

export const mainTimerWarning = style({
	color: '#fcd34d',
});

export const mainTimerCritical = style({
	color: '#f87171',
	animation: `${pulse} 1s ease-in-out infinite`,
});

export const phaseBadge = style({
	marginTop: space.md,
	padding: `${space.xs} ${space.sm}`,
	borderRadius: radius.pill,
	fontSize: font.caption,
	fontWeight: 700,
	textTransform: 'uppercase',
	letterSpacing: '0.06em',
});

export const phaseReady = style({
	backgroundColor: 'rgba(100, 116, 139, 0.25)',
	color: vars.color.text.secondary,
});

export const phaseRunning = style({
	backgroundColor: 'rgba(34, 197, 94, 0.2)',
	color: vars.color.badge.published.text,
});

export const phasePaused = style({
	backgroundColor: 'rgba(245, 158, 11, 0.2)',
	color: vars.color.badge.draft.text,
});

export const phaseEnded = style({
	backgroundColor: 'rgba(239, 68, 68, 0.2)',
	color: '#fca5a5',
});

export const controls = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: space.sm,
	justifyContent: 'center',
	padding: `0 ${pagePadding} ${space.xl}`,
});

export const controlPrimary = style({
	padding: `${space.md} ${space.xl}`,
	border: 'none',
	borderRadius: radius.md,
	background: vars.gradient.accentButton,
	color: vars.color.text.onAccent,
	fontSize: font.lg,
	fontWeight: 700,
	cursor: 'pointer',
	minWidth: '7rem',
});

export const controlSecondary = style({
	padding: `${space.md} ${space.lg}`,
	border: `1px solid ${vars.color.border.strong}`,
	borderRadius: radius.md,
	backgroundColor: vars.color.background.glass,
	color: vars.color.text.secondary,
	fontSize: font.md,
	fontWeight: 600,
	cursor: 'pointer',
});

export const controlDanger = style([
	controlSecondary,
	{
		borderColor: 'rgba(248, 113, 113, 0.4)',
		color: '#fca5a5',
	},
]);

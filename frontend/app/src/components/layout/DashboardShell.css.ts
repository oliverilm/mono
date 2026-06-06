import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme/vars.css';

export const page = style({
	display: 'flex',
	flexDirection: 'column',
	minHeight: '100vh',
	width: '100%',
	background: vars.gradient.pageDashboard,
	fontFamily: vars.font.body,
});

export const topBar = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: '1rem',
	flexWrap: 'wrap',
	width: '100%',
	padding: '1rem clamp(1rem, 3vw, 2.5rem)',
	borderBottom: `1px solid ${vars.color.border.subtle}`,
	backgroundColor: vars.color.background.topBar,
	backdropFilter: 'blur(12px)',
});

export const brand = style({
	display: 'flex',
	alignItems: 'center',
	gap: '0.875rem',
	minWidth: 0,
});

export const brandLabel = style({
	margin: 0,
	fontSize: '1.125rem',
	fontWeight: 700,
	color: vars.color.text.primary,
	letterSpacing: '-0.03em',
});

export const brandSubtitle = style({
	margin: 0,
	fontSize: '0.8125rem',
	color: vars.color.text.muted,
});

export const topBarActions = style({
	display: 'flex',
	alignItems: 'center',
	gap: '0.75rem',
	flexWrap: 'wrap',
	marginLeft: 'auto',
});

export const userGreeting = style({
	margin: 0,
	fontSize: '0.875rem',
	color: vars.color.text.secondary,
});

export const logoutButton = style({
	padding: '0.55rem 0.9rem',
	border: `1px solid ${vars.color.border.strong}`,
	borderRadius: '0.75rem',
	backgroundColor: vars.color.background.glass,
	color: vars.color.text.secondary,
	fontSize: '0.8125rem',
	fontWeight: 600,
	cursor: 'pointer',
	transition:
		'border-color 160ms ease, color 160ms ease, background-color 160ms ease',
	selectors: {
		'&:hover': {
			borderColor: vars.color.border.strong,
			color: vars.color.text.primary,
			backgroundColor: vars.color.background.glassHover,
		},
	},
});

export const main = style({
	display: 'flex',
	flexDirection: 'column',
	gap: 'clamp(1.75rem, 4vw, 3rem)',
	flex: 1,
	width: '100%',
	padding: 'clamp(1.25rem, 3vw, 2.5rem)',
});

export const competitionGrid = style({
	display: 'grid',
	width: '100%',
	gap: '1rem',
	gridTemplateColumns: '1fr',
	'@media': {
		'screen and (min-width: 640px)': {
			gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
		},
		'screen and (min-width: 1100px)': {
			gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
		},
		'screen and (min-width: 1500px)': {
			gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
		},
	},
});

export const appGrid = style({
	display: 'grid',
	width: '100%',
	gap: '1rem',
	gridTemplateColumns: '1fr',
	'@media': {
		'screen and (min-width: 640px)': {
			gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
		},
		'screen and (min-width: 1024px)': {
			gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
		},
	},
});

export const emptyState = style({
	width: '100%',
	padding: 'clamp(1.5rem, 4vw, 2.5rem)',
	borderRadius: '1rem',
	border: `1px dashed ${vars.color.border.strong}`,
	backgroundColor: vars.color.background.glassEmpty,
	textAlign: 'center',
});

export const emptyStateTitle = style({
	margin: 0,
	fontSize: '1rem',
	fontWeight: 700,
	color: vars.color.text.secondary,
});

export const emptyStateText = style({
	margin: '0.5rem 0 0',
	fontSize: '0.875rem',
	color: vars.color.text.muted,
	lineHeight: 1.5,
});

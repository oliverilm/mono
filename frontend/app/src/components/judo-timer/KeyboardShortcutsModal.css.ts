import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme/vars.css';
import { font, radius, space } from './judoTimer.tokens';

export const title = style({
	margin: 0,
	fontSize: font['2xl'],
	fontWeight: 800,
	color: vars.color.text.primary,
	letterSpacing: '-0.02em',
});

export const subtitle = style({
	margin: `${space.xs} 0 ${space.xl}`,
	fontSize: font.md,
	color: vars.color.text.muted,
	lineHeight: 1.5,
});

export const sectionList = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'stretch',
	gap: space.xl,
	margin: 0,
	padding: 0,
	listStyle: 'none',
	width: '100%',
});

export const section = style({
	display: 'flex',
	flexDirection: 'column',
	gap: space.sm,
});

export const sectionTitle = style({
	margin: 0,
	fontSize: font.sm,
	fontWeight: 800,
	textTransform: 'uppercase',
	letterSpacing: '0.1em',
	color: vars.color.text.muted,
});

export const shortcutList = style({
	display: 'flex',
	flexDirection: 'column',
	gap: space.sm,
	margin: 0,
	padding: 0,
	listStyle: 'none',
});

export const shortcutRow = style({
	display: 'grid',
	gridTemplateColumns: 'auto auto',
	alignItems: 'center',
	gap: space.lg,
	padding: `${space.sm} ${space.md}`,
	borderRadius: radius.sm,
	backgroundColor: vars.color.background.glass,
	border: `1px solid ${vars.color.border.subtle}`,
});

export const keys = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: space.xs,
});

export const key = style({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	minWidth: '2rem',
	padding: `${space.xs} ${space.sm}`,
	borderRadius: radius.sm,
	border: `1px solid ${vars.color.border.strong}`,
	backgroundColor: 'rgba(15, 23, 42, 0.35)',
	boxShadow: '0 2px 0 rgba(0, 0, 0, 0.25)',
	fontSize: font.sm,
	fontWeight: 700,
	fontFamily: 'inherit',
	color: vars.color.text.primary,
	lineHeight: 1.2,
});

export const description = style({
	margin: 0,
	fontSize: font.md,
	fontWeight: 500,
	color: vars.color.text.secondary,
	lineHeight: 1.4,
});

export const dismissHint = style({
	margin: `${space.xl} 0 0`,
	fontSize: font.sm,
	fontWeight: 500,
	color: vars.color.text.muted,
	textAlign: 'center',
});

export const closeButton = style({
	display: 'block',
	alignSelf: 'stretch',
	marginTop: space.lg,
	padding: `${space.md} ${space.lg}`,
	border: `1px solid ${vars.color.border.strong}`,
	borderRadius: radius.md,
	backgroundColor: vars.color.background.glass,
	color: vars.color.text.secondary,
	fontSize: font.md,
	fontWeight: 600,
	fontFamily: 'inherit',
	cursor: 'pointer',
	transition: 'background-color 160ms ease, color 160ms ease',
	selectors: {
		'&:hover': {
			backgroundColor: vars.color.background.glassHover,
			color: vars.color.text.primary,
		},
		'&:focus-visible': {
			outline: '2px solid #fbbf24',
			outlineOffset: '2px',
		},
	},
});

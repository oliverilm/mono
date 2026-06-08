import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme/vars.css';
import { font, radius, space } from './judoTimer.tokens';

export const title = style({
	margin: `0 0 ${space.xs}`,
	fontSize: font['2xl'],
	fontWeight: 700,
	color: vars.color.text.primary,
});

export const subtitle = style({
	margin: `0 0 ${space.xl}`,
	fontSize: font.md,
	color: vars.color.text.muted,
	lineHeight: 1.5,
});

export const form = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'stretch',
	gap: space.lg,
	width: 'max-content',
	maxWidth: '100%',
});

export const field = style({
	display: 'flex',
	flexDirection: 'column',
	gap: space.sm,
});

export const label = style({
	fontSize: font.sm,
	fontWeight: 600,
	color: vars.color.text.muted,
	textTransform: 'uppercase',
	letterSpacing: '0.04em',
});

export const select = style({
	padding: `${space.md} ${space.lg}`,
	borderRadius: radius.md,
	border: `1px solid ${vars.color.border.default}`,
	backgroundColor: 'rgba(15, 23, 42, 0.4)',
	color: vars.color.text.primary,
	fontSize: font.lg,
	outline: 'none',
});

export const input = style([select]);

export const durationGrid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gap: space.sm,
});

export const durationOption = style({
	padding: space.md,
	borderRadius: radius.md,
	border: `1px solid ${vars.color.border.default}`,
	backgroundColor: 'rgba(15, 23, 42, 0.35)',
	color: vars.color.text.secondary,
	fontSize: font.md,
	fontWeight: 600,
	cursor: 'pointer',
	transition: 'border-color 160ms ease, background-color 160ms ease',
});

export const durationOptionSelected = style([
	durationOption,
	{
		borderColor: vars.color.border.hover,
		backgroundColor: 'rgba(37, 99, 235, 0.25)',
		color: vars.color.text.primary,
	},
]);

export const tatamiGrid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(4, 1fr)',
	gap: space.sm,
});

export const tatamiOption = style([durationOption]);

export const tatamiOptionSelected = style([durationOptionSelected]);

export const actions = style({
	display: 'flex',
	gap: space.md,
	marginTop: space.sm,
});

export const submitButton = style({
	flex: 1,
	padding: `${space.md} ${space.lg}`,
	border: 'none',
	borderRadius: radius.md,
	background: vars.gradient.accentButton,
	color: vars.color.text.onAccent,
	fontSize: font.lg,
	fontWeight: 700,
	cursor: 'pointer',
});

export const cancelButton = style({
	padding: `${space.md} ${space.lg}`,
	border: `1px solid ${vars.color.border.strong}`,
	borderRadius: radius.md,
	backgroundColor: 'transparent',
	color: vars.color.text.secondary,
	fontSize: font.md,
	fontWeight: 600,
	cursor: 'pointer',
});

export const channelHint = style({
	margin: `${space.md} 0 0`,
	padding: `${space.md} ${space.lg}`,
	borderRadius: radius.sm,
	backgroundColor: 'rgba(37, 99, 235, 0.12)',
	border: `1px solid ${vars.color.border.accent}`,
	fontSize: font.sm,
	color: vars.color.text.secondary,
	lineHeight: 1.45,
});

export const channelCode = style({
	fontFamily: 'ui-monospace, monospace',
	color: vars.color.text.linkOnDark,
});

export const fighterFieldset = style({
	margin: 0,
	padding: space.md,
	border: `1px solid ${vars.color.border.default}`,
	borderRadius: radius.md,
});

export const legend = style({
	padding: `0 ${space.sm}`,
	fontSize: font.sm,
	fontWeight: 600,
	color: vars.color.text.muted,
	textTransform: 'uppercase',
	letterSpacing: '0.04em',
});

export const fighterGrid = style({
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	gap: space.sm,
	marginTop: space.sm,
});

export const inputFull = style([
	input,
	{
		gridColumn: '1 / -1',
	},
]);

import { style } from '@vanilla-extract/css';
import { vars } from '@styles/theme/vars.css';
import { font, panelPadding, radius, space } from '../judoTimer.tokens';

const SCORE_CELL_MIN = 'clamp(4.25rem, 9vw, 5.75rem)';
const SCORE_COLUMN_COUNT = 5;
const controlsWidth = `calc(${SCORE_COLUMN_COUNT} * ${SCORE_CELL_MIN} + ${SCORE_COLUMN_COUNT - 1} * ${space.sm})`;

const panelPaddingRight = 'clamp(2.75rem, 10vw, 5rem)';

const panelBase = {
	display: 'grid',
	gridTemplateColumns: 'minmax(0, 1fr) auto',
	alignItems: 'center',
	gap: space.xl,
	flex: 1,
	minHeight: 0,
	padding: `${panelPadding} ${panelPaddingRight} ${panelPadding} ${panelPadding}`,
	borderRadius: radius.xl,
	boxShadow: vars.shadow.md,
	'@media': {
		'screen and (max-width: 720px)': {
			gridTemplateColumns: '1fr',
		},
	},
} as const;

export const whitePanel = style({
	...panelBase,
	border: '2px solid rgba(255, 255, 255, 0.6)',
	background: 'linear-gradient(160deg, #f8fafc 0%, #e2e8f0 100%)',
	color: vars.color.text.inverse,
});

export const bluePanel = style({
	...panelBase,
	border: '2px solid rgba(96, 165, 250, 0.5)',
	background: 'linear-gradient(160deg, #1d4ed8 0%, #1e3a8a 100%)',
	color: vars.color.text.primary,
});

export const activePanel = style({
	boxShadow: '0 0 0 3px rgba(251, 191, 36, 0.65), 0 8px 24px rgba(251, 191, 36, 0.25)',
});

export const identity = style({
	display: 'flex',
	alignItems: 'center',
	gap: space.lg,
	minWidth: 0,
});

export const countryFlag = style({
	flexShrink: 0,
	fontSize: font.flag,
	lineHeight: 1,
});

export const identityText = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '0.125rem',
	minWidth: 0,
});

export const sideLabel = style({
	fontSize: font.caption,
	fontWeight: 800,
	textTransform: 'uppercase',
	letterSpacing: '0.1em',
	opacity: 0.65,
	lineHeight: 1.2,
});

export const clubName = style({
	margin: 0,
	fontSize: font.sm,
	fontWeight: 600,
	lineHeight: 1.3,
	opacity: 0.7,
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
});

export const fullName = style({
	margin: 0,
	fontSize: font.name,
	fontWeight: 800,
	lineHeight: 1.1,
	letterSpacing: '-0.025em',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
});

export const controlsColumn = style({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	width: controlsWidth,
	minWidth: controlsWidth,
	justifySelf: 'end',
	alignSelf: 'stretch',
	paddingLeft: space.lg,
	borderLeft: '1px solid rgba(128, 128, 128, 0.22)',
	'@media': {
		'screen and (max-width: 720px)': {
			width: '100%',
			minWidth: 0,
			alignSelf: 'stretch',
			paddingLeft: 0,
			paddingTop: space.md,
			borderLeft: 'none',
			borderTop: '1px solid rgba(128, 128, 128, 0.22)',
		},
	},
});

export const scoreGrid = style({
	display: 'grid',
	gridTemplateColumns: `repeat(${SCORE_COLUMN_COUNT}, minmax(${SCORE_CELL_MIN}, 1fr))`,
	gap: space.sm,
	width: '100%',
	'@media': {
		'screen and (max-width: 720px)': {
			gridTemplateColumns: `repeat(${SCORE_COLUMN_COUNT}, minmax(0, 1fr))`,
		},
	},
});

const scoreCellBase = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	gap: space.xs,
	width: '100%',
	minHeight: '6rem',
	padding: `${space.sm} ${space.xs}`,
	borderRadius: radius.md,
	border: '2px solid transparent',
	boxSizing: 'border-box',
	cursor: 'pointer',
	transition: 'background-color 120ms ease, box-shadow 120ms ease',
	'@media': {
		'screen and (max-width: 720px)': {
			width: '100%',
			minWidth: 0,
		},
	},
	selectors: {
		'&:hover:not(:disabled)': { filter: 'brightness(1.06)' },
		'&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
		'&:focus-visible': {
			outline: '2px solid #fbbf24',
			outlineOffset: '1px',
		},
	},
});

export const scoreCellWhite = style([
	scoreCellBase,
	{
		borderColor: 'rgba(15, 23, 42, 0.12)',
		backgroundColor: 'rgba(255, 255, 255, 0.6)',
		color: vars.color.text.inverse,
		boxShadow: 'inset 0 0 0 0 transparent',
	},
]);

export const scoreCellBlue = style([
	scoreCellBase,
	{
		borderColor: 'rgba(255, 255, 255, 0.2)',
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		color: vars.color.text.primary,
		boxShadow: 'inset 0 0 0 0 transparent',
	},
]);

export const scoreCellIppon = style({
	backgroundColor: 'rgba(251, 191, 36, 0.3) !important',
	boxShadow: 'inset 0 0 0 2px #ca8a04 !important',
});

export const scoreCellWazaAri = style({
	backgroundColor: 'rgba(251, 191, 36, 0.18) !important',
	boxShadow: 'inset 0 0 0 2px rgba(202, 138, 4, 0.55) !important',
});

export const scoreCellAtMax = style({
	opacity: 0.72,
	cursor: 'default',
	selectors: {
		'&:hover:not(:disabled)': { filter: 'none' },
	},
});

export const scoreCellLabel = style({
	display: 'block',
	width: '100%',
	fontSize: font.md,
	fontWeight: 700,
	textTransform: 'uppercase',
	letterSpacing: '0.03em',
	opacity: 0.85,
	lineHeight: 1.15,
	textAlign: 'center',
	overflow: 'hidden',
});

export const scoreCellValue = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	fontSize: font.score,
	fontWeight: 900,
	fontVariantNumeric: 'tabular-nums',
	lineHeight: 1,
	flexShrink: 0,
});

const shidoControlBase = style([
	scoreCellBase,
	{
		border: '2px solid transparent',
	},
]);

export const shidoControlWhite = style([
	shidoControlBase,
	{
		borderColor: 'rgba(239, 68, 68, 0.35)',
		backgroundColor: 'rgba(239, 68, 68, 0.08)',
		color: vars.color.text.inverse,
	},
]);

export const shidoControlBlue = style([
	shidoControlBase,
	{
		borderColor: 'rgba(252, 165, 165, 0.45)',
		backgroundColor: 'rgba(239, 68, 68, 0.12)',
		color: vars.color.text.primary,
	},
]);

export const shidoControlActive = style({
	backgroundColor: 'rgba(239, 68, 68, 0.2) !important',
	boxShadow: 'inset 0 0 0 2px rgba(239, 68, 68, 0.55) !important',
});

export const shidoControlFull = style({
	backgroundColor: 'rgba(239, 68, 68, 0.32) !important',
	boxShadow: 'inset 0 0 0 2px #ef4444 !important',
});

export const shidoLabel = style([
	scoreCellLabel,
	{ opacity: 0.9 },
]);

export const shidoCount = style([
	scoreCellValue,
	{ color: '#ef4444' },
]);

export const shidoDots = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '0.3125rem',
	flexShrink: 0,
});

export const shidoDotEmpty = style({
	width: '0.625rem',
	height: '0.625rem',
	borderRadius: '999px',
	border: '1px solid rgba(239, 68, 68, 0.45)',
	backgroundColor: 'transparent',
	flexShrink: 0,
});

export const shidoDotFilled = style({
	width: '0.625rem',
	height: '0.625rem',
	borderRadius: '999px',
	backgroundColor: '#ef4444',
	boxShadow: '0 0 6px rgba(239, 68, 68, 0.55)',
	flexShrink: 0,
});

const osaekomiBase = style([
	scoreCellBase,
	{
		border: '2px solid rgba(251, 191, 36, 0.4)',
	},
]);

export const osaekomiLabel = style([
	scoreCellLabel,
	{ opacity: 0.9 },
]);

export const osaekomiValue = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	fontSize: font.lg,
	fontWeight: 800,
	lineHeight: 1.1,
	textAlign: 'center',
});

export const osaekomiButton = style([
	osaekomiBase,
	{
		backgroundColor: 'rgba(251, 191, 36, 0.22)',
		color: vars.color.text.inverse,
	},
]);

export const osaekomiButtonBlue = style([
	osaekomiBase,
	{
		backgroundColor: 'rgba(251, 191, 36, 0.18)',
		color: vars.color.text.primary,
	},
]);

export const osaekomiButtonActive = style({
	backgroundColor: 'rgba(251, 191, 36, 0.5) !important',
	boxShadow: 'inset 0 0 0 2px #fbbf24 !important',
});

import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '@styles/theme/vars.css';

const overlayIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
});

const panelIn = keyframes({
	from: { opacity: 0, transform: 'scale(0.96) translateY(8px)' },
	to: { opacity: 1, transform: 'scale(1) translateY(0)' },
});

const modalScrollbar = {
	scrollbarWidth: 'thin',
	scrollbarColor: 'rgba(148, 163, 184, 0.45) transparent',
	selectors: {
		'&::-webkit-scrollbar': {
			width: '0.5rem',
		},
		'&::-webkit-scrollbar-track': {
			background: 'transparent',
			marginBlock: '0.375rem',
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: 'rgba(148, 163, 184, 0.35)',
			borderRadius: '999px',
			border: '2px solid transparent',
			backgroundClip: 'padding-box',
		},
		'&::-webkit-scrollbar-thumb:hover': {
			backgroundColor: 'rgba(148, 163, 184, 0.55)',
		},
	},
} as const;

const dialogReset = {
	margin: 0,
	border: 'none',
	background: 'transparent',
	color: 'inherit',
	font: 'inherit',
	maxWidth: 'none',
	maxHeight: 'none',
} as const;

const overlayBase = style({
	...dialogReset,
	position: 'fixed',
	inset: 0,
	width: '100vw',
	height: '100vh',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '1.25rem',
	boxSizing: 'border-box',
	overflowY: 'auto',
	overscrollBehavior: 'contain',
	animation: `${overlayIn} 200ms ease-out`,
	...modalScrollbar,
	selectors: {
		'&::backdrop': {
			backgroundColor: 'rgba(15, 23, 42, 0.72)',
			backdropFilter: 'blur(8px)',
			animation: `${overlayIn} 200ms ease-out`,
		},
		'&:not([open])': {
			display: 'none',
		},
		'&[open]': {
			display: 'flex',
		},
	},
});

export const overlayCenter = style([overlayBase]);

export const overlayTop = style([
	overlayBase,
	{
		justifyContent: 'flex-start',
		paddingTop: '1.5rem',
	},
]);

export const overlayDismissible = style({ cursor: 'pointer' });

export const overlayZ40 = style({ zIndex: 40 });
export const overlayZ45 = style({ zIndex: 45 });
export const overlayZ50 = style({ zIndex: 50 });

const panelShell = style({
	width: 'max-content',
	maxHeight: 'min(90dvh, calc(100dvh - 2.5rem))',
	marginTop: 'auto',
	marginBottom: 'auto',
	padding: '1.5rem',
	borderRadius: '1rem',
	border: `1px solid ${vars.color.border.default}`,
	background: vars.gradient.glassPanel,
	boxShadow: vars.shadow.lg,
	cursor: 'default',
	boxSizing: 'border-box',
	overflowY: 'auto',
	overscrollBehavior: 'contain',
	flexShrink: 0,
	animation: `${panelIn} 280ms cubic-bezier(0.22, 1, 0.36, 1)`,
	...modalScrollbar,
});

export const panelContent = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'stretch',
	width: 'max-content',
	maxWidth: '100%',
});

export const panelScrollbar = style(modalScrollbar);

export const panelSm = style([
	panelShell,
	{ maxWidth: 'min(28rem, calc(100vw - 2.5rem))' },
]);

export const panelMd = style([
	panelShell,
	{ maxWidth: 'min(32rem, calc(100vw - 2.5rem))' },
]);

export const panelLg = style([
	panelShell,
	{ maxWidth: 'min(40rem, calc(100vw - 2.5rem))' },
]);

export const panelContentSm = style([
	panelContent,
	{ maxWidth: 'min(28rem, calc(100vw - 5rem))' },
]);

export const panelContentMd = style([
	panelContent,
	{ maxWidth: 'min(32rem, calc(100vw - 5rem))' },
]);

export const panelContentLg = style([
	panelContent,
	{ maxWidth: 'min(40rem, calc(100vw - 5rem))' },
]);

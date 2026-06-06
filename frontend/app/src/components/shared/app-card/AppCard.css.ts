import { style } from '@vanilla-extract/css';

export const card = style({
	display: 'flex',
	alignItems: 'center',
	gap: '1rem',
	padding: '1rem 1.125rem',
	borderRadius: '1rem',
	border: '1px solid #e2e8f0',
	backgroundColor: '#ffffff',
	color: 'inherit',
	textDecoration: 'none',
	boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
	transition:
		'transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease',
	selectors: {
		'&:hover': {
			transform: 'translateY(-2px)',
			borderColor: '#bfdbfe',
			boxShadow: '0 12px 28px rgba(37, 99, 235, 0.14)',
		},
	},
});

export const iconWrap = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexShrink: 0,
	width: '3rem',
	height: '3rem',
	borderRadius: '0.875rem',
	backgroundColor: '#eff6ff',
});

export const content = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '0.25rem',
	flex: 1,
	minWidth: 0,
});

export const name = style({
	fontSize: '1rem',
	fontWeight: 700,
	color: '#0f172a',
	letterSpacing: '-0.02em',
});

export const description = style({
	fontSize: '0.8125rem',
	color: '#64748b',
	lineHeight: 1.45,
});

export const chevron = style({
	flexShrink: 0,
});

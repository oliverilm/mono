import { style, keyframes } from '@vanilla-extract/css';

const fadeUp = keyframes({
	from: {
		opacity: 0,
		transform: 'translateY(16px)',
	},
	to: {
		opacity: 1,
		transform: 'translateY(0)',
	},
});

export const page = style({
	minHeight: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '1.5rem',
	background:
		'radial-gradient(circle at top, rgba(59, 130, 246, 0.18), transparent 42%), linear-gradient(160deg, #0f172a 0%, #1e293b 45%, #172554 100%)',
	fontFamily:
		'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
});

export const modal = style({
	width: '100%',
	maxWidth: '26rem',
	padding: '2rem',
	borderRadius: '1.5rem',
	background: 'rgba(255, 255, 255, 0.96)',
	boxShadow:
		'0 24px 60px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.08)',
	backdropFilter: 'blur(12px)',
	animation: `${fadeUp} 420ms ease-out`,
});

export const header = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '1.25rem',
	marginBottom: '1.75rem',
	textAlign: 'center',
});

export const title = style({
	margin: 0,
	fontSize: '1.5rem',
	fontWeight: 700,
	color: '#0f172a',
	letterSpacing: '-0.03em',
});

export const subtitle = style({
	margin: 0,
	fontSize: '0.95rem',
	color: '#64748b',
	lineHeight: 1.5,
});

export const form = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
});

export const field = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '0.5rem',
});

export const label = style({
	fontSize: '0.875rem',
	fontWeight: 600,
	color: '#334155',
});

export const inputWrapper = style({
	position: 'relative',
});

export const inputIcon = style({
	position: 'absolute',
	top: '50%',
	left: '0.875rem',
	transform: 'translateY(-50%)',
	display: 'flex',
	pointerEvents: 'none',
});

export const input = style({
	width: '100%',
	padding: '0.875rem 0.875rem 0.875rem 2.75rem',
	border: '1px solid #e2e8f0',
	borderRadius: '0.875rem',
	backgroundColor: '#f8fafc',
	color: '#0f172a',
	fontSize: '0.95rem',
	outline: 'none',
	transition: 'border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease',
	selectors: {
		'&:focus': {
			borderColor: '#3b82f6',
			backgroundColor: '#ffffff',
			boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.15)',
		},
		'&::placeholder': {
			color: '#94a3b8',
		},
	},
});

export const submitButton = style({
	marginTop: '0.5rem',
	width: '100%',
	padding: '0.95rem 1rem',
	border: 'none',
	borderRadius: '0.875rem',
	background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
	color: '#ffffff',
	fontSize: '0.95rem',
	fontWeight: 700,
	cursor: 'pointer',
	boxShadow: '0 12px 24px rgba(37, 99, 235, 0.28)',
	transition: 'transform 160ms ease, box-shadow 160ms ease, filter 160ms ease',
	selectors: {
		'&:hover': {
			transform: 'translateY(-1px)',
			boxShadow: '0 16px 28px rgba(37, 99, 235, 0.34)',
			filter: 'brightness(1.03)',
		},
		'&:active': {
			transform: 'translateY(0)',
		},
	},
});

export const footer = style({
	marginTop: '1.5rem',
	paddingTop: '1.25rem',
	borderTop: '1px solid #e2e8f0',
	textAlign: 'center',
	fontSize: '0.8125rem',
	color: '#64748b',
	lineHeight: 1.5,
});

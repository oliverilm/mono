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
	padding: '1.5rem',
	background:
		'radial-gradient(circle at top, rgba(59, 130, 246, 0.18), transparent 42%), linear-gradient(160deg, #0f172a 0%, #1e293b 45%, #172554 100%)',
	fontFamily:
		'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
});

export const container = style({
	width: '100%',
	maxWidth: '42rem',
	margin: '0 auto',
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

export const appList = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '0.75rem',
});

export const footer = style({
	display: 'flex',
	justifyContent: 'center',
	marginTop: '1.5rem',
	paddingTop: '1.25rem',
	borderTop: '1px solid #e2e8f0',
});

export const logoutButton = style({
	padding: '0.625rem 1rem',
	border: '1px solid #e2e8f0',
	borderRadius: '0.75rem',
	backgroundColor: '#ffffff',
	color: '#64748b',
	fontSize: '0.875rem',
	fontWeight: 600,
	cursor: 'pointer',
	transition: 'border-color 160ms ease, color 160ms ease, background-color 160ms ease',
	selectors: {
		'&:hover': {
			borderColor: '#cbd5e1',
			color: '#334155',
			backgroundColor: '#f8fafc',
		},
	},
});

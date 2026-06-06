import { style } from '@vanilla-extract/css';

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

export const container = style({
	width: '100%',
	maxWidth: '26rem',
	padding: '2rem',
	borderRadius: '1.5rem',
	background: 'rgba(255, 255, 255, 0.96)',
	boxShadow:
		'0 24px 60px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.08)',
});

export const title = style({
	margin: '0 0 0.75rem',
	fontSize: '1.5rem',
	fontWeight: 700,
	color: '#0f172a',
});

export const description = style({
	margin: 0,
	fontSize: '0.95rem',
	color: '#64748b',
	lineHeight: 1.5,
});

export const backLink = style({
	display: 'inline-block',
	marginBottom: '1rem',
	fontSize: '0.875rem',
	fontWeight: 600,
	color: '#2563eb',
	textDecoration: 'none',
	selectors: {
		'&:hover': {
			textDecoration: 'underline',
		},
	},
});

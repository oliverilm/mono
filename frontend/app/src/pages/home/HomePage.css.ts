import { style } from '@vanilla-extract/css';

export const loadingPage = style({
	minHeight: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background:
		'linear-gradient(160deg, #0f172a 0%, #1e293b 45%, #172554 100%)',
	fontFamily:
		'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
});

export const loadingText = style({
	margin: 0,
	fontSize: '0.95rem',
	color: '#94a3b8',
});

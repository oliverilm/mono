import { globalStyle } from '@vanilla-extract/css';

globalStyle('*, *::before, *::after', {
	boxSizing: 'border-box',
});

globalStyle('body', {
	margin: 0,
	minHeight: '100vh',
});

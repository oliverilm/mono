import { globalStyle } from '@vanilla-extract/css';
import './theme/vars.css';

globalStyle('*, *::before, *::after', {
	boxSizing: 'border-box',
});

globalStyle('body', {
	margin: 0,
	minHeight: '100vh',
});

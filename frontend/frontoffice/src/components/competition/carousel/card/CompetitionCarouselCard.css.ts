import { globalStyle, style } from '@vanilla-extract/css';

export const slide = style({
	padding: '2rem 0',
});
export const card = style({
	transitionDuration: '.2s',
	cursor: 'pointer',
});
globalStyle(`${card}:hover`, {
	scale: '1.008',
	transitionDuration: '.2s',
	boxShadow: '0 16px 32px rgba(0, 0, 0, 0.2)',
});

export const cardSection = style({
	position: 'relative',
});

export const cardContent = style({
	position: 'absolute',
	bottom: '0',
	left: '0',
	right: '0',
	height: '100%',
	padding: '1rem',
	background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
	color: 'white',
	zIndex: '1',
	display: 'flex',
	alignItems: 'end',
	justifyContent: 'space-between',
});
